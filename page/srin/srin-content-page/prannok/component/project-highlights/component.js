// Define the Header component
const ProjectsHighlightComponent = defineComponent({
    name: 'ProjectsHighlightComponent',
    template: `
    <section class="onview" id="ProjectsHighlightComponent" data-section="project_signature">
        <div class="relative">
            <div class="w-full lg:h-full bg-[url('/assets/image/page-srin-prannok/description/bg-m.png')] lg:bg-[url('/assets/image/page-srin-prannok/description/bg-2.png')] bg-cover bg-top pt-10 pb-20">
                <div class="container mx-auto lg:px-5 px-0">
                    <div>
                        <h2 class="font-['DB_OnUma'] text-[#013B5E] text-[50px] lg:text-[70px] text-center" data-aos="fade-up"
                            data-aos-duration="500" data-aos-easing="linear">
                            {{title['th']}}
                        </h2>
                    </div>
                    <div class="flex flex-col gap-10 mt-5">
                        <div class="flex flex-col lg:px-[15%] lg:gap-10 gap-5">
                            <div class="lg:mx-0 -mx-20">
                                <img src="/assets/image/page-srin-prannok/description/prannok-1.png" alt="" class="w-full"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5 lg:w-1/2">
                                <h3 class="font-['Kaisei_Decol'] text-[#013B5E] text-[20px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{section1.title[language]}}
                                </h3>
                                <p class="text-[#013B5E] text-[14px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="300">
                                    {{section1.detail[language]}}
                                </p>
                            </div>
                        </div>
                        <div class="items-end lg:-mt-[10rem] gap-10">
                            <div class="flex lg:flex-row flex-col lg:gap-10 gap-5 w-full lg:mb-5">
                                <div class="lg:w-1/2 w-full mt-auto" data-aos="fade-up" data-aos-duration="1000"
                                    data-aos-easing="linear">
                                    <img src="/assets/image/page-srin-prannok/description/prannok-2.png" alt="" class="w-full"
                                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                                    <div class="flex lg:gap-10 gap-5 mt-5 lg:hidden">
                                        <div class="flex flex-col gap-2 w-full justify-center lg:px-0 px-5">
                                            <h3 class="font-['Kaisei_Decol'] text-[#013B5E] text-[20px] font-normal" data-aos="fade-up"
                                                data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                                {{section2.title[language]}}
                                            </h3>
                                            <p class="text-[#013B5E] text-[14px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                                data-aos-easing="linear" data-aos-delay="300">
                                                {{section2.detail[language]}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="lg:w-1/2 w-full" data-aos="fade-up" data-aos-duration="1000"
                                    data-aos-easing="linear">
                                    <img src="/assets/image/page-srin-prannok/description/prannok-3.png" class="lg:block hidden"
                                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                        alt="">
                                    <img src="/assets/image/page-srin-prannok/description/prannok-m-3.png" alt="" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                        class="lg:hidden block w-full">
                                    <div class="flex lg:gap-10 gap-5 mt-5 lg:hidden">
                                        <div class="flex flex-col gap-2 w-full justify-center lg:px-0 px-5">
                                            <h3 class="font-['Kaisei_Decol'] text-[#013B5E] text-[20px] font-normal" data-aos="fade-up"
                                                data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                                 {{section3.title[language]}}
                                            </h3>
                                            <p class="text-[#013B5E] text-[14px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                                data-aos-easing="linear" data-aos-delay="300">
                                                {{section3.detail[language]}}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="lg:flex hidden lg:gap-10 gap-5">
                                <div class="flex flex-col gap-2 w-1/2 justify-center lg:px-0 px-5">
                                    <h3 class="font-['Kaisei_Decol'] text-[#013B5E] text-[20px] font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                        {{section2.title[language]}}
                                    </h3>
                                    <p class="text-[#013B5E] text-[14px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="300">
                                        {{section2.detail[language]}}
                                    </p>
                                </div>
                                <div class="flex flex-col gap-2 w-1/2 justify-center lg:px-0 px-5">
                                    <h3 class="font-['Kaisei_Decol'] text-[#013B5E] text-[20px] font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                        {{section3.title[language]}}
                                    </h3>
                                    <p class="text-[#013B5E] text-[14px] font-normal" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="300">
                                        {{section3.detail[language]}}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col lg:px-[15%] lg:gap-10 gap-5">
                            <div class=" mx-auto">
                                <img src="/assets/image/page-srin-prannok/description/prannok-4.png" alt=""
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5">
                                <h3 class="font-['Kaisei_Decol'] text-[#013B5E] text-[20px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{section4.title[language]}}
                                </h3>
                                <p class="text-[#013B5E] text-[14px] font-normal" data-aos="fade-up" data-aos-duration="500"
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
                en: "Immerse yourself in the finest living experience with a focus on aesthetic harmony, both within the home and in shared spaces. Crafted to create a perfect balance for an enriched lifestyle in every dimension.​​",
                th: "สัมผัสประสบการณ์การอยู่อาศัยที่ดีที่สุด ด้วยการเน้นสุนทรียภาพทั้งภายในบ้านและพื้นที่ส่วนกลาง เพื่อสร้างความสมดุลและความสุขแห่งการใช้ชีวิตที่สมบูรณ์แบบ​"
            }
        })
        const section2 = ref({
            title: {
                en: "ADAPTABILITY OF DESIGN",
                th: "ADAPTABILITY OF DESIGN"
            },
            detail: {
                en: "Our designs are adaptable to your desires, catering to both your current and future needs. With the ability to evolve over time, our homes are flexible to suit the diverse lifestyles of our residents.",
                th: "บ้านที่ออกแบบเพื่อทุกความเป็นไปได้ รองรับทุกความต้องการและการใช้ชีวิตของผู้อยู่อาศัย เพราะเราเข้าใจในการใช้ชีวิตและไลฟ์สไตล์ที่หลากหลาย เพื่อรองรับทั้งวันนี้และอนาคต​​"
            }
        })
        const section3 = ref({
            title: {
                en: "A SPACE CREATED FOR MULTI-GENERATIONS",
                th: "A SPACE CREATED FOR MULTI-GENERATIONS"
            },
            detail: {
                en: "Crafting a haven of happiness for all ages. Through \"Universal Design\" principles, we harmonize shared spaces and private living areas to create cherished family moments for every member.​",
                th: "สร้างสรรค์พื้นที่แห่งความสุขสำหรับทุกช่วงวัย ด้วยหลัก \"Universal Design\" ที่ผสานความลงตัวระหว่างพื้นที่ส่วนกลางและภายในบ้านที่ใช้ชีวิตร่วมกัน เพื่อทุกช่วงเวลาดี ๆ แสนพิเศษของครอบครัว​"
            }
        })
        const section4 = ref({
            title: {
                en: "DESIGN FOR SUSTAINABLE WELL-BEING",
                th: "DESIGN FOR SUSTAINABLE WELL-BEING"
            },
            detail: {
                en: "Every detail matters. From premium materials to innovative design, every element is meticulously crafted. We prioritize health and well-being, creating a sustainable home that enhances your quality of life and enduring happiness in your home.​​",
                th: "พิถีพิถันในการคัดสรรวัสดุคุณภาพจนถึงการออกแบบที่สวยงาม พร้อมนำนวัตกรรมเพื่อสุขภาพที่ตอบโจทย์ทุกสภาพแวดล้อม เพื่อความสมบูรณ์แบบแห่งการอยู่อาศัย​​"
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