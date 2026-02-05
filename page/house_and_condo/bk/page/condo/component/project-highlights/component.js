const ProjectsHighlightComponent = defineComponent({
  name: 'ProjectsHighlightComponent',
  template: `
      <section class="onview -mt-1" id="ProjectsHighlightComponent" data-section="condominium_projects">
        <div class="bg-[url('/assets/image/page-condo/project/bg.webp')] bg-cover bg-top">
          <div class="container lg:px-5 px-0">
            <div class="grid md:grid-cols-3 grid-cols-1 md:grid-rows-3 grid-rows-6 md:gap-8 gap-6 lg:px-4 px-0 md:py-20 py-5 md:max-h-[1024px] max-h-[2000px] lg:w-[90%] lg:ml-auto">
              <!-- Dynamic Heading -->
              <div class="md:p-4 p-10 md:pt-4 pt-5 text-left z-10">
                <h2
                  class="md:text-[60px] text-[32px] text-nowrap leading-none text-white font-[400] font-['IBM_Plex_Sans_Thai']"
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
                <p class="lg:w-3/5 font-normal font-['IBM_Plex_Sans_Thai']" v-html="data.description[language]"></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
  setup() {
    const language = ref('th'); // Default language
    const apiBaseUrl = window.APP_CONFIG?.apiBaseUrl || '';
    const storageUrl = window.APP_CONFIG?.storageUrl || '';

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

    // Function to extract language from the URL
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const loadHighlightFromApi = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/condo-highlight`);
        const items = (res.data && res.data.data) || [];
        if (!items.length) return;

        // ใช้ตัวแรก (ตอนนี้ API ส่งมา 1 ตัว)
        const item = items[0];

        // แปลง \r\n ใน heading เป็น <br/>
        const headingTh = (item.heading_th || '').replace(/\r\n|\n/g, '<br/>');
        const headingEn = (item.heading_en || '').replace(/\r\n|\n/g, '<br/>');

        // description ใช้ plain text (ถ้าอยากใส่ <br/> ก็ทำแบบเดียวกัน)
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
            // 🔥 ปรับโฟลเดอร์ให้ตรงกับที่ backend เซฟจริง ถ้าไม่ใช่ condo_highlight แค่แก้ชื่อโฟลเดอร์ตรงนี้
            l: item.images_s ? `${storageUrl}uploads/condo_highlight/${item.images_s}` : '',
            s: item.images_l ? `${storageUrl}uploads/condo_highlight/${item.images_l}` : ''
          }
        };
      } catch (e) {
        console.error('Failed to load condo-highlight:', e);
        // ถ้า error จะใช้ default data ที่ set ไว้ข้างบน
      }
    };

    const init = () => {
      AOS.init();
    };

    const fontCss = () => {
      // ถ้าอยากเปลี่ยน font class ตามภาษา ก็เพิ่ม logic ได้ตรงนี้
      return getLanguageFromPath() === "en" ? "" : "";
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      await loadHighlightFromApi();

      nextTick(() => {
        init();  // Initialize scroll-triggered animations after DOM update
      });
    });

    return { language, data, fontCss };
  }
});
