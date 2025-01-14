// Define the Header component
const PrivateEstateComponent = defineComponent({
    name: 'PrivateEstateComponent',
    template: `
    <section id="private-estate" data-section="the_private_estate" class="onview">
        <div class="relative">
            <div
                class="absolute inset-0 bg-[url('/assets/image/page-smyth-home/private-estate/background.png')] bg-cover bg-no-repeat bg-center filter lg:brightness-100 brightness-75 -z-10">
            </div>

            <div class="container py-20 lg:px-5 px-0">
                <div class="flex flex-col">
                    <div class="flex" data-aos="fade-right" data-aos-duration="1000" data-aos-easing="linear">
                        <div class="lg:w-1/2 w-full">
                            <img class="lg:-ml-[25%] -ml-5 lg:min-w-[742px]"
                                src="/assets/image/page-smyth-kaset/gallery/exterior4.jpg" alt="">
                        </div>
                    </div>
                    <div class="flex lg:flex-row flex-col">
                        <div class="lg:w-1/2 w-full">
                            <div class="lg:p-20 px-5 lg:py-20 py-10">
                                <h2 class="font-['Tenor_Sans'] lg:text-[42px] text-[34px] text-white leading-none"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
                                    THE PRIVATE ESTATE​
                                </h2>
                                <p class="text-white font-['IBM_Plex_Sans_Thai'] mt-2" data-aos="fade-up" data-aos-duration="500"
                                    data-aos-easing="linear" data-aos-delay="100" v-html="description">
                                    Step into the world of Singha’s private estate, <br class="lg:hidden" />a harmonious blend
                                    of luxury and
                                    exclusivity. <br class="lg:hidden" />The meticulously curated private estate developments
                                    are thoughtfully designed
                                    for a few families, ensuring utmost privacy and <br class="lg:hidden" />an unrivalled living
                                    experience. Embracing a
                                    truly exceptional way of life that celebrates the art of refined living.
                                </p>
                            </div>
                        </div>
                        <div class="lg:w-1/2 w-full">
                            <img class="lg:ml-[5%] ml-5 lg:min-w-[742px]" data-aos="fade-left" data-aos-duration="500"
                                data-aos-easing="linear" src="/assets/image/page-smyth-kaset/gallery/interior2.jpg"
                                alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language
        const description = ref('');

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        // const loadTemplate = async (lang) => {
        //     try {
        //         const templateResponse = await axios.get('/page/smyth/component/private-estate/template.html');
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
                if (language.value == 'th') {
                    description.value = `
                            โครงการที่ถูกคัดสรรมาอย่างพิถีพิถัน บนพื้นที่ที่ออกแบบมาเฉพาะสำหรับไม่กี่ครอบครัวเท่านั้น
                            เพื่อมอบความเป็นส่วนตัวสูงสุดและประสบการณ์การใช้ชีวิตที่ไม่เหมือนใคร​
                            `
                } else {
                    description.value = `
                            A meticulously curated project, designed for
                            only a select few families. We offer ultimate privacy with an unparalleled living
                            experience.​
                            `
                }
            });
        });

        return { template, language, description };
    }
});
