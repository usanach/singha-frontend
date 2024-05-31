document.addEventListener('DOMContentLoaded', function () {
    const owl = document.querySelector('.owl-carousel');
    const owlPag = document.getElementById('pag-num');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    // Initialize Owl Carousel
    $(owl).owlCarousel({
        stagePadding: 0,
        loop: true,
        nav: false,
        dots: false,
        center: true,
        responsive: {
            0: {
                items: 1,
                margin: 0,
                stagePadding: 0,
            },
            600: {
                items: 2,
                margin: 40,
            },
            1000: {
                items: 4.5,
                margin: 20,
            },
            1500: {
                items: 4.5,
                margin: 40,
            },
            2200: {
                items: 4.5,
                margin: 140,
            },
        },
        onInitialized: updatePagination,
        onTranslated: updatePagination
    });

    function updatePagination(event) {
        const totalItems = owl.querySelectorAll('.owl-item:not(.cloned)').length;
        const centerItem = owl.querySelector('.owl-item.center');
        if (centerItem) {
            const clonedItems = owl.querySelectorAll('.owl-item.cloned').length / 2;
            const currentIndex = Array.from(centerItem.parentElement.children).indexOf(centerItem) - clonedItems + 1;
            owlPag.textContent = `(${currentIndex}/${totalItems})`;
        }
    }

    btnLeft.addEventListener('click', function () {
        $(owl).trigger('prev.owl.carousel');
    });

    btnRight.addEventListener('click', function () {
        $(owl).trigger('next.owl.carousel');
    });
});