// Define the Header component
const DesignConceptComponent = defineComponent({
    name: 'DesignConceptComponent',
    template: `
    <section class="design-concept-component onview" id="design-concept" data-section="design_concept">
        <div class="relative lg:pb-[20rem] flex bg-[#efe6e3]">
            <div>
                <div
                    class="absolute left-0 top-0 w-full  h-full overflow-hidden bg-[url('/assets/image/page-smyth-ramintra/design-concept/bg.png')] bg-cover bg-top">
                </div>
                <div
                    class="absolute w-full h-full top-0 left-0 overflow-hidden bg-[url('/assets/image/page-smyth-ramintra/design-concept/layout-bg-3.png')] bg-cover bg-top mix-blend-multiply">
                </div>
            </div>
            <div class="lg:block hidden">
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-easing="linear"
                    class="absolute right-0 top-10  w-1/2 h-5/6 overflow-hidden bg-[url('/assets/image/page-smyth-ramintra/design-concept/house.png')] bg-cover bg-center">
                </div>
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-easing="linear"
                    class="absolute right-0 top-10  w-1/2 h-5/6 overflow-hidden bg-[url('/assets/image/page-smyth-ramintra/design-concept/layout-effect.png')] bg-cover bg-center">
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
                                class="uppercase font-['Tenor_Sans'] lg:text-[55px] text-[40px] text-white leading-none">
                                METROPOLITIAN <br/>TROPICAL MODERN​
                            </h3>
                            <img src="/assets/image/page-smyth-kaset/design-concept/house.png" alt="" class="my-5 lg:hidden">
                            <p class="lg:text-white font-light w-3/4 text-[14px] lg:mt-6 " data-aos="fade-up" data-aos-delay="200"
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
            en: 'The concept of "METROPOLITAN TROPICAL MODERN" architecture. Blending natural elements with the urban context, this concept delivers a harmonious balance. Every element is meticulously crafted, elevating your living experience through elegance and simplicity. Each house features distinctive characteristics that express your unique personality and refined taste.',
            th: 'ภายใต้แนวคิด METROPOLITAN TROPICAL MODERN ผสมผสานความเป็นธรรมชาติเข้ากับบริบทของทำเลเมืองได้อย่างลงตัว สัมผัสทุกองค์ประกอบที่ได้รับการออกแบบอย่างพิถีพิถัน เพื่อยกระดับประสบการณ์การอยู่อาศัย ด้วยความหรูหรางดงามแต่ยังคงสวยงามเรียบง่าย สะท้อนตัวตนและรสนิยมยมของผู้อยู่อาศัย  บ้านทุกหลังมีจุดเด่นที่บ่งบอกความเป็นตัวตนที่ไม่เหมือนใคร​'
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
