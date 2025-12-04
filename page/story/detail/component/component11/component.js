// ต้องมี import เหล่านี้ในไฟล์หลักก่อนใช้ component นี้
// import axios from 'axios';
// const { ref, onMounted, nextTick } = Vue;

const Article11Component = defineComponent({
  name: 'Article11Component',

  template: `
    <section class="article-11">
      <div>
        <div class="title-text-wrapper wrapper-space-bottom">
          <h2 class="header-text uppercase">Gallery</h2>
        </div>

        <!-- Owl Carousel -->
        <div
          class="article-11owl owl-carousel owl-theme"
          v-if="gallery.length"
        >
          <div
            class="item"
            v-for="(img, index) in gallery"
            :key="index"
          >
            <img
              class="gallery-item"
              :src="img.thumb || img.l"
              :alt="img.alt || ''"
              :gallery-item="img.l"
            >
          </div>
        </div>

        <!-- ถ้าไม่มีรูปจะไม่แสดง carousel -->
        <div v-else class="text-center py-10 text-sm text-slate-400">
          <!-- ไม่มีกล่อง gallery สำหรับบทความนี้ -->
        </div>

        <!-- Pagination / ปุ่มเลื่อน -->
        <div class="owl-peg-btn-wrapper" v-if="gallery.length">
          <div class="owl-pag">
            <p id="pag-num" class="pag-num">(1/{{ gallery.length }})</p>
          </div>
          <div class="owl-nav">
            <div class="owl-prev">
              <button type="button" id="btn-left" class="pagination-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                  <path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" data-name="4-Arrow Left"></path>
                </svg>
              </button>
            </div>
            <div class="owl-next">
              <button type="button" id="btn-right" class="pagination-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                  <path d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z" data-name="3-Arrow Right"></path>
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
    const gallery = ref([]); // [{ thumb, l, alt }]

    const { apiBaseUrl, storageUrl } = window.APP_CONFIG || {};

    // หา lang จาก URL
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const currentPath = window.location.pathname;

    // helper: แปลง string เป็น Date ถ้า error ให้เป็น null
    const toDate = (val) => {
      if (!val) return null;
      const d = new Date(val.replace(' ', 'T')); // "2025-12-04 08:40:00" → valid ISO-ish
      return isNaN(d.getTime()) ? null : d;
    };

    // เลือก article ที่ตรงกับ URL + date logic
    const pickArticleForCurrentUrl = (articles, lang) => {
      const urlField = lang === 'en' ? 'url_en' : 'url_th';

      // filter ตาม URL
      const candidates = articles.filter(a => a[urlField] === currentPath);

      if (!candidates.length) return null;

      const now = new Date();

      // 1) หา active ตัวที่ now อยู่ในช่วง date_start - date_end
      const active = candidates.filter(a => {
        const ds = toDate(a.date_start);
        const de = toDate(a.date_end);
        if (!ds && !de) return true;
        if (ds && now < ds) return false;
        if (de && now > de) return false;
        return true;
      });

      const sorter = (a, b) => {
        const aStart = toDate(a.date_start)?.getTime() || 0;
        const bStart = toDate(b.date_start)?.getTime() || 0;
        if (aStart !== bStart) return bStart - aStart; // ใหม่สุดก่อน
        const aCreated = toDate(a.created_at)?.getTime() || 0;
        const bCreated = toDate(b.created_at)?.getTime() || 0;
        return bCreated - aCreated;
      };

      if (active.length) {
        active.sort(sorter);
        return active[0];
      }

      // 2) ถ้าไม่มี active ให้เลือกใหม่สุดจาก candidates ทั้งหมด
      candidates.sort(sorter);
      return candidates[0];
    };

    // ดึงข้อมูลบทความ + gallery จาก API (/api/article)
    const fetchArticleAndGallery = async () => {
      if (!apiBaseUrl) {
        console.error('APP_CONFIG หรือ apiBaseUrl ไม่มีค่า');
        return { article: null, subGallery: [] };
      }

      try {
        const res = await axios.get(`${apiBaseUrl}/article`);

        const raw = res.data || {};
        const articles = Array.isArray(raw.data) ? raw.data : [];
        const subGallery =
          raw['sub-gallery'] ||
          raw['sub_gallery'] ||
          raw.subGallery ||
          [];

        const article = pickArticleForCurrentUrl(articles, language.value);

        return { article, subGallery };
      } catch (e) {
        console.error('fetchArticleAndGallery error:', e);
        return { article: null, subGallery: [] };
      }
    };

    // map sub-gallery → array ที่ใช้กับ template โดย match article_id
    const mapGalleryFromApi = (subGallery, articleId) => {
      if (!articleId || !Array.isArray(subGallery)) return [];

      const filtered = subGallery.filter(g => g.article_id === articleId);

      return filtered.map((g) => {
        const thumb = g.image_thumb
          ? (storageUrl ? `${storageUrl}${g.image_thumb}` : g.image_thumb)
          : '';
        const l = g.image_l
          ? (storageUrl ? `${storageUrl}${g.image_l}` : g.image_l)
          : '';
        const alt = g.image_alt || '';

        return { thumb, l, alt };
      });
    };

    const loadGallery = async () => {
      const { article, subGallery } = await fetchArticleAndGallery();

      if (!article) {
        console.warn('ไม่พบ article ที่ match กับ URL ปัจจุบัน');
        gallery.value = [];
        return;
      }

      gallery.value = mapGalleryFromApi(subGallery, article.id);
    };

    const initializeOwlCarousel = () => {
      const owl = document.querySelector('.article-11owl.owl-carousel');
      const btnLeft = document.getElementById('btn-left');
      const btnRight = document.getElementById('btn-right');

      if (!owl || !window.jQuery) return;

      $(owl).owlCarousel({
        stagePadding: 0,
        margin: 0,
        loop: true,
        nav: false,
        dots: false,
        center: true,
        responsive: {
          0: {
            items: 1,
            margin: 30,
            stagePadding: 80,
          },
          400: {
            items: 1,
            margin: 40,
            stagePadding: 100,
          },
          460: {
            items: 1.5,
            margin: 40,
            stagePadding: 70,
          },
          560: {
            items: 2,
            margin: 30,
            stagePadding: 20,
          },
          768: {
            items: 2.5,
            margin: 40,
            stagePadding: 20,
          },
          991: {
            items: 2.5,
          },
          1024: {
            items: 2.5,
            margin: 50,
            stagePadding: 100,
          },
          1366: {
            items: 2.5,
            margin: 30,
            stagePadding: 140,
          },
          1720: {
            items: 3.5,
            margin: 0,
            stagePadding: 140,
          },
        },
        onInitialized: updatePagination,
        onTranslated: updatePagination,
      });

      if (btnLeft) {
        btnLeft.addEventListener('click', function () {
          $(owl).trigger('prev.owl.carousel');
          updatePagination();
        });
      }

      if (btnRight) {
        btnRight.addEventListener('click', function () {
          $(owl).trigger('next.owl.carousel');
          updatePagination();
        });
      }

      // click รูป center → เปิด lightGallery
      $(owl).on('click', '.owl-item img', function () {
        const parentItem = $(this).closest('.owl-item');
        if (parentItem.hasClass('active') && parentItem.hasClass('center')) {
          const activeItems = $(owl).find('.owl-item');
          let currentIndex;
          const images = activeItems
            .map(function (index, item) {
              const img = $(item).find('img');
              return {
                src:
                  img[0].getAttribute('gallery-item') ||
                  img[0].getAttribute('src'),
                thumb: img[0].currentSrc,
                active:
                  $(item).hasClass('active') &&
                  $(item).hasClass('center'),
              };
            })
            .get();

          images.forEach((e, index) => {
            if (e.active) {
              currentIndex = index;
            }
          });

          const galleryLG = $('.article-11')
            .lightGallery({
              dynamic: true,
              dynamicEl: images,
              thumbnail: false,
              download: false,
              zoom: true,
              fullScreen: true,
              autoplay: false,
              controls: true,
              toolbar: false,
              hash: false,
            })
            .on('onCloseAfter.lg', function () {
              if (document.querySelector('.gallery-custom-nav')) {
                document.querySelector('.gallery-custom-nav').remove();
              }
            });

          galleryLG.data('lightGallery').index = currentIndex;

          const $lgContainer = document.querySelector('body');
          const nav = `
            <div class="gallery-custom-nav">
              <div class="owl-nav">
                <div class="owl-prev">
                  <button type="button" class="page-btn pagination-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                      <path d="M32 15H3.41l8.29-8.29-1.41-1.42-10 10a1 1 0 0 0 0 1.41l10 10 1.41-1.41L3.41 17H32z" data-name="4-Arrow Left" />
                    </svg>
                  </button>
                </div>
                <div class="owl-next">
                  <button type="button" class="page-btn pagination-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32">
                      <path d="m31.71 15.29-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 0 0 0-1.41z" data-name="3-Arrow Right" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>`;

          if ($lgContainer) {
            $lgContainer.insertAdjacentHTML('beforeend', nav);
          }

          document
            .querySelector('.gallery-custom-nav .owl-next')
            ?.addEventListener('click', () => {
              document.querySelector('.lg-actions .lg-next')?.click();
            });
          document
            .querySelector('.gallery-custom-nav .owl-prev')
            ?.addEventListener('click', () => {
              document.querySelector('.lg-actions .lg-prev')?.click();
            });
        }
      });
    };

    function updatePagination() {
      const owl = document.querySelector('.article-11owl.owl-carousel');
      const owlPag = document.getElementById('pag-num');
      if (!owl || !owlPag) return;

      const totalItems = owl.querySelectorAll('.owl-item:not(.cloned)').length;
      const centerItem = owl.querySelector('.owl-item.center');
      if (centerItem) {
        const allItems = Array.from(centerItem.parentElement.children);
        const clonedItems =
          allItems.filter((item) => item.classList.contains('cloned'))
            .length / 2;
        let currentIndex = allItems.indexOf(centerItem) - clonedItems + 1;

        if (currentIndex > totalItems) {
          currentIndex = 1;
        } else if (currentIndex < 1) {
          currentIndex += totalItems;
        }
        owlPag.textContent = `(${currentIndex}/${totalItems})`;
      }

      gsap.registerPlugin(ScrollTrigger);
    }

    const init = () => {
      AOS.init();
      if (gallery.value.length) {
        initializeOwlCarousel();
      }
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      await loadGallery();
      nextTick(() => {
        init();
      });
    });

    return { language, gallery };
  },
});
