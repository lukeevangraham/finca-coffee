let router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  res.render('menu');
});

module.exports = router;
