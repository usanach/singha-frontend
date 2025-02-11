const LifeStyleComponent = defineComponent({
    name: 'LifeStyleComponent',
    template: `
    <section id="lifestyle" data-section="s_lifestyle"
        class="life-style-component py-10 min-h-screen relative flex bg-[#33617D] onview">
        <div class="absolute inset-0 lg:max-h-none max-h-[1150px]">
            <video autoplay loop muted playsinline class="w-full h-full object-cover">
                <source src="/assets/image/page-srin-prannok/life/GettyImages-1422810118.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="absolute inset-0 bg-gradient-to-b from-[#33617D]/50 lg:to-[#33617D]/50 to-[#33617D] -m-[1px]"></div>
        </div>
        <div class="container relative my-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
            <div class="flex flex-col gap-10">
                <div>
                    <h2 class="text-[40px] uppercase font-['Kaisei_Decol'] font-medium text-center text-white">
                        S LIFESTYLE
                    </h2>
                    <p class="text-center text-white">
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
                    <div class="flex lg:gap-20 mx-auto flex-wrap justify-center">
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
                <div class="flex lg:gap-10 gap-2 mt-5 lg:flex-row flex-col justify-center" >
                    <div class="space-y-3 lg:w-1/4 w-full pb-5" v-if="datasets.transportations">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-srin-prannok/life/sedan_2736918.png" alt="" >
                        </div>
                        <div>
                            <p class="text-[24px] font-['DB_OnUma'] font-medium uppercase text-white uppercase">
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
                    <div class="w-[1px] bg-white/30 mt-3" v-if="datasets.transportations"></div>
                    <div class="space-y-3 lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-srin-prannok/life/medic.png" alt="" class="w-[33px]">
                        </div>
                        <div>
                            <p class="text-[24px] font-['DB_OnUma'] font-medium uppercase text-white uppercase">
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
                    <div class="space-y-3 lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-srin-prannok/life/shopping-cart_833314.png" alt="" class="w-[33px]">
                        </div>
                        <div>
                            <p class="text-[24px] font-['DB_OnUma'] font-medium uppercase text-white uppercase">
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
                    <div class="space-y-3 lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-srin-prannok/life/education_13807278.png">
                        </div>
                        <div>
                            <p class="text-[24px] font-['DB_OnUma'] font-medium uppercase text-white uppercase">
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
            ],
            hospitals: {
                title: {
                    en: "HOSPITAL",
                    th: "โรงพยาบาล"
                },
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
            surrounding_amenities: {
                title: {
                    en: "SURROUNDING AMENITIES",
                    th: "คอมมูนิตี้มอลล์ และ ไลฟ์สไตล์​"
                },
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
            educations: {
                title: {
                    en: "EDUCATION",
                    th: "สถานศึกษา​​"
                },
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
