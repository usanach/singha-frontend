document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);


    let article5textArticleWrapper = document.querySelectorAll('.article-5 .text-article-wrapper');
    if (article5textArticleWrapper.length > 1) {
        for(i=0;i<article5textArticleWrapper.length;i++) {
            gsap.from(article5textArticleWrapper[i].children, {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.4,
                scrollTrigger: {
                    trigger: article5textArticleWrapper[i].children,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    once: true
                }
            });
        }
    } else {
        let article5textArticleWrapper = document.querySelector('.article-5 .text-article-wrapper');
        gsap.from(article5textArticleWrapper.children, {
            opacity: 0,
            y: 20,
            duration: 1,
            stagger: 0.4,
            scrollTrigger: {
                trigger: article5textArticleWrapper.children,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true
            }
        });
    }
});