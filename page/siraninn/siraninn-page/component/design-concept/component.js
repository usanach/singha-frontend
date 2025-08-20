// Define the Header component
const DesignConceptComponent = defineComponent({
    name: 'DesignConceptComponent',
    template: `
    <section class="design-concept-component onview font-['IBM_Plex_Sans_Thai']" :style="{color:mainFontColor}" id="design_concept" data-section="design_concept" >
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
                                class="uppercase text-[#6F5328] font-medium  lg:text-[35px] text-[22px] leading-none lg:px-0 px-5" :style="{fontFamily:'The Seasons'}">
                                Design Concept
                            </h2>
                            <hr class="border-[#7C5711] w-1/5 lg:mx-0 mx-5"  data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"/>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap lg:text-[70px] text-[35px] leading-none lg:px-0 px-5 font-normal"  :style="{fontFamily:'Tenor Sans'}" v-html="title">
                            </h3>
                            <img :src="sideImage" alt="" class="my-5 lg:hidden">
                            <p class="font-normal w-full lg:w-3/5 lg:mt-6 lg:px-0 px-5" data-aos="fade-up" data-aos-delay="200"
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
        const BgImage = ref('/assets\/image\/page-siraninn\/design-concept\/bg.png')
        const sideImage = ref('/assets\/image\/page-siraninn\/design-concept\/KANTxSIRANINN150.png')
        const title = ref("MODERN <br/> TROPICAL")
        const mainFontColor =ref('#625046')
        const description = ref({
            en: 'At Siraninn Residences, every aspect of Modern Tropical Style architecture is thoughtfully considered, reflecting simplicity, contemporary elegance, and timeless beauty. Our designs are rooted in a profound understanding of the climate, promoting natural airflow and a consistently cool, comfortable environment throughout the day. We are committed to crafting spaces that inspire a sense of peace and harmony with nature. Every detail is carefully curated to transform your home into a haven of cherished memories for your entire family.​',
            th: 'ที่ ศิรนินทร์ เรสซิเดนเซส เราให้ความสำคัญกับทุกองค์ประกอบของสถาปัตยกรรมแนว Modern Tropical Style ซึ่งโดดเด่นด้วยความเรียบง่าย ทันสมัย และเปี่ยมด้วยความงามที่ยั่งยืน ด้วยการออกแบบที่เข้าใจสภาพภูมิอากาศอย่างลึกซึ้ง ให้อากาศถ่ายเทเป็นธรรมชาติ มอบความเย็นสบายตลอดวัน เพื่อสร้างบรรยากาศทุกช่วงเวลาให้ความรู้สึกผ่อนคลาย เป็นหนึ่งเดียวกันกับธรรมชาติ ทุกรายละเอียดที่เราใส่ใจ เพื่อให้บ้านเต็มไปด้วยพื้นที่แห่งความทรงจำและความสุขอันสมบูรณ์แบบของทุกคนในครอบครัว​​'
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

        return { template, language, description, BgImage, sideImage, title,mainFontColor };
    }
});
