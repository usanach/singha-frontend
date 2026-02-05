// Define the Header component
const FilterComponent = defineComponent({
  name: 'FilterComponent',
  template: `
    <section id="filter" class="relative" v-if="hasData">
      <div class="md:bg-[url('./../assets/image/story/bg.svg')] bg-[url('./../assets/image/story/bg-m.svg')] bg-no-repeat bg-cover bg-center py-10">
        <div class="container">
          <h2 class="text-[#2C2C2C] text-[35px] uppercase text-center">
            {{ language === 'en' ? 'Find a Project' : 'ค้นหาโครงการ' }}
          </h2>
        </div>

        <div class="container max-w-[1265px] py-5 lg:pt-5 pt-0 md:pb-5 pb-0">
          <div class="discovery-filter lg:w-3/4 mx-auto">
            <div class="flex lg:flex-row flex-col lg:gap-10 gap-3">

              <div class="lg:hidden block ml-auto mb-2 mt-14">
                <button type="button" @click="hideModalFn('discovery-filter')">
                  <img src="/assets/icon/close.svg" alt="icon">
                </button>
              </div>

              <!-- PROPERTY TYPE -->
              <custom-selection id="property_type"
                class="selection-group"
                :class="{ selected: openDropdown === 'property_type' }"
                @click="toggleDropdown('property_type')"
                @mouseleave="closeDropdown"
              >
                <div class="relative border border-1 border-[#948668] bg-white h-[40px]">
                  <div class="absolute left-0 top-0 w-full h-full">
                    <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-3">
                      <img src="/assets/icon/dropdown.svg" class="w-[20px]" alt="icon">
                    </span>
                    <p class="p-2 relative text-[16px]">{{ selectedLabels.property_type }}</p>
                  </div>
                </div>
                <options>
                  <option
                    v-for="opt in propertyTypeOptions"
                    :key="opt.value"
                    class="uppercase"
                    :class="opt.value==='all' ? 'border border-l-0 border-r-0 border-t-0' : ''"
                    :value="opt.value"
                    @click.stop="setFilter('property_type', opt.value, opt.label)"
                  >
                    {{ opt.label }}
                  </option>
                </options>
              </custom-selection>

              <!-- LOCATION -->
              <custom-selection id="property_location"
                class="selection-group"
                :class="{ selected: openDropdown === 'property_location' }"
                @click="toggleDropdown('property_location')"
                @mouseleave="closeDropdown"
              >
                <div class="relative border border-1 border-[#948668] bg-white h-[40px]">
                  <div class="absolute left-0 top-0 w-full h-full">
                    <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-3">
                      <img src="/assets/icon/dropdown.svg" class="w-[20px]" alt="icon">
                    </span>
                    <p class="p-2 relative text-[16px]">{{ selectedLabels.property_location }}</p>
                  </div>
                </div>
                <options>
                  <option
                    class="uppercase border border-l-0 border-r-0 border-t-0"
                    value="all"
                    @click.stop="setFilter('property_location', 'all', language==='en'?'All':'ทั้งหมด')"
                  >
                    {{ language==='en'?'All':'ทั้งหมด' }}
                  </option>

                  <option
                    v-for="loc in locationOptions"
                    :key="loc.value"
                    class="uppercase"
                    :value="loc.value"
                    @click.stop="setFilter('property_location', loc.value, loc.label)"
                  >
                    {{ loc.label }}
                  </option>
                </options>
              </custom-selection>

              <!-- BRAND -->
              <custom-selection id="property_brand"
                class="selection-group"
                :class="{ selected: openDropdown === 'property_brand' }"
                @click="toggleDropdown('property_brand')"
                @mouseleave="closeDropdown"
              >
                <div class="relative border border-1 border-[#948668] bg-white h-[40px]">
                  <div class="absolute left-0 top-0 w-full h-full">
                    <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-3">
                      <img src="/assets/icon/dropdown.svg" class="w-[20px]" alt="icon">
                    </span>
                    <p class="p-2 relative text-[16px]">{{ selectedLabels.property_brand }}</p>
                  </div>
                </div>
                <options>
                  <option
                    class="uppercase border border-l-0 border-r-0 border-t-0"
                    value="all"
                    @click.stop="setFilter('property_brand', 'all', language==='en'?'All':'ทั้งหมด')"
                  >
                    {{ language==='en'?'All':'ทั้งหมด' }}
                  </option>

                  <option
                    v-for="b in brandOptions"
                    :key="b.value"
                    class="uppercase"
                    :value="b.value"
                    @click.stop="setFilter('property_brand', b.value, b.label)"
                  >
                    {{ b.label }}
                  </option>
                </options>
              </custom-selection>

            </div>
          </div>

          <div class="mt-5 lg:w-3/4 mx-auto">
            <div class="flex justify-end lg:flex-row flex-col">
              <div class="flex justify-between w-full">
                <div class="my-auto">
                  <p class="text-[#797E81] text-[16px]">
                    <span class="text-black font-normal">{{ totalProjects }}</span>
                    <span class="text-black font-normal">{{ language==='en'?'Projects':'โครงการ' }}</span>
                    (<span>{{ visibleProjects }}</span>/<span>{{ totalProjects }}</span>)
                  </p>
                </div>

                <div class="flex lg:hidden">
                  <button type="button" @click="showModalFn('discovery-filter')" class="flex gap-2">
                    <p class="text-black font-normal font-[#958568]">Filter</p>
                    <span class="w-[18px] my-auto mb-2"><img src="/assets/icon/filter.svg" alt="icon"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CARD LIST -->
        <div class="container min-h-[800px] lg:mt-0 mt-4">
          <ul class="card-list grid grid-cols-1 lg:grid-cols-2 gap-5 md:w-fit w-full mx-auto justify-items-center items-center">
            <p class="no-data uppercase" v-if="filteredCards.length === 0">
              {{ language==='en' ? 'no projects found' : 'ไม่พบโครงการ' }}
            </p>

            <li
              v-for="(c, idx) in shownCards"
              :key="c.key"
              class="relative cursor-pointer card-relate w-full overflow-hidden"
              @click="selectPropertyCard(c)"
            >
              <div
                class="block lg:hidden text-[15px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-5 lg:left-auto left-0 lg:mr-5 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white font-bold text-center"
                v-if="c.labelDisplay"
              >
                {{ c.labelDisplay }}
              </div>

              <div class="w-full md:h-[270px] h-[220px] md:w-[450px] bg-cover bg-center">
                <div class="w-full h-full bg-cover bg-center hover:scale-110 transition-all"
                  :style="{ backgroundImage: 'url(' + c.thumbPath + ')' }"></div>
              </div>

              <div class="flex w-full relative -mt-5 bg-white/50 max-h-[120px] overflow-hidden">
                <div class="bg-white/25 absolute top-0 left-0 w-full h-full backdrop-blur-md"></div>
                <div class="relative lg:w-[15px] w-[11px]" :class="c.border"></div>

                <div class="flex flex-col p-5 lg:py-2 py-2 w-full relative">
                  <div class="hidden lg:block"
                       v-if="c.labelDisplay">
                    <div class="text-[15px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-2 lg:left-auto left-0 lg:mr-2 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white text-center">
                      {{ c.labelDisplay }}
                    </div>
                  </div>

                  <h3>
                    <span class="text-[22px] uppercase font-bold">{{ c.brandLabel }}</span>
                    <br>
                    <span class="font-[200] text-[16px] w-3/4">{{ c.locName }}</span>
                  </h3>

                  <div class="lg:mt-3 uppercase text-[#707070] text-[15px]" v-html="c.priceHtml"></div>
                </div>
              </div>
            </li>
          </ul>

          <div class="flex" v-if="canShowMore">
            <button type="button" class="btn mt-10 mx-auto" @click="showMore">
              {{ language==='en' ? 'See more' : 'ดูเพิ่มเติม' }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `,

  setup() {
    const language = ref('th');
    const openDropdown = ref(null);

    // filters
    const filters = ref({
      property_type: 'all',
      property_location: 'all',
      property_brand: 'all',
    });

    const selectedLabels = ref({
      property_type: 'ประเภทโครงการ',
      property_location: 'ทำเล',
      property_brand: 'แบรนด์',
    });

    const brandOptions = ref([]);     // [{value:'<id>', label:'...'}]
    const locationOptions = ref([]);  // [{value:'สุขุมวิท', label:'สุขุมวิท'}]
    const cards = ref([]);            // mapped cards from API

    // pagination (show more)
    const initialShow = 4;
    const stepShow = 4;
    const showCount = ref(initialShow);

    // hide section if no cards
    const hasData = computed(() => Array.isArray(cards.value) && cards.value.length > 0);

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const getDefaultPropertyTypeFromPath = () => {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('/house')) return 'บ้านเดี่ยว';
      if (path.includes('/condominium')) return 'คอนโดมิเนียม';
      return 'all';
    };

    const propertyTypeList = computed(() => ({
      th: [
        { value: "all", label: "ทั้งหมด" },
        { value: "ไพรเวท เอสเตท", label: "ไพรเวท เอสเตท" },
        { value: "บ้านเดี่ยว", label: "บ้านเดี่ยว" },
        { value: "คอนโดมิเนียม", label: "คอนโดมิเนียม" },
        { value: "โฮม ออฟฟิศ", label: "โฮม ออฟฟิศ" }
      ],
      en: [
        { value: "all", label: "All" },
        { value: "ไพรเวท เอสเตท", label: "PRIVATE ESTATE" },
        { value: "บ้านเดี่ยว", label: "DETACHED HOUSE" },
        { value: "คอนโดมิเนียม", label: "CONDOMINIUM" },
        { value: "โฮม ออฟฟิศ", label: "HOME OFFICE" }
      ]
    }));

    const propertyTypeOptions = computed(() => propertyTypeList.value[language.value] || []);

    const getBorderColor = (themeEn) => {
      const themeColors = {
        "SANTIBURI THE RESIDENCES": "bg-[#712135]",
        "LA SOIE de S": "bg-[#bc9e68]",
        "SMYTH'S": "bg-[#945E4D]",
        "SIRANINN RESIDENCES": "bg-[#b49a81]",
        "S'RIN": "bg-[#003b5E]",
        "SHAWN": "bg-[#5c4580]",
        "SENTRE": "bg-[#7F8372]",
        "THE ESSE": "bg-[#182A45]",
        "THE EXTRO": "bg-[#bf6c29]",
      };
      return themeColors[themeEn] ?? "";
    };

    const labelTextMap = {
      new_project: { th: 'New Project', en: 'New Project' },
      ready_to_move: { th: 'Ready to Move', en: 'Ready to Move' },
      ready_to_move_in: { th: 'Ready to Move', en: 'Ready to Move' },
      sold_out: { th: 'Sold Out', en: 'Sold Out' }
    };

    const getPriority = (label) => {
      const l = (label || '').toLowerCase();
      if (l === 'new_project') return 1;
      if (l === 'ready_to_move' || l === 'ready_to_move_in') return 2;
      if (l === 'sold_out') return 3;
      return 4;
    };

    const toggleDropdown = (name) => {
      openDropdown.value = (openDropdown.value === name) ? null : name;
    };

    const closeDropdown = () => {
      openDropdown.value = null;
    };

    const setFilter = (type, value, label) => {
      filters.value[type] = value;
      selectedLabels.value[type] = label;
      closeDropdown();
      showCount.value = initialShow; // reset pagination on filter change
    };

    const filteredCards = computed(() => {
      const t = filters.value.property_type;
      const l = filters.value.property_location;
      const b = filters.value.property_brand;

      return cards.value.filter(c => {
        const okType = (t === 'all' || !t) ? true : (c.propertyType === t);
        const okLoc  = (l === 'all' || !l) ? true : (c.locName === l);
        const okBrand= (b === 'all' || !b) ? true : (c.brandId === b);
        return okType && okLoc && okBrand;
      });
    });

    const shownCards = computed(() => filteredCards.value.slice(0, showCount.value));

    const totalProjects = computed(() => filteredCards.value.length);
    const visibleProjects = computed(() => shownCards.value.length);

    const canShowMore = computed(() => filteredCards.value.length > shownCards.value.length);

    const showMore = () => {
      showCount.value += stepShow;

      // tracking เดิม (กันพังถ้าไม่มี)
      if (typeof setDataLayer === 'function' && typeof propertyLoadMore !== 'undefined') {
        setDataLayer(propertyLoadMore);
      }
    };

    const selectPropertyCard = (c) => {
      const tracking = {
        event: (typeof propertySelect !== 'undefined' ? propertySelect.event : 'select_property'),
        landing_page: (typeof landing_page !== 'undefined' ? landing_page : ''),
        section: (typeof propertySelect !== 'undefined' ? propertySelect.section : 'property_filter'),
        event_action: (typeof propertySelect !== 'undefined' ? propertySelect.event_action : 'click'),
        property_brand: c.brandId,
        project_label: (c.labelCode || '').toLowerCase().replace(/ /g, "_"),
        property_type: c.propertyType,
        property_location: c.locName,
        property_price: c.priceText
      };

      if (typeof setDataLayer === 'function') setDataLayer(tracking);
      window.open(c.url || '#', '_blank');
    };

    const showModalFn = (id) => {
      if (typeof showModal === 'function') showModal(id);
    };

    const hideModalFn = (id) => {
      if (typeof hideModal === 'function') hideModal(id);
    };

    const buildOptionsAndCards = async () => {
      try {
        // ✅ ใช้ api.js functions
        const [brandRes, locationRes] = await Promise.all([
          getGlobalProjectBrand(),
          getGlobalProjectLocation(),
        ]);

        const brandData = brandRes?.data?.data || [];
        const locationData = locationRes?.data?.data || [];

        // brandMapById
        const brandMapById = {};
        brandData.forEach(b => {
          if (b && b.id != null) brandMapById[String(b.id)] = b;
        });

        // options BRAND
        brandOptions.value = brandData
          .map(b => {
            const label = b?.title?.[language.value] || b?.title?.th || '';
            return label ? { value: String(b.id), label } : null;
          })
          .filter(Boolean);

        // options LOCATION (unique)
        const seen = new Set();
        locationOptions.value = locationData
          .map(item => {
            const locName = item?.location?.[language.value] || item?.location?.th || '';
            if (!locName || seen.has(locName)) return null;
            seen.add(locName);
            return { value: locName, label: locName };
          })
          .filter(Boolean);

        // cards
        const { storageUrl = '' } = window.APP_CONFIG || {};

        const mapped = locationData.map((item, idx) => {
          const brandId = String(item.filter_component_item_l2_id || '');
          const brandObj = brandMapById[brandId] || null;

          const propertyType = brandObj ? (brandObj.filter_component_item_l1_id || '') : '';
          const themeEn = brandObj?.title?.en || '';
          const border = getBorderColor(themeEn);

          const labelCode = item.label || '';
          const labelDisplay = (labelTextMap[labelCode]?.[language.value]) || '';

          const locName = item?.location?.[language.value] || item?.location?.th || '';
          const priceText = item?.price?.[language.value] || item?.price?.th || '';
          const url = item?.url?.[language.value] || item?.url?.th || '#';

          const brandLabel = brandObj?.title?.[language.value] || brandObj?.title?.th || '';

          const thumbPath = item.thumb
            ? `${storageUrl}uploads/filter_component_item/${item.thumb}`
            : '';

          // กันเคสไม่มีราคา
          const priceHtml = (priceText && priceText.trim() !== '') ? priceText : '<br/>';

          return {
            key: `${brandId}-${locName}-${idx}`,
            propertyType,
            brandId,
            brandLabel,
            themeEn,
            border,
            labelCode,
            labelDisplay,
            locName,
            priceText,
            priceHtml,
            url,
            thumbPath,
          };
        }).filter(c => !!c.thumbPath);

        // sort เดิม
        mapped.sort((a, b) => {
          const themeA = (a.themeEn || '').toLowerCase();
          const themeB = (b.themeEn || '').toLowerCase();
          const themeCmp = themeA.localeCompare(themeB);
          if (themeCmp !== 0) return themeCmp;
          return getPriority(a.labelCode) - getPriority(b.labelCode);
        });

        const themeOrder = ["smyth's ", "s'rin", "shawn", "the esse"];
        const themeIndex = themeOrder.reduce((m, t, i) => {
          m[t.toLowerCase()] = i; return m;
        }, {});

        mapped.sort((a, b) => {
          const idxA = themeIndex[a.themeEn?.toLowerCase()] ?? Infinity;
          const idxB = themeIndex[b.themeEn?.toLowerCase()] ?? Infinity;
          if (idxA !== idxB) return idxA - idxB;
          return getPriority(a.labelCode) - getPriority(b.labelCode);
        });

        cards.value = mapped;

      } catch (err) {
        console.error('Failed to load filter data via api.js:', err);
        cards.value = [];
        brandOptions.value = [];
        locationOptions.value = [];
      }
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();

      // default labels by lang
      selectedLabels.value = {
        property_type: language.value === 'en' ? 'Project Type' : 'ประเภทโครงการ',
        property_location: language.value === 'en' ? 'Location' : 'ทำเล',
        property_brand: language.value === 'en' ? 'Brand' : 'แบรนด์',
      };

      await buildOptionsAndCards();

      // set default property type from URL
      const defaultType = getDefaultPropertyTypeFromPath();
      if (defaultType !== 'all') {
        filters.value.property_type = defaultType;
        const opt = propertyTypeOptions.value.find(x => x.value === defaultType);
        if (opt) selectedLabels.value.property_type = opt.label;
      } else {
        // ค่าเริ่มต้นให้เป็น "ทั้งหมด/All"
        const allLabel = language.value === 'en' ? 'All' : 'ทั้งหมด';
        filters.value.property_type = 'all';
        selectedLabels.value.property_type = allLabel;
        filters.value.property_location = 'all';
        selectedLabels.value.property_location = allLabel;
        filters.value.property_brand = 'all';
        selectedLabels.value.property_brand = allLabel;
      }

      nextTick(() => {
        if (window.AOS) AOS.init();
      });
    });

    return {
      language,
      hasData,

      // dropdown state
      openDropdown,
      toggleDropdown,
      closeDropdown,

      // options
      propertyTypeOptions,
      brandOptions,
      locationOptions,

      // labels + filters
      selectedLabels,
      setFilter,

      // cards
      filteredCards,
      shownCards,
      totalProjects,
      visibleProjects,
      canShowMore,
      showMore,

      // actions
      selectPropertyCard,
      showModalFn,
      hideModalFn,
    };
  }
});
