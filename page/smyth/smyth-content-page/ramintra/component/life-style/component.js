const LifeStyleComponent = defineComponent({
    name: 'LifeStyleComponent',
    template: `
    <section id="s_lifestyle" data-section="s_lifestyle"
        class="life-style-component min-h-[800px]  py-10 relative flex bg-[#733C1F] onview  font-['IBM_Plex_Sans_Thai']">
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
                    <h2 class="text-[35px] uppercase font-medium text-center text-white  font-['Gotham']">
                        S LIFESTYLE
                    </h2>
                    <p class="text-center text-white text-[20px] mt-3">
                        {{datasets.s_life_detail[language]}}
                    </p>
                </div>
                <div class="flex gap-5 lg:flex-row flex-col lg:mt-5 mt-2">
                    <div class="lg:w-2/6 w-full space-y-3">
                        <p class="text-[22px] font-medium uppercase text-white font-['Gotham']">
                            Distinctive Location
                        </p>
                        <p class="text-white">
                          {{datasets.distinctive_location[language]}}
                        </p>
                    </div>
                    <div class="flex lg:gap-20 mx-auto flex-wrap">
                        <div class="lg:w-1/6 lg:mt-0 mt-5 w-1/2" v-for="(item,distinctive_location_meters_id) in datasets.distinctive_location_meters" :key="distinctive_location_meters_id">
                            <div class="flex justify-center">
                                <p class="font-thin text-[80px] text-white leading-none text-center">
                                {{item.text[language]}}
                                </p>
                                <p class="text-white text-center leading-none mt-auto mb-2">
                                    {{item.unit[language]}}
                                </p>
                            </div>
                            <p class="text-white text-center">
                                {{item.details[language]}}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex lg:gap-10 gap-2 mt-5 lg:flex-row flex-col">
                    <div class="space-y-3 lg:w-1/4 w-full pb-5">
                        <div class="h-[40px]">
                            <img aria-hidden="true" src="/assets/image/page-smyth-kaset/life/sedan_2736918.webp" alt="" >
                        </div>
                        <div>
                            <p class="text-[22px] font-medium uppercase text-white uppercase" :class="[fonts]">
                                {{datasets.transportations.title[language]}}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="group flex justify-between text-white" v-for="(item, transportationsId) in datasets.transportations.item" :key="transportationsId" >
                                    <div class="lg:max-w-[250px]  group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words" v-html="item.name[language]"></div>
                                    <div class="text-right group-hover:opacity-25 transition-all text-nowrap">
                                        {{item.detail[language]}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-[1px] bg-white/30 mt-3"></div>
                    <div class="space-y-3  lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img aria-hidden="true" src="/assets/image/page-smyth-kaset/life/medic.webp" alt="" class="w-[33px]">
                        </div>
                        <div>
                            <p class="text-[22px] font-medium uppercase text-white uppercase" :class="[fonts]">
                                {{datasets.hospitals.title[language]}}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="group flex justify-between text-white" v-for="(item, hospitalsId) in datasets.hospitals.item" :key="hospitalsId" >
                                    <div class="lg:max-w-[250px] group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words" v-html="item.name[language]"></div>
                                    <div class="text-right group-hover:opacity-25 transition-all text-nowrap">
                                        {{item.detail[language]}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-[1px] bg-white/30 mt-3"></div>
                    <div class="space-y-3  lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img aria-hidden="true" src="/assets/image/page-smyth-kaset/life/shopping-cart_833314.webp" alt="" class="w-[33px]">
                        </div>
                        <div>
                            <p class="text-[22px] font-medium uppercase text-white uppercase" :class="[fonts]">
                                {{datasets.surrounding_amenities.title[language]}}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="group flex justify-between text-white" v-for="(item,surrounding_amenitiesId) in datasets.surrounding_amenities.item" :key="surrounding_amenitiesId" >
                                    <div class="lg:max-w-[250px] group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words" v-html="item.name[language]"></div>
                                    <div class="text-right group-hover:opacity-25 transition-all text-nowrap">
                                        {{item.detail[language]}}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-[1px] bg-white/30 mt-3"></div>
                    <div class="space-y-3  lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img aria-hidden="true" src="/assets/image/page-smyth-kaset/life/education_13807278.webp">
                        </div>
                        <div>
                            <p class="text-[22px] font-medium uppercase text-white uppercase" :class="[fonts]">
                                {{datasets.educations.title[language]}}
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="group flex justify-between text-white" v-for="(item,educationsId) in datasets.educations.item" :key="educationsId" >
                                    <div class="lg:max-w-[250px] group-hover:text-nowrap truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:break-words" v-html="item.name[language]"></div>
                                    <div class="text-right group-hover:opacity-25 transition-all text-nowrap">
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
                en: "A private estate that allows you to live life your way in a prime location with complete amenities to suit every lifestyle. Ideal for both living and business pursuits.​",
                th: "ไพรเวท เอสเตทที่ให้คุณสัมผัสชีวิตในแบบของคุณ บนทำเลศักยภาพ สิ่งอำนวยความสะดวกครบครัน ตอบโจทย์ทุกไลฟ์สไตล์ รองรับทั้งการใช้ชีวิตและการทำธุรกิจ​​"
            },
            distinctive_location: {
                en: "Located in the prime Ram Inthra area, a desirable residential hub surrounded by shopping malls, golf courses, leading educational institutions, quality hospitals, and an airport. Enjoy convenient transportation with easy access to city destinations.​​",
                th: "ตั้งอยู่บนทำเลศักยภาพย่านรามอินทรา ซึ่งเป็น Residential Hub ที่น่าอยู่อาศัย รายล้อมด้วยห้างสรรพสินค้า สนามกอล์ฟ สถาบันการศึกษาชั้นนำ โรงพยาบาลคุณภาพ และสนามบิน พร้อมการเดินทางที่สะดวกสบาย เชื่อมต่อทุกจุดหมายสำคัญในเมืองได้อย่างรวดเร็ว​"
            },
            distinctive_location_meters: [
                {
                    text: {
                        en: "650",
                        th: "650"
                    },
                    unit: {
                        en: "m.",
                        th: "ม."
                    },
                    details: {
                        en: "MRT Pink Line, Ram Inthra 3 Station",
                        th: "รถไฟฟ้า MRT สายสีชมพู สถานีรามอินทรา 3"
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
                        en: "Phyathai Nawawamin Hospital",
                        th: "โรงพยาบาลพญาไท นวมินทร"
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
                        en: "Central Ramindra",
                        th: "เซ็นทรัลรามอินทรา"
                    }
                },
                {
                    text: {
                        en: "6.5",
                        th: "6.5"
                    },
                    unit: {
                        en: "km.",
                        th: "กม."
                    },
                    details: {
                        en: "Kasetsart University",
                        th: "มหาวิทยาลัยเกษตรศาสตร์"
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
                            en: "MRT Pink Line, Ram Inthra 3 Station",
                            th: "รถไฟฟ้า MRT สายสีชมพู สถานีรามอินทรา 3​"
                        },
                        detail: {
                            en: "650 m.",
                            th: "650 ม."
                        }
                    },
                    {
                        name: {
                            en: "MRT Pink Line, Lat Pla Khao Station",
                            th: "รถไฟฟ้า MRT สายสีชมพู สถานีลาดปลาเค้า"
                        },
                        detail: {
                            en: "1.5 km.",
                            th: "1.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "BTS Green Line, Wat Phra Sri Mahathat Station",
                            th: "รถไฟฟ้า BTS สายสีเขียว สถานีวัดพระศรีมหาธาตุ"
                        },
                        detail: {
                            en: "2.5 km.",
                            th: "2.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "SRT Red Line, Lak Si Station",
                            th: "รถไฟฟ้า SRT สายสีแดง สถานีหลักสี่"
                        },
                        detail: {
                            en: "7.0 km.",
                            th: "7.0 กม."
                        }
                    },
                    {
                        name: {
                            en: "Ram Inthra - At Narong Expressway ",
                            th: "ทางด่วน รามอินทรา – อาจณรงค์ "
                        },
                        detail: {
                            en: "3.5 km.",
                            th: "3.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "Kanchanaphisek Expressway",
                            th: "ทางด่วนกาญจนาภิเษก"
                        },
                        detail: {
                            en: "8.5 km.",
                            th: "8.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "Don Mueang International Airport",
                            th: "สนามบินดอนเมือง"
                        },
                        detail: {
                            en: "10.0 km.",
                            th: "10.0 กม."
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
                            en: "Phyathai Nawawamin Hospital",
                            th: "โรงพยาบาลพญาไท นวมินทร์"
                        },
                        detail: {
                            en: "8.5 km.",
                            th: "8.5 กม.​"
                        }
                    },
                    {
                        name: {
                            en: "Navavej International Hospital",
                            th: "โรงพยาบาลนวเวช"
                        },
                        detail: {
                            en: "9.0 km.​",
                            th: "9.0 กม.​"
                        }
                    },
                    {
                        name: {
                            en: "Vibhavadi Hospital",
                            th: "โรงพยาบาลวิภาวดี"
                        },
                        detail: {
                            en: "9.0 km.​",
                            th: "9.0 กม.​"
                        }
                    },
                    {
                        name: {
                            en: "Synphaet Ramintra Hospital",
                            th: "โรงพยาบาลสินแพทย์ รามอินทรา"
                        },
                        detail: {
                            en: "11.0 km.​",
                            th: "11.0 กม.​"
                        }
                    }
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
                            en: "Central Ramindra",
                            th: "เซ็นทรัลรามอินทรา"
                        },
                        detail: {
                            en: "750 m.",
                            th: "750 ม."
                        }
                    },
                    {
                        name: {
                            en: "Thahan Bok Golf Driving Range",
                            th: "สนามกอล์ฟ ศูนย์พัฒนากีฬากองทัพบก รามอินทรา"
                        },
                        detail: {
                            en: "1 km.​",
                            th: "1 กม."
                        }
                    },
                    {
                        name: {
                            en: "Ease Park",
                            th: "อีส พาร์ค"
                        },
                        detail: {
                            en: "1.0 km.​",
                            th: "1.0 กม."
                        }
                    },
                    {
                        name: {
                            en: "The Walk Kaset-Nawamin",
                            th: "เดอะวอล์ค เกษตร-นวมินทร์"
                        },
                        detail: {
                            en: "3.5 km.​",
                            th: "3.5 กม."
                        }
                    },
                    {
                        name: {
                            en: "Crystal Design Center (CDC)",
                            th: "ศูนย์การค้าคริสตัล ดีไซน์ เซ็นเตอร์(CDC)"
                        },
                        detail: {
                            en: "8.0 km.​",
                            th: "8.0 กม.​"
                        }
                    },
                    {
                        name: {
                            en: "Central Festival EastVille",
                            th: "ศูนย์การค้าเซ็นทรัลเฟสติวัล อีสต์วิลล์"
                        },
                        detail: {
                            en: "10.5 km.​",
                            th: "10.5 กม.​"
                        }
                    },
                    {
                        name: {
                            en: "Central Ladprao",
                            th: "ศูนย์การค้าเซ็นทรัล ลาดพร้าว"
                        },
                        detail: {
                            en: "11.0 km.​",
                            th: "11.0 กม.​"
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
                            en: "Kasetsart University",
                            th: "มหาวิทยาลัยเกษตรศาสตร์"
                        },
                        detail: {
                            en: "6.5 km.",
                            th: "6.5 กม.​"
                        }
                    },
                    {
                        name: {
                            en: "Harrow International School Bangkok",
                            th: "โรงเรียนนานาชาติฮาร์โรว์กรุงเทพฯ"
                        },
                        detail: {
                            en: "7.5 km.​",
                            th: "7.5 กม.​"
                        }
                    },
                    {
                        name: {
                            en: "Keerapat International School",
                            th: "โรงเรียนนานาชาติกีรพัฒน์ (KPIS)"
                        },
                        detail: {
                            en: "8.0 km.​",
                            th: "8.0 กม.​​"
                        }
                    },
                    {
                        name: {
                            en: "Lertlah School Kaset - Nawamin Road",
                            th: "โรงเรียนเลิศหล้า ถนนเกษตร - นวมินทร"
                        },
                        detail: {
                            en: "10.0 km.​",
                            th: "10.0 กม.​​"
                        }
                    },
                    {
                        name: {
                            en: "NIVA American International School",
                            th: "โรงเรียนนานาชาตินีวาอเมริกัน"
                        },
                        detail: {
                            en: "12.0 km.​",
                            th: "12.0 กม.​"
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
            fonts.value = language.value == 'th' ? "" : ""
        });

        return { expand, showMore, language, datasets, fonts };
    }
});
