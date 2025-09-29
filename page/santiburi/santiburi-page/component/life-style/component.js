const LifeStyleComponent = defineComponent({
  name: 'LifeStyleComponent',
  template: `
      <section id="s_lifestyle" data-section="s_lifestyle"
        class=" font-['IBM_Plex_Sans_Thai'] life-style-component py-10 min-h-[800px] relative flex bg-[url('/assets/image/page-the-extro/the-extro/s-lifestyle/bg.png')] bg-center bg-cover onview">
        <!-- Video Background -->
        <div class="absolute inset-0 lg:max-h-none max-h-[1150px]">
          <video autoplay loop muted playsinline class="w-full h-full object-cover">
            <source src="/assets\/image\/santiburi-page\/lifestyle\/shutterstock_1107814249.mp4" type="video/mp4">
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
            <div class="flex gap-5 lg:flex-row lg:flex-wrap justify-center flex-col lg:mt-5 mt-2">
              <div class="lg:w-2/6 w-full space-y-3">
                <p class="text-[22px] font-medium uppercase text-white" :style="{fontFamily:fonts}">
                  Distinctive Location
                </p>
                <p class="text-white font-normal">
                  {{ datasets.distinctive_location[language] }}
                </p>
              </div>
              <div class="flex lg:gap-20 mx-auto lg:flex-nowrap flex-wrap justify-center">
                <div class="lg:w-fit lg:mt-0 mt-5 w-1/2" v-for="(item, index) in datasets.distinctive_location_meters" :key="index">
                  <div class="flex justify-center space-x-2">
                    <p class="font-thin text-[70px] text-white leading-none text-center">
                      {{ item.text[language] }}
                    </p>
                    <p class="text-white text-center leading-none font-normal mt-auto mb-2">
                      {{ item.unit[language] }}
                    </p>
                  </div>  
                  <p class="text-white text-center leading-none font-normal text-nowrap" v-html="item.details[language]"></p>
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
        th: "บ้านเดี่ยวที่มอบความเป็นส่วนตัวสูงสุด ให้คุณอยู่อย่างสบายและอบอุ่น ในบรรยากาศธรรมชาติที่สมบูรณ์แบบที่สุด",
        en: "A single-family home that offers the highest level of privacy, providing ultimate tranquility and warmth in the most natural setting possible.​"
      },
      distinctive_location: {
        th: "ตั้งอยู่บนพื้นที่สีเขียวขนาดใหญ่กว่า 45 ไร่ ติดถนนประดิษฐ์มนูธรรม ย่านน่าอยู่ใกล้ใจกลางเมือง เดินทางสะดวก ใกล้จุดขึ้นลงทางด่วน รายล้อมด้วยแหล่งไลฟ์สไตล์ ห้างสรรพสินค้า ร้านอาหารและโรงเรียนชื่อดัง​",
        en: "Located on over 45 Rai of premium land along Pradit Manutham Road, this neighborhood seamlessly blends urban convenience with serene living. Its prime location offers easy access to the city center and major expressways, along with a wealth of lifestyle amenities, including dining, shopping and renowned educational institutions.​​"
      },
      distinctive_location_meters: [
        {
          text: { en: "1", th: "1" },
          unit: {en: "km.", th: "กม." },
          details: {  en: "Expressway (Toll Gate) <br/>Ramintra", th: "ทางด่วน <br/>ด่านรามอินทรา" }
        },
        {
          text: { en: "1", th: "1" },
          unit: { en: "km.", th: "กม." },
          details: {en: "THE WALK <br/>Kaset-nawamin", th: "เดอะวอล์ค <br/>เกษตร-นวมินทร์" }
        },
        {
          text: { en: "3", th: "3" },
          unit: { en: "km.", th: "กม." },
          details: { en: "Navavej <br/>International Hospital", th: "โรงพยาบาล<br/>นวเวช"  }
        },
        {
          text: { en: "3", th: "3" },
          unit: { en: "km.", th: "กม." },
          details: {en: "KPIS <br/>International School", th: "โรงเรียนนานาชาติ<br/>กีรพัฒน์" }
        }
      ]
    });

    const information = ref([
      {
        title: { en: "TRANSPORTATION", th: "การเดินทาง" },
        icon: "/assets/icon/trans.webp",
        item: [
          {
            name: { en: "Expressway (Toll Gate) Ramintra", th: "ทางด่วน ด่านรามอินทรา" },
            detail: { en: "1 km.", th: "1 กม." }
          },
          {
            name: { en: "Expressway (Toll Gate) Yothin Phathana", th: "ทางด่วน ด่านโยธินพัฒนา" },
            detail: { en: "1.7 km.", th: "1.7 กม." }
          },
        ]
      },
      {
        title: { en: "SURROUNDING AMENITIES", th: "คอมมูนิตี้มอลล์ และ ไลฟ์สไตล์" },
        icon: "/assets/icon/market.webp",
        item: [
          { name: { en: "THE WALK Kaset-nawamin", th: "เดอะวอล์ค เกษตร-นวมินทร์" }, detail: { en: "1 km.", th: "1 กม." } },
          { name: { en: "Crystal Park", th: "คริสตัลพาร์ค" }, detail: { en: "4.9 km.", th: "4.9 กม." } },
          { name: { en: "Central Eastville", th: "เซ็นทรัลอีสต์วิลล์" }, detail: { en: "3.9 km.", th: "3.9 กม." } },
          { name: { en: "Crystal Design Center CDC", th: "คริสตัล ดีไซน์ เซ็นเตอร์" }, detail: { en: "3.1 km.", th: "3.1 กม." } },
          { name: { en: "Ekamai Road", th: "ถนนเอกมัย" }, detail: { en: "11 km.", th: "11 กม." } },
        ]
      },
      {
        title: { en: "HOSPITAL", th: "โรงพยาบาล" },
        icon: "/assets/icon/hostpital.webp", // ถ้าไฟล์สะกด hostpital.webp ให้ปรับตามของจริง
        item: [
          { name: { en: "Navavej International Hospital", th: "โรงพยาบาลนวเวช" }, detail: { en: "3 km.", th: "3 กม." } },
          { name: { en: "Bangkok Hospital", th: "โรงพยาบาลกรุงเทพ" }, detail: { en: "12 km.", th: "12 กม." } },
          { name: { en: "Samitivej Sukhumvit Hospital", th: "โรงพยาบาลสมิติเวช สุขุมวิท" }, detail: { en: "13 km.", th: "13 กม." } },
        ]
      },
      {
        title: { en: "EDUCATION", th: "สถานศึกษา" },
        icon: "/assets/icon/education.webp",
        item: [
          { name: { en: "KPIS International School", th: "โรงเรียนนานาชาติกีรพัฒน์" }, detail: { en: "3 km.", th: "3 กม." } },
          { name: { en: "Regent's International School", th: "โรงเรียนนานาชาติรีเจ้นท์กรุงเทพ" }, detail: { en: "8.6 km.", th: "8.6 กม." } },
        ]
      }
    ])

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
      fonts.value = language.value === 'th' ? "Gotham" : "DB Heavent";
    });

    return { expand, showMore, language, datasets, fonts, information };
  }
});
