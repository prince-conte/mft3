function popupClose() {
    $.magnificPopup.instance.close();
}

function popupCallbackOpen() {
    var content = this.content;

    setTimeout(function() {
        $(content).find('[autofocus]').focus();
    }, TRANSITION_DURATION_BASE);
}

$(document)
    .find('.js-popup')
    .magnificPopup({
        type: 'inline',
        autoFocusLast: false,
        preloader: false,
        showCloseBtn: false,
        removalDelay: TRANSITION_DURATION_BASE,
        mainClass: 'mfp-fade',
        callbacks: {
            open: popupCallbackOpen
        }
    });

$(document)
    .find('.js-popup-crop')
    .magnificPopup({
        type: 'content',
        autoFocusLast: false,
        preloader: false,
        showCloseBtn: false,
        removalDelay: TRANSITION_DURATION_BASE,
        mainClass: 'mfp-fade',
        callbacks: {
            open: popupCallbackOpen
        }
    });

$(document)
    .find('.js-authorization-focus')
    .on('focus', function() {
        $.magnificPopup.open({
            type: 'inline',
            autoFocusLast: false,
            preloader: false,
            showCloseBtn: false,
            removalDelay: TRANSITION_DURATION_BASE,
            mainClass: 'mfp-fade',
            callbacks: {
                open: popupCallbackOpen
            },
            items: {
                src: '#popup-authorization'
            }
        });

        return false;
    });

$(document)
    .find('.js-popup-close')
    .on('click', function() {
        popupClose();

        return false;
    });