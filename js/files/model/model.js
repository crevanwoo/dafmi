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
