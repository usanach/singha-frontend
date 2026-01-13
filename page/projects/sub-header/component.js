const SubHeaderComponent = defineComponent({
  name: 'SubHeaderComponent',
  template: `
      <div class="lg:block hidden">
        <nav ref="subHeader" class="sub-header top-[65px] w-full absolute left-0 z-[99] border-b border-white/50 lg:block hidden">
          <div class="container mx-auto py-3 relative flex items-center">
            <div class="my-auto">
              <img aria-hidden="true" ref="logoRef" :src="logo" alt="logo" class="object-contain object-center logo  h-[40px]"  v-if="!isLoading">
            </div>

            <div class="w-full flex justify-center my-auto gap-8">
              <div v-for="(link, index) in links" :key="link.id">
                <a :href="link.url[language]" 
                   @click="setActive(index)" 
                   :data-header-click="link.url['en']"
                   class="cursor-pointer">
                  <p class="text-white uppercase text-center transition-colors"
                     :class="activeIndex === index ? 'font-bold' : 'font-normal'"
                     v-html="link.name[language]">
                  </p>
                </a>
              </div>
            </div>

            <div class="my-auto" v-if="registerVisible">
              <a href="#register" data-header-click="register">
                <button class="border border-white px-6 py-1 -mr-1" type="button">
                  <p class="text-nowrap font-normal text-white">{{ register }}</p>
                </button>
              </a>
            </div>
          </div>
        </nav>
      </div>
    `,

  setup() {
    const language = ref("th");
    const logo = ref("/assets/image/page-smyth-kaset/banner/kaset-logo.webp"); // default logo

    const register = ref("ลงทะเบียน");
    const registerVisible = ref(true);

    // เก็บ logo จาก API แยกกัน
    const bannerLogo = ref(null);
    const locationLogo = ref(null);
    const isLoading = ref(true);


    const links = ref([
      { id: 0, name: { en: "CONCEPT", th: "คอนเซ็ปต์" }, url: { en: "#design_concept", th: "#design_concept" }},
      { id: 1, name: { en: "PROJECT SIGNATURES", th: "จุดเด่นโครงการ" }, url: { en: "#project_signature", th: "#project_signature" }},
      { id: 2, name: { en: "PROJECT INFORMATION", th: "ข้อมูลโครงการ" }, url: { en: "#project_detail", th: "#project_detail" }},
      { id: 3, name: { en: "GALLERY", th: "แกลเลอรี" }, url: { en: "#gallery", th: "#gallery" }},
      { id: 4, name: { en: "LOCATION", th: "ที่ตั้งโครงการ" }, url: { en: "#location", th: "#location" }},
      { id: 5, name: { en: "S LIFESTYLE", th: "S LIFESTYLE" }, url: { en: "#s_lifestyle", th: "#s_lifestyle" }}
    ]);

    const flagMap = {
      0: "project_design_concept",
      1: "project_highlight",
      2: "project_information_project_detail_area",
      3: "project_gallery",
      4: "project_location",
      5: "project_lifestyle",
    };

    const activeIndex = ref(0);
    const subHeader = ref(null);
    const logoRef = ref(null);

    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : "th";
    };

    const loadConfig = async () => {
      try {
        const base = window.APP_CONFIG.apiBaseUrl;
        const storage = window.APP_CONFIG.storageUrl;
        const currentPath = window.location.pathname.replace(/\/$/, "");

        const seoRes = await axios.get(`${base}/project/seo`);
        const seoList = seoRes.data.data;

        const seoField = language.value === "en" ? "seo_url_en" : "seo_url_th";

        let seoItem = seoList.find(seo => seo[seoField]?.replace(/\/$/, "") === currentPath);

        if (!seoItem) {
          seoItem = seoList.find(seo =>
            seo.seo_url_th?.replace(/\/$/, "") === currentPath ||
            seo.seo_url_en?.replace(/\/$/, "") === currentPath
          );
        }

        if (!seoItem) return;

        const projectId = seoItem.project_id;

        const subRes = await axios.get(`${base}/project/project_sub_header/${projectId}`);
        const data = subRes.data.data || {};

        // -------- LOGO จาก API --------
        const banner = data.banner_logo ? storage + data.banner_logo : null;
        const locationL = data.location_logo ? storage + data.location_logo : null;

        bannerLogo.value = banner;
        locationLogo.value = locationL;

        // logo เริ่มต้นตอนโหลดหน้า (ยังไม่ scroll)
        logo.value = bannerLogo.value || locationLogo.value || logo.value;

        // -------- เมนู เปิด/ปิด --------
        links.value = links.value.filter(item => {
          const key = flagMap[item.id];
          if (!key) return true;
          return Number(data[key]) === 1;
        });

        // -------- Register button --------
        registerVisible.value = Number(data.project_form) === 1;
        isLoading.value = false;

      } catch (e) {
        console.error("SubHeader loadConfig failed:", e);
        isLoading.value = false;

      }
    };

    // scroll + style
    const smoothScrollWithOffset = (target) => {
      const el = document.querySelector(target);
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 50,
          behavior: "smooth",
        });
      }
    };

    const setupAnchorScrolling = () => {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href");
          if (href && href.startsWith("#") && href !== "#") {
            e.preventDefault();
            smoothScrollWithOffset(href);
          }
        });
      });
    };

    const updateSubHeaderStyle = (progress) => {
      const header = document.querySelector("header");

      if (progress > 0) {
        subHeader.value.classList.add("!backdrop-blur-xl", "!bg-white/50", "!fixed", "!top-0","active");
        header.classList.add("lg:!translate-y-[-70px]");

        if (logoRef.value) {
          // ตอนเลื่อนแล้ว → ใช้ locationLogo ก่อน ถ้าไม่มี fallback เป็น bannerLogo / logo เดิม
          logoRef.value.src = locationLogo.value || bannerLogo.value || logo.value;
        }
      } else {
        subHeader.value.classList.remove("!backdrop-blur-xl", "!bg-white/50", "!fixed", "!top-0","active");
        header.classList.remove("lg:!translate-y-[-70px]");

        if (logoRef.value) {
          // ตอนอยู่บนสุด → ใช้ bannerLogo ก่อน ถ้าไม่มี fallback เป็น locationLogo / logo เดิม
          logoRef.value.src = bannerLogo.value || locationLogo.value || logo.value;
        }
      }
    };

    const setupScrollSpy = () => {
      gsap.registerPlugin(ScrollTrigger);
      links.value.forEach((link, index) => {
        const section = document.querySelector(link.url[language.value]);
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top center+=-50",
          end: "bottom center",
          onEnter: () => (activeIndex.value = index),
          onEnterBack: () => (activeIndex.value = index),
        });
      });
    };

    const setupScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: "body",
        start: "+=70 top",
        scrub: 1,
        onUpdate: (self) => updateSubHeaderStyle(self.progress),
      });
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();
      register.value = language.value === "th" ? "ลงทะเบียน" : "Register";

      await loadConfig();

      AOS.init();
      gsap.registerPlugin(ScrollTrigger);
      setupAnchorScrolling();
      setupScrollTrigger();
      setupScrollSpy();
    });

    const setActive = (index) => {
      activeIndex.value = index;
    };

    return {
      language,
      logo,
      links,
      activeIndex,
      registerVisible,
      register,
      subHeader,
      logoRef,
      setActive,isLoading
    };
  },
});
