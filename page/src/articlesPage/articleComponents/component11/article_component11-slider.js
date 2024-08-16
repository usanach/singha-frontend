document.addEventListener('DOMContentLoaded', function () {
    const owl = document.querySelector('.article-11owl.owl-carousel');
    const owlPag = document.getElementById('pag-num');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    // Initialize Owl Carousel
    function initializeOwlCarousel() {
        $(owl).owlCarousel({
            stagePadding: 0,
            margin: 0,
            loop: true,
            nav: false,
            dots: false,
            center: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 30,
                    stagePadding: 80,
                },
                400: {
                    items: 1,
                    margin: 40,
                    stagePadding: 100,
                },
                460: {
                    items: 1.5,
                    margin: 40,
                    stagePadding: 70,
                },
                560: {
                    items: 2,
                    margin: 30,
                    stagePadding: 20,
                },
                768: {
                    items: 2.5,
                    margin: 40,
                    stagePadding: 20,
                },
                991: {
                    items: 2.5,
                },
                1024: {
                    items: 2.5,
                    margin: 50,
                    stagePadding: 100,
                },
                1366: {
                    items: 2.5,
                    margin: 30,
                    stagePadding: 140,
                },
                1720: {
                    items: 3.5,
                    margin: 0,
                    stagePadding: 140,
                },
            },
            onInitialized: updatePagination,
            onTranslated: updatePagination,
        });
    }

    // Update pagination
    function updatePagination(event) {
        const totalItems = owl.querySelectorAll('.owl-item:not(.cloned)').length;
        const centerItem = owl.querySelector('.owl-item.center');
        if (centerItem) {
            const allItems = Array.from(centerItem.parentElement.children);
            const clonedItems = allItems.filter(item => item.classList.contains('cloned')).length / 2;
            let currentIndex = allItems.indexOf(centerItem) - clonedItems + 1;

            if (currentIndex > totalItems) {
                currentIndex = 1;
            } else if (currentIndex < 1) {
                currentIndex += totalItems;
            }
            // console.log(currentIndex);
            owlPag.textContent = `(${currentIndex}/${totalItems})`;
        }
    }

    // Initialize the carousel
    initializeOwlCarousel();

    // Button click event listeners
    btnLeft.addEventListener('click', function () {
        $(owl).trigger('prev.owl.carousel');
        updatePagination();
    });

    btnRight.addEventListener('click', function () {
        $(owl).trigger('next.owl.carousel');
        updatePagination();
    });
    // Initialize lightGallery only on active item when image is clicked
    $(owl).on('click', '.owl-item img', function () {

        const parentItem = $(this).closest('.owl-item');
        if (parentItem.hasClass('active') && parentItem.hasClass('center')) {
            const activeItems = $(owl).find('.owl-item');
            var currentIndex;
            const images = activeItems.map(function (index, item) {
                if (!$(item).hasClass('cloned')) {
                    const img = $(item).find('img');
                    return {
                        src: img.attr('src'),
                        thumb: img.attr('src'),
                        active: $(item).hasClass('active') && $(item).hasClass('center')
                    };
                }
            }).get();
            images.map((e, index) => {
                if (e.active) {
                    currentIndex = index;
                }
            })
            var gallery = $('.article-11').lightGallery({
                dynamic: true,
                dynamicEl: images,
                thumbnail: false,
                download: false,
                zoom: true,
                fullScreen: true,
                autoplay: false,
                controls: true,
                toolbar: false,
                hash: false
            }).on('onCloseAfter.lg', function (event) {
                if (document.querySelector('.gallery-custom-nav')) {
                    document.querySelector('.gallery-custom-nav').remove();
                }
            });

            gallery.data('lightGallery').index = currentIndex;
            const $lgContainer = document.querySelector('body');
            const nav = `<div class="gallery-custom-nav">
                            <div class="owl-nav">
                                <div class="owl-prev">
                                    <button type="button" id="btn-left" class="page-btn pagination-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                                            <path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
                                                data-name="4-Arrow Left" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="owl-next">
                                    <button type="button" id="btn-right" class="page-btn pagination-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                                            <path
                                                d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z"
                                                data-name="3-Arrow Right" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>`;

            if ($lgContainer) {
                $lgContainer.insertAdjacentHTML('beforeend', nav);
            }

            document.querySelector('.gallery-custom-nav .owl-next').addEventListener('click', () => {
                document.querySelector('.lg-actions .lg-next').click();
            });
            document.querySelector('.gallery-custom-nav .owl-prev').addEventListener('click', () => {
                document.querySelector('.lg-actions .lg-prev').click();
            });
        }

    });
    // Update Owl Carousel on screen size change
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            $(owl).trigger('refresh.owl.carousel');
        }, 50);
    });
});
