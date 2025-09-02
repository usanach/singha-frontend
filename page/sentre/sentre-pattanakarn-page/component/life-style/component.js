const LifeStyleComponent = defineComponent({
  name: 'LifeStyleComponent',
  template: `
      <section id="s_lifestyle" data-section="s_lifestyle"
        class=" font-['IBM_Plex_Sans_Thai'] life-style-component py-10 min-h-[800px] relative flex bg-center bg-cover onview" :style="{backgroundImage:'url(/assets/image/page-sentre/lifestyle/bg.png)'}">
        <!-- Video Background -->
        <div class="absolute inset-0 lg:max-h-none max-h-[1150px]">
          <video autoplay loop muted playsinline class="w-full h-full object-cover">
            <source src="/assets\/image\/page-sentre\/lifestyle\/Coffee.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="absolute top-0 left-0 w-full h-full bg-white/70"></div>
  
        <!-- Main Container -->
        <div class="container relative my-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
          <div class="flex flex-col gap-10">
            <!-- Header Section -->
            <div>
              <h2 class="text-[35px] uppercase font-medium text-center text-[#564B40]" :style="{fontFamily:fonts}">
                S LIFESTYLE
              </h2>
              <p class="text-center text-[#564B40] text-[20px] mt-3">
                {{ datasets.s_life_detail[language] }}
              </p>
            </div>
  
            <!-- Distinctive Location Section -->
            <div class="flex gap-5 lg:flex-row lg:flex-wrap justify-center flex-col lg:mt-5 mt-2">
              <div class="lg:w-2/6 w-full space-y-3">
                <p class="text-[22px] font-medium uppercase text-[#564B40]" :style="{fontFamily:fonts}">
                  Distinctive Location
                </p>
                <p class="text-[#564B40] font-normal">
                  {{ datasets.distinctive_location[language] }}
                </p>
              </div>
              <div class="flex lg:gap-20 mx-auto lg:flex-nowrap flex-wrap justify-center">
                <div class="lg:w-fit lg:mt-0 mt-5 w-1/2" v-for="(item, index) in datasets.distinctive_location_meters" :key="index">
                  <div class="flex justify-center space-x-2">
                    <p class="font-thin text-[70px] text-[#564B40] leading-none text-center">
                      {{ item.text[language] }}
                    </p>
                    <p class="text-[#564B40] text-center leading-none font-normal mt-auto mb-2">
                      {{ item.unit[language] }}
                    </p>
                  </div>  
                  <p class="text-[#564B40] text-center leading-none font-normal text-nowrap" v-html="item.details[language]"></p>
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
                        groupIndex > 0 ? 'border-t lg:border-t-0 lg:border-l border-[#564B40] pt-5 lg:pl-5' : 'lg:pl-0'
                    ]">
                    <!-- Render icon if available -->
                    <div class="h-[40px] w-[40px]" v-if="group.icon">
                    <img class="w-full h-full" :src="group.icon" :alt="group.title[language]">
                    </div>
                    <div>
                    <p class="text-[22px] font-medium uppercase text-[#564B40]">
                        {{ group.title[language] }}
                    </p>
                    </div>
                    <div>
                    <ul>
                        <li class="group flex justify-between text-[#564B40] last:border-0"
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
                class="px-5 text-center w-full border border-1 border-[#564B40] py-3 text-[#564B40] text-[18px]"
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
        th: "โฮมออฟฟิศ ทำเลศักยภาพ ใกล้ทุกการเชื่อมต่อ ตอบโจทย์ธุรกิจยุคใหม่ ในซอยพัฒนาการ 32​​",
        en: "SENTRE offers the ideal setting for modern business success. Located in Pattanakarn 32, it’s near all key roads access.​​"
      },
      distinctive_location: {
        th: "ตั้งอยู่ติดถนนพัฒนาการ 32 มีศักยภาพในการทำธุรกิจหรือประกอบกิจการส่วนตัว เดินทางสู่ใจกลางเมืองได้สะดวกสบาย สามารถปรับเปลี่ยนฟังก์ชั่นให้ตอบโจทย์การใช้งาน เป็นได้ทั้งโฮมออฟฟิศ สำหรับทำธุรกิจ หรือประกอบกิจการส่วนตัว และทาวน์โฮมสำหรับอยู่อาศัย​​​",
        en: "Strategic Home office for today’s entrepreneurs located on Pattanakarn 32 Road. This property offers excellent potential for commercial enterprises or private ventures. Enjoy convenient access to the city center and the flexibility to adapt the space to your specific needs, whether as a home office, personal enterprise or a townhome for residential living.​​"
      },
      distinctive_location_meters: [
        {
          text: { en: "1.5", th: "1.5" },
          unit: { en: "km.", th: "กม." },
          details: { en: "Pattanakarn Road", th: "ถนนพัฒนาการ" }
        },
        {
          text: { en: "6", th: "6" },
          unit: { en: "km.", th: "กม." },
          details: { en: "The Nine Center", th: "ศูนย์การค้า<br/>เดอะไนน์ เซ็นเตอร์ <br/>พระราม 9" }
        },
        {
          text: { en: "6.9", th: "6.9" },
          unit: { en: "km.", th: "กม." },
          details: { en: "Samitivej Srinakarin", th: "โรงพยาบาล<br/>สมิติเวช ศรีนครินทร์" }
        },
        {
          text: { en: "9.5", th: "9.5" },
          unit: { en: "km.", th: "กม." },
          details: { en: "Wellington College <br/>International School Bangkok", th: "โรงเรียนนานาชาติ <br/>เวลลิงตันคอลเลจ" }
        }
      ]
    });

    const information = ref([
      {
        title: { en: "TRANSPORTATION", th: "การเดินทาง" },
        icon: "/assets\/image\/page-la-soie-de-s\/lifestyle\/trans.svg",
        item: [
          { name: { en: "Pattanakarn Road", th: "ถนนพัฒนาการ" }, detail: { en: "1.5 km.", th: "1.5 กม." } },
          { name: { en: "Chalong Rat Expressway", th: "ทางด่วนฉลองรัช" }, detail: { en: "3 km.", th: "3 กม." } },
          { name: { en: "Srinakarin Road", th: "ถนนศรีนครินทร์" }, detail: { en: "4 km.", th: "4 กม." } },
          { name: { en: "Sukhumvit Road", th: "ถนนสุขุมวิท" }, detail: { en: "4.5 km.", th: "4.5 กม." } },
        ]
      },
      {
        title: { en: "SURROUNDING AMENITIES", th: "คอมมูนิตี้มอลล์ และ ไลฟ์สไตล์" },
        icon: "/assets\/image\/page-la-soie-de-s\/lifestyle\/market.svg",
        item: [
          { name: { en: "The Nine Center", th: "ศูนย์การค้าเดอะไนน์ เซ็นเตอร์ พระราม 9" }, detail: { en: "6 km.", th: "6 กม." } },
          { name: { en: "Singha Complex", th: "สิงห์ คอมเพล็กซ์" }, detail: { en: "8 km.", th: "8 กม." } },
          { name: { en: "The Em District", th: "ดิ เอ็มดิสทริค" }, detail: { en: "9 km.", th: "9 กม." } },
        ]
      },
      {
        title: { en: "HOSPITAL", th: "โรงพยาบาล" },
        icon: "/assets\/image\/page-la-soie-de-s\/lifestyle\/hospital.svg", // ถ้าไฟล์คุณสะกด hostpital.webp ให้ปรับตามจริง
        item: [
          { name: { en: "Samitivej Srinakarin", th: "โรงพยาบาลสมิติเวช ศรีนครินทร์" }, detail: { en: "6.9 km.", th: "6.9 กม." } },
          { name: { en: "Bangkok Hospital", th: "โรงพยาบาลกรุงเทพ" }, detail: { en: "6.9 km.", th: "6.9 กม." } },
        ]
      },
      {
        title: { en: "EDUCATION", th: "สถานศึกษา" },
        icon: "/assets\/image\/page-la-soie-de-s\/lifestyle\/education.svg",
        item: [
          { name: { en: "Wellington College International School Bangkok", th: "โรงเรียนนานาชาติเวลลิงตันคอลเลจ" }, detail: { en: "9.5 km.", th: "9.5 กม." } },
          { name: { en: "Brighton College Bangkok", th: "โรงเรียนนานาชาติ ไบรท์ตันคอลเลจ" }, detail: { en: "9.5 km.", th: "9.5 กม." } },
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
      fonts.value = language.value === 'th' ? "Gotham" :"Gotham";
    });

    return { expand, showMore, language, datasets, fonts, information };
  }
});
