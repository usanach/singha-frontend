// Define the Header component
const FormRegisterComponent = defineComponent({
    name: 'FormRegisterComponent',
    template: `
        <section class="form-register onview" id="register" data-section="lead_register">
            <div class="relative lg:h-screen">
                <div class="flex lg:flex-row flex-col h-full w-full">
                    <div
                        class="w-full lg:h-full h-[500px] bg-[url('/assets/image/page-srin-prannok/register/305011_0.png')] bg-cover bg-center">

                    </div>
                    <div
                        class="w-full h-full h-full bg-[url('/assets/image/page-srin-prannok/register/bg.png')] bg-cover bg-center flex">
                        <div class="m-auto lg:max-w-[70%] px-5 py-10">
                            <form @submit.prevent="validateForm" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear">
                                <div class="flex flex-col gap-10">
                                    <div>
                                        <h2 class="text-white text-center lg:text-[30px] text-[24px]">
                                            ลงทะเบียน เพื่อเยี่ยมชมโครงการ
                                        </h2>
                                    </div>
                                    <div>
                                        <div class="flex flex-col gap-10">
                                            <div class="flex gap-8 lg:flex-row flex-col">
                                                <div class="lg:w-1/2 w-full">
                                                    <input type="text" name="fname" v-model="form.fname"
                                                        class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full"
                                                        :placeholder="form_text.fname[language]">
                                                    <span v-if="errors.fname" class="text-red-500 text-sm">{{ errors.fname }}</span>
                                                </div>
                                                <div class="lg:w-1/2 w-full">
                                                    <input type="text" name="sname" v-model="form.sname"
                                                        class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full"
                                                        :placeholder="form_text.sname[language]">
                                                    <span v-if="errors.sname" class="text-red-500 text-sm">{{ errors.sname }}</span>
                                                </div>
                                            </div>
                                            <div class="flex gap-8 lg:flex-row flex-col">
                                                <div class="lg:w-1/2 w-full">
                                                    <input type="email" name="email" v-model="form.email"
                                                        class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full"
                                                        :placeholder="form_text.email[language]">
                                                    <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
                                                </div>
                                                <div class="lg:w-1/2 w-full">
                                                    <input type="text" name="tel" v-model="form.tel" @keydown="checkNumberOnly" maxlength="10"
                                                        class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full"
                                                        :placeholder="form_text.tel[language]">
                                                    <span v-if="errors.tel" class="text-red-500 text-sm">{{ errors.tel }}</span>
                                                </div>
                                            </div>
                                            <div class="flex gap-8 lg:flex-row flex-col">
                                                <div class="lg:w-1/2 w-full relative">
                                                    <label for="province"
                                                        class="text-white w-full absolute top-0 left-0 w-full h-full cursor-pointer">{{selectedProvince == null ?form_text.province[language] : ''}}</label>
                                                    <select name="province" id="province" v-model="selectedProvince"
                                                        class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full relative cursor-pointer"
                                                        @change="filterDistricts">
                                                        <option v-for="province in provinces" :key="province.id"
                                                            :value="province.id" class="text-black">
                                                            {{ province.name_th }}
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
                                                            กรุณาเลือกจังหวัด
                                                        </option>
                                                        <option v-if="selectedProvince != null"
                                                            v-for="district in filteredDistricts" :key="district.id"
                                                            :value="district.id" class="text-black">
                                                            {{ district.name_th }}
                                                        </option>
                                                    </select>
                                                    <span v-if="errors.district" class="text-red-500 text-sm">{{ errors.district }}</span>
                                                </div>
                                            </div>
                                            <div class="flex gap-8 lg:flex-row flex-col">
                                                <div class="w-full">
                                                    <p class="text-white">{{form_text.budgets[language]}}</p>
                                                    <div class="relative">
                                                        <label for="budget"
                                                            class="text-white w-full absolute top-0 left-0 w-full h-full cursor-pointer">{{selectedBudget !== null ? '' :  form_text.budgets[language]}}</label>
                                                        <select name="budget" id="budget" v-model="selectedBudget"
                                                            class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full relative cursor-pointer">
                                                            <option v-for="budget in budgets" :key="budget.id"
                                                                :value="budget.title" class="text-black">
                                                                {{budget.title}}
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
                                                            <input type="checkbox" id="custom-checkbox" v-model="form.consents" class="hidden peer">
    
                                                            <label for="custom-checkbox"
                                                                class="w-[15px] h-[15px] border-2 border-gray-300 bg-white rounded-sm flex items-center justify-center cursor-pointer peer-checked:bg-transparent">
                                                                <!-- Check Icon -->
                                                            </label>
                                                            <label for="custom-checkbox"
                                                                class="cursor-pointer text-white hidden peer-checked:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                                                <img src="/assets/icon/checked-white.svg" alt=""
                                                                    class="w-[10px] h-[10px]">
                                                            </label>
                                                        </div>
    
                                                        <!-- Label Text -->
                                                        <span class="text-white text-[12px]" v-html="form_text.consents[language]"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mx-auto">
                                                <button type="submit"
                                                    id="btnSubmit"
                                                    class="border border-1 border-white px-16 py-2 hover:bg-white/30 lg:w-auto w-full">
                                                    <div class="loaded ">
                                                        <p class="text-nowrap font-normal text-white">
                                                            ลงทะเบียน
                                                        </p>
                                                    </div>
                                                    <div class="loading  hidden ">
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
            
            <div class="fixed inset-0 bg-black bg-opacity-75 z-50" :class="[isSuccess ? 'block':'hidden']">
                <div class="p-5 rounded-lg h-full flex">
                    <div class="m-auto">
                        <img src="/assets/image/page-srin-prannok/register/Thankyou-Popup-desktop.jpg" class="lg:block hidden" />
                        <img src="/assets/image/page-srin-prannok/register/Thankyou-Popup-mobile.jpg" class="lg:hidden" />
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
        const form_text = ref({
            fname: {
                en: "Firstname*",
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
                en: "Mobile",
                th: "เบอร์โทรศัพท์*"
            },
            budgets: {
                en: "Budget",
                th: "งบประมาณ*"
            },
            province: {
                en: "Province*",
                th: "จังหวัด*"
            },
            district: {
                en: "Districts",
                th: "อำเภอ*"
            },
            consents: {
                en: "I agree to receive more information about products, services, and marketing news of Singha Estate Group of Companies and our business partner, and acknowledge the terms and purposes of data usage in the <a class='notice-bold underline'href='https://www.singhaestate.co.th/en/privacy-notice?&_ga=2.63773359.1474642135.1727241573-885017993.1707963665&_gac=1.261361279.1724900635.CjwKCAjwlbu2BhA3EiwA3yXyu0JpthQzF-0t4GTZ_zA71-2X9vs-f0zjNgSBLTJRVo-X3dqnTudJ7BoCuH4QAvD_BwE#1'target='_blank'>Privacy Notice.</a>​",
                th: "ท่านตกลงรับข้อมูลเกี่ยวกับผลิตภัณฑ์, บริการและข่าวสารกิจกรรมของกลุ่มธุรกิจบริษัทในเครือสิงห์ เอสเตทและพันธมิตรของบริษัทฯและรับทราบข้อกำหนด และวัตถุประสงค์การใช้ข้อมูลที่ระบุไว้ใน<a class='notice-bold underline'href='https://www.singhaestate.co.th/en/privacy-notice?&_ga=2.63773359.1474642135.1727241573-885017993.1707963665&_gac=1.261361279.1724900635.CjwKCAjwlbu2BhA3EiwA3yXyu0JpthQzF-0t4GTZ_zA71-2X9vs-f0zjNgSBLTJRVo-X3dqnTudJ7BoCuH4QAvD_BwE#1'target='_blank'>นโยบายความเป็นส่วนตัว</a>"
            },
        })
        const language = ref('th'); // Default language

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
            budget: ''
        });

        const validateForm = async () => {
            errors.value.fname = form.value.fname ? '' : 'กรุณากรอกชื่อ';
            errors.value.sname = form.value.sname ? '' : 'กรุณากรอกนามสกุล';
            errors.value.email = form.value.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.value.email) ? '' : 'กรุณากรอกอีเมลที่ถูกต้อง';
            errors.value.tel = form.value.tel && /^\d{10}$/.test(form.value.tel) ? '' : 'กรุณากรอกเบอร์โทรที่ถูกต้อง';
            errors.value.province = selectedProvince.value ? '' : 'กรุณาเลือกจังหวัด';
            errors.value.district = selectedDistrict.value ? '' : 'กรุณาเลือกอำเภอ';
            errors.value.budget = selectedBudget.value ? '' : 'กรุณาเลือกงบประมาณ';

            // alert('Form submitted successfully!');
            if (Object.values(errors.value).every(error => !error)) {
                // alert('Form submitted successfully!');

                let object = {
                    budget: selectedBudget.value,
                    consents: [form.value.consents],
                    district: districts.value.find(d => d.id === selectedDistrict.value)?.name_th || '',
                    email: form.value.email,
                    firstName: form.value.fname,
                    lastName: form.value.sname,
                    locationOptions: [true, false], // อ้างอิงจาก ตัว microsite โดย set default kaset = true , ramintra = false
                    phoneNumber: form.value.tel,
                    province: provinces.value.find(p => p.id === selectedProvince.value)?.name_th || '',
                }

                // try {
                //     document.querySelector('.loading').classList.remove('hidden');
                //     document.querySelector('.loaded').classList.add('hidden');
                //     // Get reCAPTCHA token before submitting the form
                //     const token = await grecaptcha.execute('6LevUS0nAAAAAInOUaytl6bgNgWFE4FQt2yofWyZ', { action: 'submit' });

                //     // Add the token to the form object
                //     object.token = token;
                //     await axios.post('https://residential2.singhaestate.co.th/privateestate/smyths/droplead.php', object);
                //     isSuccess.value = true;
                //     document.body.style.overflow = 'hidden';
                // } catch (error) {
                //     document.querySelector('.loading').classList.add('hidden');
                //     document.querySelector('.loaded').classList.remove('hidden');
                //     console.log('>>error<<', error);
                //     const { response = {} } = error || {};
                //     const { status } = response;
                //     document.getElementById('btnSubmit').disabled = false;
                //     isSuccess.value = false;
                //     document.body.style.overflow = '';
                // }
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
                const response = await axios.get('/page/srin/srin-content-page/prannok/data/thai-provinces.json');
                provinces.value = response.data;
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        const fetchDistricts = async () => {
            try {
                const response = await axios.get('/page/srin/srin-content-page/prannok/data/thai-districts.json');
                districts.value = response.data;
                filteredDistricts.value = response.data;
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };

        const fetchBudgets = async () => {
            try {
                const response = await axios.get('/page/srin/srin-content-page/prannok/data/budget.json');
                budgets.value = response.data;
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
            AOS.init();
        };

        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };
        onMounted(async () => {
            await fetchProvinces();
            await fetchDistricts();
            await fetchBudgets();
            language.value = await getLanguageFromPath();
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
            language
        };
    },
});
