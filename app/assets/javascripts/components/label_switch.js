$(function() {

    function labelSwitch() {


        $('.js-label-switch label').removeClass('is-active');

        if ($('.js-label-switch input[type="checkbox"]').prop('checked')) {

            $('.js-label-switch-one').addClass('is-active');

        } else {
            $('.js-label-switch-two').addClass('is-active');
        }
    }


    console.log($('.js-label-switch').length);

    if ($('.js-label-switch').length) {
        labelSwitch()
    }

    $(document).on('click touchend', '.js-label-switch' , function(e) {

        labelSwitch()

    });

});