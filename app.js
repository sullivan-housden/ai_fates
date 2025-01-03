const express = require("express");
const { getLLMResponse } = require("./openaiAPI");
const { getPollResults } = require("./twitterPolls");

const app = express();
const PORT = process.env.PORT || 3000;

// TODO: Update to support prompt context through external storage like S3 or something else.

app.use(express.json());

// Route to get a response from OpenAI API
app.post("/ai-response", async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await getLLMResponse(prompt);
    res.json({ response });
  } catch (error) {
    res.status(500).send("Error fetching AI response.");
  }
});

// Route to get poll results from Twitter
app.get("/poll-results/:tweetId", async (req, res) => {
  const { tweetId } = req.params;
  try {
    const results = await getPollResults(tweetId);
    res.json({ results });
  } catch (error) {
    res.status(500).send("Error fetching Twitter poll results.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});