let router = require('express').Router();
const axios = require('axios');

// ── SERVER-SIDE CACHE MEMORY SYSTEM ─────────────────────────────────────────
let cachedAboutData = null;
let lastAboutFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // ⏰ 15 minutes in milliseconds

router.get('/', async (req, res) => {
  try {
    const currentTime = Date.now();

    // Check if cache exists and is still fresh
    if (!cachedAboutData || currentTime - lastAboutFetchTime > CACHE_DURATION) {
      // Cache is stale or missing -> Pull fresh text structure from Strapi
      const response = await Promise.all([
        axios.get(`${process.env.API_URL}fc-about?populate=*`),
      ]);

      cachedAboutData = response[0].data.data.attributes;
      lastAboutFetchTime = currentTime;

      console.log('🔄 About page cache refreshed from Strapi API.');
    }

    // Explicitly instruct Cloudflare to store this HTML asset for up to 1 hour
    res.setHeader('Cache-Control', 'public, max-age=3600');

    res.render('about', {
      about: cachedAboutData,
      metaTitle: cachedAboutData.MetaTitle || 'About | Finca Coffee',
      metaDescription:
        cachedAboutData.MetaDescription || // Fixed potential typo fallback safely
        cachedAboutData.MetaDescripiton ||
        'Meet the heart behind Finca Coffee. We bring a high-end, boutique coffee cart experience to Omaha’s most memorable events. Discover how Kassandra blends craft espresso with intentional service to elevate your wedding or private gatherings.',
    });
  } catch (error) {
    console.error('Error fetching about page pipeline:', error);
    // Fallback: Use last successful cache data to keep the page completely functional if Strapi crashes
    res.render('about', {
      about: cachedAboutData || {},
      metaTitle: 'About | Finca Coffee',
      metaDescription:
        'Meet the heart behind Finca Coffee. We bring a high-end, boutique coffee cart experience to Omaha’s most memorable events.',
    });
  }
});

module.exports = router;
