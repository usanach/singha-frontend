

const provinces = {
    "กรุงเทพมหานคร": ["เขตพระนคร", "เขตดุสิต", "เขตหนองจอก", "เขตบางรัก", "เขตบางเขน", "เขตบางกะปิ", "เขตบึงกุ่ม", "เขตสาทร", "เขตปทุมวัน", "เขตพระโขนง", "เขตคลองเตย", "เขตวัฒนา", "เขตบางซื่อ", "เขตดินแดง", "เขตห้วยขวาง", "เขตจตุจักร", "เขตลาดพร้าว", "เขตประเวศ", "เขตสวนหลวง", "เขตราษฎร์บูรณะ", "เขตบางพลัด", "เขตบางขุนเทียน", "เขตทวีวัฒนา", "เขตบางแค", "เขตหนองแขม", "เขตหนองจอก", "เขตลาดกระบัง"],
    "กระบี่": ["อำเภอเมืองกระบี่", "อำเภอคลองท่อม", "อำเภอเกาะลันตา", "อำเภอเขาพนม", "อำเภอเหนือคลอง", "อำเภออ่าวลึก", "อำเภออ่าวลึก"],
    "กาญจนบุรี": ["อำเภอเมืองกาญจนบุรี", "อำเภอไทรโยค", "อำเภอทองผาภูมิ", "อำเภอปากท่อ", "อำเภอพนมทวน", "อำเภอท่าม่วง", "อำเภอท่ามะกา", "อำเภอสองพี่น้อง", "อำเภอเลาขวัญ", "อำเภอบ่อพลอย", "อำเภอหนองปรือ", "อำเภอศรีสวัสดิ์", "อำเภอหนองปรือ"],
    "กรุงเทพมหานคร": ["เขตพระนคร", "เขตดุสิต", "เขตหนองจอก", "เขตบางรัก", "เขตบางเขน", "เขตบางกะปิ", "เขตบึงกุ่ม", "เขตสาทร", "เขตปทุมวัน", "เขตพระโขนง", "เขตคลองเตย", "เขตวัฒนา", "เขตบางซื่อ", "เขตดินแดง", "เขตห้วยขวาง", "เขตจตุจักร", "เขตลาดพร้าว", "เขตประเวศ", "เขตสวนหลวง", "เขตราษฎร์บูรณะ", "เขตบางพลัด", "เขตบางขุนเทียน", "เขตทวีวัฒนา", "เขตบางแค", "เขตหนองแขม", "เขตหนองจอก", "เขตลาดกระบัง"],
    "ขอนแก่น": ["อำเภอเมืองขอนแก่น", "อำเภอคลองหลวง", "อำเภอเขาสวนกวาง", "อำเภอเขาวง", "อำเภอน้ำพอง", "อำเภอหนองเรือ", "อำเภอหนองสองห้อง", "อำเภอสีชมพู", "อำเภอสีคิ้ว", "อำเภอมัญจาคีรี", "อำเภอแวงใหญ่", "อำเภอแวงน้อย"],
    "เชียงราย": ["อำเภอเมืองเชียงราย", "อำเภอเชียงของ", "อำเภอเชียงแสน", "อำเภอแม่จัน", "อำเภอแม่ฟ้าหลวง", "อำเภอแม่สาย", "อำเภอเวียงแก่น", "อำเภอพะเยา", "อำเภอป่าแดด"],
    "เชียงใหม่": ["อำเภอเมืองเชียงใหม่", "อำเภอจอมทอง", "อำเภอแม่ริม", "อำเภอแม่แจ่ม", "อำเภอแม่วาง", "อำเภอแม่อาย", "อำเภอสะเมิง", "อำเภอสันป่าตอง", "อำเภอสันกำแพง", "อำเภอสันทราย", "อำเภอหางดง", "อำเภอหางดง"],
    "ชลบุรี": ["อำเภอเมืองชลบุรี", "อำเภอพานทอง", "อำเภอบางละมุง", "อำเภอสัตหีบ", "อำเภอเกาะสีชัง", "อำเภอบ่อทอง", "อำเภอหนองใหญ่", "อำเภอศรีราชา", "อำเภอพานทอง"],
    "ชัยภูมิ": ["อำเภอเมืองชัยภูมิ", "อำเภอแก้งคร้อ", "อำเภอเกษตรสมบูรณ์", "อำเภอคอนสาร", "อำเภอหนองบัวแดง", "อำเภอบ้านเขว้า", "อำเภอเนินสง่า", "อำเภอหนองบัวแดง", "อำเภอภักดีชุมพล", "อำเภอจัตุรัส"],
    "ชุมพร": ["อำเภอเมืองชุมพร", "อำเภอท่าแซะ", "อำเภอปะทิว", "อำเภอหลังสวน", "อำเภอสวี", "อำเภอพะโต๊ะ", "อำเภอไชยา", "อำเภอบ้านนา"],
    "ชัยนาท": ["อำเภอเมืองชัยนาท", "อำเภอวัดสิงห์", "อำเภอหันคา", "อำเภอสรรพยา", "อำเภอหนองมะโมง", "อำเภอบ้านโพธิ์", "อำเภอบางขุนเทียน"],
    "ยะลา": ["อำเภอเมืองยะลา", "อำเภอเบตง", "อำเภอยะหา", "อำเภอยะหาคี", "อำเภอรามัน", "อำเภอกรงปินัง", "อำเภอแม่ลาน", "อำเภอท่าสองยาง"],
    "นครราชสีมา": ["อำเภอเมืองนครราชสีมา", "อำเภอครบุรี", "อำเภอปากช่อง", "อำเภอสีคิ้ว", "อำเภอหนองบุญมาก", "อำเภอหนองบุญมาก", "อำเภอวังน้ำเขียว", "อำเภอพิมาย", "อำเภอจักราช"],
    "นราธิวาส": ["อำเภอเมืองนราธิวาส", "อำเภอบาเจาะ", "อำเภอยี่งอ", "อำเภอบาเจาะ", "อำเภอแว้ง", "อำเภอสุไหงโกลก", "อำเภอสุไหงปาดี", "อำเภอเจาะไอร้อง"],
    "นครพนม": ["อำเภอเมืองนครพนม", "อำเภอท่าอุเทน", "อำเภอนาแก", "อำเภอนาโพธิ์", "อำเภอศรีสงคราม", "อำเภอเรณูนคร"],
    "นครสวรรค์": ["อำเภอเมืองนครสวรรค์", "อำเภอชุมแสง", "อำเภอท่าตะโก", "อำเภอหนองบัว", "อำเภอพยุหะคีรี", "อำเภอบรรพตพิสัย"],
    "นครศรีธรรมราช": ["อำเภอเมืองนครศรีธรรมราช", "อำเภอชะอวด", "อำเภอทุ่งสง", "อำเภอขนอม", "อำเภอปากพนัง", "อำเภอพรหมคีรี", "อำเภอหัวไทร"],
    "นครนายก": ["อำเภอเมืองนครนายก", "อำเภอปากพลี", "อำเภอบ้านนา", "อำเภอเขื่อน"],
    "นครปฐม": ["อำเภอเมืองนครปฐม", "อำเภอนครชัยศรี", "อำเภอสามพราน", "อำเภอบางเลน"],
    "น่าน": ["อำเภอเมืองน่าน", "อำเภอปัว", "อำเภอเชียงกลาง", "อำเภอเวียงสา", "อำเภอทุ่งช้าง", "อำเภอทุ่งช้าง"],
    "บุรีรัมย์": ["อำเภอเมืองบุรีรัมย์", "อำเภอคูเมือง", "อำเภอประโคนชัย", "อำเภอหนองกี่", "อำเภอแคนดง", "อำเภอลำปลายมาศ"],
    "ปราจีนบุรี": ["อำเภอเมืองปราจีนบุรี", "อำเภอศรีมโหสถ", "อำเภอนาดี", "อำเภอบ้านสร้าง"],
    "ปทุมธานี": ["อำเภอเมืองปทุมธานี", "อำเภอลำลูกกา", "อำเภอธัญบุรี", "อำเภอคลองหลวง", "อำเภอสามโคก"],
    "แพร่": ["อำเภอเมืองแพร่", "อำเภอร้องกวาง", "อำเภอร้องกวาง", "อำเภอสอง"],
    "พัทลุง": ["อำเภอเมืองพัทลุง", "อำเภอควนขนุน", "อำเภอศรีบรรพต", "อำเภอป่าบอน"],
    "พิจิตร": ["อำเภอเมืองพิจิตร", "อำเภอสามง่าม", "อำเภอพรรณานิคม", "อำเภอหนองบัว"],
    "พะเยา": ["อำเภอเมืองพะเยา", "อำเภอเชียงคำ", "อำเภอเชียงของ", "อำเภอปง"],
    "ภูเก็ต": ["อำเภอเมืองภูเก็ต", "อำเภอถลาง", "อำเภอราไวย์"],
    "เพชรบุรี": ["อำเภอเมืองเพชรบุรี", "อำเภอชะอำ", "อำเภอหนองคล้า"],
    "เพชรบูรณ์": ["อำเภอเมืองเพชรบูรณ์", "อำเภอชนแดน", "อำเภอหนองไผ่"],
    "แม่ฮ่องสอน": ["อำเภอเมืองแม่ฮ่องสอน", "อำเภอปาย", "อำเภอแม่สะเรียง", "อำเภอแม่ลาน"],
    "ยโสธร": ["อำเภอเมืองยโสธร", "อำเภอคำเขื่อนแก้ว", "อำเภอเลิงนกทา"],
    "ยะลา": ["อำเภอเมืองยะลา", "อำเภอเบตง", "อำเภอปาดังเบซาร์", "อำเภอยะหา"],
    "เชียงใหม่": ["อำเภอเมืองเชียงใหม่", "อำเภอจอมทอง", "อำเภอแม่ริม", "อำเภอแม่แจ่ม", "อำเภอแม่วาง"],
    "สระแก้ว": ["อำเภอเมืองสระแก้ว", "อำเภออรัญประเทศ", "อำเภอเขาฉกรรจ์", "อำเภอคลองหาด"],
    "ระยอง": ["อำเภอเมืองระยอง", "อำเภอบ้านค่าย", "อำเภอเขาชะเมา"],
    "ราชบุรี": ["อำเภอเมืองราชบุรี", "อำเภอบ้านโป่ง", "อำเภอจอมบึง", "อำเภอปากท่อ"],
    "ลพบุรี": ["อำเภอเมืองลพบุรี", "อำเภอท่าหลวง", "อำเภอเมืองลพบุรี", "อำเภอพัฒนานิคม"],
    "ลำพูน": ["อำเภอเมืองลำพูน", "อำเภอแม่ทา", "อำเภอแม่อาย", "อำเภอพรหมพิราม"],
    "สกลนคร": ["อำเภอเมืองสกลนคร", "อำเภอกุดบาก", "อำเภอพรรณานิคม"],
    "สงขลา": ["อำเภอเมืองสงขลา", "อำเภอหาดใหญ่", "อำเภอสทิงพระ", "อำเภอสะเดา"],
    "สตูล": ["อำเภอเมืองสตูล", "อำเภอควนโดน", "อำเภอละงู", "อำเภอทุ่งหว้า"],
    "สุพรรณบุรี": ["อำเภอเมืองสุพรรณบุรี", "อำเภอบางปลาม้า", "อำเภอสองพี่น้อง"],
    "สุรินทร์": ["อำเภอเมืองสุรินทร์", "อำเภอพนมดงรัก", "อำเภอศรีขรภูมิ"],
    "สุราษฎร์ธานี": ["อำเภอเมืองสุราษฎร์ธานี", "อำเภอท่าชนะ", "อำเภอเกาะสมุย"],
    "สุราษฎร์ธานี": ["อำเภอเมืองสุราษฎร์ธานี", "อำเภอเกาะสมุย", "อำเภอท่าชนะ"],
    "อ่างทอง": ["อำเภอเมืองอ่างทอง", "อำเภอวิเศษชัยชาญ", "อำเภอแสวงหา"],
    "อำนาจเจริญ": ["อำเภอเมืองอำนาจเจริญ", "อำเภอชานุมาน", "อำเภอปทุมราชวงศา"],
    "อุดรธานี": ["อำเภอเมืองอุดรธานี", "อำเภอหนองหาน", "อำเภอบ้านดุง"],
    "อุบลราชธานี": ["อำเภอเมืองอุบลราชธานี", "อำเภอสิรินธร", "อำเภอเขมราฐ"],
    "อุทัยธานี": ["อำเภอเมืองอุทัยธานี", "อำเภอหนองฉาง", "อำเภอทัพทัน"]
};

const floorPlanImg = [
    { src: './../../../assets/Floor-plan/B1-Basement.jpg' },
    { src: './../../../assets/Floor-plan/ground-floor.jpg' },
    { src: './../../../assets/Floor-plan/2nd.jpg' },
    { src: './../../../assets/Floor-plan/6th.jpg' },
    { src: './../../../assets/Floor-plan/7th-21st.jpg' },
    { src: './../../../assets/Floor-plan/22nd.jpg' },
    { src: './../../../assets/Floor-plan/23rd.jpg' },
    { src: './../../../assets/Floor-plan/24th-26th.jpg' },
    { src: './../../../assets/Floor-plan/27th.jpg' },
    { src: './../../../assets/Floor-plan/28th.jpg' },
    { src: './../../../assets/Floor-plan/29th.jpg' },
    { src: './../../../assets/Floor-plan/30th.jpg' },
    { src: './../../../assets/Floor-plan/32nd.jpg' },
    { src: './../../../assets/Floor-plan/33rd.jpg' },
    { src: './../../../assets/Floor-plan/roof.jpg' },
];

const floorPlanOp = [
    'B1-Basement',
    'Ground Floor',
    '2nd Floor',
    '6th Floor',
    '7th-21st Floor',
    '22nd Floor',
    '23rd Floor',
    '24th-26th Floor',
    '27th Floor',
    '28th Floor',
    '29th Floor',
    '30th Floor',
    '32nd Floor',
    '33rd Floor',
    'Roof',
];

const unitPlanImg = [
    { src: './../../../assets/Unit-plan/1-Bedroom-Flexi-1A-1.jpg' },
    { src: './../../../assets/Unit-plan/1-Bedroom-1B-1.jpg' },
    { src: './../../../assets/Unit-plan/1-Bedroom-1B-2.jpg' },
    { src: './../../../assets/Unit-plan/1-Bedroom-1B-3.jpg' },
    { src: './../../../assets/Unit-plan/2-Bedroom-2C-1.jpg' },
    { src: './../../../assets/Unit-plan/2-Bedroom-2C-2.jpg' },
    { src: './../../../assets/Unit-plan/2-Bedroom-2C-3.jpg' },
    { src: './../../../assets/Unit-plan/2-Bedroom-2C-4.jpg' },
    { src: './../../../assets/Unit-plan/2-Bedroom-2C-5.jpg' },
    { src: './../../../assets/Unit-plan/2-Bedroom-2C-6.jpg' },
    { src: './../../../assets/Unit-plan/2-Bedroom-2C-7.jpg' },
    { src: './../../../assets/Unit-plan/2-Bedroom-2C-8.jpg' },
    { src: './../../../assets/Unit-plan/2-Bedroom-Plus-2CX-1.jpg' },
    { src: './../../../assets/Unit-plan/2-Bedroom-Plus-2CX-2.jpg' },
    { src: './../../../assets/Unit-plan/Duplex-Room-2DP-1.jpg' },
    { src: './../../../assets/Unit-plan/Duplex-Room-2DPX-1.jpg' },
    { src: './../../../assets/Unit-plan/Duplex-Room-2DPX-2.jpg' },
    { src: './../../../assets/Unit-plan/Duplex-Room-2DPX-3.jpg' },
    { src: './../../../assets/Unit-plan/Duplex-Room-2DPX-4.jpg' },
];

const unitPlanOp = [
    '1-Bedroom-Flexi-1A-1',
    '1-Bedroom-1B-1',
    '1-Bedroom-1B-2',
    '1-Bedroom-1B-3',
    '2-Bedroom-2C-1',
    '2-Bedroom-2C-2',
    '2-Bedroom-2C-3',
    '2-Bedroom-2C-4',
    '2-Bedroom-2C-5',
    '2-Bedroom-2C-6',
    '2-Bedroom-2C-7',
    '2-Bedroom-2C-8',
    '2-Bedroom-Plus-2CX-1',
    '2-Bedroom-Plus-2CX-2',
    'Duplex-Room-2DP-1',
    'Duplex-Room-2DPX-1',
    'Duplex-Room-2DPX-2',
    'Duplex-Room-2DPX-3',
    'Duplex-Room-2DPX-4',
];

document.addEventListener('DOMContentLoaded', () => {

    const stickyHeaderDesktop = document.querySelector('.sticky-header-desktop');
    const logoImg = stickyHeaderDesktop.querySelector('.logo-sticky a img');

    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        // console.log(scrollTop);

        if (scrollTop > 0) {
            stickyHeaderDesktop.classList.add('scrolled');
            logoImg.src = '../../../assets/image-extro/the extro-logo-black.svg';
            logoImg.style.width = '77px';
            logoImg.style.height = '35px';
        } else {
            stickyHeaderDesktop.classList.remove('scrolled');
            logoImg.src = '../../../assets/image-extro/the extro-logo.svg';
            logoImg.style.width = '77px';
            logoImg.style.height = '35px';
        }
    });


    const swiper1 = new Swiper('#swiper1', {
        initialSlide: 1,
        centeredSlides: true,
        watchSlidesVisibility: true,
        autoplay: {
            delay: 3000,
        },
        loop: true,
        allowTouchMove: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 4.75,
            },
            768: {
                slidesPerView: 3.25,
            },
            1024: {
                slidesPerView: 4.66,
            },
            1367: {
                slidesPerView: 4.75,
            },
            1440: {
                slidesPerView: 4.75,
            },
            1920: {
                slidesPerView: 4.67,
            }
        },
    });

    const swiper4 = new Swiper('#swiper4', {
        initialSlide: 1,
        centeredSlides: true,
        watchSlidesVisibility: true,
        autoplay: {
            delay: 3000,
        },
        loop: true,
        allowTouchMove: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 2.2,
            },
            560: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 3.5,
            },
            1366: {
                slidesPerView: 4.5,
            }
        }
    });
    swiper1.update();

    // Initialize Swiper instance
    const swiperSignature = new Swiper('#swiper-signature', {
        initialSlide: 0,
        loop: true,
        watchSlidesVisibility: false,
        centeredSlides: false,
        roundLengths: false,
        pagination: {
            el: '.signature-swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '#signature-button-next',
            prevEl: '#signature-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 0.6,
                allowTouchMove: true,
            },
            768: {
                slidesPerView: 1.05,
                allowTouchMove: true,
                spaceBetween: 50,
            },
            1366: {
                slidesPerView: 1.1,
                allowTouchMove: false,
                spaceBetween: 50,
            }
        },
    });

    function updatePagination() {
        const currentSlide = swiperSignature.realIndex + 1;
        const totalSlides = swiperSignature.slides.length;
        document.getElementById('signature-pag').textContent = `${currentSlide} / ${totalSlides}`;
    }

    swiperSignature.on('slideChange', function () {
        updatePagination();
    });

    const swiper3 = new Swiper('#swiper3', {
        initialSlide: 0,
        loop: false,
        centeredSlides: false,
        roundLengths: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '#pagination-btn-right',
            prevEl: '#pagination-btn-left',
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 4,
            },
            1366: {
                slidesPerView: 4,
            }
        }
    });

    const autoplayDelay = 5000;

    const swiperIntroBG = new Swiper('#swiper-intro-bg', {
        initialSlide: 0,
        loop: true,
        autoplay: {
            delay: autoplayDelay,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        speed: 1000,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '#intro-button-next',
            prevEl: '#intro-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            1366: {
                slidesPerView: 1,
            }
        }
    });

    function updatePaginationIntro() {
        const currentSlide = swiperIntroBG.realIndex + 1;
        const totalSlides = swiperIntroBG.slides.length;
        document.getElementById('intro-pag').textContent = `${currentSlide} / ${totalSlides}`;
    }

    swiperIntroBG.on('slideChange', function () {
        updatePaginationIntro();
    });

    updatePaginationIntro();

    // progress bar
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    const navBar = document.querySelector('.intro-nav-bar');
    function createNavBar() {
        const totalSlides = swiperIntroBG.slides.length;
        navBar.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const navDot = document.createElement('div');
            navDot.className = 'nav';
            navBar.appendChild(navDot);
        }
        navBar.appendChild(progressFill);
    }

    function updateProgressBar() {
        const totalSlides = swiperIntroBG.slides.length;
        const totalProgressWidth = 100;
        const slideIndex = swiperIntroBG.realIndex;
        const now = Date.now();
        const elapsedTime = now - lastSlideChangeTime;
        const progressPercentage = (elapsedTime / (autoplayDelay + 1050)) * (totalProgressWidth / totalSlides);

        let progressWidth = (slideIndex * (totalProgressWidth / totalSlides)) + Math.min(progressPercentage, totalProgressWidth / totalSlides);
        progressFill.style.width = `${progressWidth}%`;

        document.querySelectorAll('.intro-nav-bar .nav').forEach((dot, index) => {
            if (index === slideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        if (progressPercentage >= (totalProgressWidth / totalSlides)) {
            lastSlideChangeTime = now;
        }
    }

    let lastSlideChangeTime = Date.now();
    function startProgressBar() {
        createNavBar();
        setInterval(updateProgressBar, 100);
    }

    swiperIntroBG.on('slideChange', function () {
        lastSlideChangeTime = Date.now();
        updateProgressBar();
    });

    startProgressBar();

    // Initialize the smoothscroll polyfill
    if (!('scrollBehavior' in document.documentElement.style)) {
        let script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.polyfill.min.js';
        script.onload = function () {
            smoothscroll.polyfill();
        };
        document.head.appendChild(script);
    }

    if ('scrollBehavior' in document.documentElement.style) {
        // console.log('Native smooth scroll is supported');
    } else {
        // console.log('Initializing Smoothscroll Polyfill');
        smoothscroll.polyfill();
    }

    // Menu smooth scroll for desktop versionฃ
    const desktopLinks = document.querySelectorAll('.link-sticky a, .register-btn-sticky');
    let firstClick = true;


    function getOffsetTop(element) {
        let offsetTop = 0;
        while (element) {
            offsetTop += element.offsetTop;
            element = element.offsetParent;
        }
        return offsetTop;
    }

    desktopLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            // console.log(targetElement.id)

            let scrollToPosition;

            if (targetElement && (window.innerHeight <= 768 || window.screen.height <= 768)) {
                if (targetElement.id === 'signature' || targetElement.id === 'project-signature-container') {
                    scrollToPosition = 3620;
                } else if (targetElement.id === 'design-concept-wrapper') {
                    scrollToPosition = 3090;
                } else if (targetElement.id === 'project-detail-container') {
                    scrollToPosition = 4290;
                } else if (targetElement.id === 'gallery-container') {
                    scrollToPosition = 5940;
                } else if (targetElement.id === 'location-container') {
                    scrollToPosition = 6540;
                } else if (targetElement.id === 'register-container') {
                    scrollToPosition = 2570;
                }
            } else if (targetElement && (window.innerHeight > 1100 || window.screen.height > 1100)) {
                if (targetElement.id === 'signature' || targetElement.id === 'project-signature-container') {
                    scrollToPosition = 4650;
                } else if (targetElement.id === 'design-concept-wrapper') {
                    scrollToPosition = 3950;
                } else if (targetElement.id === 'project-detail-container') {
                    scrollToPosition = 5250;
                } else if (targetElement.id === 'gallery-container') {
                    scrollToPosition = 7200;
                } else if (targetElement.id === 'location-container') {
                    scrollToPosition = 7750;
                } else if (targetElement.id === 'register-container') {
                    scrollToPosition = 3370;
                }
            } else if (targetElement && (window.innerHeight <= 1100 || window.screen.height <= 1100)) {
                if (targetElement.id === 'signature' || targetElement.id === 'project-signature-container') {
                    scrollToPosition = 4400;
                } else if (targetElement.id === 'design-concept-wrapper') {
                    scrollToPosition = 3720;
                } else if (targetElement.id === 'project-detail-container') {
                    scrollToPosition = 5100;
                } else if (targetElement.id === 'gallery-container') {
                    scrollToPosition = 7000;
                } else if (targetElement.id === 'location-container') {
                    scrollToPosition = 7600;
                } else if (targetElement.id === 'register-container') {
                    scrollToPosition = 3150;
                }
            } 

            firstClick = false;
            window.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            });
        });
    });

    const registerBot = document.getElementById('register');

    registerBot.addEventListener('click', () => {
        let scrollToPosition;
        if ((window.innerHeight <= 1000 || window.screen.height <= 1000) && (window.innerWidth <= 460 || window.screen.width <= 460)) {
            scrollToPosition = 40000;
        }

        if ((window.innerHeight <= 768 || window.screen.height <= 768)) {
            scrollToPosition = 1770;
        } else if ((window.innerHeight > 1100 || window.screen.height > 1100)) {
            scrollToPosition = 3370;
        } else if (window.innerHeight <= 1100 || window.screen.height <= 1100) {
            scrollToPosition = 3150;
        } 
        window.scrollTo({
            top: scrollToPosition,
            behavior: 'smooth'
        });
    })



    const detailBtn = document.querySelector('.detail-btn');
    const targetSection = document.getElementById('project-360-container');
    let offset = 10;
    detailBtn.addEventListener('click', () => {
        window.scrollTo({
            top: targetSection.offsetTop - offset,
            behavior: 'smooth'
        });
    });
    // =======================


    // menu select project detail
    const menuItems = document.querySelectorAll('.menulist .menu');
    const selectBoxMenu = document.getElementById('menu-box');
    const dropdownListMenu = document.getElementById('menu-list');
    const dropdownItemsMenu = dropdownListMenu.getElementsByTagName('li');
    const hiddenSelectMenu = document.getElementById('menu');
    const detailPanels = document.querySelectorAll('.project-detail');

    menuItems.forEach((menu, index) => {
        menu.addEventListener('click', function () {
            updateActiveMenu(index);
            productDetailClick(index);
        });
    });

    function productDetailClick(index) {
        let project_detail_selected;
        if (index == 0) {
            project_detail_selected = 'project_all_detail'
        } else if (index == 1) {
            project_detail_selected = 'master_plan';
        } else if (index == 2) {
            project_detail_selected = 'floor_plan';
        } else if (index == 3) {
            project_detail_selected = 'unit_plan';
        } else if (index == 4) {
            project_detail_selected = 'facilities';
        } else {
            project_detail_selected = 'service';
        }
        projectDetailOnclick(project_detail_selected);
    }

    function updateActiveMenu(index) {
        menuItems.forEach(item => item.classList.remove('active'));
        detailPanels.forEach(panel => panel.classList.remove('active'));

        menuItems[index].classList.add('active');
        detailPanels[index].classList.add('active');
    }

    selectBoxMenu.addEventListener('click', function () {
        dropdownListMenu.classList.toggle('show');
    });

    // console.log('Adding event listeners to dropdown items');
    Array.from(dropdownItemsMenu).forEach((item, index) => {
        item.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            const text = this.textContent;

            selectBoxMenu.textContent = text;
            hiddenSelectMenu.value = value;

            updateActiveMenu(index);
            productDetailClick(index);
            dropdownListMenu.classList.remove('show');
        });
    });


    // choose 360 bedroom
    const buttons = document.querySelectorAll('.bed-btn[type="button"]');
    const tabContents = document.querySelectorAll('.project-360-container .tab-content');
    const selectBoxBed = document.getElementById('bed-box');
    const dropdownListBed = document.getElementById('bed-list');
    const dropdownItemsBed = dropdownListBed.getElementsByTagName('li');
    const hiddenSelectBed = document.getElementById('bed');

    function updateActiveContent(targetId) {
        tabContents.forEach(content => {
            if (content.id === targetId) {
                content.style.display = 'block';
                content.classList.add('active');
            } else {
                content.style.display = 'none';
                content.classList.remove('active');
            }
        });
    }

    function updateButtonStates(targetId) {
        buttons.forEach(btn => {
            if (btn.id === targetId.replace('room360-', '') + 'bed') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = button.id === '1bed' ? 'room360-1' : 'room360-2';
            updateActiveContent(targetId);
            hiddenSelectBed.value = targetId;
            selectBoxBed.textContent = dropdownListBed.querySelector(`[data-value="${targetId}"]`).textContent;
            updateButtonStates(targetId);
        });
    });

    selectBoxBed.addEventListener('click', function () {
        dropdownListBed.classList.toggle('show');
    });

    Array.from(dropdownItemsBed).forEach(item => {
        item.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            const text = this.textContent;

            selectBoxBed.textContent = text;
            hiddenSelectBed.value = value;
            updateActiveContent(value);
            updateButtonStates(value);
            dropdownListBed.classList.remove('show');
        });
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', function (event) {
        if (!event.target.matches('.select-box') && !event.target.closest('.custom-dropdown')) {
            dropdownListBed.classList.remove('show');
        }
    });

    const provinceSelect = document.getElementById('PROVINCE');
    const districtSelect = document.getElementById('DISTRICT');
    const provinceInput = document.getElementById('PROVINCE_INPUT');
    const districtInput = document.getElementById('DISTRICT_INPUT');

    provinceInput.value = '';
    districtInput.value = '';

    const provinceBox = document.querySelector('.custom-dropdown .select-box');
    const provinceList = document.getElementById('province-list');
    const districtBox = document.querySelector('.custom-dropdown.left .select-box');
    const districtList = document.getElementById('district-list');


    // Populate province list
    Object.keys(provinces).forEach(province => {
        const li = document.createElement('li');
        li.textContent = province;
        provinceList.appendChild(li);
        // Add to hidden select for form submission
        const option = document.createElement('option');
        option.value = province;
        option.textContent = province;
        provinceSelect.appendChild(option);
    });

    // Show/hide province list
    provinceBox.addEventListener('click', () => {
        provinceList.classList.toggle('show');
    });

    // Show/hide district list
    districtBox.addEventListener('click', () => {
        districtList.classList.toggle('show');
    });

    // Handle province selection
    provinceList.addEventListener('click', (e) => {
        const selectedProvince = e.target.textContent;
        provinceBox.textContent = selectedProvince;
        provinceList.classList.remove('show');
        provinceSelect.value = selectedProvince;
        provinceInput.value = selectedProvince;
        updateDistrictList(selectedProvince);
    });

    function updateDistrictList(selectedProvince) {
        const districts = provinces[selectedProvince] || [];

        // Clear existing district options
        districtList.innerHTML = '';
        districtSelect.innerHTML = '<option value="">อำเภอ / เขต *</option>';

        // Add new district options
        districts.forEach(district => {
            const li = document.createElement('li');
            li.textContent = district;
            districtList.appendChild(li);
            // Add to hidden select for form submission
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }


    // Handle district selection
    districtList.addEventListener('click', (e) => {
        const selectedDistrict = e.target.textContent;
        districtBox.textContent = selectedDistrict;
        districtList.classList.remove('show');
        districtSelect.value = selectedDistrict;
        districtInput.value = selectedDistrict;
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-dropdown')) {
            provinceList.classList.remove('show');
            districtList.classList.remove('show');
        }
    });

    const budgetBox = document.getElementById('budget-box');
    const budgetList = document.getElementById('budget-list');
    const budgetSelect = document.getElementById('budget');

    // Populate budget select options
    const budgetOptions = [
        { value: '1', text: 'Below 6MB.' },
        { value: '2', text: '6 - 7.99MB.' },
        { value: '3', text: '8 - 9.99MB.' },
        { value: '4', text: '10 - 11.99MB.' },
        { value: '5', text: 'More than 12 MB.' }
    ];

    budgetOptions.forEach(option => {
        const selectOption = document.createElement('option');
        selectOption.value = option.text;
        selectOption.textContent = option.text;
        budgetSelect.appendChild(selectOption);
    });

    // Show/hide budget list
    budgetBox.addEventListener('click', () => {
        budgetList.classList.toggle('show');
    });

    // Handle budget selection
    budgetList.addEventListener('click', (e) => {
        const selectedBudget = e.target.textContent;
        budgetBox.textContent = selectedBudget;
        budgetList.classList.remove('show');
        budgetSelect.value = e.target.textContent;
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-dropdown')) {
            budgetList.classList.remove('show');
        }
    });

    // =======================

    const transportationsBtn = document.querySelector('.transportations-btn');
    const lifestyleDistanceAnother = document.querySelector('.lifestyle-distance-another');
    transportationsBtn.addEventListener('click', function () {
        transportationsBtn.classList.toggle('active');
        lifestyleDistanceAnother.classList.toggle('active');
    });

    if (document.getElementById('sticky-bottom') !== null) {
        let socialMobileBtn = document.getElementById('social-mobile');
        let socialMobileElements = document.querySelectorAll('.social-mobile-block:not(:first-child)'); // Select all except the first

        socialMobileBtn.addEventListener('click', () => {
            for (let i = 0; i < socialMobileElements.length; i++) {
                if (socialMobileElements[i].style.opacity === '1') {
                    socialMobileBtn.classList.remove('active');
                    socialMobileElements[i].style.opacity = 0;
                    socialMobileElements[i].style.marginBottom = '-100px';
                    socialMobileElements[i].style.width = '45px';
                    socialMobileElements[i].style.height = '0';
                    socialMobileElements[i].style.zIndex = 0;
                } else {
                    socialMobileBtn.classList.add('active');
                    socialMobileElements[i].style.opacity = 1;
                    socialMobileElements[i].style.marginBottom = '0';
                    socialMobileElements[i].style.width = '200px';
                    socialMobileElements[i].style.height = '60px';
                    socialMobileElements[i].style.zIndex = 65;
                }
            }
            // console.log('click');
        });
    }

    // floor Plan
    const floorselectElement = document.querySelector('.floorplan .detail-select');
    const floorPlanImage = document.getElementById('floorPlanImage');
    const floorPlanLink = document.getElementById('floorPlanLink');
    floorPlanLink.style.display = 'contents';
    floorPlanOp.forEach((optionText, index) => {
        const optionElement = document.createElement('option');
        optionElement.value = index; // Use the index to map to floorPlanImg
        optionElement.textContent = optionText;
        floorselectElement.appendChild(optionElement);
    });
    floorselectElement.addEventListener('change', function () {
        const selectedIndex = this.value;
        const selectedImgSrc = floorPlanImg[selectedIndex].src;
        floorPlanImage.src = selectedImgSrc;
        floorPlanLink.href = selectedImgSrc;
    });
    floorselectElement.value = 0;
    const floorinitialImgSrc = floorPlanImg[0].src;
    floorPlanImage.src = floorinitialImgSrc;
    floorPlanLink.href = floorinitialImgSrc;

    // Unit Plan
    const unitselectElement = document.querySelector('.unitplan .detail-select');
    const unitPlanImage = document.getElementById('unitPlanImg');
    const unitPlanLink = document.getElementById('unitPlanLink');
    unitPlanLink.style.display = 'contents';
    unitPlanOp.forEach((optionText, index) => {
        const optionElement = document.createElement('option');
        optionElement.value = index;
        optionElement.textContent = optionText;
        unitselectElement.appendChild(optionElement);
    });
    unitselectElement.addEventListener('change', function () {
        const selectedIndex = this.value;
        const selectedImgSrc = unitPlanImg[selectedIndex].src;
        unitPlanImage.src = selectedImgSrc;
        unitPlanLink.href = selectedImgSrc;
    });
    unitselectElement.value = 0;
    const unitinitialImgSrc = unitPlanImg[0].src;
    unitPlanImage.src = unitinitialImgSrc;
    unitPlanLink.href = unitinitialImgSrc;

    function initiateDownload(filePath, fileName) {
        var link = document.createElement('a');
        link.href = filePath;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    document.getElementById('mapDownload').addEventListener('click', function () {
        initiateDownload('./../../../assets/download/Map_EXTRO_00.pdf', 'Map_EXTRO_00.pdf');
    });

    document.getElementById('brochureDownload').addEventListener('click', function () {
        initiateDownload('./../../../assets/download/EXTRO_Digital_Brochure2024_V1.pdf', 'EXTRO_Digital_Brochure2024_V1.pdf');
    });


    function toggleBodyScroll(shouldPrevent) {
        if (shouldPrevent) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }
    // Open header span
    document.getElementById('span-header').addEventListener('click', function () {
        const span = document.getElementById('header-span');
        span.classList.add('active');
        toggleBodyScroll(true);
    });
    // Close header span
    document.getElementById('span-close').addEventListener('click', function () {
        const span = document.getElementById('header-span');
        span.classList.remove('active');
        toggleBodyScroll(false);
    });

});
