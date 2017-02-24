/* --- ---- --- --- --- --- On Page Load > --- ---- --- --- --- --- */

addCustomSelect('.footer_top .lang select');
// addImagesToLang();

// add items on first index page's tab to list

addCarsTypeToList();



//create select 

var Select_1 = new Selection();

var Select_2 = new Selection();

var Select_3 = new Selection();


Select_1.addDataIndexForDOMElemens('.content_products .product');
Select_1.addValuesToList('.content_products .product .title');
Select_1.createSelection('.select_1');
Select_1.state(true);


Select_2.createSelection('.select_2');

Select_3.createSelection('.select_3');

/* --- ---- --- --- --- --- < On Page Load --- ---- --- --- --- --- */


/*
// change view on inner expand search input

$('body').on('input', 'input', function () {
    changeInputView.call(this);
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
*/


/* --- ---- --- --- --- --- Events > --- ---- --- --- --- --- */


//change header view

$(window).on("wheel keydown touchstart touchmove", function () {
    changeHeaderView()
})

var small_cart = new Navigation('.header_bottom.min .cart');
small_cart.changing_properties = {
    'display': 'block'
};
small_cart.transition_time = 500;
small_cart.addListeners('click', '.popup_small_cart');

/*$('body').on('click', '.header_bottom.min .cart', function () {
    console.log('click');
    var popup = $(this).find('.popup_small_cart');
    if (!popup.hasClass('active')) {
        popup.css('display', 'block');
        setTimeout(function () {
            popup.addClass('active');

        }, 100)

    } else {

        popup.removeClass('active');
        setTimeout(function () {
            popup.css('display', 'none');

        }, 500)
    }



})*/

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
                resultHasLoaded);
            resetAllSelection()

        }
    } else {
        showBlock(DOM_car_type)
    }

});

/* --- < Main panel's tabs --- */

/* --- Expand search > --- */


// show and hide expand search


$('.tab_2').on('click', function () {


    if ($('.expand_search').length < 1) {
        /*loadContent('.nav_top_expand', '../index_variants.html .expand_search:eq(0)', addCustomSelect.bind(null, '.expand_search .top_panel .param select'));

        loadContent('.nav_expand', '../index_variants.html .expand_search:eq(1)', addCustomSelect.bind(null, '.expand_search .bottom_panel .param select'));*/
        loadContent('.nav_expand', '../index_variants.html .expand_search', addCustomSelect.bind(null, '.expand_search .param select'));
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


//switch tabs in expand search

$('body').on('click', '.expand_search .nav_types .type', function () {
    if (!$(this).hasClass('active')) {
        $('.expand_search .nav_types .type.active').removeClass('active');
        $(this).addClass('active');
        $('.expand_search .expand_search_content .expand_tab').css('display', 'none');
        $('.expand_search .expand_search_content .expand_tab:eq(' + $(this).attr('data-expand-tab') + ')').css('display', 'block');
    }
})

/* --- < Expand search --- */




/* --- Select step 1 > --- */

$('body').on('click', '.filters .select:eq(0) .select-options li, .content_products .product', function () {
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
$('body').on('click', '.filters .select:eq(1) .select-options li, .result_grid .single_result', function () {
    if ($(this).find('.model').length > 1) {
        smoothShow.call(this, '.model_choosing', 'table');
        return
    }
    actionForModelChoosing();
});

/* --- < Select step 2 --- */




/* --- Select step 3 > --- */

$('body').on('click', '.filters .select:eq(2) .select-options li, .result_list .result_list_row', function () {
    $('.content_products').removeClass('grid');
    hideBlock('.content_products_wrapper >div', '.content_panel .views');
    loadContent('.content_products_wrapper', '../index_result_full.html .result_full',
        resultHasLoaded);
    var index = $(this).find('[data-value="motor"]').attr('data-index');
    Select_3.listClicked(Select_3.imported_list[index], Select_3.imported_list[index], $('.select_3'));
});
/* --- < Select step 3 --- */




/* --- Results > --- */

/*$('body').on('click', '.result_full .single_result .img, .result_full .single_result .top_row .vendor, .result_full .single_result .top_row .mid_h', function () {
    var link = findParent($(this), 'single_result').attr('data-product-link');
    window.open(link)
})*/

setLinkFromDataAttr('.result_full .single_result .img, .result_full .single_result .top_row .vendor, .result_full .single_result .top_row .mid_h', 'single_result');

$('body').on('click', '.result_full .single_result .show_more', function () {
    toggleExpandResultsView.call(this);
})

$('body').on('click', '.result_full .single_result .tab_panel .tab', function () {
    switchResultTabs.call(this);
})


$('body').on('click', '.result_full .single_result .tab_2 .main_title', function () {
    showResultTab2Level1.call(this);
})


$('body').on('click', '.result_full .single_result .tab_2 .single_model_title', function () {
    showResultTab2Level2.call(this);
})

/* --- < Results --- */


/* --- Single product page > --- */

$('body').on('click', '.single_result_page .models_info .main_title', function () {
    showResultTab2Level1.call(this);
})


$('body').on('click', '.single_result_page .models_info .single_model_title', function () {
    showResultTab2Level2.call(this);
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
    sendData();
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





function Navigation(selector) {

    this.transition_time = 0;

    this.changing_properties = {};
    /* события вводить без запятых, через пробелы*/
    this.addListeners = function (events, inner_selector) {
        $('body').on(events, selector, function (e) {
            makeAction.call(e.target, inner_selector)
        })
    };


    var Current = this; //current oject

    var clicked_style;

    var style_array;


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

    function deactivateElement(inner_selector) {
        var obj = $(this).find(inner_selector);
        obj.removeClass('active');
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
            return deactivateElement.call(this, inner_selector)

        } else {
            return activateElement.call(this, inner_selector)
        }
    };
}


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







function checkCartIsEmpty() {
    if ($('.page_cart .products .single_product').length < 1) {
        $('.page_cart .order').addClass('unavaliable');
    }
}

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

function numerateResultsOnPage() { //вычислять при загрузке страницы result или переключении на следующую
    var i = 0;
    $('.result_full .single_result').each(function () {
        $(this).attr('data-index', i++);
    })
}




function numerateTabs() { //вычислять при загрузке страницы result или переключении на следующую

    $('.single_result').each(function () {
        var i = 0;
        $(this).find('.tab_panel .tab').each(function () {
            $(this).attr('data-tab-num', i++);
        })

    })
}



function resultHasLoaded() {
    addCustomSelect('.result_full .result_full_panel .sort_by select'); // after result has loaded
    setImgAsBg('.result_full .single_result .img img') // after result has loaded
    numerateResultsOnPage();
    numerateTabs();
    calcSizesOfTabs();

}

var result_expanded_height;

function calcSizesOfTabs() {
    //вычислять при загрузке страницы result или переключении на следующую
    $('.result_full .single_result .single_result_extend').addClass('expand');
    result_expanded_height = {};

    // должно происходит после нумерации результатов на странице

    $('.result_full .single_result .single_result_extend').each(function () {
        var result_num = $(this).parent().attr('data-index');
        result_expanded_height[result_num] = {};
        var i = 0;
        $(this).find('.tab_container >*').each(function () {
            result_expanded_height[result_num][i++] = $(this).innerHeight();

        })
        $(this).removeClass('expand');
    })
}



var tab_control_marker = true;



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





function sendData() {
    jQuery.ajax({
        url: 'ajax.php',
        type: "POST", //метод отправки
        //dataType: "json", //формат данных
        data: cart_content.adapt_data(), // Сеарилизуем объект
        success: function (response) { //Данные отправлены успешно
            /*result = jQuery.parseJSON(response);
            document.getElementById(result_form).innerHTML = "Имя: "+result.name+"<br>Телефон: "+result.phonenumber;*/
            $('.page_cart .products').empty();

            $('.page_cart .total span').html('0');
            var cart_success = new ModalWindow('.page_cart_modal_success');
            cart_success.activateElement();
            cart_success.windowClose('.page_cart_modal_success .close');
            checkCartIsEmpty();
            console.log('success');
        },
        error: function (response) { // Данные не отправлены
            /*document.getElementById(result_form).innerHTML = "Ошибка. Данные не отправленны.";*/
            var cart_error = new ModalWindow('.page_cart_modal_error');
            cart_error.activateElement();
            cart_error.windowClose('.page_cart_modal_error .close, .page_cart_modal_error .back');
            console.log('error');
        }
    });

}



function ModalWindow(modal_selector) {

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
            deactivateElement();
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

    function deactivateElement() {
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
        e.preventDefault();
        e.stopImmediatePropagation();
    }

    function releaseScroll() { //close window
        $('body').off('wheel keydown touchstart touchmove', preventScrolling)
    }
}



function setImageAsBg(selector_image, bg_class) {
    $(selector_image).each(function () {
        var bg = findParent($(this), bg_class);
        bg.css('background-image', 'url(' + $(this).attr('src') + ')')
    })
}


function setLinkFromDataAttr(to__selectors, from__parent_class, from__attr_name) {
    var attr_name = from__attr_name || 'data-product-link';
    $('body').on('click', to__selectors, function () {
        var link = findParent($(this), from__parent_class).attr(attr_name);
        window.open(link)
    })
}
