// Define the Header component
const DesignConceptComponent = defineComponent({
    name: 'DesignConceptComponent',
    template: `
    <section class="design-concept-component onview" id="design-concept" data-section="design_concept" :class="[fontCss()]" >
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
                                class="uppercase text-white font-['Kaisei_Decol'] font-medium  text-[24px] leading-none lg:px-0 px-5">
                                Design Concept
                            </h2>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap font-['Kaisei_Decol'] lg:text-[60px] text-[35px] text-[#DEC87F] leading-none lg:px-0 px-5" v-html="title">
                            </h3>
                            <img :src="sideImage" alt="" class="my-5 lg:hidden">
                            <p class="text-white font-normal w-full lg:w-3/5 text-[14px] lg:mt-6 lg:px-0 px-5" data-aos="fade-up" data-aos-delay="200"
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
        const sideImage = ref('/assets/image/page-srin-rachapuek/design-concept/KANT_X_SRIN84.png')
        const title = ref("MODERN TROPICAL<br/> REFINEMENT")
        const description = ref({
            th: "ความงามที่เกิดจากการผสานระหว่างความเรียบหรูของสไตล์โมเดิร์นและความอบอุ่นของสไตล์ทรอปิคอล โดดเด่นด้วยดีไซน์หน้าบ้านสูงโปร่งที่ตกแต่งด้วยสีเอิร์ทโทน สร้างบรรยากาศอบอุ่นและมีชีวิตชีวาพร้อมกับผ่อนคลาย ทุกองค์ประกอบได้รับการออกแบบให้งดงามเหนือกาลเวลา พร้อมมอบประสบการณ์การอยู่อาศัยที่ลงตัวและยั่งยืน",
            en: "Experience timeless elegance through a touch of tropical warmth. Our sophisticated design features high airy front ceilings with earthy tones, and a seamless integration of nature. Every element is designed to deliver a balanced and sustainable living experience."
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
            return getLanguageFromPath() == 'en' ? "font-['Gotham']" : ''
        }
        onMounted(async () => {
            language.value = getLanguageFromPath();
            // await loadTemplate(language.value);

            nextTick(() => {
                init();  // ScrollTrigger is initialized after template is loaded and DOM is updated
            });
        });

        return { template, language, description, BgImage, sideImage, title, fontCss };
    }
});
