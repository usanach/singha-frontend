const ProjectInformationComponent = defineComponent({
  name: 'ProjectInformationComponent',
  template: `
    <section  class="onview font-['IBM_Plex_Sans_Thai']" :src="{fontClass}" id="project_detail" data-section="project_detail">
      <div class="grid grid-rows-1 lg:grid-cols-4 relative min-h-[900px] bg-[#F5F5F1] lg:px-0 px-5">
        <!-- Tab Buttons -->
        <div class="bg-[#182A44] bg-cover bg-center py-20 h-full lg:block hidden">
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
                class="project-detail-button-listM bg-[#182A44] bg-cover bg-center px-5 text-center w-full lg:py-3 py-2 text-white lg:text-[24px] text-[18px]">
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

    const list = ref([
      {
        tab: 'projectDetails',
        name: { en: 'Project Details', th: 'รายละเอียดโครงการ' }
      },
      // {
      //   tab: 'masterPlan',
      //   name: { en: 'Master Plan', th: 'มาสเตอร์แพลน' }
      // },
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
              area: { th: "2-0-98.2 ไร่", en: "2-0-98.2 Rai" },
              type: { th: "1 อาคาร 39 ชั้น", en: "39-Storey condominium" },
              unit: { th: "319 ยูนิต", en: "319 units" },
              // parking: { th: "232 คัน", en: "232 cars" }
            },
            {
              // Room type and size details
              title: { th: "ประเภทและขนาดห้อง", en: "Room type and size" },
              data: [
                {
                  name: { th: "1 ห้องนอน 1 ห้องน้ำ", en: "1 Bedroom 1 Bathroom" },
                  size: { th: "34.75 – 47.75 ตร.ม.", en: "34.75 – 47.75 sq.m." }
                },
                {
                  name: { th: "2 ห้องนอน 2 ห้องน้ำ", en: "2 Bedrooms 2 Bathrooms" },
                  size: { th: "70.00 – 77.00 ตร.ม.", en: "70.00 – 77.00 sq.m." }
                },
                {
                  name: { th: "เพนท์เฮาส์", en: "Penthouses" },
                  size: { th: "215.50 ตร.ม.", en: "215.50 sq.m." }
                }
              ]
            }
          ]
        };
      },
      computed: {
        activeListName() {
          const activeItem = this.list?.find?.(item => item.tab === 'projectDetails');
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
      <div class="grid grid-cols-2 gap-5 lg:w-1/2">
        <template v-for="(value, key) in dataset[0]" :key="key">
          <p class="font-normal" v-if="typeof value !== 'function'">{{ formatKey(key) }} :</p>
          <p class="text-right" v-if="typeof value !== 'function'">{{ getValue(value) }}</p>
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
                  text: 'Coming Soon...'
                }
              ]
            },
            {
              tab: 'floorPlan',
              name: { en: 'FloorPlan', th: 'FloorPlan' }, images: [
                {
                  key: 'floorPlan-1',
                  name: { en: '1st', th: '1st' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/1st.jpg'
                },
                {
                  key: 'floorPlan-2',
                  name: { en: '2nd', th: '2nd' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/2nd.jpg'
                },
                {
                  key: 'floorPlan-3',
                  name: { en: '3rd - 6th', th: '3rd - 6th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/3th-6th.jpg'
                },
                {
                  key: 'floorPlan-4',
                  name: { en: '7th', th: '7th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/7th.jpg'
                },
                {
                  key: 'floorPlan-5',
                  name: { en: '8th', th: '8th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/8th.jpg'
                },
                {
                  key: 'floorPlan-6',
                  name: { en: '9th - 10th', th: '9th - 10th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/9th-10th.jpg'
                },
                {
                  key: 'floorPlan-7',
                  name: { en: '11th', th: '11th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/11th.jpg'
                },
                {
                  key: 'floorPlan-8',
                  name: { en: '12th - 13th', th: '12th - 13th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/12th-13th.jpg'
                },
                {
                  key: 'floorPlan-9',
                  name: { en: '14th', th: '14th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/14th.jpg'
                },
                {
                  key: 'floorPlan-10',
                  name: { en: '15th - 16th', th: '15th - 16th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/15th-16th.jpg'
                },
                {
                  key: 'floorPlan-11',
                  name: { en: '17th', th: '17th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/17th.jpg'
                },
                {
                  key: 'floorPlan-12',
                  name: { en: '18th - 19th', th: '18th - 19th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/18th-19th.jpg'
                },
                {
                  key: 'floorPlan-13',
                  name: { en: '20th', th: '20th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/20th.jpg'
                },
                {
                  key: 'floorPlan-14',
                  name: { en: '21st - 22nd', th: '21st - 22nd' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/21st-22nd.jpg'
                },
                {
                  key: 'floorPlan-15',
                  name: { en: '23rd', th: '23rd' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/23th.jpg'
                },
                {
                  key: 'floorPlan-16',
                  name: { en: '24th - 25th', th: '24th - 25th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/24th-25th.jpg'
                },
                {
                  key: 'floorPlan-17',
                  name: { en: '26th', th: '26th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/26th.jpg'
                },
                {
                  key: 'floorPlan-18',
                  name: { en: '27th - 28th', th: '27th - 28th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/27th-28th.jpg'
                },
                {
                  key: 'floorPlan-19',
                  name: { en: '29th', th: '29th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/29th.jpg'
                },
                {
                  key: 'floorPlan-20',
                  name: { en: '32nd', th: '32nd' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/32nd.jpg'
                },
                {
                  key: 'floorPlan-21',
                  name: { en: '36th', th: '36th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/36th.jpg'
                },
                {
                  key: 'floorPlan-22',
                  name: { en: '37th', th: '37th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/37th.jpg'
                },
                {
                  key: 'floorPlan-23',
                  name: { en: '38th - 39th', th: '38th - 39th' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/38th-39th.jpg'
                },
                {
                  key: 'floorPlan-24',
                  name: { en: 'Ground', th: 'Ground' },
                  url: '/assets/image/page-the-esse-complex/information/floorPlan/ground.jpg'
                }
              ]
            },
            {
              tab: 'unitPlan',
              name: { en: 'UnitPlan', th: 'UnitPlan' }, images: [
                {
                  key: 'unitPlan-1',
                  name: { en: '1A - 1', th: '1A - 1' },
                  url: '/assets/image/page-the-esse-complex/information/unitPlan/1a-1.jpg'
                },
                {
                  key: 'unitPlan-2',
                  name: { en: '1A - 1A', th: '1A - 1A' },
                  url: '/assets/image/page-the-esse-complex/information/unitPlan/1a-1a.jpg'
                },
                {
                  key: 'unitPlan-3',
                  name: { en: '1A - 2', th: '1A - 2' },
                  url: '/assets/image/page-the-esse-complex/information/unitPlan/1a-2.jpg'
                },
                {
                  key: 'unitPlan-4',
                  name: { en: '1B - 1', th: '1B - 1' },
                  url: '/assets/image/page-the-esse-complex/information/unitPlan/1b-1.jpg'
                },
                {
                  key: 'unitPlan-5',
                  name: { en: '1B - 2', th: '1B - 2' },
                  url: '/assets/image/page-the-esse-complex/information/unitPlan/1b-2.jpg'
                },
                {
                  key: 'unitPlan-6',
                  name: { en: '1B - 3', th: '1B - 3' },
                  url: '/assets/image/page-the-esse-complex/information/unitPlan/1b-3.jpg'
                },
                {
                  key: 'unitPlan-7',
                  name: { en: '2C - 2A', th: '2C - 2A' },
                  url: '/assets/image/page-the-esse-complex/information/unitPlan/2c-2a.jpg'
                }
              ]
            }
          ],
          selectedOption: null,
          isDropdownOpen: false
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
              text: img.text,
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
        <img v-if="selectedOption.url" :src="selectedOption.url" class="w-full rounded-lg" />
        <p v-if="selectedOption.text">{{selectedOption.text}}</p>
        <button
          @click="openBigImage(activeTab, [ { url: selectedOption.url, name: selectedOption.name } ])"
          class="mt-3 flex items-center gap-2 text-sm  ml-auto" 
        >
          คลิกเพื่อดูภาพใหญ่
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
            { name: { th: "สวนพร้อมอัฒจันทร์สีเขียวและศาลาพักผ่อน", en: "Garden With Green Amphitheatre & Hidden Pavilion" } },
            { name: { th: "ที่จอดรถทั่วไปและที่จอดรถซูเปอร์คาร์", en: "Parking Spaces and Super Car Designated Parking" } },
            { name: { th: "ตู้ไปรษณีย์และพื้นที่เก็บอุปกรณ์กีฬาและกระเป๋าเดินทางส่วนตัว", en: "Mailbox & Private Storage Space for Sports Equipments or Luggages" } },
            { name: { th: "โซนสวน Sanctuary Terrain", en: "Sanctuary Terrain Garden" } },
            { name: { th: "ห้องสมุด Co-Working Space และห้องประชุม", en: "The Library and Co-Working Area & Meeting Room" } },
            { name: { th: "เลานจ์ลอยฟ้า", en: "The Sky Social Lounge" } },
            { name: { th: "The Residence Lounge พื้นที่สำหรับ\nจัดงานเลี้ยงส่วนตัว", en: "The Residence Lounge, Space for Private Parties" } },
            { name: { th: "โรงภาพยนตร์ส่วนตัว", en: "Private Theatre" } },
            { name: { th: "On the Cloud Fitness พร้อมกำแพงปีนเขาและ\nเวทีมวย", en: "On the Cloud Fitness With Rock Climbing Wall & Boxing Ring" } },
            { name: { th: "ห้องออกกำลังกายส่วนตัว", en: "Private Exercise Room" } },
            { name: { th: "Sky Edge Swimming Pool พร้อมโซนสำหรับเด็กและพื้นที่พักผ่อนริมสระ", en: "Sky Edge Swimming Pool With Separate Kid’s Pool & A Pool Terrace" } },
            { name: { th: "ออนเซ็นบ่อน้ำแร่สไตล์ญี่ปุ่นและห้องอาบน้ำ", en: "Onsen, Japanese Hot Spring & Bathing Facility" } },
            { name: { th: "ห้องอบไอน้ำ", en: "Steam Room" } },
            { name: { th: "สปาและร้านเสริมสวยส่วนตัว", en: "Private Spa and Salon" } },
            { name: { th: "ระเบียงลอยฟ้า", en: "Sky Terrace" } }
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
                      <span class="mr-2">{{index+1}}.</span><span class="whitespace-pre-line">{{ amenity.name[language] }}</span>
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
      // masterPlan: PlanContent,
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
      return match ? match[1] : 'en';
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
      // const brochureUrl = "/assets\/image\/page-the-esse-36\/THE ESSE SUKHUMVIT 36 E-Brochure_compressed.pdf";
      // const link = document.createElement('a');
      // link.href = brochureUrl;
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
      fontClass, brochure,
      projectDetailDownloadBrochure
    };
  }
});
