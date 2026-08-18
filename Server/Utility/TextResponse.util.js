import dotenv from "dotenv";
dotenv.config();

const options = {
  method: 'POST',
  url: 'https://ai-content-detector-ai-gpt.p.rapidapi.com/api/detectText/',
  headers: {
    'x-rapidapi-key': `${process.env.API_KEY}`,
    'x-rapidapi-host': 'ai-content-detector-ai-gpt.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    text: ''
  }
};

export async function fetchTextData(text) {
	try {
        options.data.text = text;
		const response = await axios.request(options);
		console.log(response.data);
        return response.data;
	} catch (error) {
		console.error(error);
        throw error;
	}
}