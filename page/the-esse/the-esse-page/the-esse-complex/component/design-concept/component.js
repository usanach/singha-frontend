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
                                class="uppercase text-[#FFE2B5] font-medium  lg:text-[35px] text-[22px] leading-none" :style="{fontFamily:'Saol Display'}">
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
        const BgImage = ref('/assets\/image\/page-the-esse-complex\/design-concept\/bg.png')
        const sideImage = ref('/assets\/image\/page-the-esse-complex\/design-concept\/THE-ESSE-SC_004-THE-ESSE-at-SINGHA-COMPLEX-37th-Floor-05292020_084745.png')
        const title = ref("The Value <br/>Beyond <br/>Generations")
        const description = ref({
            en: `Asoke District's significant business growth and bold public planning have made it the premier address for urban living. Here, residents enjoy immediate access to living, leisure, work, and shopping. The upcoming Makkasan Complex promises to transform and elevate the area, creating Bangkok's version of Central Park with art museums and innovative retail venues. Investment value in Singha Complex is set to appreciate for generations, offering lasting prosperity for the residents.`,
            th: 'อโศก เป็น ทำเลศูนย์กลางธุรกิจที่มั่นคงมีสิ่งแวดล้อมเพื่อการทำงานและการใช้ชีวิตครบครัน และเติบโตต่อเนื่องด้วยนโยบายพัฒนาพื้นที่เชิงรุก ใกล้โครงการมักกะสันคอมเพล็กซ์ แลนด์มาร์กที่กำลังจะพลิกโฉมกรุงเทพอีกครั้งด้วย เซ็นทรัลพาร์คเมืองกรุงแห่งใหม่ พิพิธภัณฑ์ศิลปะ สถานที่จัดแสดงงาน และแหล่งรีเทลทันสมัยขนาดใหญ่ <span class="text-nowrap">ยกระดับ</span>ให้ THE ESSE at SINGHA COMPLEX ก้าวสู่โครงการที่คุ้มค่า มูลค่าการลงทุนที่จะเพิ่มขึ้นจากรุ่นสู่รุ่น มอบความมั่งคั่งที่ยั่งยืนสำหรับผู้ที่เลือกที่นี่เป็นบ้าน​'
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
