// Define the Header component
const ExperienceComponent = defineComponent({
  name: 'ExperienceComponent',
  template: `
  <section
    id="ExperienceComponent"
    class="bg-[#1A2F4D] lg:pt-20 pt-0 lg:pb-16"
    ref="sectionRef" v-if="experience"
  >
    <div class="container !px-0 lg:!px-[20px]">
      <div class="relative">
        <!-- รูปหลัก: ถ้ามีจาก API ใช้ของ API, ถ้าไม่มีก็ใช้ default -->
        <img
          :src="imageDesktop"
          alt="Experience unmatched living"
          class="lg:block hidden w-full"
          loading="lazy"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="linear"
        />
        <img
          :src="imageMobile"
          alt="Experience unmatched living"
          class="lg:hidden block w-full absolute top-0 left-0"
          loading="lazy"
        />

        <!-- Content Block -->
        <div
          class="lg:absolute top-0 left-0 w-full h-full flex flex-col"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="linear"
        >
          <div class="lg:pt-16 lg:pl-[9rem] p-5 lg:mx-0 mx-auto lg:mt-0 mt-10">
            <!-- ถ้ามี data จริงแล้ว -->
            <h2
              v-if="experience"
              class="text-[#CBA449] text-[35px] md:text-start text-center uppercase leading-tight"
              v-html="language==='en' ? experience.title.en : experience.title.th"
            ></h2>
            <!-- skeleton title -->
            <div
              v-else
              class="mx-auto md:mx-0 h-[40px] w-3/4 md:w-1/2 bg-white/20 rounded animate-pulse"
            ></div>

            <!-- detail จริง -->
            <p
              v-if="experience"
              class="text-white text-[22px] md:mt-5 mt-3 text-center md:text-start"
              v-html="language==='en' ? experience.detail.en : experience.detail.th"
            ></p>
            <!-- skeleton detail -->
            <div v-else class="mt-4 space-y-2">
              <div class="h-[18px] w-[90%] bg-white/10 rounded animate-pulse mx-auto md:mx-0"></div>
              <div class="h-[18px] w-[80%] bg-white/10 rounded animate-pulse mx-auto md:mx-0"></div>
              <div class="h-[18px] w-[70%] bg-white/10 rounded animate-pulse mx-auto md:mx-0"></div>
            </div>
          </div>
        </div>

        <!-- Cards -->
        <div class="grid lg:grid-cols-5 grid-cols-1 gap-5 lg:mt-[-22rem] mt-10 relative xl:px-5 px-0 lg:pb-0 pb-10">
          <!-- ถ้ามี data จริงแล้ว -->
          <div
            v-if="experience"
            v-for="(item, index) in experience.data"
            :key="index"
            class="bg-white lg:w-full w-[280px] card lg:mx-0 mx-auto transition-transform duration-300"
            @click="toggleCard"
          >
            <!-- Desktop image -->
            <div class="w-full aspect-[4/3] overflow-hidden lg:block hidden">
              <img
                :src="item.image.l"
                :alt="language==='en' ? item.title.en : item.title.th"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div class="bg-white uppercase p-5 space-y-3 lg:block hidden">
              <div class="xl:h-[40px] lg:h-[30px] overflow-hidden">
                <h3
                  class="text-[14px]"
                  v-html="language==='en' ? item.title.en : item.title.th"
                ></h3>
              </div>
              <hr />
              <p
                class="text-[14px]"
                v-html="language==='en' ? item.detail.en : item.detail.th"
              ></p>
            </div>

            <!-- Mobile image -->
            <div class="w-full aspect-[4/3] overflow-hidden lg:hidden block">
              <img
                :src="item.image.s"
                :alt="language==='en' ? item.title.en : item.title.th"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div class="bg-white uppercase p-5 space-y-3 lg:hidden block">
              <div class="xl:h-[40px] lg:h-[30px] h-fit overflow-hidden">
                <h3
                  class="text-[14px]"
                  v-html="language==='en' ? item.title.en : item.title.th"
                ></h3>
              </div>
              <hr />
              <p
                class="text-[14px]"
                v-html="language==='en' ? item.detail.en : item.detail.th"
              ></p>
            </div>
          </div>

          <!-- SKELETON CARDS ตอนยังไม่มี experience -->
          <div
            v-else
            v-for="n in 5"
            :key="'skeleton-' + n"
            class="bg-white lg:w-full w-[280px] card lg:mx-0 mx-auto"
          >
            <!-- skeleton image -->
            <div class="w-full aspect-[4/3] bg-slate-200 animate-pulse"></div>

            <div class="bg-white uppercase p-5 space-y-3">
              <div class="h-[16px] w-[70%] bg-slate-200 rounded animate-pulse"></div>
              <hr />
              <div class="space-y-2">
                <div class="h-[12px] w-full bg-slate-200 rounded animate-pulse"></div>
                <div class="h-[12px] w-[90%] bg-slate-200 rounded animate-pulse"></div>
                <div class="h-[12px] w-[60%] bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`,
  setup() {
    const language = ref('th');

    // config จาก window.APP_CONFIG
    const APP_CONFIG = window.APP_CONFIG || {};
    const API_BASE_URL = APP_CONFIG.apiBaseUrl;
    const STORAGE_URL = APP_CONFIG.storageUrl+'/uploads/experience/';

    const imageDesktop = ref('/assets/image/residential/a-story-img-01.webp');
    const imageMobile = ref('/assets/image/residential/a-story-img-01_m.webp');

    // ข้อมูลจริงจาก API (null ตอนเริ่ม → ใช้ skeleton)
    const experience = ref(null);

    const sectionRef = ref(null);
    const hasFetched = ref(false);

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const fetchExperience = async () => {
      if (hasFetched.value) return;
      hasFetched.value = true;

      try {
        const response = await axios.get(`${API_BASE_URL}/home/brand-philosophy`);
        const items = response.data?.data || [];
        const subItems = response.data?.['sub-data'] || [];

        if (!items.length) return;

        const main = items[0];

        // เตรียม object ใหม่แทนทั้งชุด
        const exp = {
          title: {
            th: main.title?.th || '',
            en: (main.title?.en || '').replace(/\r\n/g, "<br class='lg:block hidden'/>")
          },
          detail: {
            th: (main.detail?.th || '').replace(/\r\n/g, "<br class='lg:block hidden'/>"),
            en: (main.detail?.en || '').replace(/\r\n/g, "<br class='lg:block hidden'/>")
          },
          data: []
        };

        // รูป BG
        if (main.image_d) {
          imageDesktop.value = `${STORAGE_URL}${main.image_d}`;
        }
        if (main.image_m) {
          imageMobile.value = `${STORAGE_URL}${main.image_m}`;
        } else if (main.image_d) {
          imageMobile.value = `${STORAGE_URL}${main.image_d}`;
        }

        // cards จาก sub-data
        if (subItems.length) {
          const sorted = subItems
            .slice()
            .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

          exp.data = sorted.map((sub) => ({
            title: sub.title || { th: '', en: '' },
            detail: sub.detail || { th: '', en: '' },
            image: {
              l: sub.image_l ? `${STORAGE_URL}${sub.image_l}` : '',
              s: sub.image_s ? `${STORAGE_URL}${sub.image_s}` : ''
            }
          }));
        }

        experience.value = exp;

        nextTick(() => {
          if (window.AOS) {
            AOS.refresh();
          }
        });
      } catch (error) {
        console.error('Failed to load brand philosophy', error);
      }
    };

    const initAOS = () => {
      if (window.AOS) {
        AOS.init();
      }
    };

    onMounted(() => {
      language.value = getLanguageFromPath();
      initAOS();

      // Lazy load ด้วย IntersectionObserver
      if ('IntersectionObserver' in window && sectionRef.value) {
        const observer = new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                fetchExperience();
                obs.disconnect();
              }
            });
          },
          {
            root: null,
            threshold: 0.2
          }
        );
        observer.observe(sectionRef.value);
      } else {
        // fallback: ถ้า browser ไม่รองรับ ก็โหลดเลย
        fetchExperience();
      }
    });

    // Card toggle handler (แค่ใส่/เอา class .expanded)
    const toggleCard = (event) => {
      const btn = event.currentTarget;
      btn.classList.toggle('expanded');
    };

    return {
      language,
      experience,
      toggleCard,
      imageDesktop,
      imageMobile,
      sectionRef
    };
  }
});
