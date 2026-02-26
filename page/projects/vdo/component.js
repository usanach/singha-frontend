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
                <h2
                  class="text-[35px] text-center uppercase"
                  :class="[fontCss()]"
                  :style="{ color: titleColor }"
                >
                  {{ texts.title[language] }}
                </h2>


                <!-- Image / Video -->
                <div class="mx-auto overflow-hidden relative lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]">
                  <!-- Cover -->
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
                      class="absolute inset-0 cursor-pointer hover:scale-105 transition"
                      @click="playVideo"
                    ></div>
                  </template>

                  <!-- Video -->
                  <template v-else>
                    <!-- Mobile Modal -->
                    <template v-if="isMobile">
                      <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75">
                        <button
                          class="absolute top-4 right-4 text-white text-xl z-40"
                          @click="closeModal"
                        >✕</button>

                        <div class="relative w-full max-w-[90vw]">
                          <iframe
                            v-if="isYoutube"
                            class="w-full h-[440px]"
                            :src="iframeSrc"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            @load="handleIframeLoad"
                          ></iframe>

                          <video
                            v-else
                            class="w-full h-[440px]"
                            :src="videoFileUrl"
                            controls
                            autoplay
                            @loadeddata="handleVideoLoaded"
                          ></video>

                          <div
                            v-if="isLoading"
                            class="absolute inset-0 flex items-center justify-center bg-black/50"
                          >
                            <div class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        </div>
                      </div>
                    </template>

                    <!-- Desktop Inline -->
                    <template v-else>
                      <iframe
                        v-if="isYoutube"
                        class="lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]"
                        :src="iframeSrc"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        @load="handleIframeLoad"
                      ></iframe>

                      <video
                        v-else
                        class="lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]"
                        :src="videoFileUrl"
                        controls
                        autoplay
                        @loadeddata="handleVideoLoaded"
                      ></video>

                      <div
                        v-if="isLoading"
                        class="absolute inset-0 flex items-center justify-center bg-black/50"
                      >
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
    const language  = ref('th');
    const isMobile  = ref(window.innerWidth < 768);
    const showVideo = ref(false);
    const isLoading = ref(false);

    const isVisible = ref(false);
    const vdoData   = ref(null);

    const iframeSrc    = ref('');
    const baseEmbedUrl = ref('');
    const videoFileUrl = ref('');

    const defaultTexts = {
      title: { th: '', en: '' },
      images: {
        bg: { desktop: '', mobile: '' },
        desktop: '',
        mobile: ''
      }
    };

    // ✅ ใช้ต่อได้ เพราะเป็น url ไฟล์
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl || null;
    const getLanguageFromPath = () => {
      const match = window.location.pathname.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const fontCss = () =>
      getLanguageFromPath() === 'en' ? "font-['Kaisei_Decol']" : '';
    const titleColor = computed(() => {
      return vdoData.value?.title_color || '#3D2120';
    });

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
            desktop: STORAGE_BASE+'uploads/project/video/'+data.images?.bg?.desktop || '',
            mobile:  STORAGE_BASE+'uploads/project/video/'+data.images?.bg?.mobile  || ''
          },
          desktop: STORAGE_BASE+'uploads/project/video/'+data.images?.desktop || '',
          mobile:  STORAGE_BASE+'uploads/project/video/'+data.images?.mobile  || ''
        }
      };
    });

    const isYoutube = computed(() => {
      return (vdoData.value?.source_type || 'youtube') === 'youtube';
    });

    const playVideo = () => {
      if (isYoutube.value) {
        if (!baseEmbedUrl.value) return;

        const params = [];
        params.push('autoplay=1');

        const start = vdoData.value?.start_second;
        if (typeof start === 'number' && start > 0) {
          params.push(`start=${start}`);
        }

        const join = baseEmbedUrl.value.includes('?') ? '&' : '?';
        iframeSrc.value = baseEmbedUrl.value + join + params.join('&');
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

    const handleIframeLoad  = () => { isLoading.value = false; };
    const handleVideoLoaded = () => { isLoading.value = false; };

    // ===============================
    // Fetch from api.js
    // ===============================
    const fetchVideoData = async () => {
      try {
        const projectId = projectIDs;
        if (!projectId) {
          isVisible.value = false;
          return;
        }

        const res  = await getProjectVideo(projectId);
        const data = res?.data?.data ?? null;

        // disabled
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

        if (!hasYoutube && !hasFile) {
          isVisible.value = false;
          return;
        }

        vdoData.value = data;

        baseEmbedUrl.value = hasYoutube ? data.youtube.embed_url : '';
        videoFileUrl.value = hasFile ? data.file.url : '';

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
      titleColor,
      isVisible
    };
  }
});
