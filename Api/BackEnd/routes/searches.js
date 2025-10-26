import express from 'express';
import { saveSearch, getSearches } from '../models/Search.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { user_id, query } = req.body;
  try {
    await saveSearch(user_id, query);
    res.json({ message: 'Búsqueda guardada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const searches = await getSearches();
    res.json(searches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
