function loadContent(to, from, callback) {
    $(to).load(from, callback())
}


//for footer lang select
var lang_icons_arr = []; 

$('.footer_top .lang option').each(
    function () {
        lang_icons_arr.push($(this).attr('data-image'));
    });
