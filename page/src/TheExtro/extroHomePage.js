

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

const galleryImage = [
    { src: './../../../assets/image-extro/gallery01.png', type: 'image', category: ['Exterior'] },
    { src: './../../../assets/image-extro/gallery02.png', type: 'image', category: ['Interior'] },
    { src: './../../../assets/image-extro/gallery03.png', type: 'image', category: ['Exterior'] },
    { src: './../../../assets/image-extro/gallery04.png', type: 'image', category: ['Interior', 'Facilities'] },
    { src: './../../../assets/image-extro/gallery05.png', type: 'image', category: ['Interior'] },
    { src: './../../../assets/image-extro/gallery06.png', type: 'image', category: ['Interior'] },
    { src: './../../../assets/image-extro/gallery03.png', type: 'image', category: ['Exterior'] },
    { src: './../../../assets/image-extro/gallery04.png', type: 'image', category: ['Interior', 'Facilities'] },
    { src: './../../../assets/image-extro/gallery05.png', type: 'image', category: ['Interior'] },
    { src: './../../../assets/image-extro/gallery06.png', type: 'image', category: ['Interior'] },
    { src: '../../../assets/vdo/The EXTRO Phayathai-Rangnam.mp4', type: 'video', category: ['Vdo'] },
];

function getMediaDimensions(src, type) {
    return new Promise((resolve, reject) => {
        if (type === 'image') {
            const img = new Image();
            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };
            img.onerror = () => {
                reject(new Error(`Error loading image: ${src}`));
            };
            img.src = src;
        } else if (type === 'video') {
            const video = document.createElement('video');
            video.onloadedmetadata = () => {
                resolve({ width: video.videoWidth, height: video.videoHeight });
            };
            video.onerror = () => {
                reject(new Error(`Error loading video: ${src}`));
            };
            video.src = src;
        }
    });
}

let categorizedImages = {
    All: { verticle: [], horizontal: [] },
    Exterior: { verticle: [], horizontal: [] },
    Interior: { verticle: [], horizontal: [] },
    Facilities: { verticle: [], horizontal: [] },
    Vdo: { verticle: [], horizontal: [] }
};
let imagesCategorized = false;

async function categorizeImages() {
    if (imagesCategorized) {
        return; // Skip categorization if already done
    }

    console.log("Starting categorization...");
    for (const image of galleryImage) {
        try {
            const { width, height } = await getMediaDimensions(image.src, image.type);
            console.log(width, height);
            const aspectRatio = width / height;
            const orientation = aspectRatio > 1 ? 'horizontal' : 'verticle';

            // Add to "All" category
            categorizedImages.All[orientation].push(image);

            for (const category of image.category) {
                if (categorizedImages[category]) {
                    categorizedImages[category][orientation].push(image);
                }
            }
        } catch (error) {
            console.error(`Error processing image ${image.src}:`, error);
        }
    }

    imagesCategorized = true;
    initializeSwipers();
    console.log('Categorized Images:', categorizedImages);
}

let swiperInstances = {};

function initializeSwipers() {
    const swiperOptions = {
        loop: false,
        pagination: {
            clickable: true,
        },
        navigation: {
            nextEl: '.button-next',
            prevEl: '.button-prev',
        },
    };

    swiperInstances = {
        All: new Swiper('#all-slider', {
            ...swiperOptions,
            slidesPerView: 1,
            pagination: { el: '#all-slider .swiper-pagination' },
        }),
        Exterior: new Swiper('#exterior-slider', {
            ...swiperOptions,
            slidesPerView: 1,
            pagination: { el: '#exterior-slider .swiper-pagination' },
        }),
        Interior: new Swiper('#interior-slider', {
            ...swiperOptions,
            slidesPerView: 1,
            pagination: { el: '#interior-slider .swiper-pagination' },
        }),
        Facilities: new Swiper('#facilities-slider', {
            ...swiperOptions,
            slidesPerView: 1,
            pagination: { el: '#facilities-slider .swiper-pagination' },
        }),
        Vdo: new Swiper('#vdo-slider', {
            ...swiperOptions,
            slidesPerView: 1,
            pagination: { el: '#vdo-slider .swiper-pagination' },
        })
    };

    rebuildSlides();
}

function rebuildSlides() {
    for (const swiper of Object.values(swiperInstances)) {
        swiper.removeAllSlides();
    }
    addImagesToSwipers();
}

function addImagesToSwipers() {
    function createSlide(content, widthClass) {
        return `<div class="swiper-slide ${widthClass}">${content}</div>`;
    }

    function getWrappersPerSlide() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 560) return 1;
        if (screenWidth < 768) return 2;
        if (screenWidth < 1024) return 3;
        if (screenWidth < 1366) return 4;
        if (screenWidth < 1440) return 5;
        return 6; // Default for larger screens
    }

    for (const [category, sw] of Object.entries(swiperInstances)) {
        if (!sw) {
            console.error(`Swiper instance for ${category} is not initialized.`);
            continue;
        }

        const images = categorizedImages[category];
        let wrappers = [];
        let horizontalIndex = 0;

        function getNextHorizontalWrapper() {
            let horizontalWrapper = '';
            if (horizontalIndex < images.horizontal.length) {
                for (let i = 0; i < 2 && horizontalIndex < images.horizontal.length; i++, horizontalIndex++) {
                    if (i === 0) horizontalWrapper = '<div class="horizontal-wrapper">';
                    const media = images.horizontal[horizontalIndex];
                    if (media.type === 'image') {
                        horizontalWrapper += `
                            <a href="${media.src}" data-lightbox="image-gallery" data-title="Gallery Image">
                                <img src="${media.src}" alt="Gallery Image" />
                            </a>`;
                    } else if (media.type === 'video') {
                        horizontalWrapper += `
                            <a watch href="${media.src}" data-lity class="video-wrapper">
                                <video poster="./../../../assets/image-extro/videoThumbnail.jpg">
                                    <source src="${media.src}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                                <div class="video-overay">
                                    <svg viewBox="-3 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" 
                                    xmlns:xlink="http://www.w3.org/1999/xlink" 
                                    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" 
                                    fill="#ffffff" stroke="#ffffff">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                                    </g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                    </g>
                                    <g id="SVGRepo_iconCarrier"> <title>play</title> <desc>Created with Sketch Beta.
                                    </desc> <defs> </defs> 
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> 
                                    <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-419.000000, -571.000000)" 
                                    fill="#ffffff"> 
                                    <path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,
                                    599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,
                                    583.554" id="play" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                                </div>
                            </a>
                            `;
                    }
                }
                horizontalWrapper += '</div>';
            }
            return horizontalWrapper;
        }

        let verticleIndex = 0;
        let useverticle = true;
        while (verticleIndex < images.verticle.length || horizontalIndex < images.horizontal.length) {
            if (useverticle && verticleIndex < images.verticle.length) {
                const media = images.verticle[verticleIndex];
                let verticleWrapper = '<div class="verticle-wrapper">';
                if (media.type === 'image') {
                    verticleWrapper += `
                        <a href="${media.src}" data-lightbox="image-gallery" data-title="Gallery Image">
                            <img src="${media.src}" alt="Gallery Image" />
                        </a>`;
                } else if (media.type === 'video') {
                    verticleWrapper += `
                    <a watch href="${media.src}" data-lity class="video-wrapper">
                        <video  poster="./../../../assets/image-extro/videoThumbnail.jpg">
                            <source src="${media.src}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="video-overay">
                                    <svg viewBox="-3 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" 
                                    xmlns:xlink="http://www.w3.org/1999/xlink" 
                                    xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" 
                                    fill="#ffffff" stroke="#ffffff">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                                    </g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                    </g>
                                    <g id="SVGRepo_iconCarrier"> <title>play</title> <desc>Created with Sketch Beta.
                                    </desc> <defs> </defs> 
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> 
                                    <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-419.000000, -571.000000)" 
                                    fill="#ffffff"> 
                                    <path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,
                                    599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,
                                    583.554" id="play" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                                </div>
                    </a>
                    `;
                }
                verticleWrapper += '</div>';
                wrappers.push(verticleWrapper);
                verticleIndex++;
                useverticle = false;
            } else {
                const horizontalWrapper = getNextHorizontalWrapper();
                if (horizontalWrapper) {
                    wrappers.push(horizontalWrapper);
                }
                useverticle = true;
            }
        }
        const wrappersPerSlide = getWrappersPerSlide();
        const widthClass = `slide-width-${wrappersPerSlide}`;
        let slideContent = '';

        wrappers.forEach((wrapper, index) => {
            if (index % wrappersPerSlide === 0 && slideContent) {
                try {
                    sw.appendSlide(createSlide(slideContent, widthClass));
                } catch (error) {
                    console.error(`Error appending slide to ${category} Swiper:`, error);
                }
                slideContent = '';
            }
            slideContent += wrapper;
        });
        if (slideContent) {
            try {
                sw.appendSlide(createSlide(slideContent, widthClass));
            } catch (error) {
                console.error(`Error appending slide to ${category} Swiper:`, error);
            }
        }
    }
}

function setupTabClickListeners() {
    const tabs = document.querySelectorAll('.gallery-tabs .tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.swiper-container').forEach(container => {
                container.classList.remove('show');
                container.classList.add('hide');
            });

            tab.classList.add('active');
            const selectedSlider = document.querySelector(`#${category}-slider`);
            if (selectedSlider) {
                selectedSlider.classList.remove('hide');
                selectedSlider.classList.add('show');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (imagesCategorized) {
        initializeSwipers();
        return;
    } else {
        categorizeImages().then(() => {
            setupTabClickListeners();
        });
    }

    window.addEventListener('resize', rebuildSlides);

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
        initialSlide: 2,
        centeredSlides: true,
        watchSlidesVisibility: true,
        autoplay: {
            delay: 3000,
        },
        allowTouchMove: false,
        breakpoints: {
            0: {
                slidesPerView: 2.5,
                loop: false,
            },
            768: {
                slidesPerView: 4.5,
                loop: true,
            },
            1366: {
                slidesPerView: 4.5,
                loop: true,
            }
        }
    });

    const swiper1Desktop = new Swiper('#swiper1-desktop', {
        initialSlide: 2,
        centeredSlides: true,
        watchSlidesVisibility: true,
        allowTouchMove: false,
        breakpoints: {
            0: {
                slidesPerView: 1,
                loop: false,
            },
            768: {
                slidesPerView: 1,
                loop: true,
            },
            1366: {
                slidesPerView: 1,
                loop: true,
            }
        }
    });

    function synchronizeSwipers() {
        swiper1.on('slideChange', function () {
            if (swiper1Desktop.realIndex !== swiper1.realIndex) {
                swiper1Desktop.slideTo(swiper1.realIndex);
            }
        });

        swiper1Desktop.on('slideChange', function () {
            if (swiper1.realIndex !== swiper1Desktop.realIndex) {
                swiper1.slideTo(swiper1Desktop.realIndex);
            }
        });

    }


    synchronizeSwipers();

    const swiper4 = new Swiper('#swiper4', {
        initialSlide: 0,
        loop: true,
        centeredSlides: true,
        // roundLengths: true,
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

    const swiper4Desktop = new Swiper('#swiper4-desktop', {
        initialSlide: 0,
        loop: true,
        // roundLengths: true,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '#pagination-btn-right-desktop',
            prevEl: '#pagination-btn-left-desktop',
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

    let swiper4Changing = false;
    let swiper4DesktopChanging = false;

    swiper4.on('slideChange', () => {
        if (!swiper4DesktopChanging) {
            swiper4Changing = true;
            const realIndex = swiper4.realIndex;
            if (swiper4Desktop.realIndex !== realIndex) {
                swiper4DesktopChanging = true;
                swiper4Desktop.slideToLoop(realIndex, 300, false);
                swiper4DesktopChanging = false;
            }
            swiper4Changing = false;
        }
    });

    swiper4Desktop.on('slideChange', () => {
        if (!swiper4Changing) {
            swiper4DesktopChanging = true;
            const realIndex = swiper4Desktop.realIndex;
            if (swiper4.realIndex !== realIndex) {
                swiper4Changing = true;
                swiper4.slideToLoop(realIndex, 300, false);
                swiper4Changing = false;
            }
            swiper4DesktopChanging = false;
        }
    });

    // Initialize Swiper instance
    const swiperSignature = new Swiper('#swiper-signature', {
        initialSlide: 0,
        loop: true,
        centeredSlides: false,
        roundLengths: true,
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
                slidesPerView: 1,
                allowTouchMove: false,
            },
            1366: {
                slidesPerView: 1,
                allowTouchMove: false,
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
        setInterval(updateProgressBar, 50);
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
        console.log('Native smooth scroll is supported');
    } else {
        console.log('Initializing Smoothscroll Polyfill');
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
            console.log(targetElement.id)

            let scrollToPosition;

            if (targetElement && (window.innerHeight <= 768 || window.screen.width <= 768)) {
                if (targetElement.id === 'signature' || targetElement.id === 'project-signature-container') {
                    scrollToPosition = 1620;
                } else if (targetElement.id === 'design-concept-wrapper') {
                    scrollToPosition = 1090;
                } else if (targetElement.id === 'project-detail-container') {
                    scrollToPosition = 2290;
                } else if (targetElement.id === 'gallery-container') {
                    scrollToPosition = 3940;
                } else if (targetElement.id === 'location-container') {
                    scrollToPosition = 4540;
                } else if (targetElement.id === 'register-container') {
                    scrollToPosition = 670;
                }
            } else if (targetElement && (window.innerHeight <= 1100 || window.screen.height <= 1100)) {
                if (targetElement.id === 'signature' || targetElement.id === 'project-signature-container') {
                    scrollToPosition = 2000;
                } else if (targetElement.id === 'design-concept-wrapper') {
                    scrollToPosition = 1520;
                } else if (targetElement.id === 'project-detail-container') {
                    scrollToPosition = 2700;
                } else if (targetElement.id === 'gallery-container') {
                    scrollToPosition = 4700;
                } else if (targetElement.id === 'location-container') {
                    scrollToPosition = 5300;
                } else if (targetElement.id === 'register-container') {
                    scrollToPosition = 950;
                }
            } else if (targetElement && (window.innerHeight > 1100 || window.screen.Width > 1100)) {
                if (targetElement.id === 'signature' || targetElement.id === 'project-signature-container') {
                    scrollToPosition = 2050;
                } else if (targetElement.id === 'design-concept-wrapper') {
                    scrollToPosition = 1550;
                } else if (targetElement.id === 'project-detail-container') {
                    scrollToPosition = 2750;
                } else if (targetElement.id === 'gallery-container') {
                    scrollToPosition = 4700;
                } else if (targetElement.id === 'location-container') {
                    scrollToPosition = 5350;
                } else if (targetElement.id === 'register-container') {
                    scrollToPosition = 970;
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
            scrollToPosition = 700;
        } else if (window.innerHeight <= 1100 || window.screen.height <= 1100) {
            scrollToPosition = 950;
        } else if ((window.innerHeight > 1100 || window.screen.height > 1100)) {
            scrollToPosition = 970;
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
            dropdown.selectedIndex = index;
        });
    });

    function updateActiveMenu(index) {
        menuItems.forEach(item => item.classList.remove('active'));
        detailPanels.forEach(panel => panel.classList.remove('active'));

        menuItems[index].classList.add('active');
        detailPanels[index].classList.add('active');
    }
    selectBoxMenu.addEventListener('click', function () {
        console.log('Select box clicked');
        dropdownListMenu.classList.toggle('show');
    });

    console.log('Adding event listeners to dropdown items');
    Array.from(dropdownItemsMenu).forEach((item, index) => {
        console.log(`Adding click listener to item ${index}`);
        item.addEventListener('click', function () {
            console.log(`Dropdown item clicked: ${index}`);
            const value = this.getAttribute('data-value');
            const text = this.textContent;

            selectBoxMenu.textContent = text;
            hiddenSelectMenu.value = value;

            updateActiveMenu(index);
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

    const provinceSelect = document.getElementById('province');
    const districtSelect = document.getElementById('district');

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
        selectOption.value = option.value;
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
        budgetSelect.value = e.target.getAttribute('value');
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
        console.log('true');
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
            console.log('click');
        });
    } else {
        console.log('false');
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
        initiateDownload('./../../../assets/download/map.png', 'map.jpg');
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
