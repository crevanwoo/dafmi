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
        type: "POST", //метод отправки
        //dataType: "json", //формат данных
        data: data, // Сеарилизуем объект
        success: function (response) { //Данные отправлены успешно
            /*result = jQuery.parseJSON(response);
            document.getElementById(result_form).innerHTML = "Имя: "+result.name+"<br>Телефон: "+result.phonenumber;*/
            f_onsuccess();
            console.log(data);
            console.log('success');
        },
        error: function (response) { // Данные не отправлены
            /*document.getElementById(result_form).innerHTML = "Ошибка. Данные не отправленны.";*/
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
        type: "POST", //метод отправки
        //dataType: "json", //формат данных
        data: value, // Сеарилизуем объект
        success: function (response) { //Данные отправлены успешно
            /*result = jQuery.parseJSON(response);
            document.getElementById(result_form).innerHTML = "Имя: "+result.name+"<br>Телефон: "+result.phonenumber;*/
            response = ['1', '2', '3'];
            select_obj.fillImportedList(response);
            select_obj.createOptionList();


        },
        error: function (response) { // Данные не отправлены
            /*document.getElementById(result_form).innerHTML = "Ошибка. Данные не отправленны.";*/
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
   
        
    $(selector).find('input').each(function() {
        var key = $(this).attr('data-key');
        var value = encodeURI($(this).val());
        Data[key] = value;
        
    });
    $(selector).find('textarea').each(function() {
        var key = $(this).attr('data-key');
        var value = encodeURI($(this).val());
        Data[key] = value;
        
    });
    $(selector).find('.select').each(function() { 
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

//Register_Data['modal_window_name', 'thisData']
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




function setErrorMessage(marker) {
		
		if (!marker && $('.modal_registration_2_1 .invalid').length < 1) {
			$('<li><span class="invalid">Вы должны заполнить все поля</span></li>').insertBefore($('.modal_registration_2_1 .next'));
		} else if (marker) {
			$('.modal_registration_2_1 .invalid').parent().remove();
		}
		
	}

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



var modal_reg_1_sel_1 = new Selection();
modal_reg_1_sel_1.addValuesToList('.content_products .product .title');
modal_reg_1_sel_1.createSelection('.modal_reg_1_sel_0');
modal_reg_1_sel_1.state(true);

var modal_reg_1_sel_2 = new Selection();
modal_reg_1_sel_2.createSelection('.modal_reg_1_sel_1');

var modal_reg_1_sel_3 = new Selection();
modal_reg_1_sel_3.createSelection('.modal_reg_1_sel_2');

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
modal_authorization.windowOpen('.header_top .status');
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

$('body').on('click', '.modal_authorization .register', function () {
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

    news.length = 700;

    news.addExpandTextToArray();

    $('body').on('click touchstart', '.single_article .show_more', function () {
        news.expandText(this);
    })



});

// Profile

setLinkFromDataAttr('.profile_tab_content.orders .order_element', 'order_element', 'data-single-order-link');



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
/*! jQuery Validation Plugin - v1.15.0 - 2/24/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){if(this.length){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){var c=a(b).val();return null!==c&&!!a.trim(""+c)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||-1!==a.inArray(c.keyCode,d)||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=h&&g.check(e)))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)a[b]&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0]),d in c||!b.objectLength(a(this).rules())?!1:(c[d]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type;return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=b.hasAttribute("contenteditable")?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);if("function"==typeof f.normalizer){if(i=f.normalizer.call(b,i),"string"!=typeof i)throw new TypeError("The normalizer should return a string value.");delete f.normalizer}for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j instanceof TypeError&&(j.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(d,e){b[d]=a.isFunction(e)&&"normalizer"!==d?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e=a(c).attr("type"),f="Step attribute on input type "+e+" is not supported.",g=["text","number","range"],h=new RegExp("\\b"+e+"\\b"),i=e&&!h.test(g.join());if(i)throw new Error(f);return this.optional(c)||b%d===0},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})});
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
				$(this).append('<div class="show_more">... <span>Показать больше</span></div>')
			}
		})
	},
	expandText: function(Current) {
		$(Current).parent().append(this.articles_text[$(Current).parent().attr('article-index')]);
		$(Current).parent().find('.show_more').remove();
	
	}
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
			if (f_invalid) {console.log('error');
				f_invalid()
			}
		},
		submitHandler: function () {
			if (f_name) {console.log('success');
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
			}

		},
		errorClass: "invalid",
		validClass: "success",
		errorLabelContainer: ".error_message",
		wrapper: "li",
		errorElement: "span",

	})
}

