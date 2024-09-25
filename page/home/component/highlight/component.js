// Define the Header component
const HighlightComponent = defineComponent({
    name: 'HighlightComponent',
    template: `<section v-html="template"></section>`,

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
                    en: "HIGHLIGHT PROMOTIONS & SPECIAL PRIVILEGES ",
                    th: "​แคมเปญและสิทธิพิเศษเฉพาะคุณ"
                }
                const detail = {
                    th: `​โครงการที่พักอาศัยจาก สิงห์ เอสเตท มอบความหลากหลายให้คุณ ด้วย บ้านเดี่ยว ไพรเวทเอสเตท โฮมออฟฟิศ และคอนโดมิเนียม ผ่านความตั้งใจที่จะตอบโจทย์ทุกความต้องการด้วยแบรนด์ที่แตกต่าง ที่สะท้อนเอกลักษณ์ของเจ้าของบ้าน​`,
                    en: `
                        Singha Estate's varied residential development, from high-rise to low-rise projects, features a
                        range of properties-single detached houses, private estates, home offices, and condominiums.
                        <br />Tailored to luxury customers across different brands, these
                        distinctive offering
                        s not only
                        define Singha Estate homes but also embody the company's commitment "Best - in - class" to
                        excellence across all segments.`
                }
                const data_en = [
                    {
                        title: "1 BEDROOM: THE ESSE Sukhumvit 36",
                        detail: "EXPERIENCE THE PULSE OF THONGLOR LIVING <br/><br/>1.The Promotion is valid to 31 October 2024 only, or until promotion units sold out.<br/>2.The promotion is for 3 selected units only.<br/>3.This promotion cannot be used in conjunction with other promotions.<br/><br/>*Terms and conditions apply",
                        cate: "promotions",
                        date: "25 september 2024",
                        image: {
                            l: "/assets/image-new/promotion/1bed/S36_1BR_500K resized banners_Detail Desktop_1324X582.jpg",
                            s: "/assets/image-new/promotion/1bed/S36_1BR_500K resized banners_Desktop&MB_1440X781.jpg",
                            thumb: "/assets/image-new/promotion/1bed/S36_1BR_500K resized banners_Detail MB_396X392.jpg"
                        }
                    },
                    {
                        title: "2 BEDROOM: THE ESSE Sukhumvit 36",
                        detail: "EXPERIENCE THE PULSE OF THONGLOR LIVING <br/><br/>1.The Promotion is valid to 31 October 2024 only, or until promotion units sold out.<br/>2.The promotion is for 3 selected units only.<br/>3.This promotion cannot be used in conjunction with other promotions.<br/><br/>*Terms and conditions apply",
                        cate: "promotions",
                        date: "25 september 2024",
                        image: {
                            l: "/assets/image-new/promotion/1bed/S36_1BR_500K resized banners_Detail Desktop_1324X582.jpg",
                            s: "/assets/image-new/promotion/1bed/S36_1BR_500K resized banners_Desktop&MB_1440X781.jpg",
                            thumb: "/assets/image-new/promotion/1bed/S36_1BR_500K resized banners_Detail MB_396X392.jpg"
                        }
                    }
                ];
                const data_th = [
                    {
                        title: "1 ห้องนอน: ดิ เอส สุขุมวิท 36",
                        detail: "EXPERIENCE THE PULSE OF THONGLOR LIVING <br/><br/>1.โปรโมชั่นนี้มีผลจนถึงวันที่ 31 ตุลาคม 2567 เท่านั้น หรือจนกว่าห้องของโปรโมชั่นจะหมด<br/>2.โปรโมชั่นนี้มีเฉพาะ 3 ยูนิตให้เลือกเท่านั้น<br/>3.โปรโมชั่นนี้ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้ <br/><br/>*เงื่อนไขเป็นไปตามที่กำหนด",
                        cate: "promotions",
                        date: "25 september 2024",
                        image: {
                            l: "/assets/image-new/promotion/1bed/S36_1BR_500K resized banners_Detail Desktop_1324X582.jpg",
                            s: "/assets/image-new/promotion/1bed/S36_1BR_500K resized banners_Desktop&MB_1440X781.jpg",
                            thumb: "/assets/image-new/promotion/1bed/S36_1BR_500K resized banners_Detail MB_396X392.jpg"
                        }
                    },
                    {
                        title: "2 ห้องนอน: ดิ เอส สุขุมวิท 36",
                        detail: "EXPERIENCE THE PULSE OF THONGLOR LIVING <br/><br/>1.โปรโมชั่นนี้มีผลจนถึงวันที่ 31 ตุลาคม 2567 เท่านั้น หรือจนกว่าห้องของโปรโมชั่นจะหมด<br/>2.โปรโมชั่นนี้มีเฉพาะ 3 ยูนิตให้เลือกเท่านั้น<br/>3.โปรโมชั่นนี้ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นได้ <br/><br/>*เงื่อนไขเป็นไปตามที่กำหนด",
                        cate: "promotions",
                        date: "25 september 2024",
                        image: {
                            l: "/assets/image-new/promotion/2bed/S36_2BR_1MB resized banners_Detail Desktop_1324X582.jpg",
                            s: "/assets/image-new/promotion/2bed/S36_2BR_1MB resized banners_Desktop&MB_1440X781",
                            thumb: "/assets/image-new/promotion/2bed/S36_2BR_1MB resized banners_Detail MB_396X392.jpg"
                        }
                    }
                ];
                let data = lang == 'en' ? data_en : data_th
                const templateResponse = await axios.get('/page/home/component/highlight/template.html');
                let templateContent = templateResponse.data;

                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, lang == 'en' ? title['en'] : title['th'])
                    .replace(/{{detail}}/g, lang == 'en' ? detail['en'] : detail['th'])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                    .replace(/{{#privilege.slide}}([\s\S]*?){{\/privilege.slide}}/, (match, slide) => {
                        return data.map((data, i) => {
                            return slide
                                .replace(/{{privilege.slide.l}}/g, data.image.l)
                                .replace(/{{privilege.slide.thumb}}/g, data.image.thumb)
                        }).join("")
                    })
                    .replace(/{{#privilege.detail.slide}}([\s\S]*?){{\/privilege.detail.slide}}/, (match, detail) => {
                        return data.map((data, i) => {
                            return detail
                                .replace(/{{privilege.detail.slide.title}}/g, data.title)
                                .replace(/{{privilege.detail.slide.detail}}/g, data.detail)
                                .replace(/{{privilege.detail.slide.cate}}/g, data.cate)
                                .replace(/{{privilege.detail.slide.date}}/g, data.date)
                        }).join("")
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();

            var privilegeSwiper = new Swiper(".privilege-slide", {
                pagination: {
                    el: ".privilege-slide .hero-progress-bar",
                    type: "progressbar",
                },
                navigation: {
                    nextEl: ".privilege-slide .next",
                    prevEl: ".privilege-slide .prev",
                },
            });

            var privilegeSwiperDetail = new Swiper(".privilege-detail-slide", {
                effect: "fade"
            });


            var privilegePagingSwiper = new Swiper(".privilege-slide", {
                pagination: {
                    el: ".privilege-slide .page-number",
                    type: "fraction",
                },
            });

            privilegeSwiper.controller.control = privilegeSwiperDetail;
            privilegeSwiperDetail.controller.control = privilegePagingSwiper;

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
