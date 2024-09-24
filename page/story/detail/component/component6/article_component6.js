document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let article6textWrapper = document.querySelector('.article-6 .text-wrapper');
    gsap.from(article6textWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: article6textWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

});