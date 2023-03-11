// const fileType = require('file-type');
const axios = require('axios');
const dotenv = require('dotenv');
const FormData = require('form-data');

dotenv.config();


// async function generateTextFromAudio(audio) {
//     const response = await axios.post(
//         "https://api.openai.com/v1/whisper",
//         audio,
//         {
//             headers: {
//                 'Authorization': `Bearer ${openaiApiKey}`,
//                 'Transfer-Encoding': 'chunked',
//                 'Content-Type': 'audio/mpeg'
//             }
//         }
//     );
//     return response.data.text;
// }

const voiceController = async (req, res) => {

    // if (!isAudioFile(req.file.mimetype)) {
    //   return res.status(400).send('Uploaded file is not an audio file');
    // }
    const form = new FormData();
    form.append('file',Buffer.from(req.file.buffer), { filename: req.file.originalname });
    form.append('model', 'whisper-1');
    try {
        const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', form, {
          headers: {
            ...form.getHeaders(),
            'Content-Type': 'audio/mpeg',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          }
        });
        
        res.status(200).json(response.data);
      } catch (error) {
        // Handle errors
        // ...
        res.status(400).json('An error has been occured '+error);
      }
    
    
  };
//to do
  const textToVoice = async (req, res) => {


  }
//   function isAudioFile(fileBuffer) {
//     const fileTypeResult = fileType(fileBuffer);
//     return fileTypeResult && (fileTypeResult.mime.startsWith('audio/') || fileTypeResult.mime === 'application/ogg');
//   }

const isAudioFile = (type) => {
    return type.startsWith('audio/');  // check: https://dirask.com/snippets/Popular-audio-file-extensions-with-MIME-types-jMX5xp
};


module.exports = voiceController;