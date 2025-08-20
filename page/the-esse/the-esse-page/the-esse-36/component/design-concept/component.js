// Define the Header component
const DesignConceptComponent = defineComponent({
    name: 'DesignConceptComponent',
    template: `
    <section class="design-concept-component onview font-['IBM_Plex_Sans_Thai']" id="design_concept" data-section="design_concept" >
        <div class="relative min-h-[800px]  flex bg-cover bg-center" :style="{ backgroundImage: 'url(' + BgImage + ')' }">
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
                                class="uppercase text-[#76533F] font-medium  lg:text-[35px] text-[22px] leading-none lg:px-0 px-5 font-['Gotham']">
                                Design Concept
                            </h2>
                            <hr class="border-[#7C5711] w-1/5 lg:mx-0 mx-5"  data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"/>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap lg:text-[70px] text-[35px] text-[#451E24] leading-none lg:px-0 px-5 font-normal font-['Gotham']" v-html="title">
                            </h3>
                            <img :src="sideImage" alt="" class="my-5 lg:hidden">
                            <p class="text-[#451E24] font-normal w-full lg:w-3/5 lg:mt-6 lg:px-0 px-5" data-aos="fade-up" data-aos-delay="200"
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
        const BgImage = ref('/assets\/image\/page-the-esse-36\/craft-your-tale\/full-frame-shot-marble-home.jpg')
        const sideImage = ref('/assets/image/page-the-esse-36/design-concept/ES36_HI-RES_C-2.png')
        const title = ref("A HARMONY <br/>OF CONTRAST")
        const description = ref({
            en: 'A sanctuary of tranquility and luxurious exclusivity, the residence stands in stark contrast to the vibrant city life outside. It\'s an escape from the busy urban living, offering a haven where you can truly be who you are.​',
            th: 'สัมผัสความสงบเงียบในบรรยากาศหรูหราเป็นสถานที่สุดพิเศษท่ามกลางชีวิตในเมืองที่วุ่นวาย สถานที่พักพิงแห่งเดียวใจกลางเมือง ให้จิตใจได้ผ่อนคลายและเป็นตัวของตัวเองได้อย่างอิสระแท้จริง'
        })

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

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
