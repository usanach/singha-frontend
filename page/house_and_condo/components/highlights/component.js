const ProjectsHighlightComponent = defineComponent({
  name: 'ProjectsHighlightComponent',
  template: `
      <section
        class="onview -mt-1 font-['IBM_Plex_Sans_Thai']"
        id="ProjectsHighlightComponent"
        :data-section="highlightType === 'house' ? 'house_projects' : 'condominium_projects'"
      >
        <!-- HOUSE TEMPLATE -->
        <template v-if="highlightType === 'house'">
          <div
            class="bg-cover bg-bottom"
            style="background-image: url('/assets/image/page-house/house-project-bg.webp');"
          >
            <div class="container lg:px-5 px-0">
              <div
                class="grid md:grid-cols-3 grid-cols-1 md:grid-rows-3 grid-rows-5 md:gap-8 gap-6 lg:px-4 px-0 md:py-20 py-5 md:max-h-[930px] max-h-[2000px]"
              >
                <!-- Heading -->
                <div class="md:p-4 p-10 md:pt-4 pt-5 text-left z-10">
                  <h2 class="md:text-[60px] text-[32px] text-nowrap leading-none text-white font-[400]">
                    <span v-html="data.heading[language]"></span>
                  </h2>
                </div>

                <!-- Small Image (center big block) -->
                <div
                  class="md:col-start-2 col-start-1 md:col-span-2 md:row-start-1 row-start-2 row-span-2 bg-center bg-cover md:mt-0 drop-shadow-xl md:ml-0 ml-10 -mt-20"
                  :style="{ backgroundImage: 'url(' + data.images.s + ')' }"
                ></div>

                <!-- Large Image (left block) -->
                <div
                  class="col-start-1 md:row-start-2 row-start-4 md:row-span-2 row-span-1 flex md:col-span-1 md:pl-0 pl-5"
                >
                  <div
                    class="bg-cover bg-center lg:w-[350px] md:h-[380px] w-[270px] h-full mt-auto md:ml-auto drop-shadow-xl"
                    :style="{ backgroundImage: 'url(' + data.images.l + ')' }"
                  ></div>
                </div>

                <!-- Description -->
                <div class="md:col-start-2 md:col-span-2 md:row-start-3 row-start-5 px-5">
                  <p class="text-white lg:w-3/5 font-normal" v-html="data.description[language]"></p>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- CONDO TEMPLATE -->
        <template v-else>
          <div
            class="bg-cover bg-top"
            style="background-image: url('/assets/image/page-condo/project/bg.webp');"
          >
            <div class="container lg:px-5 px-0">
              <div
                class="grid md:grid-cols-3 grid-cols-1 md:grid-rows-3 grid-rows-6 md:gap-8 gap-6 lg:px-4 px-0 md:py-20 py-5 md:max-h-[1024px] max-h-[2000px] lg:w-[90%] lg:ml-auto"
              >
                <!-- Dynamic Heading -->
                <div class="md:p-4 p-10 md:pt-4 pt-5 text-left z-10">
                  <h2
                    class="md:text-[60px] text-[32px] text-nowrap leading-none text-white font-[400]"
                    :class="[fontCss()]"
                  >
                    <span v-html="data.heading[language]"></span>
                  </h2>
                </div>

                <!-- Dynamic Image (Small) -->
                <div
                  class="md:col-start-2 md:col-span-2 -mt-26 md:row-start-1 row-start-2 row-span-2 bg-center bg-cover md:mt-0 drop-shadow-xl max-w-[500px] lg:ml-20 md:mx-0 mx-5"
                  :style="{ backgroundImage: 'url(' + data.images.s + ')' }"
                  :class="[language=='th' ? '-mt-[7.5rem]':'-mt-28']"
                ></div>

                <!-- Dynamic Image (Large) -->
                <div class="md:ml-0 ml-auto md:row-start-2 row-start-4 md:row-span-2 row-span-2 flex md:col-span-1">
                  <div
                    class="bg-center lg:w-[350px] md:h-[380px] w-[270px] h-full mt-auto md:ml-auto drop-shadow-xl lg:translate-x-40"
                    :style="{ backgroundImage: 'url(' + data.images.l + ')' }"
                  ></div>
                </div>

                <!-- Dynamic Paragraph -->
                <div class="md:col-start-2 md:col-span-2 md:row-start-3 row-start-6 lg:ml-40 md:px-0 px-5">
                  <p class="lg:w-3/5 font-normal" v-html="data.description[language]"></p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </section>
    `,
  setup() {
    const language = ref('th'); // Default language
    const apiBaseUrl = window.APP_CONFIG?.apiBaseUrl || '';
    const storageUrl = window.APP_CONFIG?.storageUrl || '';

    const highlightType = ref('condo'); // 'condo' | 'house'

    // default data (fallback)
    const data = ref({
      heading: {
        en: "Condominium<br/> projects from <br/>Singha Estate",
        th: "โครงการคอนโดมิเนียม<br/>จากสิงห์ เอสเตท"
      },
      description: {
        en: `Enjoy urban life with our premium condominiums, centrally located in the heart of Bangkok. Easy connectivity to the city’s best wherever your destination is via private car, mass transit, or expressway. Our residences offer the future of living with modern amenities and innovative technology. Experience the vibrant city life, redefined.`,
        th: `ค้นพบวิถีคนเมือง ในคอนโดมิเนียมหรู บนทำเลศักยภาพใจกลางเมือง ไม่พลาดกับไลฟ์สไตล์ และความเพลิดเพลิน บริหารเวลาได้ดีกับการเดินทางด้วยรถไฟฟ้า หรืออิสระกับการเดินทางด้วยรถยนต์ส่วนตัว เชื่อมต่อคุณกับจุดหมายปลายทางได้อย่างราบรื่นและรวดเร็ว รองรับการชีวิตเมืองด้วยเทคโนโลยีเพื่อการอยู่อาศัย เพื่อมอบประสบการณ์อยู่อาศัยที่สมบูรณ์`
      },
      images: {
        s: "/assets/image/page-condo/project/234-Edit-Edit-Edit.webp",
        l: "/assets/image/page-condo/project/2.webp"
      }
    });

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const detectHighlightTypeFromPath = () => {
      const path = window.location.pathname.toLowerCase();

      if (path.includes('/house')) {
        return 'house';
      }
      if (path.includes('/condominium') || path.includes('/condo')) {
        return 'condo';
      }

      return 'condo';
    };

    const loadHighlightFromApi = async () => {
      try {
        if (!apiBaseUrl) {
          console.error('APP_CONFIG หรือ apiBaseUrl ไม่มีค่า');
          return;
        }

        const type = highlightType.value || detectHighlightTypeFromPath();

        const endpoint =
          type === 'house'
            ? `${apiBaseUrl}/house-highlight`
            : `${apiBaseUrl}/condo-highlight`;

        const folder =
          type === 'house'
            ? 'uploads/house_highlight'
            : 'uploads/condo_highlight';

        console.log('Highlight type:', type, 'Endpoint:', endpoint);

        const res = await axios.get(endpoint);
        const items = (res.data && res.data.data) || [];
        if (!items.length) return;

        const item = items[0];

        const headingTh = (item.heading_th || '').replace(/\r\n|\n/g, '<br/>');
        const headingEn = (item.heading_en || '').replace(/\r\n|\n/g, '<br/>');

        const descTh = item.description_th || '';
        const descEn = item.description_en || '';

        data.value = {
          heading: {
            th: headingTh,
            en: headingEn
          },
          description: {
            th: descTh,
            en: descEn
          },
          images: {
            l: item.images_l ? `${storageUrl}${folder}/${item.images_l}` : '',
            s: item.images_s ? `${storageUrl}${folder}/${item.images_s}` : ''
          }
        };
      } catch (e) {
        console.error('Failed to load highlight:', e);
      }
    };

    const init = () => {
      AOS.init();
    };

    const fontCss = () => {
      return getLanguageFromPath() === "en" ? "" : "";
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      highlightType.value = detectHighlightTypeFromPath();

      await loadHighlightFromApi();

      nextTick(() => {
        init();
      });
    });

    return { language, data, fontCss, highlightType };
  }
});
