var $mobileMenu = $(document).find('#mobile-menu');

$(document).on('click', '#mobile-menu-toggle', function() {
    $mobileMenu
        .fadeToggle(TRANSITION_DURATION_BASE);

    $('body')
        .toggleClass('is-mobile-menu-open');

    $(this)
        .find('.icon')
        .toggleClass('mdi-menu mdi-close');

    return false;
});