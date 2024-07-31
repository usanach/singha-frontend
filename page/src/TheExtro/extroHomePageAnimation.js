
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // intro banner
    let contentWrapper = document.querySelector('.content-wrapper');
    gsap.from(contentWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: contentWrapper.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
        }
    });



    // intro banner1
    let tl = gsap.timeline({ paused: true });

    tl.fromTo(".intro-banner2-image-wrapper .image-big",
        { yPercent: 100, opacity: 1 },
        { opacity: 1, duration: 1, yPercent: 0 })
        .fromTo(".intro-banner2-image-wrapper .image-big img",
            { yPercent: -100, opacity: 1 },
            { opacity: 1, duration: 1, yPercent: 0 }, "<")
        .fromTo(".intro-banner2-image-wrapper .image-small",
            { yPercent: 100, opacity: 1 },
            { opacity: 1, duration: 1, yPercent: 0 }, "<")
        .fromTo(".intro-banner2-image-wrapper .image-small img",
            { yPercent: -100, opacity: 1 },
            { opacity: 1, duration: 1, yPercent: 0 }, "<")
        .to(".intro-banner2-image-wrapper .image-small",
            { boxShadow: "37px 47px 62px -11px #553214", duration: 0.1, ease: "linear" },
            "+=0.3")


    ScrollTrigger.create({
        trigger: ".intro-banner2-image-wrapper", // Element to trigger the animation
        start: "top 80%", // Start animation when the top of the trigger element is 80% from the top of the viewport
        end: "bottom 20%", // End animation when the bottom of the trigger element is 20% from the top of the viewport
        onEnter: () => tl.play(), // Play timeline when element enters viewport
        // onLeave: () => tl.reverse(), // Reverse timeline when element leaves viewport
        onEnterBack: () => tl.play(), // Play timeline again when scrolling back into viewport
        // onLeaveBack: () => tl.reverse(), // Reverse timeline again when scrolling back out
        once: true,
    });


    let intro = document.querySelector('.intro-banner-container');
    ScrollTrigger.create({
        trigger: intro,
        start: "top top", // When the top of the trigger element hits the top of the viewport
        end: "bottom 100", // When the bottom of the trigger element hits the top of the viewport
        pin: true,
        pinSpacing: false,
        scrub: 1,
        toggleActions: "play none none none",
    });


    let pallarax = document.querySelector('.pallarax');
    let regist = document.querySelector('.register-input-container');
    if(window.innerWidth > 1024 || window.screen.width > 1024) {
        ScrollTrigger.create({
            trigger: pallarax,
            start: "top top",
            end: "+=1400px",
            pin: true,
            pinSpacing: true,
            // scrub: 1,
            toggleActions: "play none none none",
        })
        
    } else {
        ScrollTrigger.create({
            trigger: pallarax,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: 1,
            toggleActions: "play none none none",
        })

        // ScrollTrigger.create({
        //     trigger: regist,
        //     start: "top top", // When the top of the trigger element hits the top of the viewport
        //     end: "bottom top", // When the bottom of the trigger element hits the top of the viewport
        //     pin: true,
        //     pinSpacing: false,
        //     scrub: 1,
        //     toggleActions: "play none none none",
        // });
    }
    

    let liveTextWrapper = document.querySelector('.live-text-wrapper');
    gsap.from(liveTextWrapper.children, {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: liveTextWrapper.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
        }
    });

    let designConceptTextWrapper = document.querySelector('.design-concept-text-wrapper');
    gsap.from(designConceptTextWrapper.children, {
        opacity: 0,
        y: 40,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: designConceptTextWrapper.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
        }
    });


    let designConceptTextWrapper1 = document.querySelectorAll('.design-concept-text-wrapper1');
    gsap.from(designConceptTextWrapper1, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: designConceptTextWrapper1,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });


    let projectSignatureTextWrapper = document.querySelectorAll('.project-signature-wrapper .swiper-slide');
    gsap.from(projectSignatureTextWrapper, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: projectSignatureTextWrapper,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let menuWrapper = document.querySelectorAll('.menu-wrapper');
    gsap.from(menuWrapper, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: menuWrapper,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let projectDetailPanel = document.querySelector('.project-detail-panel');
    gsap.from(projectDetailPanel.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: projectDetailPanel.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });


    let project360TextWrapper = document.querySelectorAll('.project-360-text-wrapper');
    gsap.from(project360TextWrapper, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: project360TextWrapper,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let btn360Wrapper = document.querySelectorAll('.btn360-wrapper');
    gsap.from(btn360Wrapper, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: btn360Wrapper,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let projectPanoramicTextWrapper = document.querySelectorAll('.project-panoramic-text-wrapper');
    gsap.from(projectPanoramicTextWrapper, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: projectPanoramicTextWrapper,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let galleryTextWrapper = document.querySelectorAll('.gallery-text-wrapper');
    gsap.from(galleryTextWrapper, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: galleryTextWrapper,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let galleryTabs = document.querySelector('.gallery-tabs');
    gsap.from(galleryTabs.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
            trigger: galleryTabs.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let gallerySwiperSlider = document.querySelector('#gallery-slider-container');
    gsap.from(gallerySwiperSlider.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: gallerySwiperSlider.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let locationTextWrapper = document.querySelector('.location-text-wrapper');
    gsap.from(locationTextWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: locationTextWrapper.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let locationImageWrapper = document.querySelector('.location-image-wrapper');
    gsap.from(locationImageWrapper, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: locationImageWrapper,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let locationButtonContainer = document.querySelector('.location-button-container');
    gsap.from(locationButtonContainer.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: locationButtonContainer.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let lifestyleTextWrapper = document.querySelector('.lifestyle-text-wrapper');
    gsap.from(lifestyleTextWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: lifestyleTextWrapper.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let lifestyledistanceTextWrapper = document.querySelector('.lifestyle-distance-text-wrapper');
    gsap.from(lifestyledistanceTextWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: lifestyledistanceTextWrapper.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let lifestyledistanceWrapper = document.querySelector('.distance-wrapper .swiper-wrapper');
    gsap.from(lifestyledistanceWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: lifestyledistanceWrapper.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let lifestyleDistanceAnotherB = document.querySelector('.lifestyle-distance-another');
    gsap.from(lifestyleDistanceAnotherB.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: lifestyleDistanceAnotherB.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });


    let progressShowBarWrapper = document.querySelector('.progress-bar-wrapper');
    gsap.from(progressShowBarWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
            trigger: progressShowBarWrapper.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });



});