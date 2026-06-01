let router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const response = await Promise.all([
    axios.get(
      `${process.env.API_URL}fc-menu-items?populate=*&sort[0]=Category:desc&sort[1]=Name:asc`,
    ),
  ]);
  res.render('menu', {
    menuItems: response[0].data.data,
    metaTitle: 'Menu | Finca Coffee',
    metaDescription:
      'Explore the curated menu of Finca Coffee. From our signature Honey Lavender Latte to ceremonial grade matcha, discover the handcrafted espresso and seasonal flavors we bring to Omaha’s boutique events.',
  });
});

module.exports = router;
