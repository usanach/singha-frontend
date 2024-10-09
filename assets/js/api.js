
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

// /sblog/ฮวงจุ้ยบ้าน
// /sblog/ฮวงจุ้ยห้องนอน
// /sblog/บ้านหรู
// /sblog/ทางลาดผู้สูงอายุ
// /sblog/universal-design-คือ
// /sblog/ต้นไม้ฟอกอากาศ
// /sblog/ต้นไม้มงคล
const articleData = [{
    template: '/page/story/detail/content/content1/template.html',
    title: "ฮวงจุ้ยบ้าน เคล็ดลับนำความสุข ความเจริญรุ่งเรืองให้แก่ผู้อยู่อาศัย",
    description: "เรียนรู้หลักการฮวงจุ้ยบ้านเพื่อสร้างพลังงานที่ดี ส่งเสริมความสุข สุขภาพ และความมั่งคั่ง พร้อมเคล็ดลับการจัดห้องต่างๆ และวิธีแก้ไขฮวงจุ้ยที่ไม่ดีในบ้าน",
    topic: "ฮวงจุ้ยบ้าน",
    cate: "S Lifestyle ",
    date: "9 SEP 2024",
    url: {
        en: "/en/stories/sblog/feng-shui-home-tips-to-enhance-happiness",
        th: "/th/stories/sblog/feng-shui-home-tips-to-enhance-happiness"
    },
    lifestyle: {
        s: "/assets/image-new/thumb/story/thumb_ฮวงจุ้ยบ้าน_home.png",
        l: "/assets/image-new/thumb/story/ฮวงจุ้ยบ้าน_home.jpg"
    },
    thumb: "/assets/image/content/content1/images/H1/ฮวงจุ้ยบ้าน_thumbnail.webp",
    recomended: {
        showId: [1, 2, 3],
        m: "/assets/image/content/content1/images/H1/ฮวงจุ้ยบ้าน_recommend.webp",
        s: "/assets/image/content/content1/images/H1/ฮวงจุ้ยบ้าน_recommend_m.webp",
    },
    banner: {
        s: "/assets/image/content/content1/images/H1/ฮวงจุ้ยบ้าน_m.webp",
        l: "/assets/image/content/content1/images/H1/ฮวงจุ้ยบ้าน.webp"
    },
    gallery: [
        {
            l: "/assets/image/content/content1/images/สมดุลธาตุทั้ง_5_ในบ้าน_ตามหลักฮวงจุ้ย.webp",
            thumb: "/assets/image/content/content1/images/gallery/สมดุลธาตุทั้ง_5_ในบ้าน_ตามหลักฮวงจุ้ย_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content1/images/ประตูบ้านตามหลักฮวงจุ้ย_โครงการบ้าน_ศิรนินทร์_เรสซิเดนเซส_(SIRANINN_RESIDENCES).webp",
            thumb: "/assets/image/content/content1/images/gallery/ประตูบ้านตามหลักฮวงจุ้ย_โครงการบ้าน_ศิรนินทร์_เรสซิเดนเซส_(SIRANINN_RESIDENCES)_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content1/images/ห้องนั่งเล่นตามหลักฮวงจุ้ย_โครงการบ้าน_ศิรนินทร์_เรสซิเดนเซส_(SIRANINN_RESIDENCES).webp",
            thumb: "/assets/image/content/content1/images/gallery/ห้องนั่งเล่นตามหลักฮวงจุ้ย_โครงการบ้าน_ศิรนินทร์_เรสซิเดนเซส_(SIRANINN_RESIDENCES)_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content1/images/ห้องครัวตามหลักฮวงจุ้ย_โครงการบ้าน_สริน_(SRIN).webp",
            thumb: "/assets/image/content/content1/images/gallery/ห้องครัวตามหลักฮวงจุ้ย_โครงการบ้าน_สริน_(SRIN)_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content1/images/ห้องนอนตามหลักฮวงจุ้ย_โครงการบ้าน_ฌอน_(SHAWN)_วงแหวน-จตุโชติ.webp",
            thumb: "/assets/image/content/content1/images/gallery/ห้องนอนตามหลักฮวงจุ้ย_โครงการบ้าน_ฌอน_(SHAWN)_วงแหวน-จตุโชติ_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content1/images/ห้องออกกำลังกายตามหลักฮวงจุ้ย.webp",
            thumb: "/assets/image/content/content1/images/gallery/ห้องออกกำลังกายตามหลักฮวงจุ้ย_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content1/images/พื้นที่ส่วนกลางตามหลักฮวงจุ้ย_โครงการบ้าน_ศิรนินทร์_เรสซิเดนเซส_(SIRANINN_RESIDENCES).webp",
            thumb: "/assets/image/content/content1/images/gallery/พื้นที่ส่วนกลางตามหลักฮวงจุ้ย_โครงการบ้าน_ศิรนินทร์_เรสซิเดนเซส_(SIRANINN_RESIDENCES)_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content1/images/บันไดตามหลักฮวงจุ้ย_โครงการบ้าน_สริน_(SRIN).webp",
            thumb: "/assets/image/content/content1/images/gallery/บันไดตามหลักฮวงจุ้ย_โครงการบ้าน_สริน_(SRIN)_gallery_thumbnail.webp",
            alt: ""
        }
    ],
},
{
    template: '/page/story/detail/content/content2/template.html',
    title: "ฮวงจุ้ยห้องนอน เคล็ดลับจัดห้องนอนให้ถูกหลัก ช่วยเสริมพลังชีวิต",
    description: "เรียนรู้หลักฮวงจุ้ยห้องนอนที่ถูกต้อง พร้อมเคล็ดลับการจัดวางเตียง กระจก และของตกแต่ง เพื่อสร้างพื้นที่พักผ่อนที่สมบูรณ์แบบ ส่งเสริมการนอนหลับที่มีคุณภาพและชีวิตที่สมดุล",
    topic: "ฮวงจุ้ยห้องนอน",
    cate: "S Lifestyle",
    date: "9 SEP 2024",
    url: {
        en: "/en/stories/sblog/feng-shui-bedroom-tips",
        th: "/th/stories/sblog/feng-shui-bedroom-tips"
    },
    lifestyle: {
        s: "/assets/image-new/thumb/story/ฮวงจุ้ยห้องนอน_home.jpg",
        l: ""
    },
    thumb: "/assets/image/content/content2/images/H1/ฮวงจุ้ยห้องนอน_thumbnail.webp",
    recomended: {
        showId: [2, 3, 4],
        m: "/assets/image/content/content2/images/H1/ฮวงจุ้ยห้องนอน_recommend.webp",
        s: "/assets/image/content/content2/images/H1/ฮวงจุ้ยห้องนอน_recommend_m.webp",
    },
    banner: {
        s: "/assets/image/content/content2/images/H1/ฮวงจุ้ยห้องนอน_m.webp",
        l: "/assets/image/content/content2/images/H1/ฮวงจุ้ยห้องนอน.webp"
    },
    gallery: [
        {
            l: "/assets/image/content/content2/images/การวางกระจกในห้องนอนตามหลักฮวงจุ้ย_โครงการบ้าน_สริน_(SRIN).webp",
            thumb: "/assets/image/content/content2/images/gallery/การวางกระจกในห้องนอนตามหลักฮวงจุ้ย_โครงการบ้าน_สริน_(SRIN)_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content2/images/ห้องนอนตามหลักฮวงจุ้ย_โครงการบ้าน_สริน_(SRIN).webp",
            thumb: "/assets/image/content/content2/images/gallery/ห้องนอนตามหลักฮวงจุ้ย_โครงการบ้าน_สริน_(SRIN)_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content2/images/ฮวงจุ้ยห้องนอน.webp",
            thumb: "/assets/image/content/content2/images/gallery/ฮวงจุ้ยห้องนอน_gallery_thumbnail.webp",
            alt: ""
        },
    ]
}, {
    template: '/page/story/detail/content/content3/template.html',
    title: "พาชมโครงการบ้านหรู คฤหาสน์ Luxury บนทำเลทอง ปี 2024",
    description: "การเป็นเจ้าของบ้านหรูระดับ Luxury ไปจนถึง Ultra Luxury ถือเป็นสัญลักษณ์แห่งความสำเร็จ ความมั่งคั่ง สะท้อนให้เห็นถึงไลฟ์สไตล์ที่ดูหรูหรา รสนิยม และความสำเร็จของเจ้าของบ้าน",
    topic: "บ้านหรู",
    cate: "S Living",
    date: "9 SEP 2024",
    url: {
        en: "/en/stories/sblog/luxury-houses-in-prime-locations",
        th: "/th/stories/sblog/luxury-houses-in-prime-locations"
    },
    lifestyle: {
        s: "/assets/image-new/thumb/story/บ้านหรู_home.jpg",
        l: "/assets/image-new/thumb/story/1-content_3.jpg"
    },
    thumb: "/assets/image/content/content3/images/H1/บ้านหรู_thumbnail.webp",
    recomended: {
        showId: [3, 4, 5],
        m: "/assets/image/content/content3/images/H1/บ้านหรู_recommend.webp",
        s: "/assets/image/content/content3/images/H1/บ้านหรู_recommend_m.webp",
    },
    banner: {
        s: "/assets/image/content/content3/images/H1/บ้านหรู_m.webp",
        l: "/assets/image/content/content3/images/H1/บ้านหรู.webp"
    },
    gallery: [
        {
            l: "/assets/image/content/content3/images/โครงการบ้านหรู_Santiburi_The_Residence_(สันติบุรี)_รามอินทรา.webp",
            thumb: "/assets/image/content/content3/images/gallery/โครงการบ้านหรู_Santiburi_The_Residence_(สันติบุรี)_รามอินทรา_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content3/images/โครงการบ้านหรู_SIRANINN_RESIDENCES_(ศิรนินทร์_เรสซิเดนเซส)_พัฒนาการ.webp",
            thumb: "/assets/image/content/content3/images/gallery/โครงการบ้านหรู_SIRANINN_RESIDENCES_(ศิรนินทร์_เรสซิเดนเซส)_พัฒนาการ_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content3/images/โครงการบ้านหรู_SMYTHS_(สมิทธ์)_รามอินทรา.webp",
            thumb: "/assets/image/content/content3/images/gallery/โครงการบ้านหรู_SMYTHS_(สมิทธ์)_รามอินทรา_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content3/images/โครงการบ้านหรู_SRIN_(สริน)_ราชพฤกษ์_สาย1.webp",
            thumb: "/assets/image/content/content3/images/gallery/โครงการบ้านหรู_SRIN_(สริน)_ราชพฤกษ์_สาย1_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content3/images/โครงการบ้านหรู_ฌอน_(SHAWN)_ปัญญาอินทรา.webp",
            thumb: "/assets/image/content/content3/images/gallery/โครงการบ้านหรู_ฌอน_(SHAWN)_ปัญญาอินทรา_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content3/images/โครงการบ้านหรู_ฌอน_(SHAWN)_ปัญญาอินทรา.webp",
            thumb: "/assets/image/content/content3/images/gallery/โครงการบ้านหรู_ฌอน_(SHAWN)_วงแหวน_จตุโชติ_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content3/images/โครงการพรีเมียมโฮมออฟฟิศหรู_SENTRE_(เซนเทอร์)_พัฒนาการ.webp",
            thumb: "/assets/image/content/content3/images/gallery/โครงการพรีเมียมโฮมออฟฟิศหรู_SENTRE_(เซนเทอร์)_พัฒนาการ_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content3/images/บ้านหรู.webp",
            thumb: "/assets/image/content/content3/images/gallery/บ้านหรู_gallery_thumbnail.webp",
            alt: ""
        },
    ]
}, {
    template: '/page/story/detail/content/content4/template.html',
    title: "ทางลาดสำหรับผู้สูงอายุและคนพิการ ตามหลัก Universal Design",
    description: "การออกแบบทางลาดสำหรับคนพิการทุพพลภาพและผู้สูงอายุตามหลัก Universal Design เพื่อความปลอดภัยและความสะดวกสบายในการใช้งาน",
    topic: "ทางลาดผู้สูงอายุ",
    cate: "S Home & Construction",
    date: "9 SEP 2024",
    url: {
        en: "/en/stories/sblog/accessibility-ramps",
        th: "/th/stories/sblog/accessibility-ramps"
    },
    lifestyle: {
        s: "",
        l: ""
    },
    thumb: "/assets/image/content/content4/images/H1/ทางลาดผู้สูงอายุ_thumbnail.webp",
    recomended: {
        showId: [4, 5, 6],
        m: "/assets/image/content/content4/images/H1/ทางลาดผู้สูงอายุ_recommend.webp",
        s: "/assets/image/content/content4/images/H1/ทางลาดผู้สูงอายุ_recommend_m.webp",
    },
    banner: {
        s: "/assets/image/content/content4/images/H1/ทางลาดผู้สูงอายุ_m.webp",
        l: "/assets/image/content/content4/images/H1/ทางลาดผู้สูงอายุ.webp"
    },
    gallery: [
        {
            l: "/assets/image/content/content4/images/ข้อกำหนดของทางลาด_90_องศา.webp",
            thumb: "/assets/image/content/content4/images/gallery/ข้อกำหนดของทางลาด_90_องศา_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content4/images/ข้อกำหนดและวิธีการออกแบบทางลาด_ตามหลัก_Universal_Design.webp",
            thumb: "/assets/image/content/content4/images/gallery/ข้อกำหนดและวิธีการออกแบบทางลาด_ตามหลัก_Universal_Design_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content4/images/ทางลาดผู้สูงอายุ.webp",
            thumb: "/assets/image/content/content4/images/gallery/ทางลาดผู้สูงอายุ_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content4/images/หลักการพื้นฐานของ_Universal_Design_โครงการบ้าน_ศิรนินทร์_เรสซิเดนเซส_(SIRANINN_RESIDENCES).webp",
            thumb: "/assets/image/content/content4/images/gallery/หลักการพื้นฐานของ_Universal_Design_โครงการบ้าน_ศิรนินทร์_เรสซิเดนเซส_(SIRANINN_RESIDENCES)_gallery_thumbnail.webp",
            alt: ""
        },
    ]
}, {
    template: '/page/story/detail/content/content5/template.html',
    title: "Universal Design คืออะไร เทคนิคการออกแบบที่ไม่ว่าใคร <br/> ก็ใช้งานร่วมกันได้",
    description: "Universal Design เป็นหลักการออกแบบผลิตภัณฑ์ สภาพแวดล้อม และบริการต่างๆ ให้สามารถใช้งานได้อย่างเท่าเทียมที่ทุกคนสามารถใช้ร่วมกันได้",
    topic: "universal design คือ",
    cate: "S Home & Construction",
    date: "9 SEP 2024",
    url: {
        en: "/en/stories/sblog/universal-design-คือ",
        th: "/th/stories/sblog/universal-design-คือ"
    },
    lifestyle: {
        s: "/assets/image-new/thumb/story/universal_home.jpg",
        l: ""
    },
    thumb: "/assets/image/content/content5/images/H1/universal_design_คือ_thumbnail.webp",
    recomended: {
        showId: [5, 6, 7],
        m: "/assets/image/content/content5/images/H1/universal_design_คือ_recommend.webp",
        s: "/assets/image/content/content5/images/H1/universal_design_คือ_recommend_m.webp",
    },
    banner: {
        s: "/assets/image/content/content5/images/H1/universal_design_คือ_m.webp",
        l: "/assets/image/content/content5/images/H1/universal_design_คือ.webp"
    },
    gallery: [
        {
            l: "/assets/image/content/content5/images/Flexibility_ความยืดหยุ่นในการใช้งาน_ตามหลัก_universal_design.webp",
            thumb: "/assets/image/content/content5/images/gallery/Flexibility_ความยืดหยุ่นในการใช้งาน_ตามหลัก_universal_design_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content5/images/Low_physical_effort_การใช้พลังงานอย่างประหยัดและมีประสิทธิภาพ_ตามหลัก_Universal_Design.webp",
            thumb: "/assets/image/content/content5/images/gallery/Low_physical_effort_การใช้พลังงานอย่างประหยัดและมีประสิทธิภาพ_ตามหลัก_Universal_Design_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content5/images/universal_design_คือ.webp",
            thumb: "/assets/image/content/content5/images/gallery/universal_design_คือ_gallery_thumbnail.webp",
            alt: ""
        },
    ]
}, {
    template: '/page/story/detail/content/content6/template.html',
    title: "รวมต้นไม้ฟอกอากาศปลูกง่าย ช่วยลดสารพิษในบ้าน และห้องต่าง ๆ",
    description: "ต้นไม้ฟอกอากาศ มีประโยชน์หลายอย่าง ไม่ว่าจะช่วยทำให้บ้านของเราสดชื่น ช่วยดักจับฝุ่นในอากาศ และยังลดความเครียดได้อีกด้วย",
    topic: "ต้นไม้ฟอกอากาศ",
    cate: "S Lifestyle",
    date: "9 SEP 2024",
    url: {
        en: "/en/stories/sblog/ต้นไม้ฟอกอากาศ",
        th: "/th/stories/sblog/ต้นไม้ฟอกอากาศ"
    },
    lifestyle: {
        s: "/assets/image-new/thumb/story/universal_home.jpg",
        l: ""
    },
    thumb: "/assets/image/content/content6/images/H1/ต้นไม้ฟอกอากาศ_thumbnail.webp",
    recomended: {
        showId: [6, 0, 1],
        m: "/assets/image/content/content6/images/H1/ต้นไม้ฟอกอากาศ_recommend.webp",
        s: "/assets/image/content/content6/images/H1/ต้นไม้ฟอกอากาศ_recommend_m.webp",
    },
    banner: {
        s: "/assets/image/content/content6/images/H1/ต้นไม้ฟอกอากาศ_m.webp",
        l: "/assets/image/content/content6/images/H1/ต้นไม้ฟอกอากาศ.webp"
    },
    gallery: [
        {
            l: "/assets/image/content/content6/images/ต้นไม้ฟอกอากาศ.webp",
            thumb: "/assets/image/content/content6/images/gallery/ต้นไม้ฟอกอากาศ_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content6/images/ต้นไม้ฟอกอากาศ_ต้นดราแคนน่า.webp",
            thumb: "/assets/image/content/content6/images/gallery/ต้นไม้ฟอกอากาศ_ต้นดราแคนน่า_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content6/images/ต้นไม้ฟอกอากาศ_ต้นเดหลี.webp",
            thumb: "/assets/image/content/content6/images/gallery/ต้นไม้ฟอกอากาศ_ต้นเดหลี_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content6/images/ต้นไม้ฟอกอากาศ_ต้นพลูด่าง.webp",
            thumb: "/assets/image/content/content6/images/gallery/ต้นไม้ฟอกอากาศ_ต้นพลูด่าง_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content6/images/ต้นไม้ฟอกอากาศ_ต้นเฟิร์น.webp",
            thumb: "/assets/image/content/content6/images/gallery/ต้นไม้ฟอกอากาศ_ต้นเฟิร์น_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content6/images/ต้นไม้ฟอกอากาศ_ต้นมอนสเตอร่า.webp",
            thumb: "/assets/image/content/content6/images/gallery/ต้นไม้ฟอกอากาศ_ต้นมอนสเตอร่า_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content6/images/ต้นไม้ฟอกอากาศ_ต้นยางอินเดีย.webp",
            thumb: "/assets/image/content/content6/images/gallery/ต้นไม้ฟอกอากาศ_ต้นยางอินเดีย_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content6/images/ต้นไม้ฟอกอากาศ_ต้นลาเวนเดอร์.webp",
            thumb: "/assets/image/content/content6/images/gallery/ต้นไม้ฟอกอากาศ_ต้นลาเวนเดอร์_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content6/images/ต้นไม้ฟอกอากาศ_ต้นลิ้นมังกร.webp",
            thumb: "/assets/image/content/content6/images/gallery/ต้นไม้ฟอกอากาศ_ต้นลิ้นมังกร_gallery_thumbnail.webp",
            alt: ""
        },
    ]
}, {
    template: '/page/story/detail/content/content7/template.html',
    title: "11 ต้นไม้มงคลเสริมโชคลาภ ปลูกแล้วเฮงเรียกทรัพย์ตลอดปี",
    description: "หลายคนนิยมปลูกต้นไม้มงคลในบ้าน และคอนโด เพราะนอกจากจะช่วยประดับตกแต่งภายบ้านแล้ว ยังสามารถช่วยเสริมสิริมงคล ดึงดูดโชคลาภ เงินทอง ให้ไหลมาเทมาแก่ผู้อาศัยอีกด้วย",
    topic: "ต้นไม้มงคล",
    cate: "S Lifestyle",
    date: "9 SEP 2024",
    url: {
        en: "/en/stories/sblog/ต้นไม้มงคล",
        th: "/th/stories/sblog/ต้นไม้มงคล"
    },
    lifestyle: {
        s: "/assets/image-new/thumb/story/universal_home.jpg",
        l: ""
    },
    thumb: "/assets/image/content/content7/images/H1/ต้นไม้มงคล_thumbnail.webp",
    recomended: {
        showId: [0, 1, 2],
        m: "/assets/image/content/content7/images/H1/ต้นไม้มงคล_recommend.webp",
        s: "/assets/image/content/content7/images/H1/ต้นไม้มงคล_recommend_m.webp",
    },
    banner: {
        s: "/assets/image/content/content7/images/H1/ต้นไม้มงคล_m.webp",
        l: "/assets/image/content/content7/images/H1/ต้นไม้มงคล.webp"
    },
    gallery: [
        {
            l: "/assets/image/content/content7/images/ต้นไม้มงคล.webp",
            thumb: "/assets/image/content/content7/images/gallery/ต้นไม้มงคล_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content7/images/ต้นไม้มงคล_ต้นคลาสซูล่า.webp",
            thumb: "/assets/image/content/content7/images/gallery/ต้นไม้มงคล_ต้นคลาสซูล่า_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content7/images/ต้นไม้มงคล_ต้นยูคาลิปตัส.webp",
            thumb: "/assets/image/content/content7/images/gallery/ต้นไม้มงคล_ต้นยูคาลิปตัส_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content7/images/ต้นไม้มงคล_ต้นโรสแมรี่.webp",
            thumb: "/assets/image/content/content7/images/gallery/ต้นไม้มงคล_ต้นโรสแมรี่_gallery_thumbnail.webp",
            alt: ""
        },
        {
            l: "/assets/image/content/content7/images/ต้นไม้มงคล_ต้นส้มจี๊ด.webp",
            thumb: "/assets/image/content/content7/images/gallery/ต้นไม้มงคล_ต้นส้มจี๊ด_gallery_thumbnail.webp",
            alt: ""
        },
    ]
}
]
