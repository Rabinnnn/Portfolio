// Gallery Filter JavaScript
console.log('Gallery filter script loaded!');

$(document).ready(function() {
    console.log('Gallery filter - Document ready');
    console.log('jQuery available:', typeof $ !== 'undefined');
    console.log('Gallery filter menu found:', $('.gallery-filter-menu').length);
    console.log('Gallery filter buttons found:', $('.gallery-filter-menu button').length);
    console.log('Gallery grid items found:', $('.gallery-grid-item').length);
    
    // Gallery filter functionality
    $('.gallery-filter-menu button').on('click', function(e) {
        console.log('Gallery filter button clicked!');
        console.log('Button text:', $(this).text());
        
        e.preventDefault();
        e.stopPropagation();
        
        // Remove active class from all buttons
        $('.gallery-filter-menu button').removeClass('active');
        console.log('Removed active class from all buttons');
        
        // Add active class to clicked button
        $(this).addClass('active');
        console.log('Added active class to clicked button');
        console.log('Button now has active class:', $(this).hasClass('active'));
        
        // Get filter value
        var filterValue = $(this).attr('data-filter');
        console.log('Filter value:', filterValue);
        
        // Apply filter
        if (filterValue === '*') {
            console.log('Showing all items');
            $('.gallery-grid-item').fadeIn(300);
        } else {
            console.log('Filtering to:', filterValue);
            console.log('Items to hide:', $('.gallery-grid-item').length);
            console.log('Items to show:', $('.gallery-grid-item' + filterValue).length);
            
            $('.gallery-grid-item').fadeOut(300);
            $('.gallery-grid-item' + filterValue).fadeIn(300);
        }
        
        return false;
    });
    
    console.log('Gallery filter setup complete');

    // Animated arrow scroll functionality
    $('.animated-arrow').on('click', function(e) {
        e.preventDefault();

        // Smooth scroll to gallery section
        $('html, body').animate({
            scrollTop: $('.gallery_area').offset().top - 100
        }, 800, 'easeInOutQuad');

        // Add a little bounce effect on click
        $(this).find('i').css('animation', 'pulse 0.6s ease-in-out');

        setTimeout(() => {
            $(this).find('i').css('animation', 'bounce 2s infinite');
        }, 600);
    });

    // Read More functionality
    $('.gallery-description').each(function() {
        var $this = $(this);
        var text = $this.text();
        var maxLength = 80; // Maximum characters to show initially

        if (text.length > maxLength) {
            var truncatedText = text.substring(0, maxLength) + '...';
            var fullText = text;

            // Create the truncated version
            $this.html(truncatedText + ' <a href="#" class="read-more-btn">Read more</a>');
            $this.addClass('truncated');

            // Store the full text as data attribute
            $this.data('full-text', fullText);
            $this.data('truncated-text', truncatedText);
        }
    });

    // Handle Read More / Read Less clicks
    $(document).on('click', '.read-more-btn', function(e) {
        e.preventDefault();
        var $description = $(this).closest('.gallery-description');
        var fullText = $description.data('full-text');
        var truncatedText = $description.data('truncated-text');

        if ($(this).text() === 'Read more') {
            $description.html(fullText + ' <a href="#" class="read-more-btn">Read less</a>');
            $description.removeClass('truncated');
        } else {
            $description.html(truncatedText + ' <a href="#" class="read-more-btn">Read more</a>');
            $description.addClass('truncated');
        }
    });
});
