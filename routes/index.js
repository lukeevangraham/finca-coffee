let router = require('express').Router();
const axios = require('axios');

let aboutRoutes = require('./about');
let menuRoutes = require('./menu');
let bookRoutes = require('./menu');

router.use('/about', aboutRoutes);
router.use('/menu', menuRoutes);
router.use('/book', bookRoutes);

router.get('/', async (req, res) => {
  const response = await Promise.all([
    axios.get(`${process.env.API_URL}fc-home?populate[%53ections][populate]=*`),
  ]);

  // console.log("RES: ", response[0].data.data.attributes.Sections);
  res.render('index', { sections: response[0].data.data.attributes.Sections });
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
