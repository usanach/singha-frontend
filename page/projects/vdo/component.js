const VdoComponent = defineComponent({
  name: 'VdoComponent',
  template: `
    <section
      v-if="isVisible"
      class="onview font-['IBM_Plex_Sans_Thai']"
      data-section="vdo_section"
    >
      <div
        :style="{ backgroundImage: 'url(' + (isMobile ? texts.images.bg.mobile : texts.images.bg.desktop) + ')' }"
        class="bg-cover bg-no-repeat bg-center"
      >
        <div class="py-20">
          <div class="container">
            <div class="flex flex-col mx-auto justify-center gap-20">

              <!-- Title -->
              <div class="flex flex-col justify-center gap-5">
                <div>
                  <h2 class="text-[#3D2120] text-[35px] text-center uppercase" :class="[fontCss()]">
                    {{ texts.title[language] }}
                  </h2>
                </div>

                <!-- Image/Video -->
                <div class="mx-auto overflow-hidden relative lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]">
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

                  <template v-else>
                    <!-- Mobile: modal -->
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

            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  setup() {
    const language  = ref('en');
    const isMobile  = ref(window.innerWidth < 768);
    const showVideo = ref(false);
    const isLoading = ref(false);

    const isVisible = ref(false);      // ✅ ถ้าไม่มีดาต้า => false => hide section
    const vdoData   = ref(null);

    const iframeSrc    = ref('');
    const baseEmbedUrl = ref('');
    const videoFileUrl = ref('');

    // ✅ defaultTexts เอาไว้ “เผื่อ API มีบาง field หาย” (แต่ถ้าไม่มี data ทั้งก้อน เราจะไม่โชว์ section)
    const defaultTexts = {
      title: { en: "", th: "" },
      images: {
        bg: { desktop: "", mobile: "" },
        desktop: "",
        mobile: ""
      }
    };

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const fontCss = () => {
      return getLanguageFromPath() === 'en' ? "font-['Kaisei_Decol']" : '';
    };

    const texts = computed(() => {
      const data = vdoData.value;
      if (!data) return defaultTexts;

      return {
        title: {
              th: data.title?.th || '',
              en: data.title?.en || data.title?.th || ''
            },
        images: {
          bg: {
            desktop: data.images?.bg?.desktop || defaultTexts.images.bg.desktop,
            mobile:  data.images?.bg?.mobile  || defaultTexts.images.bg.mobile
          },
          desktop: data.images?.desktop || defaultTexts.images.desktop,
          mobile:  data.images?.mobile  || defaultTexts.images.mobile
        }
      };
    });

    const isYoutube = computed(() => {
      if (!vdoData.value) return true;
      return (vdoData.value.source_type || 'youtube') === 'youtube';
    });

    const playVideo = () => {
      // กันกรณี data ไม่ครบ
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

    const closeModal = () => {
      showVideo.value = false;
      isLoading.value = false;
      iframeSrc.value = '';
    };

    const handleIframeLoad = () => { isLoading.value = false; };
    const handleVideoLoaded = () => { isLoading.value = false; };

    const findProjectIdFromSeo = async () => {
      return projectIDs || null;
    };

    // ✅ ใช้ api.js + ถ้าไม่มี data => hide
const fetchVideoData = async () => {
  try {
    const projectId = projectIDs;
    if (!projectId) {
      isVisible.value = false;
      return;
    }

    const res  = await getProjectVideo(projectId); // api.js
    const data = res?.data?.data ?? null;

    // ❌ disabled จาก backend
    if (!data) {
      isVisible.value = false;
      return;
    }

    const sourceType = data.source_type || 'youtube';

    const hasYoutube =
      sourceType === 'youtube' &&
      typeof data.youtube?.embed_url === 'string' &&
      data.youtube.embed_url.trim() !== '';

    const hasFile =
      sourceType === 'file' &&
      typeof data.file?.url === 'string' &&
      data.file.url.trim() !== '';

    // ❌ ไม่มี video ใช้งานได้
    if (!hasYoutube && !hasFile) {
      isVisible.value = false;
      return;
    }

    // ---------- ผ่านเงื่อนไข ----------
    vdoData.value = data;

    if (hasYoutube) {
      baseEmbedUrl.value = data.youtube.embed_url;
    } else {
      baseEmbedUrl.value = '';
    }

    if (hasFile) {
      videoFileUrl.value = data.file.url;
    } else {
      videoFileUrl.value = '';
    }

    isVisible.value = true;

  } catch (err) {
    console.error('Error loading project video:', err);
    isVisible.value = false;
  }
};


    onMounted(async () => {
      language.value = getLanguageFromPath();
      if (window.AOS) AOS.init();
      await fetchVideoData();
    });

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
      fontCss,
      isVisible
    };
  }
});
