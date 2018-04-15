console.log('this is loaded');

exports.Twitter = {
    consumer_key: process.env.SPOTIFY_ID,
    consumer_secret: process.env.SPOTIFY_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_CONSUMER_SECRET
};

exports.Spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};