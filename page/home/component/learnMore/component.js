// Define the Header component
const LearnMoreComponent = defineComponent({
    name: 'LearnMoreComponent',
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
                    en: "LEARN MORE ABOUT SINGHA ESTATE​<br/> ​Entrusted and Value Enricher ",
                    th: "รู้จัก สิงห์ เอสเตท <br/> ​Entrusted and Value Enricher ​​"
                }
                // const detail = {
                //     en: `This vision has been conveyed through the development of residential real estate, which is one of the core business groups of Singha Estate.​​​`,
                //     th: `ซึ่งวิสัยทัศน์นี้ได้ถูกถ่ายทอดสู่การพัฒนา ธุรกิจอสังหาริมทรัพย์เพื่อการพักอาศัย ซึ่งเป็นหนึ่งในกลุ่มธุรกิจหลักของ สิงห์ เอสเตท​`
                // }
                const detail = {
                    en: `To develop and manage Singha Estate’s balanced and well diversified portfolio with high professional standards. Thus, delivering best-in-class products and services to enhance great customer experience with unparalleled value proposition. The Company strives to achieve all this without compromising on the integrity of its code of business conduct under good corporate governance principles, ensuring fair treatment of all stakeholders, taking into consideration the community, social and environmental wellbeing, in quest of sustainable growth.<br/><br/>This vision has been conveyed through the development of residential real estate, which is one of the core business groups of Singha Estate.​​`,
                    th: `ภายใต้วิสัยทัศน์ในการมุ่งมั่นสร้างคุณค่าและการเติบโตที่ยั่งยืน คือการทำงานที่เรายึดมั่นและผลักดัน ให้เราเป็นบริษัทผู้พัฒนาอสังหาริมทรัพย์และการลงทุนระดับสากล ที่มุ่งสร้างธุรกิจและพัฒนาโครงการพร้อมการบริการอย่างมืออาชีพชั้นเลิศ ด้วยความมุ่งมั่นสร้างการเติบโตที่ยั่งยืน รับผิดชอบต่อสังคมบนหลักธรรมภิบาลที่ดีงามและส่งมอบคุณค่านี้จากรุ่นสู่รุ่นได้เต็มภาคภูมิ <br/><br/>ซึ่งวิสัยทัศน์นี้ได้ถูกถ่ายทอดสู่การพัฒนา ธุรกิจอสังหาริมทรัพย์เพื่อการพักอาศัย ซึ่งเป็นหนึ่งในกลุ่มธุรกิจหลักของ สิงห์ เอสเตท`
                }
                const more = {
                    th: "อ่านต่อ​",
                    en: "Explore more"
                }

                const data = [
                    {
                        type: "News",
                        title: {
                            en: "Singha Estate Wins Prestigious Global Business Outlook Award 2024, reinforcing a decade of excellence as a leader in luxury real estate development with world-class standards",
                            th: "สิงห์ เอสเตท คว้ารางวัลใหญ่ระดับโลก Global Business Outlook Award 2024 ตอกย้ำความแข็งแกร่ง 10 ปี แห่งการเป็นผู้พัฒนาและเข้าใจอสังหาฯระดับลักชูรี มาตรฐานระดับเวิลด์คลาส"
                        },
                        url: {
                            en: "https://singhaestate.co.th/en/news-room/GBO2024Residential",
                            th: "https://singhaestate.co.th/th/news-room/GBO2024Residential"
                        },
                        date: "27 Sep 2024",
                        image: {
                            alt: "Singha Estate Wins Prestigious Global Business Outlook Award 2024",
                            thumb: "/assets/image-new/thumb/news/thumbnail_0_27_Sep_2024_1727422937803.JPG"
                        }
                    },
                    {
                        type: "News",
                        title: {
                            en: "สิงห์ เอสเตท ตอกย้ำ ความเป็นบริษัทพัฒนาอสังหาริมทรัพย์ที่เข้าใจในการพัฒนาที่อยู่อาศัยในระดับลักชูรีของประเทศไทย คว้า 4 รางวัลคุณภาพเวทีระดับเอเชีย  “PropertyGuru Thailand Property Awards 2024”",
                            th: "สิงห์ เอสเตท ตอกย้ำ ความเป็นบริษัทพัฒนาอสังหาริมทรัพย์ที่เข้าใจในการพัฒนาที่อยู่อาศัยในระดับลักชูรีของประเทศไทย คว้า 4 รางวัลคุณภาพเวทีระดับเอเชีย  “PropertyGuru Thailand Property Awards 2024”"
                        },
                        url: {
                            en: "https://singhaestate.co.th/en/news-room/PropertyGuru2024",
                            th: "https://singhaestate.co.th/th/news-room/PropertyGuru2024"
                        },
                        date: "26 Sep 2024",
                        image: {
                            alt: "สิงห์ เอสเตท ตอกย้ำ ความเป็นบริษัทพัฒนาอสังหาริมทรัพย์ที่เข้าใจในการพัฒนาที่อยู่อาศัยในระดับลักชูรีของประเทศไทย",
                            thumb: "/assets/image-new/thumb/news/thumbnail_0_26_Sep_2024_1727342274929.jpg"
                        }
                    },
                    {
                        type: "News",
                        title: {
                            en: 'Singha Estate Honoring Resident Experience with Exclusive World-Class Luxury Offering. Through the "S Life" Memorable Experiences of Divergent Happiness.',
                            th: 'สิงห์ เอสเตท ตอบแทนลูกค้าคนพิเศษ มอบประสบการณ์สุดเอ็กซ์คลูซีฟจากแบรนด์ลักชูรี่ระดับเวิลด์คลาสผ่านกิจกรรม "S Life" MEMORABLE EXPERIENCES OF DIVERGENT HAPPINESS'
                        },
                        url: {
                            en: "https://singhaestate.co.th/en/news-room/S-Life-Memorable-Experiences-of-Divergent-Happiness",
                            th: "https://singhaestate.co.th/th/news-room/S-Life-Memorable-Experiences-of-Divergent-Happiness"
                        },
                        date: "04 Jul 2024",
                        image: {
                            alt: "Singha Estate Honoring Resident Experience with Exclusive World-Class Luxury Offering.",
                            thumb: "/assets/image-new/thumb/news/thumbnail_0_03_Jul_2024_1719994075762.jpg"
                        }
                    }
                ];
                const templateResponse = await axios.get('/page/home/component/learnMore/template.html');
                let templateContent = templateResponse.data;

                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{language}}/g, lang)
                    .replace(/{{title}}/g, title[lang])
                    .replace(/{{detail}}/g, detail[lang])
                    .replace(/{{font}}/g, lang == 'en' ? "font-['Cinzel']" : "")
                    .replace(/{{more}}/g, more[lang])
                    .replace(/{{#news.cards}}([\s\S]*?){{\/news.cards}}/, (match, news) => {
                        return data.map(d => {
                            return news
                                .replace(/{{cards.type}}/g, d.type)
                                .replace(/{{cards.title}}/g, d.title[lang].slice(0, 80) + "...")
                                .replace(/{{cards.url}}/g, d.url[lang])
                                .replace(/{{cards.date}}/g, d.date)
                                .replace(/{{cards.image.alt}}/g, d.image.alt)
                                .replace(/{{cards.image.thumb}}/g, d.image.thumb)
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
                init();
            })
        });

        return { template, language };
    }
});
