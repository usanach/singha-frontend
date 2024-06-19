
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

            var playPromise = document.querySelector("#hero-slide-vdo-" + e.activeIndex).play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    document.querySelector("#hero-slide-vdo-" + e.activeIndex).currentTime = 2;
                    document.querySelector("#hero-slide-vdo-" + e.activeIndex).addEventListener("timeupdate", (event) => {
                        // totalLength = document.querySelector("#hero-slide-vdo-" + e.activeIndex).duration % 60;
                        totalLength = 5;
                        percentageCompleted = (document.querySelector("#hero-slide-vdo-" + e.activeIndex).currentTime + 5 / totalLength) * 100 - 40;
                        document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', percentageCompleted + "%")
                    });
                })
                    .catch(error => {
                        // Auto-play was prevented
                        // Show paused UI.
                    });
            }
        },
        activeIndexChange: function (e) {
            var playPromise = document.querySelector("#hero-slide-vdo-" + e.activeIndex).play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    document.querySelector("#hero-slide-vdo-" + e.activeIndex).currentTime = 2;
                    document.querySelector("#hero-slide-vdo-" + e.activeIndex).addEventListener("timeupdate", (event) => {
                        // totalLength = document.querySelector("#hero-slide-vdo-" + e.activeIndex).duration % 60;
                        totalLength = 5;
                        percentageCompleted = (document.querySelector("#hero-slide-vdo-" + e.activeIndex).currentTime / totalLength) * 100 - 40;
                        document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', percentageCompleted + "%")
                    });
                })
                    .catch(error => {
                        // Auto-play was prevented
                        // Show paused UI.
                    });
            }
        }
    },
});

var bannerSwipe = new Swiper(".banner-swipe", {
    loop: true,
    allowTouchMove: false,
    on: {
        init: function (e) {
            document.querySelector("#hero-slide-cover-vdo-" + e.activeIndex).currentTime = 2;
            document.querySelector("#hero-slide-cover-vdo-" + e.activeIndex).play();
        },
        slideChange: function (e) {
            document.querySelector("#hero-slide-cover-vdo-" + e.activeIndex).currentTime = 2;
            document.querySelector("#hero-slide-cover-vdo-" + e.activeIndex).play();
        }
    },
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