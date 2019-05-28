const express = require('express');
const { CONSUMER_KEY, CONSUMER_SECRET } = process.env;
const khan = require('khan')(CONSUMER_KEY, CONSUMER_SECRET);

const port = process.env.port || 3000;

const authorizeUrl = 'https://www.khanacademy.org/api/auth2/authorize';

const app = express();

// First i want to retrieve the khan endpoint i would like to retrieve
app.get('/api/:path', async (req, res, next) => {
  // I start my authentication process (this is step 1)
  const { oauth_token_secret, oauth_token } = await khan.requestToken(
    `http://localhost:3000/${req.params.path}`
  );
  // Here is the step 2
  res.redirect(`${authorizeUrl}?oauth_token=${oauth_token}`);
});

app.get('*', async (req, res, next) => {
  // After the redirect, i get back the method
  const khanMethod = req.baseUrl + req.path;
  // This is standard for the authentication process
  const { oauth_token_secret, oauth_verifier, oauth_token } = req.query;
  // This is the step 3, getting the access token
  try {
    const accessToken = await khan.accessToken(
      oauth_token,
      oauth_verifier,
      oauth_token_secret
    );
    // Load the access token for the next request
    const authorizedApi = khan(
      accessToken.oauth_token_secret,
      accessToken.oauth_token
    );
    // This request is Oauth1 Authorized
    const response = await authorizedApi.request(khanMethod);
    res.json(response);
  } catch (e) {
    console.log('Error ', e);
    res.json({ e });
  }
});

app.listen(port, () => {
  console.log('Listening on port ', port);
});
