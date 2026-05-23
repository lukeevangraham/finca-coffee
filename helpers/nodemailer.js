const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    ciphers: 'SSLv3',
  },
});

/**
 * Helper to send inquiries
 * @param {Object} data - The form data object
 */
const sendInquiryEmail = async (data) => {
  const { name, email, event_date, guest_count, location, addons, message } =
    data;

  const mailOptions = {
    from: `"Finca Website" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_RECEIVER,
    replyTo: email,
    subject: `☕ New Inquiry: ${name} - ${event_date}`,
    html: `
            <div style="font-family: sans-serif; max-width: 600px; color: #2c1b12; border: 1px solid #ede0d4; padding: 20px;">
                <h2 style="color: #5f4339;">New Event Inquiry</h2>
                <p><strong>Customer:</strong> ${name}</p>
                <p><strong>Date:</strong> ${event_date}</p>
                <p><strong>Venue:</strong> ${location}</p>
                <p><strong>Add-ons:</strong> ${addons.length > 0 ? addons.join(', ') : 'None'}</p>
                <p><strong>Message:</strong> ${message}</p>
            </div>
        `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendInquiryEmail };
