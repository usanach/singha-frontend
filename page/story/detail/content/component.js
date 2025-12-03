// Define the Content component
const ContentComponent = defineComponent({
  name: 'ContentComponent',
  template: `
    <div class="section-wrapper">
      <!-- BLOCK: component1 และ component3 -->
      <section
        v-for="block in blocks13"
        :key="block.id"
        class="article-content-block py-10"
        :style="{ backgroundColor: block.bgColor }"
      >
        <div class="container">
          <!-- item2 เป็น HTML จาก Quill -->
          <div class="ql-editor" v-html="block.html"></div>
        </div>
      </section>

      <!-- BLOCK: component2 (template article-5) -->
      <section
        v-for="block in blocks2"
        :key="block.id"
        class="article-5"
      >
        <div class="article-5-wrapper">
          <div class="text-article-wrapper">
            <div class="image-wrapper">
              <img
                class="article-5-image aos-init aos-animate"
                :src="block.image"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-easing="linear"
                :alt="block.alt || 'article image'"
              >
            </div>
            <div class="text-wrapper">
              <div class="article-desc-text-wrapper !mb-10">
                <!-- item1 เป็น HTML เนื้อหา -->
                <div class="ql-editor" v-html="block.html"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- BLOCK: component4 (template article-2) -->
      <section
        v-for="block in blocks4"
        :key="block.id"
        class="article-2 !bg-white mt-10"
      >
        <div class="article-2-wrapper">
          <div class="text-wrapper my-auto">
            <div class="article-header-wrapper">
              <!-- ถ้าอยากใช้ heading จาก HTML ก็ใส่ใน Quill / item1 ได้ -->
              <div class="ql-editor" v-html="block.html"></div>
            </div>
          </div>
          <div class="image-wrapper lg:mx-0 mx-auto">
            <img
              class="article-5-image aos-init aos-animate"
              :src="block.image"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-easing="linear"
              :alt="block.alt || 'article image'"
            >
          </div>
        </div>
      </section>
    </div>
  `,

  setup() {
    const language = ref('th');        // th/en จาก URL
    const blocks13 = ref([]);          // sub-section: component1 และ component3
    const blocks2  = ref([]);          // sub-section: component2
    const blocks4  = ref([]);          // sub-section: component4

    // ใช้ config.js ในการเลือก base URL
    const API_BASE     = window.APP_CONFIG?.apiBaseUrl   || 'http://127.0.0.1:8000/api';
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl   || `${window.location.origin}/storage/`;

    // อ่านภาษา
    const getLanguageFromPath = () => {
      const path  = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    // ดึงข้อมูลจาก /api/article แล้ว map sub-section
    const fetchContentFromApi = async () => {
      try {
        const res = await axios.get(`${API_BASE}/article`);
        const articles    = Array.isArray(res.data?.data) ? res.data.data : [];
        const subSections = Array.isArray(res.data?.['sub-section']) ? res.data['sub-section'] : [];

        const path = window.location.pathname;

        // หา article ที่ path ตรงกับ url_th / url_en
        const matchedArticles = articles.filter((a) => {
          const urlTh = a.url_th || '';
          const urlEn = a.url_en || '';
          if (language.value === 'en') {
            return urlEn === path;
          }
          return urlTh === path;
        });

        if (!matchedArticles.length) {
          console.warn('No article matched current URL for content');
          return;
        }

        // ถ้ามีหลายตัว เลือกตัวล่าสุดตาม date_start / created_at
        matchedArticles.sort((a, b) => {
          const da = new Date(a.date_start || a.created_at || 0).getTime();
          const db = new Date(b.date_start || b.created_at || 0).getTime();
          return db - da;
        });

        const articleId = matchedArticles[0].id;

        // -----------------------
        // 1) component1 และ component3
        // -----------------------
        const related13 = subSections
          .filter(s =>
            s.article_id === articleId &&
            s.component_name === 'component1 และ component3'
          )
          .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0));

        blocks13.value = related13.map(item => ({
          id: item.id,
          bgColor: item.item1 || '#FFFFFF',   // item1 = background color
          html: item.item2 || ''              // item2 = HTML จาก Quill
        }));

        // -----------------------
        // 2) component2 → ใช้ template article-5
        //    - item2 = path รูป
        //    - item1 = HTML เนื้อหา (จาก Quill)
        // -----------------------
        const related2 = subSections
          .filter(s =>
            s.article_id === articleId &&
            s.component_name === 'component2'
          )
          .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0));

        blocks2.value = related2.map(item => {
          let imagePath = item.item2 || '';
          let fullImage = imagePath;
          if (imagePath && !/^https?:\/\//i.test(imagePath)) {
            imagePath = imagePath.replace(/^\/+/, '');
            fullImage = `${STORAGE_BASE}${imagePath}`;
          }

          return {
            id: item.id,
            image: fullImage,
            html: item.item1 || '',
            alt: ''
          };
        });

        // -----------------------
        // 3) component4 → ใช้ template article-2
        //    - item2 = path รูป
        //    - item1 = HTML เนื้อหา (จาก Quill)
        // -----------------------
        const related4 = subSections
          .filter(s =>
            s.article_id === articleId &&
            s.component_name === 'component4'
          )
          .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0));

        blocks4.value = related4.map(item => {
          let imagePath = item.item2 || '';
          let fullImage = imagePath;
          if (imagePath && !/^https?:\/\//i.test(imagePath)) {
            imagePath = imagePath.replace(/^\/+/, '');
            fullImage = `${STORAGE_BASE}${imagePath}`;
          }

          return {
            id: item.id,
            image: fullImage,
            html: item.item1 || '',
            alt: ''
          };
        });

      } catch (error) {
        console.error('Failed to load article content from API:', error);
      }
    };

    const init = () => {
      if (window.AOS) {
        AOS.init();
      }

      // toggle ปุ่ม social-mobile (ใช้กับโครง HTML ที่อาจอยู่ใน item2 ของ component1/3)
      if (document.getElementById('social-mobile') !== null) {
        let socialMobileBtn = document.getElementById('social-mobile');
        let socialMobileElements = document.querySelectorAll(
          '.social-mobile-block:not(:first-child)'
        );
        socialMobileBtn.addEventListener('click', () => {
          for (let i = 0; i < socialMobileElements.length; i++) {
            if (socialMobileElements[i].style.opacity === '1') {
              socialMobileElements[i].style.opacity = 0;
              socialMobileElements[i].style.marginBottom = '-100px';
              socialMobileElements[i].style.zIndex = 0;
            } else {
              socialMobileElements[i].style.opacity = 1;
              socialMobileElements[i].style.marginBottom = '0';
              socialMobileElements[i].style.zIndex = 65;
            }
          }
        });
      }
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      await fetchContentFromApi();
      nextTick(() => {
        init();
      });
    });

    return {
      language,
      blocks13,
      blocks2,
      blocks4
    };
  }
});
