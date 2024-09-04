
const getData = async (path) => {
    const response = await fetch(`${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

const getHeaderData = async () => {
    const response = await fetch(`${window.location.origin}/data/header.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

const getFooterData = async () => {
    const response = await fetch(`${window.location.origin}/data/footer.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

const brandCollectionData = async () => {
    const response = await fetch(`${window.location.origin}/data/brand-collection.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
}

const getHeroBanner = async () => {
    const token = "889d9b89f022da5b4c0eaad08735de6691592858cd0413fceb4e174574285f4b1d906b3e5cbff6eb85164e6235e8bab0d45b74d6b6814a0285d21a52dc49c82930a7bd052fac8fcf130d9cab7d9ca100de9565c5b201355fa0c1d0dbb3a68919461a0f8e663be7bd5f160af5473565e821b72bc966a9fb2d631fe98cb52706c4";
    const response = await fetch('https://singha-cms-new.newdigitalcampaigns.com/api/hero-banners', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
    });
    return await response.json();
}
// const getSocialMedia = async () => {
//     // const token = "889d9b89f022da5b4c0eaad08735de6691592858cd0413fceb4e174574285f4b1d906b3e5cbff6eb85164e6235e8bab0d45b74d6b6814a0285d21a52dc49c82930a7bd052fac8fcf130d9cab7d9ca100de9565c5b201355fa0c1d0dbb3a68919461a0f8e663be7bd5f160af5473565e821b72bc966a9fb2d631fe98cb52706c4";
//     const response = await fetch('https://residential-uat-cms.singhaestate.co.th/api/social-links?locale=th&fields[0]=title&fields[1]=url&sort[0]=ordering:asc&sort[1]=updatedAt:desc&populate[image][fields][0]=url', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             // 'Authorization': `bearer ${token}`
//         }
//     });

//     return await response.json();
// }
const getSocialMedia = () => {
    const response = {
        "data": [
            {
                "id": 1,
                "attributes": {
                    "title": "Line",
                    "url": "https://line.me",
                    "image": {
                        "data": {
                            "id": 9,
                            "attributes": {
                                "url": "/assets/line.svg"
                            }
                        }
                    }
                }
            },
            {
                "id": 2,
                "attributes": {
                    "title": "Facebook",
                    "url": "https://www.facebook.com/SinghaEstate",
                    "image": {
                        "data": {
                            "id": 10,
                            "attributes": {
                                "url": "/assets/facebook.svg"
                            }
                        }
                    }
                }
            },
            {
                "id": 3,
                "attributes": {
                    "title": "Youtube",
                    "url": "https://www.youtube.com/SinghaEstatePCL",
                    "image": {
                        "data": {
                            "id": 8,
                            "attributes": {
                                "url": "/assets/youtube.svg"
                            }
                        }
                    }
                }
            },
            {
                "id": 4,
                "attributes": {
                    "title": "Instagram",
                    "url": "https://www.instagram.com/Singha_Estate/",
                    "image": {
                        "data": {
                            "id": 7,
                            "attributes": {
                                "url": "/assets/ig.svg"
                            }
                        }
                    }
                }
            }
        ],
        "meta": {
            "pagination": {
                "page": 1,
                "pageSize": 25,
                "pageCount": 1,
                "total": 4
            }
        }
    }

    return response;
}


const articleData = [{
    title: "ฮวงจุ้ยบ้าน เคล็ดลับนำความสุข ความเจริญรุ่งเรืองให้แก่ผู้อยู่อาศัย",
    description: "เรียนรู้หลักการฮวงจุ้ยบ้านเพื่อสร้างพลังงานที่ดี ส่งเสริมความสุข สุขภาพ และความมั่งคั่ง พร้อมเคล็ดลับการจัดห้องต่างๆ และวิธีแก้ไขฮวงจุ้ยที่ไม่ดีในบ้าน",
    topic: "ฮวงจุ้ยบ้าน",
    cate: "s blog",
    date:"9 SEP 2024",
    thumb: "./page/src/content/content1/images/H1/ฮวงจุ้ยบ้าน_thumbnail.webp",
    s: "./page/src/content/content1/images/H1/ฮวงจุ้ยบ้าน_recommend.webp",
    m: "./page/src/content/content1/images/H1/ฮวงจุ้ยบ้าน_recommend_m.webp",
    banner: {
        s: "./page/src/content/content1/images/H1/ฮวงจุ้ยบ้าน_m.webp",
        l: "./page/src/content/content1/images/H1/ฮวงจุ้ยบ้าน.webp"
    }
},
{
    title: "ฮวงจุ้ยห้องนอน เคล็ดลับจัดห้องนอนให้ถูกหลัก ช่วยเสริมพลังชีวิต",
    description: "เรียนรู้หลักฮวงจุ้ยห้องนอนที่ถูกต้อง พร้อมเคล็ดลับการจัดวางเตียง กระจก และของตกแต่ง เพื่อสร้างพื้นที่พักผ่อนที่สมบูรณ์แบบ ส่งเสริมการนอนหลับที่มีคุณภาพและชีวิตที่สมดุล",
    topic: "ฮวงจุ้ยห้องนอน",
    cate: "s blog",
    date:"9 SEP 2024",
    thumb: "./page/src/content/content2/images/H1/ฮวงจุ้ยห้องนอน_thumbnail.webp",
    s: "./page/src/content/content2/images/H1/ฮวงจุ้ยห้องนอน_recommend.webp",
    m: "./page/src/content/content2/images/H1/ฮวงจุ้ยห้องนอน_recommend_m.webp",
    banner: {
        s: "./page/src/content/content2/images/H1/ฮวงจุ้ยห้องนอน_m.webp",
        l: "./page/src/content/content2/images/H1/ฮวงจุ้ยห้องนอน.webp"
    }
}, {
    title: "พาชมโครงการบ้านหรู คฤหาสน์ Luxury บนทำเลทอง ปี 2024",
    description: "การเป็นเจ้าของบ้านหรูระดับ Luxury ไปจนถึง Ultra Luxury ถือเป็นสัญลักษณ์แห่งความสำเร็จ ความมั่งคั่ง สะท้อนให้เห็นถึงไลฟ์สไตล์ที่ดูหรูหรา รสนิยม และความสำเร็จของเจ้าของบ้าน",
    topic: "บ้านหรู",
    cate: "s blog",
    date:"9 SEP 2024",
    thumb: "./page/src/content/content3/images/H1/บ้านหรู_thumbnail.webp",
    s: "./page/src/content/content3/images/H1/บ้านหรู_recommend.webp",
    m: "./page/src/content/content3/images/H1/บ้านหรู_recommend_m.webp",
    banner: {
        s: "./page/src/content/content3/images/H1/บ้านหรู_m.webp",
        l: "./page/src/content/content3/images/H1/บ้านหรู.webp"
    }
}, {
    title: "ทางลาดสำหรับผู้สูงอายุและคนพิการ ตามหลัก Universal Design",
    description: "การออกแบบทางลาดสำหรับคนพิการทุพพลภาพและผู้สูงอายุตามหลัก Universal Design เพื่อความปลอดภัยและความสะดวกสบายในการใช้งาน",
    topic: "ทางลาดผู้สูงอายุ",
    cate: "s blog",
    date:"9 SEP 2024",
    thumb: "./page/src/content/content4/images/H1/ทางลาดผู้สูงอายุ_thumbnail.webp",
    s: "./page/src/content/content4/images/H1/ทางลาดผู้สูงอายุ_recommend.webp",
    m: "./page/src/content/content4/images/H1/ทางลาดผู้สูงอายุ_recommend_m.webp",
    banner: {
        s: "./page/src/content/content4/images/H1/ทางลาดผู้สูงอายุ_m.webp",
        l: "./page/src/content/content4/images/H1/ทางลาดผู้สูงอายุ.webp"
    }
}, {
    title: "Universal Design คืออะไร เทคนิคการออกแบบที่ไม่ว่าใคร ก็ใช้งานร่วมกันได้",
    description: "Universal Design เป็นหลักการออกแบบผลิตภัณฑ์ สภาพแวดล้อม และบริการต่างๆ ให้สามารถใช้งานได้อย่างเท่าเทียมที่ทุกคนสามารถใช้ร่วมกันได้",
    topic: "universal design คือ",
    cate: "s blog",
    date:"9 SEP 2024",
    thumb: "./page/src/content/content5/images/H1/universal_design_คือ_thumbnail.webp",
    s: "./page/src/content/content5/images/H1/universal_design_คือ_recommend.webp",
    m: "./page/src/content/content5/images/H1/universal_design_คือ_recommend_m.webp",
    banner: {
        s: "./page/src/content/content5/images/H1/universal_design_คือ_m.webp",
        l: "./page/src/content/content5/images/H1/universal_design_คือ.webp"
    }
}, {
    title: "รวมต้นไม้ฟอกอากาศปลูกง่าย ช่วยลดสารพิษในบ้าน และห้องต่าง ๆ",
    description: "ต้นไม้ฟอกอากาศ มีประโยชน์หลายอย่าง ไม่ว่าจะช่วยทำให้บ้านของเราสดชื่น ช่วยดักจับฝุ่นในอากาศ และยังลดความเครียดได้อีกด้วย",
    topic: "ต้นไม้ฟอกอากาศ",
    cate: "s blog",
    date:"9 SEP 2024",
    thumb: "./page/src/content/content6/images/H1/ต้นไม้ฟอกอากาศ_thumbnail.webp",
    s: "./page/src/content/content6/images/H1/ต้นไม้ฟอกอากาศ_recommend.webp",
    m: "./page/src/content/content6/images/H1/ต้นไม้ฟอกอากาศ_recommend_m.webp",
    banner: {
        s: "./page/src/content/content6/images/H1/ต้นไม้ฟอกอากาศ_m.webp",
        l: "./page/src/content/content6/images/H1/ต้นไม้ฟอกอากาศ.webp"
    }
}, {
    title: "11 ต้นไม้มงคลเสริมโชคลาภ ปลูกแล้วเฮงเรียกทรัพย์ตลอดปี",
    description: "หลายคนนิยมปลูกต้นไม้มงคลในบ้าน และคอนโด เพราะนอกจากจะช่วยประดับตกแต่งภายบ้านแล้ว ยังสามารถช่วยเสริมสิริมงคล ดึงดูดโชคลาภ เงินทอง ให้ไหลมาเทมาแก่ผู้อาศัยอีกด้วย",
    topic: "ต้นไม้มงคล",
    cate: "s blog",
    date:"9 SEP 2024",
    thumb: "./page/src/content/content7/images/H1/ต้นไม้มงคล_thumbnail.webp",
    s: "./page/src/content/content7/images/H1/ต้นไม้มงคล_recommend.webp",
    m: "./page/src/content/content7/images/H1/ต้นไม้มงคล_recommend_m.webp",
    banner: {
        s: "./page/src/content/content7/images/H1/ต้นไม้มงคล_m.webp",
        l: "./page/src/content/content7/images/H1/ต้นไม้มงคล.webp"
    }
}
]
