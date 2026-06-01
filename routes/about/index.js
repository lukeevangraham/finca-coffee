let router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const response = await Promise.all([
    axios.get(`${process.env.API_URL}fc-about?populate=*`),
  ]);

  res.render('about', {
    about: response[0].data.data.attributes,
    metaTitle:
      response[0].data.data.attributes.MetaTitle || 'About | Finca Coffee',
    metaDescription:
      response[0].data.data.attributes.MetaDescripiton ||
      'Meet the heart behind Finca Coffee. We bring a high-end, boutique coffee cart experience to Omaha’s most memorable events. Discover how Kassandra blends craft espresso with intentional service to elevate your wedding or private gathering.',
  });
});

module.exports = router;
