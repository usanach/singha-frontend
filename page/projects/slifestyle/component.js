// ✅ เพิ่ม import นี้ (ปรับ path ให้ตรงโปรเจกต์คุณ)
const LifeStyleComponent = defineComponent({
  name: 'LifeStyleComponent',
  template: `
      <section
        v-if="isDisabled"
        id="s_lifestyle"
        data-section="s_lifestyle"
        class="font-['IBM_Plex_Sans_Thai'] life-style-component py-10 min-h-[800px] relative flex bg-center bg-cover onview"
      >
        <!-- Video Background -->
        <div class="absolute inset-0 lg:max-h-none max-h-[1150px]">
          <video autoplay loop muted playsinline class="w-full h-full object-cover">
            <source
              v-if="bgVideoUrl"
              :src="bgVideoUrl"
              type="video/mp4"
            >
            <source
              v-else
              src="/assets/image/santiburi-page/lifestyle/shutterstock_1107814249.mp4"
              type="video/mp4"
            >
            Your browser does not support the video tag.
          </video>
        </div>

        <div
          class="absolute top-0 left-0 w-full h-full bg-[position:center_80dvh] bg-no-repeat bg-cover"
          :class="{filterCss}"
          :style="{ backgroundImage: 'url(/assets/image/santiburi-page/bg-lifestyle.png)' }"
        ></div>
  
        <!-- Main Container -->
        <div
          class="container relative my-auto"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="linear"
        >
          <div class="flex flex-col gap-10">

            <!-- Header Section -->
            <div>
              <h2
                class="text-[35px] uppercase font-bold text-center text-white"
                :style="{ fontFamily: fonts,color:mainFontColor }"
              >
                {{ datasets.title[language] }}
              </h2>
              <p class="text-center text-white text-[20px] mt-3" :style="{ color:mainFontColor }">
                {{ datasets.s_life_detail[language] }}
              </p>
            </div>
  
            <!-- Distinctive Location Section -->
            <div class="flex gap-5 lg:flex-row  justify-center flex-col lg:mt-5 mt-2">
              <div class="lg:w-2/6 w-full space-y-3">
                <p
                  class="text-[22px] font-bold uppercase text-white"
                  :style="{ fontFamily: fonts,color:mainFontColor  }"

                >
                  {{ datasets.distinctive_location_title[language] }}
                </p>
                <p class="text-white font-normal":style="{ color:mainFontColor }">
                  {{ datasets.distinctive_location[language] }}
                </p>
              </div>

              <div class="flex lg:gap-20 mx-auto lg:flex-nowrap flex-wrap justify-center">
                <div
                  class="lg:w-fit lg:mt-0 mt-5 w-1/2"
                  v-for="(item, index) in datasets.distinctive_location_meters"
                  :key="index"
                >
                  <div class="flex justify-center space-x-2">
                    <p class="font-thin text-[70px] text-white leading-none text-center":style="{ color:mainFontColor }">
                      {{ item.text[language] }}
                    </p>
                    <p class="text-white text-center leading-none font-normal mt-auto mb-2":style="{ color:mainFontColor }">
                      {{ item.unit[language] }}
                    </p>
                  </div>  
                  <p
                    class="text-white text-center leading-none font-normal text-nowrap":style="{ color:mainFontColor }"
                    v-html="item.details[language]"
                  ></p>
                </div>
              </div>
            </div>
  
            <!-- Dynamic Information Groups Section -->
            <div class="flex lg:gap-5 gap-2 mt-5 lg:flex-row flex-col justify-center">
              <div
                v-for="(group, groupIndex) in visibleInformation"
                :key="group.key || groupIndex"
                :class="[
                  groupIndex > 0 ? (expand ? '' : 'hidden lg:block') : '',
                  'space-y-3 lg:w-1/4 w-full pb-5 lg:p-5',
                  groupIndex > 0 ? 'border-t lg:border-t-0 lg:border-l border-[#F7F7F7] pt-5 lg:pl-5' : 'lg:pl-0'
                ]"
                :style="{borderColor:mainFontColor}"
              >
                <!-- icon -->
                <div class="h-[40px] w-[40px]" v-if="group.icon">
                  <img class="w-full h-full" :src="group.icon" :alt="group.title[language]">
                </div>

                <div>
                  <p class="text-[22px] font-medium uppercase text-white":style="{ color:mainFontColor }">
                    {{ group.title[language] }}
                  </p>
                </div>

                <div>
                  <ul>
                    <li
                      class="group flex justify-between text-white last:border-0"
                      :style="{ color:mainFontColor }"
                      v-for="(item, itemIndex) in group.item"
                      :key="itemIndex"
                    >
                      <div
                        class="lg:max-w-[250px] font-normal group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words"
                        v-html="item.name[language]"
                      ></div>
                      <div
                        class="text-right group-hover:opacity-25 transition-all text-nowrap font-normal"
                      >
                        {{ item.detail[language] }}
                      </div>
                    </li>
                  </ul>
                </div>
              <div>
            </div>

            <!-- Button Show More สำหรับ Mobile -->
            <div class="relative lg:hidden block w-full">
              <button 
                type="button"
                id="expand-div"
                class="px-5 text-center w-full border border-1 border-white py-3 text-white text-[18px]"
                :class="{ hidden: expand }"
                @click="showMore"
              >
                <p>{{ viewMore[language] }}</p>
                <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13.114" height="7.498" viewBox="0 0 13.114 7.498">
                    <path d="M12.747,16.484l4.958-4.962a.933.933,0,0,1,1.324,0,.945.945,0,0,1,0,1.327L13.41,18.471a.935.935,0,0,1-1.292.027L6.461,12.853a.937.937,0,0,1,1.324-1.327Z" fill="#fff"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    `,
  setup() {
    const expand   = ref(false);
    const language = ref('th');
    const fonts    = ref('');
    const viewMore = ref({ th: 'อ่านเพิ่มเติม', en: 'View more' });

    const isDisabled = ref(false);
    const bgVideoUrl = ref('');

    const mainFontColor = ref('#fff');
    const filterCss =ref('bg-black/30')

    const information = ref([
      { key:'travel',   title:{en:"TRANSPORTATION",th:"การเดินทาง"}, icon:"/assets/icon/trans.webp",      item:[] },
      { key:'mall',     title:{en:"SURROUNDING AMENITIES",th:"คอมมูนิตี้มอลล์ และ ไลฟ์สไตล์"}, icon:"/assets/icon/market.webp", item:[] },
      { key:'hospital', title:{en:"HOSPITAL",th:"โรงพยาบาล"}, icon:"/assets/icon/hostpital.webp", item:[] },
      { key:'education',title:{en:"EDUCATION",th:"สถานศึกษา"}, icon:"/assets/icon/education.webp", item:[] },
    ]);

    const checkMainColorByUrl = () => {
      const path = window.location.pathname;

      // if (path.includes('/house/detached-house/shawn/panya-indra')) {
      //   mainFontColor.value = '#4A1923';
      // }

      if (path.includes('/house/detached-house/shawn/panya-indra')) {
        // fonts.value = language.value === 'th' ? "Gotham" : "Gotham";
      }else if (path.includes('/house/detached-house/shawn/wongwaen-chatuchot')) {
        mainFontColor.value = '#564B40';
        filterCss.value="bg-white/30"
      }
    };
    const datasets = ref({
      title: { th: 'S LIFESTYLE', en: 'S LIFESTYLE' },
      s_life_detail: {
        th: "บ้านเดี่ยวที่มอบชีวิตที่ลงตัว ตอบโจทย์ทุกไลฟ์สไตล์ทุกช่วงเวลาของคุณ บนทำเลศักยภาพ",
        en: "A single-family home that offers the highest level of privacy, providing ultimate tranquility and warmth in the most natural setting possible.​"
      },
      distinctive_location: {
        th: "ตั้งอยู่บนพื้นที่สีเขียวขนาดใหญ่กว่า 45 ไร่ ติดถนนประดิษฐ์มนูธรรม ย่านน่าอยู่ใกล้ใจกลางเมือง เดินทางสะดวก ใกล้จุดขึ้นลงทางด่วน รายล้อมด้วยแหล่งไลฟ์สไตล์ ห้างสรรพสินค้า ร้านอาหารและโรงเรียนชื่อดัง​",
        en: "Located on over 45 Rai of premium land along Pradit Manutham Road, this neighborhood seamlessly blends urban convenience with serene living. Its prime location offers easy access to the city center and major expressways, along with a wealth of lifestyle amenities, including dining, shopping and renowned educational institutions.​​"
      },
      distinctive_location_meters: [
        { text:{en:"1",th:"1"}, unit:{en:"km.",th:"กม."}, details:{en:"Expressway (Toll Gate) <br/>Ramintra", th:"ทางด่วน <br/>ด่านรามอินทรา"} },
        { text:{en:"1",th:"1"}, unit:{en:"km.",th:"กม."}, details:{en:"THE WALK <br/>Kaset-nawamin", th:"เดอะวอล์ค <br/>เกษตร-นวมินทร์"} },
        { text:{en:"3",th:"3"}, unit:{en:"km.",th:"กม."}, details:{en:"Navavej <br/>International Hospital", th:"โรงพยาบาล<br/>นวเวช"} },
        { text:{en:"3",th:"3"}, unit:{en:"km.",th:"กม."}, details:{en:"KPIS <br/>International School", th:"โรงเรียนนานาชาติ<br/>กีรพัฒน์"} },
      ]
    });


    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const showMore = () => { expand.value = true; };

    const fontFamInit = () => {
      const path = window.location.pathname;

      fonts.value = language.value === 'th' ? "DB Heavent" : "Gotham";
      if (path.includes('/house/detached-house/shawn/panya-indra')) {
        fonts.value = language.value === 'th' ? "Gotham" : "Gotham";
      }else if (path.includes('/house/detached-house/shawn/wongwaen-chatuchot')) {
        fonts.value = language.value === 'th' ? "Gotham" : "Gotham";
      }
      
    };

    const parseDistanceValue = (distance) => {
      if (!distance) return { value: '', unitTh: '', unitEn: '' };

      const match = String(distance).match(/([\d\.]+)/);
      const num = match ? match[1] : '';
      const lower = String(distance).toLowerCase();

      let unitTh = '';
      let unitEn = '';
      if (lower.includes('กม') || lower.includes('km')) {
        unitTh = 'กม.';
        unitEn = 'km.';
      } else if (lower.includes('m')) {
        unitTh = 'ม.';
        unitEn = 'm.';
      }

      return { value: num, unitTh, unitEn };
    };

    // ✅ ยังใช้ต่อได้ เพราะเป็น URL ไฟล์ (ไม่ใช่ API call)
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl || 'http://127.0.0.1:8000/storage/';

    // ✅ ใช้ฟังก์ชันจาก api.js แทน axios.get ตรงๆ
    const findProjectIdFromSeo = async () => {
      // const path = window.location.pathname;
      // const lang = language.value;

      // const res = await getProjectSeo();
      // const rows = Array.isArray(res.data?.data) ? res.data.data : [];

      // const enabledRows = rows.filter(r => (r.seo_disabled ?? 0) != 1);
      // const field = lang === 'en' ? 'seo_url_en' : 'seo_url_th';

      // const matched = enabledRows.find(row => row[field] === path);
      return projectIDs || null;
    };

    // ✅ ใช้ฟังก์ชันจาก api.js แทน axios.get ตรงๆ
    const fetchLifestyle = async () => {
      try {
        const projectId = await findProjectIdFromSeo();
        if (!projectId) return;

        const res = await getProjectLifestyle(projectId);
          console.log(projectId);

        const payload   = res.data || {};
        const main      = payload.data || null;
        const travel    = Array.isArray(payload.travel)    ? payload.travel    : [];
        const hospital  = Array.isArray(payload.hospital)  ? payload.hospital  : [];
        const mall      = Array.isArray(payload.mall)      ? payload.mall      : [];
        const education = Array.isArray(payload.education) ? payload.education : [];

        if (main) {
          datasets.value.title.th = main.lifestyle_title_th || datasets.value.title.th;
          datasets.value.title.en = main.lifestyle_title_en || datasets.value.title.en;

          datasets.value.s_life_detail.th =
            main.lifestyle_detail_th || datasets.value.s_life_detail.th;
          datasets.value.s_life_detail.en =
            main.lifestyle_detail_en || datasets.value.s_life_detail.en;

          datasets.value.distinctive_location_title = {
            th: main.lifestyle_subtitle_title_th || 'Distinctive Location',
            en: main.lifestyle_subtitle_title_en || 'Distinctive Location'
          };

          datasets.value.distinctive_location.th =
            main.lifestyle_subtitle_detail_th || datasets.value.distinctive_location.th;
          datasets.value.distinctive_location.en =
            main.lifestyle_subtitle_detail_en || datasets.value.distinctive_location.en;

          // ⚠️ API ใหม่ = lifestyle_disabled (1 = แสดง, 0 = ซ่อน)
          isDisabled.value = Number(main.lifestyle_disabled) === 1;

          if (main.lifestyle_bg_video) {
            bgVideoUrl.value =
              `${STORAGE_BASE}uploads/project_lifestyle/${main.lifestyle_bg_video}`;
          }
          
        }


        const mapList = (list) =>
          list.map(row => ({
            name: {
              th: row.place?.th || '',
              en: row.place?.en || row.place?.th || ''
            },
            detail: {
              th: row.distance?.th || '',
              en: row.distance?.en || row.distance?.th || ''
            }
          }));

        information.value = [
          { key:'travel',    title:{en:"TRANSPORTATION",th:"การเดินทาง"}, icon:"/assets/icon/trans.webp",      item: mapList(travel) },
          { key:'mall',      title:{en:"SURROUNDING AMENITIES",th:"คอมมูนิตี้มอลล์ และ ไลฟ์สไตล์"}, icon:"/assets/icon/market.webp", item: mapList(mall) },
          { key:'hospital',  title:{en:"HOSPITAL",th:"โรงพยาบาล"}, icon:"/assets/icon/hostpital.webp", item: mapList(hospital) },
          { key:'education', title:{en:"EDUCATION",th:"สถานศึกษา"}, icon:"/assets/icon/education.webp", item: mapList(education) },
        ];

        const highlights = [];
        const addHighlightFromList = (list) => {
          if (!list.length) return;
          const first = list[0];
          const rawDistanceTh = first.distance?.th || '';
          const parsed = parseDistanceValue(rawDistanceTh);
          if (!parsed.value) return;

          highlights.push({
            text: { th: parsed.value, en: parsed.value },
            unit: { th: parsed.unitTh || '', en: parsed.unitEn || '' },
            details: {
              th: first.place?.th || '',
              en: first.place?.en || first.place?.th || ''
            }
          });
        };

        addHighlightFromList(travel);
        addHighlightFromList(mall);
        addHighlightFromList(hospital);
        addHighlightFromList(education);

        if (highlights.length) {
          datasets.value.distinctive_location_meters = highlights;
        }
      } catch (err) {
        console.error('Error loading lifestyle:', err);
      }
    };

    // ✅ ซ่อนกลุ่มที่ไม่มี item
    const visibleInformation = computed(() =>
      information.value.filter(group => Array.isArray(group.item) && group.item.length > 0)
    );

    onMounted(async () => {
      language.value = getLanguageFromPath();
      checkMainColorByUrl(); // 👈 เพิ่มบรรทัดนี้
      fontFamInit();
      await fetchLifestyle();
      
      if (path.includes('/house/detached-house/shawn/wongwaen-chatuchot')) {
        information.value =[
          { key:'travel',   title:{en:"TRANSPORTATION",th:"การเดินทาง"}, icon:"/assets/image/page-shawn-panya/life/trans.webp",      item:[] },
          { key:'mall',     title:{en:"SURROUNDING AMENITIES",th:"คอมมูนิตี้มอลล์ และ ไลฟ์สไตล์"}, icon:"/assets/image/page-shawn-panya/life/market.webp", item:[] },
          { key:'hospital', title:{en:"HOSPITAL",th:"โรงพยาบาล"}, icon:"/assets/image/page-shawn-panya/life/hostpital.webp", item:[] },
          { key:'education',title:{en:"EDUCATION",th:"สถานศึกษา"}, icon:"/assets/image/page-shawn-panya/life/education.webp", item:[] },
        ]
      }
    });

    return {
      expand,
      showMore,
      language,
      datasets,
      fonts,
      mainFontColor,
      information,
      viewMore,
      isDisabled,
      bgVideoUrl,
      visibleInformation,
      filterCss
    };
  }
});
