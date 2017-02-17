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
