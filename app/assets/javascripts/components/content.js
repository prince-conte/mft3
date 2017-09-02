// Video (Youtube, Vimeo)
$(document)
    .find('.js-content > iframe[src*="vimeo"], .js-content > iframe[src*="youtube"]')
    .each(function() {
        $(this).wrap('<div class="content__video"/>');
    });
