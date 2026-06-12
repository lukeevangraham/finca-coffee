let router = require('express').Router();
const axios = require('axios');

// ── SERVER-SIDE CACHE MEMORY SYSTEM ─────────────────────────────────────────
let cachedInquireData = null;
let lastInquireFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // ⏰ 15 minutes in milliseconds

router.get('/', async (req, res) => {
  try {
    const currentTime = Date.now();

    // Check if cache exists and is still fresh
    if (
      !cachedInquireData ||
      currentTime - lastInquireFetchTime > CACHE_DURATION
    ) {
      // Cache is stale or missing -> Query Strapi API
      const response = await Promise.all([
        axios.get(`${process.env.API_URL}fc-inquire?populate=*`),
      ]);

      cachedInquireData = response[0].data.data.attributes;
      lastInquireFetchTime = currentTime;

      console.log('🔄 Inquire page shell cache refreshed from Strapi API.');
    }

    // Direct Cloudflare to safely cache this HTML page wrapper for up to 1 hour
    res.setHeader('Cache-Control', 'public, max-age=3600');

    res.render('inquire', {
      inquire: cachedInquireData,
      metaTitle: cachedInquireData.MetaTitle || 'Inquire | Finca Coffee',
      metaDescription:
        cachedInquireData.MetaDescription ||
        cachedInquireData.MetaDescripiton || // Safeguard fallback for CMS typo variants
        'Have a question about our coffee, catering, or events? We’d love to hear from you! Fill out the form below and we’ll get back to you as soon as possible.',
    });
  } catch (error) {
    console.error('Error fetching inquire page pipeline:', error);
    // Fallback: If Strapi is temporarily locked up under memory pressure, keep the page online
    res.render('inquire', {
      inquire: cachedInquireData || {},
      metaTitle: 'Inquire | Finca Coffee',
      metaDescription:
        'Have a question about our coffee, catering, or events? We’d love to hear from you!',
    });
  }
});

module.exports = router;
