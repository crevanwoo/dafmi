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