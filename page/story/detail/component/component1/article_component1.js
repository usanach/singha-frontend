document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let article1Wrapper = document.querySelector('.article-1 .article-1-wrapper');
    gsap.from(article1Wrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        // stagger: 0.3,
        scrollTrigger: {
            trigger: article1Wrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let imageTextWrapper = document.querySelector('.image-text-wrapper');
    gsap.from(imageTextWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: imageTextWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });
    
    
});