'use strict';

$(function() {

    if ($('#editor-container').length) {

        var quill = new Quill('#editor-container', {
            modules: {

                toolbar: [
                    ['bold', 'italic','link', { 'header': 1 }, { 'header': 2 }, 'blockquote', { 'list': 'bullet'}]
                ]
            },

            theme: 'bubble',   // Specify theme in configuration
            placeholder: 'Здесь будет контент статьи...'
        });

    }

});

