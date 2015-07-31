$('document').ready(function() {
    var rolledProject = false;
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 500, 'swing', function () {
            window.location.hash = target;
        });
    });


    $('.project-selector').click(function(e) {
        /*
        $('.gallery_frame').slideToggle(400, function() {
        });
*/
    });



});