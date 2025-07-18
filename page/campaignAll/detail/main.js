
const getPath = () => {
    const url = window.location.href;
    const urlObj = new URL(url);

    // Get the pathname
    const pathname = urlObj.pathname;

    // Split the pathname into parts
    const pathParts = pathname.split('/').filter(part => part);

    // Convert to parameters
    const params = {};
    for (let i = 0; i < pathParts.length; i++) {
        params[`param${i + 1}`] = decodeURIComponent(pathParts[i]);
    }
    return {
        campaign: params['param3'],
    }
}
const socialClick = () => {
    if (document.getElementById('social-mobile') !== null) {
        console.log('true');
        let socialMobileElements = document.querySelectorAll('.social-mobile-block:not(:first-child)'); // Select all except the first

        for (let i = 0; i < socialMobileElements.length; i++) {
            if (socialMobileElements[i].style.opacity === '1') {
                socialMobileElements[i].style.opacity = 0;
                socialMobileElements[i].style.marginBottom = '-100px';
                socialMobileElements[i].style.zIndex = 0;
            } else {
                socialMobileElements[i].style.opacity = 1;
                socialMobileElements[i].style.marginBottom = '0';
                socialMobileElements[i].style.zIndex = 65;
            }
        }
        console.log('click');
    } else {
        console.log('false');
    }
}

const setOpenGraphMetaTag = (property, content) => {
    let metaTag = document.querySelector(`meta[property='${property}']`);

    // If the meta tag exists, update its content
    if (metaTag) {
        metaTag.setAttribute('content', content);
    } else {
        // If the meta tag does not exist, create a new one and append it to the head
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        metaTag.setAttribute('content', content);
        document.getElementsByTagName('head')[0].appendChild(metaTag);
    }
}

// Create and mount the Vue app
createApp({
    components: {
        HeaderComponent,
        ContentComponent,
        FooterComponent,
    },

    data() {
        const campaign_show_detail_show_product = ref('')
        const formEnable = ref("")
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const loadTemplate = async (lang) => {
            try {
                const lang = getLanguageFromPath();
                const dataset = await axios.get('/data/promotion.json');
                const data = await dataset.data;

                formEnable.value = data.filter((d, i) => d.data.link == getPath().campaign).map(d => {
                    return d.data.form != undefined ? d.data.form : true
                })
                const checkProduct = data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.detail.product)[0]

                if (checkProduct != undefined) {
                    campaign_show_detail_show_product.value = {
                        logo: data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.logo),
                        image: data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.detail.product.image),
                        url: data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.detail.product.url[lang]),
                        detail: '"' + data.filter((d, i) => d.data.link == getPath().campaign).map(d => d.data.subtitle)[0] + '"',
                        more: getLanguageFromPath() == 'en'
                            ? "See the project"
                            : "เยี่ยมชมโครงการ ​​",
                    }
                }
                // setOpenGraphMetaTag('og:title', data[0].data.meta.title[lang]);
                // setOpenGraphMetaTag('og:description', data[0].data.meta.description[lang]);
                // setOpenGraphMetaTag('og:image', `${window.location.origin}${data[0].data.image.thumb}`);
                // setOpenGraphMetaTag('og:url', window.location.href);

            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        loadTemplate()
        return {
            font: getLanguageFromPath() == 'en' ? "font-['Cinzel']" : "!font-['IBMPlexSansThai']",
            lang: getLanguageFromPath(),
            articles: articleData.slice(0, 3),
            form_section: {
                form: formEnable,
                project: getPath().campaign,
                title: getLanguageFromPath() == 'en'
                    ? "JOIN OUR ACTIVITY"
                    : "สัมผัสประสบการณ์ดี ๆ ด้วยกัน​",
                detail: getLanguageFromPath() == 'en'
                    ? "Register to join activity & receive exclusive information"
                    : "ลงทะเบียนเพื่อร่วมกิจกรรม<span class='text-nowrap'>และรับสิทธิพิเศษ</span>",
                input_text: {
                    firstName: {
                        en: "First Name *",
                        th: "ชื่อ *"
                    },
                    lastName: {
                        en: "Last Name *",
                        th: "นามสกุล *​"
                    },
                    mobile: {
                        en: "Mobile *",
                        th: "เบอร์โทรศัพท์ *"
                    },
                    email: {
                        en: "Email *",
                        th: "อีเมล *​"
                    },
                    terms: {
                        text1: {
                            en: "I hereby give my consent for Singha Estate Public Company Limited (“the Company”) to collect, use, or disclose my personal data for the following purposes;",
                            th: "ข้าพเจ้าให้ความยินยอมแก่บริษัท สิงห์ เอสเตท จำกัด (มหาชน) (“บริษัท”) ในการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้าเพื่อวัตถุประสงค์ดังต่อไปนี้​"
                        },
                        text2: {
                            en: "I agree to receive more information about products, services, and marketing news of Singha Estate Group of Companies and our business partner, and acknowledge the terms and purposes of data usage in the <a class='notice-bold' href='https://www.singhaestate.co.th/en/privacy-notice' target='_blank'><b>Privacy Notice.</b>​</a>",
                            th: "ท่านตกลงรับข้อมูลเกี่ยวกับผลิตภัณฑ์, บริการ และข่าวสารกิจกรรมของกลุ่มธุรกิจบริษัทในเครือสิงห์ เอสเตท และพันธมิตรของบริษัทฯ และรับทราบข้อกำหนด และวัตถุประสงค์การใช้ข้อมูลที่ระบุไว้ใน <a class='notice-bold' href='https://www.singhaestate.co.th/th/privacy-notice' target='_blank'><b>นโยบายความเป็นส่วนตัว</b></a>​"
                        },
                        text3: {
                            en: "You can learn more details about our Privacy Notice including consent withdrawal and request submission regarding violation of data subject rights",
                            th: "ท่านสามารถศึกษารายละเอียดเพิ่มเติมเกี่ยวกับ ประกาศความเป็นส่วนตัว รวมถึงการเพิกถอนความยินยอมหรือยื่นข้อร้องเรียนเกี่ยวกับการละเมิดสิทธิความเป็นส่วนตัวของท่าน​"
                        }
                    },
                    submit: {
                        text: {
                            en: "submit",
                            th: "ลงทะเบียน"
                        }
                    }
                }
            },
            campaign_show_detail_show_product: campaign_show_detail_show_product,
            campaign_detail_articlesRecommendation_section: {
                title: getLanguageFromPath() == 'en'
                    ? "ARTICLES RECOMMENDATION"
                    : "บทความเกี่ยวข้อง​​",
                more: getLanguageFromPath() == 'en'
                    ? "Explore more"
                    : "อ่านต่อ​",
            }
        };
    },
    mounted() {
        // runs after the component is mounted AND the DOM is updated
        nextTick(() => {
            document.querySelector('.loading').classList.remove('opacity-0')
        })
    },
}).mount('#app');
