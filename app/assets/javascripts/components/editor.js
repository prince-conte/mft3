'use strict';

// $(function() {

    // var icons = Quill.import('ui/icons');
    // icons['header'] = 'T';
    // icons['bold'] = '<i class="mdi mdi-format-bold">';
    // icons['italic'] = '<i class="mdi mdi-format-italic">';
    // icons['link'] = '<i class="mdi mdi-link-variant">';
    // icons['blockquote'] = '<i class="mdi mdi-format-quote-close">';
    // icons['bullet'] = '<i class="mdi mdi-format-list-bulleted">';
    //
    // if ($('#editor-container').length) {
    //
    //     var quill = new Quill('#editor-container', {
    //         modules: {
    //
    //             toolbar: [
    //                 ['bold', 'italic','link', { 'header': 2 }, { 'header': 3 }, 'blockquote', { 'list': 'bullet'}]
    //             ]
    //         },
    //
    //         theme: 'bubble',   // Specify theme in configuration
    //         placeholder: 'Здесь будет контент статьи...'
    //     });
    //
    // }



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
        text: 'Click to edit'
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

