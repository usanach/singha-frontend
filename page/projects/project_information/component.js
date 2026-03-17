const ProjectInformationComponent = defineComponent({
  name: 'ProjectInformationComponent',
  template: `
    <section class="onview font-['IBM_Plex_Sans_Thai']" id="project_detail" data-section="project_detail" v-if="isEnabled">
      <div class="grid grid-rows-1 grid-cols-1 lg:grid-cols-4 relative min-h-[900px] lg:px-0 px-5">
        <!-- Tab Buttons (Desktop) -->
        <div
          class="bg-cover bg-center py-20 h-full lg:block hidden"
          :style="{
            backgroundColor: projectTabColor || '#fff'
          }"
        >
          <div class="grid min-w-[240px] w-fit mx-auto">
            <div v-for="item in list" :key="item.tab" class="mb-4 relative">
              <button
                type="button"
                @click="activeSection = item.tab"
                class="project-detail-button-list"
                :data-name="activeSection"
              >
                <h3
                  class="text-[24px] transition"
                  :class="[
                    activeSection === item.tab ? 'font-bold' : 'font-thin',
                    tabTextClass
                  ]"
                >
                  {{ item.name[language] }}
                </h3>
              </button>
            </div>
          </div>
        </div>

        <!-- Dynamic Content Area -->
        <div
          class="lg:col-span-3 lg:px-20 pt-10 pb-20 relative"
          :style="{ backgroundColor: contentBgColor }"
          :class="contentTextClass"
        >
          <h2
            :style="{ fontFamily: fontClass() }"
            :class="[
              'lg:text-[70px]',
              'text-[50px]',
              'lg:text-left',
              'text-center',
              'leading-none',
              'font-normal'
            ]"
          >
            {{ title[language] }}
          </h2>

          <!-- Mobile Tab Buttons Dropdown -->
          <div class="relative lg:hidden block my-5">
            <div>
              <button 
                @click="toggleExpand" 
                type="button" 
                :data-name="activeListName()"
                class="project-detail-button-listM bg-cover bg-center px-5 text-center w-full lg:py-3 py-2 lg:text-[24px] text-[18px]"
                :class="mobileTabTextClass"
                :style="{ backgroundColor: mobileTabBackgroundColor }"
              >
                <p>{{ activeListName() }}</p>
                <span class="absolute top-0 right-0 m-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13.114" height="7.498" viewBox="0 0 13.114 7.498">
                    <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down" d="M12.747,16.484l4.958-4.962a.933.933,0,0,1,1.324,0,.945.945,0,0,1,0,1.327L13.41,18.471a.935.935,0,0,1-1.292.027L6.461,12.853a.937.937,0,0,1,1.324-1.327Z" transform="translate(-6.188 -11.247)" fill="#f5f5f5"></path>
                  </svg>
                </span>
              </button>
            </div>
            <div
              v-if="isExpanded"
              class="absolute left-0 top-full w-full border border-black p-5 bg-white z-10 space-y-5"
            >
              <div 
                v-for="item in list" 
                :key="item.tab" 
                @click="selectTab(item.tab)" 
                class="cursor-pointer"
              >
                <h3 class="lg:text-[24px] text-[18px] transition font-light hover:font-normal">
                  {{ item.name[language] }}
                </h3>
              </div>
            </div>
          </div>
          
          <hr class="border border-[#707070]/70 md:w-1/2 mt-5 mb-10 lg:block hidden"/>

          <!-- Dynamic child components -->
          <component 
            :is="sectionComponents[activeSection]" 
            :title="title" 
            :language="language" 
            :list="list" 
            :openBigImage="openBigImage"
            :activeTab="activeSection"
            :projectDetailArea="projectDetailArea"
            @updateActiveSection="handleUpdateActiveSection"
          />

          <div class="mt-20" v-if="brochureUrl">
            <button
              type="button"
              @click="projectDetailDownloadBrochure"
              class="border border-1 py-2 px-3 border-black lg:w-auto w-full block bg-white text-black"
            >
              <div class="flex gap-2">
                <span><img src="/assets/icon/pdf.svg" alt="" class="w-[30px]"></span>
                <span class="my-auto mx-auto">
                  {{ brochure }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal: Full image viewer -->
      <div v-if="isModalVisible" class="fixed inset-0 z-[9999]">
        <div class="h-full modal-div flex" :id="\`\${currentModalId}-modal\`">
          <div class="absolute inset-0 bg-black/70" @click="closeMaximizeModal"></div>
          <div class="swiper lg:w-[70dvw] w-[90dvw] lg:h-[80dvh] h-[40dvh] m-auto floorplan-image-swiper">
            <div class="swiper-wrapper">
              <div
                v-for="(image, index) in currentModalImages"
                :key="index"
                class="swiper-slide flex"
                :data-item="index"
              >
                <img :src="image.url" alt="Gallery Image" class="m-auto object-cover absolute inset-0" />
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
          <button
            type="button"
            @click="closeMaximizeModal"
            class="absolute right-0 top-0 lg:m-10 m-5 z-50 w-[30px] overflow-hidden"
          >
            <img src="/assets/icon/close.svg" class="scale-110" />
          </button>
        </div>
      </div>
    </section>
  `,
  computed: {
    // (ใช้เฉพาะใน template เดิม ถ้าอยากเก็บไว้ก็ได้ แต่จริง ๆ เราใช้ function activeListName() ใน setup แทน)
    activeListNameComputed() {
      const activeItem = this.list.find(item => item.tab === 'projectDetails');
      return activeItem ? activeItem.name[this.language] : 'รายละเอียดโครงการ';
    }
  },
  setup() {
    const { ref, computed, onMounted, onUnmounted, nextTick } = Vue;

    const language        = ref('th');
    const activeSection   = ref('projectDetails');
    const isExpanded      = ref(false);
    const isModalVisible  = ref(false);
    const currentModalId  = ref('');
    const currentModalImages = ref([]);

    const brochure        = ref('ดาวน์โหลดโบรชัวร์');
    const brochureUrl = ref('');
    const brochureFilename = ref('');


    const isEnabled = ref(false);

    const title = ref({
      en: 'Project Information',
      th: 'ข้อมูลโครงการ'
    });

    const list = ref([
      {
        tab: 'projectDetails',
        name: {
          en: 'Project Details',
          th: 'รายละเอียดโครงการ'
        }
      },
      {
        tab: 'masterPlan',
        name: {
          en: 'Master Plan',
          th: 'มาสเตอร์แพลน'
        }
      },
      {
        tab: 'floorPlan',
        name: {
          en: 'Floor Plan',
          th: 'ฟลอร์แพลน'
        }
      },
      {
        tab: 'unitPlan',
        name: {
          en: 'Unit Plan',
          th: 'ยูนิตแพลน'
        }
      },
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


    // ---------- สี + ฟอนต์จาก API ----------
    const projectTabColor        = ref('#182A44'); // default tab background (desktop)
    const projectBackgroundColor = ref('#F5F5F1'); // default dynamic area background
    const projectInfoTitleFont   = ref({
      th: 'IBM Plex Sans Thai',
      en: 'Gotham'
    });

    // ข้อมูล Project Details (ดึงจาก API หรือ fallback)
    const projectDetailArea = ref({
      projectArea: {
        th: "ประมาณ 46  ไร่​",
        en: "Approximately 46 rai​"
      },
      type: {
        th: "บ้านเดี่ยว 2 ชั้น​​",
        en: "2-Storey detached house​"
      },
      unit: {
        th: "158 ยูนิต​​​",
        en: "158 units"
      },
      usable: {
        th: "283 - 369 ตร.ม.​",
        en: "283 - 369 sq.m"
      },
      area: {
        th: "เริ่มต้น 70 - 94 ตร.ว.",
        en: "Starts 70 - 94 sq.w"
      }
    });

    const isMobile = ref(false);
    const updateIsMobile = () => {
      isMobile.value = window.innerWidth < 1024;
    };

    // ---------- Helper ตรวจสีขาว ----------
    const normalizeColor = (color) => {
      if (!color) return '';
      return String(color).trim().toLowerCase();
    };

    const isColorWhite = (color) => {
      const c = normalizeColor(color);
      return c === '#fff' || c === '#ffffff' || c === 'white' || c === 'rgb(255,255,255)'||c==='#f5f5f1';
    };

    // ---------- สี content area (desktop + mobile เงื่อนไข) ----------
    const contentBgColor = computed(() => {
      const bg = projectBackgroundColor.value || '#F5F5F1';

      // Desktop: ใช้สีตาม API ตรง ๆ
      if (!isMobile.value) {
        return bg;
      }

      // Mobile:
      // ถ้า project_bacground_color เป็นสีขาว → ใช้สีขาว (ดึงจาก API)
      if (isColorWhite(bg)) {
        return bg;
      }

      // ถ้าเป็นสีอื่น → ใช้สีขาวแทน
      return '#ffffff';
    });

    const contentTextClass = computed(() => {
      const bg = contentBgColor.value;
      // ถ้า background ไม่ใช่ขาว -> ฟอนต์ขาว
      console.log(isColorWhite(bg));
      
      return isColorWhite(bg) ? 'text-black' : 'text-white';
    });

    // ---------- สี Tab (Desktop) ----------
    const tabTextClass = computed(() => {
      return isColorWhite(projectTabColor.value) ? 'text-black' : 'text-white';
    });

    // ---------- สี Tab (Mobile) ตามเงื่อนไขที่คุณขอ ----------
    const mobileTabBackgroundColor = computed(() => {
      const tab = projectTabColor.value || '#ffffff';
      const bg  = projectBackgroundColor.value || '#ffffff';

      if (!isMobile.value) {
        return tab;
      }

      // 1) ถ้า project_tab_color ไม่ใช่ขาว → ใช้สีนั้น ๆ
      if (!isColorWhite(tab)) {
        return tab;
      }

      // 2) ถ้า project_tab_color เป็นขาว และ project_bacground_color ไม่ใช่ขาว → ใช้ bg แทน
      if (isColorWhite(tab) && !isColorWhite(bg)) {
        return bg;
      }

      // 3) ถ้าทั้งคู่ขาว → ขาว
      return '#ffffff';
    });

    const mobileTabTextClass = computed(() => {
      if (!isMobile.value) {
        return tabTextClass.value;
      }
      const bg = mobileTabBackgroundColor.value;
      return isColorWhite(bg) ? 'text-black' : 'text-white';
    });

    // ---------- font title จาก API ----------
    const fontClass = () => {
      return language.value === 'en'
        ? projectInfoTitleFont.value.en
        : projectInfoTitleFont.value.th;
    };

    // ---------- หาภาษา / project_id / ดึง API ----------
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'en';
    };

    const API_BASE = window.APP_CONFIG?.apiBaseUrl || null;
    const STORAGE_BASE = window.APP_CONFIG?.storageUrl || null;


    const findProjectIdFromSeo = async () => {
      // const path = window.location.pathname;
      // const lang = language.value;

      // const res = await axios.get(`${API_BASE}/project/seo`);
      // const rows = Array.isArray(res.data?.data) ? res.data.data : [];

      // const enabledRows = rows.filter(r => (r.seo_disabled ?? 0) != 1);
      // const field = lang === 'en' ? 'seo_url_en' : 'seo_url_th';

      // const matched = enabledRows.find(row => row[field] === path);
      return projectIDs || null;
    };

  const fetchProjectInformationArea = async () => {
    try {
      const projectId = await findProjectIdFromSeo();
      if (!projectId) return;

      // ✅ ใช้ api.js
      const res = await getProjectInformationProjectDetailArea(projectId);
      const rows = Array.isArray(res?.data?.data) ? res.data.data : [];
      if (!rows.length) return;

      const row = rows[0];

      isEnabled.value = String(row.project_information_disabled) === '1';

      // สีจาก API
      if (row.project_tab_color) {
        projectTabColor.value = row.project_tab_color;
      }
      if (row.project_bacground_color) {
        projectBackgroundColor.value = row.project_bacground_color;
      }

      // ฟอนต์ title จาก API
      projectInfoTitleFont.value = {
        th: row.project_info_title_font_th || projectInfoTitleFont.value.th,
        en: row.project_info_title_font_en || projectInfoTitleFont.value.en
      };

      // ✅ Project Detail Area
      projectDetailArea.value = {
        projectArea: row.project_detail_area_name || projectDetailArea.value.projectArea,
        type:        row.project_detail_area_type || projectDetailArea.value.type,
        unit:        row.project_detail_area_unit || projectDetailArea.value.unit,
        area:        row.project_detail_area_area || projectDetailArea.value.area,
        usable:      row.project_detail_area_usable || projectDetailArea.value.usable
      };

      // ---------- PDF ----------
      const pdfFile =
        language.value === 'en'
          ? row.project_pdf_en || row.project_pdf
          : row.project_pdf;

      if (pdfFile) {
        brochureFilename.value = pdfFile;
        const STORAGE_BASE = window.APP_CONFIG?.storageUrl || null;
        // ถ้า API ส่งมาเป็นชื่อไฟล์
        brochureUrl.value =
          /^https?:\/\//i.test(pdfFile)
            ? pdfFile
            : `${STORAGE_BASE}uploads/documents/${pdfFile}`;
      } else {
        brochureUrl.value = '';
        brochureFilename.value = '';
      }

    } catch (err) {
      console.error('ProjectInformation: fetch error', err);
    }
  };

    
    // ซ่อน tab ใด ๆ (ใช้ได้ทั้ง masterPlan, floorPlan, unitPlan)
    const removeTab = (tabName) => {
      const hasTab = list.value.some(item => item.tab === tabName);
      if (!hasTab) return;

      list.value = list.value.filter(item => item.tab !== tabName);

      // ถ้า tab ที่ถูกซ่อนเป็น tab ที่กำลัง active อยู่ ให้เด้งกลับไป projectDetails
      if (activeSection.value === tabName) {
        activeSection.value = 'projectDetails';
      }
    };


    // ---------- CHECK SECTIONS (Master / Floor / Unit) ----------

// masterPlan
    const checkMasterPlanSection = async () => {
      try {
        const projectId = await findProjectIdFromSeo();
        if (!projectId) {
          console.warn('ProjectInformation: ไม่พบ project_id จาก SEO (masterPlan)');
          removeTab('masterPlan');
          return;
        }

        const res = await getProjectInformationMasterPlan(projectId);
        const rows = Array.isArray(res.data?.data) ? res.data.data : [];

        // ถ้าไม่เจอ data เลย → ซ่อน
        if (!rows.length) {
          console.warn('ProjectInformation: information-master-plan ไม่ส่ง data');
          removeTab('masterPlan');
          return;
        }

        // ถ้า "ทุก row" master_plan_item_disabled = 0 → ซ่อน
        const allDisabledZero = rows.every(
          item => Number(item.master_plan_item_disabled ?? 0) === 0
        );

        if (allDisabledZero) {
          removeTab('masterPlan');
        }
      } catch (err) {
        console.error('ProjectInformation: checkMasterPlanSection error', err);
        removeTab('masterPlan');
      }
    };

    // floorPlan: เช็ค disabled + เลือก template
    const checkFloorPlanSection = async () => {
      try {
        const projectId = await findProjectIdFromSeo();
        if (!projectId) {
          console.warn('ProjectInformation: ไม่พบ project_id จาก SEO (floorPlan)');
          removeTab('floorPlan');
          return;
        }

        const res = await axios.get(`${API_BASE}/project/information-template-1/${projectId}`);

        const data = res?.data|| null;

        if (!data) {
          console.warn('ProjectInformation: information-template-1 ไม่ส่ง data');
          removeTab('floorPlan');
          return;
        }

        // disabled: "1" = ใช้งาน
        if (String(data.disabled) !== '1') {
          removeTab('floorPlan');
          return;
        }
        const template = String(data.template || '1');

        if (template === '1') {
          // ใช้ dropdown แบบเดิม
          sectionComponents.floorPlan = PlanContent;
        } else if (template === '2') {
          // ใช้ layout แบบ multi-group (PlanContent2)
          sectionComponents.floorPlan = PlanContent2;
        } else {
          // template แปลก ๆ → fallback
          sectionComponents.floorPlan = PlanContent;
        }

      } catch (err) {
        console.error('ProjectInformation: checkFloorPlanSection error', err);
        removeTab('floorPlan');
      }
    };

    // unitPlan
    const checkUnitPlanSection = async () => {
      try {
        const projectId = await findProjectIdFromSeo();
        if (!projectId) {
          console.warn('ProjectInformation: ไม่พบ project_id จาก SEO (unitPlan)');
          removeTab('unitPlan');
          return;
        }


            const res = await getProjectInformationUnitPlan(projectId);
        const rows = Array.isArray(res.data?.data) ? res.data.data : [];

        if (!rows.length) {
          console.warn('ProjectInformation: information-unit-plan ไม่ส่ง data');
          removeTab('unitPlan');
          return;
        }

        const allDisabledZero = rows.every(
          item => Number(item.unit_plan_item_disabled ?? 0) === 0
        );

        if (allDisabledZero) {
          removeTab('unitPlan');
        }
      } catch (err) {
        console.error('ProjectInformation: checkUnitPlanSection error', err);
        removeTab('unitPlan');
      }
    };


    // ---------- Child Components ---------- 
    const ProjectDetailsContent = {
      props: ['title', 'language', 'list'],
      data() {
        return {
          loading: true,
          // ตารางรายละเอียดโครงการ (มีค่า fallback ไว้ก่อน)
          detailRows: {
            projectArea: {
              th: "ประมาณ 46  ไร่​",
              en: "Approximately 46 rai​"
            },
            type: {
              th: "บ้านเดี่ยว 2 ชั้น​​",
              en: "2-Storey detached house​"
            },
            unit: {
              th: "158 ยูนิต​​​",
              en: "158 units"
            },
            usable: {
              th: "283 - 369 ตร.ม.​",
              en: "283 - 369 sq.m"
            },
            area: {
              th: "เริ่มต้น 70 - 94 ตร.ว.",
              en: "Starts 70 - 94 sq.w"
            }
          },

          // roomTypes จาก API (ถ้าไม่มีจะใช้ fallbackRoomTypes)
          roomTypes: [],

          // fallback ถ้า API ไม่ส่ง project_detail_more
          fallbackRoomTypes: [
            {
              title: {
                th: "ประเภทและขนาดห้อง",
                en: "Room type and size"
              },
              data: [
                {
                  name: { en: "RESIDENCE I",  th: "RESIDENCE I"  },
                  size: { th: "369 ตร.ม.",    en: "369 sq.m."    }
                },
                {
                  name: { en: "RESIDENCE II", th: "RESIDENCE II" },
                  size: { th: "327 ตร.ม.",    en: "327 sq.m."    }
                },
                {
                  name: { en: "RESIDENCE III", th: "RESIDENCE III" },
                  size: { th: "283 ตร.ม.",     en: "283 sq.m."     }
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
        },

        // ใช้ roomTypes จาก API ถ้ามี ไม่งั้นใช้ fallback
        effectiveRoomTypes() {
          return (Array.isArray(this.roomTypes) && this.roomTypes.length)
            ? this.roomTypes
            : this.fallbackRoomTypes;
        }
      },

      methods: {
        formatKey(key) {
          const mapping = {
            projectArea: this.language === 'th' ? "ขนาดโครงการ"  : "Project area",
            type:        this.language === 'th' ? "ประเภทโครงการ" : "Project Type",
            unit:        this.language === 'th' ? "จำนวนยูนิต"    : "Number of units",
            usable:      this.language === 'th' ? "พื้นที่ใช้สอย"  : "Usable area",
            area:        this.language === 'th' ? "ขนาดที่ดิน"    : "Land area",
          };
          return mapping[key] || key;
        },

        getValue(value) {
          return typeof value === 'object' ? value[this.language] : value;
        },

        // หา project_id จาก /api/project/seo ด้วย path ปัจจุบัน
        async findProjectIdFromSeo() {
          const path = window.location.pathname;
          const lang = this.language || 'th';

          const res = await axios.get(`${API_BASE}/project/seo`);
          const rows = Array.isArray(res.data?.data) ? res.data.data : [];

          const enabledRows = rows.filter(r => (r.seo_disabled ?? 0) != 1);
          const field = lang === 'en' ? 'seo_url_en' : 'seo_url_th';

          const matched = enabledRows.find(row => row[field] === path);
          return matched?.project_id || null;
        },

        // ดึงข้อมูลจาก /api/project/information-project-detail-area/{project_id}
        async fetchInfo() {
          try {
            this.loading = true;

            const projectId = await this.findProjectIdFromSeo();
            if (!projectId) {
              console.warn('ProjectDetailsContent: ไม่พบ project_id จาก SEO');
              this.loading = false;
              return;
            }

        const res = await getProjectInformationProjectDetailArea(projectId);
            const rows = Array.isArray(res.data?.data) ? res.data.data : [];
            if (!rows.length) {
              console.warn('ProjectDetailsContent: API ไม่ส่ง data');
              this.loading = false;
              return;
            }

            const row = rows[0];

            // ---------- ตารางรายละเอียดโครงการ ----------
            this.detailRows = {
              projectArea: row.project_detail_area_name || this.detailRows.projectArea,
              type:        row.project_detail_area_type || this.detailRows.type,
              unit:        row.project_detail_area_unit || this.detailRows.unit,
              area:        row.project_detail_area_area || this.detailRows.area,
              usable:      row.project_detail_area_usable || this.detailRows.usable,
            };

            // ---------- Room type / size ----------
            if (Array.isArray(row.project_detail_more) && row.project_detail_more.length) {
              const sectionTitle = {
                th: row.project_room_section_title_th || 'ประเภทและขนาดห้อง',
                en: row.project_room_section_title_en || 'Room type and size'
              };

              const data = row.project_detail_more.map(item => ({
                name: {
                  th: item.room_type_th || '',
                  en: item.room_type_en || ''
                },
                size: {
                  th: item.room_size_th || '',
                  en: item.room_size_en || ''
                }
              }));

              this.roomTypes = [{ title: sectionTitle, data }];
            } else {
              this.roomTypes = []; // ให้ไปใช้ fallback
            }

          } catch (err) {
            console.error('ProjectDetailsContent: fetch error', err);
          } finally {
            this.loading = false;
          }
        }
      },

      mounted() {
        this.fetchInfo();
      },

      template: `
        <div class="mt-5">

          <!-- 🔄 Loading State (skeleton) -->
          
          <div v-if="loading" 
              class="absolute inset-0 flex items-center justify-center z-[9999]"
              :style="{ backgroundColor: contentBgColor }">
              <div class="loader"></div>
          </div>

          <!-- ✅ Loaded Content -->
          <div v-else class="space-y-5">
            <h3 class="font-medium text-[20px]">
              {{ activeListName }}
            </h3>

            <!-- ตารางรายละเอียดโครงการ -->
            <div class="grid grid-cols-2 gap-5 lg:w-1/2">
              <template v-for="(value, key) in detailRows" :key="key">
                <template v-if="getValue(value)">
                  <p class="font-normal">{{ formatKey(key) }} :</p>
                  <p class="text-right whitespace-pre-line">{{ getValue(value) }}</p>
                </template>
              </template>
            </div>

            <hr class="border border-[#707070]/70 md:w-1/2 mt-5 mb-10">

            <!-- Room type & size -->
            <div
              v-for="(item, index) in effectiveRoomTypes"
              :key="index"
              class="pt-5"
            >
              <h3 class="font-medium text-[20px]">{{ item.title[language] }}</h3>
              <div class="grid grid-cols-2 gap-5 lg:w-1/2 mt-5">
                <template v-for="(rt, i) in item.data" :key="i">
                  <p class="font-normal text-nowrap">{{ rt.name[language] }} :</p>
                  <p class="text-right whitespace-pre-line">{{ rt.size[language] }}</p>
                </template>
              </div>
              <hr class="border border-[#707070]/70 md:w-1/2 mt-5 mb-10">
            </div>
          </div>
        </div>
      `
    };

    const PlanContent = {
      props: ['language', 'list', 'openBigImage', 'activeTab'],
      data() {
        return {
          loading: false,
          dataset: [
            {
              tab: 'masterPlan',
              name: { en: 'Ground Floor Plan', th: 'มาสเตอร์แพลน' },
              images: []
            },
            {
              tab: 'floorPlan',
              name: { en: 'FloorPlan', th: 'FloorPlan' },
              images: []
            },
            {
              tab: 'unitPlan',
              name: { en: 'UnitPlan', th: 'UnitPlan' },
              images: []
            }
          ],
          selectedOption: null,
          isDropdownOpen: false,
          viewFullImageText: { en: 'View full size', th: 'คลิกเพื่อดูภาพใหญ่' }
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
          const item = this.list.find(i => i.tab === this.activeTab)
          return item ? item.name[this.language] : ''
        }
      },
      watch: {
        // เวลาเปลี่ยน tab
        async activeTab(newVal) {
          // masterPlan → ยิง API master plan ถ้ายังไม่มีรูป
          if (newVal === 'masterPlan') {
            const master = this.dataset.find(o => o.tab === 'masterPlan')
            if (!master || !Array.isArray(master.images) || !master.images.length) {
              await this.fetchMasterPlan()
            }
          }
          if (newVal === 'unitPlan') {
            const master = this.dataset.find(o => o.tab === 'masterPlan')
            if (!master || !Array.isArray(master.images) || !master.images.length) {
              await this.fetchUnitPlan()
            }
          }

          // floorPlan → ยิง API template-1 ถ้ายังไม่มีรูป
          if (newVal === 'floorPlan') {
            const floor = this.dataset.find(o => o.tab === 'floorPlan')
            if (!floor || !Array.isArray(floor.images) || !floor.images.length) {
              await this.fetchFloorPlanTemplate1()
            }
          }
          // reset dropdown
          if (this.options.length) {
            this.selectedOption = this.options[0]
          } else {
            this.selectedOption = null
          }
          this.isDropdownOpen = false
        }
      },
      async created() {
        // ถ้าเปิดหน้ามาแล้ว activeTab คือ masterPlan → ดึง master plan
        if (this.activeTab === 'masterPlan') {
          await this.fetchMasterPlan()
        }
        // ถ้าเปิดหน้ามาแล้ว activeTab คือ masterPlan → ดึง master plan
        if (this.activeTab === 'unitPlan') {
          await this.fetchUnitPlan()
        }

        // ถ้าเปิดหน้ามาแล้ว activeTab คือ floorPlan → ดึง floor plan template 1
        if (this.activeTab === 'floorPlan') {
          await this.fetchFloorPlanTemplate1()
        }

        if (this.options.length) {
          this.selectedOption = this.options[0]
        }
      },
      methods: {
        toggleDropdown() {
          if (!this.options.length) return
          this.isDropdownOpen = !this.isDropdownOpen
        },
        selectOption(opt) {
          this.selectedOption = opt
          this.isDropdownOpen = false
        },

        // 🔥 ดึงข้อมูลจาก API master plan
        async fetchMasterPlan() {
          try {
            this.loading = true

            const projectId = await findProjectIdFromSeo()
            if (!projectId) {
              console.warn('PlanContent(masterPlan): ไม่พบ project_id จาก SEO')
              return
            }

            const res = await getProjectInformationMasterPlan(projectId)
            const rows = Array.isArray(res.data?.data) ? res.data.data : []

            if (!rows.length) {
              console.warn('PlanContent(masterPlan): API ไม่ส่ง data')
              return
            }

            // master_plan_item_disabled: 1 = ใช้งาน
            const enabled = rows.filter(
              item => Number(item.master_plan_item_disabled ?? 0) === 1
            )

            if (!enabled.length) {
              console.warn('PlanContent(masterPlan): ไม่มีรายการที่ enabled')
              return
            }

            const master = this.dataset.find(o => o.tab === 'masterPlan')
            if (!master) return

            master.images = enabled.map((item, index) => {
              const raw = item.master_plan_item_image || ''

              let url = raw
              if (!/^https?:\/\//i.test(raw)) {
                url = `${STORAGE_BASE}uploads/project_information_master_plan_item/${raw}`
              }

              return {
                key: `masterPlan-${item.id || index}`,
                name: {
                  en: item.master_plan_item_name || `Master plan ${index + 1}`,
                  th: item.master_plan_item_name || `Master plan ${index + 1}`
                },
                url
              }
            })

            if (this.options.length) {
              this.selectedOption = this.options[0]
            } else {
              this.selectedOption = null
            }
          } catch (err) {
            console.error('PlanContent(masterPlan): fetch error', err)
          } finally {
            this.loading = false
          }
        },

        // 🔥 ดึงข้อมูลจาก API unit plan
        async fetchUnitPlan() {
          try {
            this.loading = true

            const projectId = await findProjectIdFromSeo()
            if (!projectId) {
              console.warn('PlanContent(unitPlan): ไม่พบ project_id จาก SEO')
              return
            }

            const res = await getProjectInformationUnitPlan(projectId);
            const rows = Array.isArray(res.data?.data) ? res.data.data : []

            if (!rows.length) {
              console.warn('PlanContent(unitPlan): API ไม่ส่ง data')
              return
            }

            // unit_plan_item_disabled: 1 = ใช้งาน
            const enabled = rows.filter(
              item => Number(item.unit_plan_item_disabled ?? 0) === 1
            )

            if (!enabled.length) {
              console.warn('PlanContent(unitPlan): ไม่มีรายการที่ enabled')
              return
            }

            const unit = this.dataset.find(o => o.tab === 'unitPlan')
            if (!unit) return

            unit.images = enabled.map((item, index) => {
              const raw = item.unit_plan_item_image || ''

              let url = raw
              if (!/^https?:\/\//i.test(raw)) {
                url = `${STORAGE_BASE}uploads/project_information_unit_plan_item/${raw}`
              }

              return {
                key: `unitPlan-${item.id || index}`,
                name: {
                  en: item.unit_plan_item_name || `unit plan ${index + 1}`,
                  th: item.unit_plan_item_name || `unit plan ${index + 1}`
                },
                url
              }
            })

            if (this.options.length) {
              this.selectedOption = this.options[0]
            } else {
              this.selectedOption = null
            }
          } catch (err) {
            console.error('PlanContent(unitPlan): fetch error', err)
          } finally {
            this.loading = false
          }
        },

        // 🔥 ดึงข้อมูล floorPlan จาก API (เฉพาะ template = 1)
        async fetchFloorPlanTemplate1() {
          try {
            this.loading = true

            const projectId = await findProjectIdFromSeo()
            if (!projectId) {
              console.warn('PlanContent(floorPlan): ไม่พบ project_id จาก SEO')
              return
            }

            const res = await axios.get(`${API_BASE}/project/information-template-1/${projectId}`)
            const api = res.data || {}

            // รองรับทั้งโครงสร้างเก่าและใหม่
            const template =
              api.template != null
                ? Number(api.template)
                : api.data && api.data.template != null
                  ? Number(api.data.template)
                  : 1

            // ถ้า template != 1 → ไม่ต้องทำอะไร (ควรถูกจัดการด้วย PlanContent2 แทน)
            if (template !== 1) {
              console.warn('PlanContent(floorPlan): template ไม่ใช่ 1 (template = ' + template + ')')
              return
            }

            // ---- map items → floor.images ----
            let items = []

            // รูปแบบเก่า: { data: {...}, items: [...] }
            if (Array.isArray(api.items)) {
              items = api.items
            }

            // รูปแบบใหม่: { template, disabled, groups: [ { images: [...] } ] }
            if (!items.length && Array.isArray(api.groups)) {
              const firstGroup = api.groups[0] || {}
              if (Array.isArray(firstGroup.images)) {
                items = firstGroup.images
              }
            }

            if (!items.length) {
              console.warn('PlanContent(floorPlan): ไม่มี items ใน template 1')
              return
            }

            const floor = this.dataset.find(o => o.tab === 'floorPlan')
            if (!floor) return

            floor.images = items
              .filter(item => !!(item.image_url || item.image))
              .map((item, index) => {
                const raw = item.image_url || item.image || ''
                let url = raw

                if (!/^https?:\/\//i.test(raw)) {
                  url = `${STORAGE_BASE}uploads/project_information_f_p_template1_item/${raw}`
                }

                const name = item.name || `Floor plan ${index + 1}`

                return {
                  key: `floorPlan-${item.id || index}`,
                  name: {
                    en: name,
                    th: name
                  },
                  url
                }
              })

            if (this.activeTab === 'floorPlan' && this.options.length) {
              this.selectedOption = this.options[0]
            } else if (!this.options.length) {
              this.selectedOption = null
            }
          } catch (err) {
            console.error('PlanContent(floorPlan): fetch error', err)
          } finally {
            this.loading = false
          }
        }
      },
      template: `
        <div class="space-y-5">
          <!-- Loading -->
          <div v-if="loading" 
              class="absolute inset-0 flex items-center justify-center z-[9999]"
              :style="{ backgroundColor: contentBgColor }">
            <div class="loader"></div>
          </div>

          <div v-else>
            <div class="flex justify-between lg:w-3/4 w-full" v-if="selectedOption">
              <!-- ชื่อหัวข้อ -->
              <h3 class="font-medium text-[20px]">{{ headerName }}</h3>

              <!-- dropdown เลือกรูป -->
              <div class="relative inline-block bg-white text-black">
                <button
                  @click="toggleDropdown"
                  class="border px-3 py-1 flex items-center justify-between min-w-[10rem]"
                >
                  <span>{{ selectedOption.name[language] }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 13.114 7.498">
                    <path d="M12.747,16.484l4.958-4.962a.933.933,0,0,1,1.324,0,.945.945,0,0,1,0,1.327L13.41,18.471a.935.935,0,0,1-1.292.027L6.461,12.853a.937.937,0,0,1,1.324-1.327Z" transform="translate(-6.188 -11.247)" fill="#000"/>
                  </svg>
                </button>
                <div
                  v-if="isDropdownOpen"
                  class="absolute left-0 mt-1 w-full bg-white border z-10 max-h-48 overflow-auto"
                >
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

            <!-- กรณีไม่มีข้อมูล -->
            <div v-if="!selectedOption" class="mt-5 text-sm opacity-60">
              <p v-if="activeTab === 'masterPlan'">
                {{ language === 'th' ? 'ยังไม่มีข้อมูล Master Plan' : 'No master plan data available.' }}
              </p>
              <p v-else-if="activeTab === 'floorPlan'">
                {{ language === 'th' ? 'ยังไม่มีข้อมูล Floor Plan' : 'No floor plan data available.' }}
              </p>
              <p v-else>
                {{ language === 'th' ? 'ยังไม่มีข้อมูลสำหรับส่วนนี้' : 'No data available for this section.' }}
              </p>
            </div>

            <!-- แสดงรูปที่เลือก -->
            <div v-else class="mt-5 lg:w-3/4 w-full">
              <img :src="selectedOption.url" class="w-full rounded-lg" />
              <button
                @click="openBigImage(activeTab, [ { url: selectedOption.url, name: selectedOption.name } ])"
                class="mt-3 flex items-center gap-2 text-sm ml-auto"
              >
                {{ viewFullImageText[language] }}
                <img src="/assets/icon/maximize.svg" alt="maximize" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      `
    }

    const PlanContent2 = {

        props: ['language', 'openBigImage', 'activeTab'],

        data() {
          return {
            tabs: [],
            localActiveTab: null,

            selectedIndexMap: {},      // { tabId: index }
            thumbsSwiperMap: {},       // { tabId: Swiper }
            mainSwiperMap: {},         // { tabId: Swiper }
            planListSwiper: null,

            loading: true,
            viewFullImageText: {
              en: 'View full size',
              th: 'คลิกเพื่อดูภาพใหญ่'
            }
          };
        },

        created() {
          if (this.activeTab) {
            this.localActiveTab = this.activeTab;
          }
        },

        mounted() {
          this.fetchTemplateData().then(() => {
            this.$nextTick(() => {
              // ✅ init เฉพาะ tab ที่ active ตอนแรก
              if (this.localActiveTab) {
                this.initSwipersForTab(this.localActiveTab);
              }
            });
          });
        },

        watch: {
          activeTab(val) {
            if (this.findTab(val)) {
              this.localActiveTab = val;
              this.$nextTick(() => this.updateSwipers());
            }
          }
        },

        computed: {
          currentTab() {
            return this.findTab(this.localActiveTab);
          },

          currentIndex: {
            get() {
              return this.selectedIndexMap[this.localActiveTab] ?? 0;
            },
            set(v) {
              const main = this.mainSwiperMap[this.localActiveTab];
              const max = (this.currentTab?.images.length || 1) - 1;

              let nv = v;
              if (nv > max) nv = 0;
              if (nv < 0) nv = max;

              if (main) {
                main.slideTo(nv);
              }
              this.selectedIndexMap[this.localActiveTab] = nv;
            }
          },

          headerText() {
            return {
              en: 'Floor Plan',
              th: 'แบบแปลน'
            };
          }
        },

        methods: {
          async fetchTemplateData() {
            try {
              const projectId = await findProjectIdFromSeo();
              const res = await axios.get(`${API_BASE}/project/information-template-1/${projectId}`);
              const payload = res.data || {};
              const groups = Array.isArray(payload.groups) ? payload.groups : [];

              this.tabs = groups.map((g, index) => ({
                id: g.id ? `group-${g.id}` : `group-${index}`,
                title: g.name || `TYPE ${index + 1}`,
                areaText: {
                  th: g.desc_th || '',
                  en: g.desc_en || ''
                },
                images: (g.slides || []).map(s => STORAGE_BASE+s.image_url),
                specs: (g.details || []).map(d => ({
                  icon: STORAGE_BASE+ d.icon_url,
                  text: {
                    th: d.text_th || '',
                    en: d.text_en || d.text_th || ''
                  }
                }))
              }));

              if (!this.tabs.length) return;

              if (!this.localActiveTab || !this.findTab(this.localActiveTab)) {
                this.localActiveTab = this.tabs[0].id;
              }

              this.tabs.forEach(t => {
                if (this.selectedIndexMap[t.id] == null) {
                  this.selectedIndexMap[t.id] = 0;
                }
              });

            } catch (e) {
              console.error('PlanContent2: load error', e);
            } finally {
              this.loading = false;
            }
          },

          findTab(id) {
            return this.tabs.find(t => t.id === id);
          },

          isActiveTab(id) {
            return this.localActiveTab === id;
          },

          setTab(id) {
            if (!this.findTab(id)) return;

            this.localActiveTab = id;

            if (this.selectedIndexMap[id] == null) {
              this.selectedIndexMap[id] = 0;
            }

            this.$nextTick(() => {
              this.initSwipersForTab(id);
            });
          },
          initSwipersForTab(tabId) {
            const tab = this.findTab(tabId);
            if (!tab) return;

            this.$nextTick(() => {
              const root = document.getElementById(tabId);
              if (!root || root.classList.contains('hidden')) return;

              // destroy ของเก่า
              this.thumbsSwiperMap[tabId]?.destroy(true, true);
              this.mainSwiperMap[tabId]?.destroy(true, true);

              if (!tab.images?.length) return;

              const thumbs = new Swiper(`#${tabId} .thumbs-container`, {
                slidesPerView: 3,
                spaceBetween: 10,
                freeMode: true,
                watchSlidesProgress: true,
                slideToClickedSlide: true,
              });

              const main = new Swiper(`#${tabId} .main-container`, {
                spaceBetween: 10,
                navigation: {
                  nextEl: `#${tabId} .next`,
                  prevEl: `#${tabId} .prev`,
                },
                thumbs: { swiper: thumbs },
              });

              // sync state
              main.on('slideChange', () => {
                this.selectedIndexMap[tabId] =
                  typeof main.realIndex === 'number'
                    ? main.realIndex
                    : main.activeIndex || 0;
              });

              thumbs.on('tap', () => {
                const idx = thumbs.clickedIndex ?? 0;
                main.slideTo(idx);
                this.selectedIndexMap[tabId] = idx;
              });

              this.mainSwiperMap[tabId] = main;
              this.thumbsSwiperMap[tabId] = thumbs;

              const start = this.selectedIndexMap[tabId] || 0;
              main.slideTo(start, 0);
              thumbs.slideTo(start, 0);
            });
          },

          updateSwipers() {
            const tab = this.localActiveTab;
            if (!tab) return;

            this.$nextTick(() => {
              this.initSwipers();
            });
          },

          openBig() {
            if (!this.currentTab) return;

            const main = this.mainSwiperMap[this.localActiveTab];
            const idx = main?.realIndex ?? this.currentIndex ?? 0;

            const imgs = this.currentTab.images;
            const reordered = [
              ...imgs.slice(idx),
              ...imgs.slice(0, idx)
            ].map(u => ({
              url: u,
              name: {
                th: this.currentTab.title,
                en: this.currentTab.title
              }
            }));

            this.openBigImage(this.localActiveTab, reordered);
          },

          bgStyle(url) {
            return { backgroundImage: `url('${url}')` };
          },
          
          isLongText(sp, lang) {
            if (sp.icon) return false;
            const text = sp?.text?.[lang] || '';
            return text.length > 50;
          }
        },
      template: `
        <div v-if="loading" 
            class="absolute inset-0 flex items-center justify-center z-[9999]"
            :style="{ backgroundColor: contentBgColor }">
            <div class="loader"></div>
        </div>
        <div v-else id="floorPlan" class="section lg:px-0 px-5 " data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
          <div class="flex flex-col w-full gap-5">
            <div>
              <h3 class="font-medium text-[20px]">{{ headerText[language] }}</h3>
            </div>


            <!-- ถ้ายังโหลดอยู่หรือไม่มีแท็บจะไม่ render swiper -->
            <div class="w-full" v-if="tabs.length">
              <!-- Top tabs -->
              <div class="lg:w-1/2">
                <div class="floor-plan-list swiper swiper-horizontal swiper-free-mode swiper-backcase-hidden">
                  <div class="swiper-wrapper">
                    <div
                      v-for="tab in tabs"
                      :key="tab.id"
                      class="swiper-slide"
                      style="width:197px; margin-right:20px;"
                    >
                      <button
                        type="button"
                        class="font-['IBM_Plex_Sans_Thai']"
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
                        <div><p class="uppercase font-bold whitespace-pre-line">{{ tab.title }}</p></div>
                        <div><p class="whitespace-pre-line">{{ tab.areaText[language] }}</p></div>
                        <div class="space-y-2 w-full">
                          <div class="flex justify-between lg:flex-row flex-col flex-wrap mt-5 space-y-2">
                            <div
                              v-for="(sp, i) in tab.specs"
                              :key="tab.id + '-spec-' + i"
                              class="flex gap-5 w-full"
                              :class="isLongText(sp, language) ? 'lg:w-full' : 'lg:w-1/2'"
                            >
                              <span v-if="!isLongText(sp, language)" class="min-w-[48px] flex">
                                <img class="my-auto w-[25px]" v-if="sp.icon" :src="sp.icon" :alt="sp.alt">
                              </span>
                              <span
                                class="my-auto whitespace-pre-line"
                                :class="isLongText(sp, language) ? 'leading-relaxed' : 'leading-tight'"
                              >
                                {{ sp.text[language] }}
                              </span>
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
                          class="swiper-slide bg-cover bg-center min-h-[80px] w-[140px] cursor-pointer transition box-border custom-active"
                          :class="selectedIndexMap[tab.id] === idx ? 'border-2 swiper-slide-thumb-active' : 'border'"
                          :style="{ backgroundImage: 'url(' + img + ')' }"
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
                    <div><p>{{ tab.areaText[language] }}</p></div>
                    <div class="space-y-2 w-5/6">
                      <div class="flex justify-between lg:flex-row flex-col flex-wrap space-y-2">
                        <div
                          v-for="(sp, i) in tab.specs"
                          :key="tab.id + '-spec-' + i"
                          class="flex gap-5 w-full"
                          :class="isLongText(sp, language) ? 'lg:w-full' : 'lg:w-1/2'"
                        >
                          <span v-if="!isLongText(sp, language)" class="w-[35px] flex" >
                            <img class="m-auto" v-if="sp.icon" :src="sp.icon" :alt="sp.alt">
                          </span>
                          <span
                            class="my-auto"
                            :class="isLongText(sp, language) ? 'leading-relaxed' : 'leading-tight'"
                          >
                            {{ sp.text[language] }}
                          </span>
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
        title: { type: Object, required: true },
        language: { type: String, required: true },
        list: { type: Array, required: true },
        activeTab: { type: String, required: true },

        // ✅ ค่า default (fallback) ถ้า API ไม่มี/ดึงไม่ได้
        amenities: {
          type: Array,
          default: () => [
            { name: { en: "",      th: "" } },
          ]
        },
        amenitiesImage: {
          type: String,
          default: ''
        }
      },

      data() {
        return {
          loading: false,
          amenitiesApi: [],      // data จาก API
          amenitiesImageApi: '', // image จาก API (file name)
          // base path สำหรับรูป amenities จาก backend
          amenitiesImageBasePath: `${STORAGE_BASE}uploads/project_information_amenities/`
        };
      },

      computed: {
        // ✅ เลือกว่าจะใช้ข้อมูลจาก API หรือ fallback เดิม
        amenitiesList() {
          if (this.amenitiesApi.length) {
            // map จาก structure API → structure เดิมที่ template ใช้
            return this.amenitiesApi.map(item => ({
              name: {
                th: item.amenities_name?.th || '',
                en: item.amenities_name?.en || ''
              }
            }));
          }
          return this.amenities;
        },

        // ✅ เลือกรูปจาก API ถ้ามี ไม่งั้นใช้ props เดิม
        amenitiesImageSrc() {
          
          if (this.amenitiesImageApi) {
            return this.amenitiesImageBasePath + this.amenitiesImageApi;
          }
          return this.amenitiesImage;
        },

        // แสดง title ของ tab ปัจจุบัน (ตามโครงเดิมของคุณ)
        currentTabTitle() {
          const tab = this.list.find(item => item.tab === this.activeTab);
          return tab ? tab.name[this.language] : '';
        }
      },

      methods: {
        async fetchAmenities() {
          this.loading = true;
          try {
            const projectId = await findProjectIdFromSeo()

            const res = await axios.get(`${API_BASE}/project/information-amenities/${projectId}`);
            const payload = res.data || {};

            // filter ตัดแถวที่ TH/EN ว่างทั้งคู่
            const rawData = Array.isArray(payload.data) ? payload.data : [];
            this.amenitiesApi = rawData.filter(item => {
              const th = item.amenities_name?.th?.trim() || '';
              const en = item.amenities_name?.en?.trim() || '';
              return th !== '' || en !== '';
            });

            // image จาก API (เป็น file name เช่น "amenities_1765424439.webp")
            if (payload.image) {
              this.amenitiesImageApi = payload.image;
            }
            
          } catch (err) {
            console.error('Error loading amenities:', err);
            // ถ้า error → ปล่อยให้ใช้ fallback เดิม
          } finally {
            this.loading = false;
          }
        }
      },

      mounted() {
        this.fetchAmenities();
      },

      template: `
        <div>
          <div v-if="amenitiesList.length > 0" class="space-y-4">
            <div>
              <h3 class="font-medium text-[20px]">
                {{ currentTabTitle }}
              </h3>
            </div>

            <div class="flex lg:flex-row flex-col-reverse gap-5">
              <div class="lg:w-1/2">
                <ul class="grid grid-cols-1">
                  <li v-if="loading">
                    <p class="my-1">Loading amenities...</p>
                  </li>
                  <li v-else-if="amenitiesList.length === 0">
                    <p class="my-1">-</p>
                  </li>
                  <li v-else v-for="(amenity, index) in amenitiesList" :key="index">
                    <p class="flex my-1">
                      <span class="mr-2">{{ index + 1 }}.</span>
                      <span>{{ amenity.name[language] }}</span>
                    </p>
                  </li>
                </ul>
              </div>

              <div class="lg:w-1/2">
                <img v-if="amenitiesImageSrc" :src="amenitiesImageSrc" alt="amenities image" class="w-full h-auto object-cover">
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

        // fallback ถ้า API ล้มเหลวหรือไม่มีข้อมูล
        services: {
          type: Array,
          default: () => [
            { name: { en: "", th: "" } },
          ]
        },
        servicesImage: {
          type: String,
          default: ''
        }
      },

      data() {
        return {
          loading: false,
          servicesApi: [],       // ✅ data จาก API
          servicesImageApi: '',  // ✅ image จาก API (file name)
          servicesImageBasePath: `${STORAGE_BASE}uploads/project_information_service/`
        };
      },

      computed: {
        // ✅ เลือกข้อมูลจาก API ก่อน ถ้าไม่มีใช้ fallback
        servicesList() {
          if (this.servicesApi.length) {
            return this.servicesApi.map(item => ({
              name: {
                th: item.service_name?.th || '',
                en: item.service_name?.en || ''
              }
            }));
          }
          return this.services;
        },

        // ✅ เลือกรูปจาก API ถ้ามี ไม่งั้นใช้ props เดิม
        servicesImageSrc() {
          if (this.servicesImageApi) {
            return this.servicesImageBasePath + this.servicesImageApi;
          }
          return this.servicesImage;
        },

        // title tab ปัจจุบัน
        currentTabTitle() {
          const tab = this.list.find(item => item.tab === this.activeTab);
          return tab ? tab.name[this.language] : '';
        }
      },

      methods: {
        async fetchServices() {
          this.loading = true;
          try {
            const projectId = await findProjectIdFromSeo();

            // ✅ เรียก API services (ไม่ใช่ amenities)
            const res = await axios.get(`${API_BASE}/project/information-service/${projectId}`);
            const payload = res.data || {};

            const rawData = Array.isArray(payload.data) ? payload.data : [];

            // ✅ filter แถวที่ TH/EN ว่างทั้งคู่ทิ้ง
            this.servicesApi = rawData.filter(item => {
              const th = item.service_name?.th?.trim() || '';
              const en = item.service_name?.en?.trim() || '';
              return th !== '' || en !== '';
            });

            // ✅ image จาก API (file name เช่น "service_1765424439.webp")
            if (payload.image) {
              this.servicesImageApi = payload.image;
            }

          } catch (err) {
            console.error('Error loading services:', err);
            // error → ใช้ fallback เดิม
          } finally {
            this.loading = false;
          }
        }
      },

      mounted() {
        this.fetchServices();
      },

      template: `
        <div>

          <div v-if="servicesList.length > 0" class="space-y-4">
            <div>
              <h3 class="font-medium text-[20px]">
                {{ currentTabTitle }}
              </h3>
            </div>

            <div class="flex lg:flex-row flex-col-reverse gap-5">
              <div class="lg:w-1/2">
                <ul class="grid grid-cols-1">
                  <template v-if="servicesList.length === 0">
                    <li>
                      <p class="my-1">-</p>
                    </li>
                  </template>
                  <template v-else>
                    <li v-for="(service, index) in servicesList" :key="index">
                      <p class="flex my-1">
                        <span class="mr-2">{{ index + 1 }}.</span>
                        <span>{{ service.name[language] }}</span>
                      </p>
                    </li>
                  </template>
                </ul>
              </div>

              <div class="lg:w-1/2">
                <img
                  v-if="servicesImageSrc"
                  :src="servicesImageSrc"
                  alt="services image"
                  class="w-full h-auto object-cover"
                >
              </div>
            </div>
          </div>
        </div>
      `
    };

    // ---------- ฟังก์ชันเกี่ยวกับ mobile tab ----------
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

    // ---------- Modal big image ----------
    const openBigImage = (id, images) => {
      currentModalId.value    = id;
      currentModalImages.value = images;
      isModalVisible.value     = true;

      nextTick(() => {
        const activeSlide = document.querySelector(`#${id}-modal .swiper-slide-active`);
        const activeIndex = activeSlide ? parseInt(activeSlide.dataset.item, 10) : 0;

        const swiperInstance = new Swiper(`#${id}-modal .floorplan-image-swiper`, {
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

    // ---------- Download brochure ----------
    const projectDetailDownloadBrochure = () => {
      const tracking = {
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
      };

      if (typeof setDataLayer === 'function') {
        setDataLayer(tracking);
      }

      if (!brochureUrl.value) {
        console.warn('No brochure file');
        return;
      }

      const link = document.createElement('a');
      link.href = brochureUrl.value;

      // ✅ ใช้ชื่อจาก API ถ้ามี
      link.download = brochureFilename.value || 'project-brochure.pdf';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };


 
    const sectionComponents = reactive({
      projectDetails: ProjectDetailsContent,
      masterPlan: PlanContent,
      floorPlan: PlanContent,   // default จะไปสลับเป็น PlanContent2 ทีหลัง
      unitPlan: PlanContent,
      Amenities: AmenitiesContent,
      Services: ServicesContent
    });
    // ---------- Lifecycle ----------
    onMounted(async () => {
      language.value = getLanguageFromPath();
      brochure.value = language.value === 'th' ? 'ดาวน์โหลดโบรชัวร์' : 'Download Brochure';

      updateIsMobile();
      window.addEventListener('resize', updateIsMobile);

      await fetchProjectInformationArea();

      // 👇 เพิ่มบรรทัดนี้
      await checkMasterPlanSection();
      await checkFloorPlanSection();
      await checkUnitPlanSection();

      if (window.AOS) {
        AOS.init();
      }
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateIsMobile);
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
      brochureUrl,
      projectDetailDownloadBrochure,

      // สี / font จาก API + logic
      projectTabColor,
      projectBackgroundColor,
      projectDetailArea,
      contentBgColor,
      contentTextClass,
      tabTextClass,
      mobileTabBackgroundColor,
      mobileTabTextClass,
      isEnabled
    };
  }
});
