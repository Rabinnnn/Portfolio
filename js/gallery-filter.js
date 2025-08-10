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
});
