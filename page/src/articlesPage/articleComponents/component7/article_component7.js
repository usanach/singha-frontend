document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let article7textWrapper = document.querySelector('.article-7 .article-7-text-wrapper');
    gsap.from(article7textWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: article7textWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

});