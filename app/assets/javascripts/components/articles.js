var $articlesBlocks = $(document).find('#articles-blocks');

$articlesBlocks.isotope({
    itemSelector: '.articles__block',
    layoutMode: 'masonry'
});

$(window).on('load', function() {
    $articlesBlocks.isotope('layout');
});