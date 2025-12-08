// Craft Your Tale (Template 1 = Video, Template 2 = Text/Parallax)
const CraftYourTaleComponent = defineComponent({
  name: 'CraftYourTaleComponent',
  template: `
    <!-- render เฉพาะเมื่อโหลดข้อมูลแล้วและเปิดใช้งาน -->
    <section
      v-if="isReady && isEnabled"
      ref="craftSection"
      class="craft-your-tale-component onview"
      data-section="craft_your_tales"
    >

      <!-- ================= TEMPLATE 2 : TEXT / PARALLAX ================= -->
      <template v-if="templateType === 2">
        <div class="relative overflow-hidden h-[900px] w-full cyt-desktop-pin">
          <!-- Layout 2 : BG + Text -->
          <div
            id="layout-2"
            class="layout-2 bg-cover bg-center bg-no-repeat absolute inset-0 flex items-center justify-center w-full cty-pallax -top-[10rem]"
            :style="{
              backgroundImage: 'url(' + (isMobile ? craft.images.bg.mobile : craft.images.bg.desktop) + ')'
            }"
          >
            <div class="w-full h-full">
              <div class="absolute top-0 left-0 h-full w-full flex">
                <div class="flex flex-col m-auto px-4">
                  <!-- Title / Description แบบ Text -->
                  <div class="mt-3 text-center">
                    <p
                      v-if="craft.title[language]"
                      class="text-white text-[32px] md:text-[40px] cyt-desc"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="200"
                    >
                      {{ craft.title[language] }}
                    </p>
                    <p
                      v-if="craft.desc[language]"
                      class="text-white text-[22px] md:text-[30px] mt-2 cyt-desc"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="400"
                    >
                      {{ craft.desc[language] }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Layout 1 : Foreground Overlay Image -->
          <div
            id="layout-1"
            class="layout-1 relative inset-0 flex items-center justify-center w-full transition-all duration-1000 h-[900px] bg-cover bg-center"
            :style="{
              backgroundImage: 'url(' + (isMobile ? craft.images.fg.mobile : craft.images.fg.desktop) + ')'
            }"
          ></div>
        </div>
      </template>

      <!-- ================= TEMPLATE 1 : VIDEO TEMPLATE ================= -->
      <template v-else>
        <div
          class="bg-cover bg-no-repeat bg-center"
          :style="{
            backgroundImage: 'url(' + (isMobile ? craft.images.bg.mobile : craft.images.bg.desktop) + ')'
          }"
        >
          <div class="py-20">
            <div class="container">
              <div class="flex flex-col mx-auto justify-center gap-20">
                <!-- Video Section -->
                <div class="flex flex-col justify-center">
                  <div
                    class="mx-auto overflow-hidden relative lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]"
                  >
                    <!-- ยังไม่กดเล่น: แสดงรูป cover + ปุ่ม play -->
                    <template v-if="!showVideo">
                      <img
                        class="w-full"
                        :src="isMobile ? craft.images.fg.mobile : craft.images.fg.desktop"
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-easing="linear"
                        data-aos-delay="200"
                        alt="Craft your tale"
                      >
                      <div
                        class="absolute top-0 left-0 flex h-full w-full cursor-pointer hover:scale-105 transition"
                        @click="playVideo"
                      >
                        <svg
                          class="m-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          width="197"
                          height="209"
                          viewBox="0 0 197 209"
                        >
                          <defs>
                            <filter id="Polygon_3" x="0" y="0" width="197" height="209" filterUnits="userSpaceOnUse">
                              <feOffset dy="3" input="SourceAlpha"/>
                              <feGaussianBlur stdDeviation="20" result="blur"/>
                              <feFlood flood-opacity="0.494"/>
                              <feComposite operator="in" in2="blur"/>
                              <feComposite in="SourceGraphic"/>
                            </filter>
                          </defs>
                          <g filter="url(#Polygon_3)">
                            <path
                              id="Polygon_3-2"
                              d="M44.5,0,89,77H0Z"
                              transform="translate(137 57) rotate(90)"
                              fill="#fff"
                              opacity="0.588"
                            />
                          </g>
                        </svg>
                      </div>
                    </template>

                    <!-- กดเล่นแล้ว: แสดง iframe -->
                    <template v-else>
                      <!-- Mobile: modal เต็มจอ -->
                      <template v-if="isMobile">
                        <div
                          class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75"
                        >
                          <button
                            @click="closeModal"
                            class="absolute top-0 right-0 text-white p-2 w-[35px] h-[35px] z-40"
                          >
                            x
                          </button>
                          <div class="relative w-full px-4">
                            <div class="relative">
                              <iframe
                                id="player"
                                class="w-full h-[440px]"
                                :src="iframeSrc"
                                title="Craft Your Tale Video"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen
                                @load="handleIframeLoad"
                              ></iframe>
                              <div
                                v-if="isLoading"
                                class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20]"
                              >
                                <div
                                  class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>

                      <!-- Desktop: inline -->
                      <template v-else>
                        <iframe
                          id="player"
                          class="lg:w-[960px] lg:h-[540px] md:h-[420px] md:w-[730px]"
                          :src="iframeSrc"
                          title="Craft Your Tale Video"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerpolicy="strict-origin-when-cross-origin"
                          allowfullscreen
                          @load="handleIframeLoad"
                        ></iframe>
                        <div
                          v-if="isLoading"
                          class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20]"
                        >
                          <div
                            class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"
                          ></div>
                        </div>
                      </template>
                    </template>
                  </div>
                </div>

                <!-- Title / Description ด้านล่าง video -->
                <!-- Mobile -->
                <div
                  class="lg:hidden block relative z-[10] -mt-24 text-center"
                  :class="!showVideo ? 'opacity-100' : 'opacity-0 !hidden'"
                >
                  <!-- ถ้า titleType = image และมีรูป -->
                  <template v-if="titleType === 'image' && craft.images.titleImage">
                    <img
                      class="w-full mx-auto"
                      :src="craft.images.titleImage"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      alt="Craft your tale title"
                    >
                  </template>
                  <!-- ถ้าแบบ text -->
                  <template v-else>
                    <p
                      v-if="craft.title[language]"
                      class="text-white text-[26px] mb-2"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                    >
                      {{ craft.title[language] }}
                    </p>
                    <p
                      v-if="craft.desc[language]"
                      class="text-white text-[18px]"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="150"
                    >
                      {{ craft.desc[language] }}
                    </p>
                  </template>
                </div>

                <!-- Desktop -->
                <div
                  class="lg:block hidden relative z-[10] -mt-40 text-center"
                  :class="!showVideo ? 'opacity-100' : 'opacity-0 !hidden'"
                >
                  <template v-if="titleType === 'image' && craft.images.titleImage">
                    <img
                      class="w-full mx-auto max-w-[640px]"
                      :src="craft.images.titleImage"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      alt="Craft your tale title"
                    >
                  </template>
                  <template v-else>
                    <p
                      v-if="craft.title[language]"
                      class="text-white text-[36px] mb-3"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                    >
                      {{ craft.title[language] }}
                    </p>
                    <p
                      v-if="craft.desc[language]"
                      class="text-white text-[22px]"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="150"
                    >
                      {{ craft.desc[language] }}
                    </p>
                  </template>
                </div>

              </div>
            </div>
          </div>
        </div>
      </template>
    </section>
  `,

  setup() {
      const language     = ref('th');
      const templateType = ref(1);      // 1 = Video, 2 = Text
      const titleType    = ref('text'); // text | image
      const craftSection = ref(null);

    const isEnabled    = ref(false);
    const isReady      = ref(false);

    const isMobile = ref(false);
    const showVideo = ref(false);
    const isLoading = ref(false);
    const iframeSrc = ref('');

    // โครงข้อมูล craft จาก API
    const craft = ref({
      title: { th: '', en: '' },
      desc:  { th: '', en: '' },
      images: {
        bg: { desktop: '', mobile: '' },
        fg: { desktop: '', mobile: '' },
        titleImage: ''
      },
      video: ''
    });

    // base URL API/storage
    const API_BASE     = window.APP_CONFIG?.apiBaseUrl || 'http://127.0.0.1:8000/api';
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl || `${window.location.origin}/storage`;

    const updateIsMobile = () => {
        const width = craftSection.value?.offsetWidth || window.innerWidth;
        isMobile.value = width < 768;
        console.log(craftSection.value?.offsetWidth);
        
        // debug ดูค่า
        // console.log('resize => innerWidth:', window.innerWidth, 'isMobile:', isMatch);
    };

    const buildImagePath = (imagePath) => {
      if (!imagePath) return '';
      if (/^https?:\/\//i.test(imagePath)) return imagePath;
      return `${STORAGE_BASE}/uploads/projects/${imagePath.replace(/^\/+/, '')}`;
    };

    const playVideo = () => {
      if (!craft.value.video) return;
      isLoading.value = true;
      showVideo.value = true;
    };

    const closeModal = () => {
      showVideo.value = false;
      isLoading.value = false;
    };

    const handleIframeLoad = () => {
      isLoading.value = false;
    };

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const initParallaxTemplate = () => {
      // ใช้เฉพาะ Template 2
      if (templateType.value !== 2) return;

      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        if (window.innerWidth > 768) {
          ScrollTrigger.create({
            trigger: ".craft-your-tale-component",
            start: "top top",
            pin: true,
            scrub: true,
            pinSpacing: false
          });
        }

        ScrollTrigger.create({
          trigger: "#layout-1",
          start: "top center",
          onEnter: () => {
            const layout1 = document.querySelector("#layout-1");
            if (!layout1) return;
            layout1.classList.add("opacity-0", "scale-110");
          },
          onLeaveBack: () => {
            const layout1 = document.querySelector("#layout-1");
            if (!layout1) return;
            layout1.classList.remove("opacity-0", "scale-110");
          }
        });
      }

      if (typeof Rellax !== 'undefined') {
        new Rellax('.cty-pallax');
      }
    };

    const fetchCraftData = async () => {
      try {
        const currentPath = window.location.pathname;
        const lang        = language.value;

        // 1) หา project_id จาก /project/seo
        const seoRes   = await axios.get(`${API_BASE}/project/seo`);
        const seoRows  = Array.isArray(seoRes.data?.data) ? seoRes.data.data : [];
        const enabled  = seoRows.filter(r => (r.seo_disabled ?? 0) != 1);
        const field    = lang === 'en' ? 'seo_url_en' : 'seo_url_th';
        const matched  = enabled.find(row => row[field] === currentPath);

        if (!matched || !matched.project_id) {
          console.warn('CraftYourTale: no SEO matched current URL');
          isReady.value = false;
          return;
        }

        const projectId = matched.project_id;

        // 2) ดึง Craft Yours Tale ตาม project_id
        const craftRes  = await axios.get(`${API_BASE}/project/caft-yours-tale/${projectId}`);
        const craftRows = Array.isArray(craftRes.data?.data) ? craftRes.data.data : [];

        if (!craftRows.length) {
          console.warn('CraftYourTale: no data in API');
          isReady.value = false;
          return;
        }

        // เลือก row แรกที่เปิดใช้งาน (caft_yours_tale_disabled = 1 เปิด, 0 ปิด)
        let row = craftRows.find(r => Number(r.caft_yours_tale_disabled ?? 0) === 1);
        if (!row) {
          // ถ้าไม่มีที่เปิดเลย ใช้ row แรก แต่ถือว่า disabled
          row = craftRows[0];
        }

        const disabledFlag = Number(row.caft_yours_tale_disabled ?? 0);
        isEnabled.value    = disabledFlag === 1;
        if (!isEnabled.value) {
          isReady.value = false;
          return;
        }

        templateType.value = Number(row.carft_yours_tale_template_type ?? 1) === 2 ? 2 : 1;
        titleType.value    = row.caft_yours_tale_title_type || 'text';

        craft.value = {
          title: {
            th: row.caft_yours_tale_title_th || '',
            en: row.caft_yours_tale_title_en || ''
          },
          desc: {
            th: row.caft_yours_tale_desc_th || '',
            en: row.caft_yours_tale_desc_en || ''
          },
          images: {
            bg: {
              desktop: buildImagePath(row.caft_yours_tale_image_bg_desktop),
              mobile:  buildImagePath(row.caft_yours_tale_image_bg_mobile)
            },
            fg: {
              desktop: buildImagePath(row.caft_yours_tale_image_desktop),
              mobile:  buildImagePath(row.caft_yours_tale_image_mobile)
            },
            titleImage: row.caft_yours_tale_title_image
              ? buildImagePath(row.caft_yours_tale_title_image)
              : ''
          },
          video: row.caft_yours_tale_video || ''
        };

        if (templateType.value === 1 && craft.value.video) {
          iframeSrc.value = craft.value.video;
        }

        isReady.value = true;
      } catch (err) {
        console.error('CraftYourTale: fetch error', err);
        isReady.value = false;
      }
    };

    
    onMounted(async () => {
        language.value = getLanguageFromPath();

        await fetchCraftData();

        nextTick(() => {
            // อัปเดต isMobile ครั้งแรกหลัง DOM พร้อมแล้ว
            updateIsMobile();

            // ถ้าจะให้ resize แล้วตาม ต้องผูก event หรือใช้ ResizeObserver
            window.addEventListener('resize', updateIsMobile);

            if (window.AOS) {
            AOS.init();
            }
            if (templateType.value === 2) {
            initParallaxTemplate();
            }
        });
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateIsMobile);
    });

    return {
      craftSection,
      language,
      craft,
      templateType,
      titleType,
      isEnabled,
      isReady,
      isMobile,
      showVideo,
      isLoading,
      iframeSrc,
      playVideo,
      closeModal,
      handleIframeLoad
    };
  }
});
