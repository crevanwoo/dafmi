function loadContent(t,e,s){s?$(t).load(e,s):$(t).load(e)}function findParent(t,e){for(;!t.hasClass(e);)t=t.parent();return t}function addCarsTypeToList(){var t=1;$(".content_nav .nav_main .type").each(function(){$(".content_nav .nav_main .type:eq("+(t-1)+")").attr("data-car-type",t),t++})}function numerateResultsOnPage(){var t=0;$(".result_full .single_result").each(function(){$(this).attr("data-index",t++)})}function numerateTabs(){$(".single_result").each(function(){var t=0;$(this).find(".tab_panel .tab").each(function(){$(this).attr("data-tab-num",t++)})})}function resultHasLoaded(){addCustomSelect(".result_full .result_full_panel .sort_by select")(),setImgAsBg(".result_full .single_result .img img"),numerateResultsOnPage(),numerateTabs(),calcSizesOfTabs()}function calcSizesOfTabs(){$(".result_full .single_result .single_result_extend").addClass("expand"),result_expanded_height={},$(".result_full .single_result .single_result_extend").each(function(){var t=$(this).parent().attr("data-index");result_expanded_height[t]={};var e=0;$(this).find(".tab_container >*").each(function(){result_expanded_height[t][e++]=$(this).innerHeight()}),$(this).removeClass("expand")})}function setSelection(t,e,s){t.addDataIndexForDOMElemens(s),t.reset(),t.addValuesToList(e),t.createOptionList(),t==Select_1?($(".content_products").addClass("grid"),Select_2.state(!1),Select_2.reset(),Select_3.state(!1),Select_3.reset()):t==Select_2&&($(".content_products").addClass("grid"),Select_3.state(!1),Select_3.reset())}function Selection(){this.addDataIndexForDOMElemens=function(t){var e=0;$(t).each(function(){$(this).attr("data-index",e),e++})},this.state=function(t){t?this.styledSelect.removeClass("disabled"):this.styledSelect.addClass("disabled")},this.addValuesToList=function(t){this.imported_list=[];var e=this;$(t).each(function(){e.imported_list.push($(this).text())})},this.imported_list=[],this.reset=function(){this.styledSelect.html(this.selector.children("option").eq(0).html()),this.list.empty(),this.styledSelect.removeClass("changed")},this.createOptionList=function(){""!=this.imported_list?imported_list=this.imported_list:imported_list=this.selector.children("option");for(var t=0;t<imported_list.length;t++)$("<li />",{text:imported_list[t],rel:imported_list[t]}).appendTo(this.list);this.listItems=this.list.children("li");var e=this;this.listItems.on("click",function(t){e.fieldValue=$(this).html(),e.fieldRel=$(this).attr("rel"),e.listClicked(e.fieldValue,e.fieldRel,e.selector),e.list.hide()})},this.listClicked=function(t,e,s){this.styledSelect.addClass("changed"),this.styledSelect.html(t).removeClass("active"),s.val(e)},this.createSelection=function(t){this.selector=$(t);var e;e=""!=this.imported_list?this.imported_list:this.selector.children("option");e.length;this.selector.addClass("select-hidden"),this.selector.wrap('<div class="select"></div>'),this.selector.after('<div class="select-styled"></div>'),this.styledSelect=this.selector.next("div.select-styled"),this.list=$('<ul class="select-options" />'),this.list.insertAfter(this.styledSelect),this.reset(),this.createOptionList(),this.state(!1),this.styledSelect.on("click",function(t){t.stopPropagation(),$(this).hasClass("disabled")||($("div.select-styled.active").not(this).each(function(){$(this).removeClass("active").next("ul.select-options").hide()}),$(this).toggleClass("active").next("ul.select-options").toggle())});var s=this;$(document).on("click",function(){s.styledSelect.removeClass("active"),s.list.hide()})}}function returnTabMenuToDefault(){$(".result_full .single_result .tab_2").find(".main_title").removeClass("active"),$(".result_full .single_result .tab_2").find(".single_model_title").removeClass("active"),$(".result_full .single_result .tab_2").find(".single_model").css("height","0"),$(".result_full .single_result .tab_2").parent().find(".model_content").css("height","0")}function hideBlock(t){for(var e=0;e<arguments.length;e++)$(arguments[e]).css("display","none")}function showBlock(t){for(var e=0;e<arguments.length;e++)$(arguments[e]).css("display","block")}function toggleClassOfFewElem(t){for(var e=0;e<arguments.length;e++)$(arguments[e]).toggleClass("active")}function setImgAsBg(t){var e=$(t).attr("src");$(t).parent().css("background-image","url("+e+")"),hideBlock(t)}function smoothShow(t,e){function s(){$(this).find(t).addClass("active")}$(this).find(t).css("display",e);var n=this;setTimeout(s.bind(n,t),100)}function manageMenuButtons(t){$(t).removeClass("active"),$(this).addClass("active")}function addCustomSelect(t){return function(){$(t).each(function(){var t=$(this),e=$(this).children("option").length;t.addClass("select-hidden"),t.wrap('<div class="select"></div>'),t.after('<div class="select-styled"></div>');var s=t.next("div.select-styled");s.html(t.children("option").eq(0).html());for(var n=$("<ul />",{class:"select-options"}).insertAfter(s),i=0;i<e;i++)$("<li />",{text:t.children("option").eq(i).text(),rel:t.children("option").eq(i).val()}).appendTo(n);var l=n.children("li");s.on("click",function(t){$(this).hasClass("disabled")||(t.stopPropagation(),$("div.select-styled.active").not(this).each(function(){$(this).removeClass("active").next("ul.select-options").hide()}),$(this).toggleClass("active").next("ul.select-options").toggle())}),l.on("click",function(e){e.stopPropagation(),s.addClass("changed"),s.html($(this).html()).removeClass("active"),t.val($(this).attr("rel")),n.hide()}),$(document).on("click",function(){s.removeClass("active"),n.hide()})})}}function changeHeaderView(){window.pageYOffset>50&&!$(".header_bottom").hasClass("min")?$(".header_bottom").delay(300).addClass("min"):window.pageYOffset<=50&&$(".header_bottom").delay(300).removeClass("min")}function toggleGridClasses(){$(".content_products").css("height",2*content_panel_h+"px");var t=500;$(".grid_view .list").toggleClass("active"),$(".grid_view .grid").toggleClass("active"),$(".content_products").removeClass("active"),$(".content_products").toggleClass("grid"),$(".content_products").toggleClass("list"),setTimeout(function(){$(".content_products").addClass("active"),$(".content_products").css("height","auto")},t)}function changeAlphabetSort(t){t.preventDefault(),$(this).addClass("active")}function showAlphabetSort(){$(this).toggleClass("active");var t=$(this).parent().find("ul");t.css("display","block"),setTimeout(function(){t.toggleClass("active")},100),setTimeout(function(){t.hasClass("active")||t.css("display","none")},300)}function changeInputView(){$(this).hasClass("filled")&&""===$(this).val()||0==$(this).val()?$(this).removeClass("filled"):$(this).hasClass("filled")||$(this).addClass("filled")}function showModelResults(){$(".result_grid .single_result").each(function(){$(this).find(".model_choosing .model").length<2&&$(this).find(".title").text($(this).find(".model_choosing .model").text())}),setSelection(Select_2,".result_grid .single_result .model",".content_products .result_grid .model_choosing .model"),Select_2.state(!0)}function actionForModelChoosing(){function t(){setSelection(Select_3,'.result_list .result_list_row [data-value="motor"]','.result_list .result_list_row [data-value="motor"]'),Select_3.state(!0)}$(".content_products").removeClass("grid"),hideBlock(".content_products_wrapper >div"),loadContent(".content_products_wrapper","../index_result.html .result_list",t)}function showTabContent(){tab_control_marker=!1;var t=+$(this).attr("class").slice(-1)-1;$(this).addClass("show");var e=$(this),s=e.parent().parent().parent().attr("data-index"),n=+e.parent().parent().parent().find(".tab_panel").innerHeight();setTimeout(function(){e.parent().parent().animate({height:+result_expanded_height[s][t]+n}),e.animate({opacity:1}),tab_control_marker=!0},100)}function hideTabContent(){var t=$(this).parent().parent().find(".show");t.removeClass("show"),setTimeout(function(){t.animate({opacity:0})},100)}var result_expanded_height,tab_control_marker=!0;addCustomSelect(".footer_top .lang select")(),$(window).on("wheel keydown touchstart touchmove",function(){changeHeaderView()}),$(".grid_view .list").on("click",function(){toggleGridClasses()}),$(".grid_view .grid").on("click",function(){toggleGridClasses()}),$(".sort_az_letter").on("click",function(t){changeAlphabetSort.call(this,t)}),$(".sort_az .az_trigger").on("click",function(){showAlphabetSort.call(this)}),$("body").on("input","input",function(){changeInputView.call(this)}),$("body").on("click",".expand_search .bottom_panel .bttn_panel .bttn",function(){manageMenuButtons.call(this,".expand_search .bottom_panel .bttn_panel .bttn")}),$("body").on("click",".expand_search .top_panel .bttn",function(){manageMenuButtons.call(this,".expand_search .top_panel .bttn")}),$("body").on("click",".expand_search .expand",function(){toggleClassOfFewElem(".expand_search .top_panel .expand",".expand_search .top_panel .line_2")}),addCarsTypeToList(),$(".content_nav .nav_main .type").on("click",function(){function t(){Select_1.reset(),Select_2.reset(),Select_3.reset()}manageMenuButtons.call(this,".content_nav .nav_main .type"),hideBlock($(".content_products .content_products_wrapper >div"));var e=".cars_type_"+$(this).attr("data-car-type"),s=$(e);!$(".content_products_wrapper").find(e).length>0?$(this).attr("data-car-type")<4?($(".content_panel").css("display","block"),$(".content_products").addClass("grid"),loadContent(".content_products_wrapper","../index_cars_type.html "+e,setSelection.bind(null,Select_1,".content_products .product .title",".content_products .product"))):($(".content_products").removeClass("grid"),$(".content_panel").css("display","none"),loadContent(".content_products_wrapper","../index_result_full.html .result_full",resultHasLoaded),t()):showBlock(s)}),$(".tab_2").on("click",function(){$(".expand_search").length<1&&(loadContent(".nav_top_expand","../index_variants.html .expand_search:eq(0)",addCustomSelect.bind(null,".expand_search .top_panel .param select")),loadContent(".nav_expand","../index_variants.html .expand_search:eq(1)",addCustomSelect.bind(null,".expand_search .bottom_panel .param select"))),$(this).hasClass("active")?(hideBlock(".expand_search"),showBlock(".main_list")):(hideBlock(".main_list"),showBlock(".expand_search")),toggleClassOfFewElem.call(null,this)});var Select_1=new Selection,Select_2=new Selection,Select_3=new Selection;Select_1.addDataIndexForDOMElemens(".content_products .product"),Select_1.addValuesToList(".content_products .product .title"),Select_1.createSelection(".select_1"),Select_1.state(!0),Select_2.createSelection(".select_2"),Select_3.createSelection(".select_3"),$("body").on("click",".content_products .product",function(){var t=$(this).attr("data-index");Select_1.listClicked(Select_1.imported_list[t],Select_1.imported_list[t],$(".select_1"))}),$("body").on("click",".filters .select:eq(0) .select-options li, .content_products .product",function(){hideBlock(".content_products_wrapper >div",".content_panel .views"),loadContent(".content_products_wrapper","../index_result.html .result_grid",showModelResults)}),$("body").on("click",".filters .select:eq(1) .select-options li, .result_grid .single_result",function(){return $(this).find(".model").length>1?void smoothShow.call(this,".model_choosing","table"):void actionForModelChoosing()}),$("body").on("click",".filters .select:eq(2) .select-options li, .result_list .result_list_row",function(){$(".content_products").removeClass("grid"),hideBlock(".content_products_wrapper >div",".content_panel .views"),loadContent(".content_products_wrapper","../index_result_full.html .result_full",resultHasLoaded);var t=$(this).find('[data-value="motor"]').attr("data-index");Select_3.listClicked(Select_3.imported_list[t],Select_3.imported_list[t],$(".select_3"))}),$("body").on("click",".result_grid .model_choosing .model",function(){var t=$(this).attr("data-index");Select_2.listClicked(Select_2.imported_list[t],Select_2.imported_list[t],$(".select_2")),actionForModelChoosing()}),$("body").on("click",".result_full .single_result .show_more",function(){var t=findParent($(this),"single_result");if($(this).hasClass("active")){var e=$(this);t.find(".single_result_extend").animate({height:0},function(){e.removeClass("active")}),t.find(".tab_panel .show").animate({opacity:0},function(){t.find(".tab_panel .show").removeClass("show")})}else{$(this).addClass("active");var s=+t.find(".tab_panel").innerHeight();t.find(".single_result_extend").animate({height:+result_expanded_height[t.attr("data-index")][0]+s}),t.find(".single_result_extend .tab_panel .tab:eq(0)").addClass("active"),showTabContent.call(t.find(".tab_1"))}}),$("body").on("click",".result_full .single_result .tab_panel .tab",function(){if(!$(this).hasClass("active")&&tab_control_marker){$(this).parent().find(".active").removeClass("active"),$(this).addClass("active");var t=".tab_"+(+$(this).attr("data-tab-num")+1),e=findParent($(this),"single_result_extend").find(t);hideTabContent.call(this),showTabContent.call(e),returnTabMenuToDefault()}}),$("body").on("click",".result_full .single_result .tab_2 .main_title",function(){var t=findParent($(this),"single_result_extend");t.parent();$(this).hasClass("active")?($(this).removeClass("active"),$(this).parent().find(".single_model").css("height","0")):($(this).addClass("active"),$(this).parent().css("height","auto"),$(this).parent().find(".single_model").css("height","50px"),$(this).parent().find(".model_content").css("height","0"),t.css("height","auto"))}),$("body").on("click",".result_full .single_result .tab_2 .single_model_title",function(){var t=$(this).parent().parent().parent().parent().parent().parent();t.parent();$(this).hasClass("active")?($(this).removeClass("active"),$(this).parent().css("height","50px"),$(this).parent().find(".model_content").css("height","0")):($(this).addClass("active"),$(this).parent().css("height","auto"),$(this).parent().find(".model_content").css("height","auto"))});var content_panel_h=$(".content_products").height();$(".content_products").css("min-height",content_panel_h+"px");