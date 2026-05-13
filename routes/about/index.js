let router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const response = await Promise.all([
    axios.get(`${process.env.API_URL}fc-about?populate=*`),
  ]);

  res.render('about', { about: response[0].data.data.attributes });
});

module.exports = router;
