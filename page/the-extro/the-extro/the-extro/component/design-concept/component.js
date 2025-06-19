// Define the Header component
const DesignConceptComponent = defineComponent({
    name: 'DesignConceptComponent',
    template: `
    <section class="design-concept-component onview" id="design_concept" data-section="design_concept" >
        <div class="relative  min-h-[800px]  flex bg-cover bg-center" :style="{ backgroundImage: 'url(' + BgImage + ')' }">
            <div class="lg:block hidden">
                <div data-aos="fade-left" data-aos-duration="1000" data-aos-easing="linear"
                    class="absolute right-0 top-0  w-1/2 h-full overflow-hidden  bg-cover bg-center" :style="{ backgroundImage: 'url(' + sideImage + ')' }">
                </div>
            </div>
            <div class="container mx-auto relative my-20 px-0 lg:px-5">
                <div class="flex lg:flex-row flex-col">
                    <div class="lg:w-1/2 w-full">
                        <div class="flex flex-col gap-3">
                            <h2 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"
                                class="uppercase text-[#6F5328] font-medium  text-[24px] leading-none lg:px-0 px-5">
                                Design Concept
                            </h2>
                            <hr class="border-[#7C5711] w-1/5 lg:mx-0 mx-5"  data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"/>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap lg:text-[60px] text-[35px] text-[#013B5E] leading-none lg:px-0 px-5" v-html="title">
                            </h3>
                            <img :src="sideImage" alt="" class="my-5 lg:hidden">
                            <p class="text-[#013B5E] font-normal w-full lg:w-3/5 text-[14px] lg:mt-6 lg:px-0 px-5" data-aos="fade-up" data-aos-delay="200"
                                data-aos-duration="300" data-aos-easing="linear" v-html="description[language]">
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
        const BgImage = ref('/assets/image/page-the-extro/the-extro/design-concept/bg.png')
        const sideImage = ref('/assets/image/page-the-extro/the-extro/design-concept/R6C23644-HDR.jpg')
        const title = ref("WHERE YOUR<br/> EXTRAORDINARY<br/> LIVING BEGINS")
        const description = ref({
            en: 'Our condominium boasts contemporary luxurious design and selective amenities, allowing you to enjoy the perfect blend of urban convenience and nature while residing in the center of Bangkok. Create your ideal lifestyle anytime, anywhere.​',
            th: 'ทำเลที่ตั้งคอนโดที่เพียบพร้อมด้วยดีไซน์ลักซัวรีร่วมสมัย ให้คุณอยู่ใกล้ชิดธรรมชาติได้ตลอด 24 ชั่วโมง แม้อยู่ใจกลางเมือง ที่ที่คุณใช้ชีวิตพร้อมความสะดวกสบายและมีไลฟ์สไตล์ในแบบที่คุณต้องการ'
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

        return { template, language, description, BgImage, sideImage, title };
    }
});
