var $header = $(document).find('#header');
var $navigation = $(document).find('#navigation');
var $picture = $(document).find('#picture');

function stickyHeader() {
    var stickyPosition;

    if ($navigation.length) {
        stickyPosition = $navigation.offset().top + $navigation.outerHeight();
    } else if ($picture.length) {
        stickyPosition = $picture.offset().top + $picture.outerHeight();;
    } else {
        return;
    }

    if ($(window).scrollTop() > stickyPosition) {
        $('body')
            .css('padding-top', $header.outerHeight());

        $header
            .addClass('is-sticky');
    } else {
        $header
            .removeClass('is-sticky');

        $('body')
            .css('padding-top', '');
    }
}

$(document).on('scroll resize', function() {
    stickyHeader();
});