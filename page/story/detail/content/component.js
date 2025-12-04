// Define the Content component
const ContentComponent = defineComponent({
  name: 'ContentComponent',
  template: `
    <div class="section-wrapper">
      <section
        v-for="block in sections"
        :key="block.id"
        :class="[
          block.type === '13' && 'article-content-block py-10',
          block.type === '2'  && 'article-5',
          block.type === '4'  && 'article-2',
          ['5','6','7','8','9'].includes(block.type) && 'article-2'
        ]"
        :style="{ backgroundColor: block.bgColor || '' }"
      >
        <!-- BLOCK: component1 และ component3 -->
        <template v-if="block.type === '13'">
          <div class="container">
            <div class="ql-editor" v-html="block.html"></div>
          </div>
        </template>

        <!-- BLOCK: component2 (template article-5) -->
        <template v-else-if="block.type === '2'">
          <div class="article-5-wrapper">
            <div class="text-article-wrapper">
              <div class="image-wrapper">
                <img
                  class="article-5-image aos-init aos-animate"
                  :src="block.images[0]"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  data-aos-easing="linear"
                  :alt="block.alt || 'article image'"
                >
              </div>
              <div class="text-wrapper">
                <div class="article-desc-text-wrapper !mb-10">
                  <div class="ql-editor" v-html="block.html"></div>
                </div>
              </div>
            </div>
          </div>
        </template>

        <!-- BLOCK: component4 (template article-2) -->
        <template v-else-if="block.type === '4'">
          <div class="article-2-wrapper">
            <div class="text-wrapper my-auto">
              <div class="article-header-wrapper">
                <div class="ql-editor" v-html="block.html"></div>
              </div>
            </div>
            <div class="image-wrapper lg:mx-0 mx-auto">
              <img
                class="article-5-image aos-init aos-animate"
                :src="block.images[0]"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-easing="linear"
                :alt="block.alt || 'article image'"
              >
            </div>
          </div>
        </template>

        <!-- BLOCK: component5 -->
        <template v-else-if="block.type === '5'">
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
                <div class="ql-editor" v-html="block.html"></div>
              </div>
              <br>
            </div>
          </div>
        </template>

        <!-- BLOCK: component6 -->
        <template v-else-if="block.type === '6'">
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
        </template>

        <!-- BLOCK: component7 -->
        <template v-else-if="block.type === '7'">
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
        </template>

        <!-- BLOCK: component8 -->
        <template v-else-if="block.type === '8'">
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
        </template>

        <!-- BLOCK: component9 -->
        <template v-else-if="block.type === '9'">
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
        </template>
      </section>
    </div>
  `,

  setup() {
    const language = ref('th');        // th/en จาก URL
    const sections = ref([]);          // section ทั้งหมด เรียง global ตาม sort

    const API_BASE     = window.APP_CONFIG?.apiBaseUrl || 'http://127.0.0.1:8000/api';
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl || `${window.location.origin}/storage/`;

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
        componentName: item.component_name,
        type: '',       // ใส่ตอน normalize ด้านล่าง
        sort: Number(item.sort ?? 0),
        images: imgs,
        bgColor: item.bg_color || '',
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

        // ดึงเฉพาะ sub-section ของ article นี้ แล้ว sort ตาม sort (global order)
        const relatedSections = subSections
          .filter(s => s.article_id === articleId)
          .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0));

        // map ให้เป็น section เดียว แต่มี type เพื่อเลือก template
        sections.value = relatedSections.map((item) => {
          const baseSort = Number(item.sort ?? 0);

          // component1 และ component3 (text block)
          if (item.component_name === 'component1 และ component3') {
            return {
              id: item.id,
              componentName: item.component_name,
              type: '13',
              sort: baseSort,
              bgColor: item.item1 || item.bg_color || '', // item1 = bg color
              html: item.item2 || item.text_detail || '',
              images: [],
              alt: ''
            };
          }

          // component2 → article-5 (1 รูป + text)
          if (item.component_name === 'component2') {
            return {
              id: item.id,
              componentName: item.component_name,
              type: '2',
              sort: baseSort,
              bgColor: item.bg_color || '',
              html: item.item1 || item.text_detail || '',
              images: [buildFullPath(item.item2 || '')],
              alt: ''
            };
          }

          // component4 → article-2 (1 รูป + text)
          if (item.component_name === 'component4') {
            return {
              id: item.id,
              componentName: item.component_name,
              type: '4',
              sort: baseSort,
              bgColor: item.bg_color || '',
              html: item.item1 || item.text_detail || '',
              images: [buildFullPath(item.item2 || '')],
              alt: ''
            };
          }

          // component5–9 ใช้ multi image helper
          if (item.component_name === 'component5') {
            const m = mapMultiImageBlock(item, 2);
            return { ...m, type: '5' };
          }

          if (item.component_name === 'component6') {
            const m = mapMultiImageBlock(item, 3);
            return { ...m, type: '6' };
          }

          if (item.component_name === 'component7') {
            const m = mapMultiImageBlock(item, 4);
            return { ...m, type: '7' };
          }

          if (item.component_name === 'component8') {
            const m = mapMultiImageBlock(item, 5);
            return { ...m, type: '8' };
          }

          if (item.component_name === 'component9') {
            const m = mapMultiImageBlock(item, 6);
            return { ...m, type: '9' };
          }

          // default: ไม่รู้ว่า component อะไร → render เป็น text block ธรรมดา
          return {
            id: item.id,
            componentName: item.component_name,
            type: '13',
            sort: baseSort,
            bgColor: item.bg_color || '',
            html: item.text_detail || '',
            images: [],
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

      // toggle ปุ่ม social-mobile (ถ้า block HTML มี id นี้)
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
      sections
    };
  }
});
