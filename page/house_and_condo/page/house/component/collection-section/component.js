const CollectionComponent = defineComponent({
  name: 'CollectionComponent',
  template: `
    <section class="onview -mt-1 become-agent-main !pt-0" id="CollectionComponent" data-section="our_house_brand_collection">
      <div class="portfolio-section">
        <img class="portfolio-bg" src="/assets/image/becomeAgent/portfolio-bg.png" alt="bg" />
        <div class="title-text-wrapper wrapper-space-bottom">
          <h2 ref="titleDiv" class="header-text" v-html="title[language]"></h2>
        </div>

        <div class="portfolio owl-carousel owl-theme">
          <div class="item-card" v-for="(item, index) in items" :key="index">
            <div class="card-image-wrapper">
              <img class="card-image-item" :src="item.productImage" :alt="item.productAlt" />
            </div>
            <div class="name-image-wrapper">
              <h3 class="h-full">
                <img class="name-image-item" :src="item.logoImage" :alt="item.logoAlt" />
              </h3>
            </div>
            <div class="card-text-wrapper" :class="[item.productAlt=='SIRANINN'?'!mt-0':'']">
              <div class="text-desc-wrapper wrapper-space-bottom">
                <p class="text-desc">{{ item.description }}</p>
              </div>
              <div class="text-desc-small-wrapper wrapper-space-bottom">
                <p class="text-desc-small">{{ item.secondaryDescription }}</p>
              </div>
            </div>
            <div class="card-button-wrapper">
              <a :data-href="item.url(language)" target="_blank"
                  :property_brand="item.data.property_brand" 
                  :project_label="item.data.project_label" 
                  :property_type="item.data.property_type" 
                  :property_location="item.data.property_location" 
                  :property_price="item.data.property_price" 
                  >
                <button class="card-button">Explore More</button>
              </a>
            </div>
          </div>
        </div>

        <div class="owl-peg-btn-wrapper">
          <div class="owl-nav lg:!justify-between !justify-end !w-full">
            <div class="owl-prev">
              <button type="button" id="portfolio-btn-left" class="page-btn pagination-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                  <path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" data-name="4-Arrow Left" />
                </svg>
              </button>
            </div>
            <div class="owl-next">
              <button type="button" id="portfolio-btn-right" class="page-btn pagination-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                  <path d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z" data-name="3-Arrow Right" />
                </svg>
              </button>
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
      en: "Our house brand <br/>Collection",
      th: "​รวมโครงการบ้านเดี่ยว​"
    };

    // Dynamic dataset for portfolio carousel items
    const items = [
      {
        productImage: "/assets/image/product-card/SIRANINN.webp",
        productAlt: "SIRANINN",
        logoImage: "/assets\/image\/page-house\/logo-svg-singha-estate.png",
        logoAlt: "SIRANINN",
        description: "TRUE LEGACY LIVES NOW",
        secondaryDescription: "",
        url: (lang) => `https://residential2.singhaestate.co.th/${lang}/singlehouse/siraninn/pattanakarn`,
        data: {
          property_brand: "SIRANINN",
          project_label: "Last_Unit",
          property_type: "detached_house",
          property_location: "Pattanakarn",
          property_price: "Start 195 MB."
        },
      },
      {
        productImage: "/assets/image/product-card/3.png",
        productAlt: "s'rin",
        logoImage: "/assets/image/becomeAgent/12-1.png",
        logoAlt: "s'rin",
        description: "Infinite Living",
        secondaryDescription: "",
        url: (lang) => `https://residential2.singhaestate.co.th/singlehouse/srin/ratchapruek-sai1/${lang}`,
        data: {
          property_brand:  "S'RIN",
          project_label: "new_project",
          property_type: "detached_house",
          property_location: "Ratchaphruek - Sai 1",
          property_price: "42 - 75 MB."
        },
      },
      {
        productImage: "/assets/image/product-card/santiburi.webp",
        productAlt: "santiburi",
        logoImage: "/assets/image/becomeAgent/13-1.png",
        logoAlt: "santiburi",
        description: "CONNOISSEUR OF Happiness",
        secondaryDescription: "",
        url: (lang) => `https://residential2.singhaestate.co.th/${lang}/singlehouse/santiburi/santiburi-the-residences`,
        data: {
          property_brand: "SANTIBURI",
          project_label: "sold_Out",
          property_type: "detached_house",
          property_location: "Ramintra",
          property_price: ""
        },
      },
      {
        productImage: "/assets/image/product-card/SHAWN.webp",
        productAlt: "shawn",
        logoImage: "/assets/image/becomeAgent/15-1.png",
        logoAlt: "shawn",
        description: "LIVE SHAWN WAY",
        secondaryDescription: "",
        url: (lang) => `/${lang}/house/detached-house/shawn/panya-indra`,
        data: {
          property_brand: "SHAWN",
          project_label: "new_project",
          property_type: "detached_house",
          property_location: "Ramintra",
          property_price: "19.9 - 35 MB."
        },
      }
    ];

    // Function to extract language from the URL
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'en';
    };

    onMounted(() => {
      language.value = getLanguageFromPath();

      // Initialize carousel once DOM content is ready
      document.addEventListener('DOMContentLoaded', function () {
        const btnLeft1 = document.getElementById('portfolio-btn-left');
        const btnRight1 = document.getElementById('portfolio-btn-right');

        function initializePortfolioCarousel() {
          $('.portfolio.owl-carousel').owlCarousel({
            loop: true,
            nav: false,
            dots: false,
            center: true,
            margin: 0,
            onInitialized: (e) => {
              let idx = e.item.index;
              $('.portfolio.owl-carousel .owl-item.center').removeClass('center');
              $('.portfolio.owl-carousel .owl-item.medium').removeClass('medium');
              $('.portfolio.owl-carousel .owl-item').eq(idx).addClass('center');
              $('.portfolio.owl-carousel .owl-item').eq(idx - 1).addClass('medium');
              $('.portfolio.owl-carousel .owl-item').eq(idx + 1).addClass('medium');
            },
            onTranslate: (e) => {
              let idx = e.item.index;
              $('.portfolio.owl-carousel .owl-item.center').removeClass('center');
              $('.portfolio.owl-carousel .owl-item.medium').removeClass('medium');
              $('.portfolio.owl-carousel .owl-item').eq(idx).addClass('center');
              $('.portfolio.owl-carousel .owl-item').eq(idx - 1).addClass('medium');
              $('.portfolio.owl-carousel .owl-item').eq(idx + 1).addClass('medium');
            },
            responsive: {
              0: {
                items: 1,
                stagePadding: 50,
              },
              1024: {
                items: 2,
                stagePadding: 300,
              },
              1440: {
                items: 2.5,
                stagePadding: 300,
              }
            },
          });
        }

        initializePortfolioCarousel();

        btnLeft1.addEventListener('click', function () {
          $('.portfolio.owl-carousel').trigger('prev.owl.carousel');
        });

        btnRight1.addEventListener('click', function () {
          $('.portfolio.owl-carousel').trigger('next.owl.carousel');
        });

        let resizeTimeout;
        window.addEventListener('resize', function () {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(function () {
            $('.portfolio.owl-carousel').owlCarousel('destroy');
            initializePortfolioCarousel();
          }, 50);
        });

        titleDiv.value.classList.add(fontCss())
      });
    });

    const fontCss = () => {
      return getLanguageFromPath() == "en" ? "!font-['Cinzel']" : "!font-['IBM_Plex_Sans_Thai']"
    }
    return { language, title, items, fontCss, titleDiv };
  }
});
