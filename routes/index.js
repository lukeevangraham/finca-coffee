let router = require('express').Router();
const axios = require('axios');

let aboutRoutes = require('./about');
let menuRoutes = require('./menu');
let inquireRoutes = require('./inquire');
let apiInquiryRoutes = require('./api/inquiry');

router.use('/about', aboutRoutes);
router.use('/menu', menuRoutes);
router.use('/inquire', inquireRoutes);
router.use('/api/inquiry', apiInquiryRoutes);

router.get('/', async (req, res) => {
  const response = await Promise.all([
    axios.get(
      `${process.env.API_URL}fc-home?populate[Sections][on][section.hero][populate][mainImage]=*&populate[Sections][on][section.hero][populate][Button][populate]=*&populate[Sections][on][section.testimonies][populate][Testimony][populate][Photo]=*&populate[Sections][on][section.heading-above-columns][populate][Column][populate][Photo]=*&populate[Sections][on][section.heading-above-image-and-text][populate][ImageBesideText][populate]=*&populate[Sections][on][section.heading-above-rich-text][populate]=*&populate[Sections][on][section.heading-above-grid][populate][Column]=*&populate[Sections][on][section.fa-qs][populate][QandA]=*`,
    ),
  ]);

  // console.log("RES: ", response[0].data.data.attributes.Sections);
  res.render('index', {
    sections: response[0].data.data.attributes.Sections,
    metaTitle: 'Finca Coffee | Boutique Mobile Coffee Cart | Omaha, NE',
    metaDescription:
      'Elevate your next event with Finca Coffee, Omaha’s premier boutique mobile coffee cart. We bring handcrafted espresso, signature lattes, and a sophisticated aesthetic to weddings and private gatherings.',
  });
});

module.exports = router;
