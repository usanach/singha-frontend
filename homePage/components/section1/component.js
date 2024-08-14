
var sec1mySwiperData = [{
    title: "Mastering The Luxury",
    image: {
        l: "./assets/image/residential/1 25.png",
        s: "./assets/image/residential/STBR_RESIZE-223.webp"
    }
},{
    title: "Mastering The Luxury2",
    image: {
        l: "./assets/image/residential/1 25.png",
        s: "./assets/image/residential/STBR_RESIZE-223.webp"
    }
},{
    title: "Mastering The Luxury3",
    image: {
        l: "./assets/image/residential/1 25.png",
        s: "./assets/image/residential/STBR_RESIZE-223.webp"
    }
}]
var heroBannerSwiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".mySwiper .hero-progress-bar",
        type: "progressbar",
    },
    navigation: {
        nextEl: ".mySwiper .next",
        prevEl: ".mySwiper .prev",
    },
});

var heroBannerPagingSwiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".mySwiper .page-number",
        type: "fraction",
    },
});
heroBannerSwiper.controller.control = heroBannerPagingSwiper;


document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);
    var sec1slides = sec1mySwiperData.map(e => {
        return `
                <div class="swiper-slide">
                    <div class="relative w-full">
                        <img src="${e.image.l}" alt="${e.title}"
                            srcset="" class="w-full lg:block hidden brightness-80 max-h-[100dvh]">
                        <img src="${e.image.s}" alt="${e.title}"
                            srcset="" class="w-full lg:hidden block brightness-80  max-h-[100dvh]">
                        <div class="absolute top-0 left-0 flex w-full h-full">
                            <div class="m-auto">
                                <p
                                    class="font-['Cinzel'] uppercase lg:text-[60px] text-[45px] text-white text-center leading-tight">
                                    ${e.title}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`
    });

    heroBannerSwiper.appendSlide(sec1slides);
    
    gsap.to(".section-1 .swiper-slide img", {
        y: "+=50",
        scrollTrigger: {
            trigger: ".section-1 .swiper-slide img",
            start: "top top",
            scrub: 1
        }
    });
});