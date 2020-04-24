document.addEventListener('DOMContentLoaded', function() {
    if (window.jQuery) {
        if ($('div.details__bg').data('bg')) {
            let bg = $('div.details__bg').data('bg')
            $('div.details__bg').css({
                background: `linear-gradient(90deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,.8) 35%, rgba(0,212,255,0) 100%),\
                url(${bg}) no-repeat center/cover`,
                height: '550px',
            });
        }

        $('#owl-carousel').owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            mouseDrag: true,
            touchDrag: true,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            },
            loop: false,
            autoplay: false,
            nav: true,
            dots: false,
            smartSpeed: 600,
            lazyLoad: true
        });

        $('#owl-carousel-cast').owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            mouseDrag: true,
            touchDrag: true,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            },
            loop: false,
            autoplay: false,
            nav: true,
            dots: false,
            smartSpeed: 600,
            lazyLoad: true
        });
    }
});