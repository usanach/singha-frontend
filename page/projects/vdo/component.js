const API_BASE = window.APP_CONFIG?.apiBaseUrl || 'http://127.0.0.1:8000/api';

const VdoComponent = defineComponent({
  name: 'VdoComponent',
  template: `
      <section class="onview font-['IBM_Plex_Sans_Thai']" data-section="vdo_section">
        <div 
          :style="{ backgroundImage: 'url(' + (isMobile ? texts.images.bg.mobile : texts.images.bg.desktop) + ')' }" 
          class="bg-cover bg-no-repeat bg-center"
        >
          <div class="py-20">
            <div class="container">
              <div class="flex flex-col mx-auto justify-center gap-20">
                <!-- Title Section -->
                <div class="flex flex-col justify-center gap-5">
                  <div>
                    <h2 class="text-[#3D2120] text-[35px] text-center uppercase" :class="[fontCss()]">
                      {{ texts.title[language] }}
                    </h2>
                  </div>
                  <!-- Image/Video Section -->
                  <div class="mx-auto overflow-hidden relative lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]">
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
                      <div
                        class="absolute top-0 left-0 flex h-full w-full cursor-pointer hover:scale-105 transition"
                        @click="playVideo">
                      </div>
                    </template>

                    <!-- Show video -->
                    <template v-else>
                      <!-- Mobile: full-screen modal -->
                      <template v-if="isMobile">
                        <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75">
                          <button 
                            @click="closeModal" 
                            class="absolute top-0 right-0 text-white p-2 w-[35px] h-[35px] z-40"
                          >
                            x
                          </button>
                          <div class="relative">
                            <div class="relative transform">
                              <!-- YouTube -->
                              <iframe v-if="isYoutube"
                                id="player"
                                class="w-full h-[440px]"
                                :src="iframeSrc"
                                :title="texts.title[language]" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                referrerpolicy="strict-origin-when-cross-origin" 
                                allowfullscreen
                                @load="handleIframeLoad">
                              </iframe>

                              <!-- File video -->
                              <video v-else
                                class="w-full h-[440px]"
                                :src="videoFileUrl"
                                controls
                                autoplay
                                @loadeddata="handleVideoLoaded">
                              </video>

                              <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20]">
                                <div class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>

                      <!-- Desktop: inline -->
                      <template v-else>
                        <!-- YouTube -->
                        <iframe v-if="isYoutube"
                          id="player"
                          class="lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]"
                          :src="iframeSrc"
                          :title="texts.title[language]" 
                          frameborder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          referrerpolicy="strict-origin-when-cross-origin" 
                          allowfullscreen
                          @load="handleIframeLoad">
                        </iframe>

                        <!-- File video -->
                        <video v-else
                          class="lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]"
                          :src="videoFileUrl"
                          controls
                          autoplay
                          @loadeddata="handleVideoLoaded">
                        </video>

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
    const language   = ref('en');
    const isMobile   = ref(window.innerWidth < 768);
    const showVideo  = ref(false);
    const isLoading  = ref(false);

    const iframeSrc    = ref('');   // ใช้ตอนเป็น youtube
    const baseEmbedUrl = ref('');   // embed จาก API (ยังไม่เติม autoplay)
    const videoFileUrl = ref('');   // ใช้ตอน source_type = file

    const vdoData = ref(null);
    const API_BASE = window.APP_CONFIG?.apiBaseUrl || 'http://127.0.0.1:8000/api';
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl || 'http://127.0.0.1:8000/storage/';

    // default เดิม
    const defaultTexts = {
      title: {
        en: "HOME TOUR | THE EXTRO Phayathai - Rangnam",
        th: "พาทัวร์รอบโครงการ"
      },
      images: {
        bg: {
          desktop: "/assets/image/page-the-extro/the-extro/bg-extro.png",
          mobile: "/assets/image/page-the-extro/the-extro/bg-extro.png",
        },
        desktop: "/assets/image/page-the-extro/the-extro/vdo/extro-vdo.PNG",
        mobile: "/assets/image/page-the-extro/the-extro/vdo/extro-vdo.PNG"
      }
    };
    const defaultEmbed = "https://www.youtube.com/embed/xHAvP9Pvvwc?start=81";

    const handleResize = () => {
      isMobile.value = window.innerWidth < 768;
    };

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const fontCss = () => {
      return getLanguageFromPath() == 'en' ? "font-['Kaisei_Decol']" : '';
    };

    // ดึง title / images จาก API ถ้ามี
    const texts = computed(() => {
      const data = vdoData.value;
      if (!data) return defaultTexts;

      return {
        title: data.title || defaultTexts.title,
        images: {
          bg: {
            desktop: data.images?.bg?.desktop || defaultTexts.images.bg.desktop,
            mobile:  data.images?.bg?.mobile  || defaultTexts.images.bg.mobile,
          },
          desktop: data.images?.desktop || defaultTexts.images.desktop,
          mobile:  data.images?.mobile  || defaultTexts.images.mobile,
        }
      };
    });

    const isYoutube = computed(() => {
      if (!vdoData.value) return true;
      return (vdoData.value.source_type || 'youtube') === 'youtube';
    });

    // Start video playback and show loading indicator
    const playVideo = () => {
      if (isYoutube.value) {
        if (!baseEmbedUrl.value) return;
        const joinChar = baseEmbedUrl.value.includes('?') ? '&' : '?';
        iframeSrc.value = baseEmbedUrl.value + joinChar + 'autoplay=1';
      } else {
        if (!videoFileUrl.value) return;
      }

      isLoading.value = true;
      showVideo.value = true;
    };

    // Close modal on mobile
    const closeModal = () => {
      showVideo.value = false;
      isLoading.value = false;
      iframeSrc.value = '';
    };

    // Hide loading icon when iframe/video is loaded
    const handleIframeLoad = () => {
      isLoading.value = false;
    };
    const handleVideoLoaded = () => {
      isLoading.value = false;
    };

    const findProjectIdFromSeo = async () => {
      const path = window.location.pathname;
      const lang = language.value;

      const res = await axios.get(`${API_BASE}/project/seo`);
      const rows = Array.isArray(res.data?.data) ? res.data.data : [];

      const enabledRows = rows.filter(r => (r.seo_disabled ?? 0) != 1);
      const field = lang === 'en' ? 'seo_url_en' : 'seo_url_th';

      const matched = enabledRows.find(row => row[field] === path);
      return matched?.project_id || null;
    };
    // ดึงดาต้าจาก API
    const fetchVideoData = async () => {
      try {
        const projectId = await findProjectIdFromSeo(); // แก้ให้ตรงกับตัวแปรที่คุณใช้จริง
        if (!projectId) {
          baseEmbedUrl.value = defaultEmbed;
          return;
        }

        const res  = await axios.get(`${API_BASE}/project/video/${projectId}`);
        const data = res.data?.data || null;

        if (!data) {
          baseEmbedUrl.value = defaultEmbed;
          return;
        }

        vdoData.value = data;

        // youtube/file url
        baseEmbedUrl.value = data.youtube?.embed_url || defaultEmbed;
        videoFileUrl.value = data.file?.url || '';
      } catch (err) {
        console.error('Error loading project video:', err);
        baseEmbedUrl.value = defaultEmbed;
      }
    };

    onMounted(() => {
      language.value = getLanguageFromPath();
      AOS.init();
      // window.addEventListener('resize', handleResize);

      fetchVideoData();
    });

    language.value = getLanguageFromPath();

    return {
      language,
      texts,
      isMobile,
      showVideo,
      isLoading,
      iframeSrc,
      videoFileUrl,
      isYoutube,
      playVideo,
      closeModal,
      handleIframeLoad,
      handleVideoLoaded,
      fontCss
    };
  }
});
