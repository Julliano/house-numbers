import { Router } from 'express';

import Snippet from '../models/Snippet';
import { generateSummary } from '../services/aiService';

const router = Router();

router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const summary = await generateSummary(text);
    const snippet = await Snippet.create({ text, summary });

    res.status(201).json({
      id: snippet._id,
      text: snippet.text,
      summary: snippet.summary
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create snippet' });
  }
});

export default router;
