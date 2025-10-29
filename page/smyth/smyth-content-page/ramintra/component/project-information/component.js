const ProjectInformationComponent = defineComponent({
    name: 'ProjectInformationComponent',
    template: `
    <section  class="onview font-['IBM_Plex_Sans_Thai']" :src="{fontClass}" id="project_detail" data-section="project_detail">
      <div class="grid grid-rows-1 grid-cols-1 lg:grid-cols-4 relative min-h-[900px] bg-[#F5F5F1] lg:px-0 px-5">
        <!-- Tab Buttons -->
        <div class="bg-[#33617D] bg-cover bg-center py-20 h-full lg:block hidden" :style="{ backgroundImage: 'url(/assets/image/page-smyth-kaset/description/info.webp)' }">
          <div class="grid min-w-[240px] w-fit mx-auto">
            <div v-for="item in list" :key="item.tab" class="mb-4 relative">
              <button type="button" @click="activeSection = item.tab" class="project-detail-button-list" :data-name="activeSection">
                <h3 class="text-white text-[24px] transition" :class="activeSection === item.tab ? 'font-bold' : 'font-thin'">
                  {{ item.name[language] }}
                </h3>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Dynamic Content Area -->
        <div class="lg:col-span-3 lg:px-20 pt-10 pb-20">
          <h2 :style="{fontFamily:'DB Heavent'}" class="lg:text-[70px] text-[50px] text-[#2C2C2C] lg:text-left text-center leading-none font-normal">
            {{ title[language] }}
          </h2>
          <!-- Mobile Tab Buttons Dropdown -->
          <div class="relative lg:hidden block my-5">
            <div>
              <button 
                @click="toggleExpand" 
                type="button" 
                :data-name="activeListName()"
                class="project-detail-button-listM bg-[#56362a] bg-cover bg-center px-5 text-center w-full lg:py-3 py-2 text-white lg:text-[24px] text-[18px]">
                <p>{{ activeListName() }}</p>
                <span class="absolute top-0 right-0 m-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13.114" height="7.498" viewBox="0 0 13.114 7.498">
                        <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down" d="M12.747,16.484l4.958-4.962a.933.933,0,0,1,1.324,0,.945.945,0,0,1,0,1.327L13.41,18.471a.935.935,0,0,1-1.292.027L6.461,12.853a.937.937,0,0,1,1.324-1.327Z" transform="translate(-6.188 -11.247)" fill="#f5f5f5"></path>
                    </svg>
                </span>
              </button>
            </div>
            <div v-if="isExpanded" class="absolute left-0 top-full w-full border border-black p-5 bg-white z-10 space-y-5">
              <div 
                v-for="item in list" 
                :key="item.tab" 
                @click="selectTab(item.tab)" 
                class="cursor-pointer">
                <h3 class="lg:text-[24px] text-[18px] transition font-light hover:font-normal">
                  {{ item.name[language] }}
                </h3>
              </div>
            </div>
          </div>
          
          <hr class="border border-[#707070]/70 md:w-1/2 mt-5 mb-10 lg:block hidden"/>
          <!-- Pass openBigImage as a prop to children that need it -->
          <component 
            :is="sectionComponents[activeSection]" 
            :title="title" 
            :language="language" 
            :list="list" 
            :openBigImage="openBigImage"
            :activeTab="activeSection"
            @updateActiveSection="handleUpdateActiveSection"
          />
          <div class="mt-20" v-if="brochureUrl">
            <button type="button" @click="projectDetailDownloadBrochure"
                class="border border-1 py-2 px-3 border-black lg:w-auto w-full block">
                <div class="flex gap-2">
                    <span><img src="/assets/icon/pdf.svg" alt="" class="w-[30px]"></span>
                    <span class="my-auto mx-auto">
                        {{brochure}}
                    </span>
                </div>
            </button>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div v-if="isModalVisible" class="fixed inset-0 z-[9999]">
        <div class="h-full modal-div flex" :id="\`\${currentModalId}-modal\`" >
            <div class="absolute inset-0 bg-black/70"  @click="closeMaximizeModal"></div>
            <div class="swiper lg:w-[70dvw] w-[90dvw] lg:h-[80dvh] lg:h-[40dvh] m-auto floorplan-image-swiper">
                <div class="swiper-wrapper">
                    <div v-for="(image, index) in currentModalImages" :key="index" class="swiper-slide flex" :data-item="index">
                        <img :src="image.url" alt="Gallery Image" class="m-auto  object-cover absolute inset-0" />
                    </div>
                </div>
            </div>
            <div class="py-5 flex justify-between gap-5 w-full absolute top-1/2 left-0 mx-auto px-10 z-50 -translate-y-1/2">
                <button class="floorplan-image-prev rotate-180 transition border my-auto">
                    <img src="/assets/icon/chev-icon-white.svg" alt="prev icon">
                </button>
                <button class="floorplan-image-next transition border my-auto">
                    <img src="/assets/icon/chev-icon-white.svg" alt="next icon">
                </button>
            </div>
          <button type="button" @click="closeMaximizeModal"
              class="absolute right-0 top-0 lg:m-10 m-5 z-50 w-[30px] overflow-hidden">
            <img src="/assets/icon/close.svg" class="scale-110" />
          </button>
        </div>
      </div>
    </section>
  `,
    computed: {
        activeListName() {
            const activeItem = this.list.find(item => item.tab === 'projectDetails');
            return activeItem ? activeItem.name[this.language] : 'รายละเอียดโครงการ';
        }
    },
    setup() {
        const language = ref('th');
        const activeSection = ref('projectDetails');
        const isExpanded = ref(false);
        const isModalVisible = ref(false);
        const currentModalId = ref('');
        // Initialize with an empty array; images will be updated dynamically.
        const currentModalImages = ref([]);
        const brochure = ref('ดาวน์โหลดโบรชัวร์');
    const brochureUrl = ref("/assets\/image\/page-smyth-ramintra\/E-brochure SMYTH'S Ramintra.pdf");
        const title = ref({
            en: 'Project Information',
            th: 'ข้อมูลโครงการ'
        });

        const list = ref([{
                tab: 'projectDetails',
                name: {
                    en: 'Project Details',
                    th: 'รายละเอียดโครงการ'
                }
            },
            //   {
            //     tab: 'masterPlan',
            //     name: { en: 'Master Plan', th: 'มาสเตอร์แพลน' }
            //   },
            {
                tab: 'floorPlan',
                name: {
                    en: 'Floor Plan',
                    th: 'ฟลอร์แพลน'
                }
            },
            //   {
            //     tab: 'unitPlan',
            //     name: { en: 'Unit Plan', th: 'ยูนิตแพลน' }
            //   },
            {
                tab: 'Amenities',
                name: {
                    en: 'Amenities',
                    th: 'สิ่งอำนวยความสะดวก'
                }
            },
            {
                tab: 'Services',
                name: {
                    en: 'Services',
                    th: 'บริการ'
                }
            }
        ]);

        // --- Child Components ---
        const ProjectDetailsContent = {
            props: ['title', 'language', 'list'],
            data() {
                return {
                    dataset: [{
                            // Project basic details (from project_details)
                            projectArea: {
                                th: "ประมาณ 2 ไร่​",
                                en: "Approximately 2 rai​"
                            },
                            type: {
                                th: "บ้านเดี่ยว 3 ชั้น​​",
                                en: "3-Storey detached house​"
                            },
                            unit: {
                                th: "4 ยูนิต​​​",
                                en: "4 units"
                            },
                            usable: {
                                th: "999 ตร.ม.​",
                                en: "999 sq.m.​"
                            },
                            area: {
                                th: "เริ่มต้น 180 ตร.ว.​",
                                en: "Starts 180 sq.w."
                            },
                            // parking: { th: "232 คัน", en: "232 cars" }
                        },
                        {
                            // House Types and Sizes (from project_details)
                            title: {
                                th: "ประเภทและขนาดบ้าน หรือ ประเภทบ้านและพื้นที่ใช้สอย​",
                                en: "House Types and Sizes​"
                            },
                            data: [{
                                name: {
                                    th: "THE RESIDENCE",
                                    en: "THE RESIDENCE"
                                },
                                size: {
                                    th: "999 ตร.ม.",
                                    en: "999 sq.m.​"
                                }
                            }]
                        }
                    ]

                };
            },
            computed: {
                activeListName() {
                    const activeItem = this.list.find(item => item.tab === 'projectDetails');
                    return activeItem ?
                        activeItem.name[this.language] :
                        (this.language === 'th' ? 'รายละเอียดโครงการ' : 'Project Details');
                }
            },
            methods: {
                formatKey(key) {
                    const mapping = {
                        projectArea: this.language === 'th' ? "ขนาดโครงการ" : "Project area",
                        type: this.language === 'th' ? "ประเภทโครงการ" : "Project Type",
                        unit: this.language === 'th' ? "จำนวนยูนิต" : "Number of units",
                        usable: this.language === 'th' ? "พื้นที่ใช้สอย" : "Usable area",
                        area: this.language === 'th' ? "ขนาดที่ดิน" : "Land area",
                        // parking: this.language === 'th' ? "จำนวนที่จอดรถ" : "Parking Lots"
                    };
                    return mapping[key] || key;
                },
                getValue(value) {
                    return typeof value === 'object' ? value[this.language] : value;
                }
            },
            template: `
        <div class="space-y-5 mt-5">
          <h3 class="font-medium text-[20px]">
            {{ activeListName }}
          </h3>
          <div class="grid grid-cols-2 gap-5 lg:w-1/2 ">
            <template v-for="(value, key) in dataset[0]" :key="key">
              <p class="font-normal">{{ formatKey(key) }} :</p>
              <p class="text-right">{{ getValue(value) }}</p>
            </template>
          </div>
            <hr class="border border-[#707070]/70 md:w-1/2 mt-5 mb-10">
          <div v-for="(item, index) in dataset.slice(1)" :key="index" class="pt-5">
            <h3 class="font-medium text-[20px]">{{ item.title[this.language] }}</h3>
            <div class="grid grid-cols-2 gap-5 lg:w-1/2 mt-5">
              <template v-for="(rt, i) in item.data" :key="i">
                <p class="font-normal text-nowrap">{{ rt.name[language] }} :</p>
                <p class="text-right">{{ rt.size[language] }}</p>
              </template>
            </div>
            <hr class="border border-[#707070]/70 md:w-1/2 mt-5 mb-10">
          </div>
        </div>
      `
        };

        const PlanContent = {
            props: ['language', 'list', 'openBigImage', 'activeTab'],
            data() {
                return {
                    dataset: [{
                            tab: 'masterPlan',
                            name: {
                                en: 'Ground Floor Plan',
                                th: 'มาสเตอร์แพลน'
                            },
                            images: [{
                                key: 'masterPlan-1',
                                name: {
                                    en: 'Ground Floor Plan',
                                    th: 'Ground Floor Plan'
                                },
                                url: '/assets\/image\/page-the-esse-36\/information\/s_7440060.jpg'
                            }]
                        },
                        {
                            tab: 'floorPlan',
                            name: {
                                en: 'FloorPlan',
                                th: 'FloorPlan'
                            },
                            images: [{
                                    key: 'floorPlan-1',
                                    name: {
                                        en: '7th',
                                        th: '7th'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_2137882.jpg'
                                },
                                {
                                    key: 'floorPlan-2',
                                    name: {
                                        en: '8th',
                                        th: '8th'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_1637143.jpg'
                                },
                                {
                                    key: 'floorPlan-3',
                                    name: {
                                        en: '9th',
                                        th: '9th'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_3477765.jpg'
                                },
                                {
                                    key: 'floorPlan-4',
                                    name: {
                                        en: '10th - 35th',
                                        th: '10th - 35th'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_3447173.jpg'
                                },
                                {
                                    key: 'floorPlan-5',
                                    name: {
                                        en: '36th - 38th',
                                        th: '36th - 38th'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_6965198.jpg'
                                },
                                {
                                    key: 'floorPlan-6',
                                    name: {
                                        en: '39th',
                                        th: '39th'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_3681189.jpg'
                                },
                                {
                                    key: 'floorPlan-7',
                                    name: {
                                        en: '40th',
                                        th: '40th'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_3099352.jpg'
                                },
                                {
                                    key: 'floorPlan-8',
                                    name: {
                                        en: '41st',
                                        th: '41st'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_2408006.jpg'
                                },
                                {
                                    key: 'floorPlan-9',
                                    name: {
                                        en: 'Ground',
                                        th: 'Ground'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_5285139.jpg'
                                },
                            ]
                        },
                        {
                            tab: 'unitPlan',
                            name: {
                                en: 'UnitPlan',
                                th: 'UnitPlan'
                            },
                            images: [{
                                    key: 'unitPlan-1',
                                    name: {
                                        en: '1A-1',
                                        th: '1A-1'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_5772410.jpg'
                                },
                                {
                                    key: 'unitPlan-2',
                                    name: {
                                        en: '1A-2',
                                        th: '1A-2'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_3460513.jpg'
                                },
                                {
                                    key: 'unitPlan-3',
                                    name: {
                                        en: '2B-1',
                                        th: '2B-1'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_1994693.jpg'
                                },
                                {
                                    key: 'unitPlan-4',
                                    name: {
                                        en: '2B-2',
                                        th: '2B-2'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_3836627.jpg'
                                },
                                {
                                    key: 'unitPlan-5',
                                    name: {
                                        en: '3C-1',
                                        th: '3C-1'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_5236203.jpg'
                                },
                                {
                                    key: 'unitPlan-6',
                                    name: {
                                        en: '3C-2',
                                        th: '3C-2'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_7954161.jpg'
                                },
                                {
                                    key: 'unitPlan-7',
                                    name: {
                                        en: 'PH',
                                        th: 'PH'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_5558134.jpg'
                                },
                                {
                                    key: 'unitPlan-8',
                                    name: {
                                        en: 'PH-1',
                                        th: 'PH-1'
                                    },
                                    url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_4684522.jpg'
                                }
                            ]
                        }
                    ],
                    selectedOption: null,
                    isDropdownOpen: false,
                    viewFullImageText: {
                        en: 'View full size',
                        th: 'คลิกเพื่อดูภาพใหญ่'
                    },
                }
            },
            computed: {
                // เอาเฉพาะชุด images ของ tab ปัจจุบัน แล้ว map ให้มี key, url, name
                options() {
                    const plan = this.dataset.find(o => o.tab === this.activeTab)
                    return plan ?
                        plan.images.map(img => ({
                            key: img.key,
                            url: img.url,
                            name: img.name
                        })) : []
                },
                headerName() {
                    return this.list.find(i => i.tab === this.activeTab).name[this.language]
                }
            },
            created() {
                if (this.options.length) {
                    this.selectedOption = this.options[0]
                }
            },
            watch: {
                activeTab() {
                    if (this.options.length) {
                        this.selectedOption = this.options[0]
                    }
                    this.isDropdownOpen = false
                }
            },
            methods: {
                toggleDropdown() {
                    this.isDropdownOpen = !this.isDropdownOpen
                },
                selectOption(opt) {
                    this.selectedOption = opt
                    this.isDropdownOpen = false
                }
            },
            template: `
    <div class="space-y-5">
      <div class="flex justify-between lg:w-3/4 w-full">
        <!-- ชื่อหัวข้อ -->
        <h3 class="font-medium text-[20px]">{{ headerName }}</h3>

        <!-- dropdown เลือกรูป -->
        <div class="relative inline-block">
          <button @click="toggleDropdown" class="border px-3 py-1 flex items-center  justify-between min-w-[10rem]">
            {{ selectedOption.name[language] }}
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 13.114 7.498">
              <path d="M12.747,16.484l4.958-4.962a.933.933,0,0,1,1.324,0,.945.945,0,0,1,0,1.327L13.41,18.471a.935.935,0,0,1-1.292.027L6.461,12.853a.937.937,0,0,1,1.324-1.327Z" transform="translate(-6.188 -11.247)" fill="#000"/>
            </svg>
          </button>
          <div v-if="isDropdownOpen" class="absolute left-0 mt-1 w-full bg-white border z-10 max-h-48 overflow-auto">
            <div
              v-for="opt in options"
              :key="opt.key"
              @click="selectOption(opt)"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {{ opt.name[language] }}
            </div>
          </div>
        </div>
      </div>

      <!-- แสดงรูปที่เลือก -->
      <div class="mt-5 lg:w-3/4 w-full">
        <img :src="selectedOption.url" class="w-full rounded-lg" />
        <button
          @click="openBigImage(activeTab, [ { url: selectedOption.url, name: selectedOption.name } ])"
          class="mt-3 flex items-center gap-2 text-sm  ml-auto" 
        >
          {{viewFullImageText[language] }}
          <img src="/assets/icon/maximize.svg" alt="maximize" class="w-4 h-4"/>
        </button>
      </div>
    </div>
  `
        }
        const PlanContent2 = {
            props: ['language', 'openBigImage', 'activeTab'], // 'residenceI' | 'residenceII' | 'residenceIII'
            data() {
                return {
                    tabs: [{
                        id: 'residence',
                        title: 'THE RESIDENCE',
                        areaText: {
                            en: 'Usable area : 999 sq.m.\n3.20 m. Ceiling Height',
                            th: 'พื้นที่ใช้สอย : 999 ตร.ม.\nเพดานสูง 3.2 เมตร'
                        },
                        images: [
                            '/assets\/image\/page-smyth-ramintra\/gallery\/exterior\/M\/01_SMYTH_S_RAMINTRA_Exterior.webp',
                            // '/assets/image/page-smyth-ramintra/floor-plan/1.webp',
                            '/assets/image/page-smyth-ramintra/floor-plan/1f.webp',
                            '/assets/image/page-smyth-ramintra/floor-plan/2f.webp',
                            '/assets/image/page-smyth-ramintra/floor-plan/3f.webp'
                        ],
                        specs: [
                            {
                                icon: '/assets/icon/floor-plan/bedroom.webp',
                                alt: '5 ห้องนอน',
                                text: {
                                    th: '5 ห้องนอน',
                                    en: '5 Bedrooms'
                                }
                            },

                            {
                                icon: '/assets/icon/floor-plan/bathroom.webp',
                                alt: '8 ห้องน้ำ​',
                                text: {
                                    th: '8 ห้องน้ำ​',
                                    en: '8 Bathrooms​'
                                }
                            },

                            {
                                icon: '/assets/icon/floor-plan/living_area.webp',
                                alt: '2 โซนห้องนั่งเล่น',
                                text: {
                                    th: '2 ห้องนั่งเล่น​',
                                    en: '2 Living Areas'
                                }
                            },
                            {
                                icon: '/assets/icon/floor-plan/multi-purpose_area.webp',
                                alt: '1 พื้นที่อเนกประสงค์​',
                                text: {
                                    th: '1 พื้นที่อเนกประสงค์​',
                                    en: '1 Multi-Purpose Area'
                                }
                            },

                            {
                                icon: '/assets/icon/floor-plan/rest_room.webp',
                                alt: '1 ห้องพักผ่อนส่วนตัว',
                                text: {
                                    th: '1 ห้องพักผ่อนส่วนตัว',
                                    en: '1 Hideaway Chamber'
                                }
                            },

                            {
                                icon: '/assets/icon/floor-plan/dinning_area.webp',
                                alt: '2 โซนรับประทานอาหาร​',
                                text: {
                                    th: '2 โซนรับประทานอาหาร​',
                                    en: '2 Dining Areas'
                                }
                            },

                            {
                                icon: '/assets/icon/floor-plan/kitchen.webp',
                                alt: '2 พื้นที่เตรียมอาหาร​',
                                text: {
                                    th: '2 พื้นที่เตรียมอาหาร​',
                                    en: '2 Pantry Areas'
                                }
                            },

                            {
                                icon: '/assets/icon/floor-plan/kitchen.webp',
                                alt: '1 ครัวไทย​​',
                                text: {
                                    th: '1 ครัวไทย​​',
                                    en: '1 Thai Kitchen '
                                }
                            },

                            {
                                icon: '',
                                alt: '1 ห้องซักรีด​​​',
                                text: {
                                    th: '1 ห้องซักรีด​​​',
                                    en: '1 Laundry Room'
                                }
                            },

                            {
                                icon: '',
                                alt: '1 โซนซักล้าง​',
                                text: {
                                    th: '1 โซนซักล้าง​',
                                    en: '1 Maid Plaza'
                                }
                            },

                            {
                                icon: '/assets/icon/floor-plan/maid_room.webp',
                                alt: '2 ห้องแม่บ้าน​​',
                                text: {
                                    th: '2 ห้องแม่บ้าน​​',
                                    en: '2 Maid Rooms'
                                }
                            },

                            {
                                icon: '',
                                alt: '1 ห้องน้ำแม่บ้าน​​',
                                text: {
                                    th: '1 ห้องน้ำแม่บ้าน​​',
                                    en: '1 Maid Bathroom'
                                }
                            },
                            {
                                icon: '/assets/icon/floor-plan/parking_spaces.webp',
                                alt: '6 ที่จอดรถ​',
                                text: {
                                    th: '6 ที่จอดรถ​',
                                    en: '6 Parking Spaces'
                                }
                            },
                            {
                                icon: '/assets/icon/floor-plan/parking_spaces.webp',
                                alt: '4 ที่จอดรถ รองรับการติดตั้ง Car lift​​',
                                text: {
                                    th: '4 ที่จอดรถ\nรองรับการติดตั้ง Car lift​​',
                                    en: '4 Spaces with Parking Lift System'
                                }
                            },
                            {
                                type: 'text',
                                alt: 'นวัตกรรมภายในบ้าน',
                                text: {
                                    th: 'นวัตกรรมภายในบ้าน อาทิ ระบบโซล่าร์เซลล์ 5 กิโลวัตต์, และระบบระบายอากาศ S-Air รวมถึงพร้อมรองรับการติดตั้ง Ev charger 2 จุด, ระบบกรองน้ำประปา, ติดตั้งลิฟท์พร้อมใช้งาน​',
                                    en: 'Innovation : Solar Cell 5 Kw, S-Air System, Provide electrical junction boxes for 2 EV chargers (max 22 kW), Water purifier, Pre-installed elevator.​'
                                }
                            },
                        ]
                    }],
                    localActiveTab: null,
                    selectedIndexMap: {}, // active index ต่อแท็บ (อัปเดตจาก main swiper)
                    thumbsSwiperMap: {}, // instance thumbs ต่อแท็บ
                    mainSwiperMap: {}, // instance main ต่อแท็บ
                    viewFullImageText: {
                        en: 'View full size',
                        th: 'คลิกเพื่อดูภาพใหญ่'
                    },
                };
            },
            created() {
                this.localActiveTab = this.activeTab && this.findTab(this.activeTab) ? this.activeTab : this.tabs[0].id;
                this.tabs.forEach(t => {
                    this.$set(this.selectedIndexMap, t.id, 0);
                });
            },
            mounted() {
                this.$nextTick(() => this.initSwipers());
            },
            watch: {
                activeTab(val) {
                    if (this.findTab(val)) this.localActiveTab = val;
                    this.$nextTick(() => this.updateSwipers());
                }
            },
            computed: {
                currentTab() {
                    return this.findTab(this.localActiveTab);
                },
                currentIndex: {
                    get() {
                        return this.selectedIndexMap[this.localActiveTab] || 0;
                    },
                    set(v) {
                        const main = this.mainSwiperMap[this.localActiveTab];
                        if (main && main.slides && main.slides.length) {
                            const max = main.slides.length - 1;
                            let nv = v;
                            if (nv > max) nv = 0;
                            if (nv < 0) nv = max;
                            main.slideTo(nv);
                        } else {
                            const max = (this.currentTab?.images.length || 1) - 1;
                            let nv = v;
                            if (nv > max) nv = 0;
                            if (nv < 0) nv = max;
                            this.$set(this.selectedIndexMap, this.localActiveTab, nv);
                        }
                    }
                },
                headerText() {
                    return {
                        en: 'Floor Plan',
                        th: 'แบบแปลน'
                    }
                }
            },
            methods: {
                findTab(id) {
                    return this.tabs.find(t => t.id === id);
                },
                isActiveTab(id) {
                    return this.localActiveTab === id;
                },
                setTab(id) {
                    if (!this.findTab(id)) return;
                    this.localActiveTab = id;
                    if (this.selectedIndexMap[id] == null) this.$set(this.selectedIndexMap, id, 0);
                    this.$nextTick(() => this.updateSwipers());
                },

                initSwipers() {
                    this.tabs.forEach((tab) => {
                        // destroy old
                        this.thumbsSwiperMap[tab.id]?.destroy?.(true, true);
                        this.mainSwiperMap[tab.id]?.destroy?.(true, true);

                        const thumbs = new Swiper(`#${tab.id} .thumbs-container`, {
                            spaceBetween: 10,
                            slidesPerView: 3,
                            freeMode: true,
                            watchSlidesProgress: true,
                            slideToClickedSlide: true, // ensure clicking thumb moves main
                            breakpoints: {
                                0: {
                                    slidesPerView: 2,
                                    spaceBetween: 10
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 15
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 20
                                },
                            },
                        });

                        const planList = new Swiper(".floor-plan-list", {
                            spaceBetween: 10,
                            slidesPerView: 3,
                            freeMode: true,
                            // Responsive Breakpoints
                            breakpoints: {
                                0: { // Screens 0px and larger (mobile)
                                    slidesPerView: 2.2,
                                    spaceBetween: 10,
                                },
                                768: { // Screens 768px and larger (tablets)
                                    slidesPerView: 2.2,
                                    spaceBetween: 15,
                                },
                                1024: { // Screens 1024px and larger (desktops)
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                            },
                        });
                        const main = new Swiper(`#${tab.id} .main-container`, {
                            spaceBetween: 10,
                            navigation: {
                                nextEl: `#${tab.id} .next`,
                                prevEl: `#${tab.id} .prev`,
                            },
                            thumbs: {
                                swiper: thumbs
                            },
                        });

                        // sync Vue state when main changes
                        main.on('slideChange', () => {
                            const idx = typeof main.realIndex === 'number' ? main.realIndex : main.activeIndex || 0;
                            this.$set(this.selectedIndexMap, tab.id, idx);
                        });

                        // also update when a thumb is tapped
                        thumbs.on('tap', () => {
                            const idx = typeof thumbs.clickedIndex === 'number' ? thumbs.clickedIndex : 0;
                            main.slideTo(idx);
                            this.$set(this.selectedIndexMap, tab.id, idx);
                        });

                        this.thumbsSwiperMap[tab.id] = thumbs;
                        this.mainSwiperMap[tab.id] = main;

                        // initial slide
                        const want = this.selectedIndexMap[tab.id] || 0;
                        main.slideTo(want, 0);
                    });
                },

                updateSwipers() {
                    const tab = this.localActiveTab;
                    const thumbs = this.thumbsSwiperMap[tab];
                    const main = this.mainSwiperMap[tab];
                    thumbs?.update?.();
                    main?.update?.();
                    // ensure main is at the tracked index after show
                    const want = this.selectedIndexMap[tab] || 0;
                    main?.slideTo?.(want, 0);
                    // จัดแท็บ active ให้อยู่กึ่งกลางวิวด้านบน
                    this.centerActiveTabSlide();
                },

                nextImage() {
                    this.currentIndex = (this.currentIndex + 1);
                },
                prevImage() {
                    this.currentIndex = (this.currentIndex - 1);
                },

                openBig() {
                    if (!this.currentTab) return;
                    const main = this.mainSwiperMap[this.localActiveTab];
                    const idx = main ? (typeof main.realIndex === 'number' ? main.realIndex : main.activeIndex || 0) : (this.currentIndex || 0);
                    const imgs = this.currentTab.images;
                    const reordered = [...imgs.slice(idx), ...imgs.slice(0, idx)].map(u => ({
                        url: u,
                        name: {
                            th: this.currentTab.title,
                            en: this.currentTab.title
                        }
                    }));
                    this.openBigImage(this.localActiveTab, reordered);
                },

                bgStyle(url) {
                    return {
                        backgroundImage: `url('${url}')`
                    };
                },
            },
            
            template: `
          <div id="floorPlan" class="section lg:px-0"  data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
            <div class="flex flex-col w-full gap-5">
              <div><h3 class="font-medium text-[20px]">{{ headerText[language] }}</h3></div>

              <div class="w-full">
                <!-- Top tabs -->
                <div class="lg:w-1/2">
                  <div class="floor-plan-list swiper swiper-horizontal swiper-free-mode swiper-backface-hidden">
                    <div class="swiper-wrapper">
                      <div
                        v-for="tab in tabs"
                        :key="tab.id"
                        class="swiper-slide"
                        style="width:197px; margin-right:20px;"
                      >
                        <button
                          type="button"
                           :style="{fontFamily:language=='en'?'Sukhumvit Set':'IBM Plex Sans Thai'}"
                          :class="isActiveTab(tab.id) ? 'underline font-bold' : ''"
                          @click="setTab(tab.id)"
                        >
                          {{ tab.title }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Panels -->
                <div
                  v-for="tab in tabs"
                  :key="tab.id + '-panel'"
                  :id="tab.id"
                  class="plan-item"
                  :class="isActiveTab(tab.id) ? '' : 'hidden'"
                >
                  <div class="relative mt-5 overflow-hidden">
                    <div class="flex gap-5 lg:flex-row flex-col">
                      <!-- Main image -->
                      <div class="lg:w-1/2">
                        <div class="swiper main-container swiper-horizontal swiper-backface-hidden">
                          <div class="swiper-wrapper">
                            <div
                              class="swiper-slide my-auto"
                              v-for="(img, idx) in tab.images"
                              :key="tab.id + '-main-' + idx"
                            >
                              <div class="lg:h-[350px] h-[210px] bg-cover bg-no-repeat bg-center" :style="bgStyle(img)"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Details (desktop) -->
                      <div class="lg:w-1/2 space-y-2 lg:block hidden relative">
                        <div class="absolute inset-0">
                          <div><p class="uppercase font-bold" :style="{fontFamily:language=='en'?'Sukhumvit Set':'IBM Plex Sans Thai'}">{{ tab.title }}</p></div>
                          <div><p class="whitespace-pre-line">{{ tab.areaText[language] }}</p></div>
                          <div class="space-y-2 w-full">
                            <div class="flex justify-between lg:flex-row flex-col flex-wrap mt-5 space-y-2">
                              <div
                                v-for="(sp, i) in tab.specs"
                                :key="tab.id + '-spec-' + i"
                                class="flex gap-5 w-full"
                                :class="sp.type=='text'?'':'lg:w-1/2'"
                              >
                                <span class="min-w-[48px] flex"  v-if="sp.type!='text'" >
                                  <img class="my-auto w-[25px]"  v-if="sp.icon" :src="sp.icon" :alt="sp.alt">
                                </span>
                                <span class="my-auto leading-tight whitespace-pre-line">{{ sp.text[language] }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Open big -->
                    <div class="lg:w-1/2">
                      <div class="ml-auto my-3 flex justify-end">
                        <button type="button" class="flex gap-4 justify-end" @click="openBig">
                          <p>{{viewFullImageText[language]}}</p>
                          <div class="my-auto">
                            <img src="/assets/icon/maximize.svg" alt="">
                          </div>
                        </button>
                      </div>
                    </div>

                    <!-- Thumbs -->
                    <div class="px-10 relative lg:w-1/2">
                      <div class="swiper thumbs-container swiper-horizontal swiper-free-mode swiper-watch-progress swiper-thumbs">
                        <div class="swiper-wrapper">
                          <div
                            v-for="(img, idx) in tab.images"
                            :key="tab.id + '-thumb-' + idx"
                            class="swiper-slide bg-cover bg-center min-h-[80px] w-[140px] cursor-pointer transition  box-border custom-active"
                            :class="selectedIndexMap[tab.id] === idx ? 'border-2' : 'border'"
                            :style="Object.assign(
                              { backgroundImage: \`url('\${img}')\` },
                            )"
                            style="width:170.333px; margin-right:20px;"
                          ></div>
                        </div>
                      </div>

                      <!-- Prev / Next -->
                      <div class="absolute inset-0 flex justify-between px-1">
                        <div class="my-auto">
                          <span class="prev !block w-[30px]" role="button" aria-label="Previous slide">
                            <img src="/assets/icon/chev-icon.svg" alt="prev icon">
                          </span>
                        </div>
                        <div class="my-auto">
                          <span class="next !block w-[30px]" role="button" aria-label="Next slide">
                            <img src="/assets/icon/chev-icon.svg" alt="next icon" class="rotate-180">
                          </span>
                        </div>
                      </div>
                    </div>

                    <!-- Details (mobile) -->
                    <div class="lg:w-1/2 space-y-2 lg:hidden block mt-10">
                      <div><p class="uppercase font-bold">{{ tab.title }}</p></div>
                      <div><p class="whitespace-pre-line">{{ tab.areaText[language] }}</p></div>
                      <div class="space-y-2 w-full">
                        <div class="flex justify-between lg:flex-row flex-col flex-wrap space-y-2">
                          <div
                            v-for="(sp, i) in tab.specs"
                            :key="tab.id + '-spec-m-' + i"
                            class="flex gap-2 w-full gap-5"
                            :class="sp.type=='text'?'':'lg:w-1/2'"
                          >
                            <span class="w-[35px] flex" v-if="sp.type!='text'">
                              <img  class="m-auto" v-if="sp.icon" :src="sp.icon" :alt="sp.alt">
                            </span>
                            <span class="my-auto whitespace-pre-line">{{ sp.text[language] }}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div> <!-- end residence block -->
              </div>
            </div>
          </div>
          `
        };
        const AmenitiesContent = {
            props: {
                title: {
                    type: Object,
                    required: true
                },
                language: {
                    type: String,
                    required: true
                },
                list: {
                    type: Array,
                    required: true
                },
                activeTab: {
                    type: String,
                    required: true
                },
                amenities: {
                    type: Array,
                    default: () => [{
                            name: {
                                en: "24 Hrs. Security System (Security Guard, CCTV)",
                                th: "ระบบรักษาความปลอดภัย 24 ชม. \n(เจ้าหน้าที่รักษาความปลอดภัย และ กล้องวงจรปิด)​"
                            },
                        },
                        {
                            name: {
                                en: "Underground Wiring​",
                                th: "ระบบไฟฟ้าใต้ดิน"
                            },
                        },
                    ]
                },
                amenitiesImage: {
                    type: String,
                    default: ''
                }
            },
            template: `
        <div>
          <div class="space-y-4">
            <div>
              <!-- Dynamic header based on active tab -->
              <h3 class="font-medium text-[20px]">
                {{ list.find(item => item.tab === activeTab).name[language] }}
              </h3>
            </div>
            <div class="flex lg:flex-row flex-col-reverse gap-5">
              <div class="lg:w-1/2">
                <ul class="grid grid-cols-1">
                  <li v-for="(amenity, index) in amenities" :key="index">
                    <p class="flex my-1 whitespace-pre-line">
                      <span class="mr-2">{{index+1}}.</span><span>{{ amenity.name[language] }}</span>
                    </p>
                  </li>
                </ul>
              </div>
              <div class="lg:w-1/2">
                <img :src="amenitiesImage" alt="">
              </div>
            </div>
          </div>
        </div>
      `
        };

        const ServicesContent = {
            props: {
                title: {
                    type: Object,
                    required: true
                },
                language: {
                    type: String,
                    required: true
                },
                list: {
                    type: Array,
                    required: true
                },
                activeTab: {
                    type: String,
                    required: true
                },
                amenities: {
                    type: Array,
                    default: () => [{
                            name: {
                                th: "บริการผู้ช่วยส่วนตัว​",
                                en: "Concierge service​"
                            }
                        },
                        {
                            name: {
                                th: "ระบบรักษาความปลอดภัย 24 ชม.",
                                en: "24 hrs. security​"
                            }
                        },
                        {
                            name: {
                                th: "บริการซ่อมบำรุง​",
                                en: "Maintenance and repair service​"
                            }
                        },
                        {
                            name: {
                                th: "บริการจัดการขยะ",
                                en: "Garbage management​"
                            }
                        }
                    ]
                },
                serviceImage: {
                    type: String,
                    default: '/assets/image/page-srin-rachapuek/description/DH2-RESIDENCES-CLUBHOUSE-FRONT.webp'
                }
            },
            template: `
        <div>
          <div class="space-y-4">
            <div>
              <!-- Dynamic header based on active tab -->
              <h3 class="font-medium text-[20px]">
                {{ list.find(item => item.tab === activeTab).name[language] }}
              </h3>
            </div>
            <div class="flex lg:flex-row flex-col-reverse gap-5">
              <div class="lg:w-1/2">
                <ul class="space-y-2">
                  <li v-for="(service, index) in amenities" :key="index">
                    <span class="mr-2">{{index+1}}.</span><span>{{ service.name[language] }}</span>
                  </li>
                </ul>
              </div>
              <div class="lg:w-1/2">
                <img :src="serviceImage" alt="">
              </div>
            </div>
          </div>
        </div>
      `
        };

        // 2) ใน setup() เปลี่ยน sectionComponents ให้ใช้ PlanContent กับทั้ง 3 แผน
        const sectionComponents = {
            projectDetails: ProjectDetailsContent,
            //   masterPlan: PlanContent,
            floorPlan: PlanContent2,
            //   unitPlan: PlanContent,
            Amenities: AmenitiesContent,
            Services: ServicesContent
        }
        const toggleExpand = () => {
            isExpanded.value = !isExpanded.value;
        };
        const selectTab = (tab) => {
            activeSection.value = tab;
            isExpanded.value = false;
        };
        const activeListName = () => {
            const activeItem = list.value.find(item => item.tab === activeSection.value);
            return activeItem ? activeItem.name[language.value] : 'รายละเอียดโครงการ';
        };

        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        // Updated openBigImage accepts an images array as a second argument.
        const openBigImage = (id, images) => {
            currentModalId.value = id;
            currentModalImages.value = images;
            isModalVisible.value = true;
            nextTick(() => {
                const activeSlide = document.querySelector(`#${id}-modal .swiper-slide-active`);
                const activeIndex = activeSlide ? parseInt(activeSlide.dataset.item, 10) : 0;
                let swiperInstance = new Swiper(`#${id}-modal .floorplan-image-swiper`, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    loop: true,
                    navigation: {
                        nextEl: `#${id}-modal .floorplan-image-next`,
                        prevEl: `#${id}-modal .floorplan-image-prev`,
                    },
                });
                if (!isNaN(activeIndex)) {
                    swiperInstance.slideTo(activeIndex);
                }
            });
        };


        const closeMaximizeModal = () => {
            isModalVisible.value = false;
        };

        const handleUpdateActiveSection = (newSection) => {
            activeSection.value = newSection;
        };

        // New computed property to select the font class based on language.
        const fontClass = () => {
            return language.value === 'en' ? "IBM Plex Sans Thai" : "IBM Plex Sans Thai";
        };


        // function to push data if user click download brochure in project info section

        const projectDetailDownloadBrochure = () => {
            tracking = {
                event: "view_project_details",
                landing_page: "project_s'rin_prannok_page",
                section: "project_details",
                event_action: "click",
                button: "download_brochure",
                property_brand: "S'RIN",
                project_label: "coming_soon",
                property_type: "DETACHED HOUSE",
                property_location: "S'RIN Prannok - Kanchana",
                property_price: "45-80 MB.",
            }
            console.log('download_brochure')
            setDataLayer(tracking);

            const link = document.createElement('a');
            link.href = brochureUrl.value;
            link.download = "E-brochure SMYTH'S Ramintra.pdf";
            link.click();
        }
        onMounted(() => {
            language.value = getLanguageFromPath();
            brochure.value = language.value == 'th' ? 'ดาวน์โหลดโบรชัวร์' : 'Download Brochure'
            AOS.init();
        });

        return {
            language,
            activeSection,
            title,
            list,
            sectionComponents,
            toggleExpand,
            selectTab,
            activeListName,
            isExpanded,
            openBigImage,
            isModalVisible,
            currentModalId,
            currentModalImages,
            closeMaximizeModal,
            handleUpdateActiveSection,
            fontClass,
            brochure,brochureUrl,
            projectDetailDownloadBrochure
        };
    }
});