const LifeStyleComponent = defineComponent({
  name: 'LifeStyleComponent',
  template: `
      <section id="lifestyle" data-section="s_lifestyle"
        class="life-style-component py-10 min-h-screen relative flex bg-center bg-cover onview">
        <!-- Video Background -->
        <div class="absolute inset-0">
          <video autoplay loop muted playsinline class="w-full h-full object-cover">
            <source :src="vdo" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="absolute left-0 top-0 h-full w-full bg-black/30"></div>
        <!-- Main Container -->
        <div class="container relative my-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
          <div class="flex flex-col gap-10">
            <!-- Header Section -->
            <div>
              <h2 class="text-[40px] uppercase font-['Kaisei_Decol'] font-medium text-center text-white">
                S LIFESTYLE
              </h2>
              <p class="text-center text-white font-normal">
                {{ datasets.s_life_detail[language] }}
              </p>
            </div>
  
            <!-- Distinctive Location Section -->
            <div class="flex gap-5 lg:flex-row flex-col lg:mt-5 mt-2">
              <div class="lg:w-2/6 w-full space-y-3">
                <p class="text-[24px] font-['Gotham'] font-medium uppercase text-white">
                  Distinctive Location
                </p>
                <p class="text-white text-[14px] font-normal">
                  {{ datasets.distinctive_location[language] }}
                </p>
              </div>
              <div class="flex lg:gap-20 mx-auto flex-wrap justify-center">
                <div class="lg:w-1/6 lg:mt-0 mt-5 w-1/2" v-for="(item, index) in datasets.distinctive_location_meters" :key="index">
                  <p class="font-thin text-[80px] text-white leading-none text-center">
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
                        groupIndex > 0 ? 'border-t lg:border-t-0 lg:border-l border-white pt-5 lg:pl-5' : ''
                    ]">
                    <!-- Render icon if available -->
                    <div class="h-[40px] w-[40px]" v-if="group.icon">
                    <img class="w-full h-full" :src="group.icon" :alt="group.title[language]">
                    </div>
                    <div>
                    <p class="text-[16px] font-medium uppercase text-white" :class="[fontCss()]">
                        {{ group.title[language] }}
                    </p>
                    </div>
                    <div>
                    <ul>
                        <li class="group flex justify-between text-white last:border-0"
                            v-for="(item, itemIndex) in group.item" :key="itemIndex">
                        <div class="lg:max-w-[180px] text-[14px] group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words"
                            v-html="item.name[language]"></div>
                        <div class="text-right text-[14px] group-hover:opacity-25 transition-all text-nowrap">
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
    const vdo = ref('/assets/image/page-srin-rachapuek/life/GettyImages-1350388721.mp4')

    // Static dataset for header and distinctive locationconst 
    datasets = ref({
      s_life_detail: {
        en: "Experience a fulfilling lifestyle in a prime location that complements your every need.",
        th: "บ้านเดี่ยวที่ให้คุณสัมผัสชีวิตที่ลงตัว บนทำเลศักยภาพ ตอบโจทย์ทุกไลฟ์สไตล์"
      },
      distinctive_location: {
        en: "Embrace a shady detached house amidst nature on Phutthamonthon Sai 1 Road. This prime location near the Ratchaphruek zone offers easy access to the city center via expressways and the MRT, and is complete with amenities for every family member, including international schools and leading hospitals.",
        th: "บ้านเดี่ยวที่ร่มรื่นท่ามกลางธรรมชาติ บนถนนพุทธมณฑลสาย 1 ทำเลศักยภาพใกล้โซนราชพฤกษ์เชื่อมต่อชีวิตเมืองได้อย่างสะดวกด้วยรถไฟฟ้าและทางด่วน พร้อมสิ่งอำนวยความสะดวกครบครันสำหรับทุกสมาชิกในครอบครัว ทั้งโรงเรียนนานาชาติและโรงพยาบาลชั้นนำ"
      },
      distinctive_location_meters: [
        {
          text: { en: "4.5", th: "4.5" },
          unit: { en: "km.", th: "กม." },
          details: { en: "Seacon Bangkae", th: "ซีคอน บางแค" }
        },
        {
          text: { en: "6", th: "6" },
          unit: { en: "km.", th: "กม." },
          details: { en: "Phyathai 3 Hospital", th: "โรงพยาบาลพญาไท 3" }
        },
        {
          text: { en: "3.5", th: "3.5" },
          unit: { en: "km.", th: "กม." },
          details: { en: "SISB Thonburi Campus", th: "โรงเรียนนานาชาติสิงคโปร์ สาขาธนบุรี (SISB)" }
        },
      ]
    });


    const information = ref([
      {
        title: {
          en: "SURROUNDING AMENITIES",
          th: "คอมมูนิตี้มอลล์ และ ไลฟ์สไตล์​"
        },
        icon: "/assets/icon/market.png",
        item: [
          {
            name: { en: "Seacon Bangkae", th: "ซีคอน บางแค" },
            detail: { en: "4.5 km.", th: "4.5 กม." }
          },
          {
            name: { en: "The Paseo Park Kanchanaphisek", th: "เดอะ พาซิโอ พาร์ค กาญจนาภิเษก" },
            detail: { en: "5 km.", th: "5 กม." }
          },
          {
            name: { en: "The Circle Ratchapruk", th: "เดอะเซอร์เคิล ราชพฤกษ์" },
            detail: { en: "6 km.", th: "6 กม." }
          },
          {
            name: { en: "The Mall Lifestore Bangkae", th: "เดอะมอลล์ไลฟ์สโตร์ บางแค" },
            detail: { en: "6 km.", th: "6 กม." }
          },
          {
            name: { en: "Central Westville", th: "เซ็นทรัล เวสต์วิลล์" },
            detail: { en: "9 km.", th: "9 กม." }
          }
        ]
      },
      {
        title: {
          en: "HOSPITAL",
          th: "โรงพยาบาล"
        },
        icon: "/assets/icon/hostpital.png",
        item: [
          {
            name: { en: "Phyathai 3 Hospital", th: "โรงพยาบาลพญาไท 3" },
            detail: { en: "6 km.", th: "6 กม." }
          },
          {
            name: { en: "Thonburi 2 Hospital", th: "โรงพยาบาลธนบุรี 2" },
            detail: { en: "6.5 km.", th: "6.5 กม." }
          },
          {
            name: { en: "Kasemrad Hospital Bang Khae", th: "โรงพยาบาลเกษมราษฎร์" },
            detail: { en: "7 km.", th: "7 กม." }
          },
          {
            name: { en: "Siriraj Hospital", th: "โรงพยาบาลศิริราช" },
            detail: { en: "9 km.", th: "9 กม." }
          },
          {
            name: { en: "Chaophya Hospital", th: "โรงพยาบาลเจ้าพระยา" },
            detail: { en: "11.5 km.", th: "11.5 กม." }
          }
        ]
      },
      {
        title: {
          en: "EDUCATION",
          th: "สถานศึกษา​"
        },
        icon: "/assets/icon/education.png",
        item: [
          {
            name: { en: "SISB Thonburi Campus", th: "โรงเรียนนานาชาติสิงคโปร์ สาขาธนบุรี (SISB)" },
            detail: { en: "3.5 km.", th: "3.5 กม." }
          },
          {
            name: { en: "Hummingbird International Kindergarten", th: "โรงเรียนอนุบาลนานาชาติ ฮัมมิ่งเบิร์ด" },
            detail: { en: "5 km.", th: "5 กม." }
          },
          {
            name: { en: "Double Trees International School Ratchaphruek Campus", th: "โรงเรียนอนุบาลนานาชาติ ดับเบิลทรี ราชพฤกษ์" },
            detail: { en: "6 km.", th: "6 กม." }
          },
          {
            name: { en: "Kensington – International Kindergarten", th: "โรงเรียนอนุบาลนานาชาติเคนซิงตัน" },
            detail: { en: "6 km.", th: "6 กม." }
          },
          {
            name: { en: "International Pioneers School Bangkhae Campus", th: "โรงเรียนนานาชาติอินเตอร์เนชั่นแนลไพโอเนียร์ส (IPS)" },
            detail: { en: "9.5 km.", th: "9.5 กม." }
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
      fonts.value = language.value === 'th' ? "" : "font-['Gotham']";
    });
    const fontCss = () => {
      return getLanguageFromPath() == 'en' ? "font-['Gotham']" : ""
    }
    return { expand, showMore, language, datasets, fonts, information, vdo, fontCss };
  }
});
