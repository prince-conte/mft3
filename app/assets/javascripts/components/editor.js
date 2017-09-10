'use strict';

$(function() {

    if ($('#editor-container').length) {

        var quill = new Quill('#editor-container', {
            modules: {

                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'align': [] }],
                    [{ 'header': 1 }, { 'header': 2 }],
                    ['image', 'video', 'link', { 'list': 'ordered'}, { 'list': 'bullet'}],
                ]
            },

            theme: 'bubble',   // Specify theme in configuration
            placeholder: 'Здесь будет контент статьи...'
        });

    }

});

