$('body').on('input', 'input', function (e) {
    if ($(this).hasClass('filled') && $(this).val() === '' || $(this).val() == !/\S/) {
        $(this).removeClass('filled');

    } else if (!$(this).hasClass('filled')) {
        $(this).addClass('filled');
    }
})


$('body').on('click', '.expand_search .bottom_panel .bttn_panel .bttn', function () {

    $('.expand_search .bottom_panel .bttn_panel .bttn').removeClass('active');
    $(this).addClass('active');
})

$('body').on('click', '.expand_search .top_panel .bttn', function () {

    $('.expand_search .top_panel .bttn').removeClass('active');
    $(this).addClass('active');
})


$('body').on('click', '.expand_search .expand', function () {

    $('.expand_search .top_panel .expand').toggleClass('active');
    $('.expand_search .top_panel .line_2').toggleClass('active');
})
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

$('body').on('click', '.content_panel .select_1 .select-options', function () {

    $('.content_products_wrapper').css('display', 'none');


    $('.content_panel .views').css('display', 'none');
    
    $('.content_products').load('../index_result.html .result_grid')


})

$(window).on("wheel keydown touchstart touchmove", function () {
    if (window.pageYOffset > 50 && !$('.header_bottom').hasClass('min')) {
        //$('.header_bottom').css('position', 'fixed');
        //$('.header_bottom').css('top', '0');
        $('.header_bottom').delay(300).addClass('min');

    } else if (window.pageYOffset <= 50) {
        //$('.header_bottom').css('position', 'relative');
        $('.header_bottom').delay(300).removeClass('min');
    }
})

$('.content_nav .nav_main .type').on('click', function () {
    $('.content_nav .nav_main .type').removeClass('active');
    $(this).addClass('active');
})

$('.tab_2').on('click', function () {

    if ($('.expand_search').length < 1) {
        $('.nav_top_expand').load('../index_variants.html .expand_search:eq(0)', function () {
            addCustomSelect('.expand_search .top_panel .param select')();
        });
        $('.nav_expand').load('../index_variants.html .expand_search:eq(1)', function () {
            addCustomSelect('.expand_search .bottom_panel .param select')();
        })
    }

    if ($(this).hasClass('active')) {
        $('.expand_search').css('display', 'none');
        $('.main_list').css('display', 'block');

    } else {
        $('.expand_search').css('display', 'block');
        $('.main_list').css('display', 'none');

    }

    $(this).toggleClass('active');





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

function addCustomSelect(selector) {

    return function () {

        $(selector).each(function () {
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
    }
}

addCustomSelect('.filters select, .footer_top .lang select')();
addImagesToLang();
