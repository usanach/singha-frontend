const CollectionComponent = defineComponent({
  name: 'CollectionComponent',
  template: `
    <section class="onview -mt-1 become-agent-main !pt-0" id="CollectionComponent" data-section="our_house_brand_collection">
      <div class="portfolio-section">
        <img class="portfolio-bg" src="/assets/image/becomeAgent/portfolio-bg.png" alt="bg" />
        <div class="title-text-wrapper wrapper-space-bottom">
          <h2 ref="titleDiv" class="header-text" v-html="title[language]"></h2>
        </div>

        <div class="portfolio owl-carousel owl-theme min-h-[560px]">
          <div class="item-card" v-for="(item, index) in items" :key="index"  @click="goToSlide(index)">
            <div class="card-image-wrapper">
              <img class="card-image-item" :src="item.image" :alt="item.alt" />
            </div>
            <div class="name-image-wrapper">
              <h3 class="h-full">
                <img class="name-image-item" :class="[item.alt=='SIRANINN'?'!mt-3':'']" :src="item.logo" :alt="item.alt" />
              </h3>
            </div>
            <div class="card-text-wrapper" :class="[item.alt=='SIRANINN'?'!mt-4':'',]">
              <div class="text-desc-wrapper wrapper-space-bottom">
                <p class="text-desc">{{ item.description }}</p>
              </div>
              <div class="text-desc-small-wrapper wrapper-space-bottom">
                <p class="text-desc-small">{{ item.secondaryDescription }}</p>
              </div>
            </div>
            <div class="card-button-wrapper">
              <a :href="item.url[language]" target="_blank"
                  :property_brand="item.data.brand" 
                  :project_label="item.data.label" 
                  :property_type="item.data.type" 
                  :property_location="item.data.location" 
                  :property_price="item.data.price" 
                  >
                <button class="card-button">{{more[language]}}</button>
              </a>
            </div>
          </div>
        </div>

        <div class="owl-peg-btn-wrapper">
          <div class="owl-nav justify-between !w-full">
            <div class="owl-prev mx-auto">
              <button type="button" id="portfolio-btn-left" class="page-btn pagination-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                  <path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" data-name="4-Arrow Left" />
                </svg>
              </button>
            </div>
            <div class="owl-next mx-auto">
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

    // Function to extract language from the URL
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };
    // Dynamic dataset for portfolio carousel items
    const items = [
      {
        image: "/assets/image/product-card/SIRANINN.webp",
        alt: "SIRANINN",
        logo: "/assets\/image\/page-house\/logo-svg-singha-estate.png",
        description: "TRUE LEGACY LIVES NOW",
        secondaryDescription: "",
        url: {
          en: "https://residential2.singhaestate.co.th/en/singlehouse/siraninn/pattanakarn",
          th: "https://residential2.singhaestate.co.th/th/singlehouse/siraninn/pattanakarn"
        },
        data: {
          brand: "SIRANINN",
          label: "Last_Unit",
          type: "detached_house",
          location: "Pattanakarn",
          price: "Start 195 MB."
        },
      },
      {
        image: "/assets/image/product-card/3.png",
        alt: "s'rin",
        logo: "/assets/image/becomeAgent/12-1.png",
        description: "Infinite Living",
        secondaryDescription: "",
        url: {
          en: "/en/house/detached-house/srin",
          th: "/th/house/detached-house/srin"
        },
        data: {
          brand: "S'RIN",
          label: "new_project",
          type: "detached_house",
          location: "Ratchaphruek - Sai 1",
          price: "42 - 75 MB."
        },
      },
      {
        image: "/assets/image/product-card/santiburi.webp",
        alt: "santiburi",
        logo: "/assets/image/becomeAgent/13-1.png",
        description: "CONNOISSEUR OF Happiness",
        secondaryDescription: "",
        url: {
          en: "https://residential2.singhaestate.co.th/en/singlehouse/santiburi/santiburi-the-residences",
          th: "https://residential2.singhaestate.co.th/th/singlehouse/santiburi/santiburi-the-residences"
        },
        data: {
          brand: "SANTIBURI",
          label: "sold_Out",
          type: "detached_house",
          location: "Ramintra",
          price: ""
        },
      },
      {
        image: "/assets/image/product-card/SHAWN.webp",
        alt: "shawn",
        logo: "/assets/image/becomeAgent/15-1.png",
        description: "LIVE SHAWN WAY",
        secondaryDescription: "",
        url: {
          en: "/en/house/detached-house/shawn",
          th: "/th/house/detached-house/shawn"
        },
        data: {
          brand: "SHAWN",
          label: "new_project",
          type: "detached_house",
          location: "Ramintra",
          price: "19.9 - 35 MB."
        },
      }
    ];


    const goToSlide = (index) => {
      if ($('.portfolio.owl-carousel')) {
        $('.portfolio.owl-carousel').trigger('to.owl.carousel', [index, 300]);
      }
    };

    const more = {
      en: "Explore More",
      th: "ดูเพิ่มเติม"
    }
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

        // titleDiv.value.classList.add(fontCss())
      });
    });

    const fontCss = () => {
      return getLanguageFromPath() == "en" ? "" : ""
    }
    return { language, title, items, fontCss, titleDiv, goToSlide, more };
  }
});
