// Define the Header component
const ProjectsHighlightComponent = defineComponent({
    name: 'ProjectsHighlightComponent',
    template: `
    <section class="onview font-['IBM_Plex_Sans_Thai']" id="project_signature" data-section="project_signature">
        <div class="relative">
                <div class="container mx-auto lg:px-5 px-0 py-10">
                    <div>
                        <h2 class="font-['DB_OnUma'] font-normal text-white text-[50px] text-center" data-aos="fade-up"
                            data-aos-duration="500" data-aos-easing="linear">
                            {{title[language]}}
                        </h2>
                    </div>
                    <div class="flex flex-col gap-10 mt-5">
                        <div class="flex flex-col lg:px-[15%] lg:gap-10 gap-5">
                            <div class="lg:mx-0 -mx-20 lg:pb-8">
                                <img src="/assets/image/page-srin-rachapuek/description/rachapuek-1.webp" alt="" class="w-full"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5 lg:w-1/2">
                                <div>
                                    <h3 class="font-['Kaisei_Decol'] text-white text-[22px] font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                        {{section1.title[language]}}
                                    </h3>
                                    <h3 class="font-['Kaisei_Decol'] text-white text-[22px] font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                        {{section1.title1[language]}}
                                    </h3>
                                </div>
                                <div>
                                    <p class="text-white font-normal" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="300">
                                        {{section1.detail[language]}}
                                    </p>
                                    <p class="text-white font-normal" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="300">
                                        {{section1.detail1[language]}}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="items-end lg:-mt-[10%] gap-10">
                            <div class="flex lg:flex-row flex-col lg:gap-10 gap-5 w-full lg:mb-10">
                                <div class="lg:w-1/2 w-full mt-auto" data-aos="fade-up" data-aos-duration="1000"
                                    data-aos-easing="linear">
                                    <img src="/assets/image/page-srin-rachapuek/description/rachapuek-2.webp" alt="" class="w-full"
                                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                                    <div class="flex lg:gap-10 gap-5 mt-5 lg:hidden">
                                        <div class="flex flex-col gap-2 w-full justify-center lg:px-0 px-5">
                                            <div>
                                                <h3 class="font-['Kaisei_Decol'] text-white text-[22px] font-normal" data-aos="fade-up"
                                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                                    {{section2.title[language]}}
                                                </h3>
                                                <h3 class="font-['Kaisei_Decol'] text-white text-[22px] font-normal" data-aos="fade-up"
                                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                                    {{section2.title1[language]}}
                                                </h3>
                                            </div>
                                            <div>
                                                <p class="text-white font-normal" data-aos="fade-up" data-aos-duration="500"
                                                    data-aos-easing="linear" data-aos-delay="300">
                                                    {{section2.detail[language]}}
                                                </p>
                                                <p class="text-white font-normal" data-aos="fade-up" data-aos-duration="500"
                                                    data-aos-easing="linear" data-aos-delay="300">
                                                    {{section2.detail1[language]}}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="lg:w-1/2 w-full" data-aos="fade-up" data-aos-duration="1000"
                                    data-aos-easing="linear">
                                    <img src="/assets/image/page-srin-rachapuek/description/rachapuek-3.webp" class="lg:block hidden"
                                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                        alt="">
                                    <img src="/assets/image/page-srin-rachapuek/description/rachapuek-m-3.webp" alt="" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                        class="lg:hidden block w-full">
                                    <div class="flex lg:gap-10 gap-5 mt-5 lg:hidden">
                                        <div class="flex flex-col gap-2 w-full justify-center lg:px-0 px-5">
                                            <div>
                                                <h3 class="font-['Kaisei_Decol'] text-white text-[22px] font-normal" data-aos="fade-up"
                                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                                    {{section3.title[language]}}
                                                </h3>
                                                <h3 class="font-['Kaisei_Decol'] text-white text-[22px] font-normal" data-aos="fade-up"
                                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                                    {{section3.title1[language]}}
                                                </h3>
                                            </div>
                                            <div>
                                                <p class="text-white font-normal" data-aos="fade-up" data-aos-duration="500"
                                                    data-aos-easing="linear" data-aos-delay="300">
                                                    {{section3.detail[language]}}
                                                </p>
                                                <p class="text-white font-normal" data-aos="fade-up" data-aos-duration="500"
                                                    data-aos-easing="linear" data-aos-delay="300">
                                                    {{section3.detail1[language]}}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="lg:flex hidden lg:gap-10 gap-5">
                                <div class="flex flex-col gap-2 w-1/2 justify-center lg:px-0 px-5">
                                    <div>
                                        <h3 class="font-['Kaisei_Decol'] text-white text-[22px] font-normal" data-aos="fade-up"
                                            data-aos-duration="500" data-aos-easing="linear" data-aos-offset="0">
                                            {{section3.title[language]}}
                                        </h3>
                                        <h3 class="font-['Kaisei_Decol'] text-white text-[22px] font-normal" data-aos="fade-up"
                                            data-aos-duration="500" data-aos-easing="linear"  data-aos-offset="0">
                                            {{section3.title1[language]}}
                                        </h3>
                                    </div>
                                    <div>
                                        <p class="text-white font-normal" data-aos="fade-up" data-aos-duration="500"
                                            data-aos-easing="linear"  data-aos-offset="0">
                                            {{section3.detail[language]}}
                                        </p>
                                        <p class="text-white font-normal" data-aos="fade-up" data-aos-duration="500"
                                            data-aos-easing="linear" data-aos-offset="0">
                                            {{section3.detail1[language]}}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 w-1/2 justify-center lg:px-0 px-5">
                                    <div>
                                        <h3 class="font-['Kaisei_Decol'] text-white text-[22px] font-normal" data-aos="fade-up"
                                            data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200"   data-aos-offset="0">
                                            {{section2.title[language]}}
                                        </h3>
                                        <h3 class="font-['Kaisei_Decol'] text-white text-[22px] font-normal" data-aos="fade-up"
                                            data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200"  data-aos-offset="0">
                                            {{section2.title1[language]}}
                                        </h3>
                                    </div>
                                    <div>
                                        <p class="text-white font-normal" data-aos="fade-up" data-aos-duration="500"
                                            data-aos-easing="linear" data-aos-delay="300"  data-aos-offset="0">
                                            {{section2.detail[language]}}
                                        </p>
                                        <p class="text-white font-normal" data-aos="fade-up" data-aos-duration="500"
                                            data-aos-easing="linear" data-aos-delay="300"  data-aos-offset="0">
                                            {{section2.detail1[language]}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col lg:px-[15%] lg:gap-10 gap-5">
                            <div class=" mx-auto">
                                <img src="/assets/image/page-srin-rachapuek/description/rachapuek-4.webp" alt=""
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5">
                                <div>
                                    <h3 class="font-['Kaisei_Decol'] text-white text-[22px] font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                        {{section4.title[language]}}
                                    </h3>
                                    <h3 class="font-['Kaisei_Decol'] text-white text-[22px] font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                        {{section4.title1[language]}}
                                    </h3>
                                </div>
                                <div>
                                    <p class="text-white font-normal" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="300">
                                        {{section4.detail[language]}}
                                    </p>
                                    <p class="text-white font-normal" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="300">
                                        {{section4.detail1[language]}}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language
        const title = ref({
            en: "PROJECT SIGNATURES",
            th: "จุดเด่นของโครงการ"
        })
        const section1 = ref({
            title: {
                en: "PEACEFULNESS OF LIVING EXPERIENCE",
                th: "PEACEFULNESS OF LIVING EXPERIENCE"
            },
            title1: {
                en: "",
                th: ""
            },
            detail: {
                th: "สัมผัสแห่งการพักผ่อนอันรื่นรมย์ที่ออกแบบมาเพื่อเติมเต็มพลังชีวิต พร้อมมอบสุนทรียภาพแห่งการอยู่อาศัย สร้างสมดุลแห่งการใช้ชีวิตที่สมบูรณ์แบบ​",
                en: "Relax and rejuvenate in thoughtfully designed spaces where living aesthetics meet perfect life balance.​"
            },
            detail1: {
                en: "",
                th: ""
            }
        })

        const section2 = ref({
            title: {
                en: "ADAPTABILITY OF DESIGN",
                th: "ADAPTABILITY OF DESIGN"
            },
            title1: {
                en: "",
                th: ""
            },
            detail: {
                th: "บ้านที่เข้าใจทุกการเปลี่ยนแปลงในไลฟ์สไตล์ที่หลากหลาย พร้อมปรับฟังก์ชันเพื่อชีวิตที่สมบูรณ์แบบ สร้างสรรค์พื้นที่ที่ตอบโจทย์ทุกความต้องการและพร้อมเติบโตไปกับคุณ​",
                en: "Understanding your diverse lifestyles, flexible design features allow you to personalize your living spaces to meet all needs and grow with you.​"
            },
            detail1: {
                en: "",
                th: ""
            }
        })

        const section3 = ref({
            title: {
                en: "A SPACE CREATED FOR MULTI-GENERATIONS",
                th: "A SPACE CREATED FOR MULTI-GENERATIONS"
            },
            title1: {
                en: "",
                th: ""
            },
            detail: {
                th: "บ้านที่สร้างสรรค์เพื่อความผูกพันของครอบครัว พร้อมการออกแบบที่ใส่ใจทุกรายละเอียดตามแนวคิด Universal Design เพื่อให้ทุกช่วงวัยในครอบครัวได้ใช้ชีวิตร่วมกันอย่างราบรื่นและมีความสุข เพิ่มพื้นที่เพื่อวันดี ๆ เกิดขึ้นได้ทุกวัน​",
                en: "Incorporating Universal Design principles, S'RIN is designed for everyone in the family to enjoy a perfect balance of private and shared areas. Adding space where beautiful moments happen every day.​"
            },
            detail1: {
                en: "",
                th: ""
            }
        })

        const section4 = ref({
            title: {
                en: "DESIGN FOR SUSTAINABLE WELL-BEING",
                th: "DESIGN FOR SUSTAINABLE WELL-BEING"
            },
            title1: {
                en: "",
                th: ""
            },
            detail: {
                th: "เราสร้างสรรค์ สริน เพื่อส่งมอบชีวิตที่ดีอย่างยั่งยืน ด้วยความพิถีพิถันในทุกรายละเอียด ตั้งแต่การเลือกวัสดุชั้นนำที่สวยงาม มีคุณภาพและยั่งยืน ไปจนถึงการออกแบบที่คำนึงถึงทุกมิติของชีวิต ทั้งสภาพภูมิอากาศ แสงแดด ความชื้น และนวัตกรรมเพื่อสุขภาพและคุณภาพชีวิต​",
                en: "S'RIN is crafted with our commitment to sustainable living excellence, from premium material selection to comprehensive design considerations - climate, sunlight, humidity, and wellness innovations. We make your home, a new standard for refined living.​"
            },
            detail1: {
                en: "",
                th: ""
            }
        })

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };
        const init = () => {
            AOS.init();
        }
        onMounted(async () => {
            language.value = getLanguageFromPath();

            nextTick(() => {
                init();  // ScrollTrigger is initialized after template is loaded and DOM is updated
            });
        });

        return { template, language, title, section1, section2, section3, section4 };
    }
});