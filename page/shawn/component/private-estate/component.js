const PrivateEstateComponent = defineComponent({
    name: 'PrivateEstateComponent',
    template: `
      <section id="private-estate" data-section="the_private_estate" class="onview">
        <div class="relative">
          <!-- Dynamic Background -->
          <div 
            :style="{ backgroundImage: 'url(' + texts.images.bg + ')' }" 
            class="absolute inset-0 bg-cover bg-no-repeat bg-center filter lg:brightness-100 brightness-75 -z-10">
          </div>
          <div class="container py-20 lg:px-5 px-0">
            <div class="flex flex-col">
              <!-- Top Image Section -->
              <div class="flex" data-aos="fade-right" data-aos-duration="1000" data-aos-easing="linear">
                <div class="lg:w-1/2 w-full">
                  <img class="lg:-ml-[25%] -ml-5 lg:min-w-[742px]" 
                       :src="texts.images.image1" 
                       alt="">
                </div>
              </div>
              <!-- Content Section -->
              <div class="flex lg:flex-row flex-col">
                <!-- Text Content -->
                <div class="lg:w-1/2 w-full">
                  <div class="lg:p-20 px-5 lg:py-20 py-10">
                    <h2 class="font-['Tenor_Sans'] lg:text-[42px] text-[34px]  leading-none uppercase text-white"
                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" v-html="texts.title">
                    </h2>
                    <p class="font-['IBM_Plex_Sans_Thai'] mt-2 text-white" data-aos="fade-up" data-aos-duration="500"
                       data-aos-easing="linear" data-aos-delay="100" v-html="description">
                    </p>
                  </div>
                </div>
                <!-- Bottom Image Section -->
                <div class="lg:w-1/2 w-full">
                  <img class="lg:ml-[5%] ml-5 lg:min-w-[742px]" data-aos="fade-left" data-aos-duration="500"
                       data-aos-easing="linear" :src="texts.images.image2" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    setup() {
        const language = ref('th'); // Default language
        const description = ref('');

        // Extract language from URL (expects '/th/' or '/en/')
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        // Define dynamic texts and images (images are now independent of language)
        const texts = {
            title: "REDEFINE — <br/>TO INSPIRE YOUR FUTURE LIVING",
            description: {
                th: `
            SHAWN บ้านเดี่ยวสำหรับคนไลฟ์สไตล์ทันสมัยและเป็นตัวของตัวเอง ภายใต้แนวคิด “LIVE SHAWN WAY, LIKE NO ONE ELSE” <span class="text-nowrap">SHAWN เป็นแบรนด์</span>สะท้อนตัวตนของ
ผู้อยู่อาศัยที่กล้าที่จะเลือกใช้ชีวิตในแบบของตนเอง และประสบความสำเร็จในแบบที่ไม่ซ้ำใคร SHAWN ยังคงยึดหลักการพัฒนาโครงการแบบ Best-in-Class <span class="text-nowrap">ตามแบบฉบับของ สิงห์ เอสเตท</span>
          `,
                en: `
            SHAWN บ้านเดี่ยวสำหรับคนไลฟ์สไตล์ทันสมัยและเป็นตัวของตัวเอง ภายใต้แนวคิด “LIVE SHAWN WAY, LIKE NO ONE ELSE” <span class="text-nowrap">SHAWN เป็นแบรนด์</span>สะท้อนตัวตนของ
ผู้อยู่อาศัยที่กล้าที่จะเลือกใช้ชีวิตในแบบของตนเอง และประสบความสำเร็จในแบบที่ไม่ซ้ำใคร SHAWN ยังคงยึดหลักการพัฒนาโครงการแบบ Best-in-Class <span class="text-nowrap">ตามแบบฉบับของ สิงห์ เอสเตท</span>
          `
            },
            images: {
                bg: "/assets/image/page-shawn-home/inpire/bg.png",
                image1:"/assets/image/page-shawn-home/inpire/1.png",
                image2: "/assets/image/page-shawn-home/inpire/2.png"
            }
        };

        onMounted(() => {
            AOS.init(); // Initialize AOS animations
            language.value = getLanguageFromPath();
            // Set description based on the detected language
            description.value = language.value === 'th'
                ? texts.description.th
                : texts.description.en;
        });

        return { language, texts, description };
    }
});
