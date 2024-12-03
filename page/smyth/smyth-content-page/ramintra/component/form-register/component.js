// Define the Header component
const FormRegisterComponent = defineComponent({
    name: 'FormRegisterComponent',
    template: `
    <section class="form-register">
        <div class="lg:flex relative">
            <div class="absolute left-0 top-0 w-full h-full lg:flex hidden">
                <div class="w-1/2 h-full bg-[url('/assets/image/page-smyth-kaset/register/305011_0.png')] bg-cover bg-center">
                </div>
                <div class="w-1/2 h-full bg-[url('/assets/image/page-smyth-kaset/register/bg.png')] bg-cover bg-center"></div>
            </div>
            <div class="lg:hidden">
                <img src="/assets/image/page-smyth-kaset/register/305011_0.png" alt="" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear">
            </div>
            <div class="container mx-auto z-10 flex lg:bg-none bg-[url('/assets/image/page-smyth-kaset/register/bg.png')] bg-cover bg-center" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear">
                <form action="" class="lg:w-1/2 w-full ml-auto lg:p-20 lg:py-20 py-10">
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
                                        <input type="text" name="fname" id=""
                                            class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full"
                                            placeholder="ชื่อ*">
                                    </div>
                                    <div class="lg:w-1/2 w-full">
                                        <input type="text" name="sname" id=""
                                            class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full"
                                            placeholder="นามสกุล*">
                                    </div>
                                </div>
                                <div class="flex gap-8 lg:flex-row flex-col">
                                    <div class="lg:w-1/2 w-full">
                                        <input type="text" name="email" id=""
                                            class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full"
                                            placeholder="อีเมล*">
                                    </div>
                                    <div class="lg:w-1/2 w-full">
                                        <input type="text" name="tel" id=""
                                            class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full"
                                            placeholder="เบอร์โทรศัพท์*">
                                    </div>
                                </div>
                                <div class="flex gap-8 lg:flex-row flex-col">
                                    <div class="lg:w-1/2 w-full relative">
                                        <label for="province"
                                            class="text-white w-full absolute top-0 left-0 w-full h-full cursor-pointer">{{selectedProvince ==null ? 'จังหวัด*':''}}</label>
                                        <select name="province" id="province" v-model="selectedProvince"
                                            class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full relative cursor-pointer"
                                            @change="filterDistricts">
                                            <option v-for="province in provinces" :key="province.id" :value="province.id" class="text-black">
                                                {{ province.name_th }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="lg:w-1/2 w-full relative">
                                        <label for="district"
                                            class="text-white w-full absolute top-0 left-0 w-full h-full cursor-pointer">{{selectedDistrict ==null ? 'อำเภอ*':''}}</label>
                                        <select name="district" id="district" v-model="selectedDistrict"
                                            class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full relative cursor-pointer">
                                            <option v-if="selectedProvince==null" class="text-black" disabled>
                                                กรุณาเลือกจังหวัด
                                            </option>
                                            <option v-if="selectedProvince !=null" v-for="district in filteredDistricts" :key="district.id" :value="district.id" class="text-black">
                                                {{ district.name_th }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="flex gap-8 lg:flex-row flex-col">
                                    <div class="w-full ">
                                        <p class="text-white">งบประมาณ</p>
                                        <div class="relative">
                                            <label for="budget"
                                                class="text-white w-full absolute top-0 left-0 w-full h-full cursor-pointer">{{selectedBudget !==null?'':'Select Budget'}}</label>
                                            <select name="budget" id="budget" v-model="selectedBudget"
                                                    class="text-white bg-transparent border border-b-1 border-l-0 border-t-0 border-r-0 w-full relative cursor-pointer">
                                                <option v-for="budget in budgets" :key="budget.id" :value="budget.title" class="text-black">
                                                    {{budget.title}}
                                                </option>
                                        </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex gap-8 lg:flex-row flex-col">
                                    <div class="w-full">
                                        <div class="flex items-center space-x-2">
                                            <div class="relative mb-auto">
                                                <input type="checkbox" id="custom-checkbox" class="hidden peer">
        
                                                <label for="custom-checkbox"
                                                    class="w-[15px] h-[15px] border-2 border-gray-300 bg-white rounded-sm flex items-center justify-center cursor-pointer peer-checked:bg-gray-500">
                                                    <!-- Check Icon -->
                                                </label>
                                                <label for="custom-checkbox"
                                                    class="cursor-pointer text-white hidden peer-checked:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                                    <img src="/assets/icon/checked.svg" alt="" class="w-[10px] h-[10px]">
                                                </label>
                                            </div>
        
                                            <!-- Label Text -->
                                            <span class="text-white text-[12px]">ท่านตกลงรับข้อมูลเกี่ยวกับผลิตภัณฑ์, บริการ
                                                และข่าวสารกิจกรรมของกลุ่มธุรกิจบริษัทในเครือสิงห์ เอสเตท และพันธมิตรของบริษัทฯ
                                                และรับทราบข้อกำหนด และวัตถุประสงค์การใช้ข้อมูลที่ระบุไว้ใน <a
                                                    class='notice-bold underline'
                                                    href='https://www.singhaestate.co.th/en/privacy-notice?&_ga=2.63773359.1474642135.1727241573-885017993.1707963665&_gac=1.261361279.1724900635.CjwKCAjwlbu2BhA3EiwA3yXyu0JpthQzF-0t4GTZ_zA71-2X9vs-f0zjNgSBLTJRVo-X3dqnTudJ7BoCuH4QAvD_BwE#1'
                                                    target='_blank'>นโยบายความเป็นส่วนตัว</a></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="mx-auto">
                                    <button type="button" class="border border-1 border-white px-16 py-2 hover:bg-white/30 lg:w-auto w-full">
                                        <p class="text-nowrap font-normal text-white">
                                            ลงทะเบียน
                                        </p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
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

        // Fetch provinces
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('/page/smyth/smyth-content-page/kaset-nawamin/data/thai-provinces.json');
                provinces.value = response.data;
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        // Fetch all districts
        const fetchDistricts = async () => {
            try {
                const response = await axios.get('/page/smyth/smyth-content-page/kaset-nawamin/data/thai-districts.json');
                districts.value = response.data;
                filteredDistricts.value = response.data; // Display all districts initially
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };

        // Fetch budget
        const fetchBudgets = async () => {
            try {
                const response = await axios.get('/page/smyth/smyth-content-page/kaset-nawamin/data/budget.json');
                budgets.value = response.data;
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        };

        // Filter districts based on the selected province
        const filterDistricts = () => {
            if (!selectedProvince.value) {
                filteredDistricts.value = districts.value; // Show all if no province is selected
            } else {
                filteredDistricts.value = districts.value.filter(district => district.province_id === selectedProvince.value);
            }
        };

        const init = () => {
            AOS.init();
        };

        onMounted(async () => {
            await fetchProvinces();
            await fetchDistricts();
            await fetchBudgets();
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
            filterDistricts,
            fetchBudgets
        };
    },
});
