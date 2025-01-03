const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your environment variables
});

const openai = new OpenAIApi(configuration);

async function getLLMResponse(prompt) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error fetching response from OpenAI API:", error);
    // throw error;
  }
}

module.exports = { getLLMResponse };