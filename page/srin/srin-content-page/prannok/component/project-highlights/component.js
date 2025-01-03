// Define the Header component
const ProjectsHighlightComponent = defineComponent({
    name: 'ProjectsHighlightComponent',
    template: `
    <section class="onview" id="ProjectsHighlightComponent" data-section="project_signature">
        <div class="relative">
            <div class="w-full lg:h-full bg-[url('/assets/image/page-srin-prannok/description/bg.png')] bg-cover bg-center pt-10 pb-20">
                <div class="container mx-auto lg:px-5 px-0">
                    <div class="flex flex-col gap-10">
                        <div>
                            <h2 class="font-['DB_OnUma'] text-[#013B5E] text-[50px] lg:text-[70px] text-center" data-aos="fade-up"
                                data-aos-duration="500" data-aos-easing="linear">
                                {{title['th']}}
                            </h2>
                        </div>
                        <div class="flex flex-col lg:px-20 lg:gap-10 gap-5">
                            <div class="lg:mx-0 -mx-20">
                                <img src="/assets/image/page-srin-prannok/description/prannok-1.png" alt="" class="w-full"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5">
                                <p class="font-['Kaisei_Decol'] text-[#013B5E] text-[20px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{section1.title[language]}}
                                </p>
                                <p class="text-[#013B5E] text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="300">
                                    {{section1.detail[language]}}
                                </p>
                            </div>
                        </div>
                        <div class="flex lg:flex-row flex-col-reverse items-end">
                            <div class="flex lg:gap-10 gap-5 lg:mt-20 flex-col">
                                <div class="w-full">
                                    <img src="/assets/image/page-srin-prannok/description/prannok-2.png" alt="" class="w-full"
                                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                                </div>
                                <div class="flex flex-col gap-2 lg:w-5/6 w-full justify-center lg:px-0 px-5">
                                    <p class="font-['Kaisei_Decol'] text-[#013B5E] text-[20px] font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                        {{section2.title[language]}}
                                    </p>
                                    <p class="text-[#013B5E] text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="300">
                                        {{section2.detail[language]}}
                                    </p>
                                </div>
                            </div>
                            <div class="flex lg:gap-10 gap-5 lg:mt-20 flex-col-reverse">
                                <div class="w-full my-auto flex lg:px-0 px-5">
                                    <div class="lg:w-2/3 mr-auto ml-0 lg:ml-10 space-y-2">
                                        <p class="font-['Kaisei_Decol'] text-[#013B5E] text-[20px] font-normal" data-aos="fade-up"
                                            data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                                        {{section3.title[language]}}
                                        </p>
                                        <p class="text-[#013B5E] text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                            data-aos-easing="linear" data-aos-delay="200">
                                        {{section3.detail[language]}}
                                        </p>
                                    </div>
                                </div>
                                <div class="w-full lg:px-10" data-aos="fade-up" data-aos-duration="1000"
                                    data-aos-easing="linear">
                                    <img src="/assets/image/page-srin-prannok/description/prannok-3.png" class="lg:block hidden"
                                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                        alt="">
                                    <img src="/assets/image/page-srin-prannok/description/prannok-m-3.png" alt="" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                        class="lg:hidden block w-full">
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col lg:px-20 lg:gap-10 gap-5 lg:mt-20">
                            <div class=" mx-auto">
                                <img src="/assets/image/page-srin-prannok/description/prannok-4.png" alt="" class="max-h-[450px]"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5">
                                <p class="font-['Kaisei_Decol'] text-[#013B5E] text-[20px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{section4.title[language]}}
                                </p>
                                <p class="text-[#013B5E] text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="300">
                                    {{section4.detail[language]}}
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
                en: "Peacefulness of Living Experience​",
                th: "Peacefulness of Living Experience​​"
            },
            detail: {
                en: "เพื่อประสบการณ์การอยู่อาศัยที่ดีที่สุด ให้ความสำคัญกับสุนทรียภาพการใช้ชีวิตภายในบ้าน และพื้นที่ส่วนกลาง เพื่อดุลยภาพการอยู่อาศัยได้อย่างสมบูรณ์แบบ ​",
                th: "เพื่อประสบการณ์การอยู่อาศัยที่ดีที่สุด ให้ความสำคัญกับสุนทรียภาพการใช้ชีวิตภายในบ้าน และพื้นที่ส่วนกลาง เพื่อดุลยภาพการอยู่อาศัยได้อย่างสมบูรณ์แบบ "
            }
        })
        const section2 = ref({
            title: {
                en: "A Space Created for Multi-Generations​​",
                th: "A Space Created for Multi-Generations​​"
            },
            detail: {
                en: "พื้นที่เพื่อวันดี ๆ ของทุกคน การออกแบบพื้นที่อย่างลงตัว ทั้งพื้นที่ส่วนกลางและพื้นที่ภายในบ้านโดยคำนึงถึงหลัก “Universal Design” เพื่อสมาชิกในครอบครัวครบทุกช่วงวัย​​",
                th: "พื้นที่เพื่อวันดี ๆ ของทุกคน การออกแบบพื้นที่อย่างลงตัว ทั้งพื้นที่ส่วนกลางและพื้นที่ภายในบ้านโดยคำนึงถึงหลัก “Universal Design” เพื่อสมาชิกในครอบครัวครบทุกช่วงวัย​"
            }
        })
        const section3 = ref({
            title: {
                en: "Adaptability of Design​",
                th: "Adaptability of Design​"
            },
            detail: {
                en: "ปรับฟังก์ชั่นได้ตามปรารถนา รองรับปัจจุบันและอนาคต พร้อมปรับเปลี่ยนไปตามกาลเวลา รองรับทุกความต้องการและการใช้ชีวิตของผู้อยู่อาศัย เพราะความเข้าใจในไลฟ์สไตล์ที่หลากหลายของผู้อยู่อาศัย​",
                th: "ปรับฟังก์ชั่นได้ตามปรารถนา รองรับปัจจุบันและอนาคต พร้อมปรับเปลี่ยนไปตามกาลเวลา รองรับทุกความต้องการและการใช้ชีวิตของผู้อยู่อาศัย เพราะความเข้าใจในไลฟ์สไตล์ที่หลากหลายของผู้อยู่อาศัย"
            }
        })
        const section4 = ref({
            title: {
                en: "Design for Sustainable Well-Being​",
                th: "Design for Sustainable Well-Being​"
            },
            detail: {
                en: "สวย สงบ ภายใต้ความยั่งยืน พิถีพิถันเลือกวัสดุที่สวยงาม มาพร้อมคุณภาพ เพื่อรองรับการอยู่อาศัยที่ยั่งยืน โดยคำนึงถึงสภาวะต่าง ๆ เช่น สภาพภูมิอากาศ แสงแดด ความชื้น รวมถึงนวัตกรรมสุขภาพและคุณภาพชีวิตที่ดีที่ถูกนำมาใส่ในส่วนต่าง ๆ ของบ้าน เพื่อความสมบูรณ์แบบของการอยู่อาศัยในทุกมิติ​",
                th: "สวย สงบ ภายใต้ความยั่งยืน พิถีพิถันเลือกวัสดุที่สวยงาม มาพร้อมคุณภาพ เพื่อรองรับการอยู่อาศัยที่ยั่งยืน โดยคำนึงถึงสภาวะต่าง ๆ เช่น สภาพภูมิอากาศ แสงแดด ความชื้น รวมถึงนวัตกรรมสุขภาพและคุณภาพชีวิตที่ดีที่ถูกนำมาใส่ในส่วนต่าง ๆ ของบ้าน เพื่อความสมบูรณ์แบบของการอยู่อาศัยในทุกมิติ​"
            }
        })
        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const loadTemplate = async (lang) => {
            try {
                const templateResponse = await axios.get('/page/srin/srin-content-page/prannok/component/project-highlights/template.html');
                let templateContent = templateResponse.data;
                // Replace placeholders with actual data
                templateContent = templateContent
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
            });
        });

        return { template, language, title, section1, section2, section3, section4 };
    }
});