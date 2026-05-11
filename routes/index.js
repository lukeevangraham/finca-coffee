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
    axios.get(
      `${process.env.API_URL}fc-home?populate[Sections][on][section.hero][populate][mainImage]=*&populate[Sections][on][section.testimonies][populate][Testimony][populate][Photo]=*&populate[Sections][on][section.heading-above-columns][populate][Column][populate][Photo]=*&populate[Sections][on][section.heading-above-image-and-text][populate][ImageBesideText][populate]=*&populate[Sections][on][section.heading-above-rich-text][populate]=*&populate[Sections][on][section.heading-above-grid][populate][Column]=*&populate[Sections][on][section.fa-qs][populate][QandA]=*`,
    ),
  ]);

  // console.log("RES: ", response[0].data.data.attributes.Sections);
  res.render('index', { sections: response[0].data.data.attributes.Sections });
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
