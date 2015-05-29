module.exports = {

	database: "mongodb://root:abc123@ds045511.mongolab.com:45511/reddit",
	port: process.env.PORT || 3000,
	TOKEN_SECRET: process.env.TOKEN_SECRET || 'A hard to guess string',
  	TWITTER_KEY: process.env.TWITTER_KEY || 'rZm8fSXoWklJz3rq3gY9R43jO',
  	TWITTER_SECRET: process.env.TWITTER_SECRET || 'rD4lPZWuFpgifgF6Bsx02sbSX9kHKGT2syT3lVPrPSHHAyF1mj',
  	TWITTER_CALLBACK: process.env.TWITTER_CALLBACK || 'http://localhost:3000',


}