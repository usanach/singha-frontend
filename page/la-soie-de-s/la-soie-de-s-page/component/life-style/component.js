const LifeStyleComponent = defineComponent({
  name: 'LifeStyleComponent',
  template: `
      <section id="s_lifestyle" data-section="s_lifestyle"
        class=" font-['IBM_Plex_Sans_Thai'] life-style-component py-10 min-h-[800px] relative flex bg-[url('/assets/image/page-the-extro/the-extro/s-lifestyle/bg.png')] bg-center bg-cover onview">
        <!-- Video Background -->
        <div class="absolute inset-0 lg:max-h-none max-h-[1150px]">
          <video autoplay loop muted playsinline class="w-full h-full object-cover">
            <source src="/assets\/image\/page-la-soie-de-s\/lifestyle\/shutterstock_1111508897.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="absolute top-0 left-0 w-full h-full bg-white/50"></div>
  
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
            <div class="flex gap-5 lg:flex-row flex-col lg:mt-5 mt-2">
              <div class="lg:w-2/6 w-full space-y-3">
                <p class="text-[22px] font-medium uppercase text-[#564B40]" :style="{fontFamily:fonts}">
                  Distinctive Location
                </p>
                <p class="text-[#564B40] font-normal">
                  {{ datasets.distinctive_location[language] }}
                </p>
              </div>
              <div class="flex lg:gap-20 mx-auto flex-wrap justify-center">
                <div class="lg:w-1/6 lg:mt-0 mt-5 w-1/2" v-for="(item, index) in datasets.distinctive_location_meters" :key="index">
                  <p class="font-thin text-[70px] text-[#564B40] leading-none text-center">
                    {{ item.text[language] }}
                  </p>
                  <p class="text-[#564B40] text-center leading-none font-normal">
                    {{ item.unit[language] }}
                  </p>
                  <p class="text-[#564B40] text-center leading-none font-normal" v-html="item.details[language]"></p>
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
                        groupIndex > 0 ? 'border-t lg:border-t-0 lg:border-l border-[#5D4F48] pt-5 lg:pl-5' : ''
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
                class="px-5 text-center w-full border border-1 border-white py-3 text-[#564B40] text-[18px]"
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
        th: "ดื่มด่ำกับความสงบและใช้ชีวิตที่เป็นส่วนตัวอย่างแท้จริง ชีวิตในจินตนาการที่คุณครอบครองได้ ​",
        en: "Experience a lifestyle of tranquility and seclusion—a haven that is truly yours to cherish."
      },
      distinctive_location: {
        th: "ที่สุดของทำเลทอง สุขุมวิท 43 อาณาจักรแห่งความร่มรื่น​ ให้คุณผ่อนคลายได้เต็มที่กับความเป็นส่วนตัวและเงียบสงบ ณ ที่พักสุดเอ็กซ์คลูซีฟของเราในย่านที่อยู่อาศัยของชาวสุขุมวิท พาคุณออกจากความเร่งรีบและวุ่นวายของชีวิตในเมือง​",
        en: "SUPER PRIME AREA SUKHUMVIT 43, A Haven of Tranquility Indulge in ultimate privacy and serenity at our exclusive residence, nestled in the prestigious Sukhumvit 43. Surrounded by a tranquil residential area, our community offers a peaceful escape from the bustling city. ​"
      },
      distinctive_location_meters: [
        {
          text: { en: "200", th: "200" },
          unit: { en: "m.", th: "ม." },
          details: { en: "Sukhumvit Road", th: "ถนนสุขุมวิท" }
        },
        {
          text: { en: "300", th: "300" },
          unit: { en: "m.", th: "ม." },
          details: { en: "TOPS", th: "ท็อปส์ มาร์เก็ต" }
        },
        {
          text: { en: "1.6", th: "1.6" },
          unit: { en: "กm.", th: "กม." },
          details: { en: "Samitivej Sukhumvit Hospital", th: "โรงพยาบาลสมิติเวช สุขุมวิท" }
        },
        {
          text: { en: "2.3", th: "2.3" },
          unit: { en: "km.", th: "กม." },
          details: { en: "Trinity International School", th: "โรงเรียนนานาชาติทรีนีตี้" }
        }
      ]
    });
    const information = ref([
      {
        title: { en: "TRANSPORTATION", th: "การเดินทาง" },
        icon: "/assets\/image\/page-la-soie-de-s\/lifestyle\/trans.svg",
        item: [
          { name: { en: "Sukhumvit Road", th: "ถนนสุขุมวิท" }, detail: { en: "200 m.", th: "200 ม." } },
          { name: { en: "Phrom Phong BTS Station", th: "รถไฟฟ้าบีทีเอส พร้อมพงษ์" }, detail: { en: "800 m.", th: "800 ม." } },
          { name: { en: "Thonglor BTS Station", th: "รถไฟฟ้าบีทีเอส ทองหล่อ" }, detail: { en: "1 km.", th: "1 กม." } },
        ]
      },
      {
        title: { en: "SURROUNDING AMENITIES", th: "คอมมูนิตี้มอลล์และไลฟ์สไตล์" },
        icon: "/assets\/image\/page-la-soie-de-s\/lifestyle\/market.svg",
        item: [
          { name: { en: "TOPS", th: "ท็อปส์ มาร์เก็ต" }, detail: { en: "300 m.", th: "300 ม." } },
          { name: { en: "The EM District", th: "ดิ เอ็ม ดิสทริค" }, detail: { en: "900 m.", th: "900 ม." } },
        ]
      },
      {
        title: { en: "HOSPITAL", th: "โรงพยาบาล" },
        icon: "/assets\/image\/page-la-soie-de-s\/lifestyle\/hospital.svg", // ถ้าโปรเจกต์ใช้ชื่อไฟล์ hostpital.webp ให้เปลี่ยนให้ตรง
        item: [
          { name: { en: "Samitivej Sukhumvit Hospital", th: "โรงพยาบาลสมิติเวช สุขุมวิท" }, detail: { en: "1.6 km.", th: "1.6 กม." } },
          { name: { en: "Bumrungrad International Hospital", th: "โรงพยาบาลบำรุงราษฎร์ อินเตอร์เนชั่นแนล" }, detail: { en: "3.8 km.", th: "3.8 กม." } },
          { name: { en: "MedPark Hospital", th: "โรงพยาบาลเมดพาร์ค" }, detail: { en: "4.3 km.", th: "4.3 กม." } },
          { name: { en: "Bangkok Hospital", th: "โรงพยาบาลกรุงเทพ" }, detail: { en: "4.3 km.", th: "4.3 กม." } },
        ]
      },
      {
        title: { en: "EDUCATION", th: "สถานศึกษา" },
        icon: "/assets\/image\/page-la-soie-de-s\/lifestyle\/education.svg",
        item: [
          { name: { en: "Trinity International School", th: "โรงเรียนนานาชาติทรีนีตี้" }, detail: { en: "2.3 km.", th: "2.3 กม." } },
          { name: { en: "Wells International School (Thonglor Campus)", th: "โรงเรียนนานาชาติเวลล์ส สาขาทองหล่อ" }, detail: { en: "4.7 m.", th: "4.7 ม." } },
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
      fonts.value = language.value === 'th' ? "Cormorant Garamond" : "Cormorant Garamond";
    });

    return { expand, showMore, language, datasets, fonts, information };
  }
});
