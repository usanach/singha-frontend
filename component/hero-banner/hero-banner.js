

// document.querySelector("#hero-slide-vdo-" + bannerDetailSwipe.actv).addEventListener("timeupdate", (event) => {
//     totalLength = document.querySelector("#hero-slide-vdo-" + e.realIndex).duration % 60;
//     // totalLength = 5;
//     percentageCompleted = (document.querySelector("#hero-slide-vdo-" + e.realIndex).currentTime / totalLength) * 100 - 40;
//     if (percentageCompleted < 100) {
//         document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', percentageCompleted + "%")
//     } else {
//         document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', 0 + "%")
//     }
// });
var bannerSwipe = new Swiper(".banner-swipe", {
    loop: true,
    allowTouchMove: false,
    watchSlidesProgress: true,
})

var bannerDetailSwipe = new Swiper(".banner-detail-swipe", {
    // autoplay: {
    //     delay: 5000,
    // },
    loop: true,
    pagination: {
        el: ".banner-detail-swipe .custom-pagination-square",
        clickable: true
    },
    thumbs: {
        swiper: bannerSwipe,
    },
    on: {
        init: (e) => {
            document.querySelector(`#hero-slide-vdo-${e.activeIndex}`).play();
            document.querySelector(`#hero-slide-cover-vdo-${e.activeIndex}`).play();
            document.querySelector(`#hero-slide-vdo-${e.activeIndex}`).addEventListener("timeupdate", (event) => {
                totalLength = document.querySelector("#hero-slide-vdo-" + e.realIndex).duration % 60;
                // totalLength = 5;
                percentageCompleted = (document.querySelector("#hero-slide-vdo-" + e.realIndex).currentTime / totalLength) * 100 ;
                
                if (percentageCompleted < 100) {
                    document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', percentageCompleted + "%")
                } else {
                    document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', 0 + "%")
                    bannerDetailSwipe.slideNext();
                }
            });
        },
        slideChangeTransitionStart: (e) => {
            var collectionVdo = document.querySelectorAll('video');
            for (let index = 0; index < collectionVdo.length; index++) {
                const element = collectionVdo[index];
                element.currentTime = 0;
            }
        },
        slideChangeTransitionEnd: (e) => {
            document.querySelector(`#hero-slide-vdo-${e.activeIndex}`).play();
            document.querySelector(`#hero-slide-cover-vdo-${e.activeIndex}`).play();
            document.querySelector(`#hero-slide-vdo-${e.activeIndex}`).addEventListener("timeupdate", (event) => {
                totalLength = document.querySelector("#hero-slide-vdo-" + e.realIndex).duration % 60;
                // totalLength = 5;
                percentageCompleted = (document.querySelector("#hero-slide-vdo-" + e.realIndex).currentTime / totalLength) * 100 ;
                
                if (percentageCompleted < 100) {
                    document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', percentageCompleted + "%")
                } else {
                    document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', 0 + "%")
                    bannerDetailSwipe.slideNext();
                }
            });
        },
    },
});


document.addEventListener("DOMContentLoaded", (event) => {
    // SmoothScroll({ stepSize: 20 })

    ScrollTrigger.create({
        trigger: ".pin-hero-banner",
        pin: ".pin-hero-banner",
        start: "top top",
        pinSpacing: false,
        // markers:true,
        scrub: 1,
    });
});