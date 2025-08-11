// Video and Animation Performance Optimizer
(function() {
    'use strict';

    // Video optimization
    function optimizeHeroVideo() {
        const video = document.querySelector('.custom-video');
        const videoWrapper = document.querySelector('.videoWrapper');
        
        if (!video || !videoWrapper) return;

        // Show poster image immediately
        videoWrapper.style.backgroundImage = `url('${video.poster}')`;
        
        // Optimize video loading based on connection speed
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            // For slow connections, delay video loading
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                video.preload = 'none';
                video.removeAttribute('autoplay');
                return; // Don't load video on very slow connections
            } else if (connection.effectiveType === '3g') {
                video.preload = 'metadata';
            } else {
                video.preload = 'auto';
            }
        }

        // Handle video loading states
        video.addEventListener('loadstart', function() {
            console.log('Video loading started');
        });

        video.addEventListener('canplay', function() {
            video.classList.add('loaded');
            console.log('Video ready to play');
        });

        video.addEventListener('loadeddata', function() {
            // Video has loaded enough data to start playing
            video.style.opacity = '1';
        });

        // Fallback: If video takes too long, keep poster
        setTimeout(function() {
            if (video.readyState < 3) { // HAVE_FUTURE_DATA
                console.log('Video loading timeout - using poster fallback');
                video.style.display = 'none';
            }
        }, 5000); // 5 second timeout
    }

    // Services section animation optimization
    function optimizeServicesAnimation() {
        const servicesGrid = document.querySelector('.ch-grid');
        if (!servicesGrid) return;

        // Use Intersection Observer for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add loaded class with a slight delay for smoother animation
                    setTimeout(() => {
                        entry.target.classList.add('loaded');
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px 0px'
        });

        observer.observe(servicesGrid);

        // Optimize individual service items
        const serviceItems = document.querySelectorAll('.ch-item');
        serviceItems.forEach((item, index) => {
            // Stagger animation for better visual effect
            item.style.transitionDelay = `${index * 0.1}s`;
            
            // Optimize transforms for better performance
            item.style.transform = 'translateZ(0)';
            item.style.willChange = 'transform, opacity';
        });
    }

    // Preload critical images
    function preloadCriticalImages() {
        const criticalImages = [
            'img/woyez.png' // Hero poster image
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Reduce motion for users who prefer it
    function respectReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            // Disable video autoplay for users who prefer reduced motion
            const video = document.querySelector('.custom-video');
            if (video) {
                video.removeAttribute('autoplay');
                video.controls = true;
            }

            // Reduce animation duration
            const style = document.createElement('style');
            style.textContent = `
                .ch-grid, .ch-item {
                    transition-duration: 0.1s !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize optimizations
    function init() {
        // Run immediately for critical optimizations
        preloadCriticalImages();
        respectReducedMotion();

        // Run when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                optimizeHeroVideo();
                optimizeServicesAnimation();
            });
        } else {
            optimizeHeroVideo();
            optimizeServicesAnimation();
        }
    }

    // Start optimization
    init();

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const videoElement = document.querySelector('.custom-video');
                if (videoElement) {
                    console.log('Video optimization status:', {
                        'Ready State': videoElement.readyState,
                        'Network State': videoElement.networkState,
                        'Preload Setting': videoElement.preload,
                        'Has Loaded Class': videoElement.classList.contains('loaded')
                    });
                }
            }, 1000);
        });
    }
})();
