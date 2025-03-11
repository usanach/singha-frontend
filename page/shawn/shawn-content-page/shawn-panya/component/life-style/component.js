const LifeStyleComponent = defineComponent({
    name: 'LifeStyleComponent',
    template: `
    <section id="lifestyle" data-section="s_lifestyle"
        class="life-style-component py-10 relative flex bg-[#733C1F] onview min-h-screen">
        <div class="absolute inset-0 max-h-none">
            <video autoplay loop muted playsinline class="w-full h-full object-cover">
                <source src="/assets/image/page-shawn-panya/life/gettyimages-1816736771-640_adpp.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="absolute inset-0 bg-gradient-to-b -m-[1px]"></div>
        </div>
        <div class="container relative my-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
            <div class="flex flex-col gap-10">
                <div>
                    <h2 class="text-[40px] uppercase font-['Gotham'] font-medium text-center text-[#564B40]">
                        S LIFESTYLE
                    </h2>
                    <p class="text-center text-[#564B40] text-[14px]">
                        {{datasets.s_life_detail[language]}}
                    </p>
                </div>
                
                <div class="flex gap-5 lg:flex-row flex-col lg:mt-5 mt-2">
                    <div class="lg:w-2/6 w-full space-y-3">
                        <p class="text-[24px] font-['Gotham'] font-medium uppercase text-[#564B40]">
                            Distinctive Location
                        </p>
                        <p class="text-[#564B40] text-[14px]">
                          {{datasets.distinctive_location[language]}}
                        </p>
                    </div>
                    <div class="flex lg:gap-20 mx-auto flex-wrap">
                        <div class="lg:w-1/6 lg:mt-0 mt-5 w-1/2" v-for="(item,distinctive_location_meters_id) in datasets.distinctive_location_meters" :key="distinctive_location_meters_id">
                            <p class="font-thin text-[80px] text-[#564B40] leading-none text-center">
                               {{item.text[language]}}
                            </p>
                            <p class="text-[#564B40] text-center leading-none">
                                {{item.unit[language]}}
                            </p>
                            <p class="text-[#564B40] text-center">
                                {{item.details[language]}}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex lg:gap-10 gap-2 mt-5 lg:flex-row flex-col">
                    <div class="space-y-3 lg:w-1/4 w-full pb-5">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-shawn-panya/life/sedan_2736918.png" alt="" >
                        </div>
                        <div>
                            <p class="text-[16px] font-medium uppercase text-[#564B40]" :class="[fonts]">
                                {{datasets.transportations.title[language]}}
                            </p>
                        </div>
                        <div>
                            <ul> 
                                <li class="group flex justify-between text-[#564B40] my-2" v-for="(item, transportationsId) in datasets.transportations.item" :key="transportationsId" >
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
                            <img src="/assets/image/page-shawn-panya/life/medic.png" alt="" class="w-[33px]">
                        </div>
                        <div>
                            <p class="text-[16px] font-medium uppercase text-[#564B40]" :class="[fonts]">
                                {{datasets.hospitals.title[language]}}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="group flex justify-between text-[#564B40] my-2" v-for="(item, hospitalsId) in datasets.hospitals.item" :key="hospitalsId" >
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
                            <img src="/assets/image/page-shawn-panya/life/shopping-cart_833314.png" alt="" class="w-[33px]">
                        </div>
                        <div>
                            <p class="text-[16px] font-medium uppercase text-[#564B40]" :class="[fonts]">
                                {{datasets.surrounding_amenities.title[language]}}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="group flex justify-between text-[#564B40] my-2" v-for="(item,surrounding_amenitiesId) in datasets.surrounding_amenities.item" :key="surrounding_amenitiesId" >
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
                            <img src="/assets/image/page-shawn-panya/life/education_13807278.png">
                        </div>
                        <div>
                            <p class="text-[16px] font-medium uppercase text-[#564B40]" :class="[fonts]">
                                {{datasets.educations.title[language]}}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="group flex justify-between text-[#564B40] my-2" v-for="(item,educationsId) in datasets.educations.item" :key="educationsId" >
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
                            class="px-5 text-center w-full border border-1 border-[#564B40] py-3 text-[#564B40] text-[18px]"
                            :class="{ hidden: expand }"
                            @click="showMore">
                            <p>อ่านเพิ่มเติม</p>
                            <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13.114" height="7.498" viewBox="0 0 13.114 7.498">
                                    <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down" d="M12.747,16.484l4.958-4.962a.933.933,0,0,1,1.324,0,.945.945,0,0,1,0,1.327L13.41,18.471a.935.935,0,0,1-1.292.027L6.461,12.853a.937.937,0,0,1,1.324-1.327Z" transform="translate(-6.188 -11.247)" fill="#5d4f48"/>
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
                en: "บ้านเดี่ยวที่รายล้อมด้วยสิ่งอำนวยความสะดวกและแหล่งไลฟ์สไตล์ที่ครบครัน​",
                th: "บ้านเดี่ยวที่รายล้อมด้วยสิ่งอำนวยความสะดวกและแหล่งไลฟ์สไตล์ที่ครบครัน​"
            },
            distinctive_location: {
                en: "SHAWN ปัญญาอินทรา  โครงการอยู่บนทำเลศักยภาพอย่าง วงแหวน - รามอินทรา ซึ่งเป็นทำเลที่มีมูลค่าสูงขึ้นอย่างต่อเนื่อง ตั้งอยู่ติดถนนใหญ่ทั้งคู่ เดินทางสะดวกใกล้ทางขึ้นทางด่วนจตุโชติ รายล้อมด้วยสิ่งอำนวยความสะดวกและแหล่งไลฟ์สไตล์ที่ครบครัน​​",
                th: "SHAWN ปัญญาอินทรา  โครงการอยู่บนทำเลศักยภาพอย่าง วงแหวน - รามอินทรา ซึ่งเป็นทำเลที่มีมูลค่าสูงขึ้นอย่างต่อเนื่อง ตั้งอยู่ติดถนนใหญ่ทั้งคู่ เดินทางสะดวกใกล้ทางขึ้นทางด่วนจตุโชติ รายล้อมด้วยสิ่งอำนวยความสะดวกและแหล่งไลฟ์สไตล์ที่ครบครัน​"
            },
            distinctive_location_meters: [
                {
                    text: {
                        en: "4.5",
                        th: "4.5"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "ถนนกาญจนาภิเษก",
                        th: "ถนนกาญจนาภิเษก"
                    }
                },
                {
                    text: {
                        en: "8.5",
                        th: "8.5"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "โรงพยาบาลสินแพทย์ รามอินทรา",
                        th: "โรงพยาบาลสินแพทย์ รามอินทรา"
                    }
                },
                {
                    text: {
                        en: "7.5",
                        th: "7.5"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "แฟชั่นไอสแลนด์",
                        th: "แฟชั่นไอสแลนด์"
                    }
                },
                {
                    text: {
                        en: "4.5",
                        th: "4.5"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "โรงเรียนนานาชาติร่วมฤดี",
                        th: "โรงเรียนนานาชาติร่วมฤดี"
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
                            en: "ถนนกาญจนาภิเษก",
                            th: "ถนนกาญจนาภิเษก"
                        },
                        detail: {
                            en: "4.5 km.",
                            th: "4.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "ทางด่วนศรีรัช ด่านจตุโชติ",
                            th: "ทางด่วนศรีรัช ด่านจตุโชติ"
                        },
                        detail: {
                            en: "7.5 km.",
                            th: "7.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "สนามบินดอนเมือง",
                            th: "สนามบินดอนเมือง"
                        },
                        detail: {
                            en: "21.0 km.",
                            th: "21.0 กม."
                        }
                    },
                    {
                        name: {
                            en: "สนามบินสุวรรณภูมิ",
                            th: "สนามบินสุวรรณภูมิ"
                        },
                        detail: {
                            en: "24.0 km.",
                            th: "24.0 กม."
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
                            en: "โรงพยาบาลสินแพทย์ รามอินทรา",
                            th: "โรงพยาบาลสินแพทย์ รามอินทรา"
                        },
                        detail: {
                            en: "8.5 km.",
                            th: "8.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "โรงพยาบาลพญาไท นวมินทร",
                            th: "โรงพยาบาลพญาไท นวมินทร"
                        },
                        detail: {
                            en: "8.5 km.",
                            th: "8.5 กม."
                        }
                    },
                ]
            },
            surrounding_amenities: {
                title: {
                    en: "SURROUNDING AMENITIES",
                    th: "คอมมูนิตี้มอลล์ และ ไลฟ์สไตล์​"
                },
                item: [
                    {
                        name: {
                            en: "แม็กซ์แวลู คู้บอน",
                            th: "แม็กซ์แวลู คู้บอน"
                        },
                        detail: {
                            en: "3.5 km.​",
                            th: "3.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "แจส กรีน วิลเลจ",
                            th: "แจส กรีน วิลเลจ"
                        },
                        detail: {
                            en: "4.0 km.​",
                            th: "4.0 กม."
                        }
                    },
                    {
                        name: {
                            en: "แฟชั่นไอสแลนด์",
                            th: "แฟชั่นไอสแลนด์"
                        },
                        detail: {
                            en: "7.0 km.​",
                            th: "7.0 กม."
                        }
                    },
                    {
                        name: {
                            en: "เซ็นทรัล อีสต์วิลล์",
                            th: "เซ็นทรัล อีสต์วิลล์"
                        },
                        detail: {
                            en: "16.0 km.​",
                            th: "16.0 กม."
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
                            en: "โรงเรียนสาธิตพัฒนา",
                            th: "โรงเรียนสาธิตพัฒนา"
                        },
                        detail: {
                            en: "2.5 km.",
                            th: "2.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "โรงเรียนนานาชาติร่วมฤดี",
                            th: "โรงเรียนนานาชาติร่วมฤดี"
                        },
                        detail: {
                            en: "4.5 km.",
                            th: "4.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "โรงเรียนนานาชาติกีรพัฒน์",
                            th: "โรงเรียนนานาชาติกีรพัฒน์"
                        },
                        detail: {
                            en: "10.5 km.",
                            th: "10.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "โรงเรียนเลิศหล้า",
                            th: "โรงเรียนเลิศหล้า"
                        },
                        detail: {
                            en: "13.5 km.",
                            th: "13.5 กม."
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
