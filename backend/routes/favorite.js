const router = require('express').Router();
const favorite = require('../models/favorite');

router.get('/', async (_, res) => {
  const data = await favorite.find().lean();
  res.json(data);
});
router.post('/', async (req, res) => {
  try {
    const { bookId } = req.body;

    const exists = await favorite.findOne({ bookId });

    if (exists) {
      return res.status(409).json({ message: 'Already in favorite' });
    }

    const data = await favorite.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  await favorite.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;