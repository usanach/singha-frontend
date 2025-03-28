const CraftYourTaleComponent = defineComponent({
  name: 'CraftYourTaleComponent',
  template: `
    <section class="onview" data-section="craft_your_tales">
      <div 
        :style="{ backgroundImage: 'url(' + (isMobile ? texts.images.bg.mobile : texts.images.bg.desktop) + ')' }" 
        class="bg-cover bg-no-repeat bg-center"
      >
        <div class="py-20">
          <div class="container">
            <div class="flex flex-col mx-auto justify-center gap-20">
              <!-- Title Section -->
              <div class="flex flex-col justify-center">
                  <!-- Desktop title -->
                  <div class="">
                    <p class="font-['Kaisei_Decol'] lg:text-[110px] text-[40px] text-white text-center relative z-10 leading-none tracking-wider"
                       data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
                      <span v-html="texts.title[language]"></span>
                    </p>
                  </div>
                <!-- Image/Video Section -->
                <div class="lg:-mt-8 -mt-5 mx-auto overflow-hidden relative lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]">
                  <!-- Show play image if video not started -->
                  
                  <template v-if="!showVideo">
                    <img 
                    class="w-full"
                      :src="isMobile ? texts.images.mobile : texts.images.desktop" 
                      data-aos="fade-up" 
                      data-aos-duration="500" 
                      data-aos-easing="linear" 
                      data-aos-delay="200" 
                      alt="Play video" 
                    >
                    <div class="absolute top-0 left-0 flex h-full w-full" 
                      class="cursor-pointer w-full hover:scale-105 transition" 
                      @click="playVideo">
                      <svg class="m-auto" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="197" height="209" viewBox="0 0 197 209">
                          <defs>
                              <filter id="Polygon_3" x="0" y="0" width="197" height="209" filterUnits="userSpaceOnUse">
                              <feOffset dy="3" input="SourceAlpha"/>
                              <feGaussianBlur stdDeviation="20" result="blur"/>
                              <feFlood flood-opacity="0.494"/>
                              <feComposite operator="in" in2="blur"/>
                              <feComposite in="SourceGraphic"/>
                              </filter>
                          </defs>
                          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Polygon_3)">
                              <path id="Polygon_3-2" data-name="Polygon 3" d="M44.5,0,89,77H0Z" transform="translate(137 57) rotate(90)" fill="#fff" opacity="0.588"/>
                          </g>
                      </svg>
                    </div>
                  </template>
                  <!-- Show video iframe -->
                  <template v-else>
                    <!-- For mobile: show as a full-screen modal rotated 90 degrees -->
                    <template v-if="isMobile">
                      <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75">
                        <!-- We swap viewport dimensions -->
                          <button 
                            @click="closeModal" 
                            class="absolute top-0 right-0 text-white p-2 w-[35px] h-[35px] z-40"
                          >
                            x
                          </button>
                        <div class="relative">
                          <!-- Rotate the video container 90° -->
                          <div class="relative transform">
                            <iframe id="player"
                              class="w-full h-[440px]"
                              :src="iframeSrc"
                              title="SHAWN – Live SHAWN Way, Like no one else" 
                              frameborder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                              referrerpolicy="strict-origin-when-cross-origin" 
                              allowfullscreen
                              @load="handleIframeLoad">
                            </iframe>
                            <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20]">
                              <div class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <!-- For desktop: show inline -->
                    <template v-else>
                      <iframe id="player"
                        class="lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]"
                        width="960" height="540"
                        :src="iframeSrc"
                        title="SHAWN – Live SHAWN Way, Like no one else" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen
                        @load="handleIframeLoad">
                      </iframe>
                      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20]">
                        <div class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </template>
                  </template>
                </div>
              </div>
              <!-- Description Section -->
              <div class="flex flex-col mx-auto lg:px-0 px-3 gap-3">
                <div>
                  <h2 
                    class="text-center lg:text-[40px] text-[30px] text-white" 
                    data-aos="fade-up" 
                    data-aos-duration="500" 
                    data-aos-easing="linear"
                  >
                    <span v-html="texts.subtitle[language]" :class="[fontCss()]"></span>
                  </h2>
                </div>
                <div class="space-y-3" >
                  <p :class="[fontCss()]" class="text-center text-[20px] font-normal text-white" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" v-html="texts.description[language]"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  setup() {
    const language = ref('en');
    const iframeSrc = ref("https://www.youtube.com/embed/3w1UbJe1wXc?autoplay=1");
    const isMobile = ref(window.innerWidth < 768);
    const showVideo = ref(false);
    const isLoading = ref(false);

    const handleResize = () => {
      isMobile.value = window.innerWidth < 768;
    };

    // Start video playback and show loading indicator
    const playVideo = () => {
      isLoading.value = true;
      showVideo.value = true;
    };

    // Close modal on mobile
    const closeModal = () => {
      showVideo.value = false;
      isLoading.value = false;
    };

    // Hide loading icon when iframe is loaded
    const handleIframeLoad = () => {
      isLoading.value = false;
    };

    onMounted(() => {
      AOS.init();
      window.addEventListener('resize', handleResize);
    });

    // Extract language from URL path (expects '/th/' or '/en/')
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'en';
    };

    // Language-specific texts and images (images are now independent of language)
    const texts = {
      title: {
        en: "INFINITE LIVING",
        th: "INFINITE LIVING",
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

    const fontCss = () => {
      return getLanguageFromPath() == "en" ? "font-['Kaisei_Decol']" : ""
    }

    return { language, texts, isMobile, iframeSrc, showVideo, isLoading, playVideo, closeModal, handleIframeLoad, fontCss };
  }
});
