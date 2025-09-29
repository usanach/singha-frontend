const VdoComponent = defineComponent({
  name: 'VdoComponent',
  template: `
      <section class="onview" data-section="vdo_section">
        <div 
          :style="{ backgroundImage: 'url(' + (isMobile ? datasets.images.bg.mobile : datasets.images.bg.desktop) + ')' }" 
          class="bg-cover bg-no-repeat bg-center"
        >
          <div class="py-20">
            <div class="container">
              <div class="flex flex-col mx-auto justify-center gap-20">
                <!-- Title Section -->
                <div class="flex flex-col justify-center gap-5">
                  <div>
                    <h2 class="text-white text-[35px] text-[22px] text-center uppercase" :class="[fontCss()]">{{datasets.title[language]}}</h2>
                  </div>
                  <!-- Image/Video Section -->
                  <div class="mx-auto overflow-hidden relative lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]">
                    <!-- Show play image if video not started -->
                    <template v-if="!showVideo">
                      <img aria-hidden="true" 
                       class="w-full"
                        :src="isMobile ? datasets.images.mobile : datasets.images.desktop" 
                        data-aos="fade-up" 
                        data-aos-duration="500" 
                        data-aos-easing="linear" 
                        data-aos-delay="200" 
                        alt="Play video" 
                      >
                      <div class="absolute top-0 left-0 flex h-full w-full" 
                        class="cursor-pointer w-full hover:scale-105 transition" 
                        @click="playVideo">
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
                          <div class="relative ">
                            <!-- Rotate the video container 90° -->
                            <div class="relative transform">
                              <iframe id="player"
                                class="w-full h-[440px]"
                                :src="datasets.vdo? datasets.vdo:iframeSrc"
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
                          :src="datasets.vdo? datasets.vdo:iframeSrc"
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
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  setup() {
    const language = ref('en');
    const iframeSrc = ref("https://www.youtube.com/embed/8zzrfuMAYew?autoplay=1");
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
      // window.addEventListener('resize', handleResize);
    });

    // Extract language from URL path (expects '/th/' or '/en/')
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'en';
    };

    const fontCss = () => {
      return getLanguageFromPath() == 'en' ? "" : ''
    }
    const datasets = {
      title: {
        en: "HOME TOUR | SHAWN Panya Indra",
        th: "พาทัวร์รอบโครงการ"
      },
      images: {
        bg: {
          desktop: "/assets/image/page-shawn-panya/vdo/bg-1.webp",
          mobile: "/assets/image/page-shawn-panya/vdo/bg-m.webp",
        },
        desktop: "/assets/image/page-shawn-panya/vdo/vdo.webp",
        mobile: "/assets/image/page-shawn-panya/vdo/vdo.webp"
      },
      vdo: ""
    };

    language.value = getLanguageFromPath();

    return { language, datasets, isMobile, iframeSrc, showVideo, isLoading, playVideo, closeModal, handleIframeLoad, fontCss };
  }
});
