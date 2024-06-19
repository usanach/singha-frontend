
var bannerDetailSwipe = new Swiper(".banner-detail-swipe", {
    autoplay: {
        delay: 5000,
    },
    loop: true,
    pagination: {
        el: ".banner-detail-swipe .custom-pagination-square",
        clickable: true
    },
    on: {
        init: function (e) {
            document.querySelector("#hero-slide-vdo-" + e.realIndex).currentTime = 2;
            document.querySelector("#hero-slide-cover-vdo-" + e.realIndex).currentTime = 2;
            document.querySelector("#hero-slide-vdo-" + e.realIndex).addEventListener("timeupdate", (event) => {
                // totalLength = document.querySelector("#hero-slide-vdo-" + e.realIndex).duration % 60;
                totalLength = 5;
                percentageCompleted = (document.querySelector("#hero-slide-vdo-" + e.realIndex).currentTime / totalLength) * 100 - 40;
                if (percentageCompleted < 100) {
                    document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', percentageCompleted + "%")
                } else {
                    document.querySelector("#hero-slide-vdo-" + e.realIndex).currentTime = 2;
                    document.querySelector("#hero-slide-cover-vdo-" + e.realIndex).currentTime = 2;
                    document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', 0 + "%")
                }
            });
        },
        slideNextTransitionEnd: function (e) {
            var vdo = document.querySelectorAll('video');
            for (let index = 0; index < vdo.length; index++) {
                const element = vdo[index];
                element.currentTime = 2;
            }
            document.querySelector("#hero-slide-vdo-" + getActiveIndex()).addEventListener("timeupdate", (event) => {
                // totalLength = document.querySelector("#hero-slide-vdo-" + getActiveIndex()).duration % 60;
                totalLength = 5;
                percentageCompleted = (document.querySelector("#hero-slide-vdo-" + getActiveIndex()).currentTime / totalLength) * 100 - 40;
                if (percentageCompleted < 100) {
                    document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', percentageCompleted + "%")
                } else {
                    document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', 0 + "%")
                }
            });
        }
    },
});
function getActiveIndex() {
    return bannerDetailSwipe.realIndex;
}
var bannerSwipe = new Swiper(".banner-swipe", {
    loop: true,
    allowTouchMove: false,
})


bannerDetailSwipe.controller.control = bannerSwipe;


document.addEventListener("DOMContentLoaded", (event) => {
    SmoothScroll({ stepSize: 20 })

    let st = ScrollTrigger.create({
        trigger: ".pin-hero-banner",
        pin: ".pin-hero-banner",
        start: "top top",
        end: "+=100%",
        pinSpacing: false,
        // markers:true,
        scrub: 1
    });
});