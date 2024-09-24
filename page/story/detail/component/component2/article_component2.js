document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let article2Wrapper = document.querySelectorAll('.article-2 .article-2-wrapper');
    if (article2Wrapper.length > 1) {
        for(i=0;i<article2Wrapper.length;i++) {
            gsap.from(article2Wrapper[i].children, {
                opacity: 0,
                y: 20,
                duration: 1,
                stagger: 0.4,
                scrollTrigger: {
                    trigger: article2Wrapper[i].children,
                    start: "top 80%",
                    toggleActions: "play none none none",
                    once: true
                }
            });
        }
    } else {
        let article2Wrapper = document.querySelector('.article-2 .article-2-wrapper');
        gsap.from(article2Wrapper.children, {
            opacity: 0,
            y: 20,
            duration: 1,
            stagger: 0.4,
            scrollTrigger: {
                trigger: article2Wrapper.children,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true
            }
        });
    }
    
});