

function toggleCard(id) {
    document.getElementById(id).classList.toggle('expand');
    document.getElementById(id).classList.toggle('expanded');
}

var heroBannerSwiper = new Swiper(".hero-banner-slide", {
    pagination: {
        el: ".hero-banner-slide .hero-progress-bar",
        type: "progressbar",
    },
    navigation: {
        nextEl: ".hero-banner-slide .next",
        prevEl: ".hero-banner-slide .prev",
    },
});

var heroBannerPagingSwiper = new Swiper(".hero-banner-slide", {
    pagination: {
        el: ".hero-banner-slide .page-number",
        type: "fraction",
    },
});

heroBannerSwiper.controller.control = heroBannerPagingSwiper;


var collectionSwiper = new Swiper(".collection-slide", {
    pagination: {
        el: ".collection-slide .hero-progress-bar",
        type: "progressbar",
    },
    navigation: {
        nextEl: ".collection-slide .next",
        prevEl: ".collection-slide .prev",
    },
});

var collectionSwiperDetail = new Swiper(".collection-detail-slide", {
    effect: "fade"
});


var collectionPagingSwiper = new Swiper(".collection-slide", {
    pagination: {
        el: ".collection-slide .page-number",
        type: "fraction",
    },
});

collectionSwiper.controller.control = collectionSwiperDetail;
collectionSwiperDetail.controller.control = collectionPagingSwiper;


var collectionSwiper = new Swiper(".privilege-slide", {
    pagination: {
        el: ".privilege-slide .hero-progress-bar",
        type: "progressbar",
    },
    navigation: {
        nextEl: ".privilege-slide .next",
        prevEl: ".privilege-slide .prev",
    },
});

var collectionSwiperDetail = new Swiper(".privilege-detail-slide", {
    effect: "fade"
});


var collectionPagingSwiper = new Swiper(".privilege-slide", {
    pagination: {
        el: ".privilege-slide .page-number",
        type: "fraction",
    },
});

collectionSwiper.controller.control = collectionSwiperDetail;
collectionSwiperDetail.controller.control = collectionPagingSwiper;

function showModal(name) {
    document.querySelector('.' + name).classList.add('show');
}

function hideModal(name) {
    document.querySelector('.' + name).classList.remove('show');
}