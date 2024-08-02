const express = require('express');
const router = express.Router();
const data = require('../models/data');

// Endpoint to fetch all items
router.get('/', async (req, res) => {
    try {
        const items = await data.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint to fetch one item
router.get('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await data.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
