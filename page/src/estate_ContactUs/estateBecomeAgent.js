document.addEventListener('DOMContentLoaded', function () {
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnLeft1 = document.getElementById('portfolio-btn-left');
    const btnRight1 = document.getElementById('portfolio-btn-right');

    // Initialize the banner slider carousel 0
    $('.banner-slider-section.owl-carousel').owlCarousel({
        stagePadding: 0,
        margin: 0,
        loop: true,
        nav: false,
        dots: false,
        center: true,
        responsive: {
            0: { items: 1.5 },
            600: { items: 2.5 },
            1000: { items: 4.5 },
            1500: { items: 4.5 },
            2200: { items: 4.5 },
        },
    });

    // Function to initialize the portfolio carousel 1
    function initializePortfolioCarousel() {
        $('.portfolio.owl-carousel').owlCarousel({
            stagePadding: 0,
            loop: true,
            nav: false,
            dots: false,
            center: true,
            margin: 0,
            responsive: {
                0: { 
                    items: 1, 
                    margin: 10, 
                    stagePadding: 40, 
                },
                560: { 
                    items: 1, 
                    margin: 0, 
                    stagePadding: 100 ,
                },
                768: { 
                    items: 1.5, 
                    stagePadding: 60 ,
                },
                991: { 
                    items: 2 , 
                    stagePadding: 60 ,
                },
                1024: { 
                    items: 3,
                    stagePadding: 10 ,
                },
                1366: { 
                    items: 3.5,
                    stagePadding: 100 ,
                },
                1720: { 
                    items: 3.5,
                    stagePadding: 120 ,
                },
                1920: { 
                    items: 4.5 ,
                    stagePadding: 20 ,
                },
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
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            $('.portfolio.owl-carousel').owlCarousel('destroy');
            initializePortfolioCarousel();
        }, 50); // Delay to avoid excessive reinitializations during resize
    });

    // form phone number dropdown part
    document.getElementById('PRESET_PHONE').addEventListener('change', function() {
        var selectedOption = this.options[this.selectedIndex];
        var fullText = selectedOption.getAttribute('data-fulltext');
        selectedOption.text = selectedOption.value;
        selectedOption.setAttribute('data-fulltext', fullText);
    });
    
    document.getElementById('PRESET_PHONE').addEventListener('click', function() {
        for (var i = 0; i < this.options.length; i++) {
            var option = this.options[i];
            option.text = option.getAttribute('data-fulltext');
        }
    });
    
    document.getElementById('PRESET_PHONE').addEventListener('blur', function() {
        var selectedOption = this.options[this.selectedIndex];
        selectedOption.text = selectedOption.value;
    }, true);
});
