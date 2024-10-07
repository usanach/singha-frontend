// Define the Header component
const DiscoveryComponent = defineComponent({
    name: 'DiscoveryComponent',
    template: `<section v-html="template" id="DiscoveryComponent"></section>`,

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
                const title = {
                    en: "DISCOVERY OUR COLLECTIONS",
                    th: "พบกับหลากหลายโครงการคุณภาพ"
                }
                const detail = {
                    th: `​โครงการที่พักอาศัยจาก สิงห์ เอสเตท มอบความหลากหลายให้คุณ ด้วย บ้านเดี่ยว ไพรเวทเอสเตท โฮมออฟฟิศ และคอนโดมิเนียม ผ่านความตั้งใจที่จะตอบโจทย์ทุกความต้องการด้วยแบรนด์ที่แตกต่าง ที่สะท้อนเอกลักษณ์ของเจ้าของบ้าน​`,
                    en: `Experience in the pinnacle of luxury living with our exclusive collection of properties. Singha Estate offers a curated selection of residences, from exquisite single detached houses, distinguished private estates, home offices, and premier condominiums. Each property is tailored to reflect the unique personality ​`
                }
                const data = [{
                    "name": "siraninn Residences",
                    "link": "https://residential.singhaestate.co.th/th/singlehouse/siraninn/pattanakarn",
                    "brands": "SIRANINN",
                    "location": "Pattanakarn",
                    "detail": "True Legacy Lives Now",
                    "image": {
                        "l": "/assets/image/residential/collection/siraninn - home-banner.webp",
                        "s": "/assets/image/residential/collection/siraninn.webp"
                    }
                }, {
                    "name": "s’rin",
                    "link": "https://residential.singhaestate.co.th/singlehouse/srin/ratchapruek-sai1",
                    "brands": "S’RIN",
                    "location": "Ratchaphruek - Sai1",
                    "detail": "INFINITE LIVING",
                    "image": {
                        "l": "/assets/image/residential/collection/srin - home-banner.webp",
                        "s": "/assets/image/residential/collection/srin.webp"
                    }
                }, {
                    "name": "shawn",
                    "link": "https://residential.singhaestate.co.th/singlehouse/shawn/panya-indra",
                    "brands": "SHAWN",
                    "location": "Panya Indra",
                    "detail": "Live SHAWN Way",
                    "image": {
                        "l": "/assets/image/residential/collection/shawn panya - home-banner.webp",
                        "s": "/assets/image/residential/collection/shawn panya.webp"
                    }
                }, {
                    "name": "shawn",
                    "link": "https://residential.singhaestate.co.th/singlehouse/shawn/wongwaen-chatuchot",
                    "brands": "SHAWN",
                    "location": "Wongwaen – Chatuchot",
                    "detail": "Live SHAWN Way",
                    "image": {
                        "l": "/assets/image/residential/collection/shawn wongwaen - home-banner.webp",
                        "s": "/assets/image/residential/collection/shawn wong.webp"
                    }
                }, {
                    "name": "extro",
                    "link": "https://residential.singhaestate.co.th/th/condo/the-extro/phayathai-rangnam",
                    "brands": "extro",
                    "location": "phayathai rangnam",
                    "detail": "Living Extra",
                    "image": {
                        "l": "/assets/image/residential/collection/extro - home-banner.webp",
                        "s": "/assets/image/residential/collection/extro.webp"
                    }
                }];
                const templateResponse = await axios.get('/page/home/component/discovery/template.html');
                let templateContent = templateResponse.data;

                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{#slideDetail}}([\s\S]*?){{\/slideDetail}}/, (match, slide) => {
                        return data.map((item, i) => {
                            return slide
                                .replace(/{{slideDetail.name}}/g, item.name)
                                .replace(/{{slideDetail.location}}/g, item.location)
                                .replace(/{{slideDetail.link}}/g, item.link)
                                .replace(/{{slideDetail.detail}}/g, item.detail)
                        }).join("")
                    })
                    .replace(/{{#slideImg}}([\s\S]*?){{\/slideImg}}/, (match, slide) => {
                        return data.map((item, i) => {
                            return slide
                                .replace(/{{slideImg.image.l}}/g, item.image.l)
                                .replace(/{{slideImg.image.s}}/g, item.image.s)
                                .replace(/{{slideImg.name}}/g, item.name)
                                .replace(/{{slideImg.location}}/g, item.location)
                                .replace(/{{slideImg.link}}/g, item.link)
                        }).join("")
                    })
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
                    .replace(/{{detail}}/g, lang == 'en' ? detail['en'] : detail['th'])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();
            var collectionSwiper = new Swiper("#DiscoveryComponent .collection-slide", {
                pagination: {
                    el: "#DiscoveryComponent .collection-slide .hero-progress-bar",
                    type: "progressbar",
                },
                navigation: {
                    nextEl: "#DiscoveryComponent .collection-slide .next",
                    prevEl: "#DiscoveryComponent .collection-slide .prev",
                },
            });

            var collectionSwiperDetail = new Swiper("#DiscoveryComponent .collection-detail-slide", {
                effect: "fade"
            });


            var collectionPagingSwiper = new Swiper("#DiscoveryComponent .collection-slide", {
                pagination: {
                    el: "#DiscoveryComponent .collection-slide .page-number",
                    type: "fraction",
                },
            });

            collectionSwiper.controller.control = collectionSwiperDetail;
            collectionSwiperDetail.controller.control = collectionPagingSwiper;
        }
        onMounted(async () => {
            language.value = getLanguageFromPath();
            await loadTemplate(language.value);

            nextTick(() => {
                init();
            })
        });

        return { template, language };
    }
});
