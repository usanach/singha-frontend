// ถ้ายังไม่ได้ import axios ในไฟล์นี้ ให้เพิ่มบรรทัดนี้ด้านบนสุด
// import axios from 'axios';

const CollectionComponent = defineComponent({
  name: 'CollectionComponent',
  template: `
    <section class="onview -mt-1 become-agent-main !pt-0" id="CollectionComponent" data-section="our_condominium_brand_collection">
      <div class="portfolio-section bg-[url('/assets/image/page-condo/collection/bg.webp')]">
        <div class="title-text-wrapper wrapper-space-bottom -mt-1">
          <h2 ref="titleDiv" class="header-text" v-html="title[language]"></h2>
        </div>
        <div class="container mt-5">
          <div class="grid md:grid-cols-2 md:grid-row-1 grid-row-2 gap-8 lg:w-3/5 md:w-4/5 mx-auto">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="card bg-white/50 backdrop-blur p-5 shadow hover:shadow-lg"
            >
              <div class="space-y-5">
                <img :src="item.image" :alt="item.alt" class="w-full object-cover mb-2" />
                <div class="flex items-center justify-center mb-2">
                  <img :src="item.logo" :alt="item.alt" class="h-10" />
                </div>
                <div class="card-body">
                  <h3 class="card-title text-lg font-semibold text-center">
                    {{ item.description }}
                  </h3>
                  <p
                    v-if="item.secondaryDescription[language]"
                    class="card-text text-[20px] text-center"
                  >
                    {{ item.secondaryDescription[language] }}
                  </p>
                </div>
                <div class="text-center pb-5 mt-3">
                  <a
                    :property_brand="item.data.property_brand"
                    :project_label="item.data.project_label"
                    :property_type="item.data.property_type"
                    :property_location="item.data.property_location"
                    :property_price="item.data.property_price"
                    class=""
                    :data-href="item.url[language]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button class="btn bg-transparent text-[#948667] py-2 cursor-pointer">
                      {{ more[language] }}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  setup() {
    const language = ref('th');
    const titleDiv = ref(null);
    const items = ref([]);

    const title = {
      en: "Our condominium <br/>brand Collection",
      th: "​รวมโครงการคอนโดมิเนียม​",
    };

    const more = {
      en: "Explore More",
      th: "ดูเพิ่มเติม",
    };

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const fontCss = () => {
      return getLanguageFromPath() === "en" ? "" : "";
    };

    const fetchCollection = async () => {
      try {
        const { apiBaseUrl, storageUrl } = window.APP_CONFIG || {};

        if (!apiBaseUrl) {
          console.error('APP_CONFIG หรือ apiBaseUrl ไม่มีค่า');
          return;
        }

        const res = await axios.get(`${apiBaseUrl}/condo-collection`);

        // โครงสร้างตัวอย่างในคำถาม = { data: [ ... ] }
        const apiItems = res.data && res.data.data ? res.data.data : [];

        items.value = apiItems.map((item) => {
          // ถ้าไฟล์ใน storage อยู่ในโฟลเดอร์ย่อย เช่น uploads/condo-collection
          // ให้แก้ path ตรงนี้ เช่น `${storageUrl}uploads/condo-collection/${item.image}`
          const imagePath = storageUrl ? `${storageUrl}${item.image}` : item.image;
          const logoPath  = storageUrl ? `${storageUrl}${item.logo}`  : item.logo;

          return {
            image: imagePath,
            alt: item.property_brand || item.description || '',
            logo: logoPath,
            description: item.property_brand || item.description || "",
            secondaryDescription: {
              th: item.brand_tagline_th || "",
              en: item.brand_tagline_en || "",
            },
            data: {
              property_brand: item.property_brand || "",
              project_label: "", // API ยังไม่มี field นี้ ถ้าเพิ่มในอนาคตค่อย map
              property_type: "Condominium",
              property_location: item.property_location || "",
              // เก็บ tagline EN ไว้เป็น price ไว้ใช้กับ data-attribute
              property_price: item.brand_tagline_en || item.brand_tagline_th || "",
            },
            url: item.url || {
              th: "#",
              en: "#",
            },
          };
        });
      } catch (err) {
        console.error('Error loading condo collection:', err);
      }
    };

    onMounted(() => {
      language.value = getLanguageFromPath();
      // titleDiv.value && titleDiv.value.classList.add(fontCss());
      fetchCollection();
    });

    return {
      language,
      title,
      items,
      titleDiv,
      more,
    };
  },
});
