
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
            console.log(e.realIndex);
            var playPromise = document.querySelector("#hero-slide-vdo-" + e.realIndex).play();

            if (playPromise !== undefined) {
                document.querySelector("#hero-slide-vdo-" + e.realIndex).currentTime = 2;
                document.querySelector("#hero-slide-cover-vdo-" + e.realIndex).currentTime = 2;
                playPromise.then(_ => {
                    document.querySelector("#hero-slide-cover-vdo-" + e.realIndex).play();
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
                })
                    .catch(error => {
                        // Auto-play was prevented
                        // Show paused UI.
                    });
            }
        },
        slideNextTransitionEnd: function (e) {
            var playPromise = document.querySelector("#hero-slide-vdo-" + getActiveIndex()).play();

            if (playPromise !== undefined) {
                document.querySelector("#hero-slide-vdo-" + getActiveIndex()).currentTime = 2;
                document.querySelector("#hero-slide-cover-vdo-" + getActiveIndex()).currentTime = 2;
                playPromise.then(_ => {
                    document.querySelector("#hero-slide-cover-vdo-" + getActiveIndex()).play();
                    document.querySelector("#hero-slide-vdo-" + getActiveIndex()).addEventListener("timeupdate", (event) => {
                        // totalLength = document.querySelector("#hero-slide-vdo-" + getActiveIndex()).duration % 60;
                        totalLength = 5;
                        percentageCompleted = (document.querySelector("#hero-slide-vdo-" + getActiveIndex()).currentTime / totalLength) * 100 - 40;
                        if (percentageCompleted < 100) {
                            document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', percentageCompleted + "%")
                        } else {
                            document.querySelector("#hero-slide-vdo-" + getActiveIndex()).currentTime = 2;
                            document.querySelector("#hero-slide-cover-vdo-" + getActiveIndex()).currentTime = 2;
                            document.querySelector('.banner-detail-swipe .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', 0 + "%")
                        }
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