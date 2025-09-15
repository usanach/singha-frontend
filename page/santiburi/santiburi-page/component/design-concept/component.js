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
                                class="uppercase text-[#BEA161] font-medium  lg:text-[35px] text-[22px] leading-none lg:px-0 px-5" :style="{fontFamily:'Gotham'}">
                                Design Concept
                            </h2>
                            <hr class="border-[#BEA161] w-1/5 lg:mx-0 mx-5"  data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"/>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap lg:text-[70px] text-[35px] leading-none lg:px-0 px-5 font-normal"  :style="{ fontFamily: 'Gotham', color: 'white' }" v-html="title">
                            </h3>
                            <img :src="sideImage" alt="" class="my-5 lg:hidden">
                            <p class="font-normal w-full lg:w-3/5 lg:mt-6 lg:px-0 px-5" data-aos="fade-up" data-aos-delay="200"
                                :style="{color:'white'}"
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
        const BgImage = ref('/assets/image/santiburi-page/design-concept/bg.png')
        const sideImage = ref('/assets/image/santiburi-page/design-concept/KANT%20x%20SANTIBURI1.png')
        const title = ref("LUXURY <br/>MODERNITY <br/>TROPICAL")
        const mainFontColor = ref('#625046')
        const description = ref({
            en: 'Every detail of happiness unfolds in the flagship single-home from Singha Estate. Privacy in an Exclusive and quality​ neighborhood for only 25 families in Bangkok’s best location. Surrounded by majestic trees,​ encompassing the trinity of LUXURY, MODERNITY, and TROPICAL elements to create homes beyond compare.​​',
            th: 'ทุกรายละเอียดของความสุขอยู่ครบภายในบ้านเดี่ยวจากสิงห์ เอสเตท สำหรับ 25 ครอบครัวกับ​ความเป็นส่วนตัวในย่านที่มีคุณภาพ ด้วยทำเลที่ดีที่สุดของกรุงเทพฯ และรายล้อมด้วยต้นไม้ใหญ่ที่สง่างาม พร้อมกับตัวอาคารภายใต้การออกแบบสถาปัตยกรรมสะท้อนความหรูหราทันสมัยสไตล์ทรอปิคอล'
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

        return { template, language, description, BgImage, sideImage, title, mainFontColor };
    }
});
