
// Define the Header component
const BrandCollectionComponent = defineComponent({
  name: 'BrandCollectionComponent',
  template: `
    <section id="BrandCollectionComponent" class="trigger-brand-collection font-['SinghaEstate']">
      <div :class="['relative bg-no-repeat bg-center bg-cover lg:py-20 py-10 brand-collection-bg', bgImageClass]">
        <div class="bg-[#E9E2DC]/75 absolute inset-0 backdrop-blur-md"></div>

        <!-- Header and Project Tabs -->
        <div class="relative">
          <div class="container pb-5 lg:mt-0">
            <h2
              class="text-[35px] lg:text-start text-center uppercase leading-tight pb-5"
              v-html="title"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-easing="linear"
              data-aos-anchor=".trigger-brand-collection"
            ></h2>

            <ul class="flex gap-10 text-[20px] lg:justify-start justify-center project-list mt-3">
              <li
                v-for="project in projects.items"
                :key="project.name"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="linear"
                data-aos-anchor=".trigger-brand-collection"
              >
                <button
                  type="button"
                  @click="selectProject(project.name)"
                  :class="['text-nowrap animate-border-line capitalize', { active: project.name === activeProject }]"
                >
                  <h3 class="font-normal font-['SinghaEstate']">{{ project.name[language] }}</h3>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <!-- Product List and Image Gallery -->
        <div class="relative lg:mt-5">
          <div class="container">
            <div class="flex lg:flex-row flex-col-reverse gap-10">

              <!-- Left: Products -->
              <div class="flex-[1_1_40%]">
                <div
                  v-for="project in projects.items"
                  :key="project.name"
                  class="flex flex-col gap-2 product-list"
                  :class="{ hidden: project.name !== activeProject }"
                >
                  <ul class="flex flex-col gap-2">
                    <li
                      v-for="item in project.data"
                      :key="item.name"
                      @mouseenter="selectProductCard(item.name)"
                      :class="['cursor-pointer transition-all duration-300 opacity-50 px-5', { 'link-active': selectedProduct === item.name }]"
                    >
                      <a
                        :href="item.link[language]"
                        target="_blank"
                        @click.prevent="selectBrandCollection(item)"
                        v-bind="buildDataAttributes(item, project.name)"
                      >
                        <div
                          class="flex md:gap-10 gap-5"
                          data-aos="fade-up"
                          data-aos-duration="1000"
                          data-aos-anchor=".trigger-brand-collection"
                          data-aos-easing="linear"
                        >
                          <div class="my-auto md:mx-0 mx-auto">
                            <h4 class="text-nowrap uppercase">{{ item.brands }}</h4>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Right: Images -->
              <div class="flex-[1_1_60%] lg:-mt-[9rem]">
                <ul
                  v-for="project in projects.items"
                  :key="project.name"
                  class="img-list"
                  :class="{ hidden: project.name !== activeProject }"
                >
                  <li
                    v-for="img in project.data"
                    :key="img.name"
                    :class="{ active: selectedProduct === img.name }"
                    :data-name="img.name"
                  >
                    <a
                      :href="img.link[language]"
                      target="_blank"
                      @click.prevent="selectBrandCollection(img)"
                      v-bind="buildDataAttributes(img, project.name)"
                    >
                      <img :src="img.l" :alt="img.name" />

                      <div v-if="img.label.toLowerCase() === 'sold out'" class="absolute top-0 left-0">
                        <div class="bg-[#a82c2c] m-5 py-2 px-5">
                          <p class="text-white uppercase text-[15px]">sold out</p>
                        </div>
                      </div>

                      <div :class="['border border-[0.75rem] border-t-0 border-r-0 border-b-0 relative', computeBorderClass(img.name)]">
                        <div class="bg-[#E4DCD5]/50 absolute inset-0 backdrop-blur-md brightness-125"></div>
                        <img :src="img.logo" :alt="img.name" class="mx-auto md:h-[55px] h-[40px] relative" />
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  `,

  setup() {
    const language = ref('th');
    const projects = ref([]);
    const activeProject = ref('');
    const selectedProduct = ref('');

    const bgImageClass = computed(() =>
      "bg-[url('./../assets/image/brand/santiburi-bg.webp')]"
    );
    const title = ref('');

    const loadData = async () => {
      try {
        const response = await axios.get('/data/brand-collection.json');
        projects.value = response.data;
        if (projects.value.items.length) {
          activeProject.value = projects.value.items[0].name;
          selectedProduct.value = projects.value.items[0].data[0].name;
        }
      } catch (error) {
        console.error('Failed to load brand data', error);
      }
    };

    const initAOS = () => AOS.init();

    const selectProject = name => {
      activeProject.value = name;
      const grp = projects.value.items.find(p => p.name === name);

      if (grp && grp.data.length) selectedProduct.value = grp.data[0].name;
    };

    const selectProductCard = name => {
      selectedProduct.value = name;
    };

    const setDataLayer = tracking => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(tracking);
    };

    const selectBrandCollection = item => {
      const tracking = {
        event: 'select_property',
        landing_page: 'home_page',
        section: 'property_collection',
        event_action: 'click',
        property_brand: item.brands,
        project_label: item.label.toLowerCase().replace(/ /g, '_'),
        property_type: activeProject.value,
        property_location: item.location,
        property_price: item.price[language.value] || ''
      };
      setDataLayer(tracking);
      window.open(item.link[language.value], '_blank');
    };

    const buildDataAttributes = (item, projectName) => ({
      'data-property_brand': item.brands,
      'data-project_label': item.label,
      'data-property_type': projectName,
      'data-property_location': item.location,
      'data-property_price': item.price[language.value] || ''
    });

    const computeBorderClass = name => {
      const key = name.replace(/’/g, "'").toLowerCase();
      const map = {
        santiburi: 'border-[#46111B]',
        "la soie de s": 'border-[#57893a]',
        "smyth's": 'border-[#945E4D]',
        siraninn: 'border-[#b49a81]',
        "s'rin": 'border-[#003b5E]',
        shawn: 'border-[#5c4580]',
        sentre: 'border-[#7F8372]',
        esse: 'border-[#182A45]',
        extro: 'border-[#bf6c29]'
      };
      return map[key] || '';
    };

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      await loadData();
      nextTick(initAOS);
      title.value = projects.value.title[language.value]
    });

    return {
      language,
      projects,
      activeProject,
      selectedProduct,
      title,
      bgImageClass,
      selectProject,
      selectProductCard,
      selectBrandCollection,
      buildDataAttributes,
      computeBorderClass
    };
  }
});
