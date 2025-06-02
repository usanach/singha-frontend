
const { createApp, defineComponent, ref, onMounted, nextTick } = Vue;
const axios = window.axios; // Assuming axios is available globally, or you can import axios in a module-based setup
const RECAPTCHA_KEY = "6LevUS0nAAAAAInOUaytl6bgNgWFE4FQt2yofWyZ"

// const recap = document.getElementById('recap')
// if(recap){
//     recap.src=`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_KEY}`;
//     window.grecaptcha.ready(function () {
//         window.recaptcha = window.grecaptcha;
//     });
// }

// Define the Header component
const HeaderComponent = defineComponent({
    name: 'HeaderComponent',
    template: `
    <div id="header" class="w-full" data-submenu="SMYTH’S Projects">
        <div class="wrapper" v-html="template">
        </div>
    </div>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language
        const title = ref('SMYTH’S Projects');

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const loadTemplate = async (lang) => {
            try {
                const headerData = await axios.get('/page/smyth/component/header/header.json');
                const data = await headerData.data;

                const templateResponse = await axios.get('/component/header/template-2.html');
                let templateContent = templateResponse.data;

                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{url}}/g, window.location.pathname.includes('/en') ? window.location.pathname.replace('/en', '') : window.location.pathname.replace('/th', ''))
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, title.value)
                    .replace(/{{#menu}}([\s\S]*?){{\/menu}}/, (match, sections) => {
                        return data.filter(section => section.type == 'section').map((section, i) => {
                            return sections
                                .replace(/{{menu.target}}/g, section.url.target)
                                .replace(/{{menu.title}}/g, section.title[lang])
                                .replace(/{{menu.url}}/g, section.url[lang])
                                .replace(/{{menu.active}}/g, i == 0 ? "active" : "")
                        }).join("")
                    })
                    .replace(/{{#menu.link}}([\s\S]*?){{\/menu.link}}/, (match, sections) => {
                        return data.filter(section => section.type == 'page').map((section, i) => {
                            return sections
                                .replace(/{{menu.target}}/g, section.url.target)
                                .replace(/{{menu.title}}/g, section.title[lang])
                                .replace(/{{menu.url}}/g, section.url[lang])
                                .replace(/{{menu.active}}/g, i == 0 ? "active" : "")
                        }).join("")
                    })
                    .replace(/{{#swipe}}([\s\S]*?){{\/swipe}}/, (match, swipe) => {
                        return data.filter((item, i) => {
                            return item.type == "section"
                        }).map((item, i) => {
                            return swipe
                                .replace(/{{swipe.index}}/g, i)
                                .replace(/{{swipe.title}}/g, item.title[lang])
                                .replace(/{{#swipe.slide}}([\s\S]*?){{\/swipe.slide}}/, (match, slide) => {
                                    return item.items.map((data, i) => {
                                        if (data.label) {
                                            return slide
                                                .replace(/{{swipe.slide.target}}/g, data.url.target)
                                                .replace(/{{swipe.slide.label}}/g, data.label)
                                                .replace(/{{swipe.slide.title}}/g, item.title[lang])
                                                .replace(/{{swipe.slide.link}}/g, data.url[lang])
                                                .replace(/{{swipe.slide.brands}}/g, data.title[lang])
                                                .replace(/{{swipe.slide.type}}/g, data.type[lang])
                                                .replace(/{{swipe.slide.location}}/g, data.location[lang])
                                                .replace(/{{swipe.slide.image}}/g, data.thumb)
                                                .replace(/{{swipe.slide.price}}/g, data.price);
                                        } else {
                                            return slide
                                                .replace(/{{swipe.slide.target}}/g, data.url.target)
                                                .replace(/{{swipe.slide.label}}/g, data.label ? data.label : "")
                                                .replace(/{{swipe.slide.title}}/g, item.title[lang])
                                                .replace(/{{swipe.slide.link}}/g, data.url[lang])
                                                .replace(/{{swipe.slide.brands}}/g, data.title[lang])
                                                .replace(/{{swipe.slide.type}}/g, data.type[lang])
                                                .replace(/{{swipe.slide.location}}/g, data.location[lang])
                                                .replace(/{{swipe.slide.image}}/g, data.thumb)
                                                .replace(/{{swipe.slide.price}}/g, data.price ? data.price : "");
                                        }

                                    }).join("")
                                });
                        }).join("")
                    })
                    .replace(/{{#swipeSub}}([\s\S]*?){{\/swipeSub}}/, (match, swipeSub) => {
                        return data.filter((item, i) => {
                            return item.title['en'] == "SMYTH’S Projects"
                        }).map((item, i) => {
                            return swipeSub
                                .replace(/{{swipeSub.index}}/g, i)
                                .replace(/{{swipeSub.title}}/g, item.title[lang])
                                .replace(/{{#swipeSub.slide}}([\s\S]*?){{\/swipeSub.slide}}/, (match, slide) => {
                                    return item.items.map((data, i) => {
                                        return slide
                                            .replace(/{{swipeSub.slide.target}}/g, data.url.target)
                                            .replace(/{{swipeSub.slide.label}}/g, data.label ? data.label : "")
                                            .replace(/{{swipeSub.slide.title}}/g, item.title[lang])
                                            .replace(/{{swipeSub.slide.link}}/g, data.url[lang])
                                            .replace(/{{swipeSub.slide.brands}}/g, data.title[lang])
                                            .replace(/{{swipeSub.slide.type}}/g, data.type[lang])
                                            .replace(/{{swipeSub.slide.location}}/g, data.location[lang])
                                            .replace(/{{swipeSub.slide.image}}/g, data.thumb)
                                            .replace(/{{swipeSub.slide.price}}/g, data.price);
                                    }).join("")
                                });
                        }).join("")
                    })
                    .replace(/{{#menuM}}([\s\S]*?){{\/menuM}}/, (match, menuM) => {
                        return data.filter(section => section.type == 'section').map((section, i) => {
                            return menuM
                                .replace(/{{menuM.title}}/g, section.title[lang])
                                .replace(/{{menuM.target}}/g, section.url.target)
                                .replace(/{{menuM.url}}/g, section.url[lang])
                                .replace(/{{menuM.active}}/g, i == 0 ? "active" : "")
                                .replace(/{{#swipeM}}([\s\S]*?){{\/swipeM}}/, (match, swipe) => {
                                    return data.filter((item, i) => {
                                        return item.title['en'] == section.title['en']
                                    }).map((item, i) => {
                                        return swipe
                                            .replace(/{{swipeM.index}}/g, i)
                                            .replace(/{{swipeM.title}}/g, item.title[lang])
                                            .replace(/{{#swipeM.slide}}([\s\S]*?){{\/swipeM.slide}}/, (match, slide) => {
                                                return item.items.map((data, i) => {
                                                    return slide
                                                        .replace(/{{swipeM.slide.target}}/g, data.url.target)
                                                        .replace(/{{swipeM.slide.label}}/g, data.label ? data.label : "")
                                                        .replace(/{{swipeM.slide.title}}/g, item.title[lang])
                                                        .replace(/{{swipeM.slide.link}}/g, data.url[lang])
                                                        .replace(/{{swipeM.slide.brands}}/g, data.title[lang])
                                                        .replace(/{{swipeM.slide.type}}/g, data.type[lang])
                                                        .replace(/{{swipeM.slide.location}}/g, data.location[lang])
                                                        .replace(/{{swipeM.slide.image}}/g, data.thumb)
                                                        .replace(/{{swipeM.slide.price}}/g, data.price);
                                                }).join("")
                                            });
                                    }).join("")
                                })
                        }).join("")
                    })
                    .replace(/{{#menuM.link}}([\s\S]*?){{\/menuM.link}}/, (match, menuM) => {
                        return data.filter(section => section.type == 'page').map((section, i) => {
                            return menuM
                                .replace(/{{menuM.link.title}}/g, section.title[lang])
                                .replace(/{{menuM.link.url}}/g, section.url[lang])
                        }).join("")
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();
        }

        onMounted(async () => {
            language.value = getLanguageFromPath();
            await loadTemplate(language.value);

            nextTick(() => {
                init();  // ScrollTrigger is initialized after template is loaded and DOM is updated


                const subHeader = document.querySelector('.sub-header');
                if (subHeader) {
                    if (window.innerWidth < 1024) {
                        ScrollTrigger.create({
                            trigger: "body",
                            pin: "#header .wrapper",
                            start: "top top",
                            pinSpacing: false,
                        });
                    }
                } else {
                    ScrollTrigger.create({
                        trigger: "body",
                        pin: "#header .wrapper",
                        start: "top top",
                        pinSpacing: false,
                    });
                }
                ScrollTrigger.create({
                    trigger: "body",
                    start: "+=70 top",
                    scrub: 1,
                    onUpdate: (self) => {
                        if (self.progress > 0) {
                            document.querySelector('.header-bg .bg-custom').classList.add('!opacity-80');
                            // document.querySelector('.header-bg').classList.remove('bg-[#1A2F4D]');
                            document.querySelector('.header-bg .animate-h').classList.add('md:h-[70px]');
                            document.querySelector('.header-bg .animate-h').classList.remove('md:h-[60px]');
                        } else {
                            // document.querySelector('.header-bg').classList.add('bg-[#1A2F4D]');
                            // document.querySelector('.header-bg').classList.remove('bg-[#1A2F4D]/75');
                            document.querySelector('.header-bg .bg-custom').classList.remove('!opacity-80');
                            document.querySelector('.header-bg .animate-h').classList.remove('md:h-[70px]');
                            document.querySelector('.header-bg .animate-h').classList.add('md:h-[60px]');
                        }
                    }
                });
            });
        });

        return { template, language };
    }
});

// ``
var headerSwiper, headerSubmenuSwiper, headerSwiperM;

function toggleSubmenu() {
    document.querySelector('body').classList.add('overflow-hidden');
    document.querySelector('#header .wrapper').classList.add('wrapped');
    toggleHeaderSubmenu();
    headerSubmenuSwiper = new Swiper("#header-sub-menu .swiper", {
        slidesPerView: 4,
        spaceBetween: 40,
        freeMode: true
    });
    checkModalOpen();
}
function toggleMenuList() {
    document.querySelector('body').classList.add('overflow-hidden');
    document.querySelector('#header .wrapper').classList.add('wrapped');
    toggleHeaderMenu();
    checkModalOpen();
    // headerSwiper = new Swiper("#header-menu .header-swiper", {
    //     slidesPerView: 3,
    //     spaceBetween: 40,
    //     freeMode: true
    // });
    const headerMenu = document.querySelectorAll('#header-menu .header-menu-list li');
    headerSwipe = document.querySelectorAll('#header-menu .swiper');

    for (let index = 0; index < headerSwipe.length; index++) {
        headerSwipe[index].classList.add('hidden');
        headerSwipe[index] = new Swiper(`#header-menu .swiper-${index}`, {
            slidesPerView: 'auto',
            spaceBetween: 40,
            freeMode: true
        });
        headerSwipe[0].classList.remove('hidden');
    }
    for (var i = 0; i < headerMenu.length; i++) {
        headerMenu[i].addEventListener('mouseenter', function (event) {

            for (let index = 0; index < headerSwipe.length; index++) {
                headerSwipe[index].classList.add('hidden');
            }
            for (var i = 0; i < headerMenu.length; i++) {
                headerMenu[i].classList.remove('active');
            }
            if (document.querySelector(`#header-menu .swiper[data-swipe='${event.target.dataset['swipe']}']`)) {
                document.querySelector(`#header-menu .swiper[data-swipe='${event.target.dataset['swipe']}']`).classList.remove('hidden');
            }
            event.target.classList.add('active');
            event.preventDefault();
        });
    }
    const headerMenuMobile = document.querySelectorAll('#header #header-menu-m .header-menu-list li');
    if (headerMenuMobile) {
        for (var i = 0; i < headerMenuMobile.length; i++) {
            headerMenuMobile[i].addEventListener('click', function (event) {
                for (var i = 0; i < headerMenuMobile.length; i++) {
                    headerMenuMobile[i].classList.remove('active');
                }
                headerSwiperM = new Swiper(`#header-menu-m .swiper[data-swipe="${this.dataset['swipe']}"]`, {
                    slidesPerView: 1,
                    spaceBetween: 5,
                    freeMode: true
                });
                this.classList.add('active');
                // event.preventDefault();
            });
        }
    }
}
function toggleLang() {
    openLang();
    document.getElementById('header-menu').classList.remove('open');
    document.getElementById('header-menu-m').classList.remove('open');
    document.querySelector('.burgerbar').classList.remove('open');
    document.getElementById('header-sub-menu').classList.remove('open');
    document.querySelector('body').classList.remove('overflow-hidden');
}
function checkModalOpen() {
    if (document.getElementById('header-sub-menu').classList.contains('open')
        || document.getElementById('header-menu-m').classList.contains('open')
        || document.getElementById('header-menu').classList.contains('open')) {
        document.querySelector('body').classList.add('overflow-hidden');
        document.querySelector('#header .wrapper').classList.add('wrapped');
    } else {
        document.querySelector('body').classList.remove('overflow-hidden');
        setTimeout(() => {
            document.querySelector('#header .wrapper').classList.remove('wrapped');
        }, 1000);
    }
}
function toggleHeaderMenu() {
    document.getElementById('header-menu').classList.toggle('open');
    document.getElementById('header-menu-m').classList.toggle('open');
    document.querySelector('.burgerbar').classList.toggle('open');

    document.querySelector('.lang-expand').classList.add('hidden');
    document.querySelector('.lang-btn .icon').classList.remove('rotate-180');


    document.getElementById('header-sub-menu').classList.remove('open');
    const arrow = document.querySelector('#header .submenu svg')
    arrow.classList.remove('rotate-180');

    var headerMenu = document.querySelectorAll('#header-menu .header-menu-list li');
    for (var i = 0; i < headerMenu.length; i++) {
        headerMenu[i].classList.remove('active');
        event.preventDefault();
    }
    setTimeout(() => {
        headerMenu[0].classList.add('active');
    }, 300);
}

function toggleHeaderSubmenu() {
    document.getElementById('header-menu').classList.remove('open');
    document.getElementById('header-menu-m').classList.remove('open');
    document.querySelector('.burgerbar').classList.remove('open');
    document.getElementById('header-sub-menu').classList.toggle('open');

    document.querySelector('.lang-expand').classList.add('hidden');
    document.querySelector('.lang-btn .icon').classList.remove('rotate-180');

    const arrow = document.querySelector('#header .submenu svg')
    arrow.classList.toggle('rotate-180');
}

function openLang() {
    document.querySelector('.lang-expand').classList.toggle('hidden');
    document.querySelector('.lang-btn .icon').classList.toggle('rotate-180');
}

function selectCard(ev) {
    var tracking = {
        event: "select_property",
        landing_page: landing_page,
        section: "header",
        event_action: "click",
    }
    ev.dataset["property_brand"] != "" && ev.dataset["property_brand"] != "undefined" ? tracking.property_brand = ev.dataset["property_brand"] : ""
    ev.dataset["project_label"] != "" && ev.dataset["project_label"] != "undefined" ? tracking.project_label = ev.dataset["project_label"].toLowerCase().replace(/ /g, "_") : ""
    ev.dataset["property_type"] != "" && ev.dataset["property_type"] != "undefined" ? tracking.property_type = ev.dataset["property_type"] : ""
    ev.dataset["property_location"] != "" && ev.dataset["property_location"] != "undefined" ? tracking.property_location = ev.dataset["property_location"] : ""
    ev.dataset["property_price"] != "" && ev.dataset["property_price"] != "undefined" ? tracking.property_price = ev.dataset["property_price"] : ""

    setDataLayer(tracking);
    window.open(ev.dataset['href'], ev.dataset["target"]);
}
function selectMenu(ev) {
    var tracking = {
        event: "click_sub_header",
        landing_page: landing_page,
        section: "header",
        event_action: "click",
        sub_header: ev.dataset["sub_header"]
    }
    setDataLayer(tracking);
    window.open(ev.dataset['href'], '_self');
}
function setDataLayer(data) {
    dataLayer.push(data);
}
