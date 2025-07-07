const LifeStyleComponent = defineComponent({
    name: 'LifeStyleComponent',
    template: `
      <section id="s_lifestyle" data-section="s_lifestyle"
        class="life-style-component py-10 min-h-[800px] relative flex bg-center bg-cover onview">
        <!-- Video Background -->
        <div class="absolute inset-0">
          <video autoplay loop muted playsinline class="w-full h-full object-cover">
            <source :src="vdo" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="absolute top-0 left-0 w-full h-full bg-white/50"></div>
        <!-- Main Container -->
        <div class="container relative my-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
          <div class="flex flex-col gap-10">
            <!-- Header Section -->
            <div>
              <h2 class="text-[35px] uppercase font-medium text-center text-[#564B40] font-['Gotham']">
                S LIFESTYLE
              </h2>
              <p class="text-center text-[#564B40] font-normal text-[20px] mt-3">
                {{ datasets.s_life_detail[language] }}
              </p>
            </div>
  
            <!-- Distinctive Location Section -->
            <div class="flex gap-5 lg:flex-row flex-col lg:mt-5 mt-2">
              <div class="lg:w-2/6 w-full space-y-3">
                <p class="text-[22px] font-medium uppercase text-[#564B40] font-['Gotham']">
                  Distinctive Location
                </p>
                <p class="text-[#564B40] text-[16px] font-normal">
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
                    <p class="text-[22px] font-medium uppercase text-[#564B40]" :class="[fontCss()]" v-html="group.title[language]"></p>
                    </div>
                    <div>
                    <ul>
                        <li class="group flex justify-between text-[#564B40] last:border-0"
                            v-for="(item, itemIndex) in group.item" :key="itemIndex">
                        <div class="lg:max-w-[180px] text-[16px] group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words"
                            v-html="item.name[language]"></div>
                        <div class="text-right text-[16px] group-hover:opacity-25 transition-all text-nowrap">
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
        const vdo = ref('/assets/image/page-shawn-panya/life/1417654651.mp4')

        // Static dataset for header and distinctive location
        const datasets = ref({
            s_life_detail: {
                en: "The perfect detached houses located in a prime location, catering to every lifestyle you need.",
                th: "บ้านเดี่ยวที่มอบชีวิตที่ลงตัว ตอบโจทย์ทุกไลฟ์สไตล์ทุกช่วงเวลาของคุณ บนทำเลศักยภาพ​​​"
            },
            distinctive_location: {
                en: "SHAWN Panya Indra offers privacy amidst an exclusive community. Enjoy an exceptional lifestyle with superior amenities. This prime location in the expanding Wongwaen-Ramintra area with main road access and near Chatuschot expressway, ensures continued value growth.​",
                th: "ฌอน ปัญญาอินทรา มอบความเป็นส่วนตัวท่ามกลางสังคมคุณภาพอย่างมีระดับ น่าอยู่ด้วยสิ่งแวดล้อมแสนสะดวกสบายและไลฟ์สไตล์ที่ครบทุกความต้องการของชีวิต บนทำเลศักยภาพที่มูลค่าเพิ่มขึ้นและเติบโตอย่างต่อเนื่อง อย่าง วงแหวน – รามอินทรา ติดถนนใหญ่เดินทางสะดวก ใกล้ทางด่วนจตุโชติ"
            },
            distinctive_location_meters: [
                {
                    text: { en: "500", th: "500" },
                    unit: { en: "m.", th: "ม." },
                    details: {
                        en: "Panya Indra Road",
                        th: "ถนนปัญญาอินทรา"
                    }
                },
                {
                    text: { en: "8.9", th: "8.9" },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "Synphaet Ramintra Hospital",
                        th: "โรงพยาบาลสินแพทย์"
                    }
                },
                {
                    text: {
                        en: "3.8",
                        th: "3.8"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "JAS Green Village - Khubon",
                        th: "แจส กรีน วิลเลจ คู้บอน"
                    }
                },
                {
                    text: {
                        en: "3.2",
                        th: "3.2"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "Satitpattana School",
                        th: "โรงเรียนสาธิตพัฒนา"
                    }
                }
            ]
        });

        // Dynamic information groups array
        const information = ref([
            {
                title: {
                    en: "TRANSPORTATION",
                    th: "การเดินทาง​"
                },
                icon: "/assets/image/page-shawn-panya/life/trans.png",
                item: [
                    {
                        name: {
                            en: "Panya Indra Road",
                            th: "ถนนปัญญาอินทรา"
                        },
                        detail: {
                            en: "500 m.",
                            th: "500 ม."
                        }
                    },
                    {
                        name: {
                            en: "Chalong Rat Expressway, Chatuchot Toll Plaza",
                            th: "ทางพิเศษฉลองรัช ด่านจตุโชติ"
                        },
                        detail: {
                            en: "7.6 km.",
                            th: "7.6 กม."
                        }
                    },
                    {
                        name: {
                            en: "Khu Bon - Ramintra Road",
                            th: "ถนนคู้บอน – รามอินทรา"
                        },
                        detail: {
                            en: "6.7 km.",
                            th: "6.7 กม."
                        }
                    },
                    {
                        name: {
                            en: "Wongwaen-Ramintra Motorway",
                            th: "มอเตอร์เวย์ วงแหวาน- รามอินทรา"
                        },
                        detail: {
                            en: "4.3 km.",
                            th: "4.3 กม."
                        }
                    },
                    {
                        name: {
                            en: "Donmueang International Airport (DMK)",
                            th: "สนามบินดอนเมือง"
                        },
                        detail: {
                            en: "24 km.",
                            th: "24 กม."
                        }
                    },
                    {
                        name: {
                            en: "Suvarnabhumi Airport (BKK)",
                            th: "สนามบินสุวรรณภูมิ"
                        },
                        detail: {
                            en: "20 km.",
                            th: "20 กม."
                        }
                    }
                ]
            },
            {
                title: {
                    en: "HOSPITAL",
                    th: "โรงพยาบาล"
                },
                icon: "/assets/image/page-shawn-panya/life/hostpital.png",
                item: [
                    {
                        name: {
                            en: "Synphaet Ramintra Hospital",
                            th: "โรงพยาบาลสินแพทย์"
                        },
                        detail: {
                            en: "8.9 km.",
                            th: "8.9 กม."
                        }
                    },
                    {
                        name: {
                            en: "Phyathai Nawamin Hospital",
                            th: "โรงพยาบาลพญาไท นวมินทร์"
                        },
                        detail: {
                            en: "10 km.",
                            th: "10 กม."
                        }
                    }
                ]
            },
            {
                title: {
                    en: "SURROUNDING AMENITIES",
                    th: "คอมมูนิตี้มอลล์และ<span class='text-nowrap'>ไลฟ์สไตล์​</span>"
                },
                icon: "/assets/image/page-shawn-panya/life/market.png",
                item: [
                    {
                        name: {
                            en: "JAS Green Village - Khubon",
                            th: "แจส กรีน วิลเลจ คู้บอน"
                        },
                        detail: {
                            en: "3.8 km.",
                            th: "3.8 กม."
                        }
                    },
                    {
                        name: {
                            en: "Maxvalu Khubon",
                            th: "แม็กซ์แวลู คู้บอน"
                        },
                        detail: {
                            en: "3.9 km.",
                            th: "3.9 กม."
                        }
                    },
                    {
                        name: {
                            en: "Fashion Island & The Promenade",
                            th: "แฟชั่นไอส์แลนด์ & เดอะ พรอมานาด"
                        },
                        detail: {
                            en: "7.2 km.",
                            th: "7.2 กม."
                        }
                    },
                    {
                        name: {
                            en: "Central EastVille",
                            th: "เซ็นทรัล อีสต์วิลล์"
                        },
                        detail: {
                            en: "16 km.",
                            th: "16 กม."
                        }
                    }
                ]
            },
            {
                title: {
                    en: "EDUCATION",
                    th: "สถานศึกษา​"
                },
                icon: "/assets/image/page-shawn-panya/life/education.png",
                item: [
                    {
                        name: {
                            en: "Satitpattana School",
                            th: "โรงเรียนสาธิตพัฒนา"
                        },
                        detail: {
                            en: "3.2 km.",
                            th: "3.2 กม."
                        }
                    },
                    {
                        name: {
                            en: "Ruamrudee International School (RIS) Early Years",
                            th: "โรงเรียนร่วมฤดีวิเทศศึกษา (RIS) Early Years"
                        },
                        detail: {
                            en: "4.4 km.",
                            th: "4.4 กม."
                        }
                    },
                    {
                        name: {
                            en: "KPIS International School (KPIS)",
                            th: "โรงเรียนนานาชาติกีรพัฒน์ (KPIS)"
                        },
                        detail: {
                            en: "10.7 km.",
                            th: "10.7 กม."
                        }
                    },
                    {
                        name: {
                            en: "Lertlah School Kaset-Nawamin Road",
                            th: "โรงเรียนเลิศหล้า ถนนเกษตร-นวมินทร์"
                        },
                        detail: {
                            en: "11.1 km.",
                            th: "11.1 กม."
                        }
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

        const fontCss = () => {
            return getLanguageFromPath() == 'en' ? "font-['Gotham']" : ''
        }
        // When component is mounted, set language and fonts
        onMounted(() => {
            language.value = getLanguageFromPath();
            fonts.value = language.value === 'th' ? "font-['Gotham']" : "";
        });

        return { expand, showMore, language, datasets, fonts, information, vdo, fontCss };
    }
});
