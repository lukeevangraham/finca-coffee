let router = require('express').Router();

const { sendInquiryEmail } = require('../../../helpers/nodemailer');

router.post('/', async (req, res) => {
  try {
    // 1. Check for the Honeypot value
    const { b_name } = req.body;

    if (b_name && b_name.length > 0) {
      console.log('Bot detected. Silently ignoring.');
      // We send a 200 OK because we want the bot to think it worked
      // so it doesn't keep trying different methods.
      return res.status(200).json({ success: true, bot: true });
    }

    // 2. If it's a human, send the email
    await sendInquiryEmail(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email Helper Error:', error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
