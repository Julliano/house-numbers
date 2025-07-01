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

router.get('/', async (req, res) => {
  const snippets = await Snippet.find();

  res.json(snippets.map(s => ({
    id: s._id,
    text: s.text,
    summary: s.summary
  })));
});

router.get('/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    res.json({
      id: snippet._id,
      text: snippet.text,
      summary: snippet.summary
    });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});

export default router;
