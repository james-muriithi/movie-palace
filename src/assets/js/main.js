window.load_video = (id, season = '', episode = '') => {
    api='d3670532ab1cd85d042cbe4f922f726b';
    url = 'https://www.vidstreamapi.com/stream_src.php';
    request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send("api="+api+"&id="+id+"&season="+season+"&episode="+episode);
    request.onreadystatechange = function () {
        if (request.status === 200){
            stream_link=request.response;
            document.getElementById('stream_frame').setAttribute('src', stream_link);
        }
        else{
            document.getElementById('stream-div').classList.add('d-none')
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.jQuery) {
        "use strict"; // start of use strict

        /*==============================
        Menu
        ==============================*/
        // document.addEventListener('touchstart', onTouchStart, { passive: true });
        $('.header__btn').on('click', function() {
            $(this).toggleClass('header__btn--active');
            $('.header__nav').toggleClass('header__nav--active');
            $('.body').toggleClass('body--active');

            if ($('.header__search-btn').hasClass('active')) {
                $('.header__search-btn').toggleClass('active');
                $('.header__search').toggleClass('header__search--active');
            }
        });

        const isFavorited = (data) => {
            let stroredFavourites = localStorage.getItem('favourites')
            if (stroredFavourites) {
                stroredFavourites = JSON.parse(stroredFavourites)
                return stroredFavourites.find(item => item.id === data.id)
            }
            return false;
        }

        if ($('svg#heart-svg').length == 1) {
            let d = $('svg#heart-svg').parent().parent().data('json');
            if (isFavorited(d)) {
                $('svg#heart-svg').parent().parent().find('input').prop('checked', true)
            }
        }

        const addFavorite = (data) => {
            let stroredFavourites = localStorage.getItem('favourites')
            if (stroredFavourites) {
                stroredFavourites = JSON.parse(stroredFavourites)
                if (isFavorited(data)) {
                    removeFavourite(data)
                    return 'already a favourite';
                } else {
                    localStorage.setItem('favourites', JSON.stringify([...stroredFavourites, data]));
                    return
                }
            } else {
                localStorage.setItem('favourites', JSON.stringify([data]));
                return
            }
        }

        const removeFavourite = (data) => {
            const storedFavorites = JSON.parse(localStorage.getItem("favourites"));

            const filteredFavorites = storedFavorites.filter(
                (i) => i.id !== data.id
            );

            localStorage.setItem("favourites", JSON.stringify(filteredFavorites));

            // $('svg#heart-svg').parent().parent().find('input').prop('checked', false)

        }


        // favourite btn
        $('svg#heart-svg').on('click', function() {
            try {
                const data = $(this).parent().parent().data('json')
                addFavorite(data);

            } catch (error) {
                console.log(error);
            }
        })

        /*==============================
        Search
        ==============================*/
        $('.header__search-btn').on('click', function() {
            $(this).toggleClass('active');
            $('.header__search').toggleClass('header__search--active');
            $('section.home #myTabContent .row').toggleClass('p-t-50')
            $('input[name="query"]').focus()

            if ($('.header__btn').hasClass('header__btn--active')) {
                $('.header__btn').toggleClass('header__btn--active');
                $('.header__nav').toggleClass('header__nav--active');
                $('.body').toggleClass('body--active');
            }
        });


        let option = {
            url: function(phrase) { //url of the remote php db file
                return '/suggestions/' + phrase;
            },
            requestDelay: 500,

            getValue: function(element) { //fetch the value of name key from the returned json
                if (element) {
                    if (element.media_type == 'tv') {
                        return element.name;
                    } else {
                        return element.title;
                    }
                }
                return;
                // try {
                //     return element.title;
                // } catch (error) {
                //     return element.name;
                // }

            },

            template: {
                type: "custom",
                method: function(value, item) {
                    if (item.poster_path) {
                        return `<img src='https://image.tmdb.org/t/p/w45/${item.poster_path}' class="img-thumbnail" /> ${value} - ${item.overview.substr(0,50)}...`;
                    }
                    return `${value} - ${item.overview.substr(0,50)}...`
                }
            },

            list: {
                maxNumberOfElements: 5,
                match: {
                    enabled: true
                },
                onChooseEvent: function() {
                    $('input[name="query"]').submit();
                }
            },

            theme: "dark"
        };

        $('input[name="query"]').easyAutocomplete(option);




        /*==============================
        Home
        ==============================*/

        $('.home__nav--next').on('click', function() {
            $('.home__carousel, .home__bg').trigger('next.owl.carousel');
        });
        $('.home__nav--prev').on('click', function() {
            $('.home__carousel, .home__bg').trigger('prev.owl.carousel');
        });

        $(window).on('resize', function() {
            var itemHeight = $('.home__bg').height();
            $('.home__bg .item').css("height", itemHeight + "px");
        });
        $(window).trigger('resize');

        /*==============================
        Tabs
        ==============================*/
        $('.content__mobile-tabs-menu li').each(function() {
            $(this).attr('data-value', $(this).text().toLowerCase());
        });

        $('.content__mobile-tabs-menu li').on('click', function() {
            var text = $(this).text();
            var item = $(this);
            var id = item.closest('.content__mobile-tabs').attr('id');
            $('#' + id).find('.content__mobile-tabs-btn input').val(text);
        });


        /*==============================
        Filter
        ==============================*/
        $('.filter__item-menu li').each(function() {
            $(this).attr('data-value', $(this).text().toLowerCase());
        });

        $('.filter__item-menu li').on('click', function() {
            var text = $(this).text();
            var item = $(this);
            var id = item.closest('.filter__item').attr('id');
            $('#' + id).find('.filter__item-btn input').val(text);
        });


        /*
        /url pathnames
        */
        let pathname = window.location.pathname,
            header = $('ul.header__nav')
        if (pathname === '/') {
            header.children().each(function(menu) { $(this).removeClass('active').find('*').removeClass('active') })
            header.find('li:nth-child(1)').addClass('active')
        } else if (pathname.includes('/search/')) {
            header.children().each(function(menu) { $(this).removeClass('active').find('*').removeClass('active') })
            $('.header__search-btn').trigger('click')

            const parsedUrl = new URL(window.location)
            let query = parsedUrl.searchParams.get('q') || parsedUrl.searchParams.get('query')

            if (pathname.split('/').pop()) {
                query = pathname.split('/').pop()
            }

            $('input[name="query"]').val(query)

            console.log(query);
        } else if (pathname.includes('/movies/')) {
            header.children().each(function(menu) { $(this).removeClass('active').find('*').removeClass('active') })
            header.find('li:nth-child(2)').addClass('active')
        } else if (pathname.includes('/tv-shows/')) {
            header.children().each(function(menu) { $(this).removeClass('active').find('*').removeClass('active') })
            header.find('li:nth-child(3)').addClass('active')
        }

        function footerAlign() {
            var docHeight = $(window).height();
            var footerHeight = $('.footer').height();
            var footerTop = $('.footer').position().top + footerHeight + 70;

            if (footerTop < docHeight) {
                $('.footer').css('margin-top', 10 + (docHeight - footerTop) + 'px');
            }
        }

        footerAlign()

        window.addEventListener('resize', footerAlign)

        // web share api
        if (navigator.share) {
            // console.log($('.share-btn,.grid-share-btn'));
            $('.share-btn,.grid-share-btn').addClass('show')
            $('.total_votes').addClass('hide')

            $('.share-btn,.grid-share-btn').on('click', function() {
                const host = `${window.location.protocol}//${window.location.hostname}`;
                let url = `${host}${$(this).data('url')}`
                let title = `${$(this).data('title')}`
                let rating = `Rating ⭐: ${$(this).data('rating')}`
                let text = `${title}\n\n${rating}\n\nStory Line: ${$(this).data('overview')}\n\n${url}`

                navigator.share({
                        text
                    }).then(() => {
                        console.log('Thanks! 😄');
                    })
                    .catch(err => {
                        console.log(`Couldn't share 🙁`);
                    });
            })
        } else {
            $('.share-btn,.grid-share-btn').removeClass('show')
            $('.total_votes').removeClass('hide')

            console.log('share is not supported');
        }


        /*==============================
        Morelines
        ==============================*/
        // $('.card__description--details').moreLines({
        // 	linecount: 6,
        // 	baseclass: 'b-description',
        // 	basejsclass: 'js-description',
        // 	classspecific: '_readmore',
        // 	buttontxtmore: "",
        // 	buttontxtless: "",
        // 	animationspeed: 400
        // });
    }
})