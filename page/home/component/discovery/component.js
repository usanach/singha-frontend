// Define the Header component
const DiscoveryComponent = defineComponent({
  name: 'DiscoveryComponent',
  template: `
<section id="DiscoveryComponent">
  <div class="bg-[#003B5E] py-10 lg:pt-5 pt-0 lg:pb-10 pb-0">
    <div class="container lg:py-10 py-10 overflow-hidden"
         data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
      <h2 :class="\`\${font} text-white text-[35px] lg:text-center text-center uppercase leading-tight\`">
        {{ title }}
      </h2>
      <p class="text-[20px] text-center text-white lg:w-3/4 mx-auto mt-2" v-html="detail"></p>
    </div>

    <div class="relative">
      <div class="swiper collection-slide lg:pb-16"
           data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
        <div class="swiper-wrapper">
          <div
            v-if="slideImg && slideImg.length"
            v-for="(item, i) in slideImg"
            :key="i"
            class="swiper-slide"
          >
            <div class="relative w-full h-fit">
              <a :href="item.link" target="_blank">
                <img
                  v-if="item.image.l"
                  :src="item.image.l"
                  :alt="\`\${item.name[language] || ''} - \${item.location[language] || ''}\`"
                  class="w-full md:block hidden"
                >
                <img
                  v-if="item.image.s"
                  :src="item.image.s"
                  :alt="\`\${item.name[language] || ''} - \${item.location[language] || ''}\`"
                  class="w-full md:hidden block"
                >
              </a>
            </div>
          </div>
        </div>

        <div class="lg:absolute relative bottom-0 w-full z-10 mb-2"
             data-aos="fade-up" data-aos-duration="1000"
             data-aos-easing="linear" data-aos-anchor=".collection-slide">
          <div class="container lg:!px-[20px] !px-0">
            <div
              class="flex lg:w-3/4 bg-[#004670] mx-auto lg:p-5 p-0 py-5 lg:gap-5 lg:flex-row flex-col lg:px-10 px-5"
            >
              <div class="lg:w-1/2 w-full">
                <div class="swiper collection-detail-slide">
                  <div class="swiper-wrapper">
                    <div
                      v-if="slideDetail && slideDetail.length"
                      v-for="(det, j) in slideDetail"
                      :key="j"
                      class="swiper-slide text-white"
                    >
                      <a :href="det.link" target="_blank">
                        <h5 class="text-[22px] uppercase font-bold">{{ det.name[language] }}</h5>
                      </a>
                      <p class="text-[16px] capitalize font-[100]">{{ det.location[language] }}</p>
                      <p class="text-[20px] uppercase">{{ det.detail }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex gap-5 w-full lg:mt-0 mt-5">
                <div class="flex gap-5 lg:ml-auto w-full">
                  <div class="lg:w-full w-[150px] relative bg-white h-[4px] my-auto overflow-hidden">
                    <div class="hero-progress-bar h-full"></div>
                  </div>
                  <div class="flex text-white leading-0 text-[16px]">
                    <div class="page-number leading-tight my-auto whitespace-nowrap"></div>
                  </div>
                </div>

                <div class="flex gap-5 my-auto lg:ml-0 ml-auto">
                  <span class="prev w-[40px] cursor-pointer">
                    <img src="/assets/image/residential/Button-Icon.webp" alt="icon" class="rotate-180">
                  </span>
                  <span class="next w-[40px] cursor-pointer">
                    <img src="/assets/image/residential/Button-Icon.webp" alt="icon">
                  </span>
                </div>
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
    const language = ref('th');

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const m = path.match(/\/(th|en)(\/|$)/);
      return m ? m[1] : 'th';
    };

    // ===== CONFIG จาก APP_CONFIG =====
    const APP_CONFIG = window.APP_CONFIG || {};
    const API_BASE_URL = APP_CONFIG.apiBaseUrl || 'http://127.0.0.1:8000/api';
    const STORAGE_ROOT = (APP_CONFIG.storageUrl || 'http://127.0.0.1:8000/storage/')
      .replace(/\/?$/, '/'); // ensure trailing slash

    // helper ต่อ URL รูป
    const resolveImageUrl = (file) => {
      if (!file) return '';

      // URL เต็ม
      if (/^https?:\/\//.test(file)) return file;

      // asset หน้าเว็บ
      if (file.startsWith('/')) return file;

      // จาก API: uploads/discovery/xxx
      if (file.startsWith('uploads/discovery/')) {
        return STORAGE_ROOT + file;
      }

      // default
      return STORAGE_ROOT + 'uploads/discovery/' + file;
    };

    // ===== STATE หลักจาก API =====
    const discoveryMain = ref({
      title: { th: '', en: '' },
      detail: { th: '', en: '' }
    });

    const discoveryItems = ref([]); // array ของ sub-data

    // ===== COMPUTED สำหรับ template =====
    const title = computed(() => {
      const lang = language.value;
      return discoveryMain.value?.title?.[lang] || '';
    });

    const detail = computed(() => {
      const lang = language.value;
      const raw = discoveryMain.value?.detail?.[lang] || '';
      return raw.replace(/\r\n/g, '<br class="lg:block hidden"/>');
    });

    const font = computed(() => (language.value === 'en' ? "font-['SinghaEstate']" : ''));

    const slideImg = computed(() =>
      discoveryItems.value.map((item) => {
        const lang = language.value;
        const link =
          typeof item.link === 'string'
            ? item.link
            : item.link?.[lang] || item.link?.th || item.link?.en || '#';

        return {
          link,
          image: {
            l: resolveImageUrl(item.image_l || item.image?.l),
            s: resolveImageUrl(item.image_s || item.image?.s)
          },
          name: item.name,
          location: item.location
        };
      })
    );

    const slideDetail = computed(() =>
      discoveryItems.value.map((item) => {
        const lang = language.value;
        const link =
          typeof item.link === 'string'
            ? item.link
            : item.link?.[lang] || item.link?.th || item.link?.en || '#';

        return {
          link,
          name: item.name,
          location: item.location,
          detail: item.detail
        };
      })
    );

    // ===== INIT SWIPER + AOS =====
    const initSwiper = () => {
      if (window.AOS) {
        AOS.init();
      }

      if (!window.Swiper) return;

      const main = new Swiper("#DiscoveryComponent .collection-slide", {
        pagination: { el: "#DiscoveryComponent .hero-progress-bar", type: "progressbar" },
        navigation: {
          nextEl: "#DiscoveryComponent .next",
          prevEl: "#DiscoveryComponent .prev"
        }
      });

      const detailSw = new Swiper("#DiscoveryComponent .collection-detail-slide", {
        effect: "fade"
      });

      main.controller.control = detailSw;
      detailSw.controller.control = main;

      const pageNumberEl = document.querySelector("#DiscoveryComponent .page-number");
      const updateFraction = () => {
        if (!pageNumberEl) return;
        const total = main.slides.length || 1;
        const current = main.realIndex + 1;
        pageNumberEl.textContent = `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
      };

      main.on('slideChange', updateFraction);
      main.on('afterInit', updateFraction);
      updateFraction();
    };

    // ===== FETCH API =====
    const fetchDiscovery = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/home/discovery`);
        const dataArr = res.data?.data || [];
        const subs = res.data?.['sub-data'] || [];

        if (dataArr.length) {
          discoveryMain.value = dataArr[0];
        }

        if (subs.length) {
          const sorted = subs
            .slice()
            .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));

          discoveryItems.value = sorted.map((s) => ({
            name: {
              th: s.brands || '',
              en: s.brands || ''
            },
            location: s.location || { th: '', en: '' },
            detail: s.detail || '',
            link: s.link || { th: '#', en: '#' },
            image_l: s.image_l || '',
            image_s: s.image_s || ''
          }));
        }
      } catch (e) {
        console.error('Failed to load discovery data', e);
      }
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      await fetchDiscovery();
      nextTick(initSwiper);
    });

    /* ===== DEFAULT / STATIC VERSION เดิม (COMMENT ไว้เป็นตัวอย่าง) =====

    const rawData =
    {
      title: {
        en: "DISCOVERY OUR COLLECTIONS",
        th: "พบกับหลากหลายโครงการคุณภาพ"
      },
      detail: {
        th: `​โครงการที่พักอาศัยจาก สิงห์ เอสเตท มอบความหลากหลายให้คุณ ด้วยบ้านเดี่ยว ไพรเวทเอสเตท โฮมออฟฟิศ และคอนโดมิเนียม <br class="lg:block hidden"/>ผ่านความตั้งใจที่จะตอบโจทย์ทุกความต้องการด้วยแบรนด์ที่แตกต่าง ที่สะท้อนเอกลักษณ์ของเจ้าของบ้าน​`,
        en: `Experience in the pinnacle of luxury living with our exclusive collection of properties. Singha Estate offers a curated selection of residences, from exquisite single detached houses, distinguished private estates, home offices, and premier condominiums. Each property is tailored to reflect the unique personality ​`
      },
      items: [
        {
          name: {
            en: "SIRANINN RESIDENCES",
            th: "ศิรนินทร์ เรสซิเดนเซส"
          },
          link: "https://residential2.singhaestate.co.th/th/singlehouse/siraninn/pattanakarn",
          brands: "SIRANINN",
          location: {
            en: "Pattanakarn",
            th: "พัฒนาการ",
          },
          detail: "True Legacy Lives Now",
          image: {
            l: "/assets/image/residential/collection/siraninn 1.webp",
            s: "/assets/image/residential/collection/siraninn.webp"
          }
        },
        {
          name: {
            en: "S'RIN",
            th: "สริน "
          },
          link: \`/\${language.value}/house/detached-house/srin/ratchaphruek-sai1\`,
          brands: "S’RIN",
          location: {
            en: "Ratchaphruek - Sai 1",
            th: "ราชพฤกษ์ - สาย 1"
          },
          detail: "INFINITE LIVING",
          image: {
            l: "/assets/image/residential/collection/Pic01.webp",
            s: "/assets/image/residential/collection/singha-srin-m.webp"
          }
        },
        {
          name: {
            en: "SHAWN",
            th: "ณอน "
          },
          link: \`/\${language.value}/house/detached-house/shawn/panya-indra\`,
          brands: "SHAWN",
          location: {
            en: "Panya Indra",
            th: "ปัญญาอินทรา"
          },
          detail: "Live SHAWN Way",
          image: {
            l: "/assets/image/residential/collection/shawn panya - home-banner.webp",
            s: "/assets/image/residential/collection/002.webp"
          }
        },
        {
          name: {
            en: "SHAWN",
            th: "ณอน "
          },
          link: \`/\${language.value}/house/detached-house/shawn/wongwaen-chatuchot\`,
          brands: "SHAWN",
          location: {
            en: "Wongwaen - Chatuchot",
            th: "วงแหวน - จตุโชติ"
          },
          detail: "Live SHAWN Way",
          image: {
            l: "/assets/image/residential/collection/shawn wongwaen - home-banner.webp",
            s: "/assets/image/residential/collection/singha-shawn-ctc-m.webp"
          }
        },
        {
          name: {
            en: "THE EXTRO",
            th: "ดิ เอ็กซ์โทร"
          },
          link: \`/\${language.value}/condominium/the-extro/phayathai-rangnam\`,
          brands: "extro",
          location: {
            en: "Phayathai - Rangnam",
            th: "พญาไท - รางน้ำ"
          },
          detail: "Living Extra",
          image: {
            l: "/assets/image/residential/collection/extro - home-banner.webp",
            s: "/assets/image/residential/collection/extro.webp"
          }
        }
      ]
    };

    // ถ้าจะกลับมาใช้ static:
    // discoveryMain.value = rawData;
    // discoveryItems.value = rawData.items;

    ===== END DEFAULT / STATIC VERSION ===== */

    return {
      language,
      title,
      detail,
      font,
      slideImg,
      slideDetail
    };
  }
});
