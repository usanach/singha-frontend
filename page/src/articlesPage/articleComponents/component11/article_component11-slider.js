document.addEventListener('DOMContentLoaded', function () {
    const owl = document.querySelector('.owl-carousel');
    const owlPag = document.getElementById('pag-num');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    // Initialize Owl Carousel
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
            },
            600: {
                items: 2,
            },
            1000: {
                items: 4.5,
            },
            1500: {
                items: 4.5,
            },
            2200: {
                items: 4.5,
            },
        },
        onInitialized: updatePagination,
        onTranslated: updatePagination
    });

    function updatePagination(event) {
        const totalItems = owl.querySelectorAll('.owl-item:not(.cloned)').length;
        const centerItem = owl.querySelector('.owl-item.center');
        if (centerItem) {
            const allItems = Array.from(centerItem.parentElement.children);
            const clonedItems = allItems.filter(item => item.classList.contains('cloned')).length / 2;
            const currentIndex = allItems.indexOf(centerItem) - clonedItems + 1;
            owlPag.textContent = `(${currentIndex}/${totalItems})`;
        }
    }

    btnLeft.addEventListener('click', function () {
        $(owl).trigger('prev.owl.carousel');
    });

    btnRight.addEventListener('click', function () {
        $(owl).trigger('next.owl.carousel');
    });

    // Initialize lightGallery only on active item when image is clicked
    $(owl).on('click', '.owl-item img', function () {
        const parentItem = $(this).closest('.owl-item');
        if (parentItem.hasClass('active')  && parentItem.hasClass('center') ) {
            const activeItems = $(owl).find('.owl-item.active');
            const images = activeItems.map(function (index, item) {
                const img = $(item).find('img');
                return {
                    src: img.attr('src'),
                    thumb: img.attr('src'),
                };
            }).get();

            const currentIndex = activeItems.index(parentItem);
            $(this).lightGallery({
                dynamic: true,
                dynamicEl: images,
                index: currentIndex,
                thumbnail: false,
                download: false,
                zoom: true,
                fullScreen: true,
                enableSwipe: false, 
                enableDrag: false,  
                controls: false,
                autoplay: false,
                toolbar: false    
            });
        }
    });
});
