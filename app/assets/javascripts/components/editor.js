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

        let Inline = Quill.import('blots/inline');
        let Block = Quill.import('blots/block');
        let BlockEmbed = Quill.import('blots/block/embed');




        class ImageBlot extends BlockEmbed {
            static create(value) {
                let node = super.create(value);
                let img = document.createElement('img');
                let figcaption = document.createElement('figcaption');

                img.setAttribute('src', value);
                node.appendChild(img);
                node.appendChild(figcaption);
                figcaption.setAttribute('data-figcaption', ficaptionImage);
                return node;
            }

            static value(domNode) {
                return domNode.firstChild.getAttribute('src');
            }
        }
        ImageBlot.blotName = 'image';
        ImageBlot.className = 'ql-image';
        ImageBlot.tagName = 'figure';


        class CodeBlot extends BlockEmbed {
            static create(value) {
                let node = super.create(value);

                node.setAttribute('data-code', codeContainer);
                return node;
            }
        }
        CodeBlot.blotName = 'code';
        CodeBlot.className = 'ql-add-code';
        CodeBlot.tagName = 'p';




        class VideoBlot extends BlockEmbed {
            static create(value) {
                let node = super.create(value);
                let iframe = document.createElement('iframe');
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', true);
                iframe.setAttribute('src', value);
                node.appendChild(iframe);
                return node;
            }

            static value(domNode) {
                return domNode.firstChild.getAttribute('src');
            }
        }
        VideoBlot.blotName = 'video';
        VideoBlot.className = 'ql-video';
        VideoBlot.tagName = 'div';







        class TweetBlot extends BlockEmbed {
            static create(id) {
                let node = super.create();
                node.dataset.id = id;
                twttr.widgets.createTweet(id, node);
                return node;
            }

            static value(domNode) {
                return domNode.dataset.id;
            }
        }
        TweetBlot.blotName = 'tweet';
        TweetBlot.tagName = 'div';
        TweetBlot.className = 'tweet';


        Quill.register(ImageBlot);
        Quill.register(VideoBlot);
        Quill.register(CodeBlot);

        var toolbarOptions = [['bold', 'italic','link', { 'header': '2' },{ 'header': '3' },'blockquote',{ 'list': 'bullet' }]];

        var optionsEditor = {
            placeholder: 'Текст или фото...',
            theme: 'bubble',
            modules: {
                toolbar: toolbarOptions
            }
        };

        let quill = new Quill('#editor-container', optionsEditor, toolbarOptions);



        quill.on(Quill.events.EDITOR_CHANGE, function(eventType, range) {
            if (eventType !== Quill.events.SELECTION_CHANGE) return;
            if (range == null) return;
            if (range.length === 0) {
                $('#tooltip-controls').hide();
                let [block, offset] = quill.scroll.descendant(Block, range.index);
                if (block != null && block.domNode.firstChild instanceof HTMLBRElement) {
                    let lineBounds = quill.getBounds(range);
                    $('#sidebar-controls').removeClass('active').show().css({
                        left: lineBounds.left - 50,
                        top: lineBounds.top - 2
                    });
                } else {
                    $('#tooltip-controls, #sidebar-controls').hide();
                    $('#sidebar-controls').removeClass('active');
                }
            } else {
                $('#sidebar-controls, #sidebar-controls').hide();
                $('#sidebar-controls').removeClass('active');
                let rangeBounds = quill.getBounds(range);
                $('#tooltip-controls').show().css({
                    left: rangeBounds.left + rangeBounds.width/2 - $('#tooltip-controls').outerWidth()/2,
                    top: rangeBounds.bottom + 10
                });
            }
        });


        quill.on('text-change', function(delta, oldDelta, source) {
            if (source == 'api') {
                console.log("An API call triggered this change.");
            } else if (source == 'user') {
                console.log("A user action triggered this change.");
            }
        });



        // video add


        function addVideo() {


            let range = quill.getSelection(true);

                var $v2;

            // Для youtube
            if($v1.indexOf('youtube.com') + 1 || $v1.indexOf('youtu.be') + 1) {
                // Ищем и заменяем, чтобы проще обработать
                $v2 = $v1.replace('.com/embed/', '.com/watch?v=');
                $v1 = $v2.replace('.be/', '.com/watch?v=');
                //Отсеиваем ненужные части, чтобы получить чистый id
                $v2 = $v1.split(".com/watch?v=")[1];
                $v1 = $v2.split("&index")[0];
                $v2 = $v1.replace('&', '?');

                //Получаем чистый id, вставляем его непосредственно в плеер

                $v2 = 'https://www.youtube.com/embed/' + $v2;
            }

            // Для Coub
            else if ($v1.indexOf('http://coub.com/') + 1) {

                // Производим замену
                $v2 = $v1.replace('/view/', '/embed/');

                // Вставляем id в плеер

                $v2 = $v2 + '?muted=false&amp;autostart=false&originalSize=false&hideTopBar=false&noSiteButtons=false&startWithHD=false';
            }

            // Для vimeo
            else if ($v1.indexOf('vimeo.com') + 1) {
                // Производим замену
                $v2 = $v1.replace('vimeo.com/', 'player.vimeo.com/video/');

            }

            // twitter
            else if ($v1.indexOf('twitter.com') + 1) {
                // Производим замену
                $v2 = $v1

            }


            //В случае, если не удалось обработать
            else {document.write('<div style="color:red">Ошибка: не могу воспроизвести.</div>');}



            let url = $v2;
            quill.insertEmbed(range.index, 'video', url, Quill.sources.USER);
            quill.formatText(range.index + 1, 1, { height: '170', width: '100%' });
            quill.setSelection(range.index + 1, Quill.sources.SILENT);
            $('#sidebar-controls').hide();


            $(document)
                .find('.ql-editor iframe[src*="vimeo"], .ql-editor iframe[src*="youtube"]')
                .each(function() {
                    console.log('asd');
                    $(this).wrap('<div class="content__video"/>');
                });

        }



        var videoLink;
        var $v1;

        $(document).on('click touchend', '.js-add-link-video', function() {

            videoLink = $(this).prev('input').val();

            $v1  = videoLink;

            $('.js-input-link-form').removeClass('is-active');

            addVideo();

            return false;

        });


        $(document).on('click touchend', '.js-editor-cancel', function() {

            $('.editor__input-link-form').removeClass('is-active');
            $('.js-input-figcaption').removeClass('is-active');

            return false;
        });





        $(document).on('click touchend', '#video-button', function() {

            $('.editor__input-link-form').removeClass('is-active');
            $('.js-input-figcaption').removeClass('is-active');
            $('.js-input-link-form').addClass('is-active');

            return false;

        });



        $(document).on('click touchend', '#image-button', function() {

            $('.editor__input-link-form').removeClass('is-active');
            $('.js-input-figcaption').removeClass('is-active');
            $('.js-input-figcaption').addClass('is-active');

            return false;
        });


        var ficaptionImage;

        $(document).on('click touchend', '.js-add-figcaption', function() {

            ficaptionImage = $(this).prev('input').val();


            $('.js-input-figcaption').removeClass('is-active');

            $('#picField').trigger('click');

            return false;

        });



        var srcImage;

        function addImage() {
            let url = srcImage;

            let range = quill.getSelection(true);

            quill.insertEmbed(range.index, 'image', url, Quill.sources.USER);
            quill.formatText(range.index + 1, 1);
            quill.setSelection(range.index + 1, Quill.sources.SILENT);
            $('#sidebar-controls').hide();
        }

        document.getElementById('picField').onchange = function (evt) {
            var tgt = evt.target || window.event.srcElement,
                files = tgt.files;

            // FileReader support
            if (FileReader && files && files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    srcImage = fr.result;
                    addImage();
                }
                fr.readAsDataURL(files[0]);
            }

            // Not supported
            else {
                // fallback -- perhaps submit the input to an iframe and temporarily store
                // them on the server until the user's session ends.
            }
        }


        var codeContainer;

        function addCode() {

            quill.clipboard.dangerouslyPasteHTML(5, codeContainer);

        }


        $(document).on('click touchend', '.js-add-code', function() {

            codeContainer = $(this).prev('input').val();


            $('.js-input-code').removeClass('is-active');

            addCode()

            return false
        });






        $(document).on('click touchend', '#tweet-button', function() {

            let range = quill.getSelection(true);
            let id = '464454167226904576';
            quill.insertEmbed(range.index, 'tweet', id, Quill.sources.USER);
            quill.setSelection(range.index + 1, Quill.sources.SILENT);
            $('#sidebar-controls').hide();

            return false
        });

        $(document).on('click touchend', '#show-controls', function() {

            $('#sidebar-controls').toggleClass('active');
            quill.focus();

            return false
        });



        $(document).on('click touchend', '#show-controls', function() {

            $(this).toggleClass('active');
            quill.focus();

        });

        $(document).on('click touchend', '#add-code', function() {

            $('.editor__input-link-form').removeClass('is-active');
            $('.js-input-figcaption').removeClass('is-active');

            $('.js-input-code').addClass('is-active');



            return false;

        });
    }

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