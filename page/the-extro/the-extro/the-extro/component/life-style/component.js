const LifeStyleComponent = defineComponent({
  name: 'LifeStyleComponent',
  template: `
      <section id="s_lifestyle" data-section="s_lifestyle"
        class=" font-['IBM_Plex_Sans_Thai'] life-style-component py-10 min-h-[800px] relative flex bg-[url('/assets/image/page-the-extro/the-extro/s-lifestyle/bg.webp')] bg-center bg-cover onview">
        <!-- Video Background -->
        <div class="absolute inset-0 lg:max-h-none max-h-[1150px]">
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
                <div class="lg:w-1/6 lg:mt-0 mt-5 w-1/2" v-for="(item, index) in datasets.distinctive_location_meters" :key="index">
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
                        // Add a border for groups after the first:
                        groupIndex > 0 ? 'border-t lg:border-t-0 lg:border-l border-[#F7F7F7] pt-5 lg:pl-5' : ''
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
                <p>{{viewMore[language]}}</p>
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
    const viewMore= ref({th:'อ่านเพิ่มเติม',en:'View more'});

    // Static dataset for header and distinctive location
    const datasets = ref({
      s_life_detail: {
        th: "คอนโดมิเนียมย่านรางน้ำ ใจกลางกรุงเทพฯ ทำเลศักยภาพเพื่อการอยู่อาศัยและการลงทุนที่คุ้มค่า​",
        en: "Singha Estate's condominium in the Rang Nam area offers exceptional value and a strategic location in the center of Bangkok.​"
      },
      distinctive_location: {
        th: "คอนโดที่ตั้งอยู่ใจกลางเมือง ในซอยรางน้ำ ติดสวนสันติภาพขนาดใหญ่กว่า 20 ไร่ ให้คุณได้พักผ่อนท่ามกลางธรรมชาติอันร่มรื่น พร้อมการเดินทางที่สะดวกสบายด้วยรถไฟฟ้าบีทีเอส แอร์พอร์ต เรล ลิงก์ และทางด่วน โครงการคุณภาพที่ตอบโจทย์ทุกไลฟ์สไตล์​",
        en: "With its prime setting beside the serene Santiphap park, this condominium offers the perfect blend of urban convenience and natural tranquility. Easy access to the city's vibrant attractions via BTS, Airport Rail Link, and expressways. An ideal choice for a luxurious and convenient lifestyle.​"
      },
      distinctive_location_meters: [
        {
          text: { en: "400", th: "400" },
          unit: { en: "m.", th: "ม." },
          details: { en: "Victory Monument <br/>BTS station", th: "รถไฟฟ้าบีทีเอส <br/>อนุสาวรีย์ชัยสมรภูมิ" }
        },
        {
          text: { en: "550", th: "550" },
          unit: { en: "m.", th: "ม." },
          details: { en: "Rajavithi hospital", th: "โรงพยาบาลราชวิถี" }
        },
        {
          text: { en: "10", th: "10" },
          unit: { en: "m.", th: "ม." },
          details: { en: "Santiphap park", th: "สวนสันติภาพ" }
        },
        {
          text: { en: "700", th: "700" },
          unit: { en: "m.", th: "ม." },
          details: { en: "Wannasorn building", th: "อาคารวรรณสรณ์" }
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
            name: { en: "Victory Monument BTS station", th: "รถไฟฟ้าบีทีเอส อนุสาวรีย์ชัยสมรภูมิ" },
            detail: { en: "400 m.", th: "400 ม." }
          },
          {
            name: { en: "Phaya Thai BTS station", th: "รถไฟฟ้าบีทีเอส พญาไท" },
            detail: { en: "850 m.", th: "850 ม." }
          },
          {
            name: { en: "Bangkok Airport Rail Link Phaya Thai station", th: "สถานีรถไฟฟ้า แอร์พอร์ต เรล ลิงก์ พญาไท" },
            detail: { en: "900 m.", th: "900 ม." }
          }
        ]
      },
      {
        title: {
          en: "HOSPITAL",
          th: "โรงพยาบาล"
        },
        icon: "/assets/icon/hostpital.webp",
        item: [
          {
            name: { en: "Rajavithi hospital", th: "โรงพยาบาลราชวิถี" },
            detail: { en: "550 m.", th: "550 ม." }
          },
          {
            name: { en: "Phyathai 1 hospital", th: "โรงพยาบาลพญาไท 1" },
            detail: { en: "950 m.", th: "950 ม." }
          },
          {
            name: { en: "Phyathai 2 hospital", th: "โรงพยาบาลพญาไท 2" },
            detail: { en: "1.5 km.", th: "1.5 กม." }
          },
          {
            name: { en: "Ramathibodi hospital", th: "โรงพยาบาลรามาธิบดี" },
            detail: { en: "2.3 km.", th: "2.3 กม." }
          },
          {
            name: { en: "Phramongkutklao hospital", th: "โรงพยาบาลพระมงกุฎเกล้า" },
            detail: { en: "2.3 km.", th: "2.3 กม." }
          }
        ]
      },
      {
        title: {
          en: "SURROUNDING AMENITIES",
          th: "คอมมูนิตี้มอลล์และไลฟ์สไตล์"
        },
        icon: "/assets/icon/market.webp",
        item: [
          {
            name: { en: "Santiphap park", th: "สวนสันติภาพ" },
            detail: { en: "10 m.", th: "10 ม." }
          },
          {
            name: { en: "King Power complex", th: "คิง เพาเวอร์ คอมเพล็กซ์" },
            detail: { en: "25 m.", th: "25 ม." }
          },
          {
            name: { en: "Century the movie plaza", th: "เซ็นจูรี่ เดอะมูฟวี่พลาซ่า" },
            detail: { en: "400 m.", th: "400 ม." }
          }
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
            name: { en: "Wannasorn building", th: "อาคารวรรณสรณ์" },
            detail: { en: "700 m.", th: "700 ม." }
          },
          {
            name: { en: "Faculty of Dentistry, Mahidol university", th: "คณะทันตแพทยศาสตร์ มหาวิทยาลัยมหิดล" },
            detail: { en: "1.7 km.", th: "1.7 กม." }
          },
          {
            name: { en: "Chulalongkorn university", th: "จุฬาลงกรณ์มหาวิทยาลัย" },
            detail: { en: "2.8 km.", th: "2.8 กม." }
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

    return { expand, showMore, language, datasets, fonts, information,viewMore };
  }
});
