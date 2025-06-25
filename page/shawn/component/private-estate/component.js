const PrivateEstateComponent = defineComponent({
  name: 'PrivateEstateComponent',
  template: `
      <section id="inspire_future_living" data-section="inspire_future_living" class="onview  font-['IBM_Plex_Sans_Thai']">
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
                    <h2 class=" lg:text-[42px] text-[34px] uppercase text-white font-[400]" :class="[fontCss(),language=='th'?'leading-[1.5]':'leading-none']"
                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" v-html="texts.title[language]">
                    </h2>
                    <p class=" mt-2 text-white" data-aos="fade-up" data-aos-duration="500"
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
      title: {
        en: "REDEFINE TO INSPIRE YOUR FUTURE LIVING",
        th: "ชีวิตที่คุณกำหนดเอง<br/>สู่การเติมเต็มทุกความต้องการ​"
      },
      description: {
        th: `ฌอน พาคุณค้นพบนิยามใหม่ของการอยู่อาศัย <span class="text-nowrap">สัมผัสประสบการณ์</span>ใน "บ้าน" ที่คุณเลือกเพื่อสร้าง<span class="text-nowrap">อนาคตที่ไม่เหมือนใคร</span>ในแบบฉบับของคุณเอง`,
        en: `SHAWN invites you to redefine living. <br/>Experience a "home" where you choose <br/>to create an unparalleled future, uniquely yours.`
      },
      images: {
        bg: "/assets/image/page-shawn-home/inpire/bg.png",
        image1: "/assets/image/page-shawn-home/inpire/1.png",
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
    const fontCss = () => {
      return getLanguageFromPath() == "en" ? "font-['Tenor_Sans']" : ""
    }
    return { language, texts, description, fontCss };
  }
});
