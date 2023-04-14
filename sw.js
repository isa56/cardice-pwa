const cacheName = "cache1.0.5"; // Change value to force update
const assets = [
  "/",
  "/assets/icons/android-chrome-36x36.png", // Favicon, Android Chrome M39+ with 0.75 screen density
  "/assets/icons/android-chrome-48x48.png", // Favicon, Android Chrome M39+ with 1.0 screen density
  "/assets/icons/android-chrome-72x72.png", // Favicon, Android Chrome M39+ with 1.5 screen density
  "/assets/icons/android-chrome-96x96.png", // Favicon, Android Chrome M39+ with 2.0 screen density
  "/assets/icons/android-chrome-144x144.png", // Favicon, Android Chrome M39+ with 3.0 screen density
  "/assets/icons/android-chrome-192x192.png", // Favicon, Android Chrome M39+ with 4.0 screen density
  "/assets/icons/android-chrome-256x256.png", // Favicon, Android Chrome M47+ Splash screen with 1.5 screen density
  "/assets/icons/android-chrome-384x384.png", // Favicon, Android Chrome M47+ Splash screen with 3.0 screen density
  "/assets/icons/android-chrome-512x512.png", // Favicon, Android Chrome M47+ Splash screen with 4.0 screen density
  "/assets/icons/apple-touch-icon.png", // Favicon, Apple default
  "/assets/icons/apple-touch-icon-57x57.png", // Apple iPhone, Non-retina with iOS6 or prior
  "/assets/icons/apple-touch-icon-60x60.png", // Apple iPhone, Non-retina with iOS7
  "/assets/icons/apple-touch-icon-72x72.png", // Apple iPad, Non-retina with iOS6 or prior
  "/assets/icons/apple-touch-icon-76x76.png", // Apple iPad, Non-retina with iOS7
  "/assets/icons/apple-touch-icon-114x114.png", // Apple iPhone, Retina with iOS6 or prior
  "/assets/icons/apple-touch-icon-120x120.png", // Apple iPhone, Retina with iOS7
  "/assets/icons/apple-touch-icon-144x144.png", // Apple iPad, Retina with iOS6 or prior
  "/assets/icons/apple-touch-icon-152x152.png", // Apple iPad, Retina with iOS7
  "/assets/icons/apple-touch-icon-180x180.png", // Apple iPhone 6 Plus with iOS8
  "/assets/icons/favicon.ico", // Favicon, IE and fallback for other browsers
  "/assets/icons/favicon-16x16.png", // Favicon, default
  "/assets/icons/favicon-32x32.png", // Favicon, Safari on Mac OS
  "/assets/icons/maskable_icon.png", // Favicon, maskable https://web.dev/maskable-icon
  "/assets/icons/mstile-70x70.png", // Favicon, Windows 8 / IE11
  "/assets/icons/mstile-144x144.png", // Favicon, Windows 8 / IE10
  "/assets/icons/mstile-150x150.png", // Favicon, Windows 8 / IE11
  "/assets/icons/mstile-310x150.png", // Favicon, Windows 8 / IE11
  "/assets/icons/mstile-310x310.png", // Favicon, Windows 8 / IE11
  "/assets/icons/safari-pinned-tab.svg", // Favicon, Safari pinned tab
  "/assets/fonts/Poppins-BoldItalic.woff2", // Fonts, Poppins Bold Italic
  "/assets/fonts/Poppins-BoldItalic.woff", // Fonts, Poppins Bold Italic
  "/assets/fonts/Poppins-Bold.woff2", // Fonts, Poppins Bold
  "/assets/fonts/Poppins-Bold.woff", // Fonts, Poppins Bold
  "/assets/fonts/Poppins-Black.woff2", // Fonts, Poppins Black
  "/assets/fonts/Poppins-Black.woff", // Fonts, Poppins Black
  "/assets/fonts/Poppins-Light.woff2", // Fonts, Poppins Light
  "/assets/fonts/Poppins-Light.woff", // Fonts, Poppins Light
  "/assets/fonts/Poppins-Medium.woff2", // Fonts, Poppins Medium
  "/assets/fonts/Poppins-Medium.woff", // Fonts, Poppins Medium
  "/assets/fonts/Poppins-Italic.woff2", // Fonts, Poppins Italic
  "/assets/fonts/Poppins-Italic.woff", // Fonts, Poppins Italic
  "/assets/fonts/Poppins-MediumItalic.woff2", // Fonts, Poppins Medium Italic
  "/assets/fonts/Poppins-MediumItalic.woff", // Fonts, Poppins Medium Italic
  "/assets/fonts/Poppins-Regular.woff2", // Fonts, Poppins Regular
  "/assets/fonts/Poppins-Regular.woff", // Fonts, Poppins Regular
  "/assets/images/logo.png", // Logo
  "/assets/images/share.jpg", // Social media sharing
  "browserconfig.xml", // IE11 icon configuration file
  "manifest.json", // Manifest file
  "index.html", // Main HTML file
  // "main.js", // Main Javascript file
  "/main.js", // Main Javascript file
  // "style.css", // Main CSS file
  "/style.css", // Main CSS file in folder
  // "fonts.css", // Fonts CSS file
  "/fonts.css", // Fonts CSS file in folder
];

self.addEventListener("install", (event) => {
  // Kick out the old service worker
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", (event) => {
  // Delete any non-current cache
  event.waitUntil(
    caches.keys().then((keys) => {
      Promise.all(
        keys.map((key) => {
          if (![cacheName].includes(key)) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Offline-first, cache-first strategy
// Kick off two asynchronous requests, one to the cache and one to the network
// If there's a cached version available, use it, but fetch an update for next time.
// Gets data on screen as quickly as possible, then updates once the network has returned the latest data.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open(cacheName).then((cache) => {
      return cache.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        );
      });
    })
  );
});
