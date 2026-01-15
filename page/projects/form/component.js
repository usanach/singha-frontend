// Define the Header component
const FormRegisterComponent = defineComponent({
    name: 'FormRegisterComponent',
    template: `
        <!-- ถ้า isFormEnabled = false จะไม่ render section นี้เลย -->
        <section v-if="isFormEnabled" class="form-register onview font-['IBM_Plex_SANS_Thai']" id="register" data-section="lead_register">
            <div class="relative lg:h-[800px]">
                <div class="flex lg:flex-row flex-col h-full w-full">
                    <!-- LEFT: Side Image (ดึงจาก API / fallback เป็นของเดิม) -->
                    <div
                        class="w-full lg:h-full h-[450px] md:h-[500px] bg-cover bg-center"
                        :style="sideImage ? { backgroundImage: 'url(' + sideImage + ')' } : {
                            backgroundImage: 'url(/assets/image/page-srin-rachapuek/register/form_m.webp)'
                        }">
                    </div>

                    <!-- RIGHT: Form BG (ดึงจาก API / fallback เป็นของเดิม) -->
                    <div
                        class="w-full h-full bg-cover bg-center flex relative"
                        :style="formImage ? { backgroundImage: 'url(' + formImage + ')' } : {
                            backgroundImage: 'url(/assets/image/page-srin-rachapuek/register/bg.webp)'
                        }">
                        <div class="m-auto lg:max-w-[70%] px-5 py-10">
                            <form @submit.prevent="validateForm" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear">
                                <div class="flex flex-col gap-10">
                                    <div>
                                        <h2 class="text-white text-center text-[35px] font-normal whitespace-pre-line">
                                            {{ form_text.title[language] }}
                                        </h2>
                                    </div>
                                    <div>
                                        <div class="flex flex-col gap-10">
                                            <div class="flex gap-8 lg:flex-row flex-col">
                                                <div class="lg:w-1/2 w-full">
                                                    <input type="text" name="fname" v-model="form.fname"
                                                        class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full placeholder:text-white"
                                                        :placeholder="form_text.fname[language]">
                                                    <span v-if="errors.fname" class="text-red-500 text-sm">{{ errors.fname }}</span>
                                                </div>
                                                <div class="lg:w-1/2 w-full">
                                                    <input type="text" name="sname" v-model="form.sname"
                                                        class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full placeholder:text-white"
                                                        :placeholder="form_text.sname[language]">
                                                    <span v-if="errors.sname" class="text-red-500 text-sm">{{ errors.sname }}</span>
                                                </div>
                                            </div>
                                            <div class="flex gap-8 lg:flex-row flex-col">
                                                <div class="lg:w-1/2 w-full">
                                                    <input type="text" name="tel" v-model="form.tel" @keydown="checkNumberOnly" maxlength="10"
                                                        class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full placeholder:text-white"
                                                        :placeholder="form_text.tel[language]">
                                                    <span v-if="errors.tel" class="text-red-500 text-sm">{{ errors.tel }}</span>
                                                </div>
                                                <div class="lg:w-1/2 w-full">
                                                    <input type="email" name="email" v-model="form.email"
                                                        class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full placeholder:text-white"
                                                        :placeholder="form_text.email[language]">
                                                    <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
                                                </div>
                                            </div>
                                            <div class="flex gap-8 lg:flex-row flex-col">
                                                <div class="lg:w-1/2 w-full relative">
                                                    <label for="province"
                                                        class="text-white w-full absolute top-0 left-0 w-full h-full cursor-pointer">{{selectedProvince == null ? form_text.province[language] : ''}}</label>
                                                    <select name="province" id="province" v-model="selectedProvince"
                                                        class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full relative cursor-pointer"
                                                        @change="filterDistricts">
                                                        <option v-for="province in provinces" :key="province.id"
                                                            :value="province.id" class="text-black">
                                                            {{ province.name[language] }}
                                                        </option>
                                                    </select>
                                                    <span v-if="errors.province" class="text-red-500 text-sm">{{ errors.province }}</span>
                                                </div>
                                                <div class="lg:w-1/2 w-full relative">
                                                    <label for="district"
                                                        class="text-white w-full absolute top-0 left-0 w-full h-full cursor-pointer">{{selectedDistrict == null ? form_text.district[language] : ''}}</label>
                                                    <select name="district" id="district" v-model="selectedDistrict"
                                                        class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full relative cursor-pointer">
                                                        <option v-if="selectedProvince == null" class="text-black" disabled>
                                                                {{language=='th'?'กรุณาเลือกจังหวัด':'Please select province'}}
                                                        </option>
                                                        <option v-if="selectedProvince != null"
                                                            v-for="district in filteredDistricts" :key="district.id"
                                                            :value="district.id" class="text-black">
                                                            {{ district.name[language] }}
                                                        </option>
                                                    </select>
                                                    <span v-if="errors.district" class="text-red-500 text-sm">{{ errors.district }}</span>
                                                </div>
                                            </div>
                                            <div class="flex gap-8 lg:flex-row flex-col">
                                                <div class="w-full">
                                                    <div class="relative">
                                                        <label for="budget"
                                                            class="text-white w-full absolute top-0 left-0 w-full h-full cursor-pointer">{{selectedBudget !== null ? '' :  form_text.budgets[language]}}</label>
                                                        <select name="budget" id="budget" v-model="selectedBudget"
                                                            class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full relative cursor-pointer">
                                                            <option v-for="budget in budgets" :key="budget.id"
                                                                :value="budget.title[language]" class="text-black">
                                                                {{ budget.title[language] }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <span v-if="errors.budget" class="text-red-500 text-sm">{{ errors.budget }}</span>
                                                </div>
                                            </div>
                                            
                                            <div class="flex gap-8 lg:flex-row flex-col">
                                                <div class="w-full">
                                                    <div class="flex items-center space-x-2">
                                                        <div class="relative mb-auto">
                                                            <input type="checkbox" name="consents" :data-value="form.consents" id="custom-checkbox" v-model="form.consents" class="hidden peer">
    
                                                            <label for="custom-checkbox"
                                                                class="w-[15px] h-[15px] border-2 border-gray-300 bg-white rounded-sm flex items-center justify-center cursor-pointer peer-checked:bg-transparent">
                                                            </label>
                                                            <label for="custom-checkbox"
                                                                class="cursor-pointer text-white hidden peer-checked:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                                                <img src="/assets/icon/checked-white.svg" alt=""
                                                                    class="w-[10px] h-[10px]">
                                                            </label>
                                                        </div>
    
                                                        <span class="text-white" v-html="form_text.consents[language]"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mx-auto">
                                                <button type="submit"
                                                    id="btnSubmit"
                                                    class="border border-1 border-white px-16 py-2 hover:bg-white/30 lg:w-auto w-full">
                                                    <div class="loaded ">
                                                        <p class="text-nowrap font-normal text-white">
                                                            {{form_text.submit[language]}}
                                                        </p>
                                                    </div>
                                                    <div class="loading hidden">
                                                        <svg width="25" height="25" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"
                                                            fill="none">
                                                            <circle cx="50" cy="50" r="40" stroke="#fff" stroke-width="10" opacity="0.2" />
                                                            <path d="M90 50a40 40 0 0 1-40 40" stroke="#fff" stroke-width="10"
                                                                stroke-linecap="round">
                                                                <animateTransform attributeName="transform" type="rotate" from="0 50 50"
                                                                    to="360 50 50" dur="1s" repeatCount="indefinite" />
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="fixed inset-0 bg-black bg-opacity-75 z-[9999]" :class="[isSuccess ? 'block':'hidden']">
                <div class="p-5 rounded-lg h-full flex">
                    <div class="m-auto">
                        <img
                            :src="thankYouDesktop || ''"
                            class="lg:block hidden"
                        />
                        <img
                            :src="thankYouMobile || ''"
                            class="lg:hidden"
                        />
                    </div>
                </div>
                <button @click="closeModal" class="absolute right-0 top-0 lg:m-10 m-5 z-50 w-[30px] overflow-hidden">
                    <img src="/assets/icon/close.svg" class="scale-110" />
                </button>
            </div>
        </section>
    `,
    setup() {
        const provinces = ref([]);
        const districts = ref([]);
        const budgets = ref([]);
        const filteredDistricts = ref([]);
        const selectedProvince = ref(null);
        const selectedDistrict = ref(null);
        const selectedBudget = ref(null);
        const isSuccess = ref(false);
        const language = ref('th'); // Default language
        const thankYouDesktop = ref('');
        const thankYouMobile = ref('');

        // เปิด/ปิดฟอร์มจาก API (1 = เปิด, 0 = ปิด)
        const isFormEnabled = ref(true);

        // เก็บ project_id จาก /project/seo
        const projectId = ref(null);

        // รูปจาก API
        const sideImage = ref('');  // side_image
        const formImage = ref('');  // form_image

        // base URL สำหรับ API และ Storage
        const API_BASE = window.APP_CONFIG?.apiBaseUrl || 'http://127.0.0.1:8000/api';
        const STORAGE_BASE = window.APP_CONFIG?.storageUrl || `${window.location.origin}/storage`;

        const buildFormImagePath = (imagePath) => {
            if (!imagePath) return '';
            if (/^https?:\/\//i.test(imagePath)) return imagePath;
            return `${STORAGE_BASE}/uploads/projects/${imagePath.replace(/^\/+/, '')}`;
        };

        const form_text = ref({
            title: {
                en: "Register For Special Privilege & Receive Exclusive Information",
                th: "ลงทะเบียน เพื่อเยี่ยมชมโครงการ"
            },
            submit: {
                en: "Submit",
                th: "ลงทะเบียน"
            },
            fname: {
                en: "First Name*",
                th: "ชื่อ*"
            },
            sname: {
                en: "Surname*",
                th: "นามสกุล*"
            },
            email: {
                en: "Email*",
                th: "อีเมล*"
            },
            tel: {
                en: "Mobile*",
                th: "เบอร์โทรศัพท์*"
            },
            budgets: {
                en: "Budget",
                th: "งบประมาณ"
            },
            province: {
                en: "Province*",
                th: "จังหวัด*"
            },
            district: {
                en: "Districts*",
                th: "อำเภอ*"
            },
            consents: {
                en: "I agree to receive more information about products, services, and marketing news of Singha Estate Group of Companies and our business partner, and acknowledge the terms and purposes of data usage in the <a class='notice-bold underline'href='https://www.singhaestate.co.th/en/privacy-notice'target='_blank'>Privacy Notice.</a>​",
                th: "ท่านตกลงรับข้อมูลเกี่ยวกับผลิตภัณฑ์, บริการและข่าวสารกิจกรรมของกลุ่มธุรกิจบริษัทในเครือสิงห์ เอสเตทและพันธมิตรของบริษัทฯและรับทราบข้อกำหนด และวัตถุประสงค์การใช้ข้อมูลที่ระบุไว้ใน <a class='notice-bold underline'href='https://www.singhaestate.co.th/th/privacy-notice'target='_blank'>นโยบายความเป็นส่วนตัว</a>"
            },
        });

        const form = ref({
            fname: '',
            sname: '',
            email: '',
            tel: '',
            consents: false
        });

        const errors = ref({
            fname: '',
            sname: '',
            email: '',
            tel: '',
            province: '',
            district: '',
            budget: '',
        });

        const closeModal = () => {
            location.reload();
        };

        const getUTMParams = () => {
            const urlParams = new URLSearchParams(window.location.search);
            let utmParams = {};

            if (urlParams.has('utm_source')) {
                utmParams.utm_source = urlParams.get('utm_source');
            }
            if (urlParams.has('utm_medium')) {
                utmParams.utm_medium = urlParams.get('utm_medium');
            }
            if (urlParams.has('utm_campaign')) {
                utmParams.utm_campaign = urlParams.get('utm_campaign');
            }
            if (urlParams.has('utm_term')) {
                utmParams.utm_term = urlParams.get('utm_term');
            }
            if (urlParams.has('utm_content')) {
                utmParams.utm_content = urlParams.get('utm_content');
            }

            return utmParams;
        };

        const validateForm = async () => {
            errors.value.fname = form.value.fname ? '' : 'กรุณากรอกชื่อ';
            errors.value.sname = form.value.sname ? '' : 'กรุณากรอกนามสกุล';
            errors.value.email = form.value.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.value.email) ? '' : 'กรุณากรอกอีเมลที่ถูกต้อง';
            errors.value.tel = form.value.tel && /^\d{10}$/.test(form.value.tel) ? '' : 'กรุณากรอกเบอร์โทรที่ถูกต้อง';
            errors.value.province = selectedProvince.value ? '' : 'กรุณาเลือกจังหวัด';
            errors.value.district = selectedDistrict.value ? '' : 'กรุณาเลือกอำเภอ';
            errors.value.budget = selectedBudget.value ? '' : 'กรุณาเลือกงบประมาณ';

            if (Object.values(errors.value).every(error => !error)) {
                let utmParams = getUTMParams();

                let object = {
                    budget: selectedBudget.value ? selectedBudget.value : "",
                    consents: [form.value.consents],
                    district: districts.value.find(d => d.id === selectedDistrict.value).name[language.value] || '',
                    email: form.value.email,
                    firstName: form.value.fname,
                    lastName: form.value.sname,
                    phoneNumber: form.value.tel,
                    province: provinces.value.find(p => p.id === selectedProvince.value).name[language.value] || '',
                    ...utmParams
                };

                try {
                    document.querySelector('.loading').classList.remove('hidden');
                    document.querySelector('.loaded').classList.add('hidden');

                    const token = await grecaptcha.execute('6LevUS0nAAAAAInOUaytl6bgNgWFE4FQt2yofWyZ', { action: 'submit' });
                    object.token = token;

                    console.log(object)
                    await axios.post(`https://residential-uat.singhaestate.co.th/leadadmin/api/droplead-project`, object);
                    
                    // ensure hidden iframe exists
                    let iframe = document.getElementById('zapier-iframe');
                    const createdTime = new Date().toLocaleString();
                    if (!iframe) {
                        iframe = document.createElement('iframe');
                        iframe.name = 'zapier-iframe';
                        iframe.id = 'zapier-iframe';
                        iframe.style.display = 'none';
                        document.body.appendChild(iframe);
                    }

                    // dynamic form for Zapier event
                    const zapForm = document.createElement('form');
                    zapForm.method = 'POST';
                    zapForm.action = 'https://hooks.zapier.com/hooks/catch/23303181/ubnidtc/';
                    zapForm.target = 'zapier-iframe';
                    zapForm.style.display = 'none';

                    const eventData = {
                        event: 'page_view',
                        url: window.location.href,
                        page_path: window.location.pathname + '/thankyou',
                        title: document.title,
                        timestamp: createdTime,
                        ...object
                    };

                    Object.entries(eventData).forEach(([key, value]) => {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = value;
                        zapForm.appendChild(input);
                    });

                    document.body.appendChild(zapForm);
                    zapForm.submit();

                    isSuccess.value = true;
                    document.body.style.overflow = 'hidden';
                } catch (error) {
                    document.querySelector('.loading').classList.add('hidden');
                    document.querySelector('.loaded').classList.remove('hidden');
                    console.log('>>error<<', error);
                    const { response = {} } = error || {};
                    const { status } = response;
                    document.getElementById('btnSubmit').disabled = false;
                    isSuccess.value = false;
                    document.body.style.overflow = '';
                }
            }
        };

        const checkNumberOnly = (event) => {
            const key = event.key;
            if (!/\d/.test(key) && key !== 'Backspace' && key !== 'ArrowLeft' && key !== 'ArrowRight') {
                event.preventDefault();
            }
        };

        const fetchProvinces = async () => {
            try {
                const url = `/data/thai-provinces.json`;
                const { data } = await axios.get(url, { responseType: 'json' });

                provinces.value = (data || []).map((row) => {
                    const { name, name_th, name_en, ...rest } = row || {};
                    return {
                        ...rest,
                        name: {
                            th: name?.th ?? name_th ?? '',
                            en: name?.en ?? name_en ?? '',
                        },
                    };
                });
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        const fetchDistricts = async () => {
            try {
                const url = '/data/thai-districts.json';
                const { data } = await axios.get(url, { responseType: 'json' });

                districts.value = (data || []).map((row) => {
                    const { name, name_th, name_en, ...rest } = row || {};
                    return {
                        ...rest,
                        name: {
                            th: name?.th ?? name_th ?? '',
                            en: name?.en ?? name_en ?? '',
                        },
                    };
                });
                filteredDistricts.value = [...districts.value];
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };

        // ดึง budget จาก API: /project/budget/{project_id}
        const fetchBudgets = async () => {
            try {
                if (!projectId.value) {
                console.warn('No projectId for budgets');
                return;
                }

                const res = await getProjectBudget(projectId.value); // ✅ ใช้ api.js
                const rows = Array.isArray(res?.data) ? res.data : []; // ถ้า api.js คืน {data:{...}} ให้ปรับบรรทัดนี้ตามจริง

                // filter budget_disabled != 1
                const enabledRows = rows.filter(row => (row.budget_disabled ?? 0) != 1);

                budgets.value = enabledRows.map(row => ({
                    id: row.id,
                    title: {
                        th: row.budget_title_th || '',
                        en: row.budget_title_en || row.budget_title_th || ''
                    }
                }));
                console.log(budgets.value);
                
            } catch (error) {
                console.error('Error fetching budgets:', error);
            }
        };


        const filterDistricts = () => {
            if (!selectedProvince.value) {
                filteredDistricts.value = districts.value;
            } else {
                filteredDistricts.value = districts.value.filter(district => district.province_id === selectedProvince.value);
            }
        };

        const init = () => {
            if (window.AOS) {
                AOS.init();
            }
        };

        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        // ดึง project_id จาก /project/seo แล้วไปดึง /project/form/{project_id}
        const fetchFormConfig = async () => {
            try {
                const currentPath = window.location.pathname;
                const lang = language.value;

                // 1) GET /project/seo
                // const seoRes = await getProjectSeo();  
                // const seoRows = Array.isArray(seoRes.data?.data) ? seoRes.data.data : [];

                // const enabledRows = seoRows.filter(r => (r.seo_disabled ?? 0) != 1);
                // const field = lang === 'en' ? 'seo_url_en' : 'seo_url_th';

                // const matchedSeo = enabledRows.find(row => row[field] === currentPath);
                if (!projectIDs) {
                    console.warn('No SEO row matched current URL for form');
                    return;
                }

                projectId.value = projectIDs;

                // 2) GET /project/form/{project_id}
                const formRes = await getProjectForm(projectId.value);
                const formRows = Array.isArray(formRes.data?.data) ? formRes.data.data : [];

                if (!formRows.length) {
                    console.warn('No form config for project_id', projectId.value);
                    return;
                }

                const row = formRows[0];

                // toggle เปิด/ปิดฟอร์ม
                // form_disabled = 1 → เปิด
                // form_disabled = 0 → ปิด (ไม่ render section)
                if (typeof row.form_disabled !== 'undefined' && row.form_disabled !== null) {
                    isFormEnabled.value = Number(row.form_disabled) === 1;
                } else {
                    isFormEnabled.value = true;
                }

                // ถ้าปิดฟอร์มก็ไม่ต้องทำอะไรต่อ
                if (!isFormEnabled.value) {
                    return;
                }

                // ใช้ form_title จาก API override title เดิม
                if (row.form_title) {
                    if (row.form_title.th) {
                        form_text.value.title.th = row.form_title.th;
                    }
                    if (row.form_title.en) {
                        form_text.value.title.en = row.form_title.en;
                    }
                }

                // ใช้ side_image และ form_image จาก API
                if (row.side_image) {
                    sideImage.value = buildFormImagePath(row.side_image);
                }
                if (row.form_image) {
                    formImage.value = buildFormImagePath(row.form_image);
                }
                // Thank you images (เลือกตามภาษา)
                const tyDesktopKey = language.value === 'en' ? 'thank_you_desktop_en' : 'thank_you_desktop_th';
                const tyMobileKey  = language.value === 'en' ? 'thank_you_mobile_en'  : 'thank_you_mobile_th';

                if (row[tyDesktopKey]) {
                thankYouDesktop.value = buildThankYouImagePath(row[tyDesktopKey]);
                }
                if (row[tyMobileKey]) {
                thankYouMobile.value = buildThankYouImagePath(row[tyMobileKey]);
                }
            } catch (error) {
                console.error('Error fetching form config:', error);
            }
        };

        const buildThankYouImagePath = (imagePath) => {
        if (!imagePath) return '';
        if (/^https?:\/\//i.test(imagePath)) return imagePath;

        // ใช้ pattern เดียวกับรูปอื่น (ถ้าฝั่งหลังบ้านเก็บใน uploads/projects)
        return `${STORAGE_BASE}/uploads/projects/${imagePath.replace(/^\/+/, '')}`;
        };

        onMounted(async () => {
            // set language ก่อน เพื่อใช้เลือก field seo_url_th / seo_url_en ให้ถูก
            language.value = getLanguageFromPath();

            await fetchProvinces();
            await fetchDistricts();
            await fetchFormConfig();   // ได้ projectId + form config
            await fetchBudgets();      // ใช้ projectId

            nextTick(() => {
                init();
            });
        });

        return {
            provinces,
            budgets,
            filteredDistricts,
            selectedProvince,
            selectedDistrict,
            selectedBudget,
            form,
            errors,
            validateForm,
            filterDistricts,
            checkNumberOnly,
            form_text,
            language,
            isSuccess,
            closeModal,
            sideImage,
            formImage,
            isFormEnabled,
            thankYouDesktop,
            thankYouMobile,
        };
    },
});
