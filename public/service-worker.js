self.addEventListener("fetch", function(e) {
    e.respondWith(caches.open("cache").then(function(s) {
        return s.match(e.request).then(function(t) {
            console.log("cache request: " + e.request.url);
            var n = fetch(e.request).then(function(t) {
                return console.log("fetch completed: " + e.request.url, t), t && (console.debug("updated cached page: " + e.request.url, t), "GET" === e.request.method && "basic" === t.type && s.put(e.request, t.clone())), t
            }, function(e) {
                console.log("Error in fetch()", e), e.waitUntil(caches.open("cache").then(function(e) {
                    return e.addAll("/")
                }))
            });
            return t || n
        })
    }))
}), self.addEventListener("install", function(e) {
    self.skipWaiting(), console.log("Latest version installed!")
});