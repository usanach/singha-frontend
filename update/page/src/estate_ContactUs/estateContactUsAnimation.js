document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let contactDetailWrapper = document.querySelector('.contact-detail-wrapper');
    gsap.from(contactDetailWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: contactDetailWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let emailCallWrapper = document.querySelector('.email-call-wrapper');
    gsap.from(emailCallWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: emailCallWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let headerText = document.querySelector('.contact-section');
    gsap.from(headerText.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: headerText.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let mapSection = document.querySelector('.contact-main .map-section');
    gsap.from(mapSection, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: mapSection,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });
});
