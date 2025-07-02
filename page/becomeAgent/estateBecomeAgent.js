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

    // form phone number dropdown part
    document.getElementById('PRESET_PHONE').addEventListener('change', function () {
        var selectedOption = this.options[this.selectedIndex];
        var fullText = selectedOption.getAttribute('data-fulltext');
        selectedOption.text = selectedOption.value;
        selectedOption.setAttribute('data-fulltext', fullText);
    });

    const sel = document.getElementById('PRESET_PHONE');
    Array.from(sel.options).forEach(opt => {
        opt.text = '(' + opt.value + ')';          // หรือ opt.innerHTML = opt.value;
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