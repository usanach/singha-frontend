const RelatedProjectsComponent = defineComponent({
  name: 'RelatedProjectsComponent',
  data() {
    return {
      language: 'th',
      title: '',
      detail: '',
      expandBtn: '',
      font: "",
      cards: [],
      propertyType: [],
      locations: [],
      brands: [],
      filter: {
        property_type: 'all',
        property_location: 'all',
        property_brand: 'all'
      },
      filterNumber: 4,
      cardNum: 4
    };
  },
  computed: {
    filteredCards() {
      return this.cards.filter(card => {
        if (this.filter.property_type !== 'all' && card.type !== this.filter.property_type) return false;
        if (this.filter.property_location !== 'all' && card.location[0] !== this.filter.property_location) return false;
        if (this.filter.property_brand !== 'all' && card.brands !== this.filter.property_brand) return false;
        return true;
      });
    }
  },
  methods: {
    getLanguageFromPath() {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    },
    getBorderColor(theme) {
      const themeColors = {
        "SANTIBURI THE RESIDENCES": "bg-[#712135]",
        "LA SOIE de S": "bg-[#bc9e68]",
        "SMYTH'S": "bg-[#945E4D]",
        "SIRANINN RESIDENCES": "bg-[#b49a81]",
        "S'RIN": "bg-[#003b5E]",
        "SHAWN": "bg-[#5c4580]",
        "SENTRE": "bg-[#7F8372]",
        "THE ESSE": "bg-[#182A45]",
        "THE EXTRO": "bg-[#bf6c29]"
      };
      return themeColors[theme] || "";
    },

    async loadData() {
      // 1) Set language + titles
      this.language = this.getLanguageFromPath();
      if (this.language === 'en') {
        this.title = "Related Projects";
        this.expandBtn = "Explore more";
        this.font = "";
      } else {
        this.title = "โครงการอื่นๆ";
        this.expandBtn = "ดูเพิ่มเติม​";
        this.font = "";
      }

      try {
        const currentPath = window.location.pathname.replace(/\/$/, '');
        const STORAGE_BASE = window.APP_CONFIG?.storageUrl || `${window.location.origin}/storage/`;

        // ------------------------------------------------
        // 2) หา project_id จาก /project/seo
        // ------------------------------------------------
        // const seoRes = await getProjectSeo(); // ✅ ใช้ api.js
        // const seoList = seoRes.data?.data || [];

        // const seoField = this.language === 'en' ? 'seo_url_en' : 'seo_url_th';

        // let seoItem = seoList.find(item => {
        //   if (!item[seoField]) return false;
        //   const seoPath = String(item[seoField]).replace(/\/$/, '');
        //   return seoPath === currentPath;
        // });

        // if (!seoItem) {
        //   seoItem = seoList.find(item => {
        //     const thPath = item.seo_url_th ? String(item.seo_url_th).replace(/\/$/, '') : '';
        //     const enPath = item.seo_url_en ? String(item.seo_url_en).replace(/\/$/, '') : '';
        //     return thPath === currentPath || enPath === currentPath;
        //   });
        // }

        if (!projectIDs) {
          console.warn('SEO record not found for path:', currentPath);
          return;
        }

        const projectId = projectIDs;

        // ------------------------------------------------
        // 3) ดึง related project โดยตรง
        // ------------------------------------------------
        const relatedRes = await getProjectRelated(projectId); // ✅ api.js
        const relatedData = relatedRes.data?.data?.[0];

        const labelTextMap = {
          new_project: { th: 'New Project', en: 'New Project' },
          ready_to_move: { th: 'Ready to Move', en: 'Ready to Move' },
          ready_to_move_in: { th: 'Ready to Move', en: 'Ready to Move' },
          sold_out: { th: 'Sold Out', en: 'Sold Out' }
        };

        if (!relatedData) {
          console.warn('No related project data for id:', projectId);
          return;
        }

        // ------------------------------------------------
        // 4) parse location_title_th
        // ------------------------------------------------
        let locationIds = [];
        if (relatedData.location_title_th) {
          try {
            const parsed = JSON.parse(relatedData.location_title_th);
            locationIds = Array.isArray(parsed)
              ? parsed.map(id => Number(id))
              : [];
          } catch (e) {
            console.error('Cannot parse location_title_th:', relatedData.location_title_th, e);
          }
        }

        if (!locationIds.length) {
          console.warn('No location ids found for project:', projectId);
          return;
        }

        // ------------------------------------------------
        // 5) ดึงข้อมูล location ทั้งหมด + brand ทั้งหมด
        // ------------------------------------------------
        const [locationRes, Brandsres] = await Promise.all([
          getGlobalProjectLocation(), // ✅ ใช้ api.js
          getGlobalProjectBrand()     // ✅ ใช้ api.js
        ]);

        const allLocations = locationRes.data?.data || [];
        const allBrands = Brandsres.data?.data || [];

        const relatedLocations = allLocations.filter(loc =>
          locationIds.includes(Number(loc.id))
        );

        // ------------------------------------------------
        // 6) map เป็น this.cards + ข้อมูล filter
        // ------------------------------------------------
        let cards = [];
        let locationArray = [];
        let brandsArray = [];
        let propertyType = [];
        const brandIndex = new Map(allBrands.map(b => [String(b.id), b]));
        relatedLocations.forEach(loc => {
          const lang = this.language;

          const brandId = String(loc.filter_component_item_l2_id || '').trim();
          const brandObj = brandIndex.get(brandId);

          const brandTitleTh = brandObj?.title?.th || '';
          const brandTitleEn = brandObj?.title?.en || '';

          // ใช้ title ตามภาษา
          const displayBrand = lang === 'en' ? (brandTitleEn || brandTitleTh) : (brandTitleTh || brandTitleEn);

          // theme เอา EN ไว้ใช้ map สี (เพราะ getBorderColor ใช้ key เป็นชื่อ EN)
          const themeBrandName = brandTitleEn || displayBrand || '';

          const type = loc.type || '';

          if (displayBrand) brandsArray.push(displayBrand);
          if (type) propertyType.push(type);
          if (loc.location && loc.location[lang]) locationArray.push(loc.location[lang]);

          cards.push({
            image: `${STORAGE_BASE}uploads/filter_component_item/${loc.thumb}`,
            brands: displayBrand,
            price: (loc.price && loc.price[lang]) ? loc.price[lang] : '',
            location: [
              (loc.location && loc.location[lang]) ? loc.location[lang] : '',
              (loc.title && loc.title[lang]) ? loc.title[lang] : '',
              (loc.location_detail && loc.location_detail[lang]) ? loc.location_detail[lang] : ''
            ],
            label: (labelTextMap[loc.label] && labelTextMap[loc.label][lang]) || '',
            type: type,
            url: (loc.url && loc.url[lang]) ? loc.url[lang] : '#',
            theme: themeBrandName,
            sort_order: (loc.sort_order === null || loc.sort_order === undefined)
              ? 999
              : Number(loc.sort_order)
          });
        });

        this.locations = [...new Set(locationArray)].map(title => ({ title }));
        this.brands = [...new Set(brandsArray)].map(title => ({ title }));
        this.propertyType = [...new Set(propertyType)].map(title => ({ title }));

        cards.sort((a, b) => a.sort_order - b.sort_order);
        this.cards = cards;

      } catch (error) {
        console.error('Failed to load data:', error);
      }
    },

    expandMoreFilter() {
      this.filterNumber += this.cardNum;
      if (typeof setDataLayer !== 'undefined' && typeof propertyLoadMore !== 'undefined') {
        setDataLayer(propertyLoadMore);
      }
    },

    selectFilter(type, value, projectLabel = null) {
      this.filter[type] = value;

      const visibleLabels = this.filteredCards.slice(0, this.filterNumber).map(card => card.label);
      const tracking = {
        event: property_filter.event,
        landing_page: landing_page,
        section: property_filter.section,
        event_action: property_filter.event_action,
        filter_section: Object.keys(this.filter).toString(),
        project_label: visibleLabels.toString(),
        property_type: this.filter.property_type === 'all' ? "non_selected" : this.filter.property_type,
        property_brand: this.filter.property_brand === 'all' ? "non_selected" : this.filter.property_brand,
        property_location: this.filter.property_location === 'all' ? "non_selected" : this.filter.property_location,
      };
      if (typeof setDataLayer !== 'undefined') {
        setDataLayer(tracking);
      }
    },

    selectPropertyCard(card) {
      const tracking = {
        event: propertySelect.event,
        landing_page: landing_page,
        section: propertySelect.section,
        event_action: propertySelect.event_action,
        property_brand: card.brands,
        project_label: card.label.toLowerCase().replace(/ /g, "_"),
        property_type: card.type,
        property_location: card.location[2],
        property_price: card.price
      };
      if (typeof setDataLayer !== 'undefined') {
        setDataLayer(tracking);
      }
      window.open(card.url, '_blank');
    }
  },
  mounted() {
    AOS.init();
    this.loadData();
  },
  template: `
    <section id="filter" class="relative onview  font-['SinghaEstate']" data-section="related_projects">
      <div class="md:bg-[url('./../assets/image/story/bg.svg')] bg-[url('./../assets/image/story/bg-m.svg')] bg-no-repeat bg-cover bg-center py-10">
        <div class="container">
          <h2 :class="font + ' text-[#2C2C2C] text-[35px] uppercase text-center'" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear">
            {{ title }}
          </h2>
          <p class="text-center  text-[22px] font-normal text-[#2C2C2C]" data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="100">
            {{ detail }}
          </p>
        </div>
        <div class="container my-10">
          <p class="no-data uppercase text-center" v-if="filteredCards.length === 0">
            {{ language === 'en' ? 'no projects found' : 'ไม่พบโครงการ' }}
          </p>
          <ul class="grid grid-cols-1 lg:grid-cols-2 gap-5 md:w-fit w-full mx-auto justify-items-center items-center">
            <li
              v-for="(card, index) in filteredCards"
              :key="index"
              :class="[
                'relative',
                'cursor-pointer',
                'card-relate',
                'w-full',
                (index >= filterNumber ? 'hidden' : '')
              ]"
              :data-property_brand="card.brands"
              :data-project_label="card.label"
              :data-property_type="card.type"
              :data-property_location="card.location[0]"
              :data-property_price="card.price"
              :data-href="card.url"
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-easing="linear"
              @click="selectPropertyCard(card)"
            >
              <div
                class="block lg:hidden text-[15px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-5 lg:left-auto left-0 lg:mr-5 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white font-bold text-center"
              >
                {{ card.label }}
              </div>
              <div
                class="w-full md:h-[270px] h-[220px] md:w-[450px]  bg-cover bg-center"
                :style="{ backgroundImage: 'url(' + card.image + ')' }"
                :alt="card.brands"
              ></div>
              <div class="flex w-full relative -mt-5 bg-white/50 overflow-hidden">
                <div class="bg-white/25 absolute top-0 left-0 w-full h-full backdrop-blur-md"></div>
                <div class="relative lg:w-[15px] w-[11px]" :class="getBorderColor(card.theme)"></div>
                <div class="flex flex-col p-5 lg:py-2 py-2 w-full relative">
                  <div
                    class="hidden lg:block text-[15px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-2 lg:left-auto left-0 lg:mr-2 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white text-center"
                  >
                    {{ card.label }}
                  </div>
                  <h3>
                    <span class="text-[22px] uppercase font-bold">{{ card.brands }}</span><br>
                    <span class="font-[200] text-[16px] w-3/4" v-html="card.location[0]?card.location[0]:'<br/>'"></span>
                  </h3>
                  <div class="lg:mt-3 uppercase text-[#707070] text-[15px]" v-html="card.price ? card.price : '<br/>'"></div>
                </div>
              </div>
            </li>
          </ul>

          <div class="flex">
            <button type="button" class="btn mt-10 mx-auto" v-if="filteredCards.length > filterNumber" @click="expandMoreFilter">
              {{ expandBtn }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `
});
