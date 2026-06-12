let router = require('express').Router();
const axios = require('axios');

// ── SERVER-SIDE CACHE MEMORY SYSTEM ─────────────────────────────────────────
let cachedMenuData = null;
let lastMenuFetchTime = 0;
const CACHE_DURATION = 15 * 60 * 1000; // ⏰ 15 minutes in milliseconds

router.get('/', async (req, res) => {
  try {
    const currentTime = Date.now();

    // Check if cache exists and is still fresh
    if (!cachedMenuData || currentTime - lastMenuFetchTime > CACHE_DURATION) {
      // Cache is stale or missing -> Pull sorted menu items from Strapi
      const response = await Promise.all([
        axios.get(
          `${process.env.API_URL}fc-menu-items?populate=*&sort[0]=Category:desc&sort[1]=Name:asc`,
        ),
      ]);

      cachedMenuData = response[0].data.data;
      lastMenuFetchTime = currentTime;

      console.log('🔄 Menu items cache refreshed from Strapi API.');
    }

    // Direct Cloudflare to comfortably cache this HTML page for up to 1 hour
    res.setHeader('Cache-Control', 'public, max-age=3600');

    res.render('menu', {
      menuItems: cachedMenuData,
      metaTitle: 'Menu | Finca Coffee',
      metaDescription:
        'Explore the curated menu of Finca Coffee. From our signature Honey Lavender Latte to ceremonial grade matcha, discover the handcrafted espresso and seasonal flavors we bring to Omaha’s boutique events.',
    });
  } catch (error) {
    console.error('Error fetching menu items pipeline:', error);
    // Fallback: If Strapi/MySQL is locked up under server RAM swap pressure, don't crash
    res.render('menu', {
      menuItems: cachedMenuData || [],
      metaTitle: 'Menu | Finca Coffee',
      metaDescription: 'Explore the curated menu of Finca Coffee.',
    });
  }
});

module.exports = router;
