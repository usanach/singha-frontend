document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let article11 = document.querySelector('.article-11');
    gsap.from(article11.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: article11.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

});