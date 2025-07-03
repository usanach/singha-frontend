const LifeStyleComponent = defineComponent({
    name: 'LifeStyleComponent',
    template: `
      <section id="s_lifestyle" data-section="s_lifestyle"
        class="life-style-component py-10 relative flex bg-center bg-cover onview font-['IBM_Plex_Sans_Thai']">
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
              <h2 class="text-[35px] uppercase font-['Kaisei_Decol'] font-medium text-center text-white">
                S LIFESTYLE
              </h2>
              <p class="text-center text-white font-normal">
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
                        groupIndex > 0 ? 'border-t lg:border-t-0 lg:border-l border-white pt-5 lg:pl-5' : ''
                    ]">
                    <!-- Render icon if available -->
                    <div class="h-[40px] w-[40px]" v-if="group.icon">
                    <img class="w-full h-full" :src="group.icon" :alt="group.title[language]">
                    </div>
                    <div>
                    <p class="text-[22px] font-medium uppercase text-white" :class="[fontCss()]">
                        {{ group.title[language] }}
                    </p>
                    </div>
                    <div>
                    <ul>
                        <li class="group flex justify-between text-white last:border-0"
                            v-for="(item, itemIndex) in group.item" :key="itemIndex">
                        <div class="lg:max-w-[180px] group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words"
                            v-html="item.name[language]"></div>
                        <div class="text-right group-hover:opacity-25 transition-all text-nowrap">
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
        const vdo = ref('/assets/image/page-srin-prannok/life/GettyImages-1422810118.mp4')

        // Static dataset for header and distinctive locationconst 
        datasets = ref({
            s_life_detail: {
                en: "A masterpiece of legacy living designed for generations in a prime location.",
                th: "บ้านที่ใส่ใจในทุกรายละเอียดเพื่อทุกคนในครอบครัว บนทำเลศักยภาพ​​"
            },
            distinctive_location: {
                en: "Located on the new Prannok road, this prime location ensures seamless connectivity to the city center via various routes. Surrounded by a wide range of lifestyle amenities, international schools, and top-tier hospitals.",
                th: "ตั้งอยู่บนถนนพรานนกตัดใหม่ ทำเลศักยภาพที่เชื่อมต่อสู่ทุกจุดหมายใจกลางเมืองได้รวดเร็วผ่านหลากหลายเส้นทาง แวดล้อมด้วยสิ่งอำนวยความสะดวกครบครัน ทั้งแหล่งไลฟ์สไตล์ โรงเรียนนานาชาติ และโรงพยาบาลชั้นนำ"
            },
distinctive_location_meters: [
                {
                    text: {
                        en: "3.3",
                        th: "3.3"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "The Paseo Park Kanchanaphisek",
                        th: "เดอพาซิโอ้ พาร์ค กาญจนาภิเษก"
                    }
                },
                {
                    text: {
                        en: "6",
                        th: "6"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "Thonburi 2 Hospital",
                        th: "โรงพยาบาลธนบุรี 2"
                    }
                },
                {
                    text: {
                        en: "4.2",
                        th: "4.2"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "International Pioneers School",
                        th: "โรงเรียนนานาชาติอินเตอร์เนชั่นแนลไพโอเนียร์ส"
                    }
                }
            ]
        });


        const information = ref([
            {
                title: {
                    en: "HOSPITAL",
                    th: "โรงพยาบาล"
                },
                icon: "/assets/icon/hostpital.png",
                item: [
                    {
                        name: {
                            en: "Thonburi 2 Hospital",
                            th: "โรงพยาบาลธนบุรี 2"
                        },
                        detail: {
                            en: "6 km.",
                            th: "6 กม."
                        }
                    },
                    {
                        name: {
                            en: "Siriraj Hospital ",
                            th: "โรงพยาบาลศิริราช "
                        },
                        detail: {
                            en: "10 km.",
                            th: "10 กม."
                        }
                    },
                    {
                        name: {
                            en: "Thonburi 1 Hospital",
                            th: "โรงพยาบาลธนบุรี 1"
                        },
                        detail: {
                            en: "10 km.",
                            th: "10 กม."
                        }
                    },
                ]
            },
            {
                title: {
                    en: "SURROUNDING AMENITIES",
                    th: "คอมมูนิตี้มอลล์และไลฟ์สไตล์​"
                },
                icon: "/assets/icon/market.png",
                item: [
                    {
                        name: {
                            en: "The Paseo Park Kanchanaphisek",
                            th: "เดอะพาซิโอ พาร์ค กาญจนาภิเษก"
                        },
                        detail: {
                            en: "3.3 km.",
                            th: "3.3  กม."
                        }
                    },
                    {
                        name: {
                            en: "The Mall Lifestore Bangkae",
                            th: "เดอะมอลล์ไลฟ์สโตร์ บางแค"
                        },
                        detail: {
                            en: "7 km.​",
                            th: "7 กม."
                        }
                    },
                    {
                        name: {
                            en: "The Circle Ratchaphruk",
                            th: "เดอะเซอร์เคิล ราชพฤกษ์"
                        },
                        detail: {
                            en: "8 km.",
                            th: "8 กม."
                        }
                    },
                    {
                        name: {
                            en: "Central Pinklao",
                            th: "เซ็นทรัล ปิ่นเกล้า"
                        },
                        detail: {
                            en: "12 km.",
                            th: "12 กม."
                        }
                    },
                    
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
                        name: {
                            en: "International Pioneers School (IPS)",
                            th: "โรงเรียนนานาชาติอินเตอร์เนชั่นแนลไพโอเนียร์ส (IPS)"
                        },
                        detail: {
                            en: "4.2 km.",
                            th: "4.2 กม."
                        }
                    },
                    {
                        name: {
                            en: "Singapore International School of Bangkok, Thonburi",
                            th: "โรงเรียนนานาชาติสิงคโปร์ ธนบุรี (SISB)"
                        },
                        detail: {
                            en: "7 km.",
                            th: "7 กม."
                        }
                    },
                    {
                        name: {
                            en: "Plearnpattana School",
                            th: "โรงเรียนเพลินพัฒนา"
                        },
                        detail: {
                            en: "6.5 km.",
                            th: "6.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "Mahidol University",
                            th: "​มหาวิทยาลัยมหิดล"
                        },
                        detail: {
                            en: "13 km.",
                            th: "13 กม."
                        }
                    },
                    
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
        const fontCss = () => {
            return getLanguageFromPath() == 'en' ? "" : ""
        }
        return { expand, showMore, language, datasets, fonts, information, vdo, fontCss };
    }
});
