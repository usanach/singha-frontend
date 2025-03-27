const ProjectsHighlightComponent = defineComponent({
  name: 'ProjectsHighlightComponent',
  template: `
    <section class="onview -mt-1" id="ProjectsHighlightComponent" data-section="project_signature">
      <div class="bg-[url('/assets/image/page-house/house-project-bg.png')] bg-cover bg-bottom">
        <div class="container lg:px-5 px-0">
          <div class="grid md:grid-cols-3 grid-cols-1 md:grid-rows-3 grid-rows-5 md:gap-8 gap-6 lg:px-4 px-0 md:py-20 py-10 md:max-h-[930px] max-h-[2000px]">
            <!-- Dynamic Heading -->
            <div class="md:p-4 p-10 text-left z-10">
              <h2 class="md:text-[60px] text-[40px] text-nowrap leading-none text-white" :class="[fontCss()]">
                <span v-html="data.heading[language]"></span>
              </h2>
            </div>
  
            <!-- Dynamic Image (Small) -->
            <div class="md:col-start-2 col-start-1 md:col-span-2 md:row-start-1 row-start-2 row-span-2 bg-center bg-cover md:mt-0 -mt-36 drop-shadow-xl md:ml-0 ml-10" 
                 :style="{ backgroundImage: 'url(' + data.images.s + ')' }"></div>
  
            <!-- Dynamic Image (Large) -->
            <div class="col-start-1 md:row-start-2 row-start-4 md:row-span-2 row-span-1 flex md:col-span-1 md:pl-0 pl-5">
              <div class="bg-cover bg-center lg:w-[350px] md:h-[380px] w-[270px] h-full mt-auto md:ml-auto drop-shadow-xl" 
                   :style="{ backgroundImage: 'url(' + data.images.l + ')' }"></div>
            </div>
  
            <!-- Dynamic Paragraph -->
            <div class="md:col-start-2 md:col-span-2 md:row-start-3 row-start-5 px-5">
              <p class="text-white lg:w-3/5 font-normal" v-html="data.description[language]"></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  setup() {
    // Default language is 'th'
    const language = ref('th');

    // JSON data for both languages along with shared images
    const data = ref({
      heading: {
        en: "House <br/>projects from  <br/>Singha Estate",
        th: "โครงการบ้านเดี่ยว<br/>จากสิงห์ เอสเตท"
      },
      description: {
        en: `We offer a "home" experience where every detail is a masterpiece. Our residences are crafted to nurture the soul and create lasting memories for your family. Embrace a lifestyle of sustainable elegance, a legacy that will be cherished for generations.`,
        th: `มอบประสบการณ์การใช้ชีวิตใน “บ้าน” ที่เราใส่ใจในรายละเอียด แม้ในจุดเล็กๆที่มองไม่เห็น สร้างความสุขในทุกช่วงเวลาอันมีค่าของสมาชิกในครอบครัว ส่งต่อความทรงจำอันมีค่า ไปยังรุ่นสู่รุ่น`
      },
      images: {
        s: "/assets/image/page-house/house-project/2.png",
        l: "/assets/image/page-house/house-project/1.png"
      }
    });

    // Reactive ref for language-specific content.
    // This is updated manually (no computed properties)
    const content = ref(data.value.th);

    // Function to determine language from the URL path
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    // Initialize AOS or any scroll-triggered animations
    const init = () => {
      AOS.init();
    };

    // On mount, set language and update the content manually.
    onMounted(() => {
      language.value = getLanguageFromPath();
      content.value = data.value[language.value];
      nextTick(() => {
        init();
      });
    });

    // Simple translation function (for demonstration) that returns English text.
    const translations = [
      { key: "overallStatus", en: "OVERALL STATUS" },
      { key: "dateLabel", en: "Date" },
      { key: "progressPicture", en: "PROGRESS PICTURE" },
      { key: "updatedOn", en: "Updated On" },
      { key: "approvedProjects", en: "Projects With Approved EIA Reports And Construction Permits." }
    ];

    const getTranslation = (key) => {
      const item = translations.find(t => t.key === key);
      return item ? item.en : '';
    };
    const fontCss = () => {
      return getLanguageFromPath() == "en" ? "font-['Cinzel']" : ""
    }
    return { language, data, content, getTranslation, fontCss };
  }
});
