// Define the Header component
const ProjectsHighlightComponent = defineComponent({
    name: 'ProjectsHighlightComponent',
    template: `
    <section class="onview -mt-1" id="ProjectsHighlightComponent" data-section="project_signature">
        <div class="relative">
            <div class="bg-[url('/assets/image/page-shawn-wongwaen/description/bg.png')] bg-cover bg-bottom pt-10 pb-20">
                <div class="container mx-auto lg:px-5 px-0">
                    <div>
                        <h2 class="font-['DB_Heavent'] text-[#3D2120] text-[50px] lg:text-[70px] text-center" data-aos="fade-up"
                            data-aos-duration="500" data-aos-easing="linear">
                            {{title[language]}}
                        </h2>
                    </div>
                    <div class="flex flex-col gap-10 mt-5">
                        <div class="flex lg:gap-10 gap-5 lg:mt-4 lg:flex-row flex-col lg:w-full w-11/12 ml-auto">
                            <div class="lg:w-3/5 w-full">
                                <img src="/assets/image/page-shawn-wongwaen/description/wongwaen-1.png" alt="" class="w-full"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:w-2/5 w-full justify-center lg:px-0 px-5 lg:items-start items-end">
                                <h3 class="font-['Gotham'] text-[#54457B] text-[50px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    01
                                </h3>
                                <h3 class="font-['Gotham'] text-[#54457B] text-[30px] font-normal !mt-0" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{section1.title[language]}}
                                </h3>
                                <p class="text-[#2C2C2C] text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="300">
                                    {{section1.detail[language]}}
                                </p>
                            </div>
                        </div>
                        <div class="flex lg:gap-10 gap-5 lg:mt-4 lg:flex-row flex-col-reverse lg:w-full w-11/12 mr-auto">
                            <div class="lg:w-2/5 w-full my-auto flex lg:px-0 px-5">
                                <div class="lg:w-2/3 ml-auto space-y-2 lg:text-end">
                                <h3 class="font-['Gotham'] text-[#54457B] text-[50px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    02
                                </h3>
                                    <h3 class="font-['Gotham'] text-[#54457B] text-[30px] font-normal !mt-0" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                                    {{section2.title[language]}}
                                    </h3>
                                    <p class="text-[#2C2C2C] text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="200">
                                    {{section2.detail[language]}}
                                    </p>
                                </div>
                            </div>
                            <div class="lg:w-3/5 w-full" data-aos="fade-up" data-aos-duration="1000"
                                data-aos-easing="linear">
                                <img src="/assets/image/page-shawn-wongwaen/description/wongwaen-2.png" class="lg:block hidden"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                    alt="">
                                <img src="/assets/image/page-shawn-wongwaen/description/wongwaen-2.png" alt="" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                    class="lg:hidden block w-full">
                            </div>
                        </div>
                        <div class="flex lg:gap-10 gap-5 lg:mt-4 lg:flex-row flex-col lg:w-full w-11/12 ml-auto">
                            <div class="lg:w-3/5 w-full">
                                <img src="/assets/image/page-shawn-wongwaen/description/wongwaen-3.png" alt="" class="w-full"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:w-2/5 w-full justify-center lg:px-0 px-5 lg:items-start items-end">
                                <h3 class="font-['Gotham'] text-[#54457B] text-[50px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    03
                                </h3>
                                <h3 class="font-['Gotham'] text-[#54457B] text-[30px] font-normal !mt-0" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{section3.title[language]}}
                                </h3>
                                <p class="text-[#2C2C2C] text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="300">
                                    {{section3.detail[language]}}
                                </p>
                            </div>
                        </div>
                        <div class="flex lg:gap-10 gap-5 lg:mt-4 lg:flex-row flex-col-reverse lg:w-full w-11/12 mr-auto">
                            <div class="lg:w-2/5 w-full my-auto flex lg:px-0 px-5">
                                <div class="lg:w-2/3 ml-auto space-y-2 lg:text-end">
                                <h3 class="font-['Gotham'] text-[#54457B] text-[50px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    04
                                </h3>
                                    <h3 class="font-['Gotham'] text-[#54457B] text-[30px] font-normal !mt-0" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                                    {{section4.title[language]}}
                                    </h3>
                                    <p class="text-[#2C2C2C] text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="200">
                                    {{section4.detail[language]}}
                                    </p>
                                </div>
                            </div>
                            <div class="lg:w-3/5 w-full" data-aos="fade-up" data-aos-duration="1000"
                                data-aos-easing="linear">
                                <img src="/assets/image/page-shawn-wongwaen/description/wongwaen-4.png" class="lg:block hidden"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                    alt="">
                                <img src="/assets/image/page-shawn-wongwaen/description/wongwaen-4.png" alt="" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                    class="lg:hidden block w-full">
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
                en: "PROVISION FOR ​",
                th: "PROVISION FOR ​"
            },
            detail: {
                en: "บ้านที่รองรับการเติบโตของครอบครัว ปรับขยายได้ตามไลฟ์สไตล์​​",
                th: "บ้านที่รองรับการเติบโตของครอบครัว ปรับขยายได้ตามไลฟ์สไตล์​"
            }
        })
        const section2 = ref({
            title: {
                en: "SPACE FOR​",
                th: "SPACE FOR​"
            },
            detail: {
                en: "บ้านที่ออกแบบสำหรับสมาชิกทุกวัยของครอบครัว คำนึงถึงเด็กเล็กและผู้สูงอายุ ทั้งพื้นที่ส่วนตัวและพื้นที่ส่วนกลาง ​",
                th: "บ้านที่ออกแบบสำหรับสมาชิกทุกวัยของครอบครัว คำนึงถึงเด็กเล็กและผู้สูงอายุ ทั้งพื้นที่ส่วนตัวและพื้นที่ส่วนกลาง ​​"
            }
        })
        const section3 = ref({
            title: {
                en: "MAXIMIZE ",
                th: "MAXIMIZE "
            },
            detail: {
                en: "เปิดรับบรรยากาศสดชื่นใกล้ชิดธรรมชาติได้มากขึ้น สามารถใช้พื้นที่สวนได้อย่างเต็มที่ บนที่ดินเริ่มต้น 101 ตร.ว. จัดแปลนให้บ้าน แต่ละหลังได้ประโยชน์จากพื้นที่สวนมากที่สุด​​",
                th: "เปิดรับบรรยากาศสดชื่นใกล้ชิดธรรมชาติได้มากขึ้น สามารถใช้พื้นที่สวนได้อย่างเต็มที่ บนที่ดินเริ่มต้น 101 ตร.ว. จัดแปลนให้บ้าน แต่ละหลังได้ประโยชน์จากพื้นที่สวนมากที่สุด​​"
            }
        })
        const section4 = ref({
            title: {
                en: "FENGSHUI ",
                th: "FENGSHUI "
            },
            detail: {
                en: "ออกแบบภายใต้หลักฮวงจุ้ยที่ถูกต้อง ช่วยเรื่องความสงบ และสะดวกสบาย รวมถึงเสริมสร้างสิริมงคลให้แก่ผู้อาศัย​​",
                th: "ออกแบบภายใต้หลักฮวงจุ้ยที่ถูกต้อง ช่วยเรื่องความสงบ และสะดวกสบาย รวมถึงเสริมสร้างสิริมงคลให้แก่ผู้อาศัย​​"
            }
        })
        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        // const loadTemplate = async (lang) => {
        //     try {
        //         const templateResponse = await axios.get('/page/smyth/smyth-content-page/kaset-nawamin/component/project-highlights/template.html');
        //         let templateContent = templateResponse.data;
        //         // Replace placeholders with actual data
        //         templateContent = templateContent
        //         template.value = templateContent;
        //     } catch (error) {
        //         console.error('Failed to load template:', error);
        //     }
        // };
        const init = () => {
            AOS.init();
        }
        onMounted(async () => {
            language.value = getLanguageFromPath();
            // await loadTemplate(language.value);

            nextTick(() => {
                init();  // ScrollTrigger is initialized after template is loaded and DOM is updated
            });
        });

        return { template, language, title, section1, section2, section3, section4 };
    }
});