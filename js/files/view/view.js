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

function setImgAsBg(selector) {
    var src = $(selector).attr('src');
    $(selector).parent().css('background-image', 'url(' + src + ')');
    hideBlock(selector);
}


// плавный показ попапа, вызванного через this
function smoothShow(selector, display) {
    $(this).find(selector).css('display', display);
    var obj = this;

    function addAnimation() {
        $(this).find(selector).addClass('active')
    }
    setTimeout(
        addAnimation.bind(obj, selector), 100
    )
}


// измененение вида кнопок при нажатии
function manageMenuButtons(selector) {
    $(selector).removeClass('active');
    $(this).addClass('active');
}

// изменение отображения селекта для простых полей без зависимостей
function addCustomSelect(selector) {



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

        });

        $(document).on('click', function () {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    });

}




// измненение внешнего вида хэдэра при прокрутке
function changeHeaderView() {
    if (window.pageYOffset > 50 && !$('.header_bottom').hasClass('min')) {
        $('.header_bottom').delay(300).addClass('min');
    } else if (window.pageYOffset <= 50) {
        $('.header_bottom').delay(300).removeClass('min');
    }
}

// изменение показа элементов на главной странице - сетка - список
var content_panel_h = $('.content_products').height();
$('.content_products').css('min-height', content_panel_h + 'px')

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

// изменение внешнего вида сортировки по алфавиту
function changeAlphabetSort(e) {
    e.preventDefault();
    $(this).addClass('active');
}

// показ раширенного поля сортировки по алфавиту
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

/*
// измненение вида заполненного поля
function changeInputView() {
    if ($(this).hasClass('filled') && $(this).val() === '' || $(this).val() == !/\S/) {
        $(this).removeClass('filled');
    } else if (!$(this).hasClass('filled')) {
        $(this).addClass('filled');
    }
}*/



/*var addImagesToLang = function () {
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
}*/

/* --- Main selection > --- */


// срабатывает когда выбираешь марку машины, отображает выбор модели

function showModelResults() {
    // если в окошке с типом машины одна модель, не предлагать выбор, выводить её в строчку
    $('.result_grid .single_result').each(function () {
            if ($(this).find('.model_choosing .model').length < 2) {
                $(this).find('.title').text($(this).find('.model_choosing .model').text())
            }
        })
        // подсчитываются элементы для вывода во втором селекте, он активируется
    setSelection(Select_2, '.result_grid .single_result .model', '.content_products .result_grid .model_choosing .model');
    Select_2.state(true);
}


// срабатывает когда выбираешь модель машины, отображает выбор двигателя

function actionForModelChoosing() {
    function showMotorResults() {
        setSelection(Select_3, '.result_list .result_list_row [data-value="motor"]', '.result_list .result_list_row [data-value="motor"]');
        Select_3.state(true);
    }
    $('.content_products').removeClass('grid'); //сброс - добавить
    hideBlock('.content_products_wrapper >div');
    loadContent('.content_products_wrapper', '../index_result.html .result_list', showMotorResults);
}


/* --- < Main selection --- */


/* --- Results > --- */

function showTabContent() {
    tab_control_marker = false;
    var tab_num = +$(this).attr('class').slice(-1) - 1;
    $(this).addClass('show');
    var obj = $(this);
    var single_result = obj.parent().parent().parent().attr('data-index');
    var tab_panel_height = +obj.parent().parent().parent().find('.tab_panel').innerHeight();
    setTimeout(function () {
        obj.parent().parent().animate({
            height: +result_expanded_height[single_result][tab_num] + tab_panel_height
        });
        obj.animate({
            opacity: 1
        })
        tab_control_marker = true;
    }, 100)
}


function hideTabContent() {
    var obj = $(this).parent().parent().find('.show');
    obj.removeClass('show');
    setTimeout(function () {
        obj.animate({
            opacity: 0
        })
    }, 100)
}



function toggleExpandResultsView() {

    var single_result = findParent($(this), 'single_result');
    if ($(this).hasClass('active')) {
        var obj = $(this);
        //single_result.find('.single_result_extend').removeClass('expand');
        single_result.find('.single_result_extend').animate({
            height: 0,
        }, function () {
            obj.removeClass('active');
        });
        single_result.find('.tab_panel .show').animate({
                opacity: 0
            },
            function () {
                single_result.find('.tab_panel .show').removeClass('show');
            })

    } else {
        $(this).addClass('active');
        //single_result.find('.single_result_extend').addClass('expand');
        var tab_panel_height = +single_result.find('.tab_panel').innerHeight();
        single_result.find('.single_result_extend').animate({
            height: +result_expanded_height[single_result.attr('data-index')][0] + tab_panel_height
        });
        single_result.find('.single_result_extend .tab_panel .tab:eq(0)').addClass('active');
        showTabContent.call(single_result.find('.tab_1'));
    }
}


function switchResultTabs() {

    if (!$(this).hasClass('active') && tab_control_marker) {
        $(this).parent().find('.active').removeClass('active');
        $(this).addClass('active');
        var tab_content_name = '.tab_' + (+$(this).attr('data-tab-num') + 1);

        var tab_content = findParent($(this), 'single_result_extend').find(tab_content_name); // $(this).parent().parent().find(tab_content_name);//single_result_extend

        hideTabContent.call(this);
        showTabContent.call(tab_content);

        returnTabMenuToDefault();
    }
}

function showResultTab2Level1() {

    var extend = findParent($(this), 'single_result_extend');

    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).parent().find('.single_model').css('height', '0');
        $(this).parent().find('.single_model_title.active').removeClass('active');
    } else {
        $(this).addClass('active');
        $(this).parent().css('height', 'auto');
        $(this).parent().find('.single_model').css('height', '50px');
        $(this).parent().find('.model_content').css('height', '0');
        try {
            extend.css('height', 'auto');
        } catch (err) {
            console.log(err)
        }
    }
}


function showResultTab2Level2() {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).parent().css('height', '50px');
        $(this).parent().find('.model_content').css('height', '0');

    } else {
        $(this).addClass('active');
        $(this).parent().css('height', 'auto');
        $(this).parent().find('.model_content').css('height', 'auto');

    }
}


function returnTabMenuToDefault() {
    $('.result_full .single_result .tab_2').find('.main_title').removeClass('active');
    $('.result_full .single_result .tab_2').find('.single_model_title').removeClass('active');
    $('.result_full .single_result .tab_2').find('.single_model').css('height', '0');
    $('.result_full .single_result .tab_2').parent().find('.model_content').css('height', '0');

}


/* --- < Results --- */

function respondCartSuccess() {    
      $('.page_cart .products').empty();

            $('.page_cart .total span').html('0');
            var cart_success = new ModalWindow('.page_cart_modal_success');
            cart_success.activateElement();
            cart_success.windowClose('.page_cart_modal_success .close');
            checkCartIsEmpty();    
}




function checkCartIsEmpty() {
    if ($('.page_cart .products .single_product').length < 1) {
        $('.page_cart .order').addClass('unavaliable');
    }
}
