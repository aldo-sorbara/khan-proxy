# Khan Example

## Installing 
It was developed using Node `v11.0.0`
```npm i```

## Running
With a consumer_key and consumer_secret issued by khan you should run: 
```
CONSUMER_KEY=nrgbUGZ6Fas CONSUMER_SECRET=TEjK5Mz6L5R npm run start
```

Be sure your consumer key and consumer secret are correct !

## Retrieving data

For retrieving data you will have to make a request to: 

`localhost:3000/api/<KHAN API>`
Where KHAN API makes reference to anything after `api/v1` in their documentation [here](http://api-explorer.khanacademy.org/api/v1/user)
For instance you can make a request to
* `http://localhost:3000/api/badges` for an non authenticated method will execute http://api-explorer.khanacademy.org/api/v1/badges 
* `http://localhost:3000/api/user` for an authenticated method will execute http://api-explorer.khanacademy.org/api/v1/user

