const FooterComponent = defineComponent({
  name: 'FooterComponent',
  setup() {
    const sections = ref([]);
    const language = ref('th');
    const address = ref('');

    const expandFooter = (el) => {
      el.classList.toggle('expanded');
    };

    const selectFooterSubHeader = (el) => {
      const href = el.dataset.href;
      window.open(href, '_blank');
    };

    const selectFooterProperty = (el) => {
      const href = el.dataset.href;
      window.open(href, '_blank');
    };

    const getLanguageFromPath = () => {
      const m = window.location.pathname.match(/\/(th|en)(\/|$)/);
      return m ? m[1] : 'th';
    };

    // label map จาก API (new_project / ready_to_move / sold_out / normal)
    const normalizeLabel = (code) => {
      const map = {
        new_project: 'New Project',
        ready_to_move: 'Ready to Move',
        ready_to_move_in: 'Ready to Move',
        sold_out: 'Sold Out',
        normal: '',
      };
      return map[code] ?? '';
    };

    // map title ของ category สำหรับ footer
    const categoryTitleMap = {
      'บ้านเดี่ยว': { th: 'บ้านเดี่ยว', en: 'DETACHED HOUSE' },
      'ไพรเวท เอสเตท': { th: 'ไพรเวท เอสเตท', en: 'PRIVATE ESTATE' },
      'โฮม ออฟฟิศ': { th: 'โฮม ออฟฟิศ', en: 'HOME OFFICE' },
      'คอนโดมิเนียม': { th: 'คอนโดมิเนียม', en: 'CONDOMINIUM' },
    };

    const buildCategoryUrl = (typeTh) => {
      const isCondo = typeTh === 'คอนโดมิเนียม';
      return {
        th: isCondo ? '/th/condominium' : '/th/house',
        en: isCondo ? '/en/condominium' : '/en/house',
      };
    };

    const buildFooterSectionsFromApi = (masters, projects) => {
      // ✅ 1) masterById: master.id -> master
      const masterById = {};
      masters.forEach((m) => {
        if (m?.id != null) masterById[String(m.id)] = m;
      });

      // ✅ 2) projectsByMasterId: project.filter_component_item_l2_id -> [projects]
      const projectsByMasterId = {};
      projects.forEach((p) => {
        const masterId = String(p?.filter_component_item_l2_id || '');
        if (!masterId) return;
        if (!projectsByMasterId[masterId]) projectsByMasterId[masterId] = [];
        projectsByMasterId[masterId].push(p);
      });

      // ✅ 3) group masters by type (filter_component_item_l1_id)
      const mastersByType = {};
      masters.forEach((m) => {
        const typeTh = m?.filter_component_item_l1_id;
        if (!typeTh) return;
        if (!mastersByType[typeTh]) mastersByType[typeTh] = [];
        mastersByType[typeTh].push(m);
      });

      
      // helper build category object
      const buildCategory = (typeTh) => {
        const masterList = mastersByType[typeTh] || [];
        if (!masterList.length) return null;

        return {
          id: `cat-${typeTh}`,
          type: 'category',
          title: categoryTitleMap[typeTh] || { th: typeTh, en: typeTh },
          url: buildCategoryUrl(typeTh),

          // brands
          items: masterList
            .map((master) => {
              const masterId = String(master.id);
              const brandTitle = master?.title || { th: '', en: '' };

              // ✅ match ตรงนี้: filter_component_item_l2_id กับ master.id
              const matchedProjects = projectsByMasterId[masterId] || [];

              // ถ้า brand ไม่มี project ไม่ต้องแสดง (กัน list ว่าง)
              if (!matchedProjects.length) return null;

              return {
                id: `brand-${masterId}`,
                type: 'brand',
                title: brandTitle,

                // sub-brand projects
                items: matchedProjects.map((p, idx) => {
                  const locTh = (p?.location?.th || '').trim();
                  const locEn = (p?.location?.en || '').trim();

                  const brandTh = (brandTitle.th || '').trim();
                  const brandEn = (brandTitle.en || '').trim();

                  return {
                    id: `sub-${masterId}-${p?.id ?? idx}`,
                    type: 'sub-brand',
                    price: p?.price?.[language.value] || p?.price?.th || p?.price?.en || '',
                    label: normalizeLabel(p?.label),
                    title: {
                      th: `${brandTh} ${locTh}`.trim(),
                      en: `${brandEn} ${locEn}`.trim(),
                    },
                    url: p?.url || { th: '#', en: '#' },
                  };
                }),
              };
            })
            .filter(Boolean),
        };
      };

      const buildJointVentureCategory = () => ({
        id: 'cat-jv',
        type: 'category',
        title: {
          en: 'JOINT VENTURES',
          th: 'โครงการร่วมทุน',
        },
        items: [
          {
            id: 'brand-jv',
            type: 'brand',
            title: { en: '', th: '' },
            items: [
              {
                id: 'sub-jv-1',
                type: 'sub-brand',
                price: 'Start 23.9 MB',
                label: 'Ready to Move',
                title: { th: 'วัน ริเวอร์ พระราม 3', en: 'One River Rama 3' },
                url: { th: 'https://oneriverrama3.com/', en: 'https://oneriverrama3.com/' },
              },
            ],
          },
        ],
      });

      // section 1: house = บ้านเดี่ยว / ไพรเวท เอสเตท / โฮม ออฟฟิศ
      const houseTypes = ['บ้านเดี่ยว', 'ไพรเวท เอสเตท', 'โฮม ออฟฟิศ'];
      const houseCategories = houseTypes.map(buildCategory).filter(Boolean);

      // section 2: condo
      const condoTypes = ['คอนโดมิเนียม'];
      const condoCategories = condoTypes.map(buildCategory).filter(Boolean);
      // section 3: pages (static เหมือนเดิม)
      const pageSection = {
        id: 'section-pages',
        type: 'section',
        items: [
          {
            id: 'page-promotion',
            type: 'page',
            title: { en: 'PROMOTION', th: 'โปรโมชั่น' },
            url: { en: '/en/campaigns', th: '/th/campaigns' },
          },
          {
            id: 'page-news',
            type: 'page',
            title: { en: 'NEWS & ACTIVITIES', th: 'ข่าวโครงการและกิจกรรม' },
            url: { en: 'https://singhaestate.co.th/en/news-room', th: 'https://singhaestate.co.th/th/news-room' },
          },
          {
            id: 'page-sustainability',
            type: 'page',
            title: { en: 'OUR SUSTAINABILITY', th: 'การพัฒนาที่ยั่งยืน' },
            url: { en: 'https://www.singhaestate.co.th/en/sustainability', th: 'https://www.singhaestate.co.th/th/sustainability' },
          },
          {
            id: 'page-ir',
            type: 'page',
            title: { en: 'INVESTOR RELATION', th: 'นักลงทุนสัมพันธ์' },
            url: { en: 'https://investor.singhaestate.co.th/en/', th: 'https://investor.singhaestate.co.th/th/' },
          },
          {
            id: 'page-partner',
            type: 'page',
            title: { en: 'BECOME A PARTNER AGENT', th: 'สมัครตัวแทนขายโครงการ' },
            url: { en: '/en/contact-us/partner-agent', th: '/th/contact-us/partner-agent' },
          },
          {
            id: 'page-privacy',
            type: 'page',
            title: { en: 'PRIVACY NOTICE', th: 'ประกาศความเป็นส่วนตัว' },
            url: { en: 'https://www.singhaestate.co.th/en/privacy-notice', th: 'https://www.singhaestate.co.th/th/privacy-notice' },
          },
          {
            id: 'page-contact',
            type: 'page',
            title: { en: 'CONTACT US', th: 'ติดต่อเรา' },
            url: { en: '/en/contact-us', th: '/th/contact-us' },
          },
          {
            id: 'page-offer',
            type: 'page',
            title: { en: 'Property offer: Land/office/Hotel', th: 'สิงห์ เอสเตท รับซื้อที่ดิน' },
            url: { en: 'https://property.singhaestate.co.th/en/property-offer', th: 'https://property.singhaestate.co.th/th/property-offer' },
          },
          {
            id: 'page-sitemap',
            type: 'page',
            title: { en: 'SITEMAP', th: 'แผนผังเว็บไซต์' },
            url: { en: '/en/sitemap', th: '/th/sitemap' },
          },
        ],
      };
      condoCategories.push(buildJointVentureCategory());
      return [
        { id: 'section-house', type: 'section', items: houseCategories },
        { id: 'section-condo', type: 'section', items: condoCategories, },
        // buildJointVentureSection(),
        pageSection,
      ];
    };

    const loadData = async () => {
      try {
        language.value = getLanguageFromPath();

        // Map address ตามภาษา (เหมือนเดิม)
        const addrMap = {
          en: `SINGHA ESTATE <br>PUBLIC COMPANY LIMITED <br>SUNTOWERS Building B, 40th Floor, 
               <br>123 Vibhavadi-Rangsit Road, Chom Phon, <br>Chatuchak, Bangkok 10900`,
          th: `บริษัท สิงห์ เอสเตท จำกัด (มหาชน) <br> อาคารซันทาวเวอร์ส บี, ชั้น 40 เลขที่ 123 <span
               class="text-nowrap">ถนนวิภาวดีรังสิต</span> <span class="text-nowrap">แขวงจอมพล</span>
               เขตจตุจักร​ กรุงเทพมหานคร 10900`,
        };
        address.value = addrMap[language.value];

        // ✅ โหลดจาก api.js
        const [masterRes, projectRes] = await Promise.all([
          getGlobalProjectBrand(),  
          getGlobalProjectLocation(), 
        ]);

        const masters = masterRes?.data?.data || [];
        const projects = projectRes?.data?.data || [];
        sections.value = buildFooterSectionsFromApi(masters, projects);
      } catch (err) {
        console.error('Footer loadData error:', err);
        sections.value = [];
      }
    };

    onMounted(loadData);

    return {
      sections,
      language,
      address,
      expandFooter,
      selectFooterSubHeader,
      selectFooterProperty,
    };
  },

  template: `
<section id="footer" class="font-['SinghaEstate']">
  <div class="bg-[#E9E2DC] lg:pt-5 pb-0 text-[#1A2F4D]">
    <div class="container">
      <div class="flex flex-wrap">
        <!-- Left 3/4 -->
        <div class="lg:w-3/4 w-full flex flex-wrap lg:flex-nowrap pt-10 gap-1">
          <div
            v-for="(section, sIdx) in sections"
            :key="sIdx"
            class="flex flex-col lg:w-1/3 w-full gap-2 relative"
          >
            <ul class="flex flex-col lg:space-y-1 space-y-2">
              <li
                v-for="(cat, cIdx) in section.items"
                :key="cIdx"
                class="relative expand"
                @click="expandFooter($event.currentTarget)"
              >
                <div>
                  <!-- ถ้ามี link -->
                  <button
                    v-if="cat.url&&!cat.items"
                    type="button"
                    class="relative w-full text-left"
                    :data-href="cat.url[language]"
                    :data-sub_header="cat.title[language]"
                    @click.stop="selectFooterSubHeader($event.currentTarget)"
                  >
                    <p class="text-[14px] font-bold uppercase">
                      {{ cat.title[language] }}
                    </p>
                  </button>

                  <!-- ถ้าไม่มี link ให้เป็น expandable list -->
                  <template v-else>
                    <button
                      type="button"
                      class="relative w-full text-left lg:cursor-text cursor-pointer"
                      :class="[cIdx>0?'lg:mt-5':'']"
                    >
                      
                      <p 
                        class="text-[14px] font-bold cursor-pointer" 
                        v-if="cat.url"
                        :data-href="cat.url[language]"
                        :data-sub_header="cat.title[language]"
                        @click.stop="selectFooterSubHeader($event.currentTarget)"
                      >
                        {{ cat.title[language] }}
                      </p>
                      <template v-else>
                          <p class="text-[14px] font-bold" >
                            {{ cat.title[language] }}
                          </p>
                      </template>
                      <div class="footer-expand-icon">
                        <img src="/assets/icon/plus-black.svg" class="w-full open" />
                        <img src="/assets/icon/minus-black.svg" class="w-full close" />
                      </div>
                    </button>

                    <ul v-if="cat.items" class="flex-col gap-1 list mt-1">
                      <li
                        v-for="(brand, bIdx) in cat.items"
                        :key="bIdx"
                        :class="brand.title[language] ? 'gap-1' : ''"
                        class="flex flex-col"
                      >
                        <p 
                          class="text-[14px] cursor-pointer"
                          v-if="brand.url"
                          :data-href="brand.url[language]"
                          :data-sub_header="brand.title[language]"
                          @click.stop="selectFooterSubHeader($event.currentTarget)"
                        >
                          <b>{{ brand.title[language] }}</b>
                        </p>
                        <template v-else>
                            <p class="text-[14px]" >
                              <b>{{ brand.title[language] }}</b>
                            </p>
                        </template>
                        <ul class="flex flex-col gap-1">
                          <li
                            v-for="(sub, subIdx) in brand.items"
                            :key="subIdx"
                            class="text-[14px] cursor-pointer"
                            :data-href="sub.url[language]"
                            @click.stop="selectFooterProperty($event.currentTarget)"
                            :data-property_brand="brand.title[language]"
                            :data-project_label="sub.label"
                            :data-property_location="sub.title[language]"
                            :data-property_price="sub.price"
                            :data-property_type="cat.title[language]"
                          >
                            {{ sub.title[language] }}
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </template>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right 1/4 -->
        <div class="flex flex-col lg:w-1/4 w-full gap-5 lg:pt-3 pt-5">
          <div class="w-full flex flex-col gap-5">
            <img
              src="/assets/image/residential/logo-footer.svg"
              class="lg:w-[170px] w-[150px]"
            />
            <p class="text-[14px]" v-html="address"></p>
          </div>
          <div class="w-full flex flex-col gap-2">
            <a href="tel:1221">
              <p class="uppercase text-[35px]"><b>call 1221</b></p>
            </a>
            <div class="flex gap-5">
              <a href="https://www.facebook.com/SinghaEstate" target="_blank">
                <img src="/assets/facebook.svg" class="w-[30px]" />
              </a>
              <a href="https://www.instagram.com/singhaestate_residential" target="_blank">
                <img src="/assets/ig.svg" class="w-[30px]" />
              </a>
              <a href="https://lin.ee/8hJoAxK" target="_blank">
                <img src="/assets/line.svg" class="w-[30px]" />
              </a>
              <a href="https://www.youtube.com/SinghaEstatePCL" target="_blank">
                <img src="/assets/youtube.svg" class="w-[30px]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr class="border border-[#D1BFAF] my-5 mb-0" />
      <div class="flex justify-between flex-wrap gap-3 py-2">
        <div class="md:text-right text-center text-[12px]">
          Copyright © {{ new Date().getFullYear() }}, Singha Estate Public Company Limited.
        </div>
      </div>
    </div>
  </div>
</section>` // ✅ template เดิมของคุณใช้ต่อได้เลย
});
