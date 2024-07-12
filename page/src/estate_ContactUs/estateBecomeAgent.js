document.addEventListener('DOMContentLoaded', function () {
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnLeft1 = document.getElementById('portfolio-btn-left');
    const btnRight1 = document.getElementById('portfolio-btn-right');

    // Initialize the banner slider carousel 0
    $('.banner-slider-section.owl-carousel').owlCarousel({
        margin: 20,
        loop: false,
        nav: false,
        dots: false,
        center: false,
        stagePadding: 20,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 5 },
        },
    });

    // Function to initialize the portfolio carousel 1
    function initializePortfolioCarousel() {
        $('.portfolio.owl-carousel').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            center: true,
            margin: 0,
            onInitialized:(e)=>{
                idx = e.item.index;
                $('.portfolio.owl-carousel .owl-item.center').removeClass('center');
                $('.portfolio.owl-carousel .owl-item.medium').removeClass('medium');
                $('.portfolio.owl-carousel .owl-item').eq(idx).addClass('center');
                $('.portfolio.owl-carousel .owl-item').eq(idx-1).addClass('medium');
                $('.portfolio.owl-carousel .owl-item').eq(idx+1).addClass('medium');
            },
            onTranslate:(e)=>{
                idx = e.item.index;
                $('.portfolio.owl-carousel .owl-item.center').removeClass('center');
                $('.portfolio.owl-carousel .owl-item.medium').removeClass('medium');
                $('.portfolio.owl-carousel .owl-item').eq(idx).addClass('center');
                $('.portfolio.owl-carousel .owl-item').eq(idx-1).addClass('medium');
                $('.portfolio.owl-carousel .owl-item').eq(idx+1).addClass('medium');
            },
            responsive: {
                0: {
                    items: 1,
                    stagePadding:50,
                },
                1024: {
                    items: 3,
                    stagePadding: 200,
                }
            },
        });
    }

    // Initialize the portfolio carousel
    initializePortfolioCarousel();

    // Add event listeners for the buttons
    btnLeft.addEventListener('click', function () {
        $('.banner-slider-section.owl-carousel').trigger('prev.owl.carousel');
    });

    btnRight.addEventListener('click', function () {
        $('.banner-slider-section.owl-carousel').trigger('next.owl.carousel');
    });

    btnLeft1.addEventListener('click', function () {
        $('.portfolio.owl-carousel').trigger('prev.owl.carousel');
    });

    btnRight1.addEventListener('click', function () {
        $('.portfolio.owl-carousel').trigger('next.owl.carousel');
    });

    // Handle window resize to reinitialize the portfolio carousel
    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            $('.portfolio.owl-carousel').owlCarousel('destroy');
            initializePortfolioCarousel();
        }, 50); // Delay to avoid excessive reinitializations during resize
    });

    // form phone number dropdown part
    document.getElementById('PRESET_PHONE').addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var fullText = selectedOption.getAttribute('data-fulltext');
        selectedOption.text = selectedOption.value;
        selectedOption.setAttribute('data-fulltext', fullText);
    });

    document.getElementById('PRESET_PHONE').addEventListener('click', function () {
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            option.text = option.getAttribute('data-fulltext');
        }
    });

    document.getElementById('PRESET_PHONE').addEventListener('blur', function () {
        var selectedOption = this.options[this.selectedIndex];
        selectedOption.text = selectedOption.value;
    }, true);
});