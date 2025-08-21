const LifeStyleComponent = defineComponent({
  name: 'LifeStyleComponent',
  template: `
      <section id="s_lifestyle" data-section="s_lifestyle"
        class=" font-['IBM_Plex_Sans_Thai'] life-style-component py-10 min-h-[800px] relative flex bg-[url('/assets/image/page-the-extro/the-extro/s-lifestyle/bg.png')] bg-center bg-cover onview">
        <!-- Video Background -->
        <div class="absolute inset-0 lg:max-h-none">
          <video autoplay loop muted playsinline class="w-full h-full object-cover">
            <source src="/assets/image/page-the-extro/the-extro/s-lifestyle/bg.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="absolute top-0 left-0 w-full h-full bg-black/30"></div>
  
        <!-- Main Container -->
        <div class="container relative my-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
          <div class="flex flex-col gap-10">
            <!-- Header Section -->
            <div>
              <h2 class="text-[35px] uppercase font-medium text-center text-white font-['Gotham']">
                S LIFESTYLE
              </h2>
              <p class="text-center text-white text-[20px] mt-3">
                {{ datasets.s_life_detail[language] }}
              </p>
            </div>
  
            <!-- Distinctive Location Section -->
            <div class="flex gap-5 lg:flex-row flex-col lg:mt-5 mt-2">
              <div class="lg:w-2/6 w-full space-y-3">
                <p class="text-[22px] font-medium uppercase text-white font-['Gotham']">
                  Distinctive Location
                </p>
                <p class="text-white font-normal">
                  {{ datasets.distinctive_location[language] }}
                </p>
              </div>
              <div class="flex lg:gap-20 mx-auto flex-wrap justify-center">
                <div class="lg:w-1/6 lg:mt-0 mt-5 w-1/2" v-for="(item, index) in datasets.distinctive_location_meters" :key="index">
                  <p class="font-thin text-[70px] text-white leading-none text-center">
                    {{ item.text[language] }}
                  </p>
                  <p class="text-white text-center leading-none font-normal">
                    {{ item.unit[language] }}
                  </p>
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
                        <div class="lg:max-w-[180px] font-normal group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words"
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
        th: "คอนโดมิเนียมบนที่สุดของทำเลใจกลางทองหล่อ รายล้อมด้วยสิ่งอำนวยความสะดวกที่สมบูรณ์แบบเพื่อคุณ​​",
        en: "A residential masterpiece at the apex of Thonglor, surrounded by sophisticated amenities and conveniences.​​"
      },
      distinctive_location: {
        th: "ทำเลใจกลางเมืองบนถนนสุขุมวิท สะดวกสบายด้วยที่ตั้งที่ห่างจากรถไฟฟ้าบีทีเอสสถานีทองหล่อเพียง 20 เมตร ความสงบและความหรูหราสุดพิเศษที่หยุดความวุ่นวายของชีวิตเมืองได้",
        en: "Located in the city center on Sukhumvit road, just 20 meters from BTS Thonglor Station. Tranquility and exceptional luxury in perfect contrast to the bustling city life.​​"
      },
      distinctive_location_meters: [
        {
          text: { en: "20", th: "20" },
          unit: { en: "m.", th: "ม." },
          details: { en: "BTS Green Line,  Thonglor Station", th: "รถไฟฟ้า BTS สายสีเขียว สถานีทองหล่อ" }
        },
        {
          text: { en: "1.2", th: "1.2" },
          unit: { en: "km.", th: "กม." },
          details: { en: "Sukhumvit Hospital", th: "โรงพยาบาลสุขุมวิท" }
        },
        {
          text: { en: "550", th: "550" },
          unit: { en: "m.", th: "ม." },
          details: { en: "Rain Hill", th: "เรนฮิลล์"  }
        },
        {
          text: { en: "120", th: "120" },
          unit: { en: "m.", th: "ม." },
          details: { en: "Bangkok Prep International School", th: "โรงเรียนนานาชาติบางกอก พรีแพราธอรี แอนด์ เซ็กเคินเดอรี"  }
        }
      ]
    });


    const information = ref([
      {
        title: {
          en: "TRANSPORTATION",
          th: "การเดินทาง"
        },
        icon: "/assets/icon/trans.webp",
        item: [
          {
            name: { en: "BTS Green Line,  Thonglor Station", th: "รถไฟฟ้า BTS สายสีเขียว สถานีทองหล่อ" },
            detail: { en: "20 m.", th: "20 ม." }
          },
          {
            name: { en: "MRT, Sukhumvit Station", th: "รถไฟฟ้า MRT สถานีสุขุมวิท" },
            detail: { en: "2.4 km.", th: "2.4 กม." }
          },
          {
            name: { en: "Chalerm Maha Nakhon Expressway", th: "ทางพิเศษเฉลิมมหานคร	" },
            detail: { en: "3.3 km.", th: "3.3 กม." }
          },
        ]
      },
      {
        title: {
          en: "HOSPITAL",
          th: "โรงพยาบาล"
        },
        icon: "/assets/icon/hostpital.webp", // ถ้าไฟล์จริงสะกดเป็น hospital.webp ควรแก้ path นี้ด้วย
        item: [
          {
            name: { en: "Sukhumvit Hospital", th: "โรงพยาบาลสุขุมวิท" },
            detail: { en: "1.2 km.", th: "1.2 กม." }
          },
          {
            name: { en: "Samitivej Sukhumvit Hospital", th: "โรงพยาบาลสมิติเวช สุขุมวิท" },
            detail: { en: "1.3 km.", th: "1.3 กม." }
          },
          {
            name: { en: "Camillian Hospital", th: "โรงพยาบาลคามิลเลียน" },
            detail: { en: "2.6 km.", th: "2.6 กม." }
          },
          {
            name: { en: "Rutnin Eye Hospital", th: "โรงพยาบาลจักษุ รัตนิน" },
            detail: { en: "3.3 km.", th: "3.3 กม." }
          },
          {
            name: { en: "Bangkok Hospital", th: "โรงพยาบาลกรุงเทพ" },
            detail: { en: "3.9 km.", th: "3.9 กม." }
          },
          {
            name: { en: "Bumrungrad International Hospital", th: "โรงพยาบาลบำรุงราษฎร์ อินเตอร์เนชั่นแนล" },
            detail: { en: "4.0 km.", th: "4.0 กม." }
          },
          {
            name: { en: "Asoke Skin Hospital", th: "โรงพยาบาลผิวหนัง อโศก" },
            detail: { en: "5.3 km.", th: "5.3 กม." }
          }
        ]
      },
      {
        title: {
          en: "SURROUNDING AMENITIES",
          th: "คอมมูนิตี้มอลล์ และ ไลฟ์สไตล์"
        },
        icon: "/assets/icon/market.webp",
        item: [
          { name: { en: "Rain Hill", th: "เรนฮิลล์" }, detail: { en: "550 m.", th: "550 ม." } },
          { name: { en: "Gateway Ekamai", th: "เกทเวย์ เอกมัย" }, detail: { en: "1.1 km.", th: "1.1 กม." } },
          { name: { en: "Market Place", th: "มาร์เก็ตเพลส" }, detail: { en: "1.4 km.", th: "1.4 กม." } },
          { name: { en: "The Em District", th: "ดิ เอ็มดิสทริค" }, detail: { en: "1.4 km.", th: "1.4 กม." } },
          { name: { en: "Suanplern Market", th: "สวนเพลิน มาร์เก็ต" }, detail: { en: "1.8 km.", th: "1.8 กม." } },
          { name: { en: "Seenspace", th: "ซีนสเปซ" }, detail: { en: "2.0 km.", th: "2.0 กม." } },
          { name: { en: "J Avenue", th: "เจ อเวนิว" }, detail: { en: "2.1 km.", th: "2.1 กม." } },
          { name: { en: "K Village", th: "เค วิลเลจ" }, detail: { en: "2.2 km.", th: "2.2 กม." } },
          { name: { en: "Terminal 21", th: "เทอร์มินอล 21" }, detail: { en: "3.2 km.", th: "3.2 กม." } },
          { name: { en: "Singha Complex", th: "สิงห์ คอมเพล็กซ์" }, detail: { en: "3.6 km.", th: "3.6 กม." } },
          { name: { en: "Makkasan Complex", th: "มักกะสันคอมเพล็กซ์" }, detail: { en: "4.0 km.", th: "4.0 กม." } }
        ]
      },
      {
        title: {
          en: "EDUCATION",
          th: "สถานศึกษา"
        },
        icon: "/assets/icon/education.webp",
        item: [
          {
            name: { en: "Bangkok Prep International School", th: "โรงเรียนนานาชาติบางกอก พรีแพราธอรี แอนด์ เซ็กเคินเดอรี" },
            detail: { en: "120 m.", th: "120 ม." }
          },
          {
            name: { en: "Trinity International School", th: "โรงเรียนนานาชาติทรีนีตี้" },
            detail: { en: "450 m.", th: "450 ม." }
          },
          {
            name: { en: "Bangkok University", th: "มหาวิทยาลัยกรุงเทพ" },
            detail: { en: "2.2 km.", th: "2.2 กม." }
          },
          {
            name: { en: "Srinakharinwirot (Prasarnmit) University", th: "มหาวิทยาลัยศรีนครินทรวิโรฒ ประสานมิตร" },
            detail: { en: "3.2 km.", th: "3.2 กม." }
          },
          {
            name: { en: "Wattana Wittaya Academy", th: "โรงเรียนวัฒนาวิทยาลัย" },
            detail: { en: "3.2 km.", th: "3.2 กม." }
          },
          {
            name: { en: "Ekamai International School", th: "โรงเรียนนานาชาติเอกมัย" },
            detail: { en: "3.2 km.", th: "3.2 กม." }
          }
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
      fonts.value = language.value === 'th' ? "" : "";
    });

    return { expand, showMore, language, datasets, fonts, information };
  }
});
