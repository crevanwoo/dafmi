$('.content_nav .nav_main .type').on('click', function () {
    $('.content_nav .nav_main .type').removeClass('active');
    $(this).addClass('active');
})

$('.tab_2').on('click', function () {
    $(this).toggleClass('active');   
    $('.nav_top_expand').load('../index_variants.html .expand_search')
    
    
    
    
})
