$(document).ready(function () {
    addCustomSelect('.filters select, .footer_top .lang select')();
    addImagesToLang();
    disableSelects();
    addListenersForSelect(2);


});

//change header view


$(window).on("wheel keydown touchstart touchmove", function () {
    changeHeaderView()

})


//index show result


$('body').on('click', '.content_panel .select_1 .select-options', function () {
    hideBlock('.content_products_wrapper', '.content_panel .views');
    loadContent('.content_products', '../index_result.html .result_grid');
});


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


$('.content_nav .nav_main .type').on('click', function () {
    manageMenuButtons.call(this, '.content_nav .nav_main .type')

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



function addListenersForSelect(i) {console.log(111);
    for (var j = 0; j < i; j++) {
        $('.filters .select:eq(' + j + ') .select-options li').on('click', function () {console.log(j);
            enableSelects(j + 1)
        });
    }
}
