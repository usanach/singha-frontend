// ถ้ายังไม่ได้ import ให้มีพวกนี้ในไฟล์หลักก่อนใช้ component นี้
// import axios from 'axios';
// const { ref, computed, onMounted, nextTick } = Vue;

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
                :key="project.id"
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
                  <h3 class="font-normal font-['SinghaEstate']">
                    {{ project.name[language] }}
                  </h3>
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
                  :key="project.id"
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
                        @click.prevent="selectBrandCollection(item, project)"
                        v-bind="buildDataAttributes(item, project)"
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
                  :key="project.id"
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
                      @click.prevent="selectBrandCollection(img, project)"
                      v-bind="buildDataAttributes(img, project)"
                    >
                      <div class="relative">
                        <img :src="img.l" :alt="img.name" />

                        <div v-if="img.label && img.label.toLowerCase() === 'sold out'" class="absolute top-0 left-0">
                          <div class="bg-[#a82c2c] m-5 py-2 px-5">
                            <p class="text-white uppercase text-[15px]">sold out</p>
                          </div>
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
    const projects = ref({
      title: {
        en: "OUR PROPERTIES <br/>BRAND COLLECTION",
        th: "แนะนำโครงการ"
      },
      items: []
    });
    const activeProject = ref(null);
    const selectedProduct = ref('');

    const { apiBaseUrl, storageUrl } = window.APP_CONFIG || {};

    // ถ้าอยากเปลี่ยน bg ตามประเภท ก็มาแก้ logic ตรงนี้
    const bgImageClass = computed(() =>
      "bg-[url('./../assets/image/brand/santiburi-bg.webp')]"
    );

    const title = computed(() => {
      const t = projects.value.title || {};
      return t[language.value] || '';
    });

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const normalizeLabel = raw => {
      if (!raw) return '';
      // "sold_out" -> "Sold Out"
      return raw
        .toLowerCase()
        .split('_')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    };

    const imageFolder = 'uploads/brand_collection_item_data/'; 
    // ถ้า backend ใช้ path อื่น เช่น uploads/global_brand_collection/
    // เปลี่ยนตัวแปรนี้ตัวเดียว

    const loadData = async () => {
      try {
        if (!apiBaseUrl) {
          console.error('APP_CONFIG หรือ apiBaseUrl ไม่มีค่า');
          return;
        }

        const [brandCollectionRes, projectLocationRes, projectBrandRes] = await Promise.all([
          axios.get(`${apiBaseUrl}/global/brand-collection`),
          axios.get(`${apiBaseUrl}/global/project-location`),
          axios.get(`${apiBaseUrl}/global/project-brand`)
        ]);

        // ---------- TITLE จาก brand-collection ----------
        const titleRow = brandCollectionRes.data?.data?.[0];
        const apiTitle = titleRow?.title || {};
        const mappedTitle = {
          th: (apiTitle.th || 'แนะนำโครงการ').replace(/\r\n|\n/g, '<br/>'),
          en: (apiTitle.en || 'OUR PROPERTIES <br/>BRAND COLLECTION').replace(/\r\n|\n/g, '<br/>')
        };

        // ---------- LIST แบรนด์จาก sub-data ----------
        const subItems = brandCollectionRes.data?.['sub-data'] || [];
        const projectLocations = projectLocationRes.data?.data || [];
        const projectBrands = projectBrandRes.data?.data || [];

                // เตรียม group house / condo ให้เหมือน brand-collection.json เดิม
        const groups = {
          house: {
            id: 0,
            name: {
              en: "house projects",
              th: "บ้านและที่อยู่อาศัย"
            },
            data: []
          },
          condo: {
            id: 1,
            name: {
              en: "Condominium Projects",
              th: "คอนโดมิเนียม"
            },
            data: []
          }
        };

        // ชนิด property type ที่ถือว่าเป็น "บ้าน"
        const HOUSE_TYPES = ["ไพรเวท เอสเตท", "โฮม ออฟฟิศ", "บ้านเดี่ยว"];
        // ชนิด property type ที่ถือว่าเป็น "คอนโด"
        const CONDO_TYPES = ["คอนโดมิเนียม"];

        subItems.forEach(item => {
          const brandTh = item.brands || '';

          // หา brand ใน project-brand เพื่อดู property type
          const brandMeta = projectBrands.find(pb =>
            pb.title?.th === brandTh ||
            pb.title?.en === brandTh ||
            brandTh.includes(pb.title?.th || '') ||
            brandTh.includes(pb.title?.en || '')
          );

          // อ่าน property type จาก filter_component_item_l1_id
          const typeText = (brandMeta?.filter_component_item_l1_id || '').trim();
console.log(brandMeta);

          let category = 'house'; // default

          if (CONDO_TYPES.includes(typeText)) {
            category = 'condo';
          } else if (HOUSE_TYPES.includes(typeText)) {
            category = 'house';
          }
          // ถ้า type ไม่ตรงกับ list ด้านบน จะยัง default เป็น house

          // หา location / price / label จาก project-location
          const locationMeta =
            projectLocations.find(loc =>
              (loc.filter_component_item_l2_id || '').includes(brandTh)
            ) || {};

          const linkObj = item.link || { th: '#', en: '#' };

          const priceObj = locationMeta.price || {};
          const locObj = locationMeta.location || {};

          const imageL = item.image_l
            ? (storageUrl ? `${storageUrl}${imageFolder}${item.image_l}` : item.image_l)
            : '';
          const logoImg = item.image_logo
            ? (storageUrl ? `${storageUrl}${imageFolder}${item.image_logo}` : item.image_logo)
            : '';

          // name: key ใช้สำหรับเลือกภาพ / border class
          const nameKey =
            (brandMeta?.title?.en || brandMeta?.title?.th || brandTh || '').toLowerCase();

          const brandDisplay =
            brandMeta?.title?.en ||
            brandMeta?.title?.th ||
            brandTh;

          const mappedItem = {
            name: nameKey,
            link: linkObj,
            brands: brandDisplay,
            label: normalizeLabel(locationMeta.label),
            location: locObj.en || locObj.th || '',
            date: item.date || '',
            price: {
              en: priceObj.en || '',
              th: priceObj.th || ''
            },
            l: imageL,
            logo: logoImg
          };

          groups[category].data.push(mappedItem);
        });


        // เอาเฉพาะ group ที่มี data จริง
        const items = [];
        if (groups.house.data.length) items.push(groups.house);
        if (groups.condo.data.length) items.push(groups.condo);

        projects.value = {
          title: mappedTitle,
          items
        };

        // set default active / selected
        if (projects.value.items.length) {
          activeProject.value = projects.value.items[0].name;
          if (projects.value.items[0].data.length) {
            selectedProduct.value = projects.value.items[0].data[0].name;
          }
        }
      } catch (error) {
        console.error('Failed to load brand data from API', error);
      }
    };

    const initAOS = () => {
      AOS.init();
    };

    const selectProject = (nameObj) => {
      activeProject.value = nameObj;
      const proj = projects.value.items.find(p => p.name === nameObj);
      if (proj && proj.data.length) {
        selectedProduct.value = proj.data[0].name;
      }
    };

    const selectProductCard = (name) => {
      selectedProduct.value = name;
    };

    const setDataLayer = (tracking) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(tracking);
    };

    const selectBrandCollection = (item, project) => {
      const projectType =
        typeof project.name === 'string'
          ? project.name
          : (project.name?.en || project.name?.th || '');

      const tracking = {
        event: 'select_property',
        landing_page: 'home_page',
        section: 'property_collection',
        event_action: 'click',
        property_brand: item.brands,
        project_label: (item.label || '').toLowerCase().replace(/ /g, '_'),
        property_type: projectType,
        property_location: item.location,
        property_price: item.price[language.value] || ''
      };

      setDataLayer(tracking);
      window.open(item.link[language.value] || '#', '_blank');
    };

    const buildDataAttributes = (item, project) => {
      const projectType =
        typeof project.name === 'string'
          ? project.name
          : (project.name?.en || project.name?.th || '');

      return {
        'data-property_brand': item.brands,
        'data-project_label': item.label,
        'data-property_type': projectType,
        'data-property_location': item.location,
        'data-property_price': item.price[language.value] || ''
      };
    };

    const computeBorderClass = (name) => {
      const key = (name || '').replace(/’/g, "'").toLowerCase();
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

    onMounted(async () => {
      language.value = getLanguageFromPath();
      await loadData();
      nextTick(() => {
        initAOS();
      });
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
