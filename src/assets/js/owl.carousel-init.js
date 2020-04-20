document.addEventListener('DOMContentLoaded', function() {
    if (window.jQuery) {
        if ($('div.details__bg').data('bg')) {
            let bg = $('div.details__bg').data('bg')
            $('div.details__bg').css({
                background: `url(${bg}) no-repeat center/cover`,
                height: '550px'
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
            autoplay: true,
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
            autoplay: true,
            nav: true,
            dots: false,
            smartSpeed: 600,
            lazyLoad: true
        });
    }
});