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
                                class="uppercase text-[#724B16] font-medium  lg:text-[35px] text-[22px] leading-none lg:px-0 px-5" :style="{fontFamily:'Gotham'}">
                                Design Concept
                            </h2>
                            <hr class="border-[#724B16] w-1/5 lg:mx-0 mx-5"  data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear"/>
                            <h3 data-aos="fade-up" data-aos-duration="300" data-aos-easing="linear" data-aos-delay="100"
                                class="uppercase text-nowrap lg:text-[70px] text-[35px] leading-none lg:px-0 px-5 font-normal italic"  :style="{fontFamily:'Epilogue'}" v-html="title">
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
        const language = ref('th');
        const BgImage = ref('/assets/image/page-sentre/design-concept/bg.png')
        const sideImage = ref('/assets/image/page-sentre/design-concept/_DSC8093%20Retouch.png')
        const title = ref("TRUE SUCCESS <br/>BEGINS HERE")
        const mainFontColor = ref('#281F40')
        const description = ref({
            en: 'Turn your passion to reality with a space well-prepared for your future enterprise.​SENTRE, the exclusive luxury home office on Pattanakarn 32, only 5 km. to Thonglor – Ekkamai with only 4 units available.​Start your success story and live your passion now.​​',
            th: 'ให้ความหลงใหลของคุณเป็นจริงด้วยโครงการที่ออกแบบสำหรับรองรับธุรกิจในอนาคตของคุณ​ SENTRE โฮมออฟฟิศหรูบนถนนพัฒนาการ 32 ​เพียง 5 กม. ถึงทองหล่อ - เอกมัย และมีเพียง 4 ยูนิตเท่านั้น​เป็นเจ้าของความสำเร็จที่เริ่มต้นธุรกิจและพร้อมใช้ชีวิตตามปรารถนาได้ ที่นี่ ​​'
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
