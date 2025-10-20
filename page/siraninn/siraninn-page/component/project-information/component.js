const ProjectInformationComponent = defineComponent({
  name: 'ProjectInformationComponent',
  template: `
    <section  class="onview font-['IBM_Plex_Sans_Thai']" :src="{fontClass}" id="project_detail" data-section="project_detail">
      <div class="grid grid-rows-1 lg:grid-cols-4 relative min-h-[900px] bg-[#F5F5F1] lg:px-0 px-5">
        <!-- Tab Buttons -->
        <div class="bg-[#393936] bg-cover bg-center py-20 h-full lg:block hidden">
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
          <h2 :style="{fontFamily:'DB OnUma'}" class="lg:text-[70px] text-[50px] lg:text-left text-center leading-none font-normal">
            {{ title[language] }}
          </h2>
          <!-- Mobile Tab Buttons Dropdown -->
          <div class="relative lg:hidden block my-5">
            <div>
              <button 
                @click="toggleExpand" 
                type="button" 
                :data-name="activeListName()"
                class="project-detail-button-listM bg-[#393936] bg-cover bg-center px-5 text-center w-full lg:py-3 py-2 text-white lg:text-[24px] text-[18px]">
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
          
          <hr class="border border-[#707070] md:w-1/2 mt-5 mb-10"/>
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
          <div class="mt-20">
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
      <div v-if="isModalVisible" class="fixed inset-0 bg-black bg-opacity-75 z-[9999]">
        <div class="h-full modal-div" :id="\`\${currentModalId}-modal\`">
          <div class="p-5 rounded-lg h-full ">
            <div class="swiper h-full floorplan-image-swiper">
              <div class="swiper-wrapper">
                <div v-for="(image, index) in currentModalImages" :key="index" class="swiper-slide flex" :data-item="index">
                  <img :src="image.url" alt="Gallery Image" class="lg:h-[80%] h-auto m-auto" />
                </div>
              </div>
            </div>
          </div>
          <div class="py-5 flex justify-between gap-5 w-full absolute top-0 left-0 mx-auto h-full px-10 z-50">
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
    const brochure = ref('ดาวน์โหลดโบรชัวร์')
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
      // {
      //   tab: 'masterPlan',
      //   name: { en: 'Master Plan', th: 'มาสเตอร์แพลน' }
      // },
      // {
      //   tab: 'floorPlan',
      //   name: { en: 'Floor Plan', th: 'ฟลอร์แพลน' }
      // },
      // {
      //   tab: 'unitPlan',
      //   name: { en: 'Unit Plan', th: 'ยูนิตแพลน' }
      // },
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
              // Project basic details
              area: {
                th: "23-3-40 ไร่",
                en: "23-3-40 Rai"
              },
              type: {
                th: "	บ้านเดี่ยว",
                en: "	Single Detached House"
              },
              unit: {
                th: "28 พล็อต",
                en: "28 Plots"
              },
              // parking: { th: "232 คัน", en: "232 cars" }
            },
            {
              // Room type and size details
              title: {
                th: "ประเภทและขนาดห้อง",
                en: "Room type and size"
              },
              data: [{
                "THE RESIDENCE I": {
                  th: "820 ตร.ม.",
                  en: "820 sq.m."
                },
                "THE RESIDENCE II": {
                  th: "682 ตร.ม.",
                  en: "682 sq.m."
                },
                "THE RESIDENCE III": {
                  th: "551 ตร.ม.",
                  en: "551 sq.m."
                },
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
            area: this.language === 'th' ? "ขนาดที่ดิน" : "Land area",
            type: this.language === 'th' ? "ประเภทโครงการ" : "Project Type",
            unit: this.language === 'th' ? "จำนวนยูนิต" : "Number of units",
            parking: this.language === 'th' ? "จำนวนที่จอดรถ" : "Parking Lots"
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
          <div v-for="(item, index) in dataset.slice(1)" :key="index" class="pt-5">
            <h3 class="font-medium text-[20px]">{{ item.title[this.language] }}</h3>
            <div class="grid grid-cols-2 gap-5 lg:w-1/2 mt-5">
              <template v-for="(value, key) in item.data[0]" :key="key">
                <p class="font-normal">{{ key }} :</p>
                <p class="text-right">{{ getValue(value) }}</p>
              </template>
            </div>
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
              images: [
                // {
                //   key: 'masterPlan-1',
                //   name: { en: 'Ground Floor Plan', th: 'Ground Floor Plan' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/s_7440060.jpg'
                // }
              ]
            },
            {
              tab: 'floorPlan',
              name: {
                en: 'FloorPlan',
                th: 'FloorPlan'
              },
              images: [
                // {
                //   key: 'floorPlan-1',
                //   name: { en: '7th', th: '7th' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_2137882.jpg'
                // },
                // {
                //   key: 'floorPlan-2',
                //   name: { en: '8th', th: '8th' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_1637143.jpg'
                // },
                // {
                //   key: 'floorPlan-3',
                //   name: { en: '9th', th: '9th' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_3477765.jpg'
                // },
                // {
                //   key: 'floorPlan-4',
                //   name: { en: '10th - 35th', th: '10th - 35th' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_3447173.jpg'
                // },
                // {
                //   key: 'floorPlan-5',
                //   name: { en: '36th - 38th', th: '36th - 38th' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_6965198.jpg'
                // },
                // {
                //   key: 'floorPlan-6',
                //   name: { en: '39th', th: '39th' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_3681189.jpg'
                // },
                // {
                //   key: 'floorPlan-7',
                //   name: { en: '40th', th: '40th' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_3099352.jpg'
                // },
                // {
                //   key: 'floorPlan-8',
                //   name: { en: '41st', th: '41st' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_2408006.jpg'
                // },
                // {
                //   key: 'floorPlan-9',
                //   name: { en: 'Ground', th: 'Ground' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/floorplan\/s_5285139.jpg'
                // },
              ]
            },
            {
              tab: 'unitPlan',
              name: {
                en: 'UnitPlan',
                th: 'UnitPlan'
              },
              images: [
                // {
                //   key: 'unitPlan-1',
                //   name: { en: '1A-1', th: '1A-1' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_5772410.jpg'
                // },
                // {
                //   key: 'unitPlan-2',
                //   name: { en: '1A-2', th: '1A-2' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_3460513.jpg'
                // },
                // {
                //   key: 'unitPlan-3',
                //   name: { en: '2B-1', th: '2B-1' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_1994693.jpg'
                // },
                // {
                //   key: 'unitPlan-4',
                //   name: { en: '2B-2', th: '2B-2' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_3836627.jpg'
                // },
                // {
                //   key: 'unitPlan-5',
                //   name: { en: '3C-1', th: '3C-1' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_5236203.jpg'
                // },
                // {
                //   key: 'unitPlan-6',
                //   name: { en: '3C-2', th: '3C-2' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_7954161.jpg'
                // },
                // {
                //   key: 'unitPlan-7',
                //   name: { en: 'PH', th: 'PH' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_5558134.jpg'
                // },
                // {
                //   key: 'unitPlan-8',
                //   name: { en: 'PH-1', th: 'PH-1' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/unitplan/s_4684522.jpg'
                // }
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
            })) :
            []
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
          {{viewFullImageText[language]}}
          <img src="/assets/icon/maximize.svg" alt="maximize" class="w-4 h-4"/>
        </button>
      </div>
    </div>
  `
    } // AmenitiesContent (อัปเดต template ให้ตรงกับ data และแสดง title)
    const AmenitiesContent = {
      props: {
        title: {
          type: Object,
          required: true
        }, // { th: '', en: '' }
        language: {
          type: String,
          required: true
        }, // 'th' | 'en'
        list: {
          type: Array,
          required: true
        }, // [{ tab, name: {th,en} }, ...]
        activeTab: {
          type: String,
          required: true
        }, // tab key
        showActiveTabTitle: {
          type: Boolean,
          default: true
        },
        amenities: {
          type: Array,
          default: () => [{
            title: {
              en: "",
              th: ""
            },
            items: [{
                name: {
                  en: "Residence Lounge",
                  th: "ห้องรับรองส่วนกลาง"
                }
              },
              {
                name: {
                  en: "Business Center",
                  th: "Business Center"
                }
              },
              {
                name: {
                  en: "Chef Table & Dining Space",
                  th: "Chef Table & Dining Space"
                }
              },
              {
                name: {
                  en: "Sunken Court with BBQ Terrace",
                  th: "สวนมุมต่ำและลาน BBQ"
                }
              },
              {
                name: {
                  en: "Gym",
                  th: "ฟิตเนส"
                }
              },
              {
                name: {
                  en: "Swimming Pool & Jacuzzi",
                  th: "สระว่ายน้ำและจากุชชี่"
                }
              },
              {
                name: {
                  en: "Sundeck",
                  th: "ดาดฟ้า"
                }
              },
              {
                name: {
                  en: "Sauna",
                  th: "ซาวน่า"
                }
              },
              {
                name: {
                  en: "Children’s Playground",
                  th: "สนามเด็กเล่น"
                }
              },
              {
                name: {
                  en: "Residence Park",
                  th: "สวนขนาดใหญ่"
                }
              },
              {
                name: {
                  en: "1-KM Jogging Track",
                  th: "ทางวิ่งออกกำลังกาย 1 กิโลเมตร"
                }
              },
            ]
          }]
        },
        amenitiesImage: {
          type: String,
          default: ''
        }
      },
      template: `
    <div class="space-y-4">
      <h3 v-if="showActiveTabTitle" class="font-medium text-[20px]">
        {{
          (list.find(item => item.tab === activeTab)?.name?.[language]) || ''
        }}
      </h3>

      <div class="flex lg:flex-row flex-col-reverse gap-5">
        <div :class="{ 'lg:w-1/2': amenitiesImage, 'lg:w-2/3': !amenitiesImage }">
          <!-- วนตามหมวด (มี title ของหมวด + รายการภายใน) -->
          <div v-for="(group, gIndex) in amenities" :key="gIndex" class="mb-4">
            <h4 class="font-medium text-[18px] mb-2 ">
              {{ group.title[language] || group.title.en }}
            </h4>

            <ul class="columns-1 md:columns-2 gap-x-8">
              <li
                v-for="(item, index) in group.items"
                :key="index"
                class="mb-2 break-inside-avoid"
              >
                <p class="flex ">
                  <span class="mr-2">{{ index + 1 }}.</span>
                  <span>{{ item.name[language] || item.name.en }}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div class="lg:w-1/2"
          v-if="amenitiesImage">
          <img v-if="amenitiesImage" :src="amenitiesImage" alt="Amenities" class="w-full h-auto">
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
        services: {
          type: Array,
          default: () => [{
              name: {
                th: "บริการผู้ช่วยส่วนตัว",
                en: "Concierge service"
              }
            },
            {
              name: {
                th: "ระบบรักษาความปลอดภัย 24 ชม.",
                en: "24 hrs. security"
              }
            },
            {
              name: {
                th: "บริการซ่อมบำรุง",
                en: "Maintenance and repair service"
              }
            },
            {
              name: {
                th: "บริการจัดการขยะ",
                en: "Garbage management"
              }
            },
          ]
        },
        serviceImage: {
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
              <div :class="{ 'lg:w-1/2': serviceImage, 'lg:w-2/3': !serviceImage }">
                <ul class="space-y-2">
                  <li v-for="(service, index) in services" :key="index">
                    <span class="mr-2">{{index+1}}.</span><span>{{ service.name[language] }}</span>
                  </li>
                </ul>
              </div>
              <div class="lg:w-1/2"
                v-if="serviceImage"
                >
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
      masterPlan: PlanContent,
      floorPlan: PlanContent,
      unitPlan: PlanContent,
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
        landing_page: "project_the_extro_page",
        section: "project_details",
        event_action: "click",
        button: "download_brochure",
        property_brand: "The EXTRO",
        project_label: "new_project",
        property_type: "condo",
        property_location: "Phayathai-Rangnam ",
        property_price: "STARTS 5.99 MB",
      }
      console.log('download_brochure')
      setDataLayer(tracking);


      // Add download action by creating a temporary link element.
      const brochureUrl = "/assets\/image\/page-siraninn\/Siraninn_E-brochure_revised_lowres%202023_compressed.pdf";
      const link = document.createElement('a');
      link.href = brochureUrl;
      link.download = "Siraninn_E-brochure.pdf";
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
      brochure,
      projectDetailDownloadBrochure
    };
  }
});