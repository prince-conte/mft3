$(function() {

    var $alertMessage;

    function alertOpen() {

        if ($alertMessage.is(':hidden')) {
            $alertMessage.addClass('alert-animate');
        }
    }


    $(document).on('click touchend', '.js-alert-open-save', function () {

        $alertMessage = $('.js-alert-save');

        alertOpen();

        setTimeout(function () {
            $alertMessage.removeClass('alert-animate');
        }, 2000);

        return false;
    });


    $(document).on('click touchend', '.js-alert-open-delete', function () {

        $alertMessage = $('.js-alert-delete');

        alertOpen();

        return false;
    });


    $(document).on('click touchend', '.js-alert-button-close', function () {

        $alertMessage = $('.alert');

        $alertMessage.removeClass('alert-animate');

        return false;
    });


});