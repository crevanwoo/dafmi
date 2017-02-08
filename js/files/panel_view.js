$('.sort_az .az_trigger').on('click', function () {
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


})

$('.sort_az_letter').on('click', function (e) {
    e.preventDefault();

    $(this).addClass('active');


})



$('.grid_view .list').on('click', function () {
    toggleGridClasses()
})

$('.grid_view .grid').on('click', function () {
    toggleGridClasses()
})



function toggleGridClasses() {
    var grid_trans_time = 500;
    $('.grid_view .list').toggleClass('active');
    $('.grid_view .grid').toggleClass('active');
    $('.content_products').removeClass('active');
    $('.content_products').toggleClass('grid');
    $('.content_products').toggleClass('list');
    setTimeout(function() {
        $('.content_products').addClass('active');
    }, grid_trans_time )
}


