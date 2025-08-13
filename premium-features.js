// PREMIUM FEATURES FOR AWARD-WINNING PORTFOLIO
// Advanced Interactive Elements & Cutting-Edge Animations

class PremiumPortfolio {
    constructor() {
        this.init();
        this.initPreloader();
        this.initCursor();
        this.initScrollAnimations();
        this.initParallax();
        this.initAudioEffects();
        this.init3DElements();
        this.initImageLazyLoading();
        this.initPerformanceOptimization();
        this.initAccessibility();
        this.initSEOEnhancement();
        this.initAnalytics();
    }

    init() {
        console.log('🏆 Premium Portfolio Features Loading...');
        this.addPremiumStyles();
        this.initMagneticButtons();
        this.initTextReveal();
        this.initCounterAnimation();
        this.initCursorTrail();
        this.initMorphingShapes();
        this.initLightbox();
        this.initColorThemeSwitcher();
        this.initVoiceNavigation();
    }

    // Premium Preloader with Logo Animation
    initPreloader() {
        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="logo-animation">
                    <div class="thread-animation"></div>
                    <div class="needle-animation"></div>
                    <h2 class="loading-text">OZIL Fashion Hub</h2>
                </div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
                <p class="loading-percentage">0%</p>
            </div>
        `;
        document.body.appendChild(preloader);

        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => preloader.remove(), 1000);
                }, 500);
            }
            
            document.querySelector('.loading-progress').style.width = progress + '%';
            document.querySelector('.loading-percentage').textContent = Math.round(progress) + '%';
        }, 200);
    }

    // Custom Magnetic Cursor
    initCursor() {
        if (window.innerWidth > 768) {
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            const follower = document.createElement('div');
            follower.className = 'cursor-follower';
            
            document.body.appendChild(cursor);
            document.body.appendChild(follower);

            let mouseX = 0, mouseY = 0;
            let followerX = 0, followerY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                
                cursor.style.left = mouseX + 'px';
                cursor.style.top = mouseY + 'px';
            });

            // Smooth follower animation
            const animateFollower = () => {
                followerX += (mouseX - followerX) * 0.1;
                followerY += (mouseY - followerY) * 0.1;
                
                follower.style.left = followerX + 'px';
                follower.style.top = followerY + 'px';
                
                requestAnimationFrame(animateFollower);
            };
            animateFollower();

            // Interactive cursor effects
            document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('cursor-grow');
                    follower.classList.add('follower-grow');
                });
                
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('cursor-grow');
                    follower.classList.remove('follower-grow');
                });
            });
        }
    }

    // Advanced Parallax Effects
    initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }

    // Magnetic Button Effect
    initMagneticButtons() {
        document.querySelectorAll('.btn, .service-card, .portfolio-item').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    // Text Reveal Animation
    initTextReveal() {
        const textElements = document.querySelectorAll('h1, h2, h3, .hero-subtitle');
        
        textElements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';
            
            [...text].forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${i * 0.05}s`;
                span.className = 'char-reveal';
                element.appendChild(span);
            });
        });
    }

    // Animated Counters
    initCounterAnimation() {
        const counters = document.querySelectorAll('.stat h3');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent);
                    let current = 0;
                    
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current) + '+';
                        }
                    }, 50);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // Cursor Trail Effect
    initCursorTrail() {
        const canvas = document.createElement('canvas');
        canvas.id = 'cursor-trail';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const trail = [];
        const trailLength = 20;
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        document.addEventListener('mousemove', (e) => {
            trail.push({ x: e.clientX, y: e.clientY });
            if (trail.length > trailLength) {
                trail.shift();
            }
        });
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            trail.forEach((point, index) => {
                const opacity = index / trailLength;
                const size = (index / trailLength) * 10;
                
                ctx.beginPath();
                ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(231, 76, 60, ${opacity * 0.5})`;
                ctx.fill();
            });
            
            requestAnimationFrame(animate);
        };
        animate();
    }

    // 3D Morphing Shapes
    initMorphingShapes() {
        document.querySelectorAll('.float-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
            item.classList.add('morph-3d');
        });
    }

    // Advanced Lightbox Gallery
    initLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'premium-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img class="lightbox-image" src="" alt="">
                <div class="lightbox-info">
                    <h3 class="lightbox-title"></h3>
                    <p class="lightbox-description"></p>
                </div>
                <button class="lightbox-close">&times;</button>
                <button class="lightbox-prev">&#8249;</button>
                <button class="lightbox-next">&#8250;</button>
            </div>
        `;
        document.body.appendChild(lightbox);
        
        // Lightbox functionality
        document.querySelectorAll('.portfolio-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                // Implementation for lightbox opening
                lightbox.classList.add('active');
            });
        });
    }

    // Audio Feedback Effects
    initAudioEffects() {
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            
            const playTone = (frequency, duration = 0.1) => {
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            };
            
            // Add audio feedback to interactions
            document.querySelectorAll('button, a').forEach(el => {
                el.addEventListener('mouseenter', () => playTone(800, 0.1));
                el.addEventListener('click', () => playTone(1000, 0.2));
            });
        }
    }

    // Color Theme Switcher
    initColorThemeSwitcher() {
        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-switcher';
        themeToggle.innerHTML = `
            <div class="theme-options">
                <div class="theme-option active" data-theme="default"></div>
                <div class="theme-option" data-theme="purple"></div>
                <div class="theme-option" data-theme="green"></div>
                <div class="theme-option" data-theme="blue"></div>
            </div>
        `;
        document.body.appendChild(themeToggle);
        
        themeToggle.addEventListener('click', (e) => {
            if (e.target.classList.contains('theme-option')) {
                const theme = e.target.dataset.theme;
                document.body.className = `theme-${theme}`;
                
                document.querySelectorAll('.theme-option').forEach(opt => 
                    opt.classList.remove('active'));
                e.target.classList.add('active');
                
                localStorage.setItem('portfolio-theme', theme);
            }
        });
    }

    // Voice Navigation
    initVoiceNavigation() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            
            const voiceButton = document.createElement('button');
            voiceButton.className = 'voice-nav-button';
            voiceButton.innerHTML = '<i class="fas fa-microphone"></i>';
            document.body.appendChild(voiceButton);
            
            voiceButton.addEventListener('click', () => {
                recognition.start();
                voiceButton.classList.add('listening');
            });
            
            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                
                if (command.includes('home')) {
                    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
                } else if (command.includes('about')) {
                    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
                } else if (command.includes('portfolio') || command.includes('work')) {
                    document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth' });
                } else if (command.includes('contact')) {
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                }
                
                voiceButton.classList.remove('listening');
            };
        }
    }

    // Performance Optimization
    initPerformanceOptimization() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Preload critical resources
        this.preloadCriticalResources();
    }

    preloadCriticalResources() {
        const criticalImages = [
            'hero-bg.jpg',
            'profile-photo.jpg'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // SEO Enhancement
    initSEOEnhancement() {
        // Dynamic meta tags
        const metaTags = {
            'description': 'OZIL Fashion Hub - Award-winning custom sewing and fashion design in Nigeria. Professional tailoring services for modern women.',
            'keywords': 'custom sewing, fashion design, tailoring, Nigeria, women fashion, OZIL Fashion Hub',
            'og:title': 'OZIL Fashion Hub - Women\'s Custom Sewing',
            'og:description': 'Professional custom sewing and fashion design services in Oba, Anambra State, Nigeria.',
            'og:type': 'website'
        };
        
        Object.entries(metaTags).forEach(([name, content]) => {
            const meta = document.createElement('meta');
            meta.setAttribute(name.startsWith('og:') ? 'property' : 'name', name);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
        });
        
        // JSON-LD structured data
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "OZIL Fashion Hub",
            "description": "Custom sewing and fashion design services",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Oba",
                "addressRegion": "Anambra State",
                "addressCountry": "Nigeria"
            },
            "telephone": "+234 913 671 4537",
            "email": "info@ozilfashionhub.com"
        };
        
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    // Advanced Accessibility
    initAccessibility() {
        // Skip link
        const skipLink = document.createElement('a');
        skipLink.className = 'skip-link';
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // ARIA labels
        document.querySelectorAll('button:not([aria-label])').forEach(btn => {
            if (!btn.textContent.trim()) {
                btn.setAttribute('aria-label', 'Interactive button');
            }
        });
        
        // Keyboard navigation
        this.initKeyboardNavigation();
    }

    initKeyboardNavigation() {
        let focusableElements = [];
        let currentFocusIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                focusableElements = Array.from(document.querySelectorAll(
                    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
                ));
            }
        });
    }

    // Analytics & Heat Mapping
    initAnalytics() {
        const analytics = {
            pageViews: 0,
            interactions: {},
            timeSpent: Date.now()
        };
        
        // Track interactions
        document.addEventListener('click', (e) => {
            const element = e.target.tagName + (e.target.className ? '.' + e.target.className : '');
            analytics.interactions[element] = (analytics.interactions[element] || 0) + 1;
        });
        
        // Track time spent
        window.addEventListener('beforeunload', () => {
            analytics.timeSpent = Date.now() - analytics.timeSpent;
            localStorage.setItem('portfolio-analytics', JSON.stringify(analytics));
        });
    }

    // Add all premium styles
    addPremiumStyles() {
        const styles = `
            /* Premium Cursor Styles */
            .custom-cursor {
                position: fixed;
                width: 10px;
                height: 10px;
                background: #e74c3c;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                transition: transform 0.2s ease;
            }
            
            .cursor-follower {
                position: fixed;
                width: 40px;
                height: 40px;
                border: 2px solid rgba(231, 76, 60, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
            }
            
            .cursor-grow { transform: scale(2); }
            .follower-grow { transform: scale(1.5); }
            
            /* Preloader Styles */
            #preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #2c3e50, #34495e);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 100000;
                transition: opacity 1s ease;
            }
            
            .preloader-content {
                text-align: center;
                color: white;
            }
            
            .logo-animation {
                position: relative;
                margin-bottom: 2rem;
            }
            
            .thread-animation {
                width: 80px;
                height: 4px;
                background: linear-gradient(90deg, #e74c3c, #f39c12);
                margin: 0 auto 1rem;
                border-radius: 2px;
                animation: threadGlow 2s infinite;
            }
            
            .needle-animation {
                width: 2px;
                height: 40px;
                background: #ecf0f1;
                margin: 0 auto 1rem;
                border-radius: 1px;
                animation: needleMove 1.5s infinite;
            }
            
            .loading-text {
                font-size: 2rem;
                font-weight: 300;
                margin: 1rem 0;
            }
            
            .loading-bar {
                width: 300px;
                height: 4px;
                background: rgba(255,255,255,0.2);
                border-radius: 2px;
                margin: 1rem auto;
                overflow: hidden;
            }
            
            .loading-progress {
                height: 100%;
                background: linear-gradient(90deg, #e74c3c, #f39c12);
                border-radius: 2px;
                width: 0%;
                transition: width 0.3s ease;
            }
            
            .loading-percentage {
                font-size: 1.2rem;
                color: #bdc3c7;
            }
            
            @keyframes threadGlow {
                0%, 100% { box-shadow: 0 0 5px rgba(231, 76, 60, 0.5); }
                50% { box-shadow: 0 0 20px rgba(231, 76, 60, 0.8); }
            }
            
            @keyframes needleMove {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            /* Character Reveal Animation */
            .char-reveal {
                display: inline-block;
                opacity: 0;
                transform: translateY(20px) rotateX(90deg);
                animation: charReveal 0.6s forwards;
            }
            
            @keyframes charReveal {
                to {
                    opacity: 1;
                    transform: translateY(0) rotateX(0);
                }
            }
            
            /* 3D Morph Effects */
            .morph-3d {
                transform-style: preserve-3d;
                animation: morph3D 6s infinite;
            }
            
            @keyframes morph3D {
                0% { transform: rotateX(0) rotateY(0) rotateZ(0); }
                33% { transform: rotateX(360deg) rotateY(0) rotateZ(0); }
                66% { transform: rotateX(360deg) rotateY(360deg) rotateZ(0); }
                100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
            }
            
            /* Theme Switcher */
            .theme-switcher {
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                z-index: 1000;
                background: rgba(255,255,255,0.9);
                padding: 10px;
                border-radius: 25px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .theme-options {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .theme-option {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
                border: 3px solid transparent;
                transition: all 0.3s ease;
            }
            
            .theme-option[data-theme="default"] { background: linear-gradient(135deg, #e74c3c, #f39c12); }
            .theme-option[data-theme="purple"] { background: linear-gradient(135deg, #9b59b6, #8e44ad); }
            .theme-option[data-theme="green"] { background: linear-gradient(135deg, #27ae60, #2ecc71); }
            .theme-option[data-theme="blue"] { background: linear-gradient(135deg, #3498db, #2980b9); }
            
            .theme-option.active {
                border-color: #2c3e50;
                transform: scale(1.2);
            }
            
            /* Voice Navigation */
            .voice-nav-button {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: none;
                background: linear-gradient(135deg, #e74c3c, #f39c12);
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 5px 15px rgba(231, 76, 60, 0.3);
                transition: all 0.3s ease;
                z-index: 1000;
            }
            
            .voice-nav-button:hover {
                transform: scale(1.1);
                box-shadow: 0 10px 25px rgba(231, 76, 60, 0.4);
            }
            
            .voice-nav-button.listening {
                animation: pulse 1s infinite;
            }
            
            /* Cursor Trail Canvas */
            #cursor-trail {
                position: fixed;
                top: 0;
                left: 0;
                pointer-events: none;
                z-index: 9998;
            }
            
            /* Skip Link for Accessibility */
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: #2c3e50;
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 10001;
                transition: top 0.3s ease;
            }
            
            .skip-link:focus {
                top: 6px;
            }
            
            /* Premium Lightbox */
            .premium-lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            }
            
            .premium-lightbox.active {
                display: flex;
                animation: fadeIn 0.3s ease;
            }
            
            .lightbox-content {
                max-width: 90%;
                max-height: 90%;
                position: relative;
            }
            
            .lightbox-image {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .custom-cursor, .cursor-follower {
                    display: none;
                }
                
                .theme-switcher {
                    right: 10px;
                    top: 20px;
                    transform: none;
                }
                
                .theme-options {
                    flex-direction: row;
                }
                
                .voice-nav-button {
                    bottom: 20px;
                    right: 20px;
                    width: 50px;
                    height: 50px;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// Initialize Premium Features
document.addEventListener('DOMContentLoaded', () => {
    new PremiumPortfolio();
});

// Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(registration => console.log('SW registered'))
        .catch(error => console.log('SW registration failed'));
}
