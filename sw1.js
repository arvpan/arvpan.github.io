/**
    CacheStrategy for the file

 * 1. All static file which controls the basic look and feel of page
 *    will be in synchronous to the install step.
 * 2. Bigger resources which are not required immediately to be shown
 *    will be in asynchronous strategy
 * 3. Slient updates of assets will be done through "sync" event of service
 *    worker
 */
var CACHE_NAME ;
//var CACHE_NAME =  'my-site-cache-v1';

/**
 * Hash value of assets has to be stored in local variable
 * which will helps in update of assets in background sliently.
 */

  /**
     *  '/shop/men',
     * '/',
  '/shop/women',
  '/c/8303'
     */

var urlToCacheSynchronous = [];
// importScripts("https://AJIO.pushengage.com/service-worker.js");
var hashes, hash;
var urlToCacheAsynchronous = [];

var swversion = '2.0.0';
var clientApi = "https://sw.pushengage.com/p/v1";

function get_browser() {
    var ua = navigator.userAgent,
        tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return {
            name: 'IE',
            version: (tem[1] || '')
        };
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/)
        if (tem != null) {
            return {
                name: 'Opera',
                version: tem[1]
            };
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return M[1];
}

function UpgradeSW() {
  self.registration.pushManager.getSubscription().then(function(subscription) {
      if (subscription != null) {
          console.log("ServiceWorker Upgraded");
          var subscriptionJson = JSON.stringify(subscription);
          var subscriptionId = getDeviceID(subscription.endpoint);
          var subscriptionObj = JSON.parse(subscriptionJson);
          var endpoint = subscriptionObj.endpoint;
          var keys = subscriptionObj.keys;
          var data = JSON.stringify({
              "device_token": subscriptionId,
              "endpoint": endpoint,
              "keys": keys
          });
          fetch(clientApi + "/subscriber/upgrade?swv=" + swversion + "&bv=" + get_browser() + "&subscription=" + data, {
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              method: "GET"
          }).then(function(res) {
              console.log(res)
          }).catch(function(res) {
              console.log(res)
          })
      } else {
          console.log("New User registration");
      }
  })
};

var device = "";
self.addEventListener('notificationclick', function(event) {
    event.waitUntil(self.registration.pushManager.getSubscription().then(function(o) {
        device = getDeviceID(o.endpoint);
        handle_click(event, device);
    }));
    event.notification.close();
});

/*
********************************************
AJIO service worker starts
********************************************
 */





self.addEventListener('install', function(event) {

event.waitUntil(self.skipWaiting());
UpgradeSW();


  var searchParam = new URL(location).searchParams;
  if(searchParam.get("hash")){
    hashes = JSON.parse(searchParam.get("hash"));
    var itemAry;
    for(var key in hashes) {
      itemAry = hashes[key].split("-");
      hash = itemAry[0];
      if(key.toLowerCase().indexOf("css") != -1){
        urlToCacheSynchronous.push(`/static/assets/${itemAry[1]}.${itemAry[0]}.css`);
      } else {
        urlToCacheSynchronous.push(`/static/assets/${itemAry[1]}.${itemAry[0]}.js`);
      }
    }
  }
  // Perform install steps
  CACHE_NAME = `ajio-cache-${hash}`;
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlToCacheSynchronous);
      })
  );
  //initiates pushengage code
  //UpgradeSW();
});

self.addEventListener('fetch', function(event) {
  
  function matchcssandjs(url){
    return (url.includes('static/assets/desktop') || url.includes('static/assets/mobile'))
  }

  url_re = new RegExp(/\.(jpg|png)\b/);
    if (event.request.url.match(url_re) || matchcssandjs(event.request.url)){
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache){
        return cache.match(event.request)
          .then(function(response) {
            if (response) {
            //console.log('SERVED FROM CACHE');
              return response;
            }
            return fetch(event.request).then(function(response){
              var clone=response.clone();
                //console.log('Response from network is:', response);
                if(response) {
                    cache.put(event.request, response.clone())
                    .catch((e) => {
                      console.log('Cache limit exceeded. Error : ' + e);
                    });
                }
                return response;
            });
          }
        )
      })
    );
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

/*
********************************************
AJIO service worker ends
********************************************
 */

self.addEventListener('push', function(event) {
  event.waitUntil(
    self.registration.showNotification('Got Push?', {
      body: 'Push Message received'
   }));
});


function handle_click(event, device) {
  var usr_action = '';
  var notification_redirect_url = event.notification.data;
  if (event.action != "" && typeof(event.action) != 'undefined')
      var action_str = JSON.parse(event.action);
  else
      var action_str = '';
  if (action_str == '') {
      usr_action = 'action3';
      notification_redirect_url = event.notification.data;
  } else {
      if (action_str.action == 'action1') {
          usr_action = 'action1';
          notification_redirect_url = action_str.action_url;
      } else if (action_str.action == 'action2') {
          usr_action = 'action2';
          notification_redirect_url = action_str.action_url;
      }
  }
  fetch(clientApi + '/notification/click?swv=' + swversion + '&bv=' + get_browser() + '&device=' + device + '&tag=' + event.notification.tag + '&action=' + usr_action).then(function(response) {
      console.log("response from click");
      console.log(response)
  });
  return clients.openWindow(notification_redirect_url);
}

function handle_notification(t, n) {
  return self.registration.showNotification(t, n);
}

function getDeviceID(endpoint) {
  var device_id = "";
  if (endpoint.indexOf('mozilla') > -1) {
      device_id = endpoint.split("/")[endpoint.split("/").length - 1];
  } else {
      device_id = endpoint.slice(endpoint.search("send/") + 5);
  }
  return device_id;
}





