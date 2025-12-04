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

      <!-- BLOCK: component5 -->
      <section
        v-for="block in blocks5"
        :key="block.id"
        class="article-2"
        :style="{ backgroundColor: block.bgColor || '' }"
      >
        <div class="article-2-wrapper">
          <div class="my-auto">
            <div>
              <div class="grid grid-cols-2 gap-4">
                <div v-if="block.images[0]">
                  <img
                    :src="block.images[0]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-auto aos-init aos-animate"
                  >
                </div>
                <div v-if="block.images[1]">
                  <img
                    :src="block.images[1]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-auto aos-init aos-animate"
                  >
                </div>
              </div>
            </div>
            <div class="article-desc-text-wrapper !mt-5 aos-init aos-animate"
                 data-aos="fade-up"
                 data-aos-duration="800"
                 data-aos-easing="linear">
              <!-- text_detail จาก Quill -->
              <div class="ql-editor" v-html="block.html"></div>
            </div>
            <br>
          </div>
        </div>
      </section>

      <!-- BLOCK: component6 -->
      <section
        v-for="block in blocks6"
        :key="block.id"
        class="article-2"
        :style="{ backgroundColor: block.bgColor || '' }"
      >
        <div class="article-2-wrapper">
          <div class="my-auto">
            <div>
              <div class="grid md:grid-cols-3 grid-cols-2 grid-rows-3 md:grid-rows-1 gap-4">
                <div v-if="block.images[0]">
                  <img
                    :src="block.images[0]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-auto aos-init aos-animate"
                  >
                </div>
                <div v-if="block.images[1]">
                  <img
                    :src="block.images[1]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-auto aos-init aos-animate"
                  >
                </div>
                <div
                  v-if="block.images[2]"
                  class="md:col-span-1 col-span-2 md:row-span-1 row-span-2 md:row-start-1 row-start-2"
                >
                  <img
                    :src="block.images[2]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-auto aos-init aos-animate"
                  >
                </div>
              </div>
            </div>
            <div class="article-desc-text-wrapper !mt-5 aos-init aos-animate"
                 data-aos="fade-up"
                 data-aos-duration="800"
                 data-aos-easing="linear">
              <div class="ql-editor" v-html="block.html"></div>
            </div>
            <br>
          </div>
        </div>
      </section>

      <!-- BLOCK: component7 -->
      <section
        v-for="block in blocks7"
        :key="block.id"
        class="article-2"
        :style="{ backgroundColor: block.bgColor || '' }"
      >
        <div class="article-2-wrapper">
          <div class="my-auto">
            <div>
              <div class="grid lg:grid-cols-2 grid-cols-1 gap-4">
                <div v-if="block.images[0]">
                  <img
                    :src="block.images[0]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-auto aos-init aos-animate"
                  >
                </div>
                <div v-if="block.images[1]">
                  <img
                    :src="block.images[1]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-auto aos-init aos-animate"
                  >
                </div>
                <div v-if="block.images[2]">
                  <img
                    :src="block.images[2]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-auto aos-init aos-animate"
                  >
                </div>
                <div v-if="block.images[3]">
                  <img
                    :src="block.images[3]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-auto aos-init aos-animate"
                  >
                </div>
              </div>
            </div>
            <div class="article-desc-text-wrapper !mt-5 aos-init aos-animate"
                 data-aos="fade-up"
                 data-aos-duration="800"
                 data-aos-easing="linear">
              <div class="ql-editor" v-html="block.html"></div>
            </div>
            <br>
          </div>
        </div>
      </section>

      <!-- BLOCK: component8 -->
      <section
        v-for="block in blocks8"
        :key="block.id"
        class="article-2"
        :style="{ backgroundColor: block.bgColor || '' }"
      >
        <div class="article-2-wrapper">
          <div class="my-auto">
            <div>
              <div class="grid gap-4 md:grid-cols-6 grid-cols-2">
                <div
                  v-if="block.images[0]"
                  class="md:col-span-2 col-span-1"
                >
                  <img
                    :src="block.images[0]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-full object-cover aos-init aos-animate"
                  >
                </div>
                <div
                  v-if="block.images[1]"
                  class="md:col-span-2 col-span-1"
                >
                  <img
                    :src="block.images[1]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-full object-cover aos-init aos-animate"
                  >
                </div>
                <div
                  v-if="block.images[2]"
                  class="md:col-span-2 col-span-1"
                >
                  <img
                    :src="block.images[2]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-full object-cover aos-init aos-animate"
                  >
                </div>
                <div
                  v-if="block.images[3]"
                  class="md:col-span-2 col-span-1 md:col-start-2 col-start-2"
                >
                  <img
                    :src="block.images[3]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-full object-cover aos-init aos-animate"
                  >
                </div>
                <div
                  v-if="block.images[4]"
                  class="col-span-2 md:col-start-4 col-start-1"
                >
                  <img
                    :src="block.images[4]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-full object-cover aos-init aos-animate"
                  >
                </div>
              </div>
            </div>
            <div class="article-desc-text-wrapper !mt-5 aos-init aos-animate"
                 data-aos="fade-up"
                 data-aos-duration="800"
                 data-aos-easing="linear">
              <div class="ql-editor" v-html="block.html"></div>
            </div>
            <br>
          </div>
        </div>
      </section>

      <!-- BLOCK: component9 -->
      <section
        v-for="block in blocks9"
        :key="block.id"
        class="article-2"
        :style="{ backgroundColor: block.bgColor || '' }"
      >
        <div class="article-2-wrapper">
          <div class="my-auto">
            <div>
              <div class="grid gap-4 md:grid-cols-4 grid-cols-2">
                <div
                  v-if="block.images[0]"
                  class="col-start-1 row-start-1"
                >
                  <img
                    :src="block.images[0]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-full object-cover aos-init aos-animate"
                  >
                </div>
                <div
                  v-if="block.images[1]"
                  class="md:row-start-1 row-start-2 md:col-start-4 col-start-1"
                >
                  <img
                    :src="block.images[1]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-full object-cover aos-init aos-animate"
                  >
                </div>
                <div
                  v-if="block.images[2]"
                  class="row-start-1 col-start-2 row-span-2"
                >
                  <img
                    :src="block.images[2]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-full object-cover aos-init aos-animate"
                  >
                </div>
                <div
                  v-if="block.images[3]"
                  class="md:col-start-1 col-start-2 md:row-start-2 row-start-3"
                >
                  <img
                    :src="block.images[3]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-full object-cover aos-init aos-animate"
                  >
                </div>
                <div
                  v-if="block.images[4]"
                  class="md:row-start-2 row-start-4 md:col-start-4 col-start-2"
                >
                  <img
                    :src="block.images[4]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-full object-cover aos-init aos-animate"
                  >
                </div>
                <div
                  v-if="block.images[5]"
                  class="md:row-start-1 row-start-3 md:col-start-3 col-start-1 row-span-2"
                >
                  <img
                    :src="block.images[5]"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-easing="linear"
                    :alt="block.alt || 'article image'"
                    class="w-full h-full object-cover aos-init aos-animate"
                  >
                </div>
              </div>
            </div>
            <div class="article-desc-text-wrapper !mt-5 aos-init"
                 data-aos="fade-up"
                 data-aos-duration="800"
                 data-aos-easing="linear">
              <div class="ql-editor" v-html="block.html"></div>
            </div>
            <br>
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
    const blocks5  = ref([]);          // sub-section: component5
    const blocks6  = ref([]);          // sub-section: component6
    const blocks7  = ref([]);          // sub-section: component7
    const blocks8  = ref([]);          // sub-section: component8
    const blocks9  = ref([]);          // sub-section: component9

    // ใช้ config.js ในการเลือก base URL
    const API_BASE     = window.APP_CONFIG?.apiBaseUrl   || 'http://127.0.0.1:8000/api';
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl   || `${window.location.origin}/storage/`;

    const getLanguageFromPath = () => {
      const path  = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const buildFullPath = (imagePath) => {
      if (!imagePath) return '';
      if (/^https?:\/\//i.test(imagePath)) return imagePath;
      imagePath = imagePath.replace(/^\/+/, '');
      return `${STORAGE_BASE}${imagePath}`;
    };

    const mapMultiImageBlock = (item, maxImages = 6) => {
      const imgs = [];
      const keys = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6'];
      keys.slice(0, maxImages).forEach((key) => {
        const val = item[key];
        if (val) imgs.push(buildFullPath(val));
      });

      return {
        id: item.id,
        images: imgs,
        bgColor: item.bg_color || '#FFFFFF',
        html: item.text_detail || '',
        alt: ''
      };
    };

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

        // เลือกตัวล่าสุดตาม date_start / created_at
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
        // 2) component2 → article-5
        // -----------------------
        const related2 = subSections
          .filter(s =>
            s.article_id === articleId &&
            s.component_name === 'component2'
          )
          .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0));

        blocks2.value = related2.map(item => {
          const fullImage = buildFullPath(item.item2 || '');
          return {
            id: item.id,
            image: fullImage,
            html: item.item1 || '',
            alt: ''
          };
        });

        // -----------------------
        // 3) component4 → article-2
        // -----------------------
        const related4 = subSections
          .filter(s =>
            s.article_id === articleId &&
            s.component_name === 'component4'
          )
          .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0));

        blocks4.value = related4.map(item => {
          const fullImage = buildFullPath(item.item2 || '');
          return {
            id: item.id,
            image: fullImage,
            html: item.item1 || '',
            alt: ''
          };
        });

        // -----------------------
        // 4) component5
        // -----------------------
        const related5 = subSections
          .filter(s =>
            s.article_id === articleId &&
            s.component_name === 'component5'
          )
          .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0));

        blocks5.value = related5.map(item => mapMultiImageBlock(item, 2));

        // -----------------------
        // 5) component6
        // -----------------------
        const related6 = subSections
          .filter(s =>
            s.article_id === articleId &&
            s.component_name === 'component6'
          )
          .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0));

        blocks6.value = related6.map(item => mapMultiImageBlock(item, 3));

        // -----------------------
        // 6) component7
        // -----------------------
        const related7 = subSections
          .filter(s =>
            s.article_id === articleId &&
            s.component_name === 'component7'
          )
          .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0));

        blocks7.value = related7.map(item => mapMultiImageBlock(item, 4));

        // -----------------------
        // 7) component8
        // -----------------------
        const related8 = subSections
          .filter(s =>
            s.article_id === articleId &&
            s.component_name === 'component8'
          )
          .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0));

        blocks8.value = related8.map(item => mapMultiImageBlock(item, 5));

        // -----------------------
        // 8) component9
        // -----------------------
        const related9 = subSections
          .filter(s =>
            s.article_id === articleId &&
            s.component_name === 'component9'
          )
          .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0));

        blocks9.value = related9.map(item => mapMultiImageBlock(item, 6));

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
      blocks4,
      blocks5,
      blocks6,
      blocks7,
      blocks8,
      blocks9
    };
  }
});
