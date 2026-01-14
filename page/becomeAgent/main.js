// Create and mount the Vue app
createApp({
  components: {
    HeaderComponent,
    CollectionComponent,
    FooterComponent,
  },

  data() {
    return {
      lang: 'th',
      font: "!font-['SinghaEstate']",

      banner_section: {
        title: '',
        detail: '',
        button_text: 'ลงทะเบียน',
        image_d: '',
        image_m: '',
      },

      opportunity_section: {
        title: '',
        card_list: [],
      },

      success_section: {
        title: '',
        card_list: [],
      },

      form_section: {
        header_text: 'สมัครเป็นตัวแทนขายโครงการ',
        section_text1: '',
        section_text2: '',
        input_text: {
          firstName: 'ชื่อ *',
          lastName: 'นามสกุล *​',
          company: 'บริษัท *',
          mobile: 'เบอร์โทรศัพท์ *',
          email: 'อีเมล *​',
          contactTime: 'เวลาที่ติดต่อได้​ *',
          detail: 'เพิ่มเติม',
          terms: '',
          submit: { text: { en: 'Submit', th: 'ลงทะเบียน' } },
          placeholder: {
            en: 'Acceptable for corporate agents only',
            th: ' รับสมัครตัวแทนอสังหาริมทรัพย์เฉพาะนิติบุคคล​'
          }
        }
      },

      portfolio_section: {
        header_text: 'ผลงานโครงการที่เราภาคภูมิใจ'
      },

      isLoaded: false,
    };
  },

  methods: {
    // ✅ normalize + read lang from /th or /en only
    getLanguageFromPath() {
      let path = window.location.pathname || '/';

      // ตัด / ท้ายออก (ยกเว้น root)
      if (path.length > 1) path = path.replace(/\/+$/, '');

      // match ต้องเป็น segment แรกเท่านั้น: ^/(th|en)(/|$)
      const m = path.match(/^\/(th|en)(\/|$)/);
      return m ? m[1] : 'th';
    },

    applyLanguageUI() {
      const lang = this.getLanguageFromPath();
      this.lang = lang;

      this.font = lang === 'en'
        ? "font-['SinghaEstate']"
        : "!font-['SinghaEstate']";

      // text ที่เป็น static ให้ set ตามภาษา ที่นี่ (กันค้างค่าภาษาเดิม)
      this.banner_section.button_text = lang === 'en' ? 'Register now' : 'ลงทะเบียน';

      this.form_section.header_text = lang === 'en'
        ? 'TO BECOME <br /> OUR AGENT PARTNER'
        : 'สมัครเป็นตัวแทนขายโครงการ';

      this.form_section.input_text.firstName = lang === 'en' ? 'First Name *' : 'ชื่อ *';
      this.form_section.input_text.lastName = lang === 'en' ? 'Last Name *' : 'นามสกุล *​';
      this.form_section.input_text.company = lang === 'en' ? 'Company *' : 'บริษัท *';
      this.form_section.input_text.mobile = lang === 'en' ? 'Mobile *' : 'เบอร์โทรศัพท์ *';
      this.form_section.input_text.email = lang === 'en' ? 'Email *' : 'อีเมล *​';
      this.form_section.input_text.contactTime = lang === 'en' ? 'Contact Time *' : 'เวลาที่ติดต่อได้​ *';
      this.form_section.input_text.detail = lang === 'en' ? 'Detail' : 'เพิ่มเติม';

      this.portfolio_section.header_text = lang === 'en'
        ? 'OUR PORTFOLIO OF LUXURY DEVELOPMENTS'
        : 'ผลงานโครงการที่เราภาคภูมิใจ';
    },

    getApiFn() {
      return (typeof getContactUsBecomeAgent === 'function')
        ? getContactUsBecomeAgent
        : (window.getContactUsBecomeAgent || null);
    },

    initBannerOwl() {
      const $el = $('.banner-slider-section.owl-carousel');
      if (!$el.length) return;

      if ($el.hasClass('owl-loaded')) {
        $el.trigger('destroy.owl.carousel');
        $el.removeClass('owl-loaded');
        $el.find('.owl-stage-outer').children().unwrap();
      }

      $el.owlCarousel({
        margin: 20,
        loop: false,
        nav: false,
        dots: false,
        center: false,
        stagePadding: 20,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 5 },
        },
      });
    },

    waitForOwlAndInit(timeoutMs = 4000) {
      const start = Date.now();
      const tick = () => {
        const $el = $('.banner-slider-section.owl-carousel');

        // ✅ owl ต้องมี child จริง (บางที vue render เป็น comment ก่อน)
        const hasItems = $el.length && $el.children().length > 0;

        if (hasItems) {
          this.initBannerOwl();
          return;
        }
        if (Date.now() - start >= timeoutMs) return;
        requestAnimationFrame(tick);
      };
      tick();
    },

    async loadBecomeAgent() {
      try {
        const apiFn = this.getApiFn();
        if (!apiFn) return;

        const res = await apiFn();
        const payload = res?.data || {};

        const main = payload.data || null;
        const section2 = Array.isArray(payload['data-section-2']) ? payload['data-section-2'] : [];
        const section3 = Array.isArray(payload['data-section-3']) ? payload['data-section-3'] : [];

        const lang = this.lang;
        const STORAGE_BASE = window.APP_CONFIG?.storageUrl || '';

        if (main) {
          this.banner_section.title  = main.title?.[lang]  || '';
          this.banner_section.detail = main.detail?.[lang] || '';

          this.banner_section.image_d = main.image_banner_d
            ? `${STORAGE_BASE}uploads/contact_us/${main.image_banner_d}`
            : '';
          this.banner_section.image_m = main.image_banner_m
            ? `${STORAGE_BASE}uploads/contact_us/${main.image_banner_m}`
            : '';

          this.opportunity_section.title = main.title_s2?.[lang] || '';
          this.success_section.title = main.title_s3?.[lang] || '';

          this.form_section.input_text.terms =
            lang === 'en'
              ? "I agree to receive more information about products, services, and marketing news ... <a class='notice-bold' href='https://www.singhaestate.co.th/en/privacy-notice' target='_blank'>Privacy Notice.​</a>"
              : "ท่านตกลงรับข้อมูลเกี่ยวกับผลิตภัณฑ์... <a class='notice-bold' href='https://www.singhaestate.co.th/th/privacy-notice' target='_blank'>นโยบายความเป็นส่วนตัว</a>​";
        }

        this.opportunity_section.card_list = section2.map((it, idx) => {
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
        await this.$nextTick();
        this.waitForOwlAndInit();

      } catch (e) {
        console.error(e);
      }
    },
  },

  async mounted() {
    // ✅ set lang ก่อนทุกอย่าง
    this.applyLanguageUI();

    // ✅ โหลดข้อมูลหลังได้ภาษาแน่นอน
    await this.loadBecomeAgent();

    this.$nextTick(() => {
      document.querySelector('.become-agent-main')?.classList.remove('opacity-0');
    });
  },
}).mount('#app');
