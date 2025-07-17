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
      // Filter criteria (default "all" means no filtering)
      filter: {
        property_type: 'all',
        property_location: 'all',
        property_brand: 'all'
      },
      // Number of visible cards
      filterNumber: 4,
      cardNum: 4
    };
  },
  computed: {
    // Returns cards filtered by the selected criteria
    filteredCards() {
      return this.cards.filter(card => {
        if (this.filter.property_type !== 'all' && card.type !== this.filter.property_type) return false;
        if (this.filter.property_location !== 'all' && card.location[2] !== this.filter.property_location) return false;
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
    async loadData() {
      // Set language and related text based on URL
      this.language = this.getLanguageFromPath();
      try {
        // Load JSON data (assumes same structure as before)
        const response = await axios.get('/page/shawn/component/related-projects/data.json');
        const data = response.data;
        let cards = [];
        let propertyType = [];
        let locationArray = [];
        let brandsArray = [];
        this.title = data.title[this.language]
        this.expandBtn = this.language == "en" ? "Explore more" : "ดูเพิ่มเติม​";
        data.items.forEach(type => {
          propertyType.push({ title: type.title[this.language] });
          type.items.forEach(brand => {
            if (brand.items) {
              brand.items.forEach(sub => {
                locationArray.push(sub.location[this.language]);
                brandsArray.push(brand.title[this.language]);
                cards.push({
                  image: sub.thumb,
                  brands: brand.title[this.language],
                  price: sub.price === "" ? "" : sub.price[this.language],
                  // Here, location is an array:
                  // [location name, sub-title, detailed location]
                  location: [sub.location[this.language], sub.title[this.language], sub.location.detail[this.language]],
                  label: sub.label,
                  type: type.title[this.language],
                  url: sub.url[this.language],
                  theme: brand.title['en']
                });
              });
            }
          });
        });

        // Remove duplicates in locations and brands
        this.locations = [...new Set(locationArray)].map(title => ({ title }));
        this.brands = [...new Set(brandsArray)].map(title => ({ title }));
        // Sort cards by label priority (e.g. Latest Project > Ready to Move > Sold Out > others)
        cards.sort((a, b) => {
          const getPriority = label => {
            if (label.toLowerCase() === 'latest project') return 1;
            if (label.toLowerCase() === 'ready to move') return 2;
            if (label.toLowerCase() === 'sold out') return 3;
            return 4;
          };
          return getPriority(a.label) - getPriority(b.label);
        });
        this.cards = cards;
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    },
    expandMoreFilter() {
      this.filterNumber += this.cardNum;
      // If you are using a tracking function, call it here:
      setDataLayer(propertyLoadMore);
    },
    // Use this method to update filter criteria
    selectFilter(type, value, projectLabel = null) {
      this.filter[type] = value;
      // If filtering by brand, you might want to store additional data (e.g. project_label)
      // Tracking filter selection
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

      setDataLayer(tracking);
    },
    // Card selection now receives the card object directly
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
      setDataLayer(tracking);
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
            <ul class="grid grid-cols-1 lg:grid-cols-2 gap-5 md:w-fit w-full mx-auto justify-items-center items-center">
              <!-- Show message if no cards match the filter -->
              <p class="no-data uppercase" v-if="filteredCards.length === 0">
                {{ language === 'en' ? 'no projects found' : 'ไม่พบโครงการ' }}
              </p>

              <!-- Iterate using Vue's v-for -->
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
                :data-property_location="card.location[2]"
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
                      <span class="font-[200] text-[16px] w-3/4">{{ card.location[2] }}</span>
                    </h3>
                    <div class="lg:mt-3 uppercase text-[#707070] text-[15px]">
                      {{ card.price }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <div class="flex">
              <!-- "Load more" button appears only if there are more cards -->
              <button type="button" class="btn mt-10 mx-auto" v-if="filteredCards.length > filterNumber" @click="expandMoreFilter">
                {{ expandBtn }}
              </button>
            </div>
          </div>
        </div>
      </section>
    `
});
