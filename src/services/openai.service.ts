import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

export const validateDocument = async (path: string): Promise<string> => {
  const file = fs.readFileSync(path);
  const { data } = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Analiza el documento' }],
  });
  return data.choices[0].message?.content || '';
};
