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
                                class="uppercase text-[#76533F] font-medium  lg:text-[35px] text-[22px] leading-none" :style="{fontFamily:'Gotham'}">
                                Design Concept
                            </h2>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap lg:text-[70px] text-[35px] text-[#451E24] leading-none font-normal font-['Gotham']" v-html="title">
                            </h3>
                            <img :src="sideImage" alt="" class="my-5 lg:hidden">
                            <p class="text-[#451E24] font-normal w-full lg:w-3/5 lg:mt-6 " data-aos="fade-up" data-aos-delay="200"
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
        const BgImage = ref('')
        const sideImage = ref('/assets\/image\/page-the-esse-asoke\/design-concept\/The-ESSE-Asoke_f43-26-lowres.png')
        const title = ref("CONTEMPORARY <br/>MODERN STYLE")
        const description = ref({
            en: 'The breathtaking tower, a contemporary modern style soars above city at 240 metres in the sky with total of 55 floors, 419 units, prime land plot. With all the conveniences surrounding; business towers, renowned shopping centres, and the focal area for entertainment, this residence is set to become the pinnacle of Bangkok skyline.​',
            th: 'The breathtaking tower, a contemporary modern style soars above city at 240 metres in the sky with total of 55 floors, 419 units, prime land plot. With all the conveniences surrounding; business towers, renowned shopping centres, and the focal area for entertainment, this residence is set to become the pinnacle of Bangkok skyline.​'
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
