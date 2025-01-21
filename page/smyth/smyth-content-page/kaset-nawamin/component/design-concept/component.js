// Define the Header component
const DesignConceptComponent = defineComponent({
    name: 'DesignConceptComponent',
    template: `
    <section class="design-concept-component onview" id="design-concept" data-section="design_concept">
        <div class="relative lg:pb-[20rem] bg-[#271713] flex">
            <div>
                <div
                    class="absolute left-0 top-0 lg:w-3/5 w-full  h-full overflow-hidden bg-[url('/assets/image/page-smyth-kaset/design-concept/bg.png')] bg-cover bg-top">
                </div>
                <div
                    class="absolute w-full h-full bottom-0 left-0 overflow-hidden bg-[url('/assets/image/page-smyth-kaset/design-concept/layout-bg-2.png')] bg-cover bg-center">
                </div>
                <div
                    class="absolute w-full h-1/2 bottom-0 left-0 overflow-hidden bg-[url('/assets/image/page-smyth-kaset/design-concept/layout-bg-1.png')] bg-cover bg-center mix-blend-multiply">
                </div>
            </div>
            <div class="lg:block hidden">
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-easing="linear"
                    class="absolute right-0 top-10  w-1/2 h-5/6 overflow-hidden bg-[url('/assets/image/page-smyth-kaset/gallery/exterior4.jpg')] bg-cover bg-center">
                </div>
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-easing="linear"
                    class="absolute right-0 top-10  w-1/2 h-5/6 overflow-hidden bg-[url('/assets/image/page-smyth-kaset/design-concept/layout-effect.png')] bg-cover bg-center">
                </div>
            </div>
            <div class="container mx-auto relative my-20">
                <div class="flex lg:flex-row flex-col">
                    <div class="lg:w-1/2 w-full">
                        <div class="flex flex-col gap-3">
                            <h2 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"
                                class="uppercase text-[#D0BF98] font-['Gotham'] font-medium lg:text-[40px] text-[24px] leading-none">
                                Design Concept
                            </h2>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap font-['Tenor_Sans'] lg:text-[76px] text-[40px] text-white leading-none">
                                URBAN TWIST
                            </h3>
                            <img src="/assets/image/page-smyth-kaset/design-concept/house.png" alt="" class="my-5 lg:hidden">
                            <p class="text-white font-light lg:w-3/4 text-[14px] lg:mt-6 " data-aos="fade-up" data-aos-delay="200"
                                data-aos-duration="300" data-aos-easing="linear">
                               {{description[language]}}
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
            en: 'The "Urban Twist" design concept perfectly combines classic and modern elements to create a distinctive, timeless aesthetic. Crafted with high-quality materials and warm color tones, each unit exudes premium quality and comfort with a sense of simplicity to detail. This is a residence for those with unique taste, offering warm, inviting, and impressive living spaces.​',
            th: 'SMYTH’S นำเสนอแนวคิดการออกแบบ Urban Twist ผสมผสานความคลาสสิกกับความทันสมัยอย่างลงตัว ก่อเกิดความงามที่มีเอกลักษณ์และมีความโดดเด่นเฉพาะตัว ทุกยูนิตได้รับการออกแบบอย่างพิถีพิถัน ด้วยวัสดุคุณภาพสูงและเลือกใช้โทนสีที่ให้ความรู้สึกอบอุ่น สื่อถึงความพรีเมียมและความสะดวกสบายที่เรียบง่าย สะท้อนถึงความประณีตใส่ใจ นี่คือที่อยู่อาศัยสำหรับผู้ที่มีรสนิยมไม่เหมือนใคร พร้อมมอบพื้นที่พักผ่อนที่ทั้งอบอุ่นและน่าประทับใจ'
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

        return { template, language,description };
    }
});
