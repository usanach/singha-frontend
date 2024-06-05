document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);


    let contactUsSectiontextWrapper = document.querySelectorAll('.contact-us-section .text-wrapper');
    gsap.from(contactUsSectiontextWrapper, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: contactUsSectiontextWrapper,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });
});