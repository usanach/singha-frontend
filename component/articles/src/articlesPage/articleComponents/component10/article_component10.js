document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let article10titleTextWrapper = document.querySelector('.article-10 .title-text-wrapper');
    gsap.from(article10titleTextWrapper, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: article10titleTextWrapper,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let article10campaignDetailArticlesRecommendationWrapper = document.querySelector('.article-10 .campaign-detail-articlesRecommendation-wrapper');
    gsap.from(article10campaignDetailArticlesRecommendationWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: article10campaignDetailArticlesRecommendationWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    

});