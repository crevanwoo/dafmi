function addImage(t,e){$(t).append('<img class="icon"/>');var s=$(t).find("img"),a=""+lang_icons_arr[e];s.attr("src",a)}function toggleGridClasses(){$(".content_products").css("height",2*content_panel_h+"px");var t=500;$(".grid_view .list").toggleClass("active"),$(".grid_view .grid").toggleClass("active"),$(".content_products").removeClass("active"),$(".content_products").toggleClass("grid"),$(".content_products").toggleClass("list"),setTimeout(function(){$(".content_products").addClass("active"),$(".content_products").css("height","auto")},t)}var lang_icons_arr=[];$(".footer_top .lang option").each(function(){lang_icons_arr.push($(this).attr("data-image"))});var addImagesToLang=function(){addImage(".footer_top .lang .select-styled",0);var t=0;$(".footer_top .lang .select-options li").each(function(){addImage(this,t),t++})};$(window).on("wheel keydown touchstart touchmove",function(){window.pageYOffset>50&&!$(".header_bottom").hasClass("min")?$(".header_bottom").addClass("min"):window.pageYOffset<=50&&$(".header_bottom").removeClass("min")}),$(".content_nav .nav_main .type").on("click",function(){$(".content_nav .nav_main .type").removeClass("active"),$(this).addClass("active")}),$(".tab_2").on("click",function(){$(this).toggleClass("active"),$(".nav_top_expand").load("../expand_search.html")}),$(".sort_az .az_trigger").on("click",function(){$(this).toggleClass("active");var t=$(this).parent().find("ul");t.css("display","block"),setTimeout(function(){t.toggleClass("active")},100),setTimeout(function(){t.hasClass("active")||t.css("display","none")},300)}),$(".sort_az_letter").on("click",function(t){t.preventDefault(),$(this).addClass("active")}),$(".grid_view .list").on("click",function(){toggleGridClasses()}),$(".grid_view .grid").on("click",function(){toggleGridClasses()});var content_panel_h=$(".content_products").height();$(".filters select, .footer_top .lang select").each(function(){var t=$(this),e=$(this).children("option").length;t.addClass("select-hidden"),t.wrap('<div class="select"></div>'),t.after('<div class="select-styled"></div>');var s=t.next("div.select-styled");s.html(t.children("option").eq(0).html());for(var a=$("<ul />",{class:"select-options"}).insertAfter(s),i=0;i<e;i++)$("<li />",{text:t.children("option").eq(i).text(),rel:t.children("option").eq(i).val()}).appendTo(a);var n=a.children("li");s.click(function(t){t.stopPropagation(),$("div.select-styled.active").not(this).each(function(){$(this).removeClass("active").next("ul.select-options").hide()}),$(this).toggleClass("active").next("ul.select-options").toggle()}),n.click(function(e){e.stopPropagation(),s.addClass("changed"),s.html($(this).html()).removeClass("active"),t.val($(this).attr("rel")),a.hide()}),$(document).click(function(){s.removeClass("active"),a.hide()})}),addImagesToLang();