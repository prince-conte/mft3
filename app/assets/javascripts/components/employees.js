$(document).on('click', '#employee-card-bio-details > a', function() {
    $(this).remove();

    $(document)
        .find('#employee-card-bio')
        .fadeIn(TRANSITION_DURATION_BASE);

    return false;
});