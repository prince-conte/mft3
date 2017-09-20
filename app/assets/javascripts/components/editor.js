'use strict';




var editor = new MediumEditor('.editable', {
    delay: 1000,
    targetBlank: true,
    toolbar: {
        buttons: [

            {
                name: 'bold',
                tagNames: ['i'],
                contentDefault: '<i class="mdi mdi-format-bold"></i>',
            },

            {
            name: 'italic',
            tagNames: ['i'],
            contentDefault: '<i class="mdi mdi-format-italic"></i>',
            },
                {
                name: 'anchor',
                contentDefault: '<i class="mdi mdi-link-variant"></i>',
            },

            {
                name: 'h2',
                action: 'append-h2',
                aria: 'header type 2',
                tagNames: ['h2'],
                contentDefault: '<span>T</span>',
                classList: ['custom-class-h2'],
                attrs: {
                    'data-custom-attr': 'attr-value-h2'
                }
            },

            {
                name: 'h3',
                action: 'append-h3',
                aria: 'header type 2',
                tagNames: ['h3'],
                contentDefault: '<span class="min">T</span>',
                classList: ['custom-class-h3'],
                attrs: {
                    'data-custom-attr': 'attr-value-h3'
                }
            },

            {
                name: 'quote',
                contentDefault: '<b><i class="mdi mdi-format-quote-close"></i></b>',
            },

            {
                name: 'unorderedlist',
                contentDefault: '<b><i class="mdi mdi-format-list-bulleted"></i></b>',
            }],

        diffLeft: 25,
        diffTop: 10,
    },

    anchor: {
        placeholderText: 'Type a link',
        customClassOption: 'btn',
        customClassOptionText: 'Create Button'
    },

    anchorPreview: {
        hideDelay: 300
    },

    placeholder: {
        /* This example includes the default options for placeholder,
           if nothing is passed this is what it used */
        text: 'Type your text',
        hideOnClick: true
    }
});

    $(function () {
        $('.editable').mediumInsert({
            editor: editor,
            addons: {
                images: {
                    fileUploadOptions: {
                        url: 'upload.php'
                    }
                }
            }
        });

});



$(function(){

    var fixedBox = $('.js-fixed-box');
    var fixedBoxOffset = fixedBox.offset();

    $(window).scroll(function() {

        if (($(this).scrollTop() >= fixedBoxOffset.top)) {

            fixedBox.css('left', fixedBoxOffset.left);
            fixedBox.css('width', fixedBox.outerWidth());
            fixedBox.addClass('is-fixed')
        }
        else {

            fixedBox.removeClass('is-fixed')
            fixedBox.css('left', '');
            fixedBox.css('width', '');
        }

    });





});

