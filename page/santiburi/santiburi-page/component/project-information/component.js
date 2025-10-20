const ProjectInformationComponent = defineComponent({
  name: 'ProjectInformationComponent',
  template: `
    <section  class="onview font-['IBM_Plex_Sans_Thai']" :src="{fontClass}" id="project_detail" data-section="project_detail">
      <div class="grid grid-rows-1 lg:grid-cols-4 relative min-h-[900px] bg-[#fff] lg:px-0 px-5">
        <!-- Tab Buttons -->
        <div class="bg-[#fff] bg-cover bg-center py-20 h-full lg:block hidden">
          <div class="grid min-w-[240px] w-fit mx-auto">
            <div v-for="item in list" :key="item.tab" class="mb-4 relative">
              <button type="button" @click="activeSection = item.tab" class="project-detail-button-list" :data-name="activeSection">
                <h3 class="text-[24px] transition" :class="activeSection === item.tab ? 'font-bold' : 'font-thin'">
                  {{ item.name[language] }}
                </h3>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Dynamic Content Area -->
        <div class="lg:col-span-3 lg:px-20 pt-10 pb-20 lg:bg-[#451E24] bg-white">
          <h2 :style="{fontFamily:'DB Heavent'}" class="lg:text-[70px] text-[50px] lg:text-left text-center leading-none font-normal lg:text-white">
            {{ title[language] }}
          </h2>
          <!-- Mobile Tab Buttons Dropdown -->
          <div class="relative lg:hidden block my-5">
            <div>
              <button 
                @click="toggleExpand" 
                type="button" 
                :data-name="activeListName()"
                class="project-detail-button-listM bg-[#451E24] bg-cover bg-center px-5 text-center w-full lg:py-3 py-2 text-white lg:text-[24px] text-[18px]">
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
          <div class="mt-20 hidden">
            <button type="button" @click="projectDetailDownloadBrochure"
                class="border border-1 py-2 px-3 border-black lg:border-white lg:w-auto w-full block">
                <div class="flex gap-2">
              
                    <span class="lg:hidden block"><img src="/assets/icon/pdf.svg" alt="" class="w-[30px]"></span>
                    <span class="lg:block hidden">
                        <svg id="Group_476" data-name="Group 476" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="29.517" height="31.323" viewBox="0 0 29.517 31.323">
                          <defs>
                            <clipPath id="clip-path">
                              <rect id="Rectangle_231" data-name="Rectangle 231" width="29.517" height="31.323" fill="#fff"/>
                            </clipPath>
                          </defs>
                          <g id="Group_160" data-name="Group 160" transform="translate(0 0)" clip-path="url(#clip-path)">
                            <path id="Path_111" data-name="Path 111" d="M29.341,8.346a2.3,2.3,0,0,0-.5-.749L21.924.681A2.308,2.308,0,0,0,20.292,0H7.87a2,2,0,0,0-2,2V11.6H1.946A1.945,1.945,0,0,0,0,13.545v8.391a1.945,1.945,0,0,0,1.946,1.945H5.87v5.447a2,2,0,0,0,2,2H27.517a2,2,0,0,0,2-2V9.23a2.3,2.3,0,0,0-.176-.883M21.539,1.7l6.282,6.282H22.433a.894.894,0,0,1-.893-.893ZM1.946,22.888a.953.953,0,0,1-.952-.952V13.545a.953.953,0,0,1,.952-.952h14.3a.953.953,0,0,1,.952.952v8.391a.953.953,0,0,1-.952.952H1.946Zm26.578,6.44a1.007,1.007,0,0,1-1.006,1.006H7.87a1.007,1.007,0,0,1-1.006-1.006V23.882h9.381a1.945,1.945,0,0,0,1.945-1.945V13.545A1.945,1.945,0,0,0,16.245,11.6H6.864V2A1.007,1.007,0,0,1,7.87,1H20.292a1.322,1.322,0,0,1,.254.024V7.089a1.889,1.889,0,0,0,1.887,1.887H28.5a1.32,1.32,0,0,1,.024.254Z" transform="translate(0 -0.005)" fill="#fff"/>
                            <path id="Path_112" data-name="Path 112" d="M202.625,1294.95a6.056,6.056,0,0,0-1.235-.077h-1.666v5.143h1.038v-1.94h.677a5.932,5.932,0,0,0,1.077-.074,1.51,1.51,0,0,0,.538-.244,1.411,1.411,0,0,0,.437-.507,1.679,1.679,0,0,0,.172-.8,1.6,1.6,0,0,0-.3-1,1.348,1.348,0,0,0-.74-.5m-.149,1.919a.68.68,0,0,1-.324.253,2.684,2.684,0,0,1-.821.081h-.568v-1.459h.5a4.975,4.975,0,0,1,.747.035.717.717,0,0,1,.417.228.665.665,0,0,1,.165.463.69.69,0,0,1-.118.4" transform="translate(-197.385 -1279.709)" fill="#fff"/>
                            <path id="Path_113" data-name="Path 113" d="M611.459,1299.907a1.827,1.827,0,0,0,.73-.411,2.268,2.268,0,0,0,.551-.908,3.38,3.38,0,0,0,.158-1.095,3.792,3.792,0,0,0-.168-1.215,2.246,2.246,0,0,0-.491-.833,1.721,1.721,0,0,0-.775-.474,3.71,3.71,0,0,0-.979-.1h-1.9v5.143h1.954a3.145,3.145,0,0,0,.919-.109m-1.835-.758v-3.406h.467a4.717,4.717,0,0,1,.852.049.987.987,0,0,1,.48.242,1.177,1.177,0,0,1,.295.5,3.076,3.076,0,0,1,.105.916,3.36,3.36,0,0,1-.105.942,1.088,1.088,0,0,1-.272.5.958.958,0,0,1-.419.214,2.837,2.837,0,0,1-.628.049Z" transform="translate(-601.459 -1279.709)" fill="#fff"/>
                            <path id="Path_114" data-name="Path 114" d="M1053.531,1297.83h2.147v-.87h-2.147v-1.217h2.487v-.87h-3.526v5.143h1.038Z" transform="translate(-1040.167 -1279.709)" fill="#fff"/>
                          </g>
                        </svg>
                    </span>
                    <span class="my-auto mx-auto lg:text-white">
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

    const list = ref([
      {
        tab: 'projectDetails',
        name: { en: 'Project Details', th: 'รายละเอียดโครงการ' }
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
              area: { th: "45-2-90.4 ไร่", en: "45-2-90.4 Rai" },
              type: { th: "บ้านเดี่ยว", en: "Detached house" },
              unit: { th: "25 ยูนิต", en: "25 Units" }
            },
            {
              title: { th: "ประเภทและขนาดบ้าน", en: "House Types and Sizes" },
              data: [
                {
                  "THE RESIDENCE I": { th: "1,437 ตร.ม.", en: "1,437 sq.m." },
                  "THE RESIDENCE II": { th: "1,366 ตร.ม.", en: "1,366 sq.m." },
                  "THE RESIDENCE III": { th: "1,455 ตร.ม.", en: "1,455 sq.m." }
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
          <h3 class="font-medium text-[20px] lg:text-white">
            {{ activeListName }}
          </h3>
          <div class="grid grid-cols-2 gap-5 lg:w-1/2 ">
            <template v-for="(value, key) in dataset[0]" :key="key">
              <p class="font-normal lg:text-white">{{ formatKey(key) }} :</p>
              <p class="text-right lg:text-white">{{ getValue(value) }}</p>
            </template>
          </div>
          <div v-for="(item, index) in dataset.slice(1)" :key="index" class="pt-5">
            <h3 class="font-medium text-[20px] lg:text-white">{{ item.title[this.language] }}</h3>
            <div class="grid grid-cols-2 gap-5 lg:w-1/2 mt-5">
              <template v-for="(value, key) in item.data[0]" :key="key">
                <p class="font-normal lg:text-white">{{ key }} :</p>
                <p class="text-right lg:text-white">{{ getValue(value) }}</p>
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
                // {
                //   key: 'masterPlan-1',
                //   name: { en: 'Ground Floor Plan', th: 'Ground Floor Plan' },
                //   url: '/assets\/image\/page-the-esse-36\/information\/s_7440060.jpg'
                // }
              ]
            },
            {
              tab: 'floorPlan',
              name: { en: 'FloorPlan', th: 'FloorPlan' },
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
              name: { en: 'UnitPlan', th: 'UnitPlan' },
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
        <h3 class="font-medium text-[20px] lg:text-white">{{ headerName }}</h3>

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
    }// AmenitiesContent (อัปเดต template ให้ตรงกับ data และแสดง title)
    const AmenitiesContent = {
      props: {
        title: { type: Object, required: true },        // { th: '', en: '' }
        language: { type: String, required: true },     // 'th' | 'en'
        list: { type: Array, required: true },          // [{ tab, name: {th,en} }, ...]
        activeTab: { type: String, required: true },    // tab key
        showActiveTabTitle: { type: Boolean, default: true },
        amenities: {
          type: Array,
          default: () => [
            {
              title: { en: "", th: "" },
              items: [
                { name: { en: "Clubhouse", th: "คลับเฮ้าส์" } },
                { name: { en: "Swimming Pool", th: "สระว่ายน้ำ" } },
                { name: { en: "Lounge", th: "เล้าจน์" } },
                { name: { en: "Chef Table & Dining Space", th: "Chef Table & Dining Space" } },
                { name: { en: "S Gym and Private Exercise Room", th: "S Gym และห้องออกกำลังกายส่วนตัว" } },
              ]
            }
          ]
        },
        amenitiesImage: {
          type: String,
          default: ''
        }
      },
      template: `
    <div class="space-y-4">
      <h3 v-if="showActiveTabTitle" class="font-medium text-[20px]  lg:text-white">
        {{
          (list.find(item => item.tab === activeTab)?.name?.[language]) || ''
        }}
      </h3>

      <div class="flex lg:flex-row flex-col-reverse gap-5">
        <div :class="{ 'lg:w-1/2': amenitiesImage, 'lg:w-2/3': !amenitiesImage }">
          <!-- วนตามหมวด (มี title ของหมวด + รายการภายใน) -->
          <div v-for="(group, gIndex) in amenities" :key="gIndex" class="mb-4">
            <h4 class="font-medium text-[18px] mb-2  lg:text-white">
              {{ group.title[language] || group.title.en }}
            </h4>

            <ul class="columns-1 md:columns-2 gap-x-8">
              <li
                v-for="(item, index) in group.items"
                :key="index"
                class="mb-2 break-inside-avoid"
              >
                <p class="flex lg:text-white">
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
        title: { type: Object, required: true },
        language: { type: String, required: true },
        list: { type: Array, required: true },
        activeTab: { type: String, required: true },
        services: {
          type: Array,
          default: () => [
            { name: { th: "บริการผู้ช่วยส่วนตัว", en: "Concierge service" } },
            { name: { th: "ระบบรักษาความปลอดภัย 24 ชม.", en: "24 hrs. security" } },
            { name: { th: "บริการซ่อมบำรุง", en: "Maintenance and repair service" } },
            { name: { th: "บริการจัดการขยะ", en: "Garbage management" } },
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
              <h3 class="font-medium text-[20px] lg:text-white">
                {{ list.find(item => item.tab === activeTab).name[language] }}
              </h3>
            </div>
            <div class="flex lg:flex-row flex-col-reverse gap-5">
              <div :class="{ 'lg:w-1/2': serviceImage, 'lg:w-2/3': !serviceImage }">
                <ul class="space-y-2 lg:text-white">
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
      const brochureUrl = "/assets\/image\/page-the-extro\/THE_EXTRO_E-BROCHURE.pdf";
      const link = document.createElement('a');
      link.href = brochureUrl;
      link.download = "THE_EXTRO_E-BROCHURE.pdf";
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
      fontClass, brochure,
      projectDetailDownloadBrochure
    };
  }
});
