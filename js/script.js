
 var height_element = new Array();
 var array_length = $(".accordion .question").length;

 for (i = 1; i <= array_length; i++) {
     height_element[i] = $(".accordion .question + div[data-index='" + i + "']").outerHeight();
 }

 $('.accordion').find('.question + div').css('height', '0');
 $('.accordion').find('.question.active + div').css('height', 'auto');

 $('.accordion').find('.question').on('click', function () {
         console.log($(this).hasClass('active'))
         if ($(this).hasClass('active')) {
             $(this).next().animate({
                 height: 0
             })
             $(this).removeClass('active');
         } else {
             $('.question.active + div').animate({
                 height: 0,
             })
             $('.question.active').removeClass('active');

             $(this).next().animate({
                 height: height_element[$(this).next().attr('data-index')] + 5 +'px',
             })
             $(this).addClass('active');
         }
     }
 )
/**
 * jQuery-viewport-checker - v1.8.7 - 2015-12-17
 * https://github.com/dirkgroenen/jQuery-viewport-checker
 *
 * Copyright (c) 2015 Dirk Groenen
 * Licensed MIT <https://github.com/dirkgroenen/jQuery-viewport-checker/blob/master/LICENSE>
 */

!function(a){a.fn.viewportChecker=function(b){var c={classToAdd:"visible",classToRemove:"invisible",classToAddForFullView:"full-visible",removeClassAfterAnimation:!1,offset:100,repeat:!1,invertBottomOffset:!0,callbackFunction:function(a,b){},scrollHorizontal:!1,scrollBox:window};a.extend(c,b);var d=this,e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()},f=-1!=navigator.userAgent.toLowerCase().indexOf("webkit")||-1!=navigator.userAgent.toLowerCase().indexOf("windows phone")?"body":"html";return this.checkElements=function(){var b,g;c.scrollHorizontal?(b=a(f).scrollLeft(),g=b+e.width):(b=a(f).scrollTop(),g=b+e.height),d.each(function(){var d=a(this),f={},h={};if(d.data("vp-add-class")&&(h.classToAdd=d.data("vp-add-class")),d.data("vp-remove-class")&&(h.classToRemove=d.data("vp-remove-class")),d.data("vp-add-class-full-view")&&(h.classToAddForFullView=d.data("vp-add-class-full-view")),d.data("vp-keep-add-class")&&(h.removeClassAfterAnimation=d.data("vp-remove-after-animation")),d.data("vp-offset")&&(h.offset=d.data("vp-offset")),d.data("vp-repeat")&&(h.repeat=d.data("vp-repeat")),d.data("vp-scrollHorizontal")&&(h.scrollHorizontal=d.data("vp-scrollHorizontal")),d.data("vp-invertBottomOffset")&&(h.scrollHorizontal=d.data("vp-invertBottomOffset")),a.extend(f,c),a.extend(f,h),!d.data("vp-animated")||f.repeat){String(f.offset).indexOf("%")>0&&(f.offset=parseInt(f.offset)/100*e.height);var i=f.scrollHorizontal?d.offset().left:d.offset().top,j=f.scrollHorizontal?i+d.width():i+d.height(),k=Math.round(i)+f.offset,l=f.scrollHorizontal?k+d.width():k+d.height();f.invertBottomOffset&&(l-=2*f.offset),g>k&&l>b?(d.removeClass(f.classToRemove),d.addClass(f.classToAdd),f.callbackFunction(d,"add"),g>=j&&i>=b?d.addClass(f.classToAddForFullView):d.removeClass(f.classToAddForFullView),d.data("vp-animated",!0),f.removeClassAfterAnimation&&d.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){d.removeClass(f.classToAdd)})):d.hasClass(f.classToAdd)&&f.repeat&&(d.removeClass(f.classToAdd+" "+f.classToAddForFullView),f.callbackFunction(d,"remove"),d.data("vp-animated",!1))}})},("ontouchstart"in window||"onmsgesturechange"in window)&&a(document).bind("touchmove MSPointerMove pointermove",this.checkElements),a(c.scrollBox).bind("load scroll",this.checkElements),a(window).resize(function(b){e={height:a(c.scrollBox).height(),width:a(c.scrollBox).width()},d.checkElements()}),this.checkElements(),this}}(jQuery);
//# sourceMappingURL=jquery.viewportchecker.min.js.map
var modal_file_mark;

setTimeout(function () {
    modal_file_mark = true
}, 10000)

$(window).on('mousemove', function (event) {
    if (event.clientY < 50 && modal_file_mark) {
        modal_file_mark = false;
        modalOpen('.modal_file')
    }

})


$('.button').on('click', function () {

    modalOpen('.modal_form')

})

$('.single_slide').on('click', function () {

    modalOpen('.modal_preview');
    $('.modal_preview').find('img').attr('src', $(this).attr('data-src'))

})





var window_offset;

function modalOpen(selector) {
    $(selector).css('display', 'block');
    var sel = selector;
    setTimeout(function () {
        $(sel).addClass('visible');
    }, 100)

    fixBodyPosition();

}

function fixBodyPosition() {
    var body_width = document.body.offsetWidth;
    if (!$('body').hasClass('hidden')) {
        window_offset = window.pageYOffset;
    }

    document.body.style.marginRight = window.innerWidth - body_width + "px";
    document.body.style.width = body_width + "px";
    document.body.style.top = "-" + window_offset + "px";
    document.body.classList.add('hidden');
}

function releaseBodyPosition() {
    document.body.style.marginRight = 0;
    document.body.style.width = "auto";
    document.body.classList.remove('hidden');
    window.scrollTo(0, window_offset);
}


var modal_window;

function modalClose(e) {
    var elem = e.target;
    while (!elem.classList.contains('modal_window')) {
        elem = elem.parentElement;
    }
    modal_window = elem;
    modal_window.classList.remove('visible');
    modal_window.addEventListener('transitionend', modalAfterTransition)
}

function modalAfterTransition() {
    if (!modal_window.classList.contains('visible')) {
        modal_window.style.display = 'none';
        if ($('.modal_window.visible').length === 0) {
            releaseBodyPosition();
        }

    }
}


for (var i = 0; i < document.querySelectorAll('.modal_window .close').length; i++) {
    document.querySelectorAll('.modal_window .close')[i].addEventListener('click', modalClose);
}

/*$('.points').on('click', function () {
    var count;
    for (var i = 0; i < $('.points li').length; i++) {
        count = parseInt(i * 2 + '00');
        $('.points li:eq(' + i + ')').delay(count).animate({
            left: 0,
            opacity: 1,
        })


    }

})



$('.part_4').on('click', function () {
    $('.part_4 ul').animate({
        top: 0,
        opacity: 1,
    })



})



$('.part_5').on('click', function () {
    $('.part_5 ul li:lt(3)').animate({
        top: 0,
        opacity: 1,
    })
    $('.part_5 ul li:gt(2)').delay(1000).animate({
        top: 0,
        opacity: 1,
    })



})






$('.part_8').on('click', function () {
    var count;
    for (var i = 0; i < $('.part_8 .column').length; i++) {
        count = parseInt(i * 2 + '00');
       
        $('.part_8 .column:eq(' + i + ')').delay(count).animate({
            top: 0,
            opacity: 1,
        })


    }

})


$('.part_11').on('click', function () {
    var count;
    for (var i = 0; i < $('.part_11 li').length; i++) {
        count = parseInt(i * 2 + '00');
  
        $('.part_11 li:eq(' + i + ')').delay(count).animate({
            left: 0,
            opacity: 1,
        })


    }

})*/


$('section.part_3 .points li').viewportChecker({
    classToAdd: 'show'
})
$('section.part_4 ul').viewportChecker({
    classToAdd: 'show'
})
$('section.part_5 ul li').viewportChecker({
    classToAdd: 'show',
    offset: "-30%",
})
$('section.part_8 .column').viewportChecker({
    classToAdd: 'show'
})
$('section.part_11 li').viewportChecker({
    classToAdd: 'show'
})

 $('.reviews').slick({
     dots: true,
     infinite: true,
 });



 $('.sertificates').slick({
     dots: true,
     infinite: true,
     slidesToShow: 3,
    slidesToScroll: 1,

 });


