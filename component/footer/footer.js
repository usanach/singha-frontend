
const FooterComponent = defineComponent({
  name: 'FooterComponent',
  setup() {
    const sections = ref([]);
    const language = ref('th');
    const address = ref('');

    // toggle คลาส expanded
    const expandFooter = (el) => {
      el.classList.toggle('expanded');
    };

    // ฟังก์ชัน tracking และเปิดหน้าใหม่
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

    const loadData = async () => {
      language.value = getLanguageFromPath();

      // โหลด footer.json
      const { data: footerJson } = await axios.get('/data/footer.json');
      sections.value = footerJson;

      // Map ข้อมูล address ตามภาษา
      const addrMap = {
        en: `SINGHA ESTATE <br>PUBLIC COMPANY LIMITED <br>SUNTOWERS Building B, 40th Floor, 
             <br>123 Vibhavadi-Rangsit Road, Chom Phon, <br>Chatuchak, Bangkok 10900`,
        th: `บริษัท สิงห์ เอสเตท จำกัด (มหาชน) <br> อาคารซันทาวเวอร์ส บี, ชั้น 40 เลขที่ 123 <span
             class="text-nowrap">ถนนวิภาวดีรังสิต</span> <span class="text-nowrap">แขวงจอมพล</span>
             เขตจตุจักร​ กรุงเทพมหานคร 10900`
      };
      address.value = addrMap[language.value];
    };

    onMounted(loadData);

    return {
      sections,
      language,
      address,
      expandFooter,
      selectFooterSubHeader,
      selectFooterProperty
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
</section>
  `
});