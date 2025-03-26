const CraftYourTaleComponent = defineComponent({
  name: 'CraftYourTaleComponent',
  template: `
      <section class="onview" data-section="craft_your_tales">
        <div 
          :style="{ backgroundImage: 'url(' + (isMobile ? texts.images.bg.mobile : texts.images.bg.desktop) + ')' }" 
          class="bg-cover bg-no-repeat bg-center"
          :class="[fontCss()]"
        >
          <div class="py-20">
            <div class="container lg:px-5 px-0">
              <div class="flex flex-col mx-auto justify-center gap-20">
                <!-- Title Section -->
                <div class="flex flex-col justify-center">
                  <!-- Mobile title -->
                  <div class="lg:hidden block">
                    <p class="font-['Kaisei_Decol'] lg:text-[110px] text-[40px] text-white text-center relative z-10 leading-none"
                       data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
                      <span v-html="texts.mobileTitle[language][0]"></span>
                    </p>
                    <p class="lg:text-[110px] text-[40px] text-white text-center relative z-10 leading-none"
                       data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
                      <span v-html="texts.mobileTitle[language][1]"></span>
                    </p>
                  </div>
                  <!-- Desktop title -->
                  <div class="lg:block hidden">
                    <p class="font-['Kaisei_Decol'] lg:text-[110px] text-[40px] text-white text-center relative z-10 leading-none tracking-wider"
                       data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
                      <span v-html="texts.title[language]"></span>
                    </p>
                  </div>
                  <!-- Image Section -->
                  <div class="lg:-mt-8 -mt-5 lg:w-4/5 w-full mx-auto lg:max-h-none max-h-[500px] overflow-hidden">
                    <img :src="texts.images.desktop" 
                         data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200" 
                         alt="" class="lg:block hidden w-full">
                    <img :src="texts.images.mobile" 
                         data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="200" 
                         alt="" class="lg:hidden block w-full">
                  </div>
                </div>
                <!-- Description Section -->
                <div class="flex flex-col mx-auto lg:px-0 px-3 gap-3">
                  <div>
                    <h2 class="text-center lg:text-[40px] text-[32px] leading-none text-white"
                        data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
                      <span v-html="texts.subtitle[language]"></span>
                    </h2>
                  </div>
                  <div class="space-y-3" >
                    <p class="text-center text-white text-[20px] font-normal" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" v-html="texts.description[language]"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  setup() {
    const language = ref('en'); // Default language

    // Function to extract language from URL (expects '/th/' or '/en/')
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'en';
    };

    // Reactive device detection for mobile (using a 768px breakpoint)
    const isMobile = ref(window.innerWidth < 768);
    const handleResize = () => {
      isMobile.value = window.innerWidth < 768;
    };

    onMounted(() => {
      AOS.init(); // Initialize AOS animations when component is mounted
      window.addEventListener('resize', handleResize);
    });

    // Language-specific texts and images (images are now independent of language)
    const texts = {
      title: {
        en: "INFINITE LIVING",
        th: "INFINITE LIVING",
      },
      mobileTitle: {
        en: ["INFINITE", "LIVING"],
        th: ["INFINITE", "LIVING"],
      },
      subtitle: {
        en: "Experience happiness that grows infinite. ​",
        th: "สัมผัสความสุขที่เติบโตอย่างไม่มีวันสิ้นสุด"
      },
      description: {
        en: `
            S'RIN offers the perfect blend of shared spaces and personal corners for individual passions,<br/> creating a harmonious environment for every generation. <br/>Homes that adapt to provide lasting joy and support the unique needs and happiness. .
          `,
        th: `
           สริน บ้านที่ออกแบบมาเพื่อการเติบโตร่วมกันของทุกคนในครอบครัว <br/>เพื่อให้การใช้เวลาร่วมกันของสมาชิกต่างวัยเป็นช่วงเวลาที่มีคุณภาพ <br/>และมีมุมส่วนตัวที่ให้ทุกคนได้ใช้เวลากับสิ่งที่รักได้เต็มที่ตามไลฟ์สไตล์ของตนเอง<br/>บ้านที่พร้อมปรับเปลี่ยนเพื่อมอบความสุขและรองรับทุกรูปแบบของทุกช่วงชีวิตของแต่ละเจนเนอเรชั่นได้อย่างอิสระ ​
          `
      },
      images: {
        bg: {
          desktop: "/assets/image/page-srin-home/infinite-living/bg.png",
          mobile: "/assets/image/page-srin-home/infinite-living/bg-m.png"
        },
        desktop: "/assets/image/page-srin-home/infinite-living/1.png",
        mobile: "/assets/image/page-srin-home/infinite-living/1-m.png"
      }
    };

    language.value = getLanguageFromPath();

    const fontCss =()=>{
      return getLanguageFromPath()=="en"?"font-['Kaisei_Decol']":""
    }
    return { language, texts, isMobile ,fontCss};
  }
});
