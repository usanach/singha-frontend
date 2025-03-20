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
                    <h2 class="font-['Kaisei_Decol'] lg:text-[42px] text-[34px]  leading-none uppercase"
                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
                      {{ texts.title }}
                    </h2>
                    <p class="font-['IBM_Plex_Sans_Thai'] mt-2" data-aos="fade-up" data-aos-duration="500"
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
            title: "Peacefulness Of Living Experience",
            description: {
                th: `
            โครงการถูกออกแบบภายใต้แนวคิด “INFINITE LIVING บ้านเพื่อทุกการเติบโตไม่มีที่สิ้นสุด” ที่จะเป็นการออกแบบบ้านให้ตอบโจทย์การใช้ชีวิตครบทุกด้าน รองรับ ครอบครัวใหญ่ 3 Generations ได้อย่างแท้จริง<br>
            Signature ของโครงการเริ่มจาก “Peacefulness Of Living Experience” ให้ความสำคัญกับสุนทรียภาพการใช้ชีวิตภายในบ้านและพื้นที่ส่วนกลาง เพื่อการอยู่อาศัยได้อย่างสมบูรณ์แบบ โดยคำนึงถึงการใช้งานจริงในแต่ละวัน ใส่ใจในทุกรายละเอียดเล็กๆ เพื่อให้การใช้งานจริงเป็นไปได้อย่างสะดวกสบาย มีความเป็นส่วนตัว และคำนึงถึงความปลอดภัย ของสมาชิกทุกคนในครอบครัว
          `,
                en: `
            A project designed under the concept "INFINITE LIVING" – creating a home that meets every aspect of life, truly supporting multi-generational families.<br>
            With its signature "Peacefulness Of Living Experience", the project emphasizes indoor and communal aesthetics for a perfect living experience, taking into account practical daily use, meticulous attention to detail, privacy, and security for every family member.
          `
            },
            images: {
                bg: "/assets/image/page-srin-home/private-estrate/bg.png",
                image1: "/assets/image/page-srin-home/private-estrate/1.png",
                image2: "/assets/image/page-srin-home/private-estrate/2.png"
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
