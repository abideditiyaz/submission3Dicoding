importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');//versi 5.1.3 tidak bisa pake workbox.staleWhileRevalidate()
if (workbox) {
  console.log('Workbox berhasil dimuat');
}else{
  console.error('Workbox gagal dimuat!!');
}

workbox.precaching.precacheAndRoute([
    {
      url: '/',
      revision: '1'
    },
    {
      url: '/manifest.json',
      revision: '1'
    },
    {
      url: '/nav.html',
      revision: '1'
    },
    {
      url: '/index.html',
      revision: '1'
    },
    {
      url: '/details.html',
      revision: '1'
    },
    {
      url: '/pages/home.html',
      revision: '1'
    },
    {
      url: '/pages/matches.html',
      revision: '1'
    },
    {
      url: '/pages/favorit.html',
      revision: '1'
    },
    {
      url: '/css/materialize.min.css',
      revision: '1'
    },
    {
      url: '/materialize.min.js',
      revision: '1'
    },
    {
      url: '/nav.js',
      revision: '1'
    },
    {
      url: '/api.js',
      revision: '1'
    },
    {
      url: '/dateHelper.js',
      revision: '1'
    },
    {
      url: '/statHome.js',
      revision: '1'
    },
    {
      url: '/matches.js',
      revision: '1'
    },
    {
      url: '/js/detail.js',
      revision: '1'
    },
    {
      url: '/js/idb.js',
      revision: '1'
    },
    {
      url: '/js/timFav.js',
      revision: '1'
    },
    {
      url: '/js/db.js',
      revision: '1'
    },
    {
      url: '/asset/icon.png',
      revision: '1'
    },
    {
      url: '/asset/icon192.png',
      revision: '1'
    },
    {
      url: '/asset/iconIOS.png',
      revision: '1'
    },
    {
      url: '/asset/iconR.png',
      revision: '1'
    },
    {
      url: '/asset/matchesInside.png',
      revision: '1'
    },
    {
      url: '/asset/topMatches.png',
      revision: '1'
    }
  ], {
    ignoreUrlParametersMatching: [/.*/]
  });

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 15,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('/css/materialize.min.css'),
    workbox.strategies.cacheFirst()
);

self.addEventListener('push', function(event){
  let body;
  if (event.data) {
    body = event.data.text();
  }else{
    body= 'push message no Payload';
  }

  let options = {
    body: body,
    icon: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});