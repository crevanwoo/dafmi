$(document).ready(function () {
    addCustomSelect('.footer_top .lang select')();
    addImagesToLang();




});


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
        loadContent('.content_products_wrapper', '../index_cars_type.html ' + car_type, setSelection.bind(null, Select_1));
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

function Selection() {
    this.state = function (state) {
        if (!state) {
            this.styledSelect.addClass('disabled')
        } else {
            this.styledSelect.removeClass('disabled')
        }
    };
 
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


var Select_1 = new Selection();

var Select_2 = new Selection();

var Select_3 = new Selection();

//Select_1.createSelection(selector)

//selection 1
createProductsList();
Select_1.imported_list = content_products;

Select_1.createSelection('.select_1');
Select_1.state(true);




Select_2.createSelection('.select_2');

Select_3.createSelection('.select_3');

//selection 2
addDataIndexForProduct();

$('body').on('click', '.content_products .product', function () {
    var index = $(this).attr('data-index');
    Select_1.listClicked(content_products[index], content_products[index], $('.select_1'));
})




$('body').on('click', '.filters .select:eq(0) .select-options li, .content_products .product', function () {
   // enableSelects.call(null, 1);
    hideBlock('.content_products_wrapper >div', '.content_panel .views');
    loadContent('.content_products_wrapper', '../index_result.html .result_grid', showModelResults);
    Select_2.state(true);
    setSelection(Select_2);
})

/*

 $('.filters .select:eq(1) .select-options li').on('click', function () {
     enableSelects.call(null, 2);
     hideBlock('.content_products_wrapper', '.content_panel .result_grid');
     loadContent('.content_products', '../index_result.html .result_list');
 })*/


//index result









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

//change select view



function addCustomSelect(selector) {

    return function () {

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
}




//change header view

function changeHeaderView() {
    if (window.pageYOffset > 50 && !$('.header_bottom').hasClass('min')) {
        $('.header_bottom').delay(300).addClass('min');
    } else if (window.pageYOffset <= 50) {
        $('.header_bottom').delay(300).removeClass('min');
    }

}


var content_panel_h = $('.content_products').height();
$('.content_products').css('min-height', content_panel_h + 'px' )

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





function changeAlphabetSort(e) {
    e.preventDefault();
    $(this).addClass('active');
}

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

function changeInputView() {
    if ($(this).hasClass('filled') && $(this).val() === '' || $(this).val() == !/\S/) {
        $(this).removeClass('filled');

    } else if (!$(this).hasClass('filled')) {
        $(this).addClass('filled');
    }
}

function manageMenuButtons(selector) {
    $(selector).removeClass('active');
    $(this).addClass('active');
}






var addImagesToLang = function () {
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
}

function showModelResults() {console.log($('.result_grid .single_result'));
    $('.result_grid .single_result').each(function () {
        if ($(this).find('.model_choosing .model').length < 2 ) {
            $(this).find('.title').text($(this).find('.model_choosing .model').text())
            
        }
        
    })
    
    
}



/*function disableSelects() {
  $('.content_panel .filters .select:gt(0) .select-styled').addClass('disabled');  
}

function enableSelects(index){
  $('.filters .select:eq(' + index + ') .select-styled').removeClass('disabled')    
}*/

