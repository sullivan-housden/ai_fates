
const Twitter = require('twitter-v2'); // Install this library via npm

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY, // Ensure these are set in your environment variables
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function getPollResults(tweetId) {
  try {
    const tweet = await twitterClient.get(`tweets/${tweetId}`, {
      expansions: "attachments.poll_ids",
      "poll.fields": "options,voting_status",
    });

    const poll = tweet.includes.polls[0];
    return poll.options.map(option => ({
      label: option.label,
      votes: option.votes,
    }));
  } catch (error) {
    console.error("Error fetching Twitter poll results:", error);
    throw error;
  }
}

module.exports = { getPollResults };