const LifeStyleComponent = defineComponent({
    name: 'LifeStyleComponent',
    template: `
    <section id="lifestyle" data-section="s_lifestyle"
        class="life-style-component py-10 min-h-screen relative flex bg-[#33617D] onview">
        <div class="absolute inset-0 lg:max-h-none max-h-[1150px]">
            <video autoplay loop muted playsinline class="w-full h-full object-cover">
                <source src="/assets/image/page-srin-prannok/life/gettyimages-89735866-640_adpp.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="absolute inset-0 bg-gradient-to-b from-[#33617D]/50 lg:to-[#33617D]/50 to-[#33617D] -m-[1px]"></div>
        </div>
        <div class="container relative my-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
            <div class="flex flex-col gap-10">
                <div>
                    <h2 class="text-[40px] uppercase font-['Kaisei_Decol'] font-medium text-center text-white">
                        S LIFESTYLE
                    </h2>
                    <p class="text-center text-white">
                        บ้านที่สง่างามในทุกรายละเอียด บนทำเลที่รังสรรค์เพื่อทุกเจเนอเรชั่น
                    </p>
                </div>
                <div class="flex gap-5 lg:flex-row flex-col lg:mt-5 mt-2">
                    <div class="lg:w-2/6 w-full space-y-3">
                        <p class="text-[24px] font-['Gotham'] font-medium uppercase text-white">
                            Distinctive Location
                        </p>
                        <p class="text-white">
                           ตั้งอยู่บนทำเลถนนพรานนกตัดใหม่ เชื่อมต่อสู่ตัวเมืองได้หลายเส้นทาง รายล้อมไปด้วยสิ่งอำนวยความสะดวกแหล่งไลฟ์สไตล์ต่างๆมากมาย อีกทั้งยังมีโรงเรียนนานาชาติและ โรงพยาบาลชั้นนำ​ ​
                        </p>
                    </div>
                    <div class="flex lg:w-1/3 w-full">
                        <div class="w-1/2">
                            <p class="font-thin text-[80px] text-white leading-none text-center">
                                2.5
                            </p>
                            <p class="text-white text-center leading-none">
                                km
                            </p>
                            <p class="text-white text-center">
                                King Power <br>Rangnam
                            </p>
                        </div>
                        <div class="w-1/2">
                            <p class="font-thin text-[80px] text-white leading-none text-center">
                                10
                            </p>
                            <p class="text-white text-center leading-none">
                                m
                            </p>
                            <p class="text-white text-center">
                                Santiphap Park, over 20 rai of green space
                            </p>
                        </div>
                    </div>
                    <div class="flex lg:w-1/3 w-full">
                        <div class="w-1/2">
                            <p class="font-thin text-[80px] text-white leading-none text-center">
                                700
                            </p>
                            <p class="text-white text-center leading-none">
                                m
                            </p>
                            <p class="text-white text-center">
                                From <br>Wannasorn Tower
                            </p>
                        </div>
                        <div class="w-1/2">
                            <p class="font-thin text-[80px] text-white leading-none text-center">
                                400
                            </p>
                            <p class="text-white text-center leading-none">
                                m
                            </p>
                            <p class="text-white text-center">
                                from BTS <br>Victory monument
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex lg:gap-10 gap-2 mt-5 lg:flex-row flex-col">
                    <div class="space-y-3 lg:w-1/4 w-full pb-5">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-srin-prannok/life/sedan_2736918.png" alt="" >
                        </div>
                        <div>
                            <p class="text-[16px] font-['Gotham'] font-medium uppercase text-white uppercase">
                                Transportations
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="flex justify-between text-white">
                                    <div>
                                        BTS Victory Monument
                                    </div>
                                    <div>
                                        400m
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        BTS Phayathai
                                    </div>
                                    <div>
                                        450m
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        Airport Link Phayathai
                                    </div>
                                    <div>
                                        900m
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-[1px] bg-white/30 mt-3"></div>
                    <div class="space-y-3 lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-srin-prannok/life/medic.png" alt="" class="w-[33px]">
                        </div>
                        <div>
                            <p class="text-[16px] font-['Gotham'] font-medium uppercase text-white uppercase">
                                Hospitals
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="flex justify-between text-white">
                                    <div>
                                        Rajavithi Hospital 
                                    </div>
                                    <div>
                                        550m
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        Phayathai I Hospital
                                    </div>
                                    <div>
                                        950m
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        Phayathai II Hospital
                                    </div>
                                    <div>
                                        1.5km
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        Ramathibodi Hospital
                                    </div>
                                    <div>
                                        2.3km
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        Phramongkutklao Hospital
                                    </div>
                                    <div>
                                        2.3km
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-[1px] bg-white/30 mt-3"></div>
                    <div class="space-y-3 lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-srin-prannok/life/shopping-cart_833314.png" alt="" class="w-[33px]">
                        </div>
                        <div>
                            <p class="text-[16px] font-['Gotham'] font-medium uppercase text-white uppercase">
                                Surrounding Amenities
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="flex justify-between text-white">
                                    <div>
                                        Santiphap Park
                                    </div>
                                    <div>
                                        10m
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        King Power Complex
                                    </div>
                                    <div>
                                        23m
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        Century the Movie Plaza
                                    </div>
                                    <div>
                                        400m
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-[1px] bg-white/30 mt-3"></div>
                    <div class="space-y-3 lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-srin-prannok/life/education_13807278.png">
                        </div>
                        <div>
                            <p class="text-[16px] font-['Gotham'] font-medium uppercase text-white uppercase">
                                Educations
                            </p>
                        </div>
                        <div>
                            <ul>
                                <li class="flex justify-between text-white">
                                    <div>
                                        Wannasorn Tower
                                    </div>
                                    <div>
                                        700m
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        Faculty of Dentistry, Mahidol University
                                    </div>
                                    <div>
                                        1.7km
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        Chulalongkorn University
                                    </div>
                                    <div>
                                        400m
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="relative lg:hidden block w-full">
                        <button 
                            type="button" 
                            id="expand-div" 
                            class="px-5 text-center w-full border border-1 border-white py-3 text-white text-[24px]"
                            :class="{ hidden: expand }"
                            @click="showMore">
                            <p>อ่านเพิ่มเติม</p>
                            <span class="absolute right-0 top-1/2 -translate-y-1/2 mr-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13.114" height="7.498" viewBox="0 0 13.114 7.498">
                                    <path id="Icon_ionic-ios-arrow-down" data-name="Icon ionic-ios-arrow-down"
                                        d="M12.747,16.484l4.958-4.962a.933.933,0,0,1,1.324,0,.945.945,0,0,1,0,1.327L13.41,18.471a.935.935,0,0,1-1.292.027L6.461,12.853a.937.937,0,0,1,1.324-1.327Z"
                                        transform="translate(-6.188 -11.247)" fill="#fff" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `,
    setup() {
        const expand = ref(false);

        const showMore = () => {
            expand.value = true;
        };

        onMounted(() => {
        });

        return { expand, showMore };
    }
});
