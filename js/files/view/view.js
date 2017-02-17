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

            });

            $(document).on('click', function () {
                $styledSelect.removeClass('active');
                $list.hide();
            });
        });
    }
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

// измненение вида заполненного поля
function changeInputView() {
    if ($(this).hasClass('filled') && $(this).val() === '' || $(this).val() == !/\S/) {
        $(this).removeClass('filled');
    } else if (!$(this).hasClass('filled')) {
        $(this).addClass('filled');
    }
}



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
