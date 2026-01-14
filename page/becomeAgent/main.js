// Create and mount the Vue app
createApp({
  components: {
    HeaderComponent,
    CollectionComponent,
    FooterComponent,
  },

  data() {
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    const lang = getLanguageFromPath();

    return {
      lang,
      font: lang === 'en' ? "font-['SinghaEstate']" : "!font-['SinghaEstate']",

      // ✅ state เริ่มต้น (fallback)
      banner_section: {
        title: '',
        detail: '',
        button_text: lang === 'en' ? 'Register now' : 'ลงทะเบียน',
        // (optional) ถ้าคุณมี banner component ใช้ภาพ
        image_d: '',
        image_m: '',
      },

      opportunity_section: {
        title: '',
        card_list: [], // ✅ จาก data-section-2
      },

      success_section: {
        title: '',
        card_list: [], // ✅ จาก data-section-3
      },

      form_section: {
        header_text: lang === 'en' ? 'TO BECOME <br /> OUR AGENT PARTNER' : 'สมัครเป็นตัวแทนขายโครงการ',
        section_text1: '',
        section_text2: '',
        input_text: {
          firstName: lang === 'en' ? 'First Name *' : 'ชื่อ *',
          lastName:  lang === 'en' ? 'Last Name *' : 'นามสกุล *​',
          company:   lang === 'en' ? 'Company *' : 'บริษัท *',
          mobile:    lang === 'en' ? 'Mobile *' : 'เบอร์โทรศัพท์ *',
          email:     lang === 'en' ? 'Email *' : 'อีเมล *​',
          contactTime: lang === 'en' ? 'Contact Time *' : 'เวลาที่ติดต่อได้​ *',
          detail:    lang === 'en' ? 'Detail' : 'เพิ่มเติม',
          terms:     '',
          submit: { text: { en: 'Submit', th: 'ลงทะเบียน' } },
          placeholder: {
            en: 'Acceptable for corporate agents only',
            th: ' รับสมัครตัวแทนอสังหาริมทรัพย์เฉพาะนิติบุคคล​'
          }
        }
      },

      portfolio_section: {
        header_text: lang === 'en'
          ? 'OUR PORTFOLIO OF LUXURY DEVELOPMENTS'
          : 'ผลงานโครงการที่เราภาคภูมิใจ'
      },

      // ✅ ไว้กันหน้า flash
      isLoaded: false,
    };
  },

  methods: {
    getApiFn() {
      // รองรับทั้งแบบ global และแบบอยู่ใน scope
      return (typeof getContactUsBecomeAgent === 'function')
        ? getContactUsBecomeAgent
        : (window.getContactUsBecomeAgent || null);
    },

    async loadBecomeAgent() {
      try {
        const apiFn = this.getApiFn();
        if (!apiFn) {
          console.error('getContactUsBecomeAgent is not available. Please export/bind it in api.js');
          return;
        }

        const res = await apiFn();
        const payload = res?.data || {};

        const main = payload['data'] || null;
        const section2 = Array.isArray(payload['data-section-2']) ? payload['data-section-2'] : [];
        const section3 = Array.isArray(payload['data-section-3']) ? payload['data-section-3'] : [];

        const lang = this.lang;

        const STORAGE_BASE = window.APP_CONFIG?.storageUrl || 'http://localhost:8000/storage/';

        // -------------------------
        // Banner
        // -------------------------
        if (main) {
          this.banner_section.title  = main.title?.[lang]  || '';
          this.banner_section.detail = main.detail?.[lang] || '';

          // ถ้าคุณมี image ใช้ที่ banner component
          this.banner_section.image_d = main.image_banner_d
            ? `${STORAGE_BASE}uploads/contact_us/${main.image_banner_d}`
            : '';
          this.banner_section.image_m = main.image_banner_m
            ? `${STORAGE_BASE}uploads/contact_us/${main.image_banner_m}`
            : '';

          // Opportunity title (section 2)
          this.opportunity_section.title = main.title_s2?.[lang] || '';

          // Success title (section 3)
          this.success_section.title = main.title_s3?.[lang] || '';

          // (optional) form texts ถ้า API มีเพิ่มในอนาคต
          // this.form_section.section_text1 = ...
          // this.form_section.section_text2 = ...

          // terms (ยังเป็น static ในตัวอย่างเดิม)
          this.form_section.input_text.terms =
            lang === 'en'
              ? "I agree to receive more information ... <a class='notice-bold' href='https://www.singhaestate.co.th/en/privacy-notice' target='_blank'>Privacy Notice.​</a>"
              : "ท่านตกลงรับข้อมูล... <a class='notice-bold' href='https://www.singhaestate.co.th/th/privacy-notice' target='_blank'>นโยบายความเป็นส่วนตัว</a>​";
        }

        // -------------------------
        // Opportunity cards (data-section-2)
        // -------------------------
        this.opportunity_section.card_list = section2.map((it, idx) => {
          // ถ้า API เริ่มส่ง image_s2 มา ให้ใช้ storage ได้ทันที
          const image = it.image_s2
            ? `${STORAGE_BASE}uploads/contact_us/${it.image_s2}`
            : [
                '/assets/image/becomeAgent/1.webp',
                '/assets/image/becomeAgent/2.webp',
                '/assets/image/becomeAgent/new/Great-location.webp',
                '/assets/image/becomeAgent/new/Admirable-reputation.webp',
                '/assets/image/becomeAgent/new/High-customer.webp',
              ][idx] || '';

          return {
            l: image,
            title: it.item_title_s2?.[lang] || '',
            detail: it.detail_s2?.[lang] || '',
          };
        });

        // -------------------------
        // Success cards (data-section-3)
        // -------------------------
        this.success_section.card_list = section3.map((it, idx) => {
          const icon = it.icon_s3
            ? `${STORAGE_BASE}uploads/contact_us/${it.icon_s3}`
            : [
                "/assets/image-new/icons/hand.svg",
                "/assets/image-new/icons/Tool.svg",
                "/assets/image-new/icons/Building.svg",
                "/assets/image-new/icons/Money.svg",
              ][idx] || '';

          return {
            l: icon,
            title: it.item_title_s3?.[lang] || '',
            detail: it.detail_s3?.[lang] || '',
          };
        });

        this.isLoaded = true;

      } catch (error) {
        console.error('Failed to load become-agent data:', error);
      }
    },
  },

  setup() {
    const smoothScrollWithOffset = (target) => {
      const targetElement = document.querySelector(target);
      if (targetElement) {
        const topPosition = targetElement.getBoundingClientRect().top + window.scrollY - 50;
        window.scrollTo({ top: topPosition, behavior: 'smooth' });
      }
    };

    const setupAnchorScrolling = () => {
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            smoothScrollWithOffset(href);
          }
        });
      });
    };

    onMounted(() => {
      AOS.init();
      nextTick(() => setupAnchorScrolling());
    });

    return {};
  },

  async mounted() {
    // ✅ โหลดข้อมูลจาก API
    await this.loadBecomeAgent();

    // runs after mounted AND DOM updated
    nextTick(() => {
      document.querySelector('.become-agent-main')?.classList.remove('opacity-0')
    });
  },
}).mount('#app');
