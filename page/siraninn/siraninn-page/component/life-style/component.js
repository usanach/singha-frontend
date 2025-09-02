const LifeStyleComponent = defineComponent({
  name: 'LifeStyleComponent',
  template: `
      <section id="s_lifestyle" data-section="s_lifestyle"
        class=" font-['IBM_Plex_Sans_Thai'] life-style-component py-10 min-h-[800px] relative flex bg-center bg-cover onview" :style="{backgroundImage:'url(/assets/image/page-siraninn/lifestyle/bg.png)'}">
        <!-- Video Background -->
        <div class="absolute inset-0 lg:max-h-none max-h-[1150px]">
          <video autoplay loop muted playsinline class="w-full h-full object-cover">
            <source src="/assets/image/page-siraninn/lifestyle/gettyimages-1429011849-640_adpp.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="absolute top-0 left-0 w-full h-full bg-black/30"></div>
  
        <!-- Main Container -->
        <div class="container relative my-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
          <div class="flex flex-col gap-10">
            <!-- Header Section -->
            <div>
              <h2 class="text-[35px] uppercase font-medium text-center text-white" :style="{fontFamily:fonts}">
                S LIFESTYLE
              </h2>
              <p class="text-center text-white text-[20px] mt-3">
                {{ datasets.s_life_detail[language] }}
              </p>
            </div>
  
            <!-- Distinctive Location Section -->
            <div class="flex gap-5 lg:flex-row flex-col lg:mt-5 mt-2">
              <div class="lg:w-2/6 w-full space-y-3">
                <p class="text-[22px] font-medium uppercase text-white" :style="{fontFamily:fonts}">
                  Distinctive Location
                </p>
                <p class="text-white font-normal">
                  {{ datasets.distinctive_location[language] }}
                </p>
              </div>
              <div class="flex lg:gap-20 mx-auto flex-wrap justify-center">
                <div class="lg:w-1/6 lg:mt-0 mt-5 w-1/2" v-for="(item, index) in datasets.distinctive_location_meters" :key="index">
                  <div class="flex justify-center">
                    <p class="font-thin text-[70px] text-white leading-none text-center">
                      {{ item.text[language] }}
                    </p>
                    <p class="text-white text-center leading-none font-normal mt-auto mb-2">
                      {{ item.unit[language] }}
                    </p>
                  </div>
                  <p class="text-white text-center leading-none font-normal" v-html="item.details[language]"></p>
                </div>
              </div>
            </div>
  
            <!-- Dynamic Information Groups Section -->
            <div class="flex lg:gap-5 gap-2 mt-5 lg:flex-row flex-col justify-center">
                <div v-for="(group, groupIndex) in information" :key="groupIndex"
                    :class="[
                        // Hide groups on mobile when not expanded (except first)
                        groupIndex > 0 ? (expand ? '' : 'hidden lg:block') : '',
                        'space-y-3 lg:w-1/4 w-full pb-5 lg:p-5',
                        // Add a border for groups after the first:
                        groupIndex > 0 ? 'border-t lg:border-t-0 lg:border-l border-[#F7F7F7] pt-5 lg:pl-5' : 'lg:pl-0'
                    ]">
                    <!-- Render icon if available -->
                    <div class="h-[40px] w-[40px]" v-if="group.icon">
                    <img class="w-full h-full" :src="group.icon" :alt="group.title[language]">
                    </div>
                    <div>
                    <p class="text-[22px] font-medium uppercase text-white">
                        {{ group.title[language] }}
                    </p>
                    </div>
                    <div>
                    <ul>
                        <li class="group flex justify-between text-white last:border-0"
                            v-for="(item, itemIndex) in group.item" :key="itemIndex">
                        <div class="lg:max-w-[250px] font-normal group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words"
                            v-html="item.name[language]"></div>
                        <div class="text-right group-hover:opacity-25 transition-all text-nowrap font-normal">
                            {{ item.detail[language] }}
                        </div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>

            <!-- Button Show More สำหรับ Mobile -->
            <div class="relative lg:hidden block w-full">
              <button 
                type="button" 
                id="expand-div" 
                class="px-5 text-center w-full border border-1 border-white py-3 text-white text-[18px]"
                :class="{ hidden: expand }"
                @click="showMore">
                <p>อ่านเพิ่มเติม</p>
                <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13.114" height="7.498" viewBox="0 0 13.114 7.498">
                    <path d="M12.747,16.484l4.958-4.962a.933.933,0,0,1,1.324,0,.945.945,0,0,1,0,1.327L13.41,18.471a.935.935,0,0,1-1.292.027L6.461,12.853a.937.937,0,0,1,1.324-1.327Z" fill="#fff"></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    `,
  setup() {
    // Reactive States
    const expand = ref(false);
    const language = ref('th');
    const fonts = ref('');

    // Static dataset for header and distinctive location
    const datasets = ref({
      s_life_detail: {
        th: "พื้นที่ส่วนตัวที่ออกแบบเพื่อการพักผ่อนอย่างแท้จริง​ให้ทุกวันของคุณเต็มไปด้วยความสงบและผ่อนคลายในแบบที่คุณต้องการ",
        en: "Private spaces designed for genuine relaxation. Each day is filled with the tranquility and calm you desire, tailored to your personal preferences.​"
      },
      distinctive_location: {
        th: "พัฒนาการ ทำเลศักยภาพแห่งการใช้ชีวิตที่เหนือกว่า สัมผัสคุณภาพชีวิตระดับสูง บนทำเลใจกลางเมือง พร้อมสิ่งอำนวยความสะดวกครบครัน พร้อมตอบรับทุกไลฟ์สไตล์และการใช้ชีวิตที่สมบูรณ์แบบ​",
        en: "Pattanakarn is an up and coming area with promising opportunities. Located to promote unparalleled potential for elevated living. Experience a superior quality of life in the heart of the city where every lifestyle and fulfill your vision of a perfect life.​​"
      },
      distinctive_location_meters: [
        {
          text: { en: "4", th: "4" },
          unit: { en: "km.", th: "กม." },
          details: { en: "Chalong Rat Expressway", th: "ทางพิเศษฉลองรัช" }
        },
        {
          text: { en: "7.5", th: "7.5" },
          unit: { en: "km.", th: "กม." },
          details: {en: "J Avenue Thonglor", th: "เจ อเวนิว ทองหล่อ" }
        },
        {
          text: { en: "7", th: "7" },
          unit: { en: "km.", th: "กม." },
          details: { en: "Krungthep Hospital", th: "โรงพยาบาลกรุงเทพ" }
        },
        {
          text: { en: "6", th: "6" },
          unit: { en: "km.", th: "กม." },
          details: { en: "St. Andrews International School", th: "โรงเรียนนานาชาติ เซนต์ แอนดรูว แคมปัส สุขุมวิท"  }
        }
      ]
    });
    const information = ref([
      {
        title: { en: "TRANSPORTATION", th: "การเดินทาง" },
        icon: "/assets/icon/trans.webp",
        item: [
          {
            name: { en: "Chalong Rat Expressway", th: "ทางพิเศษฉลองรัช" },
            detail: { en: "4 km.", th: "4 กม." }
          },
          {
            name: { en: "BTS Green Line, On Nut Station", th: "รถไฟฟ้า BTS สายสีเขียว สถานีอ่อนนุช" },
            detail: { en: "5 km.", th: "5 กม." }
          },
        ]
      },
      {
        title: { en: "SURROUNDING AMENITIES", th: "คอมมูนิตี้มอลล์ และ ไลฟ์สไตล์" },
        icon: "/assets/icon/market.webp",
        item: [
          { name: { en: "J Avenue Thonglor", th: "เจ อเวนิว ทองหล่อ" }, detail: { en: "7.5 km.", th: "7.5 กม." } },
          { name: { en: "Suanluang Rama IX", th: "สวนหลวง ร. ๙" }, detail: { en: "7.5 km.", th: "7.5 กม." } },
          { name: { en: "The Em District", th: "ดิ เอ็มดิสทริค" }, detail: { en: "10 km.", th: "10 กม." } },
          { name: { en: "Benjakitti Park", th: "สวนเบญจกิติ" }, detail: { en: "10 km.", th: "10 กม." } },
          { name: { en: "Siam Paragon", th: "สยามพารากอน" }, detail: { en: "13 km.", th: "13 กม." } },
        ]
      },
      {
        title: { en: "HOSPITAL", th: "โรงพยาบาล" },
        icon: "/assets/icon/hostpital.webp", // ถ้าไฟล์สะกด hostpital.webp ให้ปรับตามของจริง
        item: [
          { name: { en: "Krungthep Hospital", th: "โรงพยาบาลกรุงเทพ" }, detail: { en: "7 km.", th: "7 กม." } },
          { name: { en: "Samitivej Sukhumvit Hospital", th: "โรงพยาบาลสมิติเวช" }, detail: { en: "8 km.", th: "8 กม." } },
          { name: { en: "Bumrungrad International Hospital", th: "โรงพยาบาลบำรุงราษฎร์" }, detail: { en: "10 km.", th: "10 กม." } },
        ]
      },
      {
        title: { en: "EDUCATION", th: "สถานศึกษา" },
        icon: "/assets/icon/education.webp",
        item: [
          { name: { en: "St. Andrews International School", th: "โรงเรียนนานาชาติ เซนต์ แอนดรูว แคมปัส สุขุมวิท" }, detail: { en: "6 km.", th: "6 กม." } },
          { name: { en: "Brighton College Bangkok School", th: "โรงเรียนนานาชาติ ไบรท์ตันคอลเลจ กรุงเทพ" }, detail: { en: "10 km.", th: "10 กม." } },
        ]
      }
    ]);


    // Function to extract language from URL
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th';
    };

    // Function to show more information (mobile only)
    const showMore = () => {
      expand.value = true;
    };

    // When component is mounted, set language and fonts
    onMounted(() => {
      language.value = getLanguageFromPath();
      fonts.value = language.value === 'th' ? "The Seasons" :"The Seasons";
    });

    return { expand, showMore, language, datasets, fonts, information };
  }
});
