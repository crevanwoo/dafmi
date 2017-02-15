$(document).ready(function () {
    addCustomSelect('.filters select, .footer_top .lang select')();
    addImagesToLang();
    disableSelects();
    addListenersForSelect(2);


});

//change header view


$(window).on("wheel keydown touchstart touchmove", function () {
    changeHeaderView()

})


//index show result


$('body').on('click', '.content_panel .select_1 .select-options', function () {
    hideBlock('.content_products_wrapper', '.content_panel .views');
    loadContent('.content_products', '../index_result.html .result_grid');
});


//change products showing


$('.grid_view .list').on('click', function () {
    toggleGridClasses()
});

$('.grid_view .grid').on('click', function () {
    toggleGridClasses()
});


// show alphabet


$('.sort_az_letter').on('click', function (e) {
    changeAlphabetSort.call(this, e);
});


$('.sort_az .az_trigger').on('click', function () {
    showAlphabetSort.call(this);
});


// change view on inner expand search input


$('body').on('input', 'input', function () {
    changeInputView.call(this);
});




// manage panel buttons


$('.content_nav .nav_main .type').on('click', function () {
    manageMenuButtons.call(this, '.content_nav .nav_main .type')

});

$('body').on('click', '.expand_search .bottom_panel .bttn_panel .bttn', function () {
    manageMenuButtons.call(this, '.expand_search .bottom_panel .bttn_panel .bttn')
});

$('body').on('click', '.expand_search .top_panel .bttn', function () {
    manageMenuButtons.call(this, '.expand_search .top_panel .bttn')
});


$('body').on('click', '.expand_search .expand', function () {
    toggleClassOfFewElem('.expand_search .top_panel .expand', '.expand_search .top_panel .line_2')

});




// show and hide expand search


$('.tab_2').on('click', function () {
    if ($('.expand_search').length < 1) {
        loadContent('.nav_top_expand', '../index_variants.html .expand_search:eq(0)', addCustomSelect.bind(null, '.expand_search .top_panel .param select'));

        loadContent('.nav_expand', '../index_variants.html .expand_search:eq(1)', addCustomSelect.bind(null, '.expand_search .bottom_panel .param select'));
    }


    if ($(this).hasClass('active')) {
        hideBlock('.expand_search');
        showBlock('.main_list');
    } else {
        hideBlock('.main_list');
        showBlock('.expand_search');
    }

    toggleClassOfFewElem.call(null, this);

});



function addListenersForSelect(i) {console.log(111);
    for (var j = 0; j < i; j++) {
        $('.filters .select:eq(' + j + ') .select-options li').on('click', function () {console.log(j);
            enableSelects(j + 1)
        });
    }
}

function loadContent(to, from, callback) {
    $(to).load(from, callback())
}


//for footer lang select
var lang_icons_arr = []; 

$('.footer_top .lang option').each(
    function () {
        lang_icons_arr.push($(this).attr('data-image'));
    });

function hideBlock(selector) {
    for (var i = 0; i < arguments.length; i++) {
        $(arguments[i]).css('display', 'none');
    }
}

function showBlock(selector) {
    for (var i = 0; i < arguments.length; i++) {
        $(arguments[i]).css('display', 'block');
    }
}

function toggleClassOfFewElem(selector) {
    for (var i = 0; i < arguments.length; i++) {
        $(arguments[i]).toggleClass('active');
    }

}

//change select view



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

            $styledSelect.on('click', function (e) {
                if (!$(this).hasClass('disabled')) {
                    e.stopPropagation();
                    $('div.select-styled.active').not(this).each(function () {
                        $(this).removeClass('active').next('ul.select-options').hide();
                    });
                    $(this).toggleClass('active').next('ul.select-options').toggle();
                }
            });

            $listItems.on('click', function (e) {
                e.stopPropagation();
                $styledSelect.addClass('changed');
                $styledSelect.html($(this).html()).removeClass('active');
                $this.val($(this).attr('rel'));
                $list.hide();
                //console.log($this.val());
            });

            $(document).on('click', function () {
                $styledSelect.removeClass('active');
                $list.hide();
            });
        });
    }
}


function disableSelects() {
  $('.content_panel .filters .select:gt(0) .select-styled').addClass('disabled');  
}

function enableSelects(index){console.log(index);
  $('.filters .select:eq(' + index + ') .select-styled').removeClass('disabled')    
}

//change header view

function changeHeaderView() {
    if (window.pageYOffset > 50 && !$('.header_bottom').hasClass('min')) {
        $('.header_bottom').delay(300).addClass('min');
    } else if (window.pageYOffset <= 50) {
        $('.header_bottom').delay(300).removeClass('min');
    }

}


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


function changeAlphabetSort(e) {
    e.preventDefault();
    $(this).addClass('active');
}

function showAlphabetSort() {
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

}

function changeInputView() {
    if ($(this).hasClass('filled') && $(this).val() === '' || $(this).val() == !/\S/) {
        $(this).removeClass('filled');

    } else if (!$(this).hasClass('filled')) {
        $(this).addClass('filled');
    }
}

function manageMenuButtons(selector) {
    $(selector).removeClass('active');
    $(this).addClass('active');
}






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


