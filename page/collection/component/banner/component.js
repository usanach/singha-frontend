// Define the Header component
const BannerComponent = defineComponent({
    name: 'BannerComponent',
    template: `<section class="trigger-singha-estate" v-html="template"></section>`,

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
                const datasets = {
                    title: {
                        en: "Residential <br class='lg:hidden block'/>by Singha Estate",
                        th: "โครงการที่อยู่อาศัย จาก สิงห์ เอสเตท"
                    },
                    detail: {
                        en: "Singha Estate presents a collection of branded residences all located in prime locations. We are committed to excellence in every detail, from material selection to construction. With a deep understanding of family dynamics and the unique lifestyle, our properties are designed and crafted to ensure enduring happiness and refined living.​​",
                        th: "สิงห์ เอสเตท นำเสนอเอกลักษณ์ของผู้อยู่อาศัยผ่านโครงการภายใต้แบรนด์ที่หลากหลายด้วย บ้านเดี่ยว ไพรเวทเอสเตท คอนโดมิเนียม โฮมออฟฟิศ คัดสรรทำเลศักยภาพ ออกแบบและพัฒนาที่อยู่อาศัยด้วยความเข้าใจอย่างลึกซึ้งในความต้องการของสมาชิกในครอบครัว ใส่ใจในรายละเอียดจนถึงขั้นตอนการเลือกวัสดุและการก่อสร้าง เพื่อความสุขที่ยั่งยืนของสมาชิกในครอบครัว​"
                    },
                    items: [{
                        image: {
                            l: "/assets/image-new/collections/residential/destop/2020.09.17-THE-ESSE364388-2-copy-(2).jpg",
                            s: "/assets/image-new/collections/residential/mobile/2020.09.17-THE-ESSE364388-2-copy-(2).jpg"
                        }
                    }, {
                        image: {
                            l: "/assets/image-new/collections/residential/destop/KANT-x-SHAWN-PANYA-INDRA153.jpg",
                            s: "/assets/image-new/collections/residential/mobile/20230920SRM(07)-0538-(2).jpg"
                        }
                    }, {
                        image: {
                            l: "/assets/image-new/collections/residential/destop/SIRANINN-RESIDENCES-L-INTERIOR-COURTYARD.jpg",
                            s: "/assets/image-new/collections/residential/mobile/KANT-x-SIRANINN11.jpg"
                        }
                    }]
                }

                const templateResponse = await axios.get('/page/collection/component/banner/template.html');
                let templateContent = templateResponse.data;
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{font}}/g, lang == 'en' ? "font-['SinghaEstate']" : "font-['SinghaEstate']")
                    .replace(/{{title}}/g, datasets.title[lang])
                    .replace(/{{detail}}/g, datasets.detail[lang])
                    .replace(/{{#slide}}([\s\S]*?){{\/slide}}/, (match, slide) => {
                        return datasets.items.map((data, i) => {
                            return slide
                                .replace(/{{slide.l}}/g, data.image.l)
                                .replace(/{{slide.s}}/g, data.image.s)
                                .replace(/{{title}}/g, lang == 'en' ? data.title_en : data.title)
                        }).join("")
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();
            var singhaEstateSwiper = new Swiper(".singha-estate-slide", {
                pagination: {
                    el: ".singha-estate-slide .custom-pagination-square",
                },
                navigation: {
                    nextEl: ".singha-estate-slide .next",
                    prevEl: ".singha-estate-slide .prev",
                },
                on: {
                    init: function (e) {
                        document.querySelector('.singha-estate-slide .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', 100 + "%")
                    },
                    slideChange: function (e) {
                        document.querySelector('.singha-estate-slide .custom-pagination-square .swiper-pagination-bullet-active').style.setProperty('--vdo-width', 100 + "%")
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
