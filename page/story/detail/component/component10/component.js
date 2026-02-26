const Article10Component = defineComponent({
  name: 'Article10Component',
  template: `
    <section class="article-10">
      <div class="title-text-wrapper wrapper-space-bottom">
        <h2 class="header-text">{{ titleText }}</h2>
      </div>

      <img
        class="campaign-form-detail-bg"
        src="/assets/image/estate_article/Rectangle4.webp"
        alt="bg"
      />

      <div class="campaign-detail-articlesRecommendation-wrapper lg:!w-[70%] md:!w-[90%]">
        <a
          v-for="item in recommended"
          :key="item.id"
          :href="item.link"
          class="articlesRecommendation-image-wrapper group"
        >
          <!-- Desktop -->
          <img
            class="articlesRecommendation-img md:block hidden group-hover:scale-110 transition-all"
            :src="item.image"
            :alt="item.titlePlain"
            :style="{ objectFit: 'cover', objectPosition: 'center' }"
          />
          <!-- Mobile -->
          <img
            class="articlesRecommendation-img md:hidden block"
            :src="item.image"
            :alt="item.titlePlain"
            :style="{ objectFit: 'cover', objectPosition: 'center' }"
          />

          <img
            class="articlesRecommendation-img-ef"
            src="/assets/image/estate_article/effect.webp"
            alt="bg"
          />

          <div class="articlesRecommendation-text-wrapper lg:!p-4 md:!p-2">
            <!-- ใช้ title[th/en] ตามภาษา -->
            <h3 v-html="item.titleHtml"></h3>
          </div>
        </a>
      </div>

      <div class="btn-wrapper wrapper-space-bottom">
        <a
          :href="moreLink"
          target="_blank"
          class="exploreArticles-btn group flex w-fit mx-auto !pr-2"
        >
          {{ moreText }}
          <span class="my-auto">
            <img
              class="group-hover:block hidden"
              src="/assets/icon/explore.svg"
              alt="icon"
            >
            <img
              class="group-hover:hidden"
              src="/assets/icon/explore-white.svg"
              alt="icon"
            >
          </span>
        </a>
      </div>
    </section>
  `,

  setup() {
    const language  = ref('th');
    const titleText = ref('บทความเกี่ยวข้อง ');
    const moreText  = ref('ดูเพิ่มเติม');
    const moreLink  = ref('#');
    const articles  = ref([]);

    const API_BASE     = window.APP_CONFIG?.apiBaseUrl   || null;
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl   || `${window.location.origin}/storage/`;
    const ARTICLE_DIR  = 'uploads/article/';

    const getLanguageFromPath = () => {
      const path  = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const buildImageUrl = (file) => {
      if (!file) return '';
      if (/^https?:\/\//i.test(file)) return file;

      if (file.startsWith('uploads/')) {
        return `${STORAGE_BASE}${file.replace(/^\/+/, '')}`;
      }
      return `${STORAGE_BASE}${ARTICLE_DIR}${file.replace(/^\/+/, '')}`;
    };

    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE}/article`);
        articles.value = Array.isArray(res.data?.data) ? res.data.data : [];
      } catch (err) {
        console.error('Error loading articles from API:', err);
      }
    };

    const recommended = computed(() => {
      if (!articles.value.length) return [];

      const path = window.location.pathname;
      const lang = language.value;

      // หา article ปัจจุบันจาก URL
      const matched = articles.value.filter(a => {
        const urlTh = a.url_th || '';
        const urlEn = a.url_en || '';
        return lang === 'en' ? urlEn === path : urlTh === path;
      });

      let currentArticleId = null;
      if (matched.length) {
        matched.sort((a, b) => {
          const da = new Date(a.date_start || a.created_at || 0).getTime();
          const db = new Date(b.date_start || b.created_at || 0).getTime();
          return db - da;
        });
        currentArticleId = matched[0].id;
      }

      // บทความอื่นเรียงจากใหม่ไปเก่า
      const others = articles.value
        .filter(a => a.id !== currentArticleId)
        .sort((a, b) => {
          const da = new Date(a.date_start || a.created_at || 0).getTime();
          const db = new Date(b.date_start || b.created_at || 0).getTime();
          return db - da;
        });

      return others.slice(0, 3).map(a => {
        const highlightFile =
          a.highlight_banner_image ||
          a.detail_banner_image ||
          a.lifestyle_image ||
          a.image_master ||
          a.og_image_small;

        const imgUrl = buildImageUrl(highlightFile);

        // ✅ ใช้ title[th/en] ตรง ๆ ตามที่ขอ
        const titleFromLang = (a.title && a.title[lang]) || '';

        return {
          id: a.id,
          link: lang === 'en' ? (a.url_en || '#') : (a.url_th || '#'),
          image: imgUrl,
          titleHtml: titleFromLang,                    // ใช้ใน h3 (v-html)
          titlePlain: titleFromLang || a.meta_title || '' // กัน alt ว่างเกินไป
        };
      });
    });

    const initAnimations = () => {
      if (window.AOS) {
        AOS.init();
      }
      if (!window.gsap || !window.ScrollTrigger) return;

      gsap.registerPlugin(ScrollTrigger);

      const titleEl = document.querySelector('.article-10 .title-text-wrapper');
      if (titleEl) {
        gsap.from(titleEl, {
          opacity: 0,
          y: 20,
          duration: 1,
          scrollTrigger: {
            trigger: titleEl,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
          }
        });
      }

      const itemsWrapper = document.querySelector(
        '.article-10 .campaign-detail-articlesRecommendation-wrapper'
      );
      if (itemsWrapper && itemsWrapper.children.length) {
        gsap.from(itemsWrapper.children, {
          opacity: 0,
          y: 20,
          duration: 1,
          stagger: 0.4,
          scrollTrigger: {
            trigger: itemsWrapper,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
          }
        });
      }
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      moreLink.value = `/${language.value}/stories`;

      if (language.value === 'en') {
        titleText.value = 'ARTICLES RECOMMENDATION';
        moreText.value  = 'Explore more';
      } else {
        titleText.value = 'บทความเกี่ยวข้อง ';
        moreText.value  = 'ดูเพิ่มเติม';
      }

      await fetchArticles();
      nextTick(initAnimations);
    });

    return {
      language,
      titleText,
      recommended,
      moreText,
      moreLink
    };
  }
});
