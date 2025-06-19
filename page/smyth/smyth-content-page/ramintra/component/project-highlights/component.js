// Define the Header component
const ProjectHighlightComponent = defineComponent({
    name: 'ProjectHighlightComponent',
    template: `
    <section class="onview -mt-1" id="project_signature" data-section="project_signature">
        <div
            class="relative lg:bg-[url('/assets/image/page-smyth-ramintra/design-concept/bg-all.png')] bg-[url('/assets/image/page-smyth-ramintra/design-concept/bg-all-m.png')] bg-cover bg-left">
            <div class="pt-10 pb-20">
                <div class="container mx-auto lg:px-5 px-0">
                    <div>
                        <h2 class="text-[#BA998B] text-[50px] lg:text-[70px] text-center" data-aos="fade-up"
                            data-aos-duration="500" data-aos-easing="linear">
                            {{title[language]}}
                        </h2>
                    </div>
                    <div class="flex flex-col gap-10 mt-5">
                        <div class="flex flex-col lg:px-20 lg:gap-10 gap-5">
                            <div class="lg:mx-0 -mx-20">
                                <img src="/assets/image/page-smyth-ramintra/description/ramintra-1.png" alt="" class="w-full"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5">
                                <h3 class="text-[20px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{section1.title[language]}}
                                </h3>
                                <p class=" text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="300">
                                    {{section1.detail[language]}}
                                </p>
                            </div>
                        </div>
                        <div class="flex lg:gap-10 gap-5 lg:mt-20 lg:flex-row flex-col">
                            <div class="lg:w-3/5 w-full">
                                <img src="/assets/image/page-smyth-ramintra/description/ramintra-2.png" alt="" class="w-full"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:w-2/5 w-full justify-center lg:px-0 px-5">
                                <h3 class="text-[20px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{section2.title[language]}}
                                </h3>
                                <p class=" text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="300">
                                    {{section2.detail[language]}}
                                </p>
                            </div>
                        </div>
                        <div class="flex lg:gap-10 gap-5 lg:mt-20 lg:flex-row flex-col-reverse">
                            <div class="lg:w-1/2 w-full my-auto flex lg:px-0 px-5">
                                <div class="lg:w-2/3 ml-auto space-y-2">
                                    <h3 class=" text-[20px] font-normal" data-aos="fade-up"
                                        data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                                    {{section3.title[language]}}
                                    </h3>
                                    <p class=" text-[14px]" data-aos="fade-up" data-aos-duration="500"
                                        data-aos-easing="linear" data-aos-delay="200">
                                    {{section3.detail[language]}}
                                    </p>
                                </div>
                            </div>
                            <div class="lg:w-1/2 w-full lg:px-10" data-aos="fade-up" data-aos-duration="1000"
                                data-aos-easing="linear">
                                <img src="/assets/image/page-smyth-kaset/gallery/4.png" class="lg:block hidden"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                    alt="">
                                <img src="/assets/image/page-smyth-kaset/gallery/4.png" alt="" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100"
                                    class="lg:hidden block w-full">
                            </div>
                        </div>
                        <div class="flex flex-col lg:px-20 lg:gap-10 gap-5 lg:mt-20 lg:w-3/4 mx-auto">
                            <div class="mx-auto">
                                <img :src="section4.image" alt=""
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                            </div>
                            <div class="flex flex-col gap-2 lg:px-0 px-5">
                                <h3 class=" text-[20px] font-normal" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200">
                                    {{section4.title[language]}}
                                </h3>
                                <p class=" text-[14px]" data-aos="fade-up" data-aos-duration="500"
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
                en: "SANCTUARY OF SECLUSION​​",
                th: "SANCTUARY OF SECLUSION​​"
            },
            detail: {
                en: "Each residence is designed with a beautiful private court visible from all key areas of the home while maintaining complete privacy from neighbors. The double-wall construction reduces external noise, creating a serene living environment and offering a truly unmatched living experience.",
                th: "ออกแบบและวางแปลนให้แต่ละบ้านมี Private Court ที่สวยงาม สามารถมองเห็นได้จากทุกพื้นที่สำคัญภายในบ้าน โดยยังคงรักษาความเป็นส่วนตัวจากบ้านรอบข้าง พร้อมการก่อผนัง 2 ชั้น ช่วยลดเสียงรบกวนจากภายนอก สร้างความสุนทรีย์ในการอยู่อาศัยและมอบประสบการณ์การอยู่อาศัยที่ไม่เหมือนใคร"
            }
        })
        const section2 = ref({
            title: {
                en: "PANORAMIC LIVING AREA​",
                th: "PANORAMIC LIVING AREA ​​"
            },
            detail: {
                en: "A wide living area connected to the dining space and spanning 11 meters wide, creates an open and relaxing atmosphere through large glass windows. The design offers a panoramic view of the private inner court where you can customize as a lush green space or a swimming pool. This homey central space is designed for meaningful family time while preserving maximum privacy for all members.​​",
                th: "พื้นที่นั่งเล่นขนาดใหญ่เชื่อมต่อกับพื้นที่รับประทานอาหาร มีความกว้างถึง 11 เมตร พร้อมสร้างบรรยากาศที่โปร่งโล่งและผ่อนคลาย จากหน้าต่างกระจกบานใหญ่ เปิดมุมมองวิวสวนส่วนตัว (Private inner court) ได้แบบพาโนรามา โดยพื้นที่สวนสามารถปรับแต่งให้เป็นสวนเขียวชอุ่มหรือสระว่ายน้ำได้ พื้นที่ส่วนกลางที่อบอุ่นนี้ออกแบบมาเพื่อให้ครอบครัวได้ใช้เวลาร่วมกันอย่างมีความหมาย ในขณะที่ยังคงมอบความเป็นส่วนตัวสูงสุดให้แก่เจ้าของบ้าน​"
            }
        })
        const section3 = ref({
            title: {
                en: "HIDEAWAY CHAMBER ​​",
                th: "HIDEAWAY CHAMBER ​​"
            },
            detail: {
                en: "A private space tailored to reflect your identity and inspirations, featuring a double-volume ceiling and direct access to the Supercar Salon. Easy step via a connecting walkway to the house’s second floor enhances convenience. This chamber can be customized to suit your unique lifestyle needs.​​",
                th: "พื้นที่ส่วนตัวที่สะท้อนตัวตนและแรงบันดาลใจของคุณโดยเฉพาะ เป็นห้องเพดานสูงแบบ Double volume space เชื่อมต่อกับ Supercar Salon เพิ่มความสะดวกสบายด้วยทางเดินที่เชื่อมไปยังชั้น 2 ของตัวบ้านได้ และสามารถปรับเปลี่ยนบริเวณนี้ให้เป็นพื้นที่ส่วนตัวสุดพิเศษได้ตามความต้องการ ​"
            }
        })
        const section4 = ref({
            title: {
                en: "PENTHOUSE SUITE on GROUND​",
                th: "PENTHOUSE SUITE on GROUND​"
            },
            image:"/assets/image/page-smyth-ramintra/register/MSBED-04.png",
            detail: {
                en: "Experience a special exclusivity provides a penthouse atmosphere in your own residence through meticulous design, featuring a large master bedroom suite. Seamlessly connected to the living area, this suite offers charm, relaxation, and comfort in every corner.​​​",
                th: "สัมผัสบรรยากาศพิเศษด้วยการออกแบบอย่างพิถีพิถัน สร้างสรรค์ห้องนอนมาสเตอร์ขนาดใหญ่ที่ให้ความรู้สึกของเพนท์เฮ้าส์ในที่พักอาศัยของคุณเอง เพิ่มความมีเสน่ห์น่าประทับใจ ด้วยการเชื่อมต่อกับพื้นที่นั่งเล่นอย่างกลมกลืน ให้คุณผ่อนคลายและสะดวกสบายในทุกมุมของบ้าน​"
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

        return { template, language, title, section1,section2,section3,section4 };
    }
});