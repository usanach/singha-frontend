// Define the Header component
const DesignConceptComponent = defineComponent({
    name: 'DesignConceptComponent',
    template: `
    <section class="design-concept-component onview" id="design-concept" data-section="design_concept">
        <div class="relative lg:pb-[30rem] bg-[#271713] flex">
            <div>
                <div
                    class="absolute left-0 top-0  w-full  h-full overflow-hidden bg-[url('/assets/image/page-shawn-wongwaen/design-concept/bg.png')] bg-cover bg-top">
                </div>
                <div
                    class="absolute w-full h-full bottom-0 left-0 overflow-hidden bg-[url('/assets/image/page-shawn-wongwaen/design-concept/layout-bg-2.png')] bg-cover bg-center">
                </div>
                <div
                    class="absolute w-full h-1/2 bottom-0 left-0 overflow-hidden bg-[url('/assets/image/page-shawn-wongwaen/design-concept/layout-bg-1.png')] bg-cover bg-center mix-blend-multiply">
                </div>
            </div>
            <div class="lg:block hidden">
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-easing="linear"
                    class="absolute right-0 w-1/2 h-full overflow-hidden bg-[url('/assets/image/page-shawn-wongwaen/design-concept/concept-img.png')] bg-cover bg-center">
                </div>
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-easing="linear"
                    class="absolute right-0 top-10  w-1/2 h-5/6 overflow-hidden bg-[url('/assets/image/page-shawn-wongwaen/design-concept/layout-effect.png')] bg-cover bg-center">
                </div>
            </div>
            <div class="md:container mx-auto relative mt-20 mb-5">
                <div class="flex lg:flex-row flex-col">
                    <div class="lg:w-1/2 w-full">
                        <div class="flex flex-col gap-3">
                            <h2 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"
                                class="px-5 xl:px-0 uppercase text-[#3D2120] font-['Gotham'] font-medium lg:text-[40px] text-[24px] leading-none  pb-[1rem] ">
                                Design Concept
                            </h2>
                            <div class="mx-5 xl:mx-0 h-[1px] w-[216px] bg-[#244C5A] mb-4"></div>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="px-5 xl:px-0 uppercase text-nowrap font-['Tenor_Sans'] lg:text-[50px] xl:text-[76px] text-[40px] text-[#362662] leading-none">
                                MODERN <br>TROPICAL <br>COMTEMPORARY
                            </h3>
                            <img src="/assets/image/page-shawn-wongwaen/design-concept/concept-img.png" alt="" class="my-5 lg:hidden">
                            <p class="px-5 xl:px-0 text-[#2C2C2C] lg:w-2/4 text-[14px] lg:mt-6 " data-aos="fade-up" data-aos-delay="200"
                                data-aos-duration="300" data-aos-easing="linear">
                                {{description[language]}}
                            </p>
                            <p class="px-5 xl:px-0 text-[#2C2C2C] lg:w-2/4 text-[14px] lg:mt-2 " data-aos="fade-up" data-aos-delay="200"
                                data-aos-duration="300" data-aos-easing="linear">
                                {{description2[language]}}
                            </p>
                            <p class="px-5 xl:px-0 text-[#2C2C2C] lg:w-2/4 text-[14px] lg:mt-2 " data-aos="fade-up" data-aos-delay="200"
                                data-aos-duration="300" data-aos-easing="linear">
                                {{description3[language]}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language
        const description = ref({
            en: 'SHAWN วงแหวน-จตุโชติ บ้านเดี่ยว 2 ชั้น สไตล์ Modern Classic ​​',
            th: 'SHAWN วงแหวน-จตุโชติ บ้านเดี่ยว 2 ชั้น สไตล์ Modern Classic ​​'
        })
        const description2 = ref({
            en: 'พบแบบบ้านพิเศษ “L-SHAPED RESIDENCE” พร้อมพื้นที่ “BACKYARD” ขนาดใหญ่​​',
            th: 'พบแบบบ้านพิเศษ “L-SHAPED RESIDENCE” พร้อมพื้นที่ “BACKYARD” ขนาดใหญ่​​'
        })
        const description3 = ref({
            en: 'เพิ่มพื้นที่สีเขียว ที่สามารถมองเห็นได้ทุกมุมมองภายในบ้าน ออกแบบโดยยึดหลักความสะดวกสบาย และความปลอดภัยสำหรับการอยู่อาศัย และยังเป็นดีไซน์ที่ “Timeless” เป็นความโมเดิร์นร่วมสมัยที่เต็มไปด้วยความอบอุ่น​​',
            th: 'เพิ่มพื้นที่สีเขียว ที่สามารถมองเห็นได้ทุกมุมมองภายในบ้าน ออกแบบโดยยึดหลักความสะดวกสบาย และความปลอดภัยสำหรับการอยู่อาศัย และยังเป็นดีไซน์ที่ “Timeless” เป็นความโมเดิร์นร่วมสมัยที่เต็มไปด้วยความอบอุ่น​​'
        })

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        // const loadTemplate = async (lang) => {
        //     try {
        //         const templateResponse = await axios.get('/page/smyth/smyth-content-page/kaset-nawamin/component/design-concept/template.html');
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

        return { template, language,description,description2,description3 };
    }
});
