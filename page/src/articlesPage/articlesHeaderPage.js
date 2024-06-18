document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    let articleBannerTextWrapper = document.querySelector('.article-banner-text-wrapper');
    gsap.from(articleBannerTextWrapper.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: articleBannerTextWrapper.children,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let articleHeaderTextContainer = document.querySelector('.article-header-text-container');
    gsap.from(articleHeaderTextContainer.children, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: articleHeaderTextContainer.children,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true
        }
    });

    let st = ScrollTrigger.create({
        trigger: ".banner-wrapper",
        start: "top",
        end: "+=500",
        pinSpacing: false,
        pin: true,
    });



    if (document.getElementById('social-mobile') !== null) {
        console.log('true');
        let socialMobileBtn = document.getElementById('social-mobile');
        let socialMobileElements = document.querySelectorAll('.social-mobile-block:not(:first-child)'); // Select all except the first
    
        socialMobileBtn.addEventListener('click', () => {
            for (let i = 0; i < socialMobileElements.length; i++) {
                if (socialMobileElements[i].style.opacity === '1') {
                    socialMobileElements[i].style.opacity = 0;
                    socialMobileElements[i].style.marginBottom = '-100px';
                    socialMobileElements[i].style.zIndex = 0;
                } else {
                    socialMobileElements[i].style.opacity = 1;
                    socialMobileElements[i].style.marginBottom = '0';
                    socialMobileElements[i].style.zIndex = 65;
                }
            }
            console.log('click');
        });
    } else {
        console.log('false');
    }
    
    
});