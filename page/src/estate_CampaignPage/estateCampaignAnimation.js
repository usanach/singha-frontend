document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);
    
    window.animateCards = () => { // Attach animateCards to the global window object
        let cards = document.querySelectorAll('.campaign-card');
    
        gsap.from(cards, {
            opacity: 0,
            y: 20,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: cards,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true
            }
        });
    };

    let bannerheaderText = document.querySelectorAll('.campaign-section-banner .title-text-wrapper .header-text');
    gsap.from(bannerheaderText, {
        opacity: 0,
        y: 20,
        duration: 1,
        // stagger: 0.2,
        scrollTrigger: {
            trigger: bannerheaderText,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let prommoheaderText = document.querySelectorAll('.prommotion-section  .title-text-wrapper  .header-text');
    gsap.from(prommoheaderText, {
        opacity: 0,
        y: 20,
        duration: 1,
        // stagger: 0.2,
        scrollTrigger: {
            trigger: prommoheaderText,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let swiperContainer1 = document.querySelectorAll('.swiper-container1');
    gsap.from(swiperContainer1, {
        opacity: 0,
        y: 20,
        duration: 1,
        // stagger: 0.2,
        scrollTrigger: {
            trigger: swiperContainer1,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let swiperContainer2 = document.querySelectorAll('.swiper-container2');
    gsap.from(swiperContainer2, {
        opacity: 0,
        y: 20,
        duration: 1,
        // stagger: 0.2,
        scrollTrigger: {
            trigger: swiperContainer2,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });
    
    
});

