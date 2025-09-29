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
                                class="uppercase text-[#3D2120] font-medium  text-[22px] leading-none lg:px-0">
                                Design Concept
                            </h2>
                            <hr class="border-[#3D2120] w-1/5 lg:mx-0 mx-5"  data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"/>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap font-['Tenor_Sans'] lg:text-[70px] text-[35px] text-[#362662] leading-none lg:px-0" v-html="title">
                            </h3>
                            <img :src="sideImage" alt="" class="my-5 lg:hidden">
                            <p class="text-[#2C2C2C] font-normal w-full lg:w-3/5 text-[16px] lg:mt-6 lg:px-0" data-aos="fade-up" data-aos-delay="200"
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
        const BgImage = ref('/assets/image/page-shawn-wongwaen/design-concept/bg.webp')
        const sideImage = ref('/assets/image/page-shawn-wongwaen/design-concept/concept-img.webp')
        const title = ref("MODERN<br/> CLASSIC")
        const description = ref({
            en: ' Experience the charm of modern classic concept. The houses have a unique L-shaped residence design with a private backyard oasis, creating a truly unique living experience. Timeless elegance meets modern simplicity in a residence where design philosophy manifests throughout every space, from common areas to the clubhouse.​​',
            th: 'สัมผัสสเน่ห์ของบ้านด้วยสไตล์โมเดิร์น คลาสสิก ตัวบ้านถูกออกแบบให้มีเอกลักษณ์พิเศษ โดดเด่นด้วยรูปแบบ L-Shaped Residence ที่ออกแบบให้มีสวนสีเขียวอยู่ด้านหลัง (Backyard) เพื่อความเป็นส่วนตัวสูงสุดของผู้อยู่อาศัย ด้วยการออกแบบที่เน้นความงามเรียบหรูและทันสมัยอย่างมีรสนิยม แนวคิดการออกแบบนี้สะท้อนผ่านทุกพื้นที่ ตั้งแต่พื้นที่ส่วนกลางไปจนถึงคลับเฮ้าส์​​'
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

        return { template, language, description, BgImage, sideImage, title,fontCss };
    }
});
