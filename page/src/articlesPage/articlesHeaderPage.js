document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let articleBannerTextWrapper = document.querySelector('.article-banner-text-wrapper');
    gsap.from(articleBannerTextWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: articleBannerTextWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let articleHeaderTextContainer = document.querySelector('.article-header-text-container');
    gsap.from(articleHeaderTextContainer.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: articleHeaderTextContainer.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let st = ScrollTrigger.create({
        trigger: ".banner-wrapper",
        start: "top",
        end: "+=500",
        pinSpacing: false,
        pin: true,
    });

    //   console.log(st.vars);

});