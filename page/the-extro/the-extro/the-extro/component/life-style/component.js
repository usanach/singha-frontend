const LifeStyleComponent = defineComponent({
    name: 'LifeStyleComponent',
    template: `
      <section id="lifestyle" data-section="s_lifestyle"
        class="life-style-component py-10 min-h-screen relative flex bg-[url('/assets/image/page-the-extro/the-extro/s-lifestyle/bg.png')] bg-center bg-cover onview">
        <!-- Video Background -->
        <div class="absolute inset-0 lg:max-h-none max-h-[1150px]">
          <video autoplay loop muted playsinline class="w-full h-full object-cover">
            <source src="/assets/image/page-the-extro/the-extro/s-lifestyle/bg.png" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
  
        <!-- Main Container -->
        <div class="container relative my-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
          <div class="flex flex-col gap-10">
            <!-- Header Section -->
            <div>
              <h2 class="text-[40px] uppercase font-['Gotham'] font-medium text-center text-white">
                S LIFESTYLE
              </h2>
              <p class="text-center text-white">
                {{ datasets.s_life_detail[language] }}
              </p>
            </div>
  
            <!-- Distinctive Location Section -->
            <div class="flex gap-5 lg:flex-row flex-col lg:mt-5 mt-2">
              <div class="lg:w-2/6 w-full space-y-3">
                <p class="text-[24px] font-['Gotham'] font-medium uppercase text-white">
                  Distinctive Location
                </p>
                <p class="text-white text-[14px]">
                  {{ datasets.distinctive_location[language] }}
                </p>
              </div>
              <div class="flex lg:gap-20 mx-auto flex-wrap justify-center">
                <div class="lg:w-1/6 lg:mt-0 mt-5 w-1/2" v-for="(item, index) in datasets.distinctive_location_meters" :key="index">
                  <p class="font-thin text-[80px] text-white leading-none text-center">
                    {{ item.text[language] }}
                  </p>
                  <p class="text-white text-center leading-none">
                    {{ item.unit[language] }}
                  </p>
                  <p class="text-white text-center leading-none" v-html="item.details[language]"></p>
                </div>
              </div>
            </div>
  
            <!-- Dynamic Information Groups Section -->
            <div class="flex lg:gap-5 gap-2 mt-5 lg:flex-row flex-col justify-center">
                <div v-for="(group, groupIndex) in information" :key="groupIndex"
                    :class="[
                        // Hide groups on mobile when not expanded (except first)
                        groupIndex > 0 ? (expand ? '' : 'hidden lg:block') : '',
                        'space-y-3 lg:w-1/4 w-full pb-5',
                        // Add a border for groups after the first:
                        groupIndex > 0 ? 'border-t lg:border-t-0 lg:border-l border-[#F7F7F7] pt-5 lg:pl-5' : ''
                    ]">
                    <!-- Render icon if available -->
                    <div class="h-[40px] w-[40px]" v-if="group.icon">
                    <img class="w-full h-full" :src="group.icon" :alt="group.title[language]">
                    </div>
                    <div>
                    <p class="text-[24px] font-['DB_OnUma'] font-medium uppercase text-white">
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

        // Static dataset for header and distinctive location
        const datasets = ref({
            s_life_detail: {
                en: "คอนโดบนที่สุดของทำเล ที่รายล้อมด้วยสิ่งอำนวยความสะดวกครบที่สุด",
                th: "คอนโดบนที่สุดของทำเล ที่รายล้อมด้วยสิ่งอำนวยความสะดวกครบที่สุด​​"
            },
            distinctive_location: {
                en: "THE EXTRO พญาไท-รางน้ำ โดย SINGHA ESTATE คอนโดมิเนียม สไตล์โมเดิร์นลักซัวรี่ บนทำเลศักยภาพ ติดสวนสาธารณะ 20 ไร่ ใจกลางเมือง ตรงข้ามคิงพาวเวอร์ เพียง 5 นาที ถึง BTS อนุสาวรีย์ฯ รายล้อมไปด้วยสิ่งอำนวยความสะดวกที่ครบครัน",
                th: "THE EXTRO พญาไท-รางน้ำ โดย SINGHA ESTATE คอนโดมิเนียม สไตล์โมเดิร์นลักซัวรี่ บนทำเลศักยภาพ ติดสวนสาธารณะ 20 ไร่ ใจกลางเมือง ตรงข้ามคิงพาวเวอร์ เพียง 5 นาที ถึง BTS อนุสาวรีย์ฯ รายล้อมไปด้วยสิ่งอำนวยความสะดวกที่ครบครัน"
            },
            distinctive_location_meters: [
                {
                    text: { en: "25", th: "25" },
                    unit: { en: "m.", th: "m." },
                    details: { en: "King Power Rangnam", th: "King Power Rangnam" }
                },
                {
                    text: { en: "10", th: "10" },
                    unit: { en: "m.", th: "m." },
                    details: { en: "Thonburi 2 Hospital", th: "โรงพยาบาลธนบุรี 2" }
                },
                {
                    text: { en: "700", th: "700" },
                    unit: { en: "m.", th: "m." },
                    details: { en: "From <br/> Wannasorn Tower", th: "From <br/> Wannasorn Tower" }
                },
                {
                    text: { en: "400", th: "400" },
                    unit: { en: "m.", th: "m." },
                    details: { en: "From <br/> BTS Victory monument", th: "From <br/> BTS Victory monument" }
                }
            ]
        });

        // Dynamic information groups array
        const information = ref([
            {
                title: {
                    en: "TRANSPORTATIONS ",
                    th: "การเดินทาง"
                },
                icon: "/assets/icon/trans.png",
                item: [
                    {
                        name: { en: "BTS Victory Monument", th: "BTS Victory Monument" },
                        detail: { en: "400 m.", th: "400 ม." }
                    },
                    {
                        name: { en: "BTS Phayathai", th: "BTS Phayathai" },
                        detail: { en: "450 m.", th: "450 ม." }
                    },
                    {
                        name: { en: "Airport Link Phayathai", th: "Airport Link Phayathai" },
                        detail: { en: "900 m.", th: "900 ม." }
                    }
                ]
            },
            {
                title: { en: "HOSPITAL", th: "โรงพยาบาล" },
                icon: "/assets/icon/hostpital.png",
                item: [
                    {
                        name: { en: "Rajavithi Hospital", th: "Rajavithi Hospital" },
                        detail: { en: "550 m.", th: "550 ม." }
                    },
                    {
                        name: { en: "Phayathai I Hospital", th: "Phayathai I Hospital" },
                        detail: { en: "950 m.", th: "950 ม." }
                    },
                    {
                        name: { en: "Phayathai II Hospital", th: "Phayathai II Hospital" },
                        detail: { en: "1.5 km.", th: "1.5 กม." }
                    },
                    {
                        name: { en: "Ramathibodi Hospital", th: "Ramathibodi Hospital" },
                        detail: { en: "2.3 km.", th: "2.3 กม." }
                    },
                    {
                        name: { en: "Phramongkutklao Hospital", th: "Phramongkutklao Hospital" },
                        detail: { en: "2.3 km.", th: "2.3 กม." }
                    }
                ]
            },
            {
                title: { en: "SURROUNDING AMENITIES", th: "คอมมูนิตี้มอลล์ และ ไลฟ์สไตล์​" },
                icon: "/assets/icon/market.png",
                item: [
                    {
                        name: { en: "Santiphap Park", th: "Santiphap Park" },
                        detail: { en: "10 m.", th: "10 ม." }
                    },
                    {
                        name: { en: "King Power Complex", th: "King Power Complex" },
                        detail: { en: "23 m.", th: "23 ม." }
                    },
                    {
                        name: { en: "Century the Movie Plaza", th: "Century the Movie Plaza" },
                        detail: { en: "400 m.", th: "400 ม." }
                    }
                ]
            },
            {
                title: { en: "EDUCATION", th: "สถานศึกษา​​" },
                icon: "/assets/icon/education.png",
                item: [
                  {
                    name: { en: "Wannasorn Tower", th: "Wannasorn Tower" },
                    detail: { en: "700 m.", th: "700 m." }
                  },
                  {
                    name: { en: "Faculty of Dentistry", th: "Faculty of Dentistry" },
                    detail: { en: "700 m.", th: "1.7 km." }
                  },
                  {
                    name: { en: "Mahidol University", th: "Mahidol University" },
                    detail: { en: "", th: "" }
                  },
                  {
                    name: { en: "Chulalongkorn University", th: "Chulalongkorn University" },
                    detail: { en: "-", th: "400 m." }
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

        return { expand, showMore, language, datasets, fonts, information };
    }
});
