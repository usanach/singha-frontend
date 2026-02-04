const ProjectsHighlightComponent = defineComponent({
  name: 'ProjectsHighlightComponent',
  template: `
    <!-- =============== TEMPLATE TYPE 1 =============== -->
    <section
      v-if="isReady && templateType === '1' && items1.length"
      class="onview font-['IBM_Plex_Sans_Thai']"
      :style="{ color: mainFontColor }"
      id="project_signature"
      data-section="project_signature"
    >
      <div class="relative">
        <div
          class="w-full lg:h-full bg-cover bg-top pt-10 pb-20"
          :style="{ backgroundImage: 'url(' + bgImage + ')' }"
        >
          <div class="container mx-auto lg:px-5 px-0">
            <div>
              <h2
                :style="{ fontFamily: titleFontFamily[language] }"
                class="text-[50px] text-center font-normal"
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-easing="linear"
              >
                {{ sectionTitle[language] }}
              </h2>
            </div>

            <!-- ถ้าจำนวนไม่ครบ 4 ก็กัน error ไว้ -->
            <div
              v-if="items1.length >= 1"
              class="flex flex-col gap-10 mt-5"
            >
              <!-- BLOCK 1 -->
              <div class="flex flex-col lg:px-[15%] lg:gap-10 gap-5">
                <div class="lg:mx-0 -mx-20">
                  <img
                    :src="items1[0].image"
                    alt=""
                    class="w-full"
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-easing="linear"
                    data-aos-delay="100"
                  >
                </div>
                <div class="flex flex-col gap-2 lg:px-0 px-5 lg:w-1/2">
                  <h3
                    :style="{ fontFamily: items1[0].font[language] }"
                    class="text-[22px] leading-none font-normal"
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-easing="linear"
                    data-aos-delay="200"
                  >
                    {{ items1[0].title[language] }}
                  </h3>
                  <p
                    class="text-[16px] font-normal"
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-easing="linear"
                    data-aos-delay="300"
                  >
                    {{ items1[0].detail[language] }}
                  </p>
                </div>
              </div>

              <!-- BLOCK 2 & 3 -->
              <div
                v-if="items1.length >= 3"
                class="items-end lg:-mt-[10%] gap-10"
              >
                <div class="flex lg:flex-row flex-col lg:gap-10 gap-5 w-full lg:mb-10">
                  <!-- item[1] -->
                  <div
                    class="lg:w-1/2 w-full mt-auto"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-easing="linear"
                  >
                    <img
                      :src="items1[1].image"
                      alt=""
                      class="w-full"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="100"
                    >
                    <div class="flex lg:gap-10 gap-5 mt-5 lg:hidden">
                      <div class="flex flex-col gap-2 w-full lg:px-0 px-5">
                        <h3
                          :style="{ fontFamily: items1[1].font[language] }"
                          class="text-[22px] leading-none font-normal"
                          data-aos="fade-up"
                          data-aos-duration="500"
                          data-aos-easing="linear"
                          data-aos-delay="200"
                        >
                          {{ items1[1].title[language] }}
                        </h3>
                        <p
                          class="text-[16px] font-normal"
                          data-aos="fade-up"
                          data-aos-duration="500"
                          data-aos-easing="linear"
                          data-aos-delay="300"
                        >
                          {{ items1[1].detail[language] }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- item[2] -->
                  <div
                    class="lg:w-1/2 w-full"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-easing="linear"
                  >
                    <img
                      :src="items1[2].image"
                      class="lg:block hidden w-full"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="100"
                      alt=""
                    >
                    <img
                      :src="items1[2].image"
                      alt=""
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="100"
                      class="lg:hidden block w-full"
                    >
                    <div class="flex lg:gap-10 gap-5 mt-5 lg:hidden">
                      <div class="flex flex-col gap-2 w-full lg:px-0 px-5">
                        <h3
                          :style="{ fontFamily: items1[2].font[language] }"
                          class="text-[22px] leading-none font-normal"
                          data-aos="fade-up"
                          data-aos-duration="500"
                          data-aos-easing="linear"
                          data-aos-delay="200"
                        >
                          {{ items1[2].title[language] }}
                        </h3>
                        <p
                          class="text-[16px] font-normal"
                          data-aos="fade-up"
                          data-aos-duration="500"
                          data-aos-easing="linear"
                          data-aos-delay="300"
                        >
                          {{ items1[2].detail[language] }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- desktop text (item[1] & item[2]) -->
                <div class="lg:flex hidden lg:gap-10 gap-5">
                  <div class="flex flex-col gap-2 w-1/2 lg:px-0 px-5">
                    <h3
                      :style="{ fontFamily: items1[1].font[language] }"
                      class="text-[22px] leading-none font-normal"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="200"
                    >
                      {{ items1[1].title[language] }}
                    </h3>
                    <p
                      class="text-[16px] font-normal"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="300"
                    >
                      {{ items1[1].detail[language] }}
                    </p>
                  </div>
                  <div class="flex flex-col gap-2 w-1/2 lg:px-0 px-5">
                    <h3
                      :style="{ fontFamily: items1[2].font[language] }"
                      class="text-[22px] leading-none font-normal"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="200"
                    >
                      {{ items1[2].title[language] }}
                    </h3>
                    <p
                      class="text-[16px] font-normal"
                      data-aos="fade-up"
                      data-aos-duration="500"
                      data-aos-easing="linear"
                      data-aos-delay="300"
                    >
                      {{ items1[2].detail[language] }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- BLOCK 4 -->
              <div
                v-if="items1.length >= 4"
                class="flex flex-col lg:px-[15%] lg:gap-10 gap-5"
              >
                <div class="mx-auto">
                  <img
                    :src="items1[3].image"
                    alt=""
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-easing="linear"
                    data-aos-delay="100"
                  >
                </div>
                <div class="flex flex-col gap-2 lg:px-0 px-5">
                  <h3
                    :style="{ fontFamily: items1[3].font[language] }"
                    class="text-[22px] leading-none font-normal"
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-easing="linear"
                    data-aos-delay="200"
                  >
                    {{ items1[3].title[language] }}
                  </h3>
                  <p
                    class="text-[16px] font-normal"
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-easing="linear"
                    data-aos-delay="300"
                  >
                    {{ items1[3].detail[language] }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =============== TEMPLATE TYPE 2 =============== -->
    <section
      v-else-if="isReady && templateType === '2' && projects2.length"
      class="onview"
      id="project_signature"
      data-section="project_signature"
    >
      <div class="relative">
        <div
          class="w-full lg:h-full bg-cover bg-top pt-10 pb-20"
          :style="{ backgroundImage: 'url(' + bgImage + ')' }"
        >
          <div class="container mx-auto lg:px-5 px-0 space-y-10 py-10">
            <div>
              <h2
                class="text-[#3D2120] text-[35px] font-bold text-center"
                :class="[fontCss()]"
                data-aos="fade-up"
                data-aos-duration="500"
                data-aos-easing="linear"
              >
                {{ sectionTitle[language] }}
              </h2>
            </div>

            <div class="mx-auto space-y-10">
              <div
                v-for="(project, index) in projects2"
                :key="project.id || index"
                class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center"
              >
                <!-- Image -->
                <div
                  :class="[
                    'order-1',
                    'lg:col-span-2',
                    index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'
                  ]"
                >
                  <img
                    class="object-cover project-image"
                    :src="project.image"
                    :alt="project.title[language]"
                  />
                </div>

                <!-- Detail -->
                <div
                  class="px-5 md:px-0 text-[#54457B] space-y-3"
                  :class="[
                    'order-2',
                    index % 2 !== 0 ? 'lg:order-1 lg:text-right' : 'lg:order-2'
                  ]"
                >
                  <div>
                    <p
                      class="text-[70px] leading-none font-light project-number font-['Tenor_Sans'] font-normal"
                    >
                      {{ (index + 1).toString().padStart(2, '0') }}
                    </p>
                  </div>
                  <div>
                    <h2
                      class="text-[35px] font-light project-title leading-none font-normal font-['Gotham']"
                      v-html="project.title[language]"
                    ></h2>
                  </div>
                  <div>
                    <p
                      class="project-description font-normal text-[#2C2C2C] text-[16px]"
                      v-html="project.description[language]"
                    ></p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `,

  setup() {
    const language      = ref('th');
    const templateType  = ref('1');      // "1" หรือ "2"
    const isReady       = ref(false);
    const bgImage       = ref('');       // จาก highlight_bg_image
    const mainFontColor = ref('#4A1923');

    // ชื่อ section + ฟอนต์หัวข้อ
    const sectionTitle = ref({
      en: 'PROJECT SIGNATURES',
      th: 'จุดเด่นของโครงการ',
    });

    const titleFontFamily = ref({
      en: 'Gotham',
      th: 'IBM Plex Sans Thai',
    });

    // Template 1 items
    const items1 = ref([]);   // [{ title:{th,en}, detail:{th,en}, image, font:{th,en} }]

    // Template 2 projects
    const projects2 = ref([]); // [{ image, title:{th,en}, description:{th,en}, id }]

    // base URL
    const API_BASE     = window.APP_CONFIG?.apiBaseUrl || 'http://127.0.0.1:8000/api';
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl || `${window.location.origin}/storage`;

    const buildHighlightImagePath = (file) => {
      if (!file) return '';
      if (/^https?:\/\//i.test(file)) return file;
      // เก็บใน uploads/project_highlight
      return `${STORAGE_BASE}uploads/project_highlight/${String(file).replace(/^\/+/, '')}`;
    };

    const getLanguageFromPath = () => {
      const path  = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const fontCss = () => {
      return language.value === 'en'
        ? "font-['Gotham']"
        : "font-['IBM_Plex_Sans_Thai']";
    };

    const initAOS = () => {
      if (window.AOS) {
        AOS.init();
      }
    };

    const initGsapScroll = () => {
      if (!window.gsap || !window.ScrollTrigger) return;

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray('.project-image').forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 90%',
            end: '50% 60%',
            scrub: true,
          },
          opacity: 0,
          y: 50,
          ease: 'none',
        });
      });

      gsap.utils.toArray('.project-number').forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 90%',
            end: '50% 60%',
            scrub: true,
          },
          opacity: 0,
          x: -50,
          ease: 'none',
        });
      });

      gsap.utils.toArray('.project-title').forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 90%',
            end: '50% 60%',
            scrub: true,
          },
          opacity: 0,
          y: 50,
          ease: 'none',
        });
      });

      gsap.utils.toArray('.project-description').forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 90%',
            end: '50% 60%',
            scrub: true,
          },
          opacity: 0,
          y: 50,
          ease: 'none',
        });
      });
    };

    /**
     * หาว่า URL ปัจจุบัน match project ไหน จาก /api/project/seo
     */
    const findProjectIdFromSeo = async () => {
      // const path = window.location.pathname;
      // const lang = language.value;

      // const res = await axios.get(`${API_BASE}/project/seo`);
      // const rows = Array.isArray(res.data?.data) ? res.data.data : [];

      // const enabledRows = rows.filter((r) => (r.seo_disabled ?? 0) != 1);
      // const field = lang === 'en' ? 'seo_url_en' : 'seo_url_th';

      // const matched = enabledRows.find((row) => row[field] === path);
      
      return projectIDs || null;
    };

    /**
     * ดึง highlight จาก /api/project/highlight/{project_id}
     * + เช็ค highlight_disabled = 1 เท่านั้นที่แสดง
     */
    const fetchProjectsHighlight = async () => {
      try {
        const projectId = await findProjectIdFromSeo();
        if (!projectId) {
          console.warn('ProjectsHighlight: ไม่พบ project_id');
          isReady.value = true;
          return;
        }

        // ✅ ใช้ api.js
        const res = await getProjectHighlight(projectId);
        const rows = Array.isArray(res?.data?.data) ? res.data.data : [];

        if (!rows.length) {
          console.warn('ProjectsHighlight: API ไม่ส่ง data');
          isReady.value = true;
          return;
        }

        // 🔥 ใช้เฉพาะ highlight_disabled = 1
        const enabledRows = rows.filter(
          r => Number(r.highlight_disabled ?? 1) === 1
        );

        if (!enabledRows.length) {
          templateType.value = '0';
          isReady.value = true;
          return;
        }

        const first = enabledRows[0];
        templateType.value = String(first.highlight_template_type || '1');

        // background
        bgImage.value = first.highlight_bg_image
          ? buildHighlightImagePath(first.highlight_bg_image)
          : '/assets/image/santiburi-page/highlight/bg.png';

        // ---------- TEMPLATE 1 ----------
        if (templateType.value === '1') {
          items1.value = enabledRows.map(r => ({
            id: r.id,
            title: r.highlight_title || { th: '', en: '' },
            detail: r.highlight_description || { th: '', en: '' },
            font: {
              th:r.highlight_title_font_th || 'DB Heavent',
              en: r.highlight_title_font_en ||'Gotham',
            },
            image: buildHighlightImagePath(r.highlight_image),
          }));
        }

        // ---------- TEMPLATE 2 ----------
        if (templateType.value === '2') {
          projects2.value = enabledRows.map(r => ({
            id: r.id,
            image: buildHighlightImagePath(r.highlight_image),
            title: r.highlight_title || { th: '', en: '' },
            description: r.highlight_description || { th: '', en: '' },
          }));
        }

        isReady.value = true;
      } catch (err) {
        console.error('ProjectsHighlight: fetch error', err);
        isReady.value = true;
      }
    };


    onMounted(async () => {
      language.value = getLanguageFromPath();
      await fetchProjectsHighlight();

      nextTick(() => {
        initAOS();
        if (templateType.value === '2') {
          initGsapScroll();
        }
      });
    });

    return {
      language,
      templateType,
      isReady,
      bgImage,
      mainFontColor,
      sectionTitle,
      titleFontFamily,
      items1,
      projects2,
      fontCss,
    };
  },
});
