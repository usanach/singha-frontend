// Define the Header component
const DesignConceptComponent = defineComponent({
    name: 'DesignConceptComponent',
    template: `
    <section class="design-concept-component onview" id="design-concept" data-section="design_concept" >
        <div class="relative  flex bg-cover bg-center" :style="{ backgroundImage: 'url(' + BgImage + ')' }">
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
                                class="uppercase text-[#6F5328] font-['Gothem'] font-medium  text-[24px] leading-none lg:px-0 px-5">
                                Design Concept
                            </h2>
                            <hr class="border-[#7C5711] w-1/5 lg:mx-0 mx-5"  data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"/>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap font-['Gothem'] lg:text-[60px] text-[35px] text-[#013B5E] leading-none lg:px-0 px-5" v-html="title">
                            </h3>
                            <img src="/assets/image/page-srin-prannok/design-concept/swim-pool.png" alt="" class="my-5 lg:hidden">
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
        const sideImage = ref('/assets/image/page-the-extro/the-extro/design-concept/0371.png')
        const title = ref("WHERE YOUR<br/> EXTRAORDINARY<br/> LIVING BEGINS")
        const description = ref({
            en: 'Experience the pinnacle of luxury living, blending Mediterranean elegance with a home designed to harmonize with nature. Feel the breeze and sunlight drawn into the heart of the house, creating a serenity with an airy, open ambiance. Every detail is tailored to connect spacious outdoor living areas with an interior built for comfort, making it perfect for families spanning three generations.',
            th: 'THE EXTRO PHAYATHAI-RANGNAM <br/>is home to everything <br/><br/> A city resident would wish for in a condominium development, Get the most out of city living with nature and every desirable convenience within reach.<br/><br/>In an outstanding location of endless possibilities,<br/><br/>the luxurious contemporary design puts you in touch with nature twenty-four hours a day and offers the ultimate backdrop to forge the lifestyle you desire whenever and wherever you want. '
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
