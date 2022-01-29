// import { offlineFallback, warmStrategyCache } from 'workbox-recipes';
// import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
// import { registerRoute } from 'workbox-routing';
// import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// import { ExpirationPlugin } from 'workbox-expiration';
// import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

// precacheAndRoute(self.__WB_MANIFEST);
// const pageCache = new CacheFirst({
//   cacheName: 'page-cache',
//   plugins: [
//     new CacheableResponsePlugin({
//       statuses: [0, 200],
//     }),
//     new ExpirationPlugin({
//       maxAgeSeconds: 30 * 24 * 60 * 60,
//     }),
//   ],
// });

// warmStrategyCache({
//   urls: ['/index.html', '/'],
//   strategy: pageCache,
// });

// registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// // TODO: Implement asset caching

// registerRoute(
//   // Here we define the callback function that will filter the requests we want to cache (in this case, JS and CSS files)
//   ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
//   new StaleWhileRevalidate({
//     // Name of the cache storage.
//     cacheName: 'asset-cache',
//     plugins: [
//       // This plugin will cache responses with these headers to a maximum-age of 30 days
//       new CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//     ],
//   })
// );