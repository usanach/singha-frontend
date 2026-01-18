// Create and mount the Vue app
createApp({
  components: {
    HeaderComponent,
    FooterComponent,
  },

  data() {
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : "th";
    };

    return {
      font: getLanguageFromPath() == "en" ? "" : "",
      lang: getLanguageFromPath(),

      // ✅ จะถูก replace ด้วยข้อมูลจาก API ตอน mounted
      data: [],

      // config
      storageUrl: (window.APP_CONFIG?.storageUrl || "/storage/"),
      loading: false,
    };
  },

  async mounted() {
    this.loading = true;

    try {
      // ✅ ใช้ api.js
      const res = await getContactUsContact();

      // api.js ของคุณยัง return axios response => ต้อง .data
      const record = res?.data?.data?.[0];

      if (!record) {
        console.warn("No contact-us data from API");
        return;
      }

      const lang = this.lang;
      const storage = this.storageUrl;

      // helper build image url
      const img = (filename) => {
        if (!filename) return "";
        const clean = String(filename).replace(/^\/+/, "");
        // ✅ ปรับ path ตามที่ backend เก็บจริง (ดูจากชื่อฟิลด์ thumb_xxx.webp)
        // ตอนนี้สมมติว่าอยู่ใน /uploads/contact_us/
        return `${storage}uploads/contact_us/${clean}`;
      };

      // helper: ดึง title/detail จาก HTML (เอา H2 + P แรก ๆ)
      const pickTitleDetail = (html = "") => {
        const titleMatch = html.match(/<h2[^>]*>(.*?)<\/h2>/i);
        const pMatch = html.match(/<p[^>]*>(.*?)<\/p>/i);

        // strip tags กันเหนียว
        const strip = (s) => String(s || "").replace(/<[^>]+>/g, "").trim();

        return {
          title: strip(titleMatch?.[1] || ""),
          detail: strip(pMatch?.[1] || ""),
        };
      };

      const contactTD = pickTitleDetail(record.contact?.[lang]);
      const salesTD = pickTitleDetail(record.sales?.[lang]);
      const landTD = pickTitleDetail(record.land?.[lang]);

      // ✅ map ให้เป็น format เดิมที่หน้าใช้อยู่
      this.data = [
        {
          title: { [lang]: contactTD.title },
          detail: { [lang]: contactTD.detail },
          link: record.contact_link?.[lang] || "#",
          target: "_blank",
          more: { [lang]: record.contact_buttom?.[lang] || (lang === "th" ? "ข้อมูลเพิ่มเติม" : "Explore more") },
          image: {
            s: img(record.contact_image),
            l: img(record.contact_image),
          },
          datalayer: { button: "contact_us" },
        },
        {
          title: { [lang]: salesTD.title },
          detail: { [lang]: salesTD.detail },
          link: record.sales_link?.[lang] || "#",
          target: "_blank",
          more: { [lang]: record.sales_buttom?.[lang] || (lang === "th" ? "ข้อมูลเพิ่มเติม" : "Explore more") },
          image: {
            s: img(record.sales_image),
            l: img(record.sales_image),
          },
          datalayer: { button: "become_agent" },
        },
        {
          title: { [lang]: landTD.title },
          detail: { [lang]: landTD.detail },
          link: record.land_link?.[lang] || "#",
          target: "_blank",
          more: { [lang]: record.land_buttom?.[lang] || (lang === "th" ? "ข้อมูลเพิ่มเติม" : "Explore more") },
          image: {
            s: img(record.land_image),
            l: img(record.land_image),
          },
          datalayer: { button: "property_offer" },
        },
      ];
    } catch (e) {
      console.error("Failed to load contact-us from API:", e);
    } finally {
      this.loading = false;

      // runs after the component is mounted AND the DOM is updated
      nextTick(() => {
        const el = document.querySelector(".contact-us-main .contact-us-section");
        if (el) el.classList.remove("opacity-0");
      });
    }
  },
}).mount("#app");

const landing_page = "home_contact_us_page";

function exploreMore(ev) {
  var tracking = {
    event: "click_explore",
    landing_page: landing_page,
    section: "contact_us",
    event_action: "click",
    button: ev.dataset["button"],
  };

  setDataLayer(tracking);
  window.open(ev.dataset["href"], ev.dataset["target"]);
}
