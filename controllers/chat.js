const {Configuration , OpenAIApi } = require('openai')
const dotenv = require('dotenv');
dotenv.config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
const openai = new OpenAIApi(configuration);

const chatController = async (req, res) => {
    // The virtual assistant will focus on assisting with business and administrative-related work
  try {

    const prompt = "Hello ChatGPT,if my question is about business or administrative-related work such as writing letters and emails answer me else tell me that you can't answer, the answer must be in a pragraphe  ,\n my question is : "+req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    res.status(200).json({
      suggestion: response.data.choices[0].text
    ,ok:true
});

  } catch (error) {
    console.error("error")
    res.status(500).json({ok:false,error:error || 'Something went wrong'});
  }
}

module.exports=chatController;