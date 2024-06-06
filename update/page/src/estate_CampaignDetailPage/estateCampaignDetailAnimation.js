document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    
    let bannerText = document.querySelector('.banner-text-wrappper');
    gsap.from(bannerText.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: bannerText.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let detailWrapper = document.querySelector('.detail-wrapper');
    gsap.from(detailWrapper, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: detailWrapper,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let formWrapper = document.querySelector('.campaign-detail-form-wrapper');
    gsap.from(formWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: formWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let showProductWrapper = document.querySelector('.show-product-wrapper');
    gsap.from(showProductWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: showProductWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let campaignDetailArticlesRecommendationHeaderText = document.querySelector('.campaign-detail-articlesRecommendation-section .header-text');
    gsap.from(campaignDetailArticlesRecommendationHeaderText, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.4,
        scrollTrigger: {
            trigger: campaignDetailArticlesRecommendationHeaderText,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let articlesRecommendationImageWrapper = document.querySelectorAll('.articlesRecommendation-image-wrapper');
    gsap.from(articlesRecommendationImageWrapper, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: articlesRecommendationImageWrapper,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    
});