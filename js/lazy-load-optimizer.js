// Advanced Lazy Loading and Performance Optimizations
(function() {
    'use strict';

    // Intersection Observer for advanced lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add fade-in effect
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease-in-out';
                    
                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                        img.classList.add('loaded');
                    };
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Preload critical images
    function preloadCriticalImages() {
        const criticalImages = [
            'img/gallery/web1.png',
            'img/gallery/web2.png',
            'img/gallery/logo1.png'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Optimize video loading
    function optimizeVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // Only load video when it comes into view
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.preload = 'metadata';
                        videoObserver.unobserve(video);
                    }
                });
            }, { threshold: 0.25 });
            
            videoObserver.observe(video);
        });
    }

    // Defer non-critical CSS
    function loadNonCriticalCSS() {
        const nonCriticalCSS = document.querySelectorAll('link[media="print"]');
        nonCriticalCSS.forEach(link => {
            link.media = 'all';
        });
    }

    // Initialize optimizations when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            preloadCriticalImages();
            optimizeVideos();
            setTimeout(loadNonCriticalCSS, 1000);
        });
    } else {
        preloadCriticalImages();
        optimizeVideos();
        setTimeout(loadNonCriticalCSS, 1000);
    }

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Performance:', {
                    'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                    'Load Complete': Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                    'Total Load Time': Math.round(perfData.loadEventEnd - perfData.navigationStart)
                });
            }, 0);
        });
    }
})();
