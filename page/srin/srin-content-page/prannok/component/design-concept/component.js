// Define the Header component
const DesignConceptComponent = defineComponent({
    name: 'DesignConceptComponent',
    template: `
    <section class="design-concept-component onview" id="design-concept" data-section="design_concept" >
        <div class="relative lg:pb-[20rem] bg-[#271713] flex">
            <div>
                <div
                    class="absolute left-0 top-0 lg:w-full w-full  h-full overflow-hidden bg-[url('/assets/image/page-srin-prannok/design-concept/bg-m.png')]  lg:bg-[url('/assets/image/page-srin-prannok/design-concept/bg.png')] bg-cover bg-top">
                </div>
                <div
                    class="absolute w-full h-full bottom-0 left-0 overflow-hidden bg-[url('/assets/image/page-srin-prannok/design-concept/bg-m-layout.png')] lg:bg-[url('/assets/image/page-srin-prannok/design-concept/layout-bg-2.png')] bg-cover bg-center">
                </div>
            </div>
            <div class="lg:block hidden">
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-easing="linear"
                    class="absolute right-0 top-10  w-1/2 h-5/6 overflow-hidden bg-[url('/assets/image/page-srin-prannok/design-concept/swim-pool.png')] bg-cover bg-center">
                </div>
            </div>
            <div class="container mx-auto relative mt-20 mb-5 px-0 lg:px-5">
                <div class="flex lg:flex-row flex-col">
                    <div class="lg:w-1/2 w-full">
                        <div class="flex flex-col gap-3">
                            <h2 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"
                                class="uppercase text-[#6F5328] font-['Kaisei_Decol'] font-medium lg:text-[40px] text-[24px] leading-none lg:px-0 px-5">
                                Design Concept
                            </h2>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap font-['Kaisei_Decol'] lg:text-[60px] text-[35px] text-[#013B5E] leading-none lg:px-0 px-5">
                                MEDITERRANEAN <br>REVIVAL
                            </h3>
                            <img src="/assets/image/page-srin-prannok/design-concept/swim-pool.png" alt="" class="my-5 lg:hidden">
                            <p class="text-[#013B5E] font-normal w-full lg:w-3/4 text-[14px] lg:mt-6 lg:px-0 px-5" data-aos="fade-up" data-aos-delay="200"
                                data-aos-duration="300" data-aos-easing="linear">
                               {{description[language]}}
                            </p>
                            <p class="text-[#013B5E] font-normal w-full lg:w-3/4 text-[14px] lg:mt-6 lg:px-0 px-5" data-aos="fade-up" data-aos-delay="200"
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
            en: 'Experience the pinnacle of luxury living, blending Mediterranean elegance with a home designed to harmonize with nature. Feel the breeze and sunlight drawn into the heart of the house, creating a serenity with an airy, open ambiance. Every detail is tailored to connect spacious outdoor living areas with an interior built for comfort, making it perfect for families spanning three generations.',
            th: 'สัมผัสประสบการณ์การอยู่อาศัยระดับพรีเมียมและสเน่ห์ของทะเลเมดิเตอร์เรเนียน ผสานความสวยงามของบ้านที่ดึงธรรมชาติทั้งสายลมและแสงแดด เข้ามาสู่ตัวบ้าน สร้างบรรยากาศที่โปร่ง โล่ง สบาย ด้วยพื้นที่เชื่อมต่อระหว่างมุมพักผ่อนกว้างขวางภายนอกบ้าน ตอบโจทย์ทุกการใช้พื้นที่เหมาะสำหรับทุกคนในครอบครัวทั้ง 3 เจนเนอเรชั่น​'
        })
        const description2 = ref({
            en: 'Inspired by Singha Estate’s ‘CRAFTED TO LAST’ philosophy, this is more than just a home—it is a legacy of beauty, sustainability, and effortless maintenance.',
            th: 'จากแนวคิด “CRAFTED TO LAST” ของสิงห์ เอสเตท เพื่อมอบบ้านที่เป็นมากกว่าที่อยู่อาศัย อยู่สบายและให้คุณค่า พร้อมความงาม ความยั่งยืน และง่ายต่อการบำรุงรักษา​'
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
