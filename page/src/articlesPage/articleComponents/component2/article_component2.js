document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let article2Wrapper = document.querySelector('.article-2 .article-2-wrapper');
    gsap.from(article2Wrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: article2Wrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

});