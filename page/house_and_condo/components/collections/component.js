// ถ้ายังไม่ได้ import axios / ref / onMounted / computed / nextTick ให้เพิ่มบรรทัดนี้ด้านบนสุด
// import axios from 'axios';
// const { ref, onMounted, computed, nextTick } = Vue;

const CollectionComponent = defineComponent({
  name: 'CollectionComponent',
  template: `
    <section
      class="onview -mt-1 become-agent-main !pt-0"
      id="CollectionComponent"
      :data-section="collectionType === 'house'
        ? 'our_house_brand_collection'
        : 'our_condominium_brand_collection'"
    >
      <!-- ================= CONDO COLLECTION ================= -->
      <div
        v-if="collectionType === 'condo'"
        class="portfolio-section bg-[url('/assets/image/page-condo/collection/bg.webp')]"
      >
        <div class="title-text-wrapper wrapper-space-bottom -mt-1">
          <h2 ref="titleDiv" class="header-text" v-html="title[language]"></h2>
        </div>

        <div class="container mt-5">
          <!-- (CONDO) ถ้าการ์ด <= 2 ใช้ CARD STYLE CONDO (GRID) -->
          <div
            v-if="items.length <= 2"
            class="grid md:grid-cols-2 md:grid-row-1 grid-row-2 gap-8 lg:w-3/5 md:w-4/5 mx-auto"
          >
            <div
              v-for="(item, index) in items"
              :key="index"
              class="card bg-white/50 backdrop-blur p-5 shadow hover:shadow-lg"
            >
              <div class="h-full flex flex-col justify-between gap-5">
                <img :src="item.image" :alt="item.alt" class="w-full object-cover mb-2" />
                <div class="flex items-center justify-center mb-2">
                  <img :src="item.logo" :alt="item.alt" class="h-10 my-auto" />
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
                <div class="text-center pb-5 !mt-3">
                  <a
                    :property_brand="item.data.property_brand"
                    :project_label="item.data.project_label"
                    :property_type="item.data.property_type"
                    :property_location="item.data.property_location"
                    :property_price="item.data.property_price"
                    :href="item.url[language]"
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

          <!-- (CONDO) ถ้าการ์ด > 2 ใช้ SLIDE TEMPLATE แบบ HOUSE -->
          <div v-else>
            <div class="portfolio owl-carousel owl-theme min-h-[560px]">
              <div
                class="item-card  gap-5"
                v-for="(item, index) in items"
                :key="index"
              >
                <div class="card-image-wrapper">
                  <img class="card-image-item" :src="item.image" :alt="item.alt" />
                </div>

                <div class="name-image-wrapper">
                  <h3 class="h-full flex">
                    <img
                      class="name-image-item !h-10 my-auto"
                      :src="item.logo"
                      :alt=""
                    />
                  </h3>
                </div>

                <div class="card-text-wrapper">
                  <div class="text-desc-wrapper wrapper-space-bottom">
                    <p class="text-desc">{{ item.description }}</p>
                  </div>
                  <div class="text-desc-small-wrapper wrapper-space-bottom">
                    <p class="text-[20px]">{{ item.secondaryText }}</p>
                  </div>
                </div>

                <div class="card-button-wrapper">
                  <a
                    :href="item.url[language]"
                    target="_blank"
                    rel="noopener noreferrer"
                    :property_brand="item.data.property_brand"
                    :project_label="item.data.project_label"
                    :property_type="item.data.property_type"
                    :property_location="item.data.property_location"
                    :property_price="item.data.property_price"
                  >
                    <button class="card-button">{{ more[language] }}</button>
                  </a>
                </div>
              </div>
            </div>

            <!-- ปุ่มเลื่อน Owl (CONDO SLIDE) -->
            <div class="owl-peg-btn-wrapper mt-6">
              <div class="owl-nav justify-between !w-full flex">
                <div class="owl-prev mx-auto">
                  <button
                    type="button"
                    id="portfolio-btn-left"
                    class="page-btn pagination-btn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                      <path
                        d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
                        data-name="4-Arrow Left"
                      />
                    </svg>
                  </button>
                </div>
                <div class="owl-next mx-auto">
                  <button
                    type="button"
                    id="portfolio-btn-right"
                    class="page-btn pagination-btn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                      <path
                        d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z"
                        data-name="3-Arrow Right"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= HOUSE COLLECTION ================= -->
      <div v-else class="portfolio-section">
        <img class="portfolio-bg" src="/assets/image/becomeAgent/portfolio-bg.webp" alt="bg" />
        <div class="title-text-wrapper wrapper-space-bottom">
          <h2 ref="titleDiv" class="header-text" v-html="title[language]"></h2>
        </div>

        <div class="container mt-5">
          <!-- (HOUSE) ถ้าการ์ด <= 2 ใช้ CARD STYLE CONDO -->
          <div
            v-if="items.length <= 2"
            class="grid md:grid-cols-2 md:grid-row-1 grid-row-2 gap-8 lg:w-3/5 md:w-4/5 mx-auto"
          >
            <div
              v-for="(item, index) in items"
              :key="index"
              class="card bg-white/50 backdrop-blur p-5 shadow hover:shadow-lg"
            >
              <div class="h-full flex flex-col gap-5">
                <img :src="item.image" :alt="item.alt" class="w-full object-cover mb-2" />
                <div class="flex items-center justify-center mb-2">
                  <img :src="item.logo" :alt="item.alt" class="h-10  my-auto" />
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
                <div class="text-center pb-5 !mt-3">
                  <a
                    :href="item.url[language]"
                    target="_blank"
                    rel="noopener noreferrer"
                    :property_brand="item.data.brand"
                    :project_label="item.data.label"
                    :property_type="item.data.type"
                    :property_location="item.data.location"
                    :property_price="item.data.price"
                  >
                    <button class="btn bg-transparent text-[#948667] py-2 cursor-pointer">
                      {{ more[language] }}
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- (HOUSE) ถ้าการ์ด > 2 ใช้ SLIDE แบบ HOUSE -->
          <div v-else>
            <div class="portfolio owl-carousel owl-theme min-h-[560px]">
              <div
                class="item-card  gap-5"
                v-for="(item, index) in items"
                :key="index"
                @click="goToSlide(index)"
              >
                <div class="card-image-wrapper">
                  <img class="card-image-item" :src="item.image" :alt="item.alt" />
                </div>
                <div class="name-image-wrapper">
                  <h3 class="h-full flex">
                    <img
                      class="name-image-item !h-10 my-auto"
                      :class="[item.alt=='SIRANINN'?'!mt-3':'']"
                      :src="item.logo"
                      :alt="item.alt"
                    />
                  </h3>
                </div>
                <div
                  class="card-text-wrapper"
                  :class="[item.alt=='SIRANINN'?'!mt-4':'']"
                >
                  <div class="text-desc-wrapper wrapper-space-bottom">
                    <p class="text-desc">{{ item.description }}</p>
                  </div>
                  <div class="text-desc-small-wrapper wrapper-space-bottom">
                    <p class="text-[20px]">{{ item.secondaryText }}</p>
                  </div>
                </div>
                <div class="card-button-wrapper">
                  <a
                    :href="item.url[language]"
                    target="_blank"
                    :property_brand="item.data.brand"
                    :project_label="item.data.label"
                    :property_type="item.data.type"
                    :property_location="item.data.location"
                    :property_price="item.data.price"
                  >
                    <button class="card-button">{{ more[language] }}</button>
                  </a>
                </div>
              </div>
            </div>

            <div class="owl-peg-btn-wrapper">
              <div class="owl-nav justify-between !w-full">
                <div class="owl-prev mx-auto">
                  <button
                    type="button"
                    id="portfolio-btn-left"
                    class="page-btn pagination-btn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                      <path
                        d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z"
                        data-name="4-Arrow Left"
                      />
                    </svg>
                  </button>
                </div>
                <div class="owl-next mx-auto">
                  <button
                    type="button"
                    id="portfolio-btn-right"
                    class="page-btn pagination-btn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                      <path
                        d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z"
                        data-name="3-Arrow Right"
                      />
                    </svg>
                  </button>
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
    const collectionType = ref('condo'); // 'condo' | 'house'

    const { apiBaseUrl, storageUrl } = window.APP_CONFIG || {};

    const titles = {
      condo: {
        en: "Our condominium <br/>brand Collection",
        th: "​รวมโครงการคอนโดมิเนียม​",
      },
      house: {
        en: "Our house brand <br/>Collection",
        th: "​รวมโครงการบ้านเดี่ยว​",
      },
    };

    const title = computed(() => titles[collectionType.value] || titles.condo);

    const more = {
      en: "Explore More",
      th: "ดูเพิ่มเติม",
    };

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const detectCollectionTypeFromPath = () => {
      const path = window.location.pathname.toLowerCase();

      if (path.includes('/house')||path.includes('/contact-us/partner-agent')) {
        return 'house';
      }
      if (path.includes('/condominium') || path.includes('/condo')) {
        return 'condo';
      }

      return 'condo';
    };

    const fontCss = () => {
      return getLanguageFromPath() === 'en' ? '' : '';
    };

    const fetchCollection = async () => {
      try {
        if (!apiBaseUrl) {
          console.error('APP_CONFIG หรือ apiBaseUrl ไม่มีค่า');
          return;
        }

        const type = collectionType.value;
        const endpoint =
          type === 'house'
            ? `${apiBaseUrl}/house-collection`
            : `${apiBaseUrl}/condo-collection`;

        const res = await axios.get(endpoint);
        const apiItems = res.data && res.data.data ? res.data.data : [];

        items.value = apiItems.map((item) => {
          const folder =
            type === 'house'
              ? 'uploads/house_collection/'
              : 'uploads/condo_collection/';

          const imagePath = storageUrl ? `${storageUrl}${folder}${item.image}` : item.image;
          const logoPath  = storageUrl ? `${storageUrl}${folder}${item.logo}`  : item.logo;

          const taglineTh = item.brand_tagline_th || '';
          const taglineEn = item.brand_tagline_en || '';

          const urlObj = item.url || { th: '#', en: '#' };

          return {
            image: imagePath,
            alt: item.property_brand || item.description || '',
            logo: logoPath,
            description:  item.description || '',
            secondaryDescription: {
              th: taglineTh,
              en: taglineEn,
            },
            secondaryText: taglineTh || taglineEn || '',
            data: {
              // สำหรับ condo (ใช้ property_* ใน data-attr)
              property_brand: item.property_brand || '',
              project_label: item.project_label || '',
              property_type: item.property_type || (type === 'house' ? 'detached_house' : 'Condominium'),
              property_location: item.property_location || '',
              property_price: taglineEn || taglineTh || '',
              // สำหรับ house (ใช้ brand/label/type/location/price)
              brand: item.property_brand || '',
              label: item.project_label || '',
              type: item.property_type || (type === 'house' ? 'detached_house' : 'Condominium'),
              location: item.property_location || '',
              price: taglineEn || taglineTh || '',
            },
            url: urlObj,
          };
        });
      } catch (err) {
        console.error('Error loading collection:', err);
      }
    };

    // Owl สำหรับทั้ง condo & house (ใช้ template เดียวกันตอน slide)
    const initOwl = () => {
      if (!window.jQuery || !$('.portfolio.owl-carousel').length) return;
      if (items.value.length <= 2) return; // น้อยกว่าเท่ากับ 2 ใช้ grid ไม่ต้อง init

      const $carousel = $('.portfolio.owl-carousel');

      if ($carousel.hasClass('owl-loaded')) {
        $carousel.trigger('destroy.owl.carousel');
      }

      const initialize = () => {
        $carousel.owlCarousel({
          loop: true,
          nav: false,
          dots: false,
          center: true,
          margin: 0,
          onInitialized: (e) => {
            let idx = e.item.index;
            $carousel.find('.owl-item.center').removeClass('center');
            $carousel.find('.owl-item.medium').removeClass('medium');
            $carousel.find('.owl-item').eq(idx).addClass('center');
            $carousel.find('.owl-item').eq(idx - 1).addClass('medium');
            $carousel.find('.owl-item').eq(idx + 1).addClass('medium');
          },
          onTranslate: (e) => {
            let idx = e.item.index;
            $carousel.find('.owl-item.center').removeClass('center');
            $carousel.find('.owl-item.medium').removeClass('medium');
            $carousel.find('.owl-item').eq(idx).addClass('center');
            $carousel.find('.owl-item').eq(idx - 1).addClass('medium');
            $carousel.find('.owl-item').eq(idx + 1).addClass('medium');
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
              items: 2,
              stagePadding: 300,
            },
          },
        });
      };

      initialize();

      const btnLeft = document.getElementById('portfolio-btn-left');
      const btnRight = document.getElementById('portfolio-btn-right');

      if (btnLeft) {
        btnLeft.onclick = () => {
          $carousel.trigger('prev.owl.carousel');
        };
      }
      if (btnRight) {
        btnRight.onclick = () => {
          $carousel.trigger('next.owl.carousel');
        };
      }

      let resizeTimeout;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
          if ($carousel.hasClass('owl-loaded')) {
            $carousel.trigger('destroy.owl.carousel');
          }
          initialize();
        }, 50);
      });
    };

    const goToSlide = (index) => {
      if (!window.jQuery || !$('.portfolio.owl-carousel').length) return;
      $('.portfolio.owl-carousel').trigger('to.owl.carousel', [index, 300]);
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      collectionType.value = detectCollectionTypeFromPath();

      await fetchCollection();
      await nextTick();

      // ถ้าการ์ด > 2 (ทั้ง condo/house) ให้ใช้ slide สไตล์เดียวกัน
      if (items.value.length > 2) {
        initOwl();
      }
    });

    return {
      language,
      title,
      items,
      titleDiv,
      more,
      fontCss,
      goToSlide,
      collectionType,
    };
  },
});
