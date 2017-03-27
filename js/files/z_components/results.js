function Results(results_wrapper) {






    this.results_wrapper = results_wrapper;
    this.single_result_selector = this.results_wrapper + ' .single_result';
    this.single_result_extend_trigger_selector = '';
    this.selector_select = this.results_wrapper + ' .result_full_panel .sort_by select';
    this.selector_img_in_single_product = this.single_result_selector + ' .img img';
    this.single_result_extend = this.single_result_selector + ' .single_result_extend';




    var Current = this;


    this.numerateResultsOnPage = function () { //вычислять при загрузке страницы result или переключении на следующую
        var i = 0;
        $(Current.single_result_selector).each(function () {
            $(this).attr('data-index', i++);
        })
    };

    this.numerateTabs = function () { //вычислять при загрузке страницы result или переключении на следующую

        $(Current.single_result_selector).each(function () {
            var i = 0;
            $(this).find('.tab_panel .tab').each(function () {
                $(this).attr('data-tab-num', i++);
            })

        })
    };

    var expanded_height_array;

    var tab_control_marker = true;

    this.resultHasLoaded = function () {
        addCustomSelect(Current.selector_select); // after result has loaded
        setImgAsBg(Current.selector_img_in_single_product); // after result has loaded
        Current.numerateResultsOnPage();
        Current.numerateTabs();
        Current.calcSizesOfTabs();
    };



    this.calcSizesOfTabs = function () {
        //вычислять при загрузке страницы result или переключении на следующую
        $(Current.single_result_extend).addClass('expand');
        expanded_height_array = {};


        // должно происходит после нумерации результатов на странице

        $(Current.single_result_extend).each(function () {
            var result_num = $(this).parent().attr('data-index');
            expanded_height_array[result_num] = {};
            var i = 0;
            $(this).find('.tab_container >*').each(function () {
                expanded_height_array[result_num][i++] = $(this).innerHeight();

            });

            $(this).removeClass('expand');

        });

    };


    function showTabContent() {
        tab_control_marker = false;
        var tab_num = +$(this).attr('class').slice(-1) - 1;
        $(this).addClass('show');
        var obj = $(this);
        var single_result = obj.parent().parent().parent().attr('data-index');
        var tab_panel_height = +obj.parent().parent().parent().find('.tab_panel').innerHeight();
        setTimeout(function () {
            obj.parent().parent().css('height', +expanded_height_array[single_result][tab_num] + tab_panel_height);
            obj.css("opacity", 1)
            tab_control_marker = true;
        }, 100)
    };


    function hideTabContent() {
        var obj = $(this).parent().parent().find('.show');
        obj.removeClass('show');
        setTimeout(function () {
            obj.css("opacity", 0);
        }, 100)
    };



    function toggleExpandResultsView() {

        var single_result = findParent($(this), 'single_result');
        if ($(this).hasClass('active')) {
            var obj = $(this);
            if (tab_control_marker) {
                tab_control_marker = false;
                //single_result.find('.single_result_extend').removeClass('expand');
                single_result.find('.single_result_extend').css('height', 0);
                setTimeout(
                    function () {
                        obj.removeClass('active');
                        single_result.find('.tab_panel .show').css('opacity', '0');
                        single_result.find('.tab_panel .show').removeClass('show');
                        single_result.find('.single_result_extend .tab_panel .tab').removeClass('active');
                        tab_control_marker = true;
                    }, 500);
            }

        } else {
            $(this).addClass('active');
            var tab_panel_height = +single_result.find('.tab_panel').innerHeight();
            if (tab_control_marker) {
                tab_control_marker = false;
                single_result.find('.single_result_extend').css('height', +expanded_height_array[single_result.attr('data-index')][0] + tab_panel_height);
                single_result.find('.single_result_extend .tab_panel .tab:eq(0)').addClass('active');
                showTabContent.call(single_result.find('.tab_1'));
                tab_control_marker = true;
            }
        }
    };


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
    };


    function returnTabMenuToDefault() {
        $(Current.single_result_selector + ' .tab_2').find('.main_title').removeClass('active');
        $(Current.single_result_selector + ' .tab_2').find('.single_model_title').removeClass('active');
        $(Current.single_result_selector + ' .tab_2').find('.single_model').css('height', '0');
        $(Current.single_result_selector + ' .tab_2').parent().find('.model_content').css('height', '0');

    };




    var modal_preview = new ModalWindow('.modal_preview');
    modal_preview.windowOpen(Current.single_result_selector + ' .img.modal_trigger,' + Current.single_result_selector + ' .tab_4 img');
    modal_preview.windowClose('.modal_preview .close');


    managePreview();

    $(window).on('resize', function () {

        managePreview()

    })

    function managePreview() {

        if (window.innerWidth <= 850) {
            $(Current.single_result_selector + ' .img').each(function () {
                $(this).removeClass('modal_trigger');

            })

        } else {
            $(Current.single_result_selector + ' .img').each(function () {
                $(this).addClass('modal_trigger');

            })
        }

    }


    $('body').on('click', Current.single_result_selector + ' .show_more', function () {
        toggleExpandResultsView.call(this);
    });

    $('body').on('click', Current.single_result_selector + ' .tab_panel .tab', function () {
        switchResultTabs.call(this);
    });


    $('body').on('click', Current.single_result_selector + ' .img', function () {

        var src = $(this).find('img').attr('src');
        $('.modal_preview img').attr('src', src);

    });

    $('body').on('click', Current.single_result_selector + ' .tab_4 img', function () {

        var src = $(this).attr('src');
        $('.modal_preview img').attr('src', src);

    });

    if (window.innerWidth > 850) {
        setLinkFromDataAttr( //Current.single_result_selector + ' .img,' +
            Current.single_result_selector + ' .top_row .vendor,' + Current.single_result_selector + ' .top_row .mid_h', 'single_result');
    }

}
