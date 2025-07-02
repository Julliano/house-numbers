import axios from 'axios';

const apiKey = process.env.OPENAI_API_KEY!;

export async function generateSummary(text: string): Promise<string> {
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  const res = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Summarize in <= 30 words: ${text}` }]
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }
  );

  const summary = res?.data?.choices[0]?.message?.content?.trim();
  return summary;
}
