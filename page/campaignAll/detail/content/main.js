let promotionData;


// Define the Header component
const ContentComponent = defineComponent({
    name: 'ContentComponent',
    template: `
<div class="min-h-screen">
    <section class="campaign-detail-section">
        <div class="baner-wrapper">
            <div class="background-wrapper">
                <div class="blur-container"></div>
                <img
                    class="banner-bg"
                    :src="promotionImage || '/assets/image-new/promotion/1bed/noLogo/S36_1BR_500K resized banners without call & SE logo_Detail Desktop_1324X582.webp'"
                    alt=""
                >
            </div>

            <div class="banner-text-wrappper gap-5">
                <div class="title-text-wrapper wrapper-space-bottom">
                    <!-- ดึงจาก API: data_title[lang] -->
                    <h1 class="header-text uppercase text-black" v-html="promotionTitle"></h1>
                </div>
                <div class="time-promo-wrapper">
                    <!-- ดึงจาก API: data_concept_[lang] หรือ data_concept -->
                    <p class="time-promo text-black">{{ promotionConcept }}</p>
                </div>
                <div class="promo-image-wrapper">
                    <img
                        class="promo-image lg:block hidden"
                        :src="promotionImage || '/assets/image-new/promotion/1bed/noLogo/S36_1BR_500K resized banners without call & SE logo_Detail Desktop_1324X582.webp'"
                        alt=""
                    >
                    <img
                        class="promo-image lg:hidden block mx-auto"
                        :src="promotionImage || '/assets/image-new/promotion/1bed/noLogo/S36_1BR_500K resized banners without call & SE logo_Detail MB_396X392.webp'"
                        alt=""
                    >
                </div>
            </div>
        </div>

        <!-- social-mobile เดิมทั้งหมด ไม่เปลี่ยน -->
        <div class="social-mobile" onclick="socialClick(this)">
            <div class="social-mobile-wrapper">
                <div id="social-mobile" class="social-mobile-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.507" height="18.242" viewBox="0 0 16.507 18.242">
                        <path id="social-media_84337"
                            d="M15.2,13.182a2.528,2.528,0,0,0-2.11,1.138L7.562,11.339a2.844,2.844,0,0,0,0-2.68l4.8-3.134a3.445,3.445,0,1,0-.391-.694L7.093,8.016a2.857,2.857,0,1,0,0,3.97l5.672,3.06A2.528,2.528,0,1,0,15.2,13.182ZM15.2.794a2.7,2.7,0,1,1-2.7,2.7A2.7,2.7,0,0,1,15.2.794ZM5.04,12.062A2.063,2.063,0,1,1,7.1,10,2.065,2.065,0,0,1,5.04,12.062ZM15.2,17.447a1.735,1.735,0,1,1,1.735-1.735A1.737,1.737,0,0,1,15.2,17.447Z"
                            transform="translate(-2.183)" fill="#958568"></path>
                    </svg>
                </div>
                <a data-href="{{campaign.share.facebook}}" class="social-mobile-block" onclick="socialMediaShare(this)"
                    data-button="facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.667" height="16.667" viewBox="0 0 16.667 16.667">
                        <path id="Path_17" data-name="Path 17"
                            d="M16.834,9.051A8.334,8.334,0,1,0,7.2,17.333V11.474H5.082V9.051H7.2V7.2a2.95,2.95,0,0,1,3.148-3.262,12.739,12.739,0,0,1,1.865.164V6.169H11.161A1.208,1.208,0,0,0,9.8,7.478V9.051h2.311l-.37,2.424H9.8v5.859A8.371,8.371,0,0,0,16.834,9.051Z"
                            transform="translate(-0.167 -0.667)" fill="#948668"></path>
                    </svg>
                </a>
                <a data-href="{{campaign.share.instagram}}" class="social-mobile-block" onclick="socialMediaShare(this)"
                    data-button="instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.667" height="16.667" viewBox="0 0 16.667 16.667">
                        <path id="Path_18" data-name="Path 18"
                            d="M5.049.725a6.078,6.078,0,0,0-2.022.391,4.078,4.078,0,0,0-1.474.964A4.082,4.082,0,0,0,.595,3.557,6.123,6.123,0,0,0,.212,5.581C.172,6.468.164,6.753.168,9.016s.014,2.547.057,3.436a6.091,6.091,0,0,0,.391,2.021,4.083,4.083,0,0,0,.964,1.474,4.079,4.079,0,0,0,1.478.958,6.118,6.118,0,0,0,2.023.383c.887.039,1.173.048,3.435.044s2.547-.014,3.436-.056a6.1,6.1,0,0,0,2.021-.391,4.259,4.259,0,0,0,2.432-2.442,6.1,6.1,0,0,0,.383-2.023c.039-.89.048-1.174.044-3.436s-.015-2.546-.057-3.435a6.086,6.086,0,0,0-.391-2.022,4.091,4.091,0,0,0-.964-1.474,4.067,4.067,0,0,0-1.478-.958A6.1,6.1,0,0,0,11.92.711C11.033.673,10.748.663,8.484.668S5.938.682,5.049.725Zm.1,15.065A4.626,4.626,0,0,1,3.6,15.506a2.594,2.594,0,0,1-.96-.622,2.566,2.566,0,0,1-.625-.957,4.615,4.615,0,0,1-.29-1.547c-.041-.878-.05-1.142-.055-3.367s0-2.488.042-3.367A4.612,4.612,0,0,1,2,4.1a2.581,2.581,0,0,1,.622-.96,2.573,2.573,0,0,1,.957-.625,4.615,4.615,0,0,1,1.547-.29c.879-.042,1.142-.05,3.367-.055s2.488,0,3.368.042A4.608,4.608,0,0,1,13.4,2.5a2.577,2.577,0,0,1,.96.622,2.571,2.571,0,0,1,.625.958,4.594,4.594,0,0,1,.29,1.546c.042.879.051,1.142.055,3.367s0,2.489-.042,3.367a4.628,4.628,0,0,1-.283,1.548,2.76,2.76,0,0,1-1.579,1.584,4.617,4.617,0,0,1-1.546.29c-.879.041-1.142.05-3.368.055s-2.488,0-3.367-.042M11.94,4.546a1,1,0,1,0,.292-.707A1,1,0,0,0,11.94,4.546ZM4.222,9.008A4.279,4.279,0,1,0,8.492,4.721,4.279,4.279,0,0,0,4.222,9.008Zm1.5,0a2.777,2.777,0,1,1,.213,1.063A2.778,2.778,0,0,1,5.723,9.005Z"
                            transform="translate(-0.167 -0.667)" fill="#948668"></path>
                    </svg>
                </a>
                <a class="social-mobile-block" onclick="socialMediaShare(this)" data-button="link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16.667" height="16.667" viewBox="0 0 16.667 16.667">
                        <path id="Path_19" data-name="Path 19"
                            d="M9.731,1.877a4.167,4.167,0,0,1,5.892,5.892l-.01.01L12.28,11.113a4.167,4.167,0,0,1-5.892,0A.833.833,0,0,1,7.566,9.934a2.5,2.5,0,0,0,3.535,0h0l3.328-3.328a2.5,2.5,0,0,0-3.535-3.535l-.911.911A.833.833,0,0,1,8.8,2.8l.917-.917Zm-5.01,5.01a4.167,4.167,0,0,1,5.892,0A.833.833,0,0,1,9.434,8.066a2.5,2.5,0,0,0-3.535,0h0L2.566,11.4l-.01.01a2.5,2.5,0,1,0,3.535,3.535l.01-.011.918-.917A.833.833,0,1,1,8.2,15.2l-.913.913a4.167,4.167,0,1,1-5.892-5.892Z"
                            transform="translate(-0.126 -0.708)" fill="#948668" fill-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
        </div>

        <div class="relative">
            <!-- social desktop -->
            <div class="absolute left-[4.5%] h-full top-0 bottom-0">
                <div class="social">
                    <div class="share-wrapper">
                        <div class="share-text-wrapper icon-wrapper">
                            <p class="social-text"></p>
                            <p class="share-text">Share</p>
                            <p></p>
                        </div>
                        <div class="facebook-icon-wrapper icon-wrapper">
                            <a class="social-icon" data-href="{{campaign.share.facebook}}" onclick="socialMediaShare(this)"
                                data-button="facebook">
                                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20 10.6612C20 5.10461 15.5229 0.600098 10 0.600098C4.47715 0.600098 0 5.10461 0 10.6612C0 15.6829 3.65684 19.8453 8.4375 20.6001V13.5695H5.89844V10.6612H8.4375V8.44462C8.4375 5.92306 9.93047 4.53022 12.2146 4.53022C13.3088 4.53022 14.4531 4.72673 14.4531 4.72673V7.2027H13.1922C11.95 7.2027 11.5625 7.97831 11.5625 8.77397V10.6612H14.3359L13.8926 13.5695H11.5625V20.6001C16.3432 19.8453 20 15.6831 20 10.6612Z"
                                        fill="#948667"></path>
                                </svg>
                            </a>
                        </div>
                        <div class="chain-icon-wrapper icon-wrapper">
                            <a class="social-icon" onclick="socialMediaShare(this)" data-button="link">
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M11.7313 2.87726C12.5172 2.11827 13.5697 1.69829 14.6622 1.70778C15.7547 1.71728 16.7997 2.15548 17.5723 2.92801C18.3448 3.70055 18.783 4.7456 18.7925 5.83809C18.802 6.93057 18.382 7.98308 17.623 8.76893L17.6129 8.77925L14.2795 12.1126C13.4982 12.8937 12.4385 13.3326 11.3336 13.3326C10.2288 13.3326 9.16914 12.8938 8.38777 12.1127C8.06228 11.7873 8.0622 11.2597 8.38759 10.9342C8.71298 10.6087 9.24062 10.6086 9.5661 10.934C10.0349 11.4027 10.6707 11.666 11.3336 11.666C11.9965 11.666 12.6322 11.4027 13.101 10.9341C13.101 10.9341 13.101 10.934 13.101 10.9341L16.4289 7.60621C16.8813 7.13523 17.1316 6.50581 17.1259 5.85257C17.1202 5.19708 16.8573 4.57005 16.3937 4.10653C15.9302 3.64301 15.3032 3.38008 14.6477 3.37439C13.9944 3.36871 13.365 3.61896 12.894 4.07141L11.9829 4.98259C11.6574 5.30802 11.1298 5.30802 10.8043 4.98259C10.4789 4.65715 10.4789 4.12951 10.8043 3.80408L11.721 2.88741L11.7313 2.87726ZM6.7211 7.88732C7.50247 7.10619 8.56209 6.66738 9.66694 6.66738C10.7718 6.66738 11.8314 7.10619 12.6128 7.88732C12.9383 8.21271 12.9383 8.74035 12.6129 9.06583C12.2876 9.39132 11.7599 9.3914 11.4344 9.06601C10.9656 8.59733 10.3298 8.33404 9.66694 8.33404C9.00407 8.33404 8.36834 8.5973 7.89953 9.06592C7.8995 9.06595 7.89956 9.06589 7.89953 9.06592L4.56619 12.3993L4.55586 12.4094C4.31709 12.64 4.12663 12.9159 3.99561 13.2209C3.86459 13.5259 3.79562 13.854 3.79274 14.1859C3.78985 14.5179 3.85311 14.8471 3.97881 15.1543C4.10451 15.4615 4.29014 15.7407 4.52488 15.9754C4.75961 16.2101 5.03874 16.3958 5.34598 16.5215C5.65322 16.6472 5.98242 16.7104 6.31437 16.7075C6.64631 16.7046 6.97436 16.6357 7.27938 16.5047C7.58438 16.3736 7.86025 16.1832 8.09086 15.9444L8.10128 15.9338L9.01962 15.0163C9.3452 14.691 9.87284 14.6913 10.1981 15.0168C10.5234 15.3424 10.5232 15.8701 10.1976 16.1954L9.28422 17.1079C8.90096 17.5032 8.44314 17.8187 7.9372 18.036C7.42885 18.2544 6.8821 18.3693 6.32885 18.3741C5.7756 18.3789 5.22694 18.2735 4.71487 18.064C4.2028 17.8545 3.73758 17.5451 3.34636 17.1539C2.95514 16.7627 2.64576 16.2975 2.43625 15.7854C2.22675 15.2733 2.12133 14.7247 2.12613 14.1714C2.13094 13.6182 2.24588 13.0714 2.46425 12.5631C2.68162 12.0571 2.99713 11.5992 3.39251 11.2159L6.7211 7.88732Z"
                                        fill="#948668"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="detail-wrapper">
                <div class="event-wrapper">
                    <div id="event-list" class="event-list ql-editor" v-html="promotionDetail"></div>
                </div>

                <!-- multi-campaign: แสดงเฉพาะตอนเป็น promotion_mode = 'multi' -->
                <div class="mt-5 multi-campaign" style="padding-bottom: 0rem;"
                     v-if="isMultiMode && multiGroups.length">
                    <a href="tel:1221">
                        <p style="color:#fff;background-color:#948667;text-align:center;font-size:20px;border:1px solid
                            #948667;max-width:150px;padding:10px;margin:auto">โทร 1221</p>
                    </a>
                    <div class="prod-list ">
                        <br><br>
                        <p style="font-size:20px;color:#152f52;font-weight:600;text-align:center">
                            Register for your privilege
                        </p>
                        <br>
                        <ul class="list">
                            <li v-for="(group, gIndex) in multiGroups"
                                :key="gIndex"
                                style="font-size:20px">
                                <ul class="card-list">
                                    <li v-for="(card, idx) in group.items" :key="idx" class="max-w-[260px]">
                                        <ul class="card shadow-xl h-full justify-between">
                                            <li class="w-full" :style="{ backgroundImage: 'url(' + card.image + ')' }"></li>
                                            <li >
                                                <div class="w-1/2 m-auto">
                                                    <img :src="card.logo" :alt="card.alt" class="h-full">
                                                </div>
                                            </li>
                                            <li>
                                                <a target="_blank" :href="card.link" @click="toProjectClick(card)">
                                                    <button type="button">{{ card.btn }}</button>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                                <br>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="signature-wrapper">
                    <div class="signature-location">
                        <p class="signature-title font-bold"></p>
                        <p class="signature-desc"></p>
                    </div>
                    <div class="signature-comfort">
                        <p class="signature-title font-bold"></p>
                        <p class="signature-desc"></p>
                    </div>
                    <div class="signature-living">
                        <p class="signature-title font-bold"></p>
                        <p class="signature-title-addition font-bold"></p>
                        <p class="signature-desc"></p>
                    </div>
                </div>
            </div>

        </div>
    </section>
</div>
`,
setup() {
  const language = ref('th');

  const promotionTitle   = ref('');
  const promotionConcept = ref('');
  const promotionDetail  = ref('');
  const promotionImage   = ref('');

  const isMultiMode  = ref(false);
  const multiGroups  = ref([]);

  const getLanguageFromPath = () => {
    const match = window.location.pathname.match(/\/(th|en)(\/|$)/);
    return match ? match[1] : 'th';
  };

  const getGroupTitleFromBrand = (lang, l1) => {
    const key = (l1 || '').toLowerCase();
    if (lang === 'th') return l1 || 'โครงการ';

    if (key.includes('บ้าน')) return 'Detached House';
    if (key.includes('คอนโด')) return 'Condominium';
    if (key.includes('ทาวน์')) return 'Townhome';
    return 'Projects';
  };

  const buildMultiCampaignFromProjectItems = async (matched, lang, storage) => {
    const [projectRes, brandRes] = await Promise.all([
      getGlobalProjectLocation(),
      getGlobalProjectBrand(),
    ]);

    const projectList = projectRes.data?.data || [];
    const brandList   = brandRes.data?.data || [];

    const byId = new Map();
    projectList.forEach(p => byId.set(Number(p.id), p));

    const brandByName = new Map();
    brandList.forEach(b => {
      if (b.title?.th) brandByName.set(b.title.th.trim(), b);
    });

    const rawItems = Array.isArray(matched.project_items)
      ? matched.project_items
      : Object.values(JSON.parse(matched.project_items || '{}'));

    const groupMap = {};

    rawItems.forEach(item => {
      const loc = byId.get(Number(item.project_id));
      if (!loc) return;

      const brand = brandByName.get(loc.filter_component_item_l2_id?.trim());
      const groupKey = (brand?.filter_component_item_l1_id || 'โครงการ').toLowerCase();

      if (!groupMap[groupKey]) {
        groupMap[groupKey] = {
          typeTitle: getGroupTitleFromBrand(lang, brand?.filter_component_item_l1_id),
          items: [],
        };
      }

      groupMap[groupKey].items.push({
        image: `${storage}uploads/filter_component_item/${loc.thumb}`,
        logo: loc.logo ? `${storage}uploads/filter_component_item/${loc.logo}` : '',
        alt: loc.filter_component_item_l2_id || '',
        link: loc.url?.[lang] || '#',
        btn: item[`btn_${lang}`] || (lang === 'th' ? 'คลิกเพื่อรับสิทธิพิเศษ' : 'Register'),
      });
    });

    multiGroups.value = Object.values(groupMap);
  };

  const loadTemplate = async () => {
    const lang = getLanguageFromPath();
    language.value = lang;

    const res = await getPromotion();
    const all = res.data?.['sub-data'] || [];

    const matched = all.find(i =>
      (lang === 'th' ? i.data_url_th : i.data_url_en) === window.location.pathname
    );
    if (!matched) return;

    promotionTitle.value =
      matched.data_title?.[lang]?.replace(/\n/g, '<br>') || '';

    promotionConcept.value =
      matched[`data_concept_${lang}`] || matched.data_concept || '';

    promotionDetail.value =
      matched[`data_detail_${lang}`] || '';

    if (matched.image_1) {
      promotionImage.value =
        `/storage/uploads/promotion_item_data/${matched.image_1.replace(/^\/+/, '')}`;
    }

    const count = Array.isArray(matched.project_items)
      ? matched.project_items.length
      : Object.keys(matched.project_items || {}).length;

    isMultiMode.value = count > 1;

    if (isMultiMode.value) {
      await buildMultiCampaignFromProjectItems(matched, lang, '/storage/');
    } else {
      multiGroups.value = [];
    }
  };

  onMounted(async () => {
    await loadTemplate();
    nextTick(() => {
      AOS.init();
      pageLoad();
    });
  });

  return {
    language,
    promotionTitle,
    promotionConcept,
    promotionDetail,
    promotionImage,
    isMultiMode,
    multiGroups,
  };
}

});


const landing_page = "campaign_detal_page";

function pageLoad() {
    var tracking = {
        event: "view_promotion",
        landing_page: landing_page,
        section: "campaign_detal",
        event_action: "view",
        ...promotionData
    };

    setDataLayer(tracking);
}

function socialMediaShare(ev) {
    var tracking = {
        event: "share_promotion",
        landing_page: landing_page,
        section: "campaign_detal",
        event_action: "share",
        button: ev.dataset["button"],
        ...promotionData
    };

    if (ev.dataset['button'] == "facebook") {
        window.open(ev.dataset['href'], '_blank', 'width=600,height=400');
    } else if (ev.dataset['button'] == "instagram") {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.location.href = `instagram://library?AssetPath=${encodeURIComponent(ev.dataset['href'])}`;
        } else {
            console.log('Instagram sharing is only supported on mobile devices.');
        }
    } else {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            alert('URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy URL: ', err);
        });
    }
    setDataLayer(tracking);
}

function toProject(ev) {
    var tracking = {
        event: "view_project",
        landing_page: landing_page,
        section: "property_collection",
        event_action: "click",
        button: "see_the_project",
        promotion_name: promotionData.promotion_name,
        property_brand: promotionData.property_brand,
        project_label: promotionData.project_label,
        property_type: promotionData.property_type,
        property_location: promotionData.property_location,
        property_price: promotionData.property_price,
    };

    setDataLayer(tracking);
    window.open(ev.dataset['href'], '_blank');
}
