// Define the Header component
const CraftYourTaleComponent = defineComponent({
    name: 'CraftYourTaleComponent',
    template: `
    <section class="" >
        <div class="bg-[url('/assets/image/page-smyth-home/craft-your-tale/background.png')] bg-cover bg-no-repeat bg-center">
            <div class="py-20">
                <div class="container lg:px-5 px-0">
                    <div class="flex flex-col mx-auto justify-center gap-20">
                        <div class="flex flex-col justify-center">
                            <div class="lg:hidden block">
                                <p class="font-['Tenor_Sans'] lg:text-[110px] text-[40px] text-white text-center relative z-10 leading-none"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
                                    CRAFT
                                </p>
                                <p class="font-['Tenor_Sans'] lg:text-[110px] text-[40px] text-white text-center relative z-10 leading-none"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                                    YOUR TALE
                                </p>
                            </div>
                            <div class="lg:block hidden">
                                <p class="font-['Tenor_Sans'] lg:text-[110px] text-[40px] text-white text-center relative z-10 leading-none"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
                                    CRAFT YOUR TALE
                                </p>
                            </div>
                            <div class="lg:-mt-8 -mt-5 lg:w-4/5 w-full mx-auto">
                                <img src="/assets/image/page-smyth-home/craft-your-tale/craft-your-tale_desktop.png"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200"
                                    alt="" class="lg:block hidden w-full">
                                <img src="/assets/image/page-smyth-home/craft-your-tale/craft-your-tale_mobile.png"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200"
                                    alt="" class="lg:hidden block w-full">
                            </div>
                        </div>
                        <div class="flex flex-col  mx-auto lg:px-0 px-3 gap-3">
                            <div>
                                <h2 class="text-center lg:text-[40px] text-[32px] font-['Gotham'] leading-none"
                                    data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
                                    CRAFT YOUR TALE​
                                </h2>
                            </div>
                            <div class="space-y-3" v-html="description">
                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'en'; // Default to 'th' if not found
        };
        const description = ref('');
        // const loadTemplate = async (lang) => {
        //     try {
        //         const templateResponse = await axios.get('/page/smyth/component/craft-your-tale/template.html');
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
                if (language.value == 'th'){
                    description.value = `
                                <p class="text-center text-[20px] font-['IBM_Plex_Sans_Thai']" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear">
                                    เพราะ บ้าน เป็นมากกว่าที่อยู่อาศัย <br /> คือสถานที่ที่เชื่อมทุกเรื่องราวได้อย่างงลงตัว <br /> 
                                    ทุกรายละเอียดจึงถูกออกแบบ <br class="lg:hidden" /> จากความเข้าใจตัวตน <br />  สะท้อนไลฟ์สไตล์แบบ SMYTH'S ​
                                </p>
                                <p class="text-center text-[20px] font-['IBM_Plex_Sans_Thai']" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear">
                                    เพื่อให้บ้านนี้… คือเรื่องราวเฉพาะของคนแบบ SMYTH’S​
                                </p>`
                }else{
                    description.value = `
                                <p class="text-center text-[20px] font-['IBM_Plex_Sans_Thai']" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear">
                                   Home is more than a dwelling place,<br /> it is a place where every chapter of your story seamlessly connects.<br /> 
                                   Every detail is thoughtfully designed<br /> to reflect your unique identity and the SMYTH'S lifestyle. ​

​

                                </p>
                                <p class="text-center text-[20px] font-['IBM_Plex_Sans_Thai']" data-aos="fade-up"
                                    data-aos-duration="500" data-aos-easing="linear">
                                    Let this home be your unique story,<br /> Crafted exclusively for those who embrace the SMYTH’S way of life.​
                                </p>`
                }
            });
        });

        return { template, language ,description};
    }
});
