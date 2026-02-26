// Define the Header component
const BannerComponent = defineComponent({
  name: 'BannerComponent',
  template: `
    <section class="banner-wrapper" v-if="banner">
      <div class="background-wrapper">
        <picture>
          <!-- Mobile -->
          <source
            :srcset="banner.image.s"
            media="(max-width:560px)"
          />
          <!-- Desktop -->
          <img
            class="article-background"
            :src="banner.image.l"
            :alt="banner.alt"
          >
        </picture>

        <img
          class="article-background-ef"
          src="/assets/image/estate_article/background-ef.webp"
          alt="ef"
        >

        <div class="article-banner-text-wrapper">
          <div class="banner-header-wrapper">
            <h1 class="header-text" v-html="banner.title"></h1>
          </div>
          <div class="border-btm"></div>
          <div class="love-time-wrapper">
            <!-- ถ้าอยากใช้ love ทีหลัง ค่อยเพิ่มได้ -->
            <div class="time-wrapper">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                />
                <path d="M12 6V12" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.24 16.24L12 12" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="time-number" id="time-number">{{ banner.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,

  setup() {
    const language = ref('th');      // th/en จาก path
    const banner   = ref(null);      // ข้อมูล banner ของ article ปัจจุบัน

    // base URL ตาม config.js (local / uat / prod)
    const API_BASE     = window.APP_CONFIG?.apiBaseUrl   || null;
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl   || null;

    // อ่านภาษา จาก path
    const getLanguageFromPath = () => {
      const path  = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    // สร้าง URL รูปจากไฟล์ที่ได้จาก API
    const buildImageUrl = (file, subDir = 'uploads/article/') => {
      if (!file) return '';

      // ถ้า backend ส่งเป็น full URL มาแล้ว
      if (/^https?:\/\//i.test(file)) {
        return file;
      }

      // ถ้าเป็น path ที่ขึ้นต้นด้วย uploads/
      if (file.startsWith('uploads/')) {
        return `${STORAGE_BASE.replace(/\/$/, '')}/${file}`;
      }

      // ถ้าเป็นแค่ชื่อไฟล์ เช่น "thumb_1764739362_2.jpg"
      return `${STORAGE_BASE.replace(/\/$/, '')}/${subDir}${file}`;
    };

    // format date จาก date_start
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      if (Number.isNaN(date.getTime())) return '';

      if (language.value === 'en') {
        return new Intl.DateTimeFormat('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }).format(date);
      } else {
        const thMonths = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
        const day   = date.getDate();
        const month = thMonths[date.getMonth()];
        const year  = date.getFullYear() + 543;
        return `${day} ${month} ${year}`;
      }
    };

    // ดึงข้อมูลจาก /api/article แล้วเลือกตัวที่ url ตรงกับ path
    const fetchBannerFromApi = async () => {
      try {
        const res = await axios.get(`${API_BASE}/article`);
        const list = Array.isArray(res.data?.data) ? res.data.data : [];

        const path = window.location.pathname;

        // filter ตามภาษา + path
        const matched = list.filter((item) => {
          const urlTh = item.url_th || '';
          const urlEn = item.url_en || '';
          if (language.value === 'en') {
            return urlEn === path;
          }
          return urlTh === path;
        });

        if (!matched.length) {
          console.warn('No article matched current URL for banner');
          return;
        }

        // ถ้ามีหลายตัว เลือกตัวล่าสุดจาก date_start (หรือ id ใหญ่สุดก็ได้)
        matched.sort((a, b) => {
          const da = new Date(a.date_start || a.created_at || 0).getTime();
          const db = new Date(b.date_start || b.created_at || 0).getTime();
          return db - da;
        });

        const article = matched[0];

        banner.value = {
          title: article.title?.[language.value] || '',
          date:  formatDate(article.date_start || article.created_at),
          image: {
            // Desktop ใช้ detail_banner_image, ถ้าไม่มี fallback header_image
            l: buildImageUrl(
              article.detail_banner_image || article.header_image || article.image_master
            ),
            // Mobile ใช้ header_image, ถ้าไม่มี fallback detail_banner_image
            s: buildImageUrl(
              article.header_image || article.detail_banner_image || article.image_master
            )
          },
          alt: article.meta_title || article.title?.[language.value] || ''
        };
      } catch (e) {
        console.error('Error loading banner article from API:', e);
      }
    };

    const initAOS = () => {
      if (window.AOS) {
        AOS.init();
      }
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      await fetchBannerFromApi();
      nextTick(() => {
        initAOS();
      });
    });

    return {
      banner,
      language
    };
  }
});
