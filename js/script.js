var lang_icons_arr = [];

$('.footer_top .lang option').each(
    function () {
        lang_icons_arr.push($(this).attr('data-image'));
    });



var addImagesToLang = function () {
    addImage('.footer_top .lang .select-styled', 0);
    var index = 0;
    $('.footer_top .lang .select-options li').each(
        function () {
            addImage(this, index)
            index++;
        }
    )
}


function addImage(selector, index) {
    $(selector).append('<img class="icon"/>');
    var img = $(selector).find('img');
    var value = '' + lang_icons_arr[index];
    img.attr('src', value);
}

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

$('.content_nav .nav_main .type').on('click', function () {
    $('.content_nav .nav_main .type').removeClass('active');
    $(this).addClass('active');
})

$('.tab_2').on('click', function () {
    $(this).toggleClass('active');   
    $('.nav_top_expand').load('../expand_search.html')
    
    
    
    
})

$('.sort_az .az_trigger').on('click', function () {
    $(this).toggleClass('active');
    var ul = $(this).parent().find('ul');
    ul.css('display', 'block');
    setTimeout(function () {
        ul.toggleClass('active');
    }, 100);
    setTimeout(function () {
        if (!ul.hasClass('active')) {
            ul.css('display', 'none');
        }
    }, 300);


})

$('.sort_az_letter').on('click', function (e) {
    e.preventDefault();

    $(this).addClass('active');


})



$('.grid_view .list').on('click', function () {
    toggleGridClasses()
})

$('.grid_view .grid').on('click', function () {
    toggleGridClasses()
})


var content_panel_h = $('.content_products').height();

function toggleGridClasses() {
    $('.content_products').css('height', content_panel_h * 2 + 'px');

    var grid_trans_time = 500;

    $('.grid_view .list').toggleClass('active');
    $('.grid_view .grid').toggleClass('active');
    $('.content_products').removeClass('active');
    $('.content_products').toggleClass('grid');
    $('.content_products').toggleClass('list');
    setTimeout(function () {
        $('.content_products').addClass('active');
        $('.content_products').css('height', 'auto');
    }, grid_trans_time)
}

$('.filters select, .footer_top .lang select').each(function () {
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.html($this.children('option').eq(0).html());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function () {
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.addClass('changed');
        $styledSelect.html($(this).html()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });

    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    }); 
});


addImagesToLang();
