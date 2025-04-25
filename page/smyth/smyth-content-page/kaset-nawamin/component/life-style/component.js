const LifeStyleComponent = defineComponent({
    name: 'LifeStyleComponent',
    template: `
    <section id="lifestyle" data-section="s_lifestyle"
        class="life-style-component py-10 relative flex bg-[#733C1F] onview">
        <div class="absolute inset-0 lg:max-h-none max-h-[1150px]">
            <video autoplay loop muted playsinline class="w-full h-full object-cover">
                <source src="/assets/image/page-smyth-kaset/life/GettyImages-472484535.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="absolute inset-0 bg-gradient-to-b from-[#733C1F]/50 lg:to-[#733C1F]/50 to-[#733C1F] -m-[1px]"></div>
        </div>
        <div class="container relative my-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
            <div class="flex flex-col gap-10">
                <div>
                    <h2 class="text-[40px] uppercase font-['Gotham'] font-medium text-center text-white">
                        S LIFESTYLE
                    </h2>
                    <p class="text-center text-white text-[14px]">
                        {{datasets.s_life_detail[language]}}
                    </p>
                </div>
                
                <div class="flex gap-5 lg:flex-row flex-col lg:mt-5 mt-2">
                    <div class="lg:w-2/6 w-full space-y-3">
                        <p class="text-[24px] font-['Gotham'] font-medium uppercase text-white">
                            Distinctive Location
                        </p>
                        <p class="text-white text-[14px]">
                          {{datasets.distinctive_location[language]}}
                        </p>
                    </div>
                    <div class="flex lg:gap-20 mx-auto flex-wrap">
                        <div class="lg:w-1/6 lg:mt-0 mt-5 w-1/2" v-for="(item,distinctive_location_meters_id) in datasets.distinctive_location_meters" :key="distinctive_location_meters_id">
                            <p class="font-thin text-[80px] text-white leading-none text-center">
                               {{item.text[language]}}
                            </p>
                            <p class="text-white text-center leading-none">
                                {{item.unit[language]}}
                            </p>
                            <p class="text-white text-center">
                                {{item.details[language]}}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex lg:gap-10 gap-2 mt-5 lg:flex-row flex-col">
                    <div class="space-y-3 lg:w-1/4 w-full pb-5">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-smyth-kaset/life/sedan_2736918.png" alt="" >
                        </div>
                        <div>
                            <p class="text-[16px] font-medium uppercase text-white uppercase" :class="[fonts]">
                                {{datasets.transportations.title[language]}}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="group flex justify-between text-white" v-for="(item, transportationsId) in datasets.transportations.item" :key="transportationsId" >
                                    <div class="lg:max-w-[180px] text-[14px] group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words" v-html="item.name[language]"></div>
                                    <div class="text-right text-[14px] group-hover:opacity-25 transition-all text-nowrap">
                                        {{item.detail[language]}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-[1px] bg-white/30 mt-3"></div>
                    <div class="space-y-3  lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-smyth-kaset/life/medic.png" alt="" class="w-[33px]">
                        </div>
                        <div>
                            <p class="text-[16px] font-medium uppercase text-white uppercase" :class="[fonts]">
                                {{datasets.hospitals.title[language]}}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="group flex justify-between text-white" v-for="(item, hospitalsId) in datasets.hospitals.item" :key="hospitalsId" >
                                    <div class="lg:max-w-[180px] text-[14px] group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words" v-html="item.name[language]"></div>
                                    <div class="text-right text-[14px] group-hover:opacity-25 transition-all text-nowrap">
                                        {{item.detail[language]}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-[1px] bg-white/30 mt-3"></div>
                    <div class="space-y-3  lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-smyth-kaset/life/shopping-cart_833314.png" alt="" class="w-[33px]">
                        </div>
                        <div>
                            <p class="text-[16px] font-medium uppercase text-white uppercase" :class="[fonts]">
                                {{datasets.surrounding_amenities.title[language]}}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="group flex justify-between text-white" v-for="(item,surrounding_amenitiesId) in datasets.surrounding_amenities.item" :key="surrounding_amenitiesId" >
                                    <div class="lg:max-w-[180px] text-[14px] group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words" v-html="item.name[language]"></div>
                                    <div class="text-right text-[14px] group-hover:opacity-25 transition-all text-nowrap">
                                        {{item.detail[language]}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-[1px] bg-white/30 mt-3"></div>
                    <div class="space-y-3  lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-smyth-kaset/life/education_13807278.png">
                        </div>
                        <div>
                            <p class="text-[16px] font-medium uppercase text-white uppercase" :class="[fonts]">
                                {{datasets.educations.title[language]}}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="group flex justify-between text-white" v-for="(item,educationsId) in datasets.educations.item" :key="educationsId" >
                                    <div class="lg:max-w-[180px] text-[14px] group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words" v-html="item.name[language]"></div>
                                    <div class="text-right text-[14px] group-hover:opacity-25 transition-all text-nowrap">
                                        {{item.detail[language]}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
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
                                    <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down"
                                        d="M12.747,16.484l4.958-4.962a.933.933,0,0,1,1.324,0,.945.945,0,0,1,0,1.327L13.41,18.471a.935.935,0,0,1-1.292.027L6.461,12.853a.937.937,0,0,1,1.324-1.327Z"
                                        transform="translate(-6.188 -11.247)" fill="#fff" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `,
    setup() {
        const expand = ref(false);

        const language = ref('th'); // Default language
        const fonts = ref('');
        const datasets = ref({
            s_life_detail: {
                en: "Private Estate that allows you to live life your way, located in a prime location with complete amenities to suit every lifestyle. Ideal for both living and business needs.​",
                th: "ไพรเวท เอสเตทที่ให้คุณสัมผัสชีวิตในแบบของคุณ บนทำเลศักยภาพ สิ่งอำนวยความสะดวกครบครัน ตอบโจทย์ทุกไลฟ์สไตล์ รองรับทั้งการใช้ชีวิตและการทำธุรกิจ​​"
            },
            distinctive_location: {
                en: "Located in the prime Kaset-Nawamin area, a perfect balance of convenience and comfort. This project is surrounded by shopping malls, prestigious educational institutions, and excellent transportation links, with quick access to expressways and rail transit to downtown business centers.​​",
                th: "ตั้งอยู่บนทำเลศักยภาพย่านเกษตร-นวมินทร์ ที่ซึ่งสมดุลพร้อมความสะดวกและสบาย เป็นทำเลศักยภาพสูง รายล้อมด้วยห้างสรรพสินค้า สถาบันการศึกษาชั้นนำ รวมถึงการเดินทางที่รวดเร็ว ใกล้ทางด่วน และรถไฟฟ้าเชื่อมสู่ศูนย์กลางธุรกิจใจกลางเมืองได้ทันที ​"
            },
            distinctive_location_meters: [
                {
                    text: {
                        en: "2",
                        th: "2"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "Chalong Rat Expressway",
                        th: "ทางพิเศษฉลองรัช"
                    }
                },
                {
                    text: {
                        en: "5",
                        th: "5"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "Navavej International Hospital",
                        th: "โรงพยาบาลนวเวช"
                    }
                },
                {
                    text: {
                        en: "750",
                        th: "750"
                    },
                    unit: {
                        en: "m.",
                        th: "ม."
                    },
                    details: {
                        en: "The Walk Kaset-Nawamin",
                        th: "เดอะวอล์ค เกษตร-นวมินทร์"
                    }
                },
                {
                    text: {
                        en: "3",
                        th: "3"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "Lertlah School",
                        th: "โรงเรียนเลิศหล้า"
                    }
                }
            ],
            transportations: {
                title: {
                    en: "TRANSPORTATION ",
                    th: "การเดินทาง"
                },
                item: [
                    {
                        name: {
                            en: "Chalong Rat Expressway, Yothin Phathana Toll Plaza",
                            th: "ทางพิเศษฉลองรัช ด่านโยธินพัฒนา"
                        },
                        detail: {
                            en: "2 km.",
                            th: "2 กม."
                        }
                    },
                    {
                        name: {
                            en: "BTS Green Line, Kasetsart University station",
                            th: "รถไฟฟ้า BTS สายสีเขียว สถานีมหาวิทยาลัยเกษตรศาสตร์"
                        },
                        detail: {
                            en: "8 km.",
                            th: "8 กม."
                        }
                    },
                    {
                        name: {
                            en: "Don Mueang International Airport",
                            th: "สนามบินดอนเมือง"
                        },
                        detail: {
                            en: "13.5 km.",
                            th: "13.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "MRT Brown Line and Grey Line",
                            th: "รถไฟฟ้า MRT สายสีน้ำตาล และสายสีเทา"
                        },
                        detail: {
                            en: "Soon​",
                            th: "เร็วๆ นี้"
                        }
                    }
                ]
            },
            hospitals: {
                title: {
                    en: "HOSPITAL",
                    th: "โรงพยาบาล"
                },
                item: [
                    {
                        name: {
                            en: "Navavej International Hospital",
                            th: "โรงพยาบาลนวเวช"
                        },
                        detail: {
                            en: "5 km.",
                            th: "5 กม."
                        }
                    },
                    {
                        name: {
                            en: "Phyathai Nawamin Hospital",
                            th: "โรงพยาบาลพญาไท <span class='text-nowrap'>นวมินทร์</span>"
                        },
                        detail: {
                            en: "5.5 km.",
                            th: "5.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "Vibhavadi Hospital",
                            th: "โรงพยาบาลวิภาวดี"
                        },
                        detail: {
                            en: "7 km.",
                            th: "7 กม."
                        }
                    },
                    {
                        name: {
                            en: "Synphaet Ramintra Hospital",
                            th: "โรงพยาบาลสินแพทย์ รามอินทรา"
                        },
                        detail: {
                            en: "8.5 km.",
                            th: "8.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "Bangkok Hospital",
                            th: "โรงพยาบาลกรุงเทพ"
                        },
                        detail: {
                            en: "12 km.",
                            th: "12 กม."
                        }
                    },
                    {
                        name: {
                            en: "Samitivej Hospital Sukhumvit",
                            th: "โรงพยาบาลสมิติเวช สุขุมวิท"
                        },
                        detail: {
                            en: "14 km.",
                            th: "14 กม."
                        }
                    },
                ]
            },
            surrounding_amenities: {
                title: {
                    en: "SURROUNDING AMENITIES",
                    th: "คอมมูนิตี้มอลล์และไลฟ์สไตล์​"
                },
                item: [
                    {
                        name: {
                            en: "The Walk Kaset-Nawamin",
                            th: "เดอะวอล์ค เกษตร-นวมินทร์"
                        },
                        detail: {
                            en: "750 m.",
                            th: "750 ม."
                        }
                    },
                    {
                        name: {
                            en: "Nawamin City Avenue",
                            th: "นวมินทร์ ซิตี้ อเวนิว"
                        },
                        detail: {
                            en: "1 km.​",
                            th: "1 กม."
                        }
                    },
                    {
                        name: {
                            en: "The Crystal Ekamai – Ramindra",
                            th: "เดอะคริสตัล เอกมัย-รามอินทรา"
                        },
                        detail: {
                            en: "4 km.​",
                            th: "4 กม."
                        }
                    },
                    {
                        name: {
                            en: "Crystal Design Center (CDC)",
                            th: "ศูนย์การค้าคริสตัล ดีไซน์ เซ็นเตอร์ (CDC)"
                        },
                        detail: {
                            en: "3.5 km.​",
                            th: "3.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "CentralFestival EastVille",
                            th: "ศูนย์การค้าเซ็นทรัลเฟสติวัล อีสต์วิลล์"
                        },
                        detail: {
                            en: "4.5 km.​",
                            th: "4.5 กม.​"
                        }
                    },
                    {
                        name: {
                            en: "HomePro",
                            th: "โฮมโปร"
                        },
                        detail: {
                            en: "6 km.​",
                            th: "6 กม.​"
                        }
                    },
                    {
                        name: {
                            en: "Central Lardprao",
                            th: "ศูนย์การค้าเซ็นทรัล ลาดพร้าว"
                        },
                        detail: {
                            en: "8 km.​",
                            th: "8 กม.​"
                        }
                    },
                ]
            },
            educations: {
                title: {
                    en: "EDUCATION",
                    th: "สถานศึกษา​​"
                },
                item: [
                    {
                        name: {
                            en: "Lertlah School Kaset – Nawamin Road",
                            th: "โรงเรียนเลิศหล้า ถนนเกษตร-นวมินทร์"
                        },
                        detail: {
                            en: "3 km.",
                            th: "3 กม."
                        }
                    },
                    {
                        name: {
                            en: "Keerapat International School",
                            th: "โรงเรียนนานาชาติกีรพัฒน์ (KPIS)"
                        },
                        detail: {
                            en: "3.5 km.",
                            th: "3.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "NIVA American International School",
                            th: "โรงเรียนนานาชาตินีวาอเมริกัน"
                        },
                        detail: {
                            en: "5.5 km.",
                            th: "5.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "Kasetsart University",
                            th: "มหาวิทยาลัยเกษตรศาสตร์"
                        },
                        detail: {
                            en: "6 km.",
                            th: "6 กม."
                        }
                    },
                    {
                        name: {
                            en: "The Regent's International School",
                            th: "โรงเรียนนานาชาติเดอะรีเจ้นท์"
                        },
                        detail: {
                            en: "9 km.",
                            th: "9 กม."
                        }
                    },
                    {
                        name: {
                            en: "Singapore International School of Bangkok (SISB Pracha Uthit)",
                            th: "โรงเรียนนานาชาติสิงคโปร์ SISB"
                        },
                        detail: {
                            en: "9 km.",
                            th: "9 กม."
                        }
                    },
                    {
                        name: {
                            en: "Prep International Kindergarten",
                            th: "โรงเรียนอนุบาลนานาชาติเพรพ"
                        },
                        detail: {
                            en: "9.5 km.",
                            th: "9.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "Shrewsbury International School Bangkok City Campus",
                            th: "โรงเรียนนานาชาติโชรส์เบอรี วิทยาเขตบางกอกซิตี้"
                        },
                        detail: {
                            en: "12.5 km.",
                            th: "12.5 กม."
                        }
                    },
                ]
            }

        })

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const showMore = () => {
            expand.value = true;
        };

        onMounted(async () => {
            language.value = getLanguageFromPath();
            fonts.value = language.value == 'th' ? "" : "font-['Gotham']"
        });

        return { expand, showMore, language, datasets, fonts };
    }
});
