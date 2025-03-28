const PrivateEstateComponent = defineComponent({
  name: 'PrivateEstateComponent',
  template: `
      <section id="private-estate" data-section="the_private_estate" class="onview">
        <div class="relative">
          <!-- Dynamic Background -->
          <div 
            :style="{ backgroundImage: 'url(' + texts.images.bg + ')' }" 
            class="absolute inset-0 bg-cover bg-no-repeat bg-center filter lg:brightness-100 brightness-75 -z-10">
            <video autoplay loop muted playsinline class="w-full h-full object-cover">
              <source :src="bgVido" type="video/mp4">
              Your browser does not support the video tag.
            </video>
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
                  <div class="lg:p-20 px-5 lg:py-20 py-10 space-y-5">
                    <h2 class="font-['Kaisei_Decol'] lg:text-[42px] text-[34px]  leading-tight uppercase"
                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
                      {{ texts.title[language] }}
                    </h2>
                    <p class="font-['IBM_Plex_Sans_Thai'] mt-2 font-normal" data-aos="fade-up" data-aos-duration="500"
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
    const bgVido = ref('/assets/image/page-srin-home/private-estrate/gettyimages-1816736771-640_adpp.mp4')

    // Extract language from URL (expects '/th/' or '/en/')
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    // Define dynamic texts and images (images are now independent of language)
    const texts = {
      title: {
        en: "PEACEFULNESS OF LIVING EXPERIENCE",
        th: "PEACEFULNESS OF LIVING EXPERIENCE"
      },
      description: {
        th: `เพราะเราเชื่อว่าสุนทรียภาพในการใช้ชีวิตคือหัวใจสำคัญของบ้านที่คุณมองหา เราจึงใส่ใจในทุกรายละเอียดของการออกแบบ ทั้งพื้นที่ภายในบ้านและส่วนกลาง เพื่อสร้างสมดุลแห่งการอยู่อาศัยที่สมบูรณ์แบบ ตอบโจทย์การใช้ชีวิตประจำวันของสมาชิกในครอบครัวอย่างแท้จริง`,
        en: `Living aesthetics drive our design philosophy. We pay attention to every detail of the design, both inside the house and in the common areas, to create a perfect balance of living and your family's daily needs.`
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

    return { language, texts, description ,bgVido};
  }
});
