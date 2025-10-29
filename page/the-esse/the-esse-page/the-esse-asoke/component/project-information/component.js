const ProjectInformationComponent = defineComponent({
  name: 'ProjectInformationComponent',
  template: `
    <section  class="onview font-['IBM_Plex_Sans_Thai']" :src="{fontClass}" id="project_detail" data-section="project_detail">
      <div class="grid grid-rows-1 lg:grid-cols-4 relative min-h-[900px] bg-[#F5F5F1] lg:px-0 px-5">
        <!-- Tab Buttons -->
        <div class="bg-[#83714F] bg-cover bg-center py-20 h-full lg:block hidden">
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
                class="project-detail-button-listM bg-[#83714F] bg-cover bg-center px-5 text-center w-full lg:py-3 py-2 text-white lg:text-[24px] text-[18px]">
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
    const brochureUrl = ref("");
    const title = ref({
      en: 'Project Information',
      th: 'ข้อมูลโครงการ'
    });

    const list = ref([
      {
        tab: 'projectDetails',
        name: { en: 'Project Details', th: 'รายละเอียดโครงการ' }
      },
      {
        tab: 'masterPlan',
        name: { en: 'Master Plan', th: 'มาสเตอร์แพลน' }
      },
      {
        tab: 'floorPlan',
        name: { en: 'Floor Plan', th: 'ฟลอร์แพลน' }
      },
      {
        tab: 'unitPlan',
        name: { en: 'Unit Plan', th: 'ยูนิตแพลน' }
      },
      {
        tab: 'Amenities',
        name: { en: 'Amenities', th: 'สิ่งอำนวยความสะดวก' }
      },
      {
        tab: 'Services',
        name: { en: 'Services', th: 'บริการ' }
      }
    ]);

    // --- Child Components ---
    const ProjectDetailsContent = {
      props: ['title', 'language', 'list'],
      data() {
        return {
          dataset: [
            {
              // Project basic details
              area: { th: "2-2-73.7 ไร่", en: "2-2-72.7 Rai" },
              type: { th: "1 อาคาร 55 ชั้น", en: "55-Storey condominium" },
              unit: { th: "419 ยูนิต", en: "419 units" }
            },
            {
              // Room type and size details
              title: { th: "ประเภทและขนาดห้อง", en: "Room type and size" },
              data: [
                {
                  name: { th: "1 ห้องนอน 1 ห้องน้ำ", en: "1 Bedroom 1 Bathroom" },
                  size: { th: "37.00 – 53.00 ตร.ม.", en: "37.00 – 53.00 sq.m." }
                },
                {
                  name: { th: "2 ห้องนอน 2 ห้องน้ำ", en: "2 Bedrooms 2 Bathrooms" },
                  size: { th: "75.50 – 84.00 ตร.ม.", en: "75.50 – 84.00 sq.m." }
                },
                {
                  name: { th: "เพนท์เฮาส์", en: "Penthouses" },
                  size: { th: "104.50 – 195.50 ตร.ม.", en: "104.50 – 195.50 sq.m." }
                }
              ]
            }
          ]
        };
      },
      computed: {
        activeListName() {
          const activeItem = this.list.find(item => item.tab === 'projectDetails');
          return activeItem
            ? activeItem.name[this.language]
            : (this.language === 'th' ? 'รายละเอียดโครงการ' : 'Project Details');
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

      <!-- Basic details -->
      <div class="grid grid-cols-2 gap-5 lg:w-1/2 ">
        <template v-for="(value, key) in dataset[0]" :key="key">
          <p class="font-normal">{{ formatKey(key) }} :</p>
          <p class="text-right">{{ getValue(value) }}</p>
        </template>
      </div>

      <!-- Room type & size -->
      <div v-for="(item, index) in dataset.slice(1)" :key="index" class="pt-5">
        <h3 class="font-medium text-[20px]">{{ item.title[language] }}</h3>
        <div class="grid grid-cols-2 gap-5 lg:w-1/2 mt-5">
          <template v-for="(rt, i) in item.data" :key="i">
            <p class="font-normal text-nowrap">{{ rt.name[language] }} :</p>
            <p class="text-right">{{ rt.size[language] }}</p>
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
          dataset: [
            {
              tab: 'masterPlan',
              name: { en: 'Ground Floor Plan', th: 'มาสเตอร์แพลน' },
              images: [
                {
                  key: 'masterPlan-1',
                  name: { en: 'Ground Floor Plan', th: 'Ground Floor Plan' },
                  url: '/assets\/image\/page-the-esse-asoke\/information\/masterplan\/s_4865146.jpg'
                }
              ]
            }, {
              tab: 'floorPlan',
              name: { en: 'FloorPlan', th: 'FloorPlan' },
              images: [
                {
                  key: '1st-basement',
                  name: { en: '1st Basement', th: '1st Basement' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/1st-basement.jpg'
                },
                {
                  key: '2nd-basement',
                  name: { en: '2nd Basement', th: '2nd Basement' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/2nd-basement.jpg'
                },
                {
                  key: 'ground',
                  name: { en: 'Ground', th: 'Ground' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/ground.jpg'
                },
                {
                  key: '1st-mezzanine',
                  name: { en: '1st Mezzanine', th: '1st Mezzanine' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/1st-mezzanine.jpg'
                },
                {
                  key: '2nd',
                  name: { en: '2nd', th: '2nd' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/2nd.jpg'
                },
                {
                  key: '3rd',
                  name: { en: '3rd', th: '3rd' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/3rd.jpg'
                },
                {
                  key: '4th-8th',
                  name: { en: '4th 8th', th: '4th 8th' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/4th-8th.jpg'
                },
                {
                  key: '9th',
                  name: { en: '9th', th: '9th' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/9th.jpg'
                },
                {
                  key: '10th',
                  name: { en: '10th', th: '10th' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/10th.jpg'
                },
                {
                  key: '11th-32nd',
                  name: { en: '11th 32nd', th: '11th 32nd' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/11th-32nd.jpg'
                },
                {
                  key: '33rd',
                  name: { en: '33rd', th: '33rd' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/33rd.jpg'
                },
                {
                  key: '34th',
                  name: { en: '34th', th: '34th' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/34th.jpg'
                },
                {
                  key: '35th-42nd',
                  name: { en: '35th 42nd', th: '35th 42nd' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/35th-42nd.jpg'
                },
                {
                  key: '43rd',
                  name: { en: '43rd', th: '43rd' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/43rd.jpg'
                },
                {
                  key: '44th-50th',
                  name: { en: '44th 50th', th: '44th 50th' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/44th-50th.jpg'
                },
                {
                  key: '51st',
                  name: { en: '51st', th: '51st' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/51st.jpg'
                },
                {
                  key: '52nd',
                  name: { en: '52nd', th: '52nd' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/52nd.jpg'
                },
                {
                  key: '53rd',
                  name: { en: '53rd', th: '53rd' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/53rd.jpg'
                },
                {
                  key: '54th',
                  name: { en: '54th', th: '54th' },
                  url: '/assets/image/page-the-esse-asoke/information/floorplan/54th.jpg'
                }
              ]
            }, {
              tab: 'unitPlan',
              name: { en: 'UnitPlan', th: 'UnitPlan' },
              images: [
                {
                  key: '1b-1',
                  name: { en: '1B 1', th: '1B 1' },
                  url: '/assets/image/page-the-esse-asoke/information/unitplan/1b-1.jpg'
                },
                {
                  key: '1b-2',
                  name: { en: '1B 2', th: '1B 2' },
                  url: '/assets/image/page-the-esse-asoke/information/unitplan/1b-2.jpg'
                },
                {
                  key: '1b-3',
                  name: { en: '1B 3', th: '1B 3' },
                  url: '/assets/image/page-the-esse-asoke/information/unitplan/1b-3.jpg'
                },
                {
                  key: '1b-4',
                  name: { en: '1B 4', th: '1B 4' },
                  url: '/assets/image/page-the-esse-asoke/information/unitplan/1b-4.jpg'
                },
                {
                  key: '2b-1',
                  name: { en: '2B 1', th: '2B 1' },
                  url: '/assets/image/page-the-esse-asoke/information/unitplan/2b-1.jpg'
                },
                {
                  key: '2b-2',
                  name: { en: '2B 2', th: '2B 2' },
                  url: '/assets/image/page-the-esse-asoke/information/unitplan/2b-2.jpg'
                }
              ]
            }
          ],
          selectedOption: null,
          isDropdownOpen: false,
          viewFullImageText: {en:'View full size',th:'คลิกเพื่อดูภาพใหญ่'}
        }
      },
      computed: {
        // เอาเฉพาะชุด images ของ tab ปัจจุบัน แล้ว map ให้มี key, url, name
        options() {
          const plan = this.dataset.find(o => o.tab === this.activeTab)
          return plan
            ? plan.images.map(img => ({
              key: img.key,
              url: img.url,
              name: img.name
            }))
            : []
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
    }

    const AmenitiesContent = {
      props: {
        title: { type: Object, required: true },
        language: { type: String, required: true },
        list: { type: Array, required: true },
        activeTab: { type: String, required: true },
        amenities: {
          type: Array,
          default: () => [
            { name: { th: "สวนและลานกลางแจ้ง THE ESSE 1,000 ตร.ม.", en: "THE ESSE Garden & Courtyard 1,000 sqm." } },
            { name: { th: "ล็อกเกอร์สำหรับอุปกรณ์เสริมซูเปอร์ไบค์ และที่เก็บกระเป๋ากอล์ฟ ส่วนกลาง", en: "Locker For Superbike Accessories, Central Storage For Golf Bag Suitcase" } },
            { name: { th: "ลานประติมากรรม", en: "Sculpture Court" } },
            { name: { th: "สระว่ายน้ำ พร้อมสระเด็ก สระว่ายน้ำออกกำลังกาย และจากุซซี่", en: "Sky Panoramic Pool with Kids Pool, Lap Pool and Jacuzzi" } },
            { name: { th: "ฟิตเนสลอยฟ้าและสนามกอล์ฟจำลอง", en: "Sky Gym and Golf Simulator" } },
            { name: { th: "เลานจ์ THE ESSE", en: "THE ESSE Residence Lounge" } },
            { name: { th: "ห้องอ่านหนังสือ Business Center และห้องประชุม (ขนาดเล็ก กลาง และใหญ่)", en: "Reading Chamber, Business Center and Board Room (Size S, M, L)" } },
            { name: { th: "จุดชมวิวบนดาดฟ้า", en: "Skyscraper Deck" } }
          ]
        }
        ,
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
                    <p class="flex my-1">
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
        title: { type: Object, required: true },
        language: { type: String, required: true },
        list: { type: Array, required: true },
        activeTab: { type: String, required: true },
        amenities: {
          type: Array,
          default: () => [
            {
              name: {
                th: "บริการเจ้าหน้าที่รักษาความปลอดภัยตลอด 24 ชั่วโมง",
                en: "24-hour security by guard service"
              }
            },
            {
              name: {
                th: "บริการอินเทอร์เน็ตไร้สาย (Wi-Fi) ในพื้นที่ส่วนกลาง",
                en: "WIFI Internet in public area on facilities areas"
              }
            }
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
      masterPlan: PlanContent,
      floorPlan: PlanContent,
      unitPlan: PlanContent,
      Amenities: AmenitiesContent,
      Services: ServicesContent
    }
    const toggleExpand = () => { isExpanded.value = !isExpanded.value; };
    const selectTab = (tab) => { activeSection.value = tab; isExpanded.value = false; };
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


    const closeMaximizeModal = () => { isModalVisible.value = false; };

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
      // const link = document.createElement('a');
      // link.href = brochureUrl.value;
      // link.download = "THE_ESSE_SUKHUMVIT_36_E-BROCHURE.pdf";
      // link.click();
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
      fontClass, brochure,brochureUrl,
      projectDetailDownloadBrochure
    };
  }
});
