$(document).on('click touchend', '#messengers-action', function() {
    $(this).toggleClass('is-active');

    return false;
});

$(document).on('click touchend', function(e) {
    var $messengersAction = $('#messengers-action');

    if (!$messengersAction.is(e.target) && $messengersAction.has(e.target).length === 0) {
        $messengersAction.removeClass('is-active');
    }
});