const CollectionComponent = defineComponent({
  name: 'CollectionComponent',
  template: `
    <section class="onview -mt-1 become-agent-main !pt-0" id="CollectionComponent" data-section="our_condominium_brand_collection">
      <div class="portfolio-section bg-[url('/assets/image/page-condo/collection/bg.webp')]">
        <div class="title-text-wrapper wrapper-space-bottom -mt-1">
          <h2 ref="titleDiv" class="header-text" v-html="title[language]"></h2>
        </div>
        <div class="container mt-5">
          <div class="grid md:grid-cols-2 md:grid-row-1 grid-row-2 gap-8 lg:w-3/5 md:w-4/5   mx-auto">
            <div v-for="(item, index) in items" :key="index" class="card bg-white/50 backdrop-blur p-5 shadow hover:shadow-lg">
              <div  class="space-y-5">
                <img aria-hidden="true" :src="item.image" :alt="item.alt" class="w-full object-cover mb-2" />
                <div class="flex items-center justify-center mb-2">
                  <img aria-hidden="true" :src="item.logo" :alt="item.alt" class="h-10" />
                </div>
                <div class="card-body">
                  <h3 class="card-title text-lg font-semibold text-center">{{ item.description }}</h3>
                  <p v-if="item.secondaryDescription[language]" class="card-text text-[20px] text-center">{{ item.secondaryDescription[language] }}</p>
                </div>
                <div class="text-center pb-5 mt-3">
                  <a 
                  :property_brand="item.data.property_brand" 
                  :project_label="item.data.project_label" 
                  :property_type="item.data.property_type" 
                  :property_location="item.data.property_location" 
                  :property_price="item.data.property_price" 
                   class="" :data-href="item.url[language]" target="_blank" rel="noopener noreferrer"> <button class="btn bg-transparent text-[#948667] py-2 cursor-pointer"> {{more[language]}} </button> </a>
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
    const titleDiv = ref(null)


    // Title text per language
    const title = {
      en: "Our condominium <br/>brand Collection",
      th: "​รวมโครงการคอนโดมิเนียม​",
    };

    // Dynamic dataset for portfolio carousel items
    const items = [
      {
        image: "/assets/image/page-condo/collection/the-extro.webp",
        alt: "the extro",
        logo: "/assets/image/page-condo/collection/extro.webp",
        description: "",
        secondaryDescription: {
          en: "START 7.89 MB.",
          th: "ราคาเริ่มต้น 7.89 ล้านบาท"
        },
        data: {
          property_brand: "THE EXTRO",
          project_label: "ready_to_move",
          property_type: "Condominium",
          property_location: "Sukhumvit",
          property_price: "Start 7.89 MB."
        },
        url:{
          en:"/en/condominium/the-extro/phayathai-rangnam",
          th:"/th/condominium/the-extro/phayathai-rangnam"
        }
      },
      {
        image: "/assets/image/page-condo/collection/the-esse.webp",
        alt: "the esse",
        logo: "/assets/image/page-condo/collection/esse.webp",
        description: "",
        secondaryDescription: {
          en: "START 12.9 MB.",
          th: "ราคาเริ่มต้น 12.9 ล้านบาท"
        },
        data: {
          property_brand: "THE ESSE",
          project_label: "Sold Out",
          property_type: "Condominium",
          property_location: "Sukhumvit",
          property_price: "-"
        },
        url:{
          en:"https://residential2.singhaestate.co.th/en/condo/the-esse/singha-complex",
          th:"https://residential2.singhaestate.co.th/th/condo/the-esse/singha-complex"
        }
      }
    ];

    // Function to extract language from the URL
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    onMounted(() => {
      language.value = getLanguageFromPath();

      // titleDiv.value.classList.add(fontCss())

    });
    const more = {
      en: "Explore More1",
      th: "ดูเพิ่มเติม"
    }
    const fontCss = () => {
      return getLanguageFromPath() == "en" ? "" : ""
    }
    return { language, title, items, titleDiv, more };
  }
});
