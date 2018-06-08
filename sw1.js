var CACHE_NAME ;
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

  var urlToCacheSynchronous = [];
  var hashes, hash;
  //initiates pushengage code
  var searchParam = new URL(location).searchParams;
  if(searchParam.get("hash")){
    hashes = JSON.parse(searchParam.get("hash"));
    for(var key in hashes) {
      if(key.toLowerCase().indexOf("css") != -1){
        urlToCacheSynchronous.push(hashes[key]);
      } else {
        urlToCacheSynchronous.push(hashes[key]);
      }
    }
  
  if(urlToCacheSynchronous.length){
    
    var hashValue = urlToCacheSynchronous[0].split("assets/")[1];
    hash = hashValue ? hashValue.split(".")[1] : ""
    hash = hash || "default";   
     
  }
  // Perform install steps
  CACHE_NAME = `ajio-cache-${hash}`;
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(urlToCacheSynchronous).catch((error) => {console.log(`Could not cache static urls. Exception: ${error}`); })
    })
    .catch((error) => {console.log(`Could not open cache. Exception: + ${error}`);})
  )
  }
});

self.addEventListener('fetch', function(event) {
  
  function matchcssandjs(url){
    return (url.includes('static/assets/desktop') || url.includes('static/assets/mobile'))
  }

  if(CACHE_NAME){
    url_re = new RegExp(/\.(jpg|png)\b/);
    if(event.request.url.match(url_re) || matchcssandjs(event.request.url)){
      event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
          return cache.match(event.request)
            .then((response) => {
              return response || fetch(event.request).then((response) => {
                if(response) {
                  cache.put(event.request, response.clone())
                  .catch((e) => {
                    console.log('Cache limit exceeded. Error : ' + e);
                  });
                }
                return response;
              }).catch((error) => {
                console.log(`Failed to fetch resource for request ${event.request} due to ${error}`);
              })
            })
            .catch((error) => {
              console.log(`Failed in finding the match for request ${event.request} due to ${error}`);
            })
        })
        .catch((error) => {
          console.log(`Failed in open the cache file for matching file : ${error}`)
        })
      );
    }
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
    .catch((error) => {
      console.log(`failed to activate : ${error}`)
    })
  );
});

/*
********************************************
AJIO service worker ends
********************************************
 */

self.addEventListener('push', function(event) { 
   event.waitUntil(self.registration.pushManager.getSubscription().then(function(o) {    
     if (event.data) {
        console.log(event.data);        
        var json=event.data.json();

        for (var index = 0; index < json.length; index++)        
        {
            fetch(clientApi+'/notification/view?device='+getDeviceID(o.endpoint)+'&swv='+swversion+'&bv='+get_browser()+'&tag='+json[index].options.tag).then(function (response) {      
                console.log("response from view ");
                console.log(response);
            }); 
            payload_notifs.push(self.registration.showNotification(json[index].title, json[index].options));
        }
        return Promise.all(payload_notifs);
      }

     return fetch(clientApi+'/notification?swv='+swversion+'&bv='+get_browser()+'&device='+getDeviceID(o.endpoint)).then(function (response) {          
        return response.json().then(function (jsondata) {
            console.log(jsondata);
            var json = jsondata;
            
            var nlist=[];          
                  
                for (var i = json.length - 1; i >= 0; i--) {                    
                    
                    nlist.push(handle_notification(json[i].title, json[i].options));
                    
                };                
            return Promise.all(nlist);
        })
    });
  }));


});​


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
