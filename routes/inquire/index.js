let router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const response = await Promise.all([
    axios.get(`${process.env.API_URL}fc-inquire?populate=*`),
  ]);

  res.render('inquire', {
    inquire: response[0].data.data.attributes,
    metaTitle:
      response[0].data.data.attributes.MetaTitle || 'Inquire | Finca Coffee',
    metaDescription:
      response[0].data.data.attributes.MetaDescripiton ||
      'Have a question about our coffee, catering, or events? We’d love to hear from you! Fill out the form below and we’ll get back to you as soon as possible.',
  });
});

module.exports = router;
