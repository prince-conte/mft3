var $reviewsBlocks = $(document).find('#reviews-blocks');

$reviewsBlocks.isotope({
    itemSelector: '.reviews__block',
    layoutMode: 'masonry'
});

$(window).on('load', function() {
    $reviewsBlocks.isotope('layout');
});