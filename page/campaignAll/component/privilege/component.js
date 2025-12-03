// Define the FilterComponent
const FilterComponent = {
  name: 'FilterComponent',

  data() {
    const language = this.getLanguageFromPath();
    return {
      language,
      title: language === 'en'
        ? "ALL privileges and promotions"
        : "รวมสิทธิพิเศษเฉพาะคุณ​",
      expandBtn: language === 'en'
        ? "Explore more"
        : "ดูเพิ่มเติม​",
      font: language === 'en' ? "font-['SinghaEstate']" : "",
      cards: [],
      cardNum: 4,
    };
  },

  methods: {
    getLanguageFromPath() {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    },

    // ใช้ชื่อ brand EN เป็น key หา theme
    getBorderColor(theme) {
      const themeColors = {
        "SANTIBURI THE RESIDENCES": "bg-[#712135]",
        "LA SOIE de S": "bg-[#bc9e68]",
        "SMYTH'S ": "bg-[#945E4D]",
        "SIRANINN RESIDENCES": "bg-[#b49a81]",
        "S'RIN": "bg-[#003b5E]",
        "SHAWN": "bg-[#5c4580]",
        "SENTRE": "bg-[#7F8372]",
        "THE ESSE": "bg-[#182A45]",
        "THE EXTRO": "bg-[#bf6c29]"
      };
      return themeColors[theme] || "";
    },

    makeImageUrl(storageBase, fileName) {
      if (!fileName) return '';
      let n = String(fileName).trim().replace(/^\/+/, '');
      // ถ้าเป็น URL เต็ม
      if (/^https?:\/\//i.test(n)) return n;
      // ถ้าไม่ขึ้นต้นด้วย uploads/ ให้ต่อ path มาตรฐาน
      if (!n.startsWith('uploads/')) {
        n = 'uploads/promotion_item_data/' + n;
      }
      return storageBase.replace(/\/$/, '/') + n;
    },

    async loadData() {
      try {
        const lang = this.language;

        const cfg     = window.APP_CONFIG || {};
        const baseUrl = (cfg.apiBaseUrl || 'http://127.0.0.1:8000/api').replace(/\/$/, '');
        const storage = cfg.storageUrl || '/storage/';

        const promoEndpoint   = `${baseUrl}/promotion`;
        const projectEndpoint = `${baseUrl}/global/project-location`;

        // ดึง promotion + project-location พร้อมกัน
        const [promoRes, projectRes] = await Promise.all([
          axios.get(promoEndpoint),
          axios.get(projectEndpoint),
        ]);

        const apiData      = promoRes.data || {};
        const projectData  = projectRes.data || {};
        const subData      = Array.isArray(apiData['sub-data'])  ? apiData['sub-data']  : [];
        const subData2     = Array.isArray(apiData['sub-data2']) ? apiData['sub-data2'] : [];
        const projectList  = Array.isArray(projectData.data)     ? projectData.data     : [];

        // map project-location ตาม id
        const projectById = {};
        projectList.forEach(p => {
          if (p.id != null) {
            projectById[p.id] = p;
          }
        });

        // map sub-data2 (lv2, lv3) ตาม promotion_item_data_id (เผื่อใช้ fallback location)
        const locMap = {};
        subData2.forEach(row => {
          const id = row.promotion_item_data_id;
          if (!locMap[id]) locMap[id] = [];
          locMap[id].push(row);
        });

        const today = new Date().toISOString().slice(0, 10);

        // filter ตามวันที่ก่อน
        let visibleList = subData.filter(item => {
          if (!item.date_start || !item.date_end) return true;
          return item.date_start <= today && today <= item.date_end;
        });

        // ถ้าไม่มี active เลย แสดงทั้งหมด
        if (!visibleList.length) {
          visibleList = subData;
        }

        // sort ตาม sort_order
        visibleList.sort((a, b) => {
          const sa = a.sort_order ?? 999;
          const sb = b.sort_order ?? 999;
          return sa - sb;
        });

        const initialCount = Math.min(this.cardNum, visibleList.length);

        this.cards = visibleList.map((item, i) => {
          // ---------- รูปการ์ด: image_1 ----------
          const imgName = item.image_1 || '';
          const img     = this.makeImageUrl(storage, imgName);

          // ---------- หาว่า promo นี้ map กับ project-location ไหน ----------
          let locProject = null;
          if (item.project_items) {
            try {
              const pj = JSON.parse(item.project_items);
              if (Array.isArray(pj) && pj.length) {
                // หา location_id ตัวแรกที่มี
                const found = pj.find(x => x.location_id != null);
                if (found && projectById[found.location_id]) {
                  locProject = projectById[found.location_id];
                }
              }
            } catch (e) {
              console.warn('parse project_items error:', e);
            }
          }

          // ---------- ชื่อโปรโมชั่น ----------
          const card = {
            th:item.card_title_th,
            en:item.card_title_th,
          }
          const dataTitle = card || {};
          const title     = dataTitle[lang] || dataTitle.th || dataTitle.en || '';

          // ---------- location ----------
          let location = '';
          if (locProject) {
            // ใช้ field location จาก project-location
            location =
              (locProject.location && locProject.location[lang]) ||
              (locProject.location && (locProject.location.th || locProject.location.en)) ||
              '';
          } else {
            // fallback: ใช้ sub-data2.lv3 หรือ single_location_*
            const locRows = locMap[item.id] || [];
            if (locRows.length) {
              location = locRows[0].lv3 || '';
            } else {
              location = lang === 'en'
                ? (item.single_location_en || item.single_location_th || '')
                : (item.single_location_th || item.single_location_en || '');
            }
          }

          // ---------- ราคา: ดึงจาก project-location ----------
          let price = '';
          if (locProject && locProject.price) {
            price =
              locProject.price[lang] ||
              locProject.price.th ||
              locProject.price.en ||
              '';
          }
          // ถ้ายังไม่มีจริง ๆ ค่อย fallback (optionally)
          if (!price) {
            price = item[`data_concept_${lang}`] || item.data_concept || '';
          }

          // ---------- brand / type (ใช้สำหรับ border + tracking) ----------
          let brandTh = '';
          let brandEn = '';

          if (item.promotion_mode === 'single') {
            brandTh = item.single_brand_th || '';
            brandEn = item.single_brand_en || '';
          } else if (item.project_items) {
            try {
              const pj = JSON.parse(item.project_items);
              if (Array.isArray(pj) && pj.length) {
                brandTh = pj[0].brand_th || '';
                brandEn = pj[0].brand_en || '';
              }
            } catch (e) {
              // ignore
            }
          }

          const themeName = brandEn || brandTh || '';
          const border    = this.getBorderColor(themeName);

          // ---------- link ----------
          const link = item[`data_url_${lang}`] || item.data_url_th || item.data_url_en || '#';

          // ---------- promotion name สำหรับ tracking ----------
          const promotionName =
            (item.data_title && item.data_title[lang]) ||
            item.meta_title ||
            '';

          // ---------- label: ใช้ Promotion / โปรโมชั่น ทุกอัน ----------
          const labelText = lang === 'en' ? 'Promotion' : 'โปรโมชั่น';

          return {
            title,
            location,
            link,
            price,
            img,
            type: themeName,  // ใช้เป็น property_type / property_brand
            label: labelText, // <<< ตามที่ขอ
            border,
            promotionName,
            last: i === visibleList.length - 1,
            show: i < initialCount
          };
        });
      } catch (error) {
        console.error('Failed to load data from /api/promotion or /global/project-location:', error);
      }
    },

    expandMore() {
      this.cardNum += 4;
      this.cards.forEach((c, idx) => {
        if (idx < this.cardNum) c.show = true;
      });
      setDataLayer(propertyLoadMore);
    },

    selectPropertyCard(card) {
      setDataLayer({
        event: propertySelect.event,
        landing_page,
        section: propertySelect.section,
        event_action: propertySelect.event_action,
        promotion_name: card.promotionName,
        property_brand: card.type,
        project_label: card.label.toLowerCase().replace(/ /g, '_'),
        property_type: card.type,
        property_location: card.location,
        property_price: card.price
      });
      window.open(card.link, '_blank');
    }
  },

  mounted() {
    AOS.init();
    this.loadData();
  },

  template: `
    <section
      id="filter"
      class="relative onview md:bg-[url('./../assets/image/story/bg.svg')] bg-[url('./../assets/image/story/bg-m.svg')] bg-no-repeat bg-cover bg-center py-10"
      data-section="related_projects"
    >
      <div class="container py-10">
        <h2
          :class="font + ' text-[#2C2C2C] text-[35px] uppercase text-center'"
          data-aos="fade-up"
        >
          {{ title }}
        </h2>

        <div class="my-10">
          <div class="py-5">
            <div class="mx-auto">
              <div class="my-auto">
                <p class="text-[#797E81] text-[16px]">
                  <span class="text-black">{{ cards.length }}</span>
                  <span class="text-black uppercase" v-html="language=='th'?'แคมเปญ':'campaigns'"></span>
                  (<span>{{ cards.length }}</span>/<span>{{ cards.length }}</span>)
                </p>
              </div>
            </div>
          </div>

          <ul class="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full mx-auto justify-items-center">
            <li
              v-for="(card, index) in cards"
              :key="index"
              v-show="card.show"
              class="relative cursor-pointer card-relate w-full"
              @click="selectPropertyCard(card)"
              data-aos="fade-up"
              :class="card.last ? 'mr-auto' : ''"
            >
              <div
                class="block lg:hidden text-[15px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-5 lg:left-auto left-0 lg:mr-5 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white font-bold text-center"
              >
                {{ card.label }}
              </div>

              <div
                class="w-full md:h-[270px] h-[220px] bg-cover bg-center"
                :style="{ backgroundImage: 'url(' + card.img + ')' }"
              ></div>

              <div class="flex w-full relative -mt-5 bg-white/50 overflow-hidden">
                <div class="bg-white/25 absolute top-0 left-0 w-full h-full backdrop-blur-md"></div>
                <div class="relative w-[11px]" :class="card.border"></div>
                <div class="flex flex-col p-5 lg:py-2 py-2 w-full relative gap-2">
                  <div
                    class="hidden lg:block text-[15px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-2 lg:left-auto left-0 lg:mr-2 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white text-center"
                  >
                    {{ card.label }}
                  </div>

                  <h3>
                    <span class="text-[22px] uppercase font-bold">
                      {{ card.title }}
                    </span><br>
                    <span
                      class="font-normal text-[16[x]] w-3/4"
                      v-html="card.location ? card.location : '<br/>'"
                    ></span>
                  </h3>

                  <div
                    class="mt-3 uppercase text-[#707070] text-[15px]"
                    v-html="card.price=='' ? card.price : '<br/>'"
                  ></div>
                </div>
              </div>
            </li>
          </ul>

          <div class="flex">
            <button
              v-if="cards.length > cardNum"
              @click="expandMore"
              class="btn mt-10 mx-auto"
            >
              {{ expandBtn }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `
};
