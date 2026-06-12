let router = require('express').Router();
const axios = require('axios');

let aboutRoutes = require('./about');
let menuRoutes = require('./menu');
let inquireRoutes = require('./inquire');
let apiInquiryRoutes = require('./api/inquiry');
let depositRoutes = require('./deposit');

router.use('/about', aboutRoutes);
router.use('/menu', menuRoutes);
router.use('/inquire', inquireRoutes);
router.use('/api/inquiry', apiInquiryRoutes);
router.use('/deposit', depositRoutes);

// ── SERVER-SIDE CACHE MEMORY SYSTEM ─────────────────────────────────────────
let cachedHomepageSections = null;
let lastCacheFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // ⏰ 15 minutes in milliseconds

router.get('/', async (req, res) => {
  try {
    const currentTime = Date.now();

    // Check if cache exists and hasn't expired yet
    if (
      !cachedHomepageSections ||
      currentTime - lastCacheFetchTime > CACHE_DURATION
    ) {
      // Cache is stale or missing -> Query Strapi API
      const response = await Promise.all([
        axios.get(
          `${process.env.API_URL}fc-home?populate[Sections][on][section.hero][populate][mainImage]=*&populate[Sections][on][section.hero][populate][Button][populate]=*&populate[Sections][on][section.testimonies][populate][Testimony][populate][Photo]=*&populate[Sections][on][section.heading-above-columns][populate][Column][populate][Photo]=*&populate[Sections][on][section.heading-above-image-and-text][populate][ImageBesideText][populate]=*&populate[Sections][on][section.heading-above-rich-text][populate]=*&populate[Sections][on][section.heading-above-grid][populate][Column]=*&populate[Sections][on][section.fa-qs][populate][QandA]=*&populate[Sections][on][section.collage][populate][Images]=*`,
        ),
      ]);

      // Store the dynamic data structural block in local application memory
      cachedHomepageSections = response[0].data.data.attributes.Sections;
      lastCacheFetchTime = currentTime;

      console.log('🔄 Homepage cache refreshed from Strapi API.');
    }

    // Explicitly set cache instructions so Cloudflare safely stores the HTML document
    res.setHeader('Cache-Control', 'public, max-age=3600');

    // Render cleanly out of memory instantly
    res.render('index', {
      sections: cachedHomepageSections,
      metaTitle: 'Finca Coffee | Boutique Mobile Coffee Cart | Omaha, NE',
      metaDescription:
        'Elevate your next event with Finca Coffee, Omaha’s premier boutique mobile coffee cart. We bring handcrafted espresso, signature lattes, and a sophisticated aesthetic to weddings and private gatherings.',
    });
  } catch (error) {
    console.error('Error fetching homepage pipeline:', error);
    // Fallback: If everything breaks, try to use old cache if available to keep site online
    res.render('index', {
      sections: cachedHomepageSections || [],
      metaTitle: 'Finca Coffee | Boutique Mobile Coffee Cart | Omaha, NE',
      metaDescription:
        'Elevate your next event with Finca Coffee, Omaha’s premier boutique mobile coffee cart.',
    });
  }
});

module.exports = router;
