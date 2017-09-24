'use strict';

$(function() {

    var icons = Quill.import('ui/icons');
    icons['header'] = '<span>T</span>';
    icons['bold'] = '<i class="mdi mdi-format-bold">';
    icons['italic'] = '<i class="mdi mdi-format-italic">';
    icons['link'] = '<i class="mdi mdi-link-variant">';
    icons['blockquote'] = '<i class="mdi mdi-format-quote-close">';
    icons['list'] = '<i class="mdi mdi-format-list-bulleted">';

    if ($('#editor-container').length) {

        var quill = new Quill('#editor-container', {
            modules: {

                toolbar: [
                    ['bold', 'italic','link', { 'header': 2 }, { 'header': 3 }, 'blockquote', { 'list': 'bullet'}]
                ]
            },

            theme: 'bubble'   // Specify theme in configuration
        });

        $('#show-controls').click(function() {
            $(this).toggleClass('active');
            quill.focus();
        });

        quill.on('text-change', function(delta, source) {


            if (source == 'api') {
                console.log("An API call triggered this change.");
            } else if (source == 'user') {
                console.log("A user action triggered this change.");
            }

        });

    }




});
