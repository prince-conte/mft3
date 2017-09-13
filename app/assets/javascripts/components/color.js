$(function() {

    var colorInput = $('#js-color');
    var colorVal = '';

    colorInput.focusout(function() {


        if ($(this).val() != colorVal) {
            $('#color-label').css('background-color' , $(this).val());
        }

    });

});