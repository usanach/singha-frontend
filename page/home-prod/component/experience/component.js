function toggleCard(d) {
    d.classList.toggle('expand');
    d.classList.toggle('expanded');
}

// Define the Header component
const ExperienceComponent = defineComponent({
    name: 'ExperienceComponent',
    template: `<section v-html="template"  id="ExperienceComponent" ></section>`,

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
                const data = {
                    title: {
                        th: 'สร้างนิยามแห่งการใช้ชีวิตในแบบของคุณ',
                        en: 'INDULGE IN UNPARALLELED LIVING WHERE <br class="lg:block hidden"/> CRAFTSMANSHIP HARMONIZES WITH REFINED'
                    },
                    detail: {
                        th: "ด้วยการออกแบบที่เข้าใจถึงความต้องการที่แท้จริง<br/>​ผสานความละเอียดและประณีตในทุกขั้นตอน<br/>​เพื่อส่งมอบความเป็นเอกลักษณ์ในแบบที่ไม่เหมือนใคร​",
                        en: `Residences crafted for every facet of living ​<br/> Embodying a profound understanding of life's desires ​`
                    },
                    data: [{
                        title: {
                            th: 'PRIME LOCATION',
                            en: 'PRIME LOCATION'
                        },
                        detail: {
                            th: "ทำเลทองที่จะสร้างมูลค่าอย่างต่อเนื่องในระยะยาว และมีสิ่งอำนวยความสะดวกให้ผู้อาศัย​​",
                            en: `A prime location that presents lucrative potential alongside exceptional amenities`
                        },
                        image: {
                            l: "/assets/image/residential/card/project-stories-img-06.webp",
                            s: "/assets/image/residential/card/project-stories-img-04-m.webp"
                        }
                    }, {
                        title: {
                            th: 'SIGNATURE PLANNING & CRAFTED TO LAST DESIGN',
                            en: 'SIGNATURE PLANNING & CRAFTED TO LAST DESIGN'
                        },
                        detail: {
                            th: "ออกแบบพื้นที่ใช้สอยตอบสนองตรงตามความต้องการของผู้อยู่อาศัย รวมถึงงานดีไซน์ที่สวยงาม ประณีต และ มีเอกลักษณ์​",
                            en: `Craft-to-last design for every unique desire, seamlessly blending functionality with inspiration`
                        },
                        image: {
                            l: "/assets/image/residential/card/project-stories-img-06-2.webp",
                            s: "/assets/image/residential/card/project-stories-img-06-m.webp"
                        }
                    }, {
                        title: {
                            th: 'QUALITY & INVISIBLE DETAILS',
                            en: 'QUALITY & INVISIBLE DETAILS '
                        },
                        detail: {
                            th: "ความพิถีพิถันเลือกใช้วัสดุคุณภาพสูงที่มาพร้อมความใส่ใจในรายละเอียดทุกด้าน​​",
                            en: "Meticulous attention to every detail, selecting only the finest quality materials"
                        },
                        image: {
                            l: "/assets/image/residential/card/project-stories-img-06-3.webp",
                            s: "/assets/image/residential/card/project-stories-img-05-m.webp"
                        }
                    }, {
                        title: {
                            th: 'SERVICE & LIVING EXPERIENCE',
                            en: 'SERVICE & LIVING EXPERIENCE'
                        },
                        detail: {
                            th: "การบริการหลังการขายที่จะส่งมอบประสบการณ์ที่ดีในการอยู่อาศัย​​",
                            en: "Embrace eco-friendly and sustainability integrated seamlessly."
                        },
                        image: {
                            l: "/assets/image/residential/card/project-stories-img-06-2.webp",
                            s: "/assets/image/residential/card/project-stories-img-06-m.webp"
                        }
                    }, {
                        title: {
                            th: 'SUSTAINABILITY',
                            en: 'SUSTAINABILITY'
                        },
                        detail: {
                            th: "การออกแบบเพื่อรองรับการอยู่อาศัยอย่างยั่งยืน​",
                            en: "A seamless living experience enhanced by exclusive service support"
                        },
                        image: {
                            l: "/assets/image/residential/card/project-stories-img-06.webp",
                            s: "/assets/image/residential/card/project-stories-img-04-m.webp"
                        }
                    },]
                };
                const templateResponse = await axios.get('https://residential-prod.singhaestate.co.th/page/home-prod/component/experience/template.html');
                let templateContent = templateResponse.data;

                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{#slide}}([\s\S]*?){{\/slide}}/, (match, slide) => {
                        return data.data.map((item, i) => {
                            return slide
                                .replace(/{{slide.image}}/g, item.image.l)
                                .replace(/{{slide.title}}/g, lang == 'en' ? item.title['en'] : item.title['th'])
                                .replace(/{{slide.detail}}/g, lang == 'en' ? item.detail['en'] : item.detail['th'])
                        }).join("")
                    })
                    .replace(/{{#slideM}}([\s\S]*?){{\/slideM}}/, (match, slideM) => {
                        return data.data.map((item, i) => {
                            return slideM
                                .replace(/{{slideM.image}}/g, item.image.s)
                                .replace(/{{slideM.title}}/g, lang == 'en' ? item.title['en'] : item.title['th'])
                                .replace(/{{slideM.detail}}/g, lang == 'en' ? item.detail['en'] : item.detail['th'])
                        }).join("")
                    })
                    .replace(/{{language}}/g, lang)
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                    .replace(/{{title}}/g, lang == 'en' ? data.title.en : data.title.th)
                    .replace(/{{detail}}/g, lang == 'en' ? data.detail.en : data.detail.th)
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();
            var expSwiper = new Swiper("#ExperienceComponent .experience-swiper", {
                slidesPerView: 5,
                spaceBetween: 20,
                loop: true,
                navigation: {
                    nextEl: "#ExperienceComponent .experience-swiper-next",
                },
            });
            var expSwiperM = new Swiper("#ExperienceComponent .experience-swiper-m", {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
            });
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
