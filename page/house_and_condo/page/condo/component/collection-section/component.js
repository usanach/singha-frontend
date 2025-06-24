const CollectionComponent = defineComponent({
  name: 'CollectionComponent',
  template: `
    <section class="onview -mt-1 become-agent-main !pt-0" id="CollectionComponent" data-section="our_condominium_brand_collection">
      <div class="portfolio-section bg-[url('/assets/image/page-condo/collection/bg.png')]">
        <div class="title-text-wrapper wrapper-space-bottom -mt-1">
          <h2 ref="titleDiv" class="header-text" v-html="title[language]"></h2>
        </div>
        <div class="container mt-5">
          <div class="grid md:grid-cols-2 md:grid-row-1 grid-row-2 gap-8 lg:w-3/5 md:w-4/5   mx-auto">
            <div v-for="(item, index) in items" :key="index" class="card bg-white/50 backdrop-blur p-5 shadow hover:shadow-lg">
              <div  class="space-y-5">
                <img :src="item.productImage" :alt="item.productAlt" class="w-full object-cover mb-2" />
                <div class="flex items-center justify-center mb-2">
                  <img :src="item.logoImage" :alt="item.logoAlt" class="h-10" />
                </div>
                <div class="card-body">
                  <h3 class="card-title text-lg font-semibold text-center">{{ item.description }}</h3>
                  <p v-if="item.secondaryDescription[language]" class="card-text text-sm text-center">{{ item.secondaryDescription[language] }}</p>
                </div>
                <div class="text-center pb-5">
                  <a 
                  :property_brand="item.data.property_brand" 
                  :project_label="item.data.project_label" 
                  :property_type="item.data.property_type" 
                  :property_location="item.data.property_location" 
                  :property_price="item.data.property_price" 
                  type="button" class="btn bg-transparent text-[#948667] py-2 cursor-pointer" :data-href="item.url(language)" target="_blank" rel="noopener noreferrer"> Explore More </a>
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
        productImage: "/assets/image/page-condo/collection/the-extro.png",
        productAlt: "the extro",
        logoImage: "/assets/image/page-condo/collection/extro.png",
        logoAlt: "the extro",
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
        url: (lang) => `/${lang}/condominium/the-extro/phayathai-rangnam`
      },
      {
        productImage: "/assets/image/page-condo/collection/the-esse.png",
        logoAlt: "the esse",
        logoImage: "/assets/image/page-condo/collection/esse.png",
        logoAlt: "the esse",
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
        url: (lang) => `https://residential2.singhaestate.co.th/${lang}/condo/the-esse/singha-complex`
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

    const fontCss = () => {
      return getLanguageFromPath() == "en" ? "" : ""
    }
    return { language, title, items, titleDiv };
  }
});
