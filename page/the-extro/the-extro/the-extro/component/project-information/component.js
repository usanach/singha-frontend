const ProjectInformationComponent = defineComponent({
  name: 'ProjectInformationComponent',
  template: `
    <section  class="onview" :class=[fontClass] id="ProjectInformationComponent" data-section="project_detail">
      <div class="grid grid-rows-1 lg:grid-cols-4 relative min-h-[900px] bg-[#F5F5F1] lg:px-0 px-5">
        <!-- Tab Buttons -->
        <div class="bg-[url('/assets/image/page-the-extro/the-extro/project-information/tab-bg.png')] bg-cover bg-center py-20 h-full lg:block hidden">
          <div class="grid min-w-[240px] w-fit mx-auto">
            <div v-for="item in list" :key="item.tab" class="mb-4 relative">
              <button type="button" @click="activeSection = item.tab">
                <h3 class="text-white text-[24px] transition" :class="activeSection === item.tab ? 'font-bold' : 'font-thin'">
                  {{ item.name[language] }}
                </h3>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Dynamic Content Area -->
        <div class="lg:col-span-3 lg:px-20 pt-10 pb-20">
          <h2 class="lg:text-[70px] text-[50px] text-[#013B5E] lg:text-left text-center leading-none">
            {{ title[language] }}
          </h2>
          <!-- Mobile Tab Buttons Dropdown -->
          <div class="relative lg:hidden block my-5">
            <div>
              <button 
                @click="toggleExpand" 
                type="button" 
                class="bg-[url('/assets/image/page-the-extro/the-extro/project-information/tab-bg.png')] bg-cover bg-center px-5 text-center w-full lg:py-3 py-2 text-white lg:text-[24px] text-[18px]">
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
                class="border border-1 py-2 px-3 border-black lg:w-auto w-full max-w-[200px] block">
                <div class="flex gap-2">
                    <span><img src="/assets/icon/pdf.svg" alt="" class="w-[30px]"></span>
                    <span class="my-auto mx-auto">
                        ดาวน์โหลดโบรชัวร์
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
                  <img :src="image.url" alt="Gallery Image" class="h-[80%] m-auto" />
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
              area: { th: "2-0-71 ไร่", en: "2-0-71 Rai" },
              type: { th: "1 อาคาร 33 ชั้น", en: "33-Storey condominium" },
              unit: { th: "411 ยูนิต", en: "411 units" },
              parking: { th: "232 คัน", en: "232 cars" }
            },
            {
              // Room type and size details
              title: { th: "ประเภทและขนาดห้อง", en: "Room type and size" },
              data: [
                {
                  "1 ห้องนอน เฟล็กซี่": { th: "31.25 ตร.ม.", en: "31.25 sq.m." },
                  "1 ห้องนอน": { th: "34.5-35 ตร.ม.", en: "34.5 – 35 sq.m." },
                  "2 ห้องนอน": { th: "48.25-64 ตร.ม.", en: "48.25 – 64 sq.m." },
                  "2 ห้องนอน พลัส": { th: "70.75-71 ตร.ม.", en: "70.75 – 71 sq.m." },
                  "2 ห้องนอน ดูเพล็กซ์": { th: "82.5-111.75 ตร.ม.", en: "82.5 – 111.75 sq.m." }
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
    

    const MasterPlanContent = {
      props: ['title', 'language', 'list', 'openBigImage', 'activeTab'],
      data() {
        return {
          dataset: [
            {
              name: { en: "Master Plan", th: "มาสเตอร์แพลน" },
              images: [
                { url: '/assets/image/page-the-extro/the-extro/project-information/master-plan-1.png' },
              ]
            },
            {
              name: { en: "1 Bedroom Flexi 1A-1", th: "1 Bedroom Flexi 1A-1" },
              images: [
                { url: '/assets/image/page-the-extro/the-extro/project-information/1-bed-room-flex-1a-1.png' },
              ]
            },
            {
              name: { en: "B1 Basement", th: "B1 Basement" },
              images: [
                { url: '/assets/image/page-the-extro/the-extro/project-information/b1-base.png' }
              ]
            }
          ],
          selectedOption: null,
          isDropdownOpen: false
        };
      },
      created() {
        // Initialize selectedOption based on the initial activeTab
        this.updateActivePlan(this.activeTab);
      },
      watch: {
        // Whenever the activeTab changes, update the selected option accordingly
        activeTab(newVal) {
          this.updateActivePlan(newVal);
        }
      },
      methods: {
        toggleDropdown() {
          this.isDropdownOpen = !this.isDropdownOpen;
        },
        selectOption(option) {
          this.selectedOption = option;
          this.isDropdownOpen = false;
          // Emit an event to update the parent's active section based on the selected option
          if (option.name.en === "1 Bedroom Flexi 1A-1") {
            this.$emit('updateActiveSection', 'floorPlan');
          } else if (option.name.en === "B1 Basement") {
            this.$emit('updateActiveSection', 'unitPlan');
          } else {
            this.$emit('updateActiveSection', 'masterPlan');
          }
        },
        updateActivePlan(tab) {
          if (tab === 'masterPlan') {
            this.selectedOption = this.dataset.find(option => option.name.en === "Master Plan");
          } else if (tab === 'floorPlan') {
            this.selectedOption = this.dataset.find(option => option.name.en === "1 Bedroom Flexi 1A-1");
          } else if (tab === 'unitPlan') {
            this.selectedOption = this.dataset.find(option => option.name.en === "B1 Basement");
          }
        }
      },
      template: `
        <div class="space-y-5">
          <div class="flex justify-between md:flex-row flex-col lg:w-3/4 w-full">
            <div>
              <!-- The header text now reflects the active tab from the parent -->
              <h3 class="font-medium text-[20px]">
                {{ list.find(item => item.tab === activeTab).name[language] }}
              </h3>
            </div>
            <div class="relative border border-l-0 border-r-0 border-t-0">
              <button type="button" @click="toggleDropdown" class="flex justify-between min-w-[210px]">
                <p>{{ selectedOption.name[language] }}</p>
                <span class="my-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13.114" height="7.498" viewBox="0 0 13.114 7.498">
                    <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down" d="M12.747,16.484l4.958-4.962a.933.933,0,0,1,1.324,0,.945.945,0,0,1,0,1.327L13.41,18.471a.935.935,0,0,1-1.292.027L6.461,12.853a.937.937,0,0,1,1.324-1.327Z" transform="translate(-6.188 -11.247)" fill="#000"></path>
                  </svg>
                </span>
              </button>
              <div v-if="isDropdownOpen" class="absolute left-0 top-full w-full border bg-white">
                <div 
                  v-for="option in dataset" 
                  :key="option.name.en" 
                  class="px-5 py-2 hover:bg-gray-100 cursor-pointer" 
                  @click="selectOption(option)">
                  <p>{{ option.name[language] }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:w-3/4 w-full">
            <div class="border col-span-3 bg-cover bg-center">
              <img :src="selectedOption.images[0].url" />
            </div>
            <button type="button" class="flex gap-4 justify-end ml-auto mt-5" @click="openBigImage('masterPlan', selectedOption.images)">
              <p>คลิกเพื่อดูภาพใหญ่</p>
              <div class="my-auto">
                <img src="/assets/icon/maximize.svg" alt="">
              </div>
            </button>
          </div>
        </div>
      `
    };
    const AmenitiesContent = {
      props: {
        title: { type: Object, required: true },
        language: { type: String, required: true },
        list: { type: Array, required: true },
        activeTab: { type: String, required: true },
        amenities: {
          type: Array,
          default: () => [
            { name: { th: "ล็อบบี้เพดานสูง", en: "High-ceiling lobby" } },
            { name: { th: "ห้องจดหมาย", en: "Mailroom" } },
            { name: { th: "โถงรับรองภายนอก", en: "Outdoor reception area" } },
            { name: { th: "สนามซ้อมวิ่ง", en: "Jogging track" } },
            { name: { th: "พื้นที่สวน, สวนลอยฟ้า", en: "Garden area, Sky garden" } },
            { name: { th: "ห้องทำงานเอนกประสงค์", en: "Multi-purpose workspace" } },
            { name: { th: "ห้องประชุม", en: "Meeting room หรือ Conference facilities" } },
            { name: { th: "สระว่ายน้ำ", en: "Swimming pool" } },
            { name: { th: "ห้องออกกำลังกาย", en: "Fitness center หรือ S Gym" } },
            { name: { th: "ห้องอบไอน้ำ", en: "Steam room" } },
            { name: { th: "พื้นที่นั่งพักผ่อน", en: "Lounge area หรือ Communal lounge" } },
            { name: { th: "สกายเลาจ์", en: "Sky lounge" } },
            { name: { th: "ห้องออกกำลังกายแบบ Challenging gym", en: "Fitness center หรือ Advanced fitness studio" } }
          ]
        },
        amenitiesImage: {
          type: String,
          default: '/assets/image/page-the-extro/the-extro/project-information/Amenities.png'
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
                  <li v-for="(amenity, index) in amenities" :key="index">
                    - {{ amenity.name[language] }}
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
            { name: { th: "บริการเจ้าหน้าที่รักษาความปลอดภัยตลอด 24 ชั่วโมง", en: "24-hour security by guard service" } },
            { name: { th: "บริการอินเทอร์เน็ตไร้สาย (Wi-Fi) ในพื้นที่ส่วนกลาง", en: "WIFI Internet in public area" } }
          ]
        },
        serviceImage: {
          type: String,
          default: '/assets/image/page-the-extro/the-extro/project-information/Amenities.png'
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
            <div class="flex lg:flex-col flex-col-reverse gap-5">
              <div class="lg:w-1/2">
                <ul class="space-y-2">
                  <li v-for="(service, index) in amenities" :key="index">
                    - {{ service.name[language] }}
                  </li>
                </ul>
              </div>
              <div class="w-full">
                <img :src="serviceImage" alt="">
              </div>
            </div>
          </div>
        </div>
      `
    };
    

    const sectionComponents = {
      projectDetails: ProjectDetailsContent,
      masterPlan: MasterPlanContent,
      floorPlan: MasterPlanContent, // now uses MasterPlanContent
      unitPlan: MasterPlanContent,  // now uses MasterPlanContent
      Amenities: AmenitiesContent,
      Services: ServicesContent
    };

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
      return language.value === 'en' ? "font-['IBM_Plex_Sans_Thai']" : "font-['Gotham']";
    };
    onMounted(() => {
      language.value = getLanguageFromPath();
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
      fontClass
    };
  }
});
