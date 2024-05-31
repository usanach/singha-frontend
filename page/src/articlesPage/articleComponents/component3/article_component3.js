document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let article3textWrapper = document.querySelector('.article-3 .text-wrapper');
    gsap.from(article3textWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: article3textWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

});