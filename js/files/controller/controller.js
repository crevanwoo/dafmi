/* autor Kobenko Anastasia 
email stasya.job@outlook.com
git https://github.com/crevanwoo
*/

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

/*setLinkFromDataAttr('.profile_tab_content.orders .order_element', 'order_element', 'data-single-order-link');*/

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

$('.link_full_ver').on('click', function(e) {
    e.preventDefault();      
});
