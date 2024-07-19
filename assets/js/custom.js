

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


var privilegeSwiper = new Swiper(".privilege-slide", {
    pagination: {
        el: ".privilege-slide .hero-progress-bar",
        type: "progressbar",
    },
    navigation: {
        nextEl: ".privilege-slide .next",
        prevEl: ".privilege-slide .prev",
    },
});

var privilegeSwiperDetail = new Swiper(".privilege-detail-slide", {
    effect: "fade"
});


var privilegePagingSwiper = new Swiper(".privilege-slide", {
    pagination: {
        el: ".privilege-slide .page-number",
        type: "fraction",
    },
});

privilegeSwiper.controller.control = privilegeSwiperDetail;
privilegeSwiperDetail.controller.control = privilegePagingSwiper;

function showModal(name) {
    document.querySelector('.' + name).classList.add('show');
}

function hideModal(name) {
    document.querySelector('.' + name).classList.remove('show');
}

function exploreMore(ev) {
    var tracking = {
        event: "click_view_promotion",
        landing_page: "campaign_page",
        section: "promotion_banner",
        event_action: "click",
    }
    ev.dataset["promotion_name"] != undefined ? tracking.promotion_name = ev.dataset["promotion_name"] : "";
    ev.dataset["promotion_start"] != undefined ? tracking.promotion_start = ev.dataset["promotion_start"] : "";
    ev.dataset["promotion_end"] != undefined ? tracking.promotion_end = ev.dataset["promotion_end"] : "";
    console.log(tracking);
    // setDataLayer(tracking);
}
