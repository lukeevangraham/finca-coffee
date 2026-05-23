let router = require('express').Router();

const { sendInquiryEmail } = require('../../../helpers/nodemailer');

router.post('/', async (req, res) => {
  try {
    await sendInquiryEmail(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email Helper Error:', error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
