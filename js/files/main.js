$(window).on("wheel keydown touchstart touchmove", function () {
    if (window.pageYOffset > 50 && !$('.header_bottom').hasClass('min')) {
        //$('.header_bottom').css('position', 'fixed');
        //$('.header_bottom').css('top', '0');
        $('.header_bottom').addClass('min');

    } else if (window.pageYOffset <= 50) {
        //$('.header_bottom').css('position', 'relative');
        $('.header_bottom').removeClass('min');
    }
})
