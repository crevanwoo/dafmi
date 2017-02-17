/* --- ---- --- --- --- --- Decorative > --- ---- --- --- --- --- */
addCustomSelect('.footer_top .lang select')();
// addImagesToLang();



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
