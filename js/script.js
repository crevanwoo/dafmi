function loadContent(to, from, callback) {
    if (callback) {
        $(to).load(from, callback)
    } else {
        $(to).load(from)
    }
}

function findParent(selector, parent_class) {
    while (!selector.hasClass(parent_class)) {
        selector = selector.parent();
        if (selector.prop("tagName").toLowerCase() == 'body') {
            return //selector
        }
    }

    return selector
}


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


function CollectRequestData(container_selector) {

    this.item = 'single_item_selector';

    this.value = 'value_selector';

    this.amount = 'amount_selector';


    this.adapt_data = function () {
        collectData();
        return JSON.stringify(Data);
    }

    var Current = this;

    var Data = {};

    function collectData() {
        $(container_selector).find(Current.item).each(function () {
            var value = $(this).find(Current.value).text();
            var amount = $(this).find(Current.amount).text()
            Data[value] = amount;
        })
    }

}



var cart_error;

function sendData(data, f_onsuccess) {
    jQuery.ajax({
        url: 'ajax.php',
        type: "POST",
        data: data,
        success: function (response) {

            if (response && response != "Hi") {
                console.log('response is');
                f_onsuccess(response);

            } else {
                console.log('response not');
                f_onsuccess();

            }
            console.log(data);
            console.log('success');
        },
        error: function (response) {

            if (!cart_error) {
                cart_error = new ModalWindow('.page_cart_modal_error');
            }
            cart_error.activateElement();
            cart_error.windowClose('.page_cart_modal_error .close, .page_cart_modal_error .back');
            console.log('error');
        }
    });
}




function sendModalSelect(value, select_obj) {
    jQuery.ajax({
        url: 'ajax.php',
        type: "POST",

        data: value,
        success: function (response) {

            response = ['1', '2', '3'];
            select_obj.fillImportedList(response);
            select_obj.createOptionList();


        },
        error: function (response) {
            var cart_error = new ModalWindow('.page_cart_modal_error');
            cart_error.activateElement();
            cart_error.windowClose('.page_cart_modal_error .close, .page_cart_modal_error .back');
            console.log('error');
        }
    });

};


function setImageAsBg(selector_image, bg_class) {
    $(selector_image).each(function () {
        var bg = findParent($(this), bg_class);
        bg.css('background-image', 'url(' + $(this).attr('src') + ')')
    })
};


function setLinkFromDataAttr(to__selectors, from__parent_class, from__attr_name) {

    var attr_name = from__attr_name || 'data-product-link';
    $('body').on('click', to__selectors, function () {
        var link = findParent($(this), from__parent_class).attr(attr_name);
        window.open(link)
    })
};


function CollectFormData(selector) { // this is modal window


    this.adapt_data = function () {
        collectData();
        return JSON.stringify(Data);
    }

    var Current = this;

    var Data = {};

    function collectData() {


        $(selector).find('input').each(function () {
            var key = $(this).attr('data-key');
            var value = encodeURI($(this).val());
            Data[key] = value;

        });
        $(selector).find('textarea').each(function () {
            var key = $(this).attr('data-key');
            var value = encodeURI($(this).val());
            Data[key] = value;

        });
        $(selector).find('.select').each(function () {
            var key = $(this).prev().attr('data-key');
            var value = $(this).find('.select-styled.changed').text();
            Data[key] = value;
        });
    }
}

var Register_Data = {};



function collectFormDataToStack() {

    var data_piece = new CollectFormData('[data-modal-name="' + findParent($(this), 'modal_window').attr('data-modal-name') + '"]');

    Register_Data[findParent($(this), 'modal_window').attr('data-modal-name')] = data_piece.adapt_data();

    for (key in Register_Data) {
        console.log(key + ':' + Register_Data[key])
    }
}

/* Выдает результат поиска - или результат при вернуться назад, или фильтрует по гаражу. Данные берутся из ответа сервера
{
main_tab_index: int, car_with_icons, 
list_of_models: array, models_filtered_by_mark,
list_of_motors: array, morors_filterd_by_model,
current_auto: int, index_auto in marks_array(on page),
current_model: int, index_model in model_array,
current_motor: int, index_motor in motor_array, 
}


*/

function setMainSelection(response) {

    manageMenuButtons.call($('.content_nav .nav_main .type[data-car-type=' + response.main_tab_index + ']'), '.content_nav .nav_main .type');
    hideBlock('.content_products_wrapper >div', '.content_panel .views');
    $('.content_products').removeClass('grid');


    Select_1.listClicked(Select_1.imported_list[response.current_auto], Select_1.imported_list[response.current_auto], $('.select_1'));

    Select_2.imported_list = response.list_of_models;
    Select_2.listClicked(Select_2.imported_list[response.current_model], Select_2.imported_list[response.current_model], $('.select_2'));
    Select_2.createOptionList();
    Select_2.state(true);

    Select_3.imported_list = response.list_of_motors;
    Select_3.listClicked(Select_3.imported_list[response.current_motor], Select_3.imported_list[response.current_motor], $('.select_3'));
    Select_3.createOptionList();
    Select_3.state(true);

    loadContent('.content_products_wrapper', '../index_result_full.html .result_full',
        index_results.resultHasLoaded);

}

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
function changeHeaderView(param) {
    param = (parseInt(param) > 0) ? parseInt(param) : -parseInt(param);
    //console.log(param);

    if (param > 150 && !$('.header_bottom').hasClass('min')) {
        $('.header_bottom').delay(300).addClass('min');
    } else if (param <= 150) {
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




function setErrorMessage(marker) {

    if (!marker && $('.modal_registration_2_1 .invalid').length < 1) {
        $('<li><span class="invalid">Вы должны заполнить все поля</span></li>').insertBefore($('.modal_registration_2_1 .next'));
    } else if (marker) {
        $('.modal_registration_2_1 .invalid').parent().remove();
    }

}


function manageProductCell(event, selector, cell_class_name) {


    var target = $(event.target);

    if (!$(target).hasClass('cart') && !findParent($(this), cell_class_name).hasClass('active')) {
        small_partners.deactivateElement.call($('.single_product .cart'), '.popup_small_partners');
        $(selector + '.active').removeClass('active');

        findParent($(this), cell_class_name).addClass('active');

    } else if (!$(target).hasClass('cart') && findParent($(this), cell_class_name).hasClass('active')) {
        small_partners.deactivateElement.call($('.single_product .cart'), '.popup_small_partners');

        $(selector + '.active').removeClass('active');

    } else if ($(target).hasClass('cart') && !findParent($(this), cell_class_name).hasClass('active')) {

        $(selector + '.active').removeClass('active');

        findParent($(this), cell_class_name).addClass('active');
        /*add fucntion add product to cart*/

    } else if ($(target).hasClass('cart') && findParent($(this), cell_class_name).hasClass('active')) {

        /*add fucntion add product to cart*/

    }



}


function createExpandSearchSelects() {





    ex_search_sel_1.imported_list = Select_1.imported_list;
    ex_search_sel_1.createSelection('.ex_search_select_1');
    ex_search_sel_1.state(true);


    ex_search_sel_2.createSelection('.ex_search_select_2');

    ex_search_sel_3.createSelection('.ex_search_select_3');

}


function setSingleResultMobStyle() {
    if (window.innerWidth <= 850) {
        $('.single_result_page').find('.title,  .single_result_page__content').removeClass('active');
    }
    else {
         $('.single_result_page').find('.title').addClass('active');
        
    }
}

/* --- ---- --- --- --- --- On Page Load > --- ---- --- --- --- --- */

addCustomSelect('.footer_top .lang select');


// add items on first index page's tab to list

addCarsTypeToList();

$(document).ready(function () {


    setCustomScroll()

})

$(window).on('resize', function () {
    setCustomScroll();
    setSingleResultMobStyle();
    if (window.innerWidth <= 850) {
        $('.nano').css('height', 'auto');
    }
})

function setCustomScroll() {

    if (window.innerWidth >= 851) {
        if ($('.mCustomScrollbar').length === 0) {
            $('.nano').mCustomScrollbar({
                setHeight: $(window).height(),
                setWidth: '100%',

                autoDraggerLength: false,
                theme: "scroll-logo",
                callbacks: {
                    whileScrolling: function () {
                        changeHeaderView(this.mcs.top);

                        small_garage.deactivateElement.call(small_garage.trigger, '.popup_small_garage');

                        small_cart.deactivateElement.call(small_cart.trigger, '.popup_small_cart');

                        small_partners.deactivateElement.call($('.cart.active'), '.popup_small_partners');
                    }
                }
            });
        }


    } else {
        $('.nano').mCustomScrollbar("destroy");

    }

}


//create select 

var Select_1 = new Selection();

var Select_2 = new Selection();

var Select_3 = new Selection();


Select_1.addDataIndexForDOMElemens('.content_products .product');
Select_1.addValuesToList('.content_products .product .title');
Select_1.createSelection('.main_list .select_1');
Select_1.state(true);


Select_2.createSelection('.main_list .select_2');

Select_3.createSelection('.main_list .select_3');


// registration
var modal_reg_1_sel_1 = new Selection();
modal_reg_1_sel_1.addValuesToList('.content_products .product .title');
modal_reg_1_sel_1.createSelection('.modal_reg_1_sel_0');
modal_reg_1_sel_1.state(true);

var modal_reg_1_sel_2 = new Selection();
modal_reg_1_sel_2.createSelection('.modal_reg_1_sel_1');

var modal_reg_1_sel_3 = new Selection();
modal_reg_1_sel_3.createSelection('.modal_reg_1_sel_2');

/* --- ---- --- --- --- --- < On Page Load --- ---- --- --- --- --- */




/* --- ---- --- --- --- --- Events > --- ---- --- --- --- --- */

/* --- Header > --- */
//change header view

/*$(window).on("wheel keydown touchstart touchmove", function () {
    changeHeaderView(window.pageYOffset)
})*/

var small_cart = new Navigation('.header_bottom .cart');
small_cart.changing_properties = {
    'display': 'block'
};
small_cart.transition_time = 500;
small_cart.addListeners('click', '.popup_small_cart');

$('.header_bottom .cart').on('click', function () {
    small_garage.deactivateElement.call(small_garage.trigger, '.popup_small_garage');
})

// popup garage

var small_garage = new Navigation('.header_bottom .garage');
small_garage.changing_properties = {
    'display': 'block'
};
small_garage.transition_time = 500;
small_garage.addListeners('click', '.popup_small_garage');


var small_garage_sel = new Selection();

small_garage_sel.createSelection('.popup_small_garage .select_auto select');
small_garage_sel.state(true);

setImgAsBg('.popup_small_garage .img img');

$('body').on('click', '.popup_small_garage .select_auto .select-options li', function () {
    sendData( /* auto id */ 'some_data', setMainSelection.bind(null, {
        main_tab_index: 2,
        list_of_models: [1, 2, 3, 4, 5, 6, 7],
        list_of_motors: [0, 9, 8, 7, 6, 5],
        current_auto: 4,
        current_model: 2,
        current_motor: 2,
    }))
})


$('.header_bottom .garage').on('click', function () {
    small_cart.deactivateElement.call(small_cart.trigger, '.popup_small_cart')
})


/*MOB*/

$('header .icon_search').on('click', function () {

    $(this).toggleClass('active');
    $('header .input').toggleClass('active');

    $('header .icon_menu, .header_top .wrapper').removeClass('active');


});

$('header .icon_menu').on('click', function () {

    $(this).toggleClass('active');
    $('.header_top .wrapper').toggleClass('active');

    $('header .icon_search, header .input').removeClass('active');


});

$('header .mob_ver .search').on('click', function () {
    $('.content').attr('class', 'content');
    $('.content').empty();
    $('header .icon_menu, .header_top .wrapper').removeClass('active');

    loadContent('.content', '../index_variants.html .expand_search', createExpandSearchSelects);

})





/* --- < Header --- */



/* --- Main panel's tabs > --- */

// manage panel buttons

$('.content_nav .nav_main .type').on('click', function () {

    manageMenuButtons.call(this, '.content_nav .nav_main .type');
    hideBlock($('.content_products .content_products_wrapper >div'));

    var car_type = '.cars_type_' + $(this).attr('data-car-type');
    var DOM_car_type = $(car_type);

    if (!$('.content_products_wrapper').find(car_type).length > 0) {
        if ($(this).attr('data-car-type') < 4) {
            $('.content_panel').css('display', 'block');
            $('.content_products').addClass('grid');
            loadContent('.content_products_wrapper', '../index_cars_type.html ' + car_type, setSelection.bind(null, Select_1, '.content_products .product .title', '.content_products .product'));
        } else {
            function resetAllSelection() {
                Select_1.reset();
                Select_2.reset();
                Select_3.reset();
            }
            $('.content_products').removeClass('grid');
            $('.content_panel').css('display', 'none');

            loadContent('.content_products_wrapper', '../index_result_full.html .result_full',
                index_results.resultHasLoaded);
            resetAllSelection()

        }
    } else {
        showBlock(DOM_car_type)
    }

});

/* --- < Main panel's tabs --- */

/* --- Index additional panel > --- */

//change products revealing type

$('.grid_view .list').on('click', function () {
    toggleGridClasses()
});

$('.grid_view .grid').on('click', function () {
    toggleGridClasses()
});


// manage alphabet filter

$('.sort_az_letter').on('click', function (e) {
    changeAlphabetSort.call(this, e);
});


$('.sort_az .az_trigger').on('click', function () {
    showAlphabetSort.call(this);
});
/* --- < Index additional panel --- */

/* --- Expand search > --- */



$('.tab_2').on('click', function () {

    if ($('.expand_search').length < 1) {
        loadContent('.nav_expand', '../index_variants.html .expand_search', createExpandSearchSelects);
    }


    if ($(this).hasClass('active')) {
        hideBlock('.expand_search');
        showBlock('.main_list', '.nav_main');
    } else {
        hideBlock('.main_list', '.nav_main');
        showBlock('.expand_search');
    }

    toggleClassOfFewElem.call(null, this);

});




var ex_search_sel_1 = new Selection();

var ex_search_sel_2 = new Selection();

var ex_search_sel_3 = new Selection();




$('body').on('click', '.expand_search_content .submit', function () {
    function f_onsuccess() {
        // wrappeer = ".expand_search .search_result"
        $('.expand_search .search_result').empty();

        function f_onsuccess() {
            var expand_search_results = new Results(".expand_search .search_result");
            expand_search_results.resultHasLoaded();

        };
        loadContent('.expand_search .search_result', '../index_result_full.html .result_full >*', f_onsuccess);


    };
    validateForm("[name='expand_search_form']", f_onsuccess) /*, sendData.bind(null, modal_consult.adapt_data(), modal_consult.deactivateElement))*/ ;
})

$('body').on('click', '.expand_search .select:eq(0) .select-options li', function () {
    ex_search_sel_2.reset();
    sendModalSelect($(this).text(), ex_search_sel_2);
    ex_search_sel_2.state(true);
    ex_search_sel_3.reset();
    ex_search_sel_3.state(false);
});

$('body').on('click', '.expand_search .select:eq(1) .select-options li', function () {
    ex_search_sel_3.reset();
    sendModalSelect($(this).text(), ex_search_sel_3);
    ex_search_sel_3.state(true);
});


// show and hide expand search





//switch tabs in expand search

$('body').on('click', '.expand_search .nav_types .type', function () {
    if (!$(this).hasClass('active')) {
        $('.expand_search .nav_types .type.active').removeClass('active');
        $(this).addClass('active');

    }
});

$('body').on('click', '.expand_search .details .tabs >div', function () {
    if (!$(this).hasClass('active')) {
        $('.expand_search .details .tabs .active').removeClass('active');
        $(this).addClass('active');
        $('.expand_search .expand_search_content .expand_tab').css('display', 'none');
        $('.expand_search .expand_search_content .expand_tab:eq(' + $(this).attr('data-expand-tab') + ')').css('display', 'block');
    }
});

$('body').on('click', '.expand_search .details .axis >div', function () {
    if (!$(this).hasClass('active')) {
        $('.expand_search .details .axis .active').removeClass('active');
        $(this).addClass('active');

    }
});

$('body').on('click', '.expand_search .single_result .tab_2 .main_title', function () {
    showResultTab2Level1.call(this);
})


$('body').on('click', '.expand_search .single_result .tab_2 .single_model_title', function () {
    showResultTab2Level2.call(this);
})


/* --- < Expand search --- */




/* --- Select step 1 > --- */

$('body').on('click', '.main_list .filters .select:eq(0) .select-options li, .content_products .product', function () {
    hideBlock('.content_products_wrapper >div', '.content_panel .views');
    loadContent('.content_products_wrapper', '../index_result.html .result_grid', showModelResults);
});

$('body').on('click', '.content_products .product', function () {
    var index = $(this).attr('data-index');
    Select_1.listClicked(Select_1.imported_list[index], Select_1.imported_list[index], $('.select_1'));
});

/* --- < Select step 1 --- */



/* --- Select step 2 > --- */

$('body').on('click', '.result_grid .model_choosing .model', function () {
    var index = $(this).attr('data-index');
    Select_2.listClicked(Select_2.imported_list[index], Select_2.imported_list[index], $('.select_2'));
    actionForModelChoosing();
})

// single result grid choosing model
$('body').on('click', '.main_list .filters .select:eq(1) .select-options li, .result_grid .single_result', function () {
    if ($(this).find('.model').length > 1) {
        smoothShow.call(this, '.model_choosing', 'table');
        return
    }
    actionForModelChoosing();
});

/* --- < Select step 2 --- */




/* --- Select step 3 > --- */

$('body').on('click', '.main_list .filters .select:eq(2) .select-options li, .result_list .result_list_row', function () {
    $('.content_products').removeClass('grid');
    hideBlock('.content_products_wrapper >div', '.content_panel .views');
    loadContent('.content_products_wrapper', '../index_result_full.html .result_full',
        index_results.resultHasLoaded);
    var index = $(this).find('[data-value="motor"]').attr('data-index');
    Select_3.listClicked(Select_3.imported_list[index], Select_3.imported_list[index], $('.select_3'));
});
/* --- < Select step 3 --- */




/* --- Results > --- */

/*$('body').on('click', '.result_full .single_result .img, .result_full .single_result .top_row .vendor, .result_full .single_result .top_row .mid_h', function () {
    var link = findParent($(this), 'single_result').attr('data-product-link');
    window.open(link)
})*/
var index_results = new Results(".result_full");


$('body').on('click', '.result_full .single_result .tab_2 .main_title', function () {
    showResultTab2Level1.call(this);
})


$('body').on('click', '.result_full .single_result .tab_2 .single_model_title', function () {
    showResultTab2Level2.call(this);
});


var small_partners = new Navigation('.single_result .cart, .single_product .cart');

small_partners.changing_properties = {
    'display': 'block'
};
small_partners.transition_time = 500;

small_partners.addListeners('click', '.popup_small_partners');




/* --- < Results --- */


/* --- Single product page > --- */

$('body').on('click', '.single_result_page .models_info .main_title', function () {
    showResultTab2Level1.call(this);
})


$('body').on('click', '.single_result_page .models_info .single_model_title', function () {
    showResultTab2Level2.call(this);
})


setSingleResultMobStyle();


$('.single_result_page').on('click', '.param_info .title, .models_info .title,  .links_info .title', function () {
    if (window.innerWidth <= 850) {
        $(this).toggleClass('active');
        $(this).parent().find(' .single_result_page__content').toggleClass('active');
    }
})

/* --- < Single product page --- */

/* --- ---- --- --- --- --- < Events  --- ---- --- --- --- --- */



/* --- Cart page > --- */
var cart_content;

checkCartIsEmpty();

setImageAsBg('.page_cart .single_product .img img', 'img');
setLinkFromDataAttr('.page_cart .single_product .img, .page_cart .single_product .vendor, .page_cart .single_product .title', 'single_product');


$('.page_cart_modal_confirm .confirm').on('click', function () {
    cart_content = new CollectRequestData('.page_cart .products');
    cart_content.value = '.vendor';
    cart_content.amount = '.amount .num span';
    cart_content.item = ".single_product";
    sendData(cart_content.adapt_data(), respondCartSuccess);
})

$('.page_cart .remove_from_cart').on('click', function () {
    var product = findParent($(this), 'single_product');
    product.remove();
    page_cart_amount.checkTotalSumm.call($('.page_cart .single_product'));
    checkCartIsEmpty();
})




var page_cart_amount = new PlusMinusControls('.page_cart .single_product .amount');

page_cart_amount.addListeners('click');
page_cart_amount.amount = '.num span';


var cart_confirm = new ModalWindow('.page_cart_modal_confirm');
cart_confirm.windowOpen('.page_cart .bottom_panel .order:not(.unavaliable)');
cart_confirm.windowClose('.page_cart_modal_confirm .close, .page_cart_modal_confirm .back, .page_cart_modal_confirm .confirm');

/* --- < Cart page --- */

/* --- Modal register > --- */

$('body').on('click', '.modal_registration_2_1 .select:eq(0) .select-options li', function () {
    modal_reg_1_sel_2.reset();
    sendModalSelect($(this).text(), modal_reg_1_sel_2);
    modal_reg_1_sel_2.state(true);
    modal_reg_1_sel_3.reset();
    modal_reg_1_sel_3.state(false);
});

$('body').on('click', '.modal_registration_2_1 .select:eq(1) .select-options li', function () {
    modal_reg_1_sel_3.reset();
    sendModalSelect($(this).text(), modal_reg_1_sel_3);
    modal_reg_1_sel_3.state(true);
});

$('body').on('click', '.modal_registration_2_1 .select:eq(2) .select-options li', function () {
    setErrorMessage(true);
});



var modal_consult = new ModalWindow('.modal_consult');
modal_consult.windowOpen('.header_bottom .consult');
modal_consult.windowClose('.modal_consult .close');


$('body').on('click', '.modal_consult .submit', function () {
    validateForm("[name=" + findParent($(this), 'modal_window').find('form').attr('name') + "]", sendData.bind(null, modal_consult.adapt_data(), modal_consult.deactivateElement));
})


var modal_authorization = new ModalWindow('.modal_authorization');
modal_authorization.windowOpen('.header_top .status, .page_print .author.button, header .mob_ver .enter');
modal_authorization.windowClose('.modal_authorization .close');


$('body').on('click', '.modal_authorization .submit', function () {
    var data = modal_authorization.adapt_data();
    validateForm("[name=" + findParent($(this), 'modal_window').find('form').attr('name') + "]", sendData.bind(null, data, modal_authorization.deactivateElement));

})

var modal_restore_pass;

$('body').on('click', '.modal_authorization .restore_pass', function () {
    modal_authorization.deactivateElement();
    if (!modal_restore_pass) {
        modal_restore_pass = new ModalWindow('.modal_restore_pass');
        modal_restore_pass.windowClose('.modal_restore_pass .close');
    }
    modal_restore_pass.activateElement();
})

$('body').on('click', '.modal_restore_pass .submit', function () {




    function onsuccess() {
        modal_restore_pass.deactivateElement();

        var modal_restore_pass_success = new ModalWindow('.modal_restore_pass_success');
        modal_restore_pass_success.windowClose('.modal_restore_pass_success .close');

        modal_restore_pass_success.activateElement();

    }

    var data = modal_restore_pass.adapt_data();

    validateForm("[name=" + findParent($(this), 'modal_window').find('form').attr('name') + "]", sendData.bind(null, data, onsuccess));

})

var modal_register_1;

$('body').on('click', '.modal_authorization .register, .page_print .register.button', function () {
    modal_authorization.deactivateElement();
    if (!modal_register_1) {
        modal_register_1 = new ModalWindow('.modal_registration_1');
        modal_register_1.windowClose('.modal_registration_1 .close');
    }
    modal_register_1.activateElement();
});

var modal_register_2_1, modal_register_2_2;

$('body').on('click', '.modal_registration_1 .customer', function () {
    modal_register_1.deactivateElement();
    if (!modal_register_2_1) {
        modal_register_2_1 = new ModalWindow('.modal_registration_2_1');
        modal_register_2_1.windowClose('.modal_registration_2_1 .close');
    }
    modal_register_2_1.activateElement();
});


$('body').on('click', '.modal_registration_1 .partner', function () {
    modal_register_1.deactivateElement();
    if (!modal_register_2_2) {
        modal_register_2_2 = new ModalWindow('.modal_registration_2_2');
        modal_register_2_2.windowClose('.modal_registration_2_2 .close');
    }
    modal_register_2_2.activateElement();
});


$('body').on('click', '.modal_registration_2_1 .close, .modal_registration_2_2 .close, .modal_registration_3 .close, .modal_registration_4 .close', function () {
    Register_Data = {};
    console.log('deleted');
    for (key in Register_Data) {
        console.log('key' + ':' + Register_Data[key])
    }
    //очистить данные
    //Register_Data['modal_window_name', 'thisData']
})

var modal_register_3;
$('body').on('click', '.modal_registration_2_1 .next', function () {

    var marker = true;

    $('.modal_registration_2_1 .select-styled').each(function () {

        if (!$(this).hasClass('changed')) {
            marker = false;
        }
    })

    setErrorMessage(marker);

    if (marker) {

        collectFormDataToStack.call(this);

        modal_register_2_1.deactivateElement();


        if (!modal_register_3) {
            modal_register_3 = new ModalWindow('.modal_registration_3');
            modal_register_3.windowClose('.modal_registration_3 .close');
        }
        modal_register_3.activateElement();
    }

});



$('body').on('click', '.modal_registration_2_2 .next', function () {

    function onsuccess() {
        console.log('hi');
        collectFormDataToStack.call(this);

        modal_register_2_2.deactivateElement();

        if (!modal_register_3) {
            modal_register_3 = new ModalWindow('.modal_registration_3');
            modal_register_3.windowClose('.modal_registration_3 .close');
        }

        modal_register_3.activateElement();

    }

    validateForm("[name=" + findParent($(this), 'modal_window').find('form').attr('name') + "]", onsuccess.bind(this));

});







var modal_register_4;
$('body').on('click', '.modal_registration_3 .next', function () {


    function onsuccess() {
        collectFormDataToStack.call(this);
        modal_register_3.deactivateElement();

        if (!modal_register_4) {
            modal_register_4 = new ModalWindow('.modal_registration_4');
            modal_register_4.windowClose('.modal_registration_4 .close');
        }
        modal_register_4.activateElement();

    }

    validateForm("[name=" + findParent($(this), 'modal_window').find('form').attr('name') + "]", onsuccess.bind(this));

});


$('body').on('click', '.modal_registration_4 .finish', function () {


    function onsuccess() {
        collectFormDataToStack.call(this);
        modal_register_4.deactivateElement();

        var modal_register_success = new ModalWindow('.modal_registration_success');
        modal_register_success.windowClose('.modal_registration_success .close');

        function onSendSuccess() {
            modal_register_success.activateElement();
            Register_Data = {};
        }

        sendData(JSON.stringify(Register_Data), onSendSuccess);
    }

    validateForm("[name=" + findParent($(this), 'modal_window').find('form').attr('name') + "]", onsuccess.bind(this));


});









/* --- < Modal register --- */
$(document).ready(function () {
    setImgAsBg('.single_article .img img')

    if (window.innerWidth <= 850) {

        news.length = 0;

        news.addExpandTextToArray();

        $('body').on('click touchstart', '.single_article .show_more', function () {
            news.expandText(this);
        });
        $('body').on('click touchstart', '.single_article .show_less', function () {
            news.hideText(this);
        })


    } else {
        news.length = 700;

        news.addExpandTextToArray();

        $('body').on('click touchstart', '.single_article .show_more', function () {
            news.expandText(this);
        });
        $('body').on('click touchstart', '.single_article .show_less', function () {
            news.hideText(this);
        })

    }
});

// Profile

setLinkFromDataAttr('.profile_tab_content.orders .order_element', 'order_element', 'data-single-order-link');

setImgAsBg('.profile_tab_content.history .single_product .img img');

$('body').on('click', '.profile_tab_content.history .single_product', function (event) {

    manageProductCell.call(this, event, '.profile_tab_content.history .single_product', 'single_product')

})

$('body').on('click', '.catalog.print_catalog .button', function () {

    //sendData();
    $('.catalog.print_catalog').css('display', 'none');
    $('.catalog.print_catalog_confirm').css('display', 'block');



})


/*profile garage */

// popup begins

var modal_profile = new ModalWindow('.modal_profile');
modal_profile.windowOpen('.profile_tab_content.garage .add_auto, .profile_tab_content.garage .edit_auto');
modal_profile.windowClose('.modal_profile .close, .modal_profile .button.confirm'); //send data if confirm / + remove products if was edit

var GarageModal = {};
$('body').on('click', '.profile_tab_content.garage .add_auto, .profile_tab_content.garage .edit_auto', function () {

    GarageModal = {
        0: true,
        1: false,
        2: false,
        3: false,
        4: false,
    }
    manageGarageModal(0);
})


function manageGarageModal(tab_key) {
    var trigger = '.profile_tab_content.garage .modal_window.modal_profile .modal_steps li';
    var tab = '.profile_tab_content.garage .modal_window.modal_profile .modal_tab';
    var actual_key = tab_key;
    var last_key = 4;
    for (var i = ++actual_key; i <= last_key; i++) {
        GarageModal[i] = false;
        $(trigger + '[data-profile-modal-tab=' + i + ']').removeClass('active');
    }

    for (key in GarageModal) {
        if (GarageModal[key]) {
            $(trigger + '[data-profile-modal-tab=' + key + ']').addClass('active');
            $(tab).css('display', 'none');
            $(tab + '[data-profile-modal-tab=' + key + ']').css('display', 'block');
        }
    }
}



$('body').on('click', '.profile_tab_content.garage .modal_window.modal_profile [data-main]', function () {
    var tab_key = parseInt(findParent($(this), 'modal_tab').attr('data-profile-modal-tab')) + 1;
    GarageModal[tab_key] = true;
    manageGarageModal(tab_key);

    //send data here

});

$('body').on('click', '.profile_tab_content.garage .modal_window.modal_profile .modal_steps li', function () {
    if ($(this).hasClass('active')) {
        var tab_key = $(this).attr('data-profile-modal-tab');
        manageGarageModal(tab_key);
    }
});






$('body').on('click', '.profile_tab_content.garage .modal_window.modal_profile .modal_steps li:eq(2), [data-main]', function () {
    //set after loading
    $('.profile_tab_content.garage .modal_window.modal_profile .modal_tab.model .single_result').each(function () {
        if ($(this).find('.model_choosing .model').length < 2) {
            $(this).find('.title').text($(this).find('.model_choosing .model').text()).attr('data-main', $(this).find('.model_choosing .model').attr('data-main'));
        }
    })
});



$('body').on('click', '.profile_tab_content.garage .modal_window.modal_profile .modal_tab.model .single_result', function () {
    if ($(this).find('.model').length > 1) {
        smoothShow.call(this, '.model_choosing', 'table');
        return
    }
});


setImgAsBg('.modal_tab.confirm_choosing .img img');

// popup ends


var select_garage = new Selection();


//select_garage.addValuesToList('.content_products .product .title');
select_garage.createSelection('.profile_tab_content.garage .select_auto select');
select_garage.state(true);


var page_garage_result_test = 0;
$('body').on('click', '.profile_tab_content.garage .select_auto .select li', function () {
    $('.profile_tab_content.garage .search_result').empty();

    function f_onsuccess(response) {
        var i = 0;
        $('.profile_tab_content.garage .search_params .search_param').each(function () {
            $(this).find('span').html(response[i]);
            i++;
        })
    }

    sendData($(this).text(), f_onsuccess.bind(null, [page_garage_result_test++, page_garage_result_test++, page_garage_result_test++, page_garage_result_test++, page_garage_result_test++]))

});



$('body').on('click', '.profile_tab_content.garage .search_result .single_product', function (event) {
    manageProductCell.call(this, event, '.profile_tab_content.garage .search_result .single_product', 'single_product');

});

$('body').on('click', '.profile_tab_content.garage .search_param', function () {
    $('.profile_tab_content.garage .search_result').empty();
    loadContent('.profile_tab_content.garage .search_result', '../page_profile_history.html .history_wrapper >*', setImgAsBg.bind(null, '.profile_tab_content.garage .search_result .img img'));
});

// profile catalogue_2
$('body').on('click', '.profile_tab_content.catalog.choose_items .nav .type', function () {
    $(this).parent().find('.type').removeClass('active');
    $(this).addClass('active');
});

$('body').on('click', '.profile_tab_content.catalog.choose_items .details .tabs >div', function () {
    $(this).toggleClass('active');
});

$('body').on('click', '.profile_tab_content.catalog.choose_items .details .axis >div', function () {
    $(this).parent().find('>div').removeClass('active');
    $(this).addClass('active');
});



/* Page compare */

setImgAsBg('.page_compare .col_product .img img');

$('.col_product .close').on('click', function () {
    findParent($(this), 'col_product').css('width', '0');
    var Current = $(this);
    setTimeout(function () {
        findParent(Current, 'col_product').remove();
    }, 300)
})


/*   Page new positions >   */


var new_positions_select_1 = new Selection();
new_positions_select_1.createSelection('.new_positions_select_1');
new_positions_select_1.state(true);

var new_positions_select_2 = new Selection();
new_positions_select_2.createSelection('.new_positions_select_2');
new_positions_select_2.state(true);


$('body').on('click', '.new_positions .submit', function () {
    console.log('123');
    $('.new_positions .search_result').empty();

    function f_onsuccess() {

        var new_positions_results = new Results(".new_positions .search_result");
        new_positions_results.resultHasLoaded();

    };
    loadContent('.new_positions .search_result', '../index_result_full.html .result_full >*', f_onsuccess);
});




//switch tabs in new positions search

$('body').on('click', '.new_positions .nav_types .type', function () {
    if (!$(this).hasClass('active')) {
        $('.new_positions .nav_types .type.active').removeClass('active');
        $(this).addClass('active');

    }
});

$('body').on('click', '.new_positions .details .tabs >div', function () {
    if (!$(this).hasClass('active')) {
        $(this).addClass('active');
    } else {
        $(this).removeClass('active');
    }
});

$('body').on('click', '.new_positions .details .axis >div', function () {
    if (!$(this).hasClass('active')) {
        $('.new_positions .details .axis .active').removeClass('active');
        $(this).addClass('active');

    }
});

$('body').on('click', '.new_positions .single_result .tab_2 .main_title', function () {
    showResultTab2Level1.call(this);
})


$('body').on('click', '.new_positions .single_result .tab_2 .single_model_title', function () {
    showResultTab2Level2.call(this);
})






/*   < Page new positions   */

/*Bttns Compare and Cart*/

$('body').on('click', '.single_result .compare', function () {
    var total = findParent($(this), 'results_wrapper').prev().find('.compare span');

    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        var text = +total.text();
        if (text > 0) {
            total.html('' + --text);
        };
    } else {
        $(this).addClass('active');
        var text = +total.text();
        total.html('' + ++text)
    }
})


$('body').on('click', '.result_full_panel .compare', function () {

    window.open('../page_compare.html');

})


$('body').on('click', '.single_result .cart, .single_product .cart, .single_result_page .cart', function () {
    $(this).addClass('active');

    $('.header_bottom .cart .items_amount').text(+$('.header_bottom .cart .items_amount').text() + 1)

    var popup_amount = parseInt($('.popup_small_cart .str_amount span').text());
    var word;
    if (popup_amount === 1) {
        word = " товар"
    } else if (popup_amount > 1 && popup_amount < 5) {
        word = " товара"
    } else {
        word = " товаров"
    }
    $('.popup_small_cart .str_amount span').text(++popup_amount + word);

    function getNum(string) {
        string = string.split(' ');
        console.log(string);
        string = string.join('');
        return +string

    }
    var str_summ = getNum($('.popup_small_cart .str_summ span').text());
    console.log(str_summ);
    str_summ += getNum($(this).prev().find('span').text());
    $('.popup_small_cart .str_summ span').text(str_summ);

});



function PlusMinusControls(selector) {

    this.addListeners = function (events) {
        $('body').on(events, selector, function (e) {
            makeAction.call(e.target)
        })
    };

    this.controlDecrease = 'minus';

    this.controlIncrease = 'plus';

    this.amount = ".num span";

    this.wrapper = "amount";

    this.productParent = 'single_product';

    this.productPrice = '.price span';

    this.productSumm = '.summ span';

    this.totalSumm = '.page_cart .total span';
    
    this.globalWrapper = '.page_cart';

    var Current = this;

    function changeAmount(boolean) {
        var parent = findParent($(this), Current.wrapper);
        var current_amount = +$(parent).find(Current.amount).text();

        if (boolean) {
            setAmount(++current_amount, parent)
        } else {
            setAmount(--current_amount, parent)
        }
        var ProductParent = findParent($(this), Current.productParent);
        
        checkSumm.call(ProductParent);
        Current.checkTotalSumm.call($(Current.globalWrapper + ' .' + Current.productParent));
    };

    function setAmount(num, parent) {
        if (num < 1) {
            num = 1
        };
        parent.find(Current.amount).text(num);
    };

    function makeAction() {
        if ($(this).hasClass(Current.controlDecrease)) {
            changeAmount.call(this, false)

        } else if ($(this).hasClass(Current.controlIncrease)) {
            changeAmount.call(this, true)
        }
    };


    function checkSumm() { //this = single_product_self
        var price = +$(this).find(Current.productPrice).text();
        var amount = +$(this).find('.' + Current.wrapper + ' ' + Current.amount).text();
        $(this).find(Current.productSumm).html(Math.round(price * amount));
    }

    this.checkTotalSumm = function () { //this = single_product_self
        
        var summ = 0;
        $(this).each(function () {
            summ += +$(this).find(Current.productSumm).text();
        })

        $(Current.totalSumm).html(summ);
    }
}
 /* ANCHOR > */
 function checkLocation() {

     var url = $(location).attr('href');

     if (url.indexOf('#') != -1) {
         var from = url.indexOf('#');
         if (url.indexOf('?') != -1) {
             var to = url.indexOf('?');
         }
         var anchor = url.slice(from, to || url.length);

         switch (anchor) {

             case '#results':
                 setMainSelection({
        main_tab_index: 3,
        list_of_models: [1, 2, 3, 4, 5, 6, 7],
        list_of_motors: [0, 9, 8, 7, 6, 5],
        current_auto: 4,
        current_model: 2,
        current_motor: 2,
    })



                 break;

             case '':



                 break;
         }
     }

 }

 checkLocation();

/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&Q(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),N.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=X.call(this,c[0],"y"),c[1]=X.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=ne()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",G(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",G(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&Q(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){o.data(a);N.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),N.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),$(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),$(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir='"+n.langDir+"' /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=oe(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' "+r+" />","<a href='#' class='"+d[14]+"' "+r+" />","<a href='#' class='"+d[15]+"' "+r+" />","<a href='#' class='"+d[16]+"' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(Q(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),G(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),G(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),W.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}P.call(this),U.call(this),i.advanced.autoScrollOnFocus&&H.call(this),i.scrollButtons.enable&&F.call(this),i.keyboard.enable&&q.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),n.advanced.extraDraggableSelectors&&l.add(e(n.advanced.extraDraggableSelectors)),o.bindEvents&&(e(document).add(e(!A()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),$(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),$(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),$(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(t){var o=t.type,a=t.target.ownerDocument!==document&&null!==frameElement?[e(frameElement).offset().top,e(frameElement).offset().left]:null,n=A()&&t.target.ownerDocument!==top.document&&null!==frameElement?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(o){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return a?[t.originalEvent.pageY-a[0]+n[0],t.originalEvent.pageX-a[1]+n[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return a?[t.pageY-a[0]+n[0],t.pageX-a[1]+n[1],!1]:[t.pageY,t.pageX,!1]}},I=function(){function t(e,t,a,n){if(h[0].idleTimer=d.scrollInertia<233?250:0,o.attr("id")===f[1])var i="x",s=(o[0].offsetLeft-t+n)*l.scrollRatio.x;else var i="y",s=(o[0].offsetTop-e+a)*l.scrollRatio.y;G(r,s.toString(),{dir:i,drag:!0})}var o,n,i,r=e(this),l=r.data(a),d=l.opt,u=a+"_"+l.idx,f=["mCSB_"+l.idx+"_dragger_vertical","mCSB_"+l.idx+"_dragger_horizontal"],h=e("#mCSB_"+l.idx+"_container"),m=e("#"+f[0]+",#"+f[1]),p=d.advanced.releaseDraggableSelectors?m.add(e(d.advanced.releaseDraggableSelectors)):m,g=d.advanced.extraDraggableSelectors?e(!A()||top.document).add(e(d.advanced.extraDraggableSelectors)):e(!A()||top.document);m.bind("contextmenu."+u,function(e){e.preventDefault()}).bind("mousedown."+u+" touchstart."+u+" pointerdown."+u+" MSPointerDown."+u,function(t){if(t.stopImmediatePropagation(),t.preventDefault(),ee(t)){c=!0,s&&(document.onselectstart=function(){return!1}),L.call(h,!1),Q(r),o=e(this);var a=o.offset(),l=O(t)[0]-a.top,u=O(t)[1]-a.left,f=o.height()+a.top,m=o.width()+a.left;f>l&&l>0&&m>u&&u>0&&(n=l,i=u),C(o,"active",d.autoExpandScrollbar)}}).bind("touchmove."+u,function(e){e.stopImmediatePropagation(),e.preventDefault();var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;t(n,i,r,l)}),e(document).add(g).bind("mousemove."+u+" pointermove."+u+" MSPointerMove."+u,function(e){if(o){var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;if(n===r&&i===l)return;t(n,i,r,l)}}).add(p).bind("mouseup."+u+" touchend."+u+" pointerup."+u+" MSPointerUp."+u,function(){o&&(C(o,"active",d.autoExpandScrollbar),o=null),c=!1,s&&(document.onselectstart=null),L.call(h,!0)})},D=function(){function o(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,z=[O(e)[0],O(e)[1]]}function n(e){if(te(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(E.push(o),W.push(a),z[2]=Math.abs(O(e)[0]-z[0]),z[3]=Math.abs(O(e)[1]-z[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*z[3]<z[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*z[2]<z[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],R,n,"y","all",!0),B.overflowed[1]&&s(w[1],R,n,"x",L,!0)}}function i(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),Q(y),p=K();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,E=[],W=[]}function r(e){if(te(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[E[E.length-2],W[W.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",L,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",L,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&G(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],E=[],W=[],R=0,L="yx"===T.axis?"none":"all",z=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction&&""!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,j(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(){t||(i&&(i=0,n("off",null)),c=!1)})},W=function(){function t(t,a){if(Q(o),!z(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v="y"===i.mouseWheel.axis?t.deltaY||a:t.deltaX;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<5&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),G(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},R=new Object,A=function(t){var o=!1,a=!1,n=null;if(void 0===t?a="#empty":void 0!==e(t).attr("id")&&(a=e(t).attr("id")),a!==!1&&void 0!==R[a])return R[a];if(t){try{var i=t.contentDocument||t.contentWindow.document;n=i.body.innerHTML}catch(r){}o=null!==n}else{try{var i=top.document;n=i.body.innerHTML}catch(r){}o=null!==n}return a!==!1&&(R[a]=o),o},L=function(e){var t=this.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}},z=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},P=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){Q(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-u*(.9*l.width())}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-u*(.9*l.height())}G(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(){var o=e(document.activeElement),a=r.find(".mCustomScrollBox").length,i=0;o.is(n.advanced.autoScrollOnFocus)&&(Q(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=a?(i+17)*a:0,t[0]._focusTimeout=setTimeout(function(){var e=[ae(o)[0],ae(o)[1]],a=[r[0].offsetTop,r[0].offsetLeft],s=[a[0]+e[0]>=0&&a[0]+e[0]<l.height()-o.outerHeight(!1),a[1]+e[1]>=0&&a[0]+e[1]<l.width()-o.outerWidth(!1)],c="yx"!==n.axis||s[0]||s[1]?"all":"none";"x"===n.axis||s[0]||G(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i}),"y"===n.axis||s[1]||G(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i})},t[0]._focusTimer))})},U=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(){0===i.scrollTop()&&0===i.scrollLeft()||e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},F=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("contextmenu."+r,function(e){e.preventDefault()}).bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.scrollButtons.scrollAmount,j(t,e,o)}if(a.preventDefault(),ee(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},q=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||j(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){Q(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-f*(.9*d.width());else var h="y",m=Math.abs(c[0].offsetTop)-f*(.9*d.height());G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},j=function(t,o,n,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],m="x"===f.dir[0]?s[1]+f.dir[1]*(d[1]*n):s[0]+f.dir[1]*(d[0]*n),v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),x="auto"!==f.scrollAmount?v:m,_=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",w=!!e;return e&&17>a&&(x="x"===f.dir[0]?s[1]:s[0]),G(t,x.toString(),{dir:f.dir[0],scrollEasing:_,dur:a,onComplete:w}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),$(f,"step"),Q(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],Q(t),oe(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},Y=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},X=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1)-s.width():l.outerHeight(!1)-s.height(),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?ae(m)[1]:ae(m)[0];case"string":case"number":if(oe(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&oe(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?ae(m)[1]:ae(m)[0]}return e(t).length?"x"===o?ae(e(t))[1]:ae(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},N=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){
return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void $(f[0],"autoUpdate")):void o()},V=function(e,t,o){return Math.round(e/t)*t-o},Q=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){Z.call(this)})},G=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||w>=S[0]+y,c.callbacks.alwaysTriggerOffsets||-B>=w]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[x[0].offsetTop,x[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,0===m.scrollTop()&&0===m.scrollLeft()||(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===n.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;o=V(o,v,c.snapOffset)}switch(n.dir){case"x":var x=e("#mCSB_"+s.idx+"_dragger_horizontal"),_="left",w=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),x.parent().width()-x.width()],b=[o,0===o?0:o/s.scrollRatio.x],y=p[1],B=g[1],T=y>0?y/s.scrollRatio.x:0,k=B>0?B/s.scrollRatio.x:0;break;case"y":var x=e("#mCSB_"+s.idx+"_dragger_vertical"),_="top",w=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),x.parent().height()-x.height()],b=[o,0===o?0:o/s.scrollRatio.y],y=p[0],B=g[0],T=y>0?y/s.scrollRatio.y:0,k=B>0?B/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=S[1]?b=[S[0],S[1]]:b[0]=-b[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),J(x[0],_,Math.round(b[1]),u[1],n.scrollEasing),!s.tweenRunning&&(0===w&&b[0]>=0||w===S[0]&&b[0]<=S[0])||J(h[0],_,Math.round(b[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(x),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&b[1]>=S[1]-T&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&b[1]<=k&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(x,"hide")},e)}}})}},J=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=K()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=K(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},K=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},Z=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},$=function(e,t){try{delete e[t]}catch(o){e[t]=null}},ee=function(e){return!(e.which&&1!==e.which)},te=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},oe=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},ae=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},ne=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return t?document[t]:!1};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).bind("load",function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+ae(n)[0]>=0&&a[0]+ae(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+ae(n)[1]>=0&&a[1]+ae(n)[1]<o.width()-n.outerWidth(!1)},mcsInSight:e.expr[":"].mcsInSight||function(t,o,a){var n,i,r,l,s=e(t),c=s.parents(".mCSB_container"),d="exact"===a[3]?[[1,0],[1,0]]:[[.9,.1],[.6,.4]];if(c.length)return n=[s.outerHeight(!1),s.outerWidth(!1)],r=[c[0].offsetTop+ae(s)[0],c[0].offsetLeft+ae(s)[1]],i=[c.parent()[0].offsetHeight,c.parent()[0].offsetWidth],l=[n[0]<i[0]?d[0]:d[1],n[1]<i[1]?d[0]:d[1]],r[0]-i[0]*l[0][0]<0&&r[0]+n[0]-i[0]*l[0][1]>=0&&r[1]-i[1]*l[1][0]<0&&r[1]+n[1]-i[1]*l[1][1]>=0},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});
/*! jQuery Validation Plugin - v1.15.0 - 2/24/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){if(this.length){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){var c=a(b).val();return null!==c&&!!a.trim(""+c)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||-1!==a.inArray(c.keyCode,d)||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=h&&g.check(e)))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)a[b]&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0]),d in c||!b.objectLength(a(this).rules())?!1:(c[d]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type;return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=b.hasAttribute("contenteditable")?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);if("function"==typeof f.normalizer){if(i=f.normalizer.call(b,i),"string"!=typeof i)throw new TypeError("The normalizer should return a string value.");delete f.normalizer}for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j instanceof TypeError&&(j.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(d,e){b[d]=a.isFunction(e)&&"normalizer"!==d?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e=a(c).attr("type"),f="Step attribute on input type "+e+" is not supported.",g=["text","number","range"],h=new RegExp("\\b"+e+"\\b"),i=e&&!h.test(g.join());if(i)throw new Error(f);return this.optional(c)||b%d===0},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})});
var map_contacts;
var map_marker = "../images/icon_map_marker.png";
var map_selector;

if ($('.map').hasClass('page_contacts')) {

    map_selector = '.map.page_contacts .google_map';
} else if ($('.map').hasClass('page_partners')) {
    map_selector = '.map.page_partners .google_map';

}

function initMap() {
    var mapOptions;
    if (window.innerWidth <= 850) {
        mapOptions = {
            zoom: 17,
            center: {
                lat: 48.409968,
                lng: 35.036143,
            },
            disableDefaultUI: true,            
        }
    } else {
        mapOptions = {
            zoom: 7,
            center: {
                lat: 49.605766,
                lng: 34.563408,
            },
            disableDefaultUI: true,
            styles: styleArray
        }
    }


    map_contacts = new google.maps.Map(document.querySelector(map_selector), mapOptions);

    var marker = new google.maps.Marker({
        position: {
            lat: 48.409968,
            lng: 35.036143
        },
        map: map_contacts,
        title: 'Intelli',
        icon: map_marker
    });

    // $('header').on('click', map_contacts.getCenter);
}




var styleArray = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f5f5"
      }
    ]
  },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
      }
    ]
  },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
      }
    ]
  },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f5f5"
      }
    ]
  },
    {
        "featureType": "administrative.country",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a6a6a6",
                "weight": 10,
      }
    ]
  },
    {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified",
                "color": "#000000"
      }
    ]
  },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
      }
    ]
  },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
      }
    ]
  },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
      }
    ]
  },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
      }
    ]
  },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
      }
    ]
  },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
      }
    ]
  },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
      }
    ]
  },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dadada"
      }
    ]
  },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
      }
    ]
  },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
      }
    ]
  },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
      }
    ]
  },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
      }
    ]
  },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9c9c9"
      }
    ]
  },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
      }
    ]
  }
]

function ModalWindow(modal_selector) {

    CollectFormData.call(this, modal_selector);
	
	
    var m_window = $(modal_selector);

    this.transition_time = 300;

    this.preventScroll = true;

    this.windowOpen = function (trigger) {
        $('body').on('click', trigger, function (e) {
            Current.activateElement();
        })
    };

    this.windowClose = function (trigger) {
        $('body').on('click', trigger, function (e) {
            Current.deactivateElement(); 
        })
    };

    this.activateElement = function () {
        controlScroll();
        clicked_style = m_window.attr('style');
        try {
            style_array = clicked_style.split(';');
        } catch (err) {
            console.log(err);
            style_array = null;
        }

        m_window.css('display', 'block');


        bustDefaultStyleArray(window);

        m_window.css('transition', Current.transition_time + 'ms');
        setTimeout(function () {
            m_window.addClass('active');
        }, 100);
    };

    var Current = this; //current oject

    var clicked_style;

    var style_array;

    this.deactivateElement = function () {
        releaseScroll();
        m_window.removeClass('active');
        setTimeout(function () {
            bustDefaultStyleArray(m_window);
        }, Current.transition_time)
    };

    function bustDefaultStyleArray(selector) {
        try {
            selector.attr('style', '');
            for (var k = 0; k < style_array.length; k++) {
                var current_property = style_array[k].split(':');
                selector.css(current_property[0], [1]);
            }
        } catch (err) {
            console.log(err);
            return
        }
    }

    function controlScroll() { //open window
        if (Current.preventScroll) {
            $('body').on('wheel keydown touchstart touchmove', preventScrolling)
        }
    }

    function preventScrolling(e) {
        if (e.type == 'keydown') {
            if (e.keyCode == "40" || e.keyCode == "38") {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        } else if (e.type == 'wheel') {
            e.preventDefault();
            e.stopImmediatePropagation();
        } else {

            if (e.type == 'touchstart') {
                this.firstCoord = this.getTouchCoord(e);
            } else if (e.type == 'touchmove') {
                this.lastCoord = this.getTouchCoord(e);
            } else if (e.type == 'touchend') {
                if (this.lastCoord - this.firstCoord > 10) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                } else if (this.lastCoord - this.firstCoord < -10) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                }

            }
        }

    }

    function releaseScroll() { //close window
        $('body').off('wheel keydown touchstart touchmove', preventScrolling)
    }
}

function Navigation(selector) {

    this.transition_time = 0;

    this.changing_properties = {};
    /* события вводить без запятых, через пробелы*/
    this.addListeners = function (events, inner_selector) {
        $('body').on(events, selector, function (e) {
           
            makeAction.call(e.target, inner_selector)
        })
    };
    this.trigger = $(selector);

    this.single = true; // if false - multiple

    var Current = this; //current oject

    var clicked_style;

    var style_array;


    function singleSelect(inner_selector) {
        if ($(selector).length > 1) {
            $(selector).find(inner_selector + '.active').each(function () {
                Current.deactivateElement.call(findParent($(this), $(selector).attr('class')), inner_selector)
            })
        }
    };


    function activateElement(inner_selector) {
        var obj = $(this).find(inner_selector); // clicked object
        clicked_style = obj.attr('style');
        try {
            style_array = clicked_style.split(';');
        } catch (err) {
            console.log(err);
            style_array = null;
        }
        $.each(Current.changing_properties, function (key, value) {
            obj.css(key, value)
        });

        bustDefaultStyleArray(obj);

        obj.css('transition', Current.transition_time + 'ms');
        setTimeout(function () {
            obj.addClass('active');
        }, 100);
    };

    this.deactivateElement = function (inner_selector) {
        var obj = $(this).find(inner_selector);
        obj.removeClass('active');
        obj.attr('style', '');
        setTimeout(function () {
            bustDefaultStyleArray(obj);
        }, Current.transition_time)
    };

    function bustDefaultStyleArray(obj) {
        try {
            for (var k = 0; k < style_array.length; k++) {
                var current_property = style_array[k].split(':');
                obj.css(current_property[0], [1]);
            }
        } catch (err) {
            console.log(err);
            return
        }

    }

    function makeAction(inner_selector) {
        if ($(this).find(inner_selector).hasClass('active')) {
            return Current.deactivateElement.call(this, inner_selector)

        } else {
             if (Current.single) {
                singleSelect(inner_selector)
            }
            
            return activateElement.call(this, inner_selector)
        }
    };
}


/*function Navigation(selector) {
    
    this.transition_time = 0;
    
    this.changing_properties = {};
    
    this.addListeners = function (events) {
        for (var i = 0; i < elems_array.length; i++) {
            for (var j = 0; j < arguments.length; j++) {
                elems_array[i].addEventListener(arguments[j], makeAction())
            }
        }
    };

    var Current = this; //current oject
    
    var clicked_style;
    
    var elems_array = document.querySelectorAll(selector);
    
    function activateElement() {
        var obj = this; // clicked object
        clicked_style = obj.style;
        obj.style = JSON.stringify(Current.changing_properties) + clicked_style;
        obj.style.transition = transition_time + 'ms';
        setTimeout(function () {
            obj.classList.add('active')
        }, 100);
    };

    function deactivateElement() {
        var obj = this;
        obj.classList.remove('active');
        setTimeout(function () {
            obj.style = clicked_style;
        }, transition_time)
    };

    function makeAction() {
        if (this.classList.contains('active')) {
            return deactivateElement

        } else {
            return activateElement
        }
    };

    



}

Obj.changing_properties = {

}

var small_cart = new Navigation(.header_bottom.min .cart); //single selector*/

var news = {
	
	article_selector: ".page_news .article_text",
	articles_text: [],
    short_text: [],
	expand_index: 0,
	length: 900,    
	addExpandTextToArray: function () {	
        var Current = this;
		$(Current.article_selector).each(function () {

			if ($(this).text().length > Current.length) {
				var short_text = $(this).text().slice(0, Current.length);
				Current.articles_text.push($(this).text().slice(Current.length));
				$(this).attr('article-index', Current.expand_index++);
				$(this).empty().append(short_text);
                Current.short_text.push(short_text);
				$(this).append('<div class="show_more">... <span>Показать больше</span></div>')
			}
		})
	},
	expandText: function(Current) {
		$(Current).parent().append(this.articles_text[$(Current).parent().attr('article-index')]);
        $(Current).parent().append('<div class="show_less">   <span>Показать меньше</span></div>');
		$(Current).parent().find('.show_more').remove();
        
	
	},
    hideText: function (Current){
        var parent = $(Current).parent();
        parent.empty();
        parent.append(news.short_text[parent.attr('article-index')]);
        parent.append('<div class="show_more">... <span>Показать больше</span></div>');
    }
}
function Results(results_wrapper) {






    this.results_wrapper = results_wrapper;
    this.single_result_selector = this.results_wrapper + ' .single_result';
    this.single_result_extend_trigger_selector = '';
    this.selector_select = this.results_wrapper + ' .result_full_panel .sort_by select';
    this.selector_img_in_single_product = this.single_result_selector + ' .img img';
    this.single_result_extend = this.single_result_selector + ' .single_result_extend';




    var Current = this;


    this.numerateResultsOnPage = function () { //вычислять при загрузке страницы result или переключении на следующую
        var i = 0;
        $(Current.single_result_selector).each(function () {
            $(this).attr('data-index', i++);
        })
    };

    this.numerateTabs = function () { //вычислять при загрузке страницы result или переключении на следующую

        $(Current.single_result_selector).each(function () {
            var i = 0;
            $(this).find('.tab_panel .tab').each(function () {
                $(this).attr('data-tab-num', i++);
            })

        })
    };

    var expanded_height_array;

    var tab_control_marker = true;

    this.resultHasLoaded = function () {
        addCustomSelect(Current.selector_select); // after result has loaded
        setImgAsBg(Current.selector_img_in_single_product); // after result has loaded
        Current.numerateResultsOnPage();
        Current.numerateTabs();
        Current.calcSizesOfTabs();
    };



    this.calcSizesOfTabs = function () {
        //вычислять при загрузке страницы result или переключении на следующую
        $(Current.single_result_extend).addClass('expand');
        expanded_height_array = {};


        // должно происходит после нумерации результатов на странице

        $(Current.single_result_extend).each(function () {
            var result_num = $(this).parent().attr('data-index');
            expanded_height_array[result_num] = {};
            var i = 0;
            $(this).find('.tab_container >*').each(function () {
                expanded_height_array[result_num][i++] = $(this).innerHeight();

            });

            $(this).removeClass('expand');

        });

    };


    function showTabContent() {
        tab_control_marker = false;
        var tab_num = +$(this).attr('class').slice(-1) - 1;
        $(this).addClass('show');
        var obj = $(this);
        var single_result = obj.parent().parent().parent().attr('data-index');
        var tab_panel_height = +obj.parent().parent().parent().find('.tab_panel').innerHeight();
        setTimeout(function () {
            obj.parent().parent().css('height', +expanded_height_array[single_result][tab_num] + tab_panel_height);
            obj.css("opacity", 1)
            tab_control_marker = true;
        }, 100)
    };


    function hideTabContent() {
        var obj = $(this).parent().parent().find('.show');
        obj.removeClass('show');
        setTimeout(function () {
            obj.css("opacity", 0);
        }, 100)
    };



    function toggleExpandResultsView() {

        var single_result = findParent($(this), 'single_result');
        if ($(this).hasClass('active')) {
            var obj = $(this);
            if (tab_control_marker) {
                tab_control_marker = false;
                //single_result.find('.single_result_extend').removeClass('expand');
                single_result.find('.single_result_extend').css('height', 0);
                setTimeout(
                    function () {
                        obj.removeClass('active');
                        single_result.find('.tab_panel .show').css('opacity', '0');
                        single_result.find('.tab_panel .show').removeClass('show');
                        single_result.find('.single_result_extend .tab_panel .tab').removeClass('active');
                        tab_control_marker = true;
                    }, 500);
            }

        } else {
            $(this).addClass('active');
            var tab_panel_height = +single_result.find('.tab_panel').innerHeight();
            if (tab_control_marker) {
                tab_control_marker = false;
                single_result.find('.single_result_extend').css('height', +expanded_height_array[single_result.attr('data-index')][0] + tab_panel_height);
                single_result.find('.single_result_extend .tab_panel .tab:eq(0)').addClass('active');
                showTabContent.call(single_result.find('.tab_1'));
                tab_control_marker = true;
            }
        }
    };


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
    };


    function returnTabMenuToDefault() {
        $(Current.single_result_selector + ' .tab_2').find('.main_title').removeClass('active');
        $(Current.single_result_selector + ' .tab_2').find('.single_model_title').removeClass('active');
        $(Current.single_result_selector + ' .tab_2').find('.single_model').css('height', '0');
        $(Current.single_result_selector + ' .tab_2').parent().find('.model_content').css('height', '0');

    };




    var modal_preview = new ModalWindow('.modal_preview');
    modal_preview.windowOpen(Current.single_result_selector + ' .img.modal_trigger,' + Current.single_result_selector + ' .tab_4 img');
    modal_preview.windowClose('.modal_preview .close');


    managePreview();

    $(window).on('resize', function () {

        managePreview()

    })

    function managePreview() {

        if (window.innerWidth <= 850) {
            $(Current.single_result_selector + ' .img').each(function () {
                $(this).removeClass('modal_trigger');

            })

        } else {
            $(Current.single_result_selector + ' .img').each(function () {
                $(this).addClass('modal_trigger');

            })
        }

    }


    $('body').on('click', Current.single_result_selector + ' .show_more', function () {
        toggleExpandResultsView.call(this);
    });

    $('body').on('click', Current.single_result_selector + ' .tab_panel .tab', function () {
        switchResultTabs.call(this);
    });


    $('body').on('click', Current.single_result_selector + ' .img', function () {

        var src = $(this).find('img').attr('src');
        $('.modal_preview img').attr('src', src);

    });

    $('body').on('click', Current.single_result_selector + ' .tab_4 img', function () {

        var src = $(this).attr('src');
        $('.modal_preview img').attr('src', src);

    });


    /* setLinkFromDataAttr( //Current.single_result_selector + ' .img,' +
         Current.single_result_selector + ' .top_row .vendor,' + Current.single_result_selector + ' .top_row .mid_h', 'single_result');*/


}

function Selection() {
    var Current = this;
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

    this.fillImportedList = function (array) {
        Current.imported_list = [];
        $.each(array, function () {
            Current.imported_list.push($(this)[0]);
        })



    };

    this.imported_list = [];
    this.reset = function () {
        this.styledSelect.html(this.selector.children('option').eq(0).html());
        this.list.empty();
        this.styledSelect.removeClass('changed');
    };
    this.createOptionList = function () {
        if (this.imported_list.length > 0) {
            imported_list = this.imported_list;

        } else {
            this.selector.children('option').each(function () {
                if ($(this).val() != 'hide') {
                    Current.imported_list.push($(this).text());
                }

            });

            imported_list = this.imported_list;

        }
        this.list.empty();
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
            this.selector.children('option').each(function () {
                if ($(this).val() != 'hide') {
                    Current.imported_list.push($(this).text());
                }

            });

            imported_list = this.imported_list;

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

function validateForm(selector, f_name, f_invalid) {


    $(selector).validate({
        invalidHandler: function () {
            if (f_invalid) {
                console.log('error');
                f_invalid()
            }
        },
        submitHandler: function () {
            if (f_name) {
                console.log('success');
                f_name()
            }
        },
        rules: {
            name: {
                required: true,
            },
            pass: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            code: {
                required: true,
                number: true,
                minlength: 8,
                maxlength: 8
            },
            city: {
                required: true,
            },
            adress: {
                required: true,
            },
            tel: {
                required: true,
                number: true
            },
            comment: {
                required: true,
                maxlength: 800
            },
            pass_reg: {
                required: true
            },
            pass_confirm: {
                equalTo: "[name='pass_reg']"
            },
            num_0: {
                number: true
            },
            num_1: {
                number: true
            },
            num_2: {
                number: true
            },
            num_3: {
                number: true
            }
        },
        messages: {
            pass: {
                required: "Необходимо ввести пароль"
            },
            email: {
                required: "Необходимо ввести адрес почты",
                email: "Необходимо ввести адрес в правильном формате"
            },
            code: {
                required: "Необходимо ввести действительный код",
                minlength: "Необходимо ввести действительный код",
                maxlength: "Необходимо ввести действительный код",
                number: "Необходимо ввести действительный код"
            },
            city: {
                required: "Необходимо ввести город"
            },
            adress: {
                required: "Необходимо ввести действительный адрес"
            },
            tel: {
                required: "Необходимо ввести телефон",
                number: "Необходимо ввести только цифры",
            },
            comment: {
                required: "Напишите суть своего обращения",
                maxlength: "Сообщение слишком длинное. Максимум 800 символов",
            },

            name: {
                required: "Необходимо ввести имя"
            },
            pass_reg: {
                required: "Необходимо ввести пароль"
            },
            pass_confirm: {
                equalTo: "Ошибка ввода"
            },
            num_0: {
                number: "Вы должны указать число"
            },
            num_1: {
                number: "Вы должны указать число"
            },
            num_2: {
                number: "Вы должны указать число"
            },
            num_3: {
                number: "Вы должны указать число"
            }

        },
        errorClass: "invalid",
        validClass: "success",
        errorLabelContainer: ".error_message",
        wrapper: "li",
        errorElement: "span",

    })
}
