// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const navDots = document.querySelectorAll('.nav-dot');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all nav dots
    navDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial
    testimonials[index].classList.add('active');
    navDots[index].classList.add('active');
}

// Auto-play testimonials
function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Set up auto-play
setInterval(nextTestimonial, 5000);

// Manual navigation
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // Simulate form submission (replace with actual form handling)
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // Reset labels
    document.querySelectorAll('.form-group label').forEach(label => {
        label.style.transform = '';
        label.style.fontSize = '';
        label.style.color = '';
    });
    
    console.log('Form submitted:', formObject);
});

// Form label animations
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        const label = this.nextElementSibling;
        if (label && label.tagName === 'LABEL') {
            animateLabel(label, true);
        }
    });
    
    field.addEventListener('blur', function() {
        const label = this.nextElementSibling;
        if (label && label.tagName === 'LABEL' && !this.value) {
            animateLabel(label, false);
        }
    });
});

function animateLabel(label, focused) {
    if (focused) {
        label.style.transform = 'translateY(-25px)';
        label.style.fontSize = '0.8rem';
        label.style.color = '#e74c3c';
    } else {
        label.style.transform = '';
        label.style.fontSize = '';
        label.style.color = '';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Floating animation for hero elements
function createFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.float-item');
    
    floatingElements.forEach((element, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        const randomDistance = 15 + Math.random() * 10;
        
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
        element.style.setProperty('--float-distance', `${randomDistance}px`);
    });
}

// Initialize floating animation
createFloatingAnimation();

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #e74c3c, #f39c12);
        z-index: 10000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Google Maps Integration
function initMap() {
    // Default coordinates (Oba, Anambra State, Nigeria)
    const location = { lat: 6.0834, lng: 6.7340 };
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: location,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "weight": "2.00"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#9c9c9c"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#7b7b7b"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#c8d7d4"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#070707"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            }
        ]
    });
    
    // Custom marker
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'OZIL Fashion Hub',
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#e74c3c" stroke="#fff" stroke-width="3"/>
                    <circle cx="20" cy="20" r="8" fill="#fff"/>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20)
        }
    });
    
    // Info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; font-family: 'Lato', sans-serif;">
                <h3 style="margin: 0 0 10px 0; color: #2c3e50; font-family: 'Playfair Display', serif;">OZIL Fashion Hub</h3>
                <p style="margin: 0; color: #6c757d;">Oba, Anambra State<br>Nigeria</p>
                <p style="margin: 10px 0 0 0; color: #e74c3c; font-weight: 600;">+234 913 671 4537</p>
            </div>
        `
    });
    
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-content').forEach(el => {
    observer.observe(el);
});

// Lazy loading for images (when you add real images)
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
lazyLoadImages();

// Performance optimization: Debounce scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    // Scroll-related functions here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Console welcome message
console.log(`
🧵 Welcome to OZIL Fashion Hub Portfolio! 🧵

This website showcases:
✨ Advanced CSS animations
📱 Responsive design
🗺️ Google Maps integration
🎨 Professional UI/UX
⚡ Optimized performance
🇳🇬 Located in Nigeria

Built with love for women's custom sewing services.
`);

// Enhanced Animation Controller
class AnimationController {
    constructor() {
        this.initAdvancedAnimations();
        this.initParticleSystem();
        this.initTypingEffect();
    }

    initAdvancedAnimations() {
        // Intersection Observer for advanced animations
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerElementAnimation(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observe all elements with animation classes
        document.querySelectorAll('[data-animate]').forEach(el => {
            animationObserver.observe(el);
        });

        // Add random delay animations to floating elements
        this.randomizeFloatingAnimations();
    }

    triggerElementAnimation(element) {
        const animationType = element.dataset.animate;
        element.classList.add(`animate-${animationType}`);
    }

    randomizeFloatingAnimations() {
        const floatingElements = document.querySelectorAll('.float-item, .sparkle');
        floatingElements.forEach((element, index) => {
            const randomDelay = Math.random() * 3;
            const randomDuration = 2 + Math.random() * 4;
            element.style.animationDelay = `${randomDelay}s`;
            element.style.animationDuration = `${randomDuration}s`;
        });
    }

    initParticleSystem() {
        // Create floating particles for background effect
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-system';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 50; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        const symbols = ['✂️', '🧵', '📏', '📌', '🎀', '✨'];
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        particle.innerHTML = symbol;
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 10}px;
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 20 + 10}s infinite linear;
        `;
        
        container.appendChild(particle);

        // Remove and recreate particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.createParticle(container);
            }
        }, (Math.random() * 20 + 10) * 1000);
    }

    initTypingEffect() {
        // Add typing effect to hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.innerHTML = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    heroTitle.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                } else {
                    // Add blinking cursor
                    const cursor = document.createElement('span');
                    cursor.innerHTML = '|';
                    cursor.style.animation = 'blink 1s infinite';
                    heroTitle.appendChild(cursor);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
}

// Additional CSS for new animations
const additionalStyles = `
    @keyframes particleFloat {
        0% {
            transform: translateY(100vh) rotate(0deg);
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
        }
    }

    .animate-slideInFromLeft {
        animation: slideInFromLeft 0.8s ease-out;
    }

    .animate-slideInFromRight {
        animation: slideInFromRight 0.8s ease-out;
    }

    .animate-zoomIn {
        animation: zoomIn 0.6s ease-out;
    }

    .animate-flipIn {
        animation: flipIn 0.8s ease-out;
    }

    .animate-rubberBand {
        animation: rubberBand 1s ease-in-out;
    }

    .animate-wiggle {
        animation: wiggle 0.8s ease-in-out;
    }

    .animate-jello {
        animation: jello 1s ease-in-out;
    }

    /* Glowing text effect */
    .glow-text {
        text-shadow: 0 0 10px rgba(231, 76, 60, 0.5),
                     0 0 20px rgba(231, 76, 60, 0.3),
                     0 0 30px rgba(231, 76, 60, 0.2);
        animation: glow 2s ease-in-out infinite alternate;
    }

    @keyframes glow {
        from {
            text-shadow: 0 0 10px rgba(231, 76, 60, 0.5),
                         0 0 20px rgba(231, 76, 60, 0.3),
                         0 0 30px rgba(231, 76, 60, 0.2);
        }
        to {
            text-shadow: 0 0 20px rgba(231, 76, 60, 0.8),
                         0 0 30px rgba(231, 76, 60, 0.6),
                         0 0 40px rgba(231, 76, 60, 0.4);
        }
    }

    /* Morphing shapes */
    .morph-shape {
        animation: morphShape 6s ease-in-out infinite;
    }

    @keyframes morphShape {
        0%, 100% {
            border-radius: 50%;
            transform: rotate(0deg);
        }
        25% {
            border-radius: 0%;
            transform: rotate(90deg);
        }
        50% {
            border-radius: 50%;
            transform: rotate(180deg);
        }
        75% {
            border-radius: 0%;
            transform: rotate(270deg);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize enhanced animations
const animationController = new AnimationController();

// Page load performance
window.addEventListener('load', () => {
    console.log(`Page loaded in ${performance.now().toFixed(2)}ms`);
    
    // Hide loading animation if you add one
    document.body.classList.add('loaded');
});

// Error handling for Google Maps
window.addEventListener('error', (e) => {
    if (e.message.includes('Google Maps')) {
        console.warn('Google Maps failed to load. Please check your API key.');
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f8f9fa; color: #6c757d; text-align: center; padding: 2rem;">
                    <div>
                        <i class="fas fa-map-marker-alt" style="font-size: 3rem; margin-bottom: 1rem; color: #e74c3c;"></i>
                        <h4>Map Unavailable</h4>
                        <p>Oba, Anambra State, Nigeria</p>
                        <p>+234 913 671 4537</p>
                    </div>
                </div>
            `;
        }
    }
});
