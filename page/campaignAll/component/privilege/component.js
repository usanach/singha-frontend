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
            try {
                const response = await axios.get('/data/promotion.json');
                const all = response.data;
                // Filter out ended promotions
                const visibleList = all.filter(item => !item.end);
                // Determine how many cards to show initially
                const initialCount = Math.min(this.cardNum, visibleList.length);

                this.cards = visibleList.map((d, i) => {
                    const p = d.data.product;
                    // Compute border
                    const border = p ? this.getBorderColor(p.brands) : '';
                    return {
                        title: d.data.card.title[this.language],
                        location: d.data.card.subtitle[this.language],
                        link: `/${this.language}/campaigns/${d.data.link}`,
                        price: d.data.card.detail[this.language],
                        img: d.data.image.s,
                        type: d.type,
                        label: d.type,
                        border,
                        promotionName: d.data.campaign[this.language],
                        last: i === visibleList.length - 1,
                        show: i < initialCount
                    };
                });
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        },

        expandMore() {
            this.cardNum += 4;
            // Update show flag
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
    <section id="filter" class="relative onview md:bg-[url('./../assets/image/story/bg.svg')] bg-[url('./../assets/image/story/bg-m.svg')] bg-no-repeat bg-cover bg-center py-10" data-section="related_projects">
      <div class="container py-10">
        <h2
          :class="
            font +
            '  text-[#2C2C2C] lg:text-[30px] text-[24px] uppercase text-center'
          "
          data-aos="fade-up"
        >
          {{ title }}
        </h2>

        <div class="my-10">
            
            <div class="py-5">
                <div class="mx-auto">
                    <div class="my-auto">
                        <p class="text-[#797E81] text-[14px]">
                            <span class="text-black">{{this.cards.length}}</span> <span class="text-black uppercase">campaigns</span>
                            (<span>{{this.cards.length}}</span>/<span>{{this.cards.length}}</span>)
                        </p>
                    </div>
                </div>
            </div>
          <ul
            class="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full mx-auto justify-items-center"
          >
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
                class="block lg:hidden lg:text-[16px] text-[12px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-5 lg:left-auto left-0 lg:mr-5 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white font-bold text-center">
                {{ card.label }}</div>
              <div
                class="w-full md:h-[270px] h-[220px] bg-cover bg-center"
                :style="{ backgroundImage: 'url(' + card.img + ')' }"
              ></div>

              <div class="flex w-full relative -mt-5 bg-white/50 overflow-hidden">
                <div class="bg-white/25 absolute top-0 left-0 w-full h-full backdrop-blur-md"></div>
                <div class="relative w-[11px]" :class="card.border"></div>
                <div class="flex flex-col p-5 lg:py-2 py-2 w-full relative gap-2">
                    <div
                        class="hidden lg:block text-[12px] bg-[url('./../assets/icon/badge.svg')] w-auto top-0 lg:right-0 lg:mt-2 lg:left-auto left-0 lg:mr-2 absolute capitalize bg-no-repeat bg-cover px-5 py-1 text-white text-center">
                    {{ card.label }}</div>
                  <h3>
                    <span class="text-[14px] uppercase font-bold">
                      {{ card.title }}
                    </span><br>
                    <span class="font-[200] text-[14px] w-3/4">
                      {{ card.location }}
                    </span>
                  </h3>

                  <div class="mt-3 uppercase text-[#707070] text-[12px]">
                    {{ card.price }}
                  </div>
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
