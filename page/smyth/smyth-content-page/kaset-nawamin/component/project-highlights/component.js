// Define the Header component
const ProjectsHighlightComponent = defineComponent({
    name: 'ProjectsHighlightComponent',
    template: `
    <section class="" id="ProjectsHighlightComponent" >
        <div class="relative">
            <div class="bg-[#271713] pt-10 pb-20">
                <div class="container mx-auto lg:px-5 px-0">
                    <div class="flex flex-col gap-10">
                        <div>
                            <h2 class="font-['DB_Heavent'] text-[#BA998B] text-[70px] text-center" data-aos="fade-up"
                                data-aos-duration="500" data-aos-easing="linear">
                                {{title[language]}}
                            </h2>
                        </div>
                        <div class="flex flex-col lg:px-20 lg:gap-10 gap-5">
                            <div class="lg:mx-0 -mx-20">
                                <img src="/assets/image/page-smyth-kaset/description/kaset-1.png" alt="" class="w-full"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5">
                                <p class="font-['Gotham'] text-white text-[20px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{section1.title[language]}}
                                </p>
                                <p class="text-white text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="300">
                                    {{section1.detail[language]}}
                                </p>
                            </div>
                        </div>
                        <div class="flex lg:gap-10 gap-5 lg:mt-20 lg:flex-row flex-col">
                            <div class="lg:w-3/5 w-full">
                                <img src="/assets/image/page-smyth-kaset/description/kaset-2.png" alt="" class="w-full"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:w-2/5 w-full justify-center lg:px-0 px-5">
                                <p class="font-['Gotham'] text-white text-[20px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{section2.title[language]}}
                                </p>
                                <p class="text-white text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="300">
                                    {{section2.detail[language]}}
                                </p>
                            </div>
                        </div>
                        <div class="flex lg:gap-10 gap-5 lg:mt-20 lg:flex-row flex-col-reverse">
                            <div class="lg:w-1/2 w-full my-auto flex lg:px-0 px-5">
                                <div class="lg:w-2/3 ml-auto space-y-2">
                                    <p class="font-['Gotham'] text-white text-[20px] font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                                    {{section3.title[language]}}
                                    </p>
                                    <p class="text-white text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="200">
                                    {{section3.detail[language]}}
                                    </p>
                                </div>
                            </div>
                            <div class="lg:w-1/2 w-full lg:px-10" data-aos="fade-up" data-aos-duration="1000"
                                data-aos-easing="linear">
                                <img src="/assets/image/page-smyth-kaset/description/kaset-3.png" class="lg:block hidden"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                    alt="">
                                <img src="/assets/image/page-smyth-kaset/description/kaset-3-m.png" alt="" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                    class="lg:hidden block w-full">
                            </div>
                        </div>
                        <div class="flex flex-col lg:px-20 lg:gap-10 gap-5 lg:mt-20">
                            <div class=" mx-auto">
                                <img src="/assets/image/page-smyth-kaset/description/kaset-4.png" alt="" class="max-h-[450px]"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5">
                                <p class="font-['Gotham'] text-white text-[20px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{section4.title[language]}}
                                </p>
                                <p class="text-white text-[14px]" data-aos="fade-up" data-aos-duration="500"
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
                en: "1. GRAND LIVING ROOM with POOL ACCESS ​",
                th: "1. GRAND LIVING ROOM with POOL ACCESS ​"
            },
            detail: {
                en: "The home layout is artfully crafted to provide an intimate and private experience. the second floor of each home features a spacious living room with a high double-volume ceiling and a private pool. Enjoy breathtaking panoramic views with an open, airy atmosphere in your own place.​",
                th: " การออกแบบอย่างพิถีพิถันเพื่อความรู้สึกที่เป็นส่วนตัว บนพื้นที่ชั้นสองของบ้าน ที่มาพร้อมกับห้องนั่งเล่นขนาดใหญ่และโถงเพดานสูงแบบ Double Volume Space พร้อมสระว่ายน้ำส่วนตัว ผ่อนคลาย โปร่งโล่งสบาย ด้วยวิวแบบพาโนรามา เพื่อประสบการณ์การอยู่ีอาศัยที่ไม่เหมือนใคร"
            }
        })
        const section2 = ref({
            title: {
                en: "2. GUEST LOUNGE​​",
                th: "2. GUEST LOUNGE​​"
            },
            detail: {
                en: "The interior floor plan clearly separates private spaces from guest reception areas. The ground floor can be adapted for guest entertainment, ensuring impressive and proud hosting for your important visitors.​​",
                th: "การจัดวางพื้นที่ภายในช่วยให้สามารถแยกพื้นที่ใช้สอยส่วนตัวและพื้นที่สำหรับต้อนรับแขกได้อย่างชัดเจน พื้นที่ชั้นแรกสามารถปรับเปลี่ยนฟังก์ใช้สำหรับต้อนรับแขกได้อย่างภูมิฐาน เพื่อให้การต้อนรับและสร้างความประทับใจให้กับผู้มาเยือนคนสำคัญเป็นไปอย่างน่าภาคภูมิใจ"
            }
        })
        const section3 = ref({
            title: {
                en: "3. PENTHOUSE SUITE on GROUND ​",
                th: "3. PENTHOUSE SUITE on GROUND ​"
            },
            detail: {
                en: "Indulge in exclusivity with a master bedroom suite designed to provide a penthouse-like ambiance within your residence. Seamlessly connected to the living area, every corner combines sophistication, relaxation, and comfort​",
                th: "สัมผัสบรรยากาศพิเศษด้วยการออกแบบอย่างพิถีพิถัน สร้างสรรค์ห้องนอนมาสเตอร์ขนาดใหญ่ที่ให้ความรู้สึกของเพนท์เฮ้าส์ในที่พักอาศัยของคุณเอง เพิ่มความมีเสน่ห์น่าประทับใจ ด้วยการเชื่อมต่อกับพื้นที่นั่งเล่นอย่างกลมกลืน ให้คุณผ่อนคลายและสะดวกสบายในทุกมุมของบ้าน"
            }
        })
        const section4 = ref({
            title: {
                en: "4. HIDEAWAY CHAMBER ​",
                th: "4. HIDEAWAY CHAMBER ​"
            },
            detail: {
                en: " A personalized space designed to adapt to your lifestyle — whether as a party room, music lounge, or favorite gaming paradise. This chamber offers seamless connectivity between the internal supercar parking and the front garage, enhancing leisure and convenience.​​",
                th: "พื้นที่ส่วนตัวที่ออกแบบให้ปรับแต่งได้ตามไลฟ์สไตล์อันเป็นเอกลักษณ์เฉพาะตัว จะใช้เป็นห้องจัดปาร์ตี้ ห้องฟังเพลง หรือพื้นที่เล่นเกมสุดโปรดก็ทำได้ตามต้องการ ห้องนี้ช่วยเพิ่มช่วงเวลาพักผ่อนให้สะดวกสบายยิ่งขึ้น ด้วยการเชื่อมพื้นที่จอดรถซุปเปอร์คาร์ภายในกับโรงจอดรถด้านหน้าได้อย่างลงตัว​"
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
                const templateResponse = await axios.get('/page/smyth/smyth-content-page/kaset-nawamin/component/project-highlights/template.html');
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

        return { template, language, title, section1,section2,section3,section4 };
    }
});