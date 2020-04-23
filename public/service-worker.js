self.addEventListener("fetch", function(e) {
    e.respondWith(caches.open("cache").then(function(s) {
        return s.match(e.request).then(function(t) {
            // console.log("cache request: " + e.request.url);
            var n = fetch(e.request).then(function(t) {
                return console.log("fetch completed: " + e.request.url, t), t && (console.debug("updated cached page: " + e.request.url, t), "GET" === e.request.method && "basic" === t.type && s.put(e.request, t.clone())), t
            }, function(e) {
                console.log("Error in fetch()", e), e.waitUntil(caches.open("cache").then(function(e) {
                    return e.addAll(["/", 'offline.html'])
                }))
            });
            return t || n
        }).catch(function() {
            // If both fail, show a generic fallback:
            return caches.match('/offline.html');
            // However, in reality you'd have many different
            // fallbacks, depending on URL & headers.
            // Eg, a fallback silhouette image for avatars.
        })
    }))
}), self.addEventListener("install", function(e) {
    self.skipWaiting(), e.waitUntil((async() => {
        const cache = await caches.open("cache");
        // Setting {cache: 'reload'} in the new request will ensure that the response
        // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
        await cache.add("./offline.html");
    })()), console.log("Latest version installed!")
});