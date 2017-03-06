
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
$(document).ready( function() { 
	setImgAsBg('.single_article .img img')

news.length = 700;

news.addExpandTextToArray();

$('body').on('click touchstart', '.single_article .show_more', function () {
	news.expandText(this);
})



})