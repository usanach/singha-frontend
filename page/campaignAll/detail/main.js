
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
        Article10Component,
        FooterComponent,
    },
    setup() {
        const campaignShowDetail = ref('')
        const formEnable = ref("")
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const lang = ref(getLanguageFromPath());
        const font = computed(() =>
            lang.value === 'en' ? "font-['SinghaEstate']" : "!font-['SinghaEstate']"
        );

        const formSection = ref({
            form: formEnable,
            project: getPath().campaign,
            title: computed(() =>
                lang.value === 'en' ? 'JOIN OUR ACTIVITY' : 'สัมผัสประสบการณ์ดี ๆ ด้วยกัน'
            ),
            detail: computed(() =>
                lang.value === 'en'
                    ? 'Register to join activity & receive exclusive information'
                    : "ลงทะเบียนเพื่อร่วมกิจกรรม<span class='text-nowrap'>และรับสิทธิพิเศษ</span>"
            ),
            inputText: {
                firstName: { en: 'First Name *', th: 'ชื่อ *' },
                lastName: { en: 'Last Name *', th: 'นามสกุล *' },
                mobile: { en: 'Mobile *', th: 'เบอร์โทรศัพท์ *' },
                email: { en: 'Email *', th: 'อีเมล *' },
                terms: {
                    text1: {
                        en:
                            'I hereby give my consent for Singha Estate Public Company Limited (“the Company”) to collect, use, or disclose my personal data for the following purposes;',
                        th:
                            'ข้าพเจ้าให้ความยินยอมแก่บริษัท สิงห์ เอสเตท จำกัด (มหาชน) (“บริษัท”) ในการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้าเพื่อวัตถุประสงค์ดังต่อไปนี้',
                    },
                    text2: {
                        en:
                            'I agree to receive more information about products, services, and marketing news of <span class="text-nowrap">Singha Estate</span> Group of Companies and our business partner, and acknowledge the terms and purposes of data usage in the <a class="notice-bold text-nowrap" href="https://www.singhaestate.co.th/en/privacy-notice" target="_blank"><b>Privacy Notice.</b></a>',
                        th:
                            'ท่านตกลงรับข้อมูลเกี่ยวกับผลิตภัณฑ์, บริการ และข่าวสารกิจกรรมของกลุ่มธุรกิจบริษัทในเครือ<span class="text-nowrap">สิงห์ เอสเตท</span> และพันธมิตรของบริษัทฯ และรับทราบข้อกำหนด และวัตถุประสงค์การใช้ข้อมูลที่ระบุไว้ใน <a class="notice-bold text-nowrap" href="https://www.singhaestate.co.th/th/privacy-notice" target="_blank"><b>นโยบายความเป็นส่วนตัว</b></a>',
                    },
                    text3: {
                        en:
                            'You can learn more details about our Privacy Notice including consent withdrawal and request submission regarding violation of data subject rights',
                        th:
                            'ท่านสามารถศึกษารายละเอียดเพิ่มเติมเกี่ยวกับ ประกาศความเป็นส่วนตัว รวมถึงการเพิกถอนความยินยอมหรือยื่นข้อร้องเรียนเกี่ยวกับการละเมิดสิทธิความเป็นส่วนตัวของท่าน',
                    },
                },
            },
            submitText: { en: 'submit', th: 'ลงทะเบียน' },
        });

        onMounted(async () => {
            nextTick(() => {
                document.querySelector('.loading')?.classList.remove('opacity-0');
            });
        });
        return {
            font,
            lang,
            formSection,
            campaignShowDetail,
        };
    }
}).mount('#app');
