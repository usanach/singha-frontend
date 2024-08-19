

sec3dataset = [{
    "name": "siraninn Residences",
    "link": "https://residential.singhaestate.co.th/th/singlehouse/siraninn/pattanakarn",
    "brands": "SIRANINN",
    "location": "Pattanakarn",
    "detail": "True Legacy Lives Now",
    "image": {
        "l": "./assets/image/residential/collection/siraninn - home-banner.webp",
        "s": "./assets/image/residential/collection/siraninn.webp"
    }
}, {
    "name": "s’rin",
    "link": "https://residential.singhaestate.co.th/singlehouse/srin/ratchapruek-sai1",
    "brands": "S’RIN",
    "location": "Ratchaphruek-Sai1",
    "detail": "INFINITE LIVING",
    "image": {
        "l": "./assets/image/residential/collection/srin - home-banner.webp",
        "s": "./assets/image/residential/collection/srin.webp"
    }
}, {
    "name": "shawn",
    "link": "https://residential.singhaestate.co.th/singlehouse/shawn/panya-indra",
    "brands": "SHAWN",
    "location": "Panya Indra",
    "detail": "Live SHAWN Way",
    "image": {
        "l": "./assets/image/residential/collection/shawn panya - home-banner.webp",
        "s": "./assets/image/residential/collection/shawn panya.webp"
    }
}, {
    "name": "shawn",
    "link": "https://residential.singhaestate.co.th/singlehouse/shawn/wongwaen-chatuchot",
    "brands": "SHAWN",
    "location": "Wongwaen – Chatuchot",
    "detail": "Live SHAWN Way",
    "image": {
        "l": "./assets/image/residential/collection/shawn wongwaen - home-banner.webp",
        "s": "./assets/image/residential/collection/shawn wong.webp"
    }
}, {
    "name": "extro",
    "link": "https://residential.singhaestate.co.th/th/condo/the-extro/phayathai-rangnam",
    "brands": "extro",
    "location": "phayathai rangnam",
    "detail": "Living Extra",
    "image": {
        "l": "./assets/image/residential/collection/extro - home-banner.webp",
        "s": "./assets/image/residential/collection/extro.webp"
    }
}]
// SANTIBURI  - Connoisseur of Happiness
// SIRANINN Residences - True Legacy Lives Now
// S’RIN - Infinite Living 
// SHAWN - Live SHAWN Way

// SMYTH’S - Tell Your Tales
// La soie de S - Emblem of Aesthetics

// THE EXTRO - Living Extra
// THE ESSE SKV36 - Harmony of Contrast
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

document.addEventListener("DOMContentLoaded", (event) => {
    var sec3slidesImage = sec3dataset.map(e => {
        return `
                <div class="swiper-slide">
                    <div class="relative w-full lg:h-[70dvh] lg:overflow-hidden">
                        <a href="${e.link}" target="_blank">
                            <img src="${e.image.l}"
                                alt="S’RIN Ratchaphruek-sai 1" srcset="" alt="${e.name}-${e.location}"
                                class="lg:absolute bottom-0 left-0 w-full md:block hidden">
                            <img src="${e.image.s}"
                                alt="S’RIN Ratchaphruek-sai 1" srcset="" alt="${e.name}-${e.location}"
                                class="lg:absolute bottom-0 left-0 w-full md:hidden block">
                        <a/>
                    </div>
                </div>`
    });
    var sec3slidesDetail = sec3dataset.map(e => {
        return `
                <div class="swiper-slide text-white">
                    <a href="${e.link}" target="_blank">
                        <p class="text-[22px] uppercase">
                            ${e.name}
                        </p>
                    </a>
                    <p class="text-[14px] capitalize">
                        ${e.location}
                    </p>
                    <p class="text-[14px]">
                        ${e.detail}
                    </p>
                </div>`
    });

    collectionSwiper.appendSlide(sec3slidesImage);
    collectionSwiperDetail.appendSlide(sec3slidesDetail);
});