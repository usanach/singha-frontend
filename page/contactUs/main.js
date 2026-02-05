// /page/contactUs/main.js
// Assumptions:
// - api.js exposes: getContactUsHeadOffice()
// - Vue global is loaded (createApp, nextTick)
// - HeaderComponent / FooterComponent are global

createApp({
  components: {
    HeaderComponent,
    FooterComponent,
  },

  data() {
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const lang = getLanguageFromPath();

    // fallback (static) เผื่อ API ไม่มีค่า / error
    return {
      language: lang,
      font: lang === 'en' ? "" : "",
      title: lang === 'en' ? "CONTACT US" : "ติดต่อเรา",

      // ✅ address detail เป็น HTML จาก editor → ใช้ v-html ฝั่ง index.html
      location: {
        title: lang === 'en' ? "OUR LOCATION" : "ที่ตั้ง",
        direction: lang === 'en' ? "Get Direction" : "การเดินทาง",
        detail: lang === 'en'
          ? "SINGHA ESTATE PCL. 123 Suntowers Building B, 40th Floor, Vibhavadi-Rangsit Road, Chom Phon, Chatuchak, Bangkok 10900"
          : "บริษัท สิงห์ เอสเตท จำกัด (มหาชน) อาคารซันทาวเวอร์ส บี, ชั้น 40 เลขที่ 123 ถนนวิภาวดีรังสิต แขวงจอมพล เขตจตุจักร​ กรุงเทพมหานคร 10900",
        google_url: "https://maps.app.goo.gl/E8vjMjBG2Y3SmXtP9"
      },

      email: {
        title: lang === 'en' ? "EMAIL US" : "อีเมล",
        detail: "Info@singhaestate.co.th"
      },

      call: {
        title: lang === 'en' ? "CALL US" : "ติดต่อ",
        detail: "1221"
      },

      // ✅ google_map เป็น iframe html string (จะไป v-html ที่ index.html)
      google_map: "",

      // state
      isLoaded: false,
    };
  },

  methods: {
    getLanguageFromPath() {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    },

    // กัน XSS แบบเบื้องต้น (แนะนำ DOMPurify ถ้าใช้ได้)
    sanitizeHtml(html) {
      if (!html) return '';
      const div = document.createElement('div');
      div.innerHTML = String(html);

      // remove script tags
      div.querySelectorAll('script').forEach(el => el.remove());

      // remove inline event handlers: onclick=, onerror=, ...
      div.querySelectorAll('*').forEach(el => {
        [...el.attributes].forEach(attr => {
          if (/^on/i.test(attr.name)) el.removeAttribute(attr.name);
        });
      });

      return div.innerHTML;
    },

    applyRow(row) {
      const lang = this.language;

      // title
      this.title = (lang === 'en')
        ? (row.title_en || this.title)
        : (row.title_th || this.title);

      // location (address)
      this.location = {
        title: (lang === 'en')
          ? (row.address_title_en || this.location.title)
          : (row.address_title_th || this.location.title),

        direction: (lang === 'en') ? "Get Direction" : "การเดินทาง",

        // ✅ editor html
        detail: this.sanitizeHtml(
          (lang === 'en')
            ? (row.address_detail_en || this.location.detail)
            : (row.address_detail_th || this.location.detail)
        ),

        google_url: row.google_url || this.location.google_url
      };

      // email (ถ้าอนาคต email_detail เป็น editor ก็ใช้ sanitizeHtml ได้เหมือนกัน)
      this.email = {
        title: (lang === 'en')
          ? (row.email_title_en || this.email.title)
          : (row.email_title_th || this.email.title),
        detail: (lang === 'en')
          ? (row.email_detail_en || this.email.detail)
          : (row.email_detail_th || this.email.detail),
      };

      // call/contact
      this.call = {
        title: (lang === 'en')
          ? (row.contact_title_en || this.call.title)
          : (row.contact_title_th || this.call.title),
        detail: (lang === 'en')
          ? (row.contact_detail_en || this.call.detail)
          : (row.contact_detail_th || this.call.detail),
      };

      // google map iframe html
      this.google_map = this.sanitizeHtml(row.google_map || this.google_map);
    },

    async loadContactData() {
      try {
        // ✅ ใช้ api.js
        // expected return: { data: [ { ... } ] }
        const res = await getContactUsHeadOffice();
        const rows = Array.isArray(res?.data?.data) ? res.data.data : [];

        if (!rows.length) return;

        // ใช้ row แรก
        this.applyRow(rows[0]);
      } catch (err) {
        console.error('loadContactData error:', err);
      }
    }
  },

  async mounted() {
    this.language = this.getLanguageFromPath();
    await this.loadContactData();

    nextTick(() => {
      const section = document.querySelector('.contact-section');
      if (section) section.classList.remove('opacity-0');
      this.isLoaded = true;
    });
  },
}).mount('#app');
