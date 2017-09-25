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

        class BoldBlot extends Inline { }
        BoldBlot.blotName = 'bold';
        BoldBlot.tagName = 'strong';

        class ItalicBlot extends Inline { }
        ItalicBlot.blotName = 'italic';
        ItalicBlot.tagName = 'em';

        class LinkBlot extends Inline {
            static create(url) {
                let node = super.create();
                node.setAttribute('href', url);
                node.setAttribute('target', '_blank');
                return node;
            }

            static formats(node) {
                return node.getAttribute('href');
            }
        }
        LinkBlot.blotName = 'link';
        LinkBlot.tagName = 'a';

        class BlockquoteBlot extends Block { }
        BlockquoteBlot.blotName = 'blockquote';
        BlockquoteBlot.tagName = 'blockquote';

        class HeaderBlot extends Block {
            static formats(node) {
                return HeaderBlot.tagName.indexOf(node.tagName) + 1;
            }
        }
        HeaderBlot.blotName = 'header';
        HeaderBlot.tagName = ['H1', 'H2'];

        class DividerBlot extends BlockEmbed { }
        DividerBlot.blotName = 'divider';
        DividerBlot.tagName = 'hr';

        class ImageBlot extends BlockEmbed {
            static create(value) {
                let node = super.create();
                node.setAttribute('alt', value.alt);
                node.setAttribute('src', value.url);
                return node;
            }

            static value(node) {
                return {
                    alt: node.getAttribute('alt'),
                    url: node.getAttribute('src')
                };
            }
        }
        ImageBlot.blotName = 'image';
        ImageBlot.tagName = 'figure';

        class VideoBlot extends BlockEmbed {
            static create(url) {
                let node = super.create();
                node.setAttribute('src', url);
                node.setAttribute('frameborder', '0');
                node.setAttribute('allowfullscreen', true);
                return node;
            }

            static formats(node) {
                let format = {};
                if (node.hasAttribute('height')) {
                    format.height = node.getAttribute('height');
                }
                if (node.hasAttribute('width')) {
                    format.width = node.getAttribute('width');
                }
                return format;
            }

            static value(node) {
                return node.getAttribute('src');
            }

            format(name, value) {
                if (name === 'height' || name === 'width') {
                    if (value) {
                        this.domNode.setAttribute(name, value);
                    } else {
                        this.domNode.removeAttribute(name, value);
                    }
                } else {
                    super.format(name, value);
                }
            }
        }
        VideoBlot.blotName = 'video';
        VideoBlot.tagName = 'iframe';

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

        Quill.register(BoldBlot);
        Quill.register(ItalicBlot);
        Quill.register(LinkBlot);
        Quill.register(BlockquoteBlot);
        Quill.register(HeaderBlot);
        Quill.register(DividerBlot);
        Quill.register(ImageBlot);
        Quill.register(TweetBlot);
        Quill.register(VideoBlot);

        let quill = new Quill('#editor-container');

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

        $('#bold-button').click(function() {
            quill.format('bold', true);
        });

        $('#italic-button').click(function() {
            let active = $(this).hasClass('active');
            quill.format('italic', true);
        });

        $('#link-button').click(function() {
            let value = prompt('Enter link URL');
            quill.format('link', value);
        });

        $('#blockquote-button').click(function() {
            console.log('blockquote');
            quill.format('blockquote', true);
        });

        $('#header-1-button').click(function() {
            quill.format('header', 1);
        });

        $('#header-2-button').click(function() {
            quill.format('header', 2);
        });

        $('#divider-button').click(function() {
            let range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'divider', true, Quill.sources.USER);
            quill.setSelection(range.index + 1, Quill.sources.SILENT);
            $('#sidebar-controls').hide();
        });

        $('#image-button').click(function() {

            let range = quill.getSelection(true);

            quill.insertEmbed(range.index, 'image', {
                alt: 'Quill Cloud',
                url: 'https://quilljs.com/0.20/assets/images/cloud.png'
            }, Quill.sources.USER);
            quill.setSelection(range.index + 1, Quill.sources.SILENT);
            $('#sidebar-controls').hide();
        });

        $('#video-button').click(function() {

            let range = quill.getSelection(true);
            var link = prompt('Введите ссылку на видео', 100);


            var $v1 = link,
                $v2;

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
        });

        $('#tweet-button').click(function() {
            let range = quill.getSelection(true);
            let id = '464454167226904576';
            quill.insertEmbed(range.index, 'tweet', id, Quill.sources.USER);
            quill.setSelection(range.index + 1, Quill.sources.SILENT);
            $('#sidebar-controls').hide();
        });

        $('#show-controls').click(function() {
            $('#sidebar-controls').toggleClass('active');
            quill.focus();
        });



        $('#show-controls').click(function() {
            $(this).toggleClass('active');
            quill.focus();
        });

        $(document).on('click' , '#add-code', function() {

            quill.setText('<figure><img src="https://quilljs.com/0.20/assets/images/cloud.png"</figure>');
            let [line, offset] = quill.getLine(7);

        });



    }




});
