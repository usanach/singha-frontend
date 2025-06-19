// Define the Header component
const DesignConceptComponent = defineComponent({
    name: 'DesignConceptComponent',
    template: `
    <section class="design-concept-component onview" id="design_concept" data-section="design_concept" :class="[fontCss()]" >
        <div class="relative min-h-[800px] flex bg-cover bg-center" :style="{ backgroundImage: 'url(' + BgImage + ')' }">
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
                                class="uppercase text-[#3D2120] font-medium  text-[24px] leading-none lg:px-0 px-5">
                                Design Concept
                            </h2>
                            <hr class="border-[#3D2120] w-1/5 lg:mx-0 mx-5"  data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"/>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap font-['Tenor_Sans'] lg:text-[60px] text-[35px] text-[#362662] leading-none lg:px-0 px-5" v-html="title">
                            </h3>
                            <img :src="sideImage" alt="" class="my-5 lg:hidden">
                            <p class="text-[#2C2C2C] font-normal w-full lg:w-3/5 text-[14px] lg:mt-6 lg:px-0 px-5" data-aos="fade-up" data-aos-delay="200"
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
        const BgImage = ref('/assets/image/page-shawn-panya/design-concept/bg.png')
        const sideImage = ref('/assets/image/page-shawn-panya/design-concept/concept-img.png')
        const title = ref("MODERN<br/> TROPICAL<br/> CONTEMPORARY")
        const description = ref({
            en: 'Embrace nature-centric living through expansive light wells that welcome both natural light and breezes. The design creates a seamless harmony between ambient atmosphere and the home\'s palette.​',
            th: 'ดีไซน์รูปแบบการใช้ชีวิตใกล้ชิดธรรมชาติมากยิ่งขึ้น ด้วยช่องแสงขนาดใหญ่ ที่เปิดรับได้ทั้งแสงสว่าง และลมจากธรรมชาติ พร้อมการออกแบบให้สีสันของบรรยากาศและตัวบ้านเข้ากันอย่างกลมกลืน​'
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
        const fontCss = () => {
            return getLanguageFromPath() == 'en' ? "" : ''
        }
        onMounted(async () => {
            language.value = getLanguageFromPath();
            // await loadTemplate(language.value);


            nextTick(() => {
                init();  // ScrollTrigger is initialized after template is loaded and DOM is updated
            });
        });

        return { template, language, description, BgImage, sideImage, title,fontCss };
    }
});
