document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let article9showProductWrapper = document.querySelector('.article-9 .show-product-wrapper');
    gsap.from(article9showProductWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: article9showProductWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let article9showProductTextWrapper = document.querySelector('.article-9 .show-product-text-wrapper');
    gsap.from(article9showProductTextWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: article9showProductTextWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    

});