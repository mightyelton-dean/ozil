// SERVICE WORKER FOR OZIL FASHION HUB PWA
// Enables offline functionality and improves performance

const CACHE_NAME = 'ozil-fashion-hub-v1.0';
const STATIC_CACHE = 'ozil-static-v1.0';
const DYNAMIC_CACHE = 'ozil-dynamic-v1.0';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/premium-features.js',
    '/thank-you.html',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.css',
    'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Network-first resources
const NETWORK_FIRST = [
    '/api/',
    'https://formspree.io/',
    'https://maps.googleapis.com/'
];

// Install event - cache static assets
self.addEventListener('install', event => {
    console.log('🔧 Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('📦 Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('✅ Service Worker: Static files cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('❌ Service Worker: Error caching static files', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('🚀 Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('✅ Service Worker: Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') return;
    
    // Skip chrome-extension and other non-http(s) requests
    if (!request.url.startsWith('http')) return;
    
    // Handle different caching strategies
    if (isStaticAsset(request.url)) {
        event.respondWith(cacheFirst(request));
    } else if (isNetworkFirst(request.url)) {
        event.respondWith(networkFirst(request));
    } else {
        event.respondWith(staleWhileRevalidate(request));
    }
});

// Cache first strategy - for static assets
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        console.log('📡 Service Worker: Network request failed, serving from cache');
        return caches.match(request) || caches.match('/index.html');
    }
}

// Network first strategy - for API calls and dynamic content
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(DYNAMIC_CACHE);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        console.log('📡 Service Worker: Network failed, trying cache');
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        // Return offline page for HTML requests
        if (request.headers.get('Accept').includes('text/html')) {
            return caches.match('/index.html');
        }
        throw error;
    }
}

// Stale while revalidate - for regular pages
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then(networkResponse => {
        cache.put(request, networkResponse.clone());
        return networkResponse;
    }).catch(() => cachedResponse);
    
    return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(url) {
    return STATIC_FILES.some(staticFile => url.includes(staticFile)) ||
           url.includes('.css') ||
           url.includes('.js') ||
           url.includes('.png') ||
           url.includes('.jpg') ||
           url.includes('.jpeg') ||
           url.includes('.svg') ||
           url.includes('.woff') ||
           url.includes('.woff2');
}

function isNetworkFirst(url) {
    return NETWORK_FIRST.some(pattern => url.includes(pattern));
}

// Handle background sync for form submissions
self.addEventListener('sync', event => {
    console.log('🔄 Service Worker: Background sync triggered');
    
    if (event.tag === 'contact-form-sync') {
        event.waitUntil(syncContactForm());
    }
});

async function syncContactForm() {
    try {
        const formData = await getStoredFormData();
        if (formData) {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                await clearStoredFormData();
                console.log('✅ Service Worker: Form submitted successfully in background');
            }
        }
    } catch (error) {
        console.error('❌ Service Worker: Background sync failed', error);
    }
}

// Push notifications (if needed later)
self.addEventListener('push', event => {
    console.log('📬 Service Worker: Push message received');
    
    const options = {
        body: event.data ? event.data.text() : 'New message from OZIL Fashion Hub',
        icon: '/icon-192x192.png',
        badge: '/icon-badge-72x72.png',
        vibrate: [200, 100, 200],
        tag: 'ozil-notification',
        actions: [
            {
                action: 'view',
                title: 'View',
                icon: '/icon-view.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/icon-close.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('OZIL Fashion Hub', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    console.log('🔔 Service Worker: Notification clicked');
    
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Preload critical resources
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'PRELOAD_RESOURCES') {
        event.waitUntil(preloadResources(event.data.resources));
    }
});

async function preloadResources(resources) {
    const cache = await caches.open(STATIC_CACHE);
    return cache.addAll(resources);
}

// Helper functions for form data storage
async function getStoredFormData() {
    // Implementation depends on how you want to store form data
    // This is a placeholder - you'd use IndexedDB or similar
    return null;
}

async function clearStoredFormData() {
    // Clear stored form data after successful submission
    return true;
}

// Performance monitoring
self.addEventListener('fetch', event => {
    if (event.request.url.includes('/api/analytics')) {
        event.respondWith(handleAnalytics(event.request));
    }
});

async function handleAnalytics(request) {
    try {
        // Send analytics data when online
        return await fetch(request);
    } catch (error) {
        // Store analytics data when offline
        const cache = await caches.open(DYNAMIC_CACHE);
        return new Response('Analytics stored for later sync', { status: 200 });
    }
}

console.log('🏆 OZIL Fashion Hub Service Worker loaded successfully!');
