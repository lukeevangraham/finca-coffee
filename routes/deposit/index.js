let router = require('express').Router();
const axios = require('axios');

router.get('/', (req, res) => {
  res.render('deposit', {
    metaTitle: 'Secure Deposit | Finca Coffee',
    metaDescription:
      'Securely finalize your retainer payment to lock in your mobile espresso bar reservation with Finca Coffee.',
    stripeUrl: 'https://buy.stripe.com/4gM28kbfL41w7WWgUj0Fi00',
  });
});

module.exports = router;
