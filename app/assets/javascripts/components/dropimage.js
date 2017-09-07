$(".js-dropzone").dropzone({
    url: "/file/post",
    paramName: "file", // The name that will be used to transfer the file
    thumbnailWidth: 1900,
    thumbnailHeight: 300,
    maxFilesize: 8, // MB
    dictDefaultMessage: '',
    addRemoveLinks: true,
    addUploadLinks: true,
    previewsContainer: '.js-dropzon-previews',
    uploadMultiple: false,
    clickable: true,
    acceptedFiles: 'image/*',
});

$(".js-dropzone-background").dropzone({
    url: "/file/post",
    paramName: "file", // The name that will be used to transfer the file
    maxFilesize: 8, // MB
    dictDefaultMessage: '',
    addRemoveLinks: true,
    addUploadLinks: true,
    previewsContainer: '.js-dropzon-previews-background',
    uploadMultiple: false,
    resizeMethod: 'crop',
    clickable: true,
    resizeMimeType: null,
    thumbnailWidth: 1900,
    thumbnailHeight: 300,

    acceptedFiles: 'image/*',

    // init: function() {
    //     this.on("complete", function() {
    //         $('.js-dropzon-previews').find('.dz-preview').each(function() {
    //             var $this = $(this);
    //
    //             if (!$this.hasClass('has-pin')) {
    //                 $this.append( "<a href='#' class='add-images__up js-add-image-class' data-photo='main'><i class='mdi mdi-pin'></i></a>" );
    //                 $this.addClass('has-pin');
    //             }
    //         });
    //
    //     });
    // }
});