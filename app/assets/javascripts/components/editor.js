'use strict';

$(function() {

    var icons = Quill.import('ui/icons');
    icons['header'] = 'T';
    icons['bold'] = '<i class="mdi mdi-format-bold">';
    icons['italic'] = '<i class="mdi mdi-format-italic">';
    icons['link'] = '<i class="mdi mdi-link-variant">';
    icons['blockquote'] = '<i class="mdi mdi-format-quote-close">';
    icons['bullet'] = '<i class="mdi mdi-format-list-bulleted">';

    if ($('#editor-container').length) {

        var quill = new Quill('#editor-container', {
            modules: {

                toolbar: [
                    ['bold', 'italic','link', { 'header': 2 }, { 'header': 3 }, 'blockquote', { 'list': 'bullet'}]
                ]
            },

            theme: 'bubble',   // Specify theme in configuration
            placeholder: 'Здесь будет контент статьи...'
        });

    }

});

