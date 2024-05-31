document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let article4headerWrapper = document.querySelector('.article-4 .article-header-wrapper');
    gsap.from(article4headerWrapper, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: article4headerWrapper,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let article4textArticleWrapper = document.querySelector('.article-4 .text-article-wrapper');
    gsap.from(article4textArticleWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: article4textArticleWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

});