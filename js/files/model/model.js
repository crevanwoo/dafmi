function loadContent(to, from, callback) {
    if (callback) {
        $(to).load(from, callback)
    } else {
        $(to).load(from)
    }
}


//for footer lang select
var lang_icons_arr = [];

$('.footer_top .lang option').each(
    function () {
        lang_icons_arr.push($(this).attr('data-image'));
    });


var content_products;

function createProductsList() {
    content_products = [];
    $('.content_products').find('.product .title').each(
        function () {
            content_products.push($(this).text());
        }
    )

}


function addDataIndexForProduct() {
    var i = 0;
    $('.content_products .product').each(function () {
        $(this).attr('data-index', i);
        i++
    })
}



function addCarsTypeToList() {
    var i = 1;
    $('.content_nav .nav_main .type').each(function () {
        $('.content_nav .nav_main .type:eq(' + (i - 1) + ')').attr('data-car-type', i);
        i++
    })
}


function setSelection(obj) {
    addDataIndexForProduct();
    obj.reset();
    createProductsList();
    obj.imported_list = content_products;
    obj.createOptionList();
    if (obj == Select_1) {
        Select_2.state(false);        
        Select_2.reset(); 
    }
}


