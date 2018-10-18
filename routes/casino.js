// routes/casino.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Crypto Bet' });
});

module.exports = router;
