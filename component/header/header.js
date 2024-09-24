
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
            slidesPerView: 3,
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
            document.querySelector(`#header-menu .swiper[data-swipe='${event.target.dataset['swipe']}']`).classList.remove('hidden');
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
        property_brand: ev.dataset["property_brand"],
        project_label: ev.dataset["project_label"],
        property_type: ev.dataset["property_type"],
        property_location: ev.dataset["property_location"],
        property_price: ev.dataset["property_price"]
    }
    setDataLayer(tracking);
}
function selectMenu(ev) {
    var tracking = {
        event: "click_sub_header",
        landing_page: landing_page,
        section: "header",
        event_action: "click",
        sub_header: ev.dataset["sub-header"]
    }
    setDataLayer(tracking);
}
function setDataLayer(data) {
    dataLayer.push(data);
}

const { createApp, defineComponent, ref, onMounted, nextTick } = Vue;
const axios = window.axios; // Assuming axios is available globally, or you can import axios in a module-based setup

// Define the Header component
const HeaderComponent = defineComponent({
    name: 'HeaderComponent',
    template: `
    <div id="header" class="w-full" data-submenu="property collection" data-sublink="/collection.html">
        <div class="wrapper" v-html="template">
        </div>
    </div>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const loadTemplate = async (lang) => {
            try {
                const headerData = await axios.get('/data/header.json');
                const data = await headerData.data;

                const templateResponse = await axios.get('/component/header/template.html');
                let templateContent = templateResponse.data;

                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{url}}/g, window.location.pathname.includes('/en') ? window.location.pathname.replace('/en', '') : window.location.pathname.replace('/th', ''))
                    .replace(/{{language}}/g, lang)
                    .replace(/{{#menu}}([\s\S]*?){{\/menu}}/, (match, p1) => {
                        return data.map((item, i) => p1
                            .replace(/{{menu.name}}/g, item.name)
                            .replace(/{{menu.active}}/g, i == 0 ? "active" : "")).join('');
                    })
                    .replace(/{{#swipe}}([\s\S]*?){{\/swipe}}/, (match, swipe) => {
                        return data.filter((item, i) => {
                            return item.data.length > 0
                        }).map((item, i) => {
                            return swipe
                                .replace(/{{swipe.index}}/g, i)
                                .replace(/{{swipe.name}}/g, item.name)
                                .replace(/{{#swipe.slide}}([\s\S]*?){{\/swipe.slide}}/, (match, slide) => {
                                    return item.data.filter((data, i) => {
                                        return item.name == data.name
                                    }).map((data, i) => {
                                        return slide
                                            .replace(/{{swipe.slide.name}}/g, data.name)
                                            .replace(/{{swipe.slide.link}}/g, data.link)
                                            .replace(/{{swipe.slide.label}}/g, data.data['label'])
                                            .replace(/{{swipe.slide.brands}}/g, data.data['brands'])
                                            .replace(/{{swipe.slide.type}}/g, data.data['type'])
                                            .replace(/{{swipe.slide.location}}/g, data.data['location'])
                                            .replace(/{{swipe.slide.price}}/g, data.data['price'])
                                            .replace(/{{swipe.slide.image}}/g, data.data['s']);
                                    }).join("")
                                });
                        }).join("")
                    })
                    .replace(/{{#swipeSub}}([\s\S]*?){{\/swipeSub}}/, (match, swipe) => {
                        return data.filter((item, i) => {
                            return i == 0
                        }).map((item, i) => {
                            return swipe
                                .replace(/{{swipeSub.index}}/g, i)
                                .replace(/{{swipeSub.name}}/g, item.name)
                                .replace(/{{#swipeSub.slide}}([\s\S]*?){{\/swipeSub.slide}}/, (match, slide) => {
                                    return item.data.filter((data, i) => {
                                        return item.name == data.name
                                    }).map((data, i) => {
                                        return slide
                                            .replace(/{{swipeSub.slide.name}}/g, data.name)
                                            .replace(/{{swipeSub.slide.link}}/g, data.link)
                                            .replace(/{{swipeSub.slide.label}}/g, data.data['label'])
                                            .replace(/{{swipeSub.slide.brands}}/g, data.data['brands'])
                                            .replace(/{{swipeSub.slide.type}}/g, data.data['type'])
                                            .replace(/{{swipeSub.slide.location}}/g, data.data['location'])
                                            .replace(/{{swipeSub.slide.price}}/g, data.data['price'])
                                            .replace(/{{swipeSub.slide.image}}/g, data.data['s']);
                                    }).join("")
                                });
                        }).join("")
                    })
                    .replace(/{{#menuM}}([\s\S]*?){{\/menuM}}/, (match, menuM) => {
                        return data.map((item, i) => menuM
                            .replace(/{{name}}/g, item.name)
                            .replace(/{{active}}/g, i == 0 ? "active" : "")
                            .replace(/{{#swipeM}}([\s\S]*?){{\/swipeM}}/, (match, swipe) => {
                                return data.filter((data, i) => {
                                    return item.data.length > 0
                                }).filter((data, i) => {
                                    return item.name == data.name
                                }).map((data, i) => {
                                    return swipe
                                        .replace(/{{swipeM.index}}/g, i)
                                        .replace(/{{swipeM.name}}/g, item.name)
                                        .replace(/{{#swipeM.slide}}([\s\S]*?){{\/swipeM.slide}}/, (match, slide) => {
                                            return item.data.filter((data, i) => {
                                                return item.name == data.name
                                            }).map((data, i) => {
                                                return slide
                                                    .replace(/{{swipeM.slide.name}}/g, data.name)
                                                    .replace(/{{swipeM.slide.label}}/g, data.data['label'])
                                                    .replace(/{{swipeM.slide.brands}}/g, data.data['brands'])
                                                    .replace(/{{swipeM.slide.type}}/g, data.data['type'])
                                                    .replace(/{{swipeM.slide.location}}/g, data.data['location'])
                                                    .replace(/{{swipeM.slide.price}}/g, data.data['price'])
                                                    .replace(/{{swipeM.slide.s}}/g, data.data['s']);
                                            }).join("")
                                        })
                                })
                            })
                        ).join('');
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();
            ScrollTrigger.create({
                trigger: "body",
                pin: "#header .wrapper",
                start: "top top",
                pinSpacing: false,
                scrub: 1,
            });
            ScrollTrigger.create({
                trigger: "body",
                start: "+=70 top",
                scrub: 1,
                onUpdate: (self) => {
                    if (self.progress > 0) {
                        document.querySelector('.header-bg .bg-gradient').classList.add('!opacity-80');
                        // document.querySelector('.header-bg').classList.remove('bg-[#1A2F4D]');
                        document.querySelector('.header-bg .animate-h').classList.add('md:h-[70px]');
                        document.querySelector('.header-bg .animate-h').classList.remove('md:h-[60px]');
                    } else {
                        // document.querySelector('.header-bg').classList.add('bg-[#1A2F4D]');
                        // document.querySelector('.header-bg').classList.remove('bg-[#1A2F4D]/75');
                        document.querySelector('.header-bg .bg-gradient').classList.remove('!opacity-80');
                        document.querySelector('.header-bg .animate-h').classList.remove('md:h-[70px]');
                        document.querySelector('.header-bg .animate-h').classList.add('md:h-[60px]');
                    }
                }
            });
        }

        onMounted(async () => {
            language.value = getLanguageFromPath();
            await loadTemplate(language.value);

            nextTick(() => {
                init();  // ScrollTrigger is initialized after template is loaded and DOM is updated
            });
        });

        return { template, language };
    }
});
