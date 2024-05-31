document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let article8articleDescText = document.querySelector('.article-8 .article-desc-text');
    gsap.from(article8articleDescText, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: article8articleDescText,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

});