document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);


    let bannerTextWrapper = document.querySelector('.become-agent-main .banner-text-wrapper');
    gsap.from(bannerTextWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: bannerTextWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });


    let bannerTitleText = document.querySelector('.become-agent-main .banner-slider-section .title-text-wrapper .header-text');
    gsap.from(bannerTitleText, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: bannerTitleText,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let bannerSlide = document.querySelector('.banner-slider-section .owl-carousel');
    gsap.from(bannerSlide.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: bannerSlide.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    

    let partnershipHeaderText = document.querySelector('.partnership-section .partnership-header-text-wrapper');
    gsap.from(partnershipHeaderText, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: partnershipHeaderText,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let partnershipBlock = document.querySelector('.partnership-section .partnership-block');
    gsap.from(partnershipBlock.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: partnershipBlock.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let formSection = document.querySelector('.partnership-form-section');
    gsap.from(formSection.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: formSection.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let portfoliotitleTextWrapper = document.querySelector('.portfolio-section .title-text-wrapper');
    gsap.from(portfoliotitleTextWrapper, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: portfoliotitleTextWrapper,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let portfolioSlide = document.querySelector('.portfolio-section .owl-carousel');
    gsap.from(portfolioSlide, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: portfolioSlide,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });
});


