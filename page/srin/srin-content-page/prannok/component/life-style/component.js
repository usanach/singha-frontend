const LifeStyleComponent = defineComponent({
    name: 'LifeStyleComponent',
    template: `
    <section id="lifestyle"
        class="life-style-component py-10 min-h-screen relative flex bg-[#733C1F]">
        <div class="absolute inset-0 lg:max-h-none max-h-[1150px]">
            <video autoplay loop muted class="w-full h-full object-cover">
                <source src="/assets/image/page-smyth-kaset/life/gettyimages-472484535-640_adpp 1.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="absolute inset-0 bg-gradient-to-b from-[#733C1F]/50 lg:to-[#733C1F]/50 to-[#733C1F] -m-[1px]"></div>
        </div>
        <div class="container relative my-auto" data-aos="fade-up" data-aos-duration="1000" data-aos-easing="linear">
            <div class="flex flex-col gap-10">
                <div>
                    <h2 class="text-[40px] uppercase font-['Gotham'] font-medium text-center text-white">
                        S LIFESTYLE
                    </h2>
                    <p class="text-center text-white">
                        ไพรเวท เอสเตทที่ให้คุณสัมผัสชีวิตในแบบของคุณ บนทำเลศักยภาพ สิ่งอำนวยความสะดวกครบครัน ตอบโจทย์ทุกไลฟ์สไตล์ รองรับทั้งการใช้ชีวิตและการทำธุรกิจ​
                    </p>
                </div>
                <div class="flex gap-5 lg:flex-row flex-col lg:mt-5 mt-2">
                    <div class="lg:w-2/6 w-full space-y-3">
                        <p class="text-[24px] font-['Gotham'] font-medium uppercase text-white">
                            Distinctive Location
                        </p>
                        <p class="text-white">
                           ตั้งอยู่บนทำเลศักยภาพย่านเกษตร-นวมินทร์ ที่ซึ่งสมดุลพร้อมความสะดวกและสบาย เป็นทำเลศักยภาพสูง รายล้อมด้วยห้างสรรพสินค้า สถาบันการศึกษาชั้นนำ รวมถึงการเดินทางที่รวดเร็ว ใกล้ทางด่วน และรถไฟฟ้าเชื่อมสู่ศูนย์กลางธุรกิจใจกลางเมืองได้ทันที ​
                        </p>
                    </div>
                    <div class="flex lg:w-1/3 w-full">
                        <div class="w-1/2">
                            <p class="font-thin text-[80px] text-white leading-none text-center">
                                4.5
                            </p>
                            <p class="text-white text-center leading-none">
                                km
                            </p>
                            <p class="text-white text-center">
                                ถนนกาญจนาภิเษก
                            </p>
                        </div>
                        <div class="w-1/2">
                            <p class="font-thin text-[80px] text-white leading-none text-center">
                                8.5
                            </p>
                            <p class="text-white text-center leading-none">
                                km
                            </p>
                            <p class="text-white text-center">
                                โรงพยาบาลสินแพทย์ รามอินทรา
                            </p>
                        </div>
                    </div>
                    <div class="flex lg:w-1/3 w-full">
                        <div class="w-1/2">
                            <p class="font-thin text-[80px] text-white leading-none text-center">
                                7
                            </p>
                            <p class="text-white text-center leading-none">
                                km
                            </p>
                            <p class="text-white text-center">
                                แฟชั่นไอสแลนด์
                            </p>
                        </div>
                        <div class="w-1/2">
                            <p class="font-thin text-[80px] text-white leading-none text-center">
                                4.5
                            </p>
                            <p class="text-white text-center leading-none">
                                km
                            </p>
                            <p class="text-white text-center">
                                โรงเรียนนานาชาติร่วมฤดี
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex lg:gap-10 gap-2 mt-5 lg:flex-row flex-col">
                    <div class="space-y-3 lg:w-1/4 w-full pb-5">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-smyth-kaset/life/sedan_2736918.png" alt="" >
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
                                        ถนนกาญจนาภิเษก
                                    </div>
                                    <div>
                                        4.5 กม.
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        ทางด่วนศรีรัช ด่านจตุโชติ
                                    </div>
                                    <div>
                                        7.5 กม.
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        สนามบินดอนเมือง
                                    </div>
                                    <div>
                                        21.0 กม.
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        สนามบินสุวรรณภูมิ
                                    </div>
                                    <div>
                                        24.0 กม.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-[1px] bg-white/30 mt-3"></div>
                    <div class="space-y-3 lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-smyth-kaset/life/medic.png" alt="" class="w-[33px]">
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
                                        โรงพยาบาลสินแพทย์ รามอินทรา
                                    </div>
                                    <div>
                                        8.5 กม.
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        โรงพยาบาลพญาไท นวมินทร์
                                    </div>
                                    <div>
                                        8.5 กม.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-[1px] bg-white/30 mt-3"></div>
                    <div class="space-y-3 lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-smyth-kaset/life/shopping-cart_833314.png" alt="" class="w-[33px]">
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
                                        แม็กซ์แวลู คู้บอน
                                    </div>
                                    <div>
                                        3.5 กม.
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        แจส กรีน วิลเลจ
                                    </div>
                                    <div>
                                        4.0 กม.
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        แฟชั่นไอสแลนด์
                                    </div>
                                    <div>
                                        7.0 กม.
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        เซ็นทรัล อีสต์วิลล์
                                    </div>
                                    <div>
                                        16.0 กม.
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="w-[1px] bg-white/30 mt-3"></div>
                    <div class="space-y-3 lg:w-1/4 w-full pb-5 lg:block" :class="{ hidden: !expand }">
                        <div class="h-[40px]">
                            <img src="/assets/image/page-smyth-kaset/life/education_13807278.png">
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
                                        โรงเรียนสาธิตพัฒนา
                                    </div>
                                    <div>
                                        2.5 กม.
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        โรงเรียนนานาชาติร่วมฤดี
                                    </div>
                                    <div>
                                        4.5 กม.
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        โรงเรียนนานาชาติกีรพัฒน์
                                    </div>
                                    <div>
                                        10.5 กม.
                                    </div>
                                </li>
                                <li class="flex justify-between text-white">
                                    <div>
                                        โรงเรียนเลิศหล้า
                                    </div>
                                    <div>
                                        13.5 กม.
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
