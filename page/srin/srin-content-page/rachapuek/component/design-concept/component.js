// Define the Header component
const DesignConceptComponent = defineComponent({
    name: 'DesignConceptComponent',
    template: `
    <section class="design-concept-component onview" id="design-concept" data-section="design_concept" >
        <div class="relative lg:pb-[20rem] flex">
            
            <div class="lg:block hidden">
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-easing="linear"
                    class="absolute right-0 top-10  w-1/2 h-5/6 overflow-hidden bg-[url('/assets/image/page-srin-rachapuek/design-concept/KANT_X_SRIN84.png')] bg-cover bg-center">
                </div>
            </div>
            <div class="container mx-auto relative mt-20 mb-5 px-0 lg:px-5">
                <div class="flex lg:flex-row flex-col">
                    <div class="lg:w-1/2 w-full">
                        <div class="flex flex-col gap-3">
                            <h2 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"
                                class="uppercase text-white font-['Kaisei_Decol'] font-medium lg:text-[40px] text-[24px] leading-none lg:px-0 px-5">
                                Design Concept
                            </h2>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap font-['Kaisei_Decol'] lg:text-[60px] text-[35px] text-[#DEC87F] leading-none lg:px-0 px-5">
                                MEDITERRANEAN <br>REVIVAL
                            </h3>
                            <img src="/assets/image/page-srin-rachapuek/design-concept/KANT_X_SRIN84.png" alt="" class="my-5 lg:hidden">
                            <p class="text-white font-normal w-full lg:w-3/4 text-[14px] lg:mt-6 lg:px-0 px-5" data-aos="fade-up" data-aos-delay="200"
                                data-aos-duration="300" data-aos-easing="linear">
                               {{description[language]}}
                            </p>
                            <p class="text-white font-normal w-full lg:w-3/4 text-[14px]  lg:px-0 px-5" data-aos="fade-up" data-aos-delay="200"
                                data-aos-duration="300" data-aos-easing="linear">
                               {{description2[language]}}
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
            en: 'ดีไซน์โมเดิร์นร่วมสมัย 2 ชั้น ที่ทันสมัย และเรียบหรู แต่อบอุ่น อันเป็นเอกลักษณ์ของบ้านจากสิงห์ เอสเตท มอบความสวยงามไร้กาลเวลาตามแนวคิด ‘Timeless Design’ ไม่ว่าจะผ่านไปนานเท่าไร ก็ยังดูสวยงามไม่ล้าสมัย',
            th: 'ดีไซน์โมเดิร์นร่วมสมัย 2 ชั้น ที่ทันสมัย และเรียบหรู แต่อบอุ่น อันเป็นเอกลักษณ์ของบ้านจากสิงห์ เอสเตท มอบความสวยงามไร้กาลเวลาตามแนวคิด ‘Timeless Design’ ไม่ว่าจะผ่านไปนานเท่าไร ก็ยังดูสวยงามไม่ล้าสมัย​'
        })
        const description2 = ref({
            en: 'สร้างความเป็นอยู่ที่ยั่งยืน ผ่านความประณีตในการผสมผสานระหว่างนวัตกรรมและเทคโนโลยีที่ตอบโจทย์ด้านความยั่งยืนอย่างแท้จริง ',
            th: 'สร้างความเป็นอยู่ที่ยั่งยืน ผ่านความประณีตในการผสมผสานระหว่างนวัตกรรมและเทคโนโลยีที่ตอบโจทย์ด้านความยั่งยืนอย่างแท้จริง ​'
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

        return { template, language, description, description2 };
    }
});
