function loadContent(to, from, callback) {
    if (callback) {
        $(to).load(from, callback)
    } else {
        $(to).load(from)
    }
}


//for footer lang select
/*var lang_icons_arr = [];

$('.footer_top .lang option').each(
    function () {
        lang_icons_arr.push($(this).attr('data-image'));
    });*/


function addCarsTypeToList() {
    var i = 1;
    $('.content_nav .nav_main .type').each(function () {
        $('.content_nav .nav_main .type:eq(' + (i - 1) + ')').attr('data-car-type', i);
        i++
    })
}


function setSelection(obj, list_value, dom_obj_for_list) {
    obj.addDataIndexForDOMElemens(dom_obj_for_list);
    obj.reset();
    obj.addValuesToList(list_value);
    obj.createOptionList();
    if (obj == Select_1) {
        $('.content_products').addClass('grid');
        Select_2.state(false);
        Select_2.reset();
        Select_3.state(false);
        Select_3.reset();
    } else if (obj == Select_2) {
        $('.content_products').addClass('grid');
        Select_3.state(false);
        Select_3.reset();
    }
}

//'.content_products .product .title'

function Selection() {
    this.addDataIndexForDOMElemens = function (selector) {
        var i = 0;
        $(selector).each(function () {
            $(this).attr('data-index', i);
            i++
        })

    }
    this.state = function (state) {
        if (!state) {
            this.styledSelect.addClass('disabled')
        } else {
            this.styledSelect.removeClass('disabled')
        }
    };
    this.addValuesToList = function (option_selector) {
        this.imported_list = [];
        var obj = this;
        $(option_selector).each(
            function () {
                obj.imported_list.push($(this).text());
            }
        )


    }
    this.imported_list = [];
    this.reset = function () {
        this.styledSelect.html(this.selector.children('option').eq(0).html());
        this.list.empty();
        this.styledSelect.removeClass('changed');
    };
    this.createOptionList = function () {
        if (this.imported_list != '') {
            imported_list = this.imported_list;
        } else {
            imported_list = this.selector.children('option')
        }

        for (var i = 0; i < imported_list.length; i++) {
            $('<li />', {
                text: imported_list[i],
                rel: imported_list[i]
            }).appendTo(this.list);
        }

        this.listItems = this.list.children('li');

        var obj = this;

        this.listItems.on('click', function (e) {
            obj.fieldValue = $(this).html();
            obj.fieldRel = $(this).attr('rel');
            obj.listClicked(obj.fieldValue, obj.fieldRel, obj.selector);
            obj.list.hide();

        });

    };


    this.listClicked = function (fieldValue, fieldRel, $this) {

        this.styledSelect.addClass('changed');
        this.styledSelect.html(fieldValue).removeClass('active');
        $this.val(fieldRel);




    }



    this.createSelection = function (selector) {


        this.selector = $(selector);

        var imported_list;

        if (this.imported_list != '') {
            imported_list = this.imported_list;
        } else {
            imported_list = this.selector.children('option')
        }


        var numberOfOptions = imported_list.length; //$(selector).children('option').length;

        this.selector.addClass('select-hidden');
        this.selector.wrap('<div class="select"></div>');
        this.selector.after('<div class="select-styled"></div>');

        this.styledSelect = this.selector.next('div.select-styled');


        this.list = $('<ul class="select-options" />');
        this.list.insertAfter(this.styledSelect);


        this.reset();


        this.createOptionList();


        this.state(false);


        this.styledSelect.on('click', function (e) {
            e.stopPropagation();
            if (!$(this).hasClass('disabled')) {
                $('div.select-styled.active').not(this).each(function () {
                    $(this).removeClass('active').next('ul.select-options').hide();
                });
                $(this).toggleClass('active').next('ul.select-options').toggle();
            }
        });

        var obj = this;

        $(document).on('click', function () {
            obj.styledSelect.removeClass('active');
            obj.list.hide();
        })
    }


}

/* --- ---- --- --- --- --- Decorative > --- ---- --- --- --- --- */
addCustomSelect('.footer_top .lang select')();
// addImagesToLang();
addCustomSelect('.result_full .result_full_panel .sort_by select')(); // after result has loaded
setImgAsBg('.result_full .single_result .img img') // after result has loaded


//change header view

$(window).on("wheel keydown touchstart touchmove", function () {
    changeHeaderView()
})


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

addCarsTypeToList();

$('.content_nav .nav_main .type').on('click', function () {

    manageMenuButtons.call(this, '.content_nav .nav_main .type');
    hideBlock($('.content_products .content_products_wrapper >div'));

    var car_type = '.cars_type_' + $(this).attr('data-car-type');
    var DOM_car_type = $(car_type);

    if (!$('.content_products_wrapper').find(car_type).length > 0) {
        loadContent('.content_products_wrapper', '../index_cars_type.html ' + car_type, setSelection.bind(null, Select_1, '.content_products .product .title', '.content_products .product'));
    } else {
        showBlock(DOM_car_type)
    }
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

/* --- ---- --- --- --- --- < Decorative --- ---- --- --- --- --- */

/* --- ---- --- --- --- --- Functional > --- ---- --- --- --- --- */

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

// index result grid choose model 




var Select_1 = new Selection();

var Select_2 = new Selection();

var Select_3 = new Selection();


Select_1.addDataIndexForDOMElemens('.content_products .product');
Select_1.addValuesToList('.content_products .product .title');
Select_1.createSelection('.select_1');
Select_1.state(true);


Select_2.createSelection('.select_2');

Select_3.createSelection('.select_3');


//selection 2


$('body').on('click', '.content_products .product', function () {
    var index = $(this).attr('data-index');
    Select_1.listClicked(Select_1.imported_list[index], Select_1.imported_list[index], $('.select_1'));
});




$('body').on('click', '.filters .select:eq(0) .select-options li, .content_products .product', function () {
    hideBlock('.content_products_wrapper >div', '.content_panel .views');
    loadContent('.content_products_wrapper', '../index_result.html .result_grid', showModelResults);
});


// single result grid choosing model
$('body').on('click', '.filters .select:eq(1) .select-options li, .result_grid .single_result', function () {
    if ($(this).find('.model').length > 1) {
        smoothShow.call(this, '.model_choosing', 'table');
        return
    }
    actionForModelChoosing();
});


$('body').on('click', '.result_grid .model_choosing .model', function () {
    var index = $(this).attr('data-index');
    Select_2.listClicked(Select_2.imported_list[index], Select_2.imported_list[index], $('.select_2'));
    actionForModelChoosing();
})


/* --- ---- --- --- --- --- < Functional  --- ---- --- --- --- --- */

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
    $(selector).parent().css('background-image', 'url('+ src +')');
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
