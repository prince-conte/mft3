// https://gist.github.com/artpolikarpov/3428762
var doubleHover = function(container, selector, hoverClass) {
    $(document).on('mouseover mouseout', selector, function(e) {
        $(this)
            .closest(container)
            .find(selector)
            .filter('[href="' + $(this).attr('href') + '"]')
            .toggleClass(hoverClass, e.type == 'mouseover');
    });
};

doubleHover('.js-hover-container', '.js-hover', 'hover');

// http://www.jacklmoore.com/autosize/
autosize($('.js-textarea-autosize'));