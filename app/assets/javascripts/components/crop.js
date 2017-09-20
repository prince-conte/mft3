function demoUpload() {
    var $uploadCrop;

    function popupResult(result) {
        var html;
        if (result.html) {
            html = result.html;
        }
        if (result.src) {

            $('#user-photo').attr('src',result.src);

            $('.js-crop-popup').css('opacity','0')
            $('.js-popup-fade').delay(500).fadeOut(500);

            // html = '<img src="' + result.src + '" />';
        }

    }


    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.upload-photo').addClass('ready');
                $uploadCrop.croppie('bind', {
                    url: e.target.result
                }).then(function(){
                    console.log('jQuery bind complete');
                });

            }

            reader.readAsDataURL(input.files[0]);
        }
        else {
            swal("Sorry - you're browser doesn't support the FileReader API");
        }
    }


    function demoResizer() {
        var vEl = document.getElementById('resizer-demo'),
            resize = new Croppie(vEl, {
                viewport: { width: 100, height: 100 },
                boundary: { width: 300, height: 300 },
                showZoomer: false,
                enableResize: true,
                enableOrientation: true
            });
        resize.bind({
            url: 'demo/demo-2.jpg',
            zoom: 0
        });
        vEl.addEventListener('update', function (ev) {
            console.log('resize update', ev);
        });
        document.querySelector('.resizer-result').addEventListener('click', function (ev) {
            resize.result({
                type: 'blob'
            }).then(function (blob) {
                popupResult({
                    src: window.URL.createObjectURL(blob)
                });
            });
        });
    }

    console.log(Modernizr.mq(BREAKPOINT_MOBILE))
    console.log(Modernizr.mq(BREAKPOINT_DESKTOP))

    if (Modernizr.mq(BREAKPOINT_MOBILE)) {



        $uploadCrop = $('#upload-photo').croppie({
            viewport: {
                width: 240,
                height: 240,
                type: 'circle'
            },

            boundary: {
                width: 280,
                height: 280
            },


            enableExif: true
        });
    }

    if (Modernizr.mq(BREAKPOINT_DESKTOP)) {
        $uploadCrop = $('#upload-photo').croppie({
            viewport: {
                width: 240,
                height: 240,
                type: 'circle'
            },

            boundary: {
                width: 600,
                height: 400
            },


            enableExif: true
        });
    }




    $('#upload').on('change', function () {

        readFile(this);
        $('.js-popup-fade').fadeIn(500);
        $('.js-crop-popup').delay(500).css('opacity','1');
    });

    $('.js-upload-result').on('click', function (ev) {
        $uploadCrop.croppie('result', {
            type: 'canvas',
            size: 'viewport'
        }).then(function (resp) {
            popupResult({
                src: resp
            });
        });
    });
}

demoUpload();


$(document).on('click touchend', '.js-crop-popup-close', function() {

    $('.js-crop-popup').css('opacity','0');
    $('.js-popup-fade').delay(500).fadeOut(500);

    return false

});


