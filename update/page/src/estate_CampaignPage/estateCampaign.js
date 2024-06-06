const swiperContent = [
    {
        image: "../../assets/images/CampaignAndPromotion/Image1352.png",
        promotionDate: "14 JULY 2023",
        promotionTitle: "THE EXTRO GIVING YOU EXTRA 12-14 พ.ค. นี้",
        promotionDesc: "เปิดชม Sales Gallery โฉมใหม่ที่ THE EXTRO พญาไท-รางน้ำคอนโดติดสวนกลางเมือง ทำเลศักยภาพใกล้ BTS อนุสาวรีย์ 400 เมตร ผสาน...",
    },
    {
        image: "../../assets/images/CampaignAndPromotion/Image1352.png",
        promotionDate: "17 JULY 2023",
        promotionTitle: "THE EXTRO GIVING YOU EXTRA 17-22 พ.ค. นี้",
        promotionDesc: "เปิดชม Sales Gallery โฉมใหม่ที่ THE EXTRO พญาไท-รางน้ำค คอนโดติดสวนกลางเมือง ทำเลศักยภาพใกล้ BTS อนุสาวรีย์ 600 เมตร ผสาน...",
    },
    {
        image: "../../assets/images/CampaignAndPromotion/Image1352.png",
        promotionDate: "26 JULY 2023",
        promotionTitle: "THE EXTRO GIVING YOU EXTRA 26-30 พ.ค. นี้",
        promotionDesc: "เปิดชม Sales Gallery โฉมใหม่ที่ THE EXTRO พญาไท-รางน้ำคอนโดติดสวนกลางเมือง ทำเลศักยภาพใกล้ BTS อนุสาวรีย์ 800 เมตร ผสาน...",
    }
];

const cardContent = [
    {
        image: "../../assets/images/CampaignAndPromotion/SHAWN.png",
        projectDate: "14 JULY 2023",
        projectTitle: "THE ESSE",
        projectDesc: "STYLISH FULLY FURNISHED UNITS from OLY by OLIVIA LIVING",
    },
    {
        image: "../../assets/images/CampaignAndPromotion/DS-1.png",
        projectDate: "20 JULY 2023",
        projectTitle: "THE ESSE",
        projectDesc: "STYLISH FULLY FURNISHED UNITS from OLY by OLIVIA LIVING",
    },
    {
        image: "../../assets/images/CampaignAndPromotion/INT_SPACE_OFFICE_VIEW-1.png",
        projectDate: "17 JULY 2023",
        projectTitle: "SMYT",
        projectDesc: "STYLISH FULLY FURNISHED UNITS from OLY by OLIVIA LIVING",
    },
    {
        image: "../../assets/images/CampaignAndPromotion/SHAWN.png",
        projectDate: "14 JULY 2023",
        projectTitle: "SIRANINN",
        projectDesc: "STYLISH FULLY FURNISHED UNITS from OLY by OLIVIA LIVING",
    },
    {
        image: "../../assets/images/CampaignAndPromotion/DS-1.png",
        projectDate: "17 JULY 2023",
        projectTitle: "THE ESSE",
        projectDesc: "STYLISH FULLY FURNISHED UNITS from OLY by OLIVIA LIVING",
    },
    {
        image: "../../assets/images/CampaignAndPromotion/INT_SPACE_OFFICE_VIEW-1.png",
        projectDate: "17 JULY 2023",
        projectTitle: "SMYT",
        projectDesc: "STYLISH FULLY FURNISHED UNITS from OLY by OLIVIA LIVING",
    },
    {
        image: "../../assets/images/CampaignAndPromotion/SHAWN.png",
        projectDate: "14 JULY 2023",
        projectTitle: "SMYT",
        projectDesc: "STYLISH FULLY FURNISHED UNITS from OLY by OLIVIA LIVING",
    },
    {
        image: "../../assets/images/CampaignAndPromotion/DS-1.png",
        projectDate: "17 JULY 2023",
        projectTitle: "SIRANINN",
        projectDesc: "STYLISH FULLY FURNISHED UNITS from OLY by OLIVIA LIVING",
    },
];

document.addEventListener("DOMContentLoaded", (event) => {
    // Get data to create swiper element
    const swiperWrapper1 = document.getElementById('swiper1');
    const swiperWrapper2 = document.getElementById('swiper2');
    const allPromotions = document.getElementById('all-promotions');
    const projectAllItem = document.getElementById('project-allitem');
    const projectItem = document.getElementById('project-item');
    const loadmoreBtn = document.getElementById('loadmore');
    const pagination = document.getElementById('pagination');
    const pageNumberElement = document.getElementById('page-number');

    let cardNumber = 6;
    const totalCards = cardContent.length;

    projectAllItem.textContent = `${totalCards} CAMPAIGN`;
    projectItem.textContent = `(${cardNumber}/${totalCards})`;

    const generateCards = (start, end) => {
        for (let i = start; i < end && i < totalCards; i++) {
            const card =
                `<div class="campaign-card">
                    <img class="campaign-image" src="${cardContent[i].image}" alt="promotion" />
                    <div class="campaign-text-wrapper">
                        <div class="color-tab"></div>
                        <div class="campaign-desc">
                            <p class="project-title">${cardContent[i].projectTitle}</p>
                            <p class="project-desc">${cardContent[i].projectDesc}</p>
                            <div class="time">
                                <div class="time-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        stroke="#707070">
                                        <path d="M12 7V12L13.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </div>
                                <div class="campaings-date">
                                    <p class="project-date">${cardContent[i].projectDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            allPromotions.insertAdjacentHTML('beforeend', card);
            // allPromotions.innerHTML += `${card}`;
        }
        animateCards();
    };

    const generateCards1 = (start, end) => {
        for (let i = start; i < end && i < totalCards; i++) {
            const card =
                `<div class="campaign-card new-card">
                    <img class="campaign-image" src="${cardContent[i].image}" alt="promotion" />
                    <div class="campaign-text-wrapper">
                        <div class="color-tab"></div>
                        <div class="campaign-desc">
                            <p class="project-title">${cardContent[i].projectTitle}</p>
                            <p class="project-desc">${cardContent[i].projectDesc}</p>
                            <div class="time">
                                <div class="time-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        stroke="#707070">
                                        <path d="M12 7V12L13.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </div>
                                <div class="campaings-date">
                                    <p class="project-date">${cardContent[i].projectDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            allPromotions.insertAdjacentHTML('beforeend', card);
            // allPromotions.innerHTML += `${card}`;
        }
        animateCards1();
    };

    generateCards(0, cardNumber);

    loadmoreBtn.addEventListener('click', () => {
        generateCards1(cardNumber, cardNumber + 3);
        cardNumber += 3;
        projectItem.textContent = `(${Math.min(cardNumber, totalCards)}/${totalCards})`;
        if (cardNumber >= totalCards) {
            loadmoreBtn.disabled = true; // Disable button if no more cards to load
        }
    });


    if (!swiperWrapper1 || !swiperWrapper2 || !pagination) {
        console.error("Required elements not found");
        return;
    }

    for (let i = 0; i < swiperContent.length; i++) {
        const slideImageContent = `
            <div class="swiper-slide">
                <img class="banner-img" src="${swiperContent[i].image}" alt="banner" />
            </div>`;

        const slideTextContent = `
            <div class="swiper-slide">
                <div class="banner-promotions-text-wrapper wrapper-space-bottom">
                    <div class="banner-promotions-date-wrapper">
                        <p class="banner-promotion-date">PROMOTIONS</p>
                        <p class="banner-promotion-date banner-promotion-date1" style="margin-left: 0.3rem;">
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="4" cy="4" r="4" fill="#696969" />
                            </svg>
                        </p>
                        <p class="banner-promotion-date banner-promotion-date1">${swiperContent[i].promotionDate}</p>
                    </div>
                    <div class="banner-promotions-title-wrapper wrapper-space-bottom">
                        <h2 class="banner-promotion-title">${swiperContent[i].promotionTitle}</h2>
                    </div>
                    <div class="banner-promotions-desc-wrapper wrapper-space-bottom">
                        <p class="banner-promotion-desc">${swiperContent[i].promotionDesc}</p>
                    </div>
                </div>
                <p class="banner-promotion-date2">${swiperContent[i].promotionDate}</p>
                <div class="btn-wrapper wrapper-space-bottom">
                    <button type="button" class="explore-btn">
                        <p>Explore more</p>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#948667" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.29289 4.29289C8.68342 3.90237 9.31658 3.90237 9.70711 4.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L9.70711 19.7071C9.31658 20.0976 8.68342 20.0976 8.29289 19.7071C7.90237 19.3166 7.90237 18.6834 8.29289 18.2929L14.5858 12L8.29289 5.70711C7.90237 5.31658 7.90237 4.68342 8.29289 4.29289Z" />
                        </svg>
                    </button>
                </div>
            </div>`;

        // Append the slide elements to the Swiper wrappers
        const pagElement = `<div class="pag"></div>`;

        swiperWrapper1.insertAdjacentHTML('beforeend', slideImageContent);
        swiperWrapper2.insertAdjacentHTML('beforeend', slideTextContent);
        pagination.insertAdjacentHTML('beforeend', pagElement);
    }


    const swiperConfig = {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 5000, // Delay between slides in milliseconds (5 seconds in this example)
            disableOnInteraction: false, // Continue autoplay even when user interacts with slides
        },
        navigation: {
            nextEl: '#pagination-btn-right',
            prevEl: '#pagination-btn-left',
        },
        breakpoints: {
            991: {
                allowTouchMove: false, // Disable swiping for width >= 991px
            },
            0: {
                allowTouchMove: true, // Enable swiping for width < 991px
            }
        }
    };
    
    const swiper1 = new Swiper('.swiper-container1', swiperConfig);
    const swiper2 = new Swiper('.swiper-container2', swiperConfig);
    
    const pagElements = document.querySelectorAll('.pag');
    
    const updatePagination = (index) => {
        pagElements.forEach((pag, idx) => {
            if (idx === index) {
                pag.classList.add('active');
            } else {
                pag.classList.remove('active');
            }
        });
    };
    
    const updatePageNumber = (swiper) => {
        const currentIndex = (swiper.realIndex % swiperContent.length);
        pageNumberElement.textContent = `${currentIndex + 1}/${swiperContent.length}`;
        updatePagination(currentIndex);
    };
    
    swiper1.on('slideChangeTransitionEnd', () => {
        // Only change swiper2 slide if it's different from swiper1's current slide
        if (swiper2.realIndex !== swiper1.realIndex) {
            swiper2.slideTo(swiper1.realIndex);
        }
        updatePageNumber(swiper1);
    });
    
    swiper2.on('slideChangeTransitionEnd', () => {
        // Only change swiper1 slide if it's different from swiper2's current slide
        if (swiper1.realIndex !== swiper2.realIndex) {
            swiper1.slideTo(swiper2.realIndex);
        }
        updatePageNumber(swiper2);
    });
    
    // Update the initial page number and pagination
    updatePageNumber(swiper1);
    updatePageNumber(swiper2);
});
