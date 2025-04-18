
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
const articleData = [
    {
        template: '/page/story/detail/content/review-smyths-kaset-nawamin/template.html',
        meta: {
            title: {
                en: "SMYTH’S Kaset-Nawamin ที่สุดของ Private Estate ตอบโจทย์ทุกไลฟ์สไตล์ที่ลงตัว",
                th: "SMYTH’S Kaset-Nawamin ที่สุดของ Private Estate ตอบโจทย์ทุกไลฟ์สไตล์ที่ลงตัว"
            },
            description: {
                en: "SMYTH’S Kaset-Nawamin (สมิทธ์ เกษตร-นวมินทร์) รีวิวบ้านเดี่ยวหรู Pool Villa  ระดับ Super Luxury จาก สิงห์ เอสเตท ที่ใส่ใจความเป็นส่วนตัวระดับสูงสุด ด้วยจำนวน 10 ยูนิต เดินทางสะดวกบนถนนประเสริฐมนูกิจ ใกล้เลียบด่วนรามอินทรา",
                th: "SMYTH’S Kaset-Nawamin (สมิทธ์ เกษตร-นวมินทร์) รีวิวบ้านเดี่ยวหรู Pool Villa  ระดับ Super Luxury จาก สิงห์ เอสเตท ที่ใส่ใจความเป็นส่วนตัวระดับสูงสุด ด้วยจำนวน 10 ยูนิต เดินทางสะดวกบนถนนประเสริฐมนูกิจ ใกล้เลียบด่วนรามอินทรา"
            }
        },
        title: "SMYTH’S Kaset-Nawamin <br/>ที่สุดของ Private Estate  <br/>ตอบโจทย์ทุกไลฟ์สไตล์ที่ลงตัว",
        description: "SMYTH’S Kaset-Nawamin (สมิทธ์ เกษตร-นวมินทร์) รีวิวบ้านเดี่ยวหรู Pool Villa  ระดับ Super Luxury จาก สิงห์ เอสเตท ที่ใส่ใจความเป็นส่วนตัวระดับสูงสุด ด้วยจำนวน 10 ยูนิต เดินทางสะดวกบนถนนประเสริฐมนูกิจ ใกล้เลียบด่วนรามอินทรา",
        topic: "Smart Condo, บ้านอัจฉริยะ, เทคโนโลยีในบ้าน, ระบบอัตโนมัติ, ความสะดวกสบาย, ความปลอดภัย, ประหยัดพลังงาน, มูลค่าทรัพย์สิน, ไลฟ์สไตล์, อินเทอร์เน็ต, แอปพลิเคชัน, กล้องวงจรปิด, ผู้พัฒนาโครงการ",
        cate: "s blog",
        date: "21 Apr 2025",
        url: {
            en: "/en/stories/sblog/review-smyths-kaset-nawamin",
            th: "/th/stories/sblog/review-smyths-kaset-nawamin"
        },
        lifestyle: {
            s: "/assets/image/content/review-smyths-kaset-nawamin/home.jpg",
            l: "/assets/image/content/review-smyths-kaset-nawamin/home.jpg"
        },
        thumb: "/assets/image/content/review-smyths-kaset-nawamin/main_content.jpg",
        recomended: {
            m: "/assets/image/content/review-smyths-kaset-nawamin/recommend_desktop.jpg",
            s: "/assets/image/content/review-smyths-kaset-nawamin/recommend_mobile.jpg",
        },
        banner: {
            s: "/assets/image/content/review-smyths-kaset-nawamin/head_detail_mobile.jpg",
            l: "/assets/image/content/review-smyths-kaset-nawamin/head_detail_desktop.jpg"
        },
        gallery: [
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/1.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/1.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/2.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/2.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/3.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/3.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/4.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/4.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/5.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/5.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/6.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/6.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/7.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/7.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/8.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/8.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/9.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/9.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/10.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/10.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/11.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/11.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/13.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/13.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/14.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/14.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/15.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/15.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/16.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/16.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/17.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/17.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/18.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/18.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/19.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/19.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/20.jfif",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/20.jfif",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/21.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/21.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/22.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/22.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/23.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/23.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/24.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/24.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/25.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/25.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/26.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/26.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/28.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/28.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/29.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/29.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/31.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/31.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/32.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/32.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/33.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/33.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/34.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/34.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/35.jfif",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/35.jfif",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/36.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/36.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/37.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/37.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/38.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/38.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/39.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/39.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/40.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/40.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/41.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/41.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/42.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/42.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/43.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/43.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/44.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/44.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/45.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/45.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/46.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/46.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/47.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/47.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/48.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/48.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/49.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/49.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/50.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/50.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/51.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/51.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/52.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/52.png",
                alt: ""
            },
            {
                l: "/assets/image/content/review-smyths-kaset-nawamin/content/53.png",
                thumb: "/assets/image/content/review-smyths-kaset-nawamin/content/53.png",
                alt: ""
            },
        ],
    },
    {
        template: '/page/story/detail/content/content15/template.html',
        meta: {
            title: {
                en: "สมาร์ทคอนโด ที่พักแห่งอนาคตที่มากกว่าการอยู่อาศัย",
                th: "สมาร์ทคอนโด ที่พักแห่งอนาคตที่มากกว่าการอยู่อาศัย"
            },
            description: {
                en: "สมาร์ทคอนโด เทรนด์สิ่งอำนวยความสะดวกสบายล่าสุดสำหรับที่พักอาศัย เพราะสมาร์ทคอนโดช่วยให้ผู้อยู่อาศัยสามารถควบคุมและจัดการอุปกรณ์ต่าง ๆ ภายในคอนโดได้อย่างง่ายดายผ่านอุปกรณ์ต่าง ๆ เช่น การเปิด-ปิดไฟ, ปรับอุณหภูมิห้อง, หรือตรวจสอบกล้องวงจรปิดภายในบ้านได้ง่าย ๆ ได้ด้วยปลายนิ้ว",
                th: "สมาร์ทคอนโด เทรนด์สิ่งอำนวยความสะดวกสบายล่าสุดสำหรับที่พักอาศัย เพราะสมาร์ทคอนโดช่วยให้ผู้อยู่อาศัยสามารถควบคุมและจัดการอุปกรณ์ต่าง ๆ ภายในคอนโดได้อย่างง่ายดายผ่านอุปกรณ์ต่าง ๆ เช่น การเปิด-ปิดไฟ, ปรับอุณหภูมิห้อง, หรือตรวจสอบกล้องวงจรปิดภายในบ้านได้ง่าย ๆ ได้ด้วยปลายนิ้ว"
            }
        },
        title: "สมาร์ทคอนโด ที่พักแห่งอนาคตที่มากกว่าการอยู่อาศัย",
        description: "สมาร์ทคอนโด เทรนด์สิ่งอำนวยความสะดวกสบายล่าสุดสำหรับที่พักอาศัย เพราะสมาร์ทคอนโดช่วยให้ผู้อยู่อาศัยสามารถควบคุมและจัดการอุปกรณ์ต่าง ๆ ภายในคอนโดได้อย่างง่ายดายผ่านอุปกรณ์ต่าง ๆ เช่น การเปิด-ปิดไฟ, ปรับอุณหภูมิห้อง, หรือตรวจสอบกล้องวงจรปิดภายในบ้านได้ง่าย ๆ ได้ด้วยปลายนิ้ว",
        topic: "Smart Condo, บ้านอัจฉริยะ, เทคโนโลยีในบ้าน, ระบบอัตโนมัติ, ความสะดวกสบาย, ความปลอดภัย, ประหยัดพลังงาน, มูลค่าทรัพย์สิน, ไลฟ์สไตล์, อินเทอร์เน็ต, แอปพลิเคชัน, กล้องวงจรปิด, ผู้พัฒนาโครงการ",
        cate: "S Lifestyle",
        date: "27 Feb 2025",
        url: {
            en: "/en/stories/slifestyle/smart-condo",
            th: "/th/stories/slifestyle/smart-condo"
        },
        lifestyle: {
            s: "/assets/image/content/content15/SmartCondo_home.jpg",
            l: "/assets/image/content/content15/SmartCondo_home.jpg"
        },
        thumb: "/assets/image/content/content15/SmartCondo_thumbnail.jpg",
        recomended: {
            showId: [1, 2, 3],
            m: "/assets/image/content/content15/SmartCondo_recommend.jpg",
            s: "/assets/image/content/content15/SmartCondo_recommend_m.jpg",
        },
        banner: {
            s: "/assets/image/content/content15/SmartCondo_m.jpg",
            l: "/assets/image/content/content15/SmartCondo.jpg"
        },
        gallery: [
            {
                l: "/assets/image/content/content15/gallery/1.jpg",
                thumb: "/assets/image/content/content15/gallery/1.jpg",
                alt: ""
            },
            {
                l: "/assets/image/content/content15/gallery/2.jpg",
                thumb: "/assets/image/content/content15/gallery/2.jpg",
                alt: ""
            },
            {
                l: "/assets/image/content/content15/gallery/4.jpg",
                thumb: "/assets/image/content/content15/gallery/4.jpg",
                alt: ""
            },
            {
                l: "/assets/image/content/content15/gallery/5.jpg",
                thumb: "/assets/image/content/content15/gallery/5.jpg",
                alt: ""
            },
            {
                l: "/assets/image/content/content15/gallery/6.jpg",
                thumb: "/assets/image/content/content15/gallery/6.jpg",
                alt: ""
            },
            {
                l: "/assets/image/content/content15/gallery/7.jpg",
                thumb: "/assets/image/content/content15/gallery/7.jpg",
                alt: ""
            },
            {
                l: "/assets/image/content/content15/gallery/8.jpg",
                thumb: "/assets/image/content/content15/gallery/8.jpg",
                alt: ""
            },
        ],
    },
    {
        template: '/page/story/detail/content/content14/template.html',
        meta: {
            title: {
                en: "2 คอนโดหรูระดับ Luxury ใจกลางเมือง พร้อมทำเลคุณภาพ",
                th: "2 คอนโดหรูระดับ Luxury ใจกลางเมือง พร้อมทำเลคุณภาพ"
            },
            description: {
                en: "คอนโดหรู ถือเป็นที่อยู่อาศัยระดับพรีเมียมที่มอบประสบการณ์การใช้ชีวิตที่เหนือกว่า ด้วยการออกแบบที่หรูหรา พร้อมสิ่งอำนวยความสะดวกที่ครบครัน และอยู่กลางทำเลไพรม์โลเคชั่น (Prime Location) บริเวรในกลางเมืองท่ามกลางย่านธุรกิจ",
                th: "คอนโดหรู ถือเป็นที่อยู่อาศัยระดับพรีเมียมที่มอบประสบการณ์การใช้ชีวิตที่เหนือกว่า ด้วยการออกแบบที่หรูหรา พร้อมสิ่งอำนวยความสะดวกที่ครบครัน และอยู่กลางทำเลไพรม์โลเคชั่น (Prime Location) บริเวรในกลางเมืองท่ามกลางย่านธุรกิจ"
            }
        },
        title: "คอนโดหรูระดับ Luxury ใจกลางเมือง พร้อมทำเลคุณภาพ",
        description: "คอนโดหรู ถือเป็นที่อยู่อาศัยระดับพรีเมียมที่มอบประสบการณ์การใช้ชีวิตที่เหนือกว่า ด้วยการออกแบบที่หรูหรา พร้อมสิ่งอำนวยความสะดวกที่ครบครัน และอยู่กลางทำเลไพรม์โลเคชั่น (Prime Location) บริเวรในกลางเมืองท่ามกลางย่านธุรกิจ",
        topic: "คอนโดหรู , คอนโด สิงห์เอสเตท , คอนโดหรู สิงห์เอสเตท",
        cate: "S Living",
        date: "27 Feb 2025",
        url: {
            en: "/en/stories/sliving/luxury-condo",
            th: "/th/stories/sliving/luxury-condo"
        },
        lifestyle: {
            s: "/assets/image/content/content14/LuxuryCondo_home.jpg",
            l: "/assets/image/content/content14/LuxuryCondo_home.jpg"
        },
        thumb: "/assets/image/content/content14/LuxuryCondo_thumbnail.jpg",
        recomended: {
            showId: [2, 2, 3],
            m: "/assets/image/content/content14/LuxuryCondo_recommend.jpg",
            s: "/assets/image/content/content14/LuxuryCondo_recommend_m.jpg",
        },
        banner: {
            s: "/assets/image/content/content14/LuxuryCondo_m.jpg",
            l: "/assets/image/content/content14/LuxuryCondo.jpg"
        },
        gallery: [
            {
                l: "/assets/image/content/content14/gallery/1.jpg",
                thumb: "/assets/image/content/content14/gallery/1.jpg",
                alt: ""
            },
            {
                l: "/assets/image/content/content14/gallery/2.jpg",
                thumb: "/assets/image/content/content14/gallery/2.jpg",
                alt: ""
            },
            {
                l: "/assets/image/content/content14/gallery/4.jpg",
                thumb: "/assets/image/content/content14/gallery/4.jpg",
                alt: ""
            },
            {
                l: "/assets/image/content/content14/gallery/5.jpg",
                thumb: "/assets/image/content/content14/gallery/5.jpg",
                alt: ""
            },
            {
                l: "/assets/image/content/content14/gallery/6.jpg",
                thumb: "/assets/image/content/content14/gallery/6.jpg",
                alt: ""
            },
            {
                l: "/assets/image/content/content14/gallery/7.jpg",
                thumb: "/assets/image/content/content14/gallery/7.jpg",
                alt: ""
            },
            {
                l: "/assets/image/content/content14/gallery/8.jpg",
                thumb: "/assets/image/content/content14/gallery/8.jpg",
                alt: ""
            },
        ],
    },
    {
        template: '/page/story/detail/content/content13/template.html',
        meta: {
            title: {
                en: "ปักหมุด 4 ออนเซ็นส่วนตัว ระดับพรีเมียม ใกล้รถไฟฟ้า ใจกลางกรุงเทพ",
                th: "ปักหมุด 4 ออนเซ็นส่วนตัว ระดับพรีเมียม ใกล้รถไฟฟ้า ใจกลางกรุงเทพ"
            },
            description: {
                en: "ปักหมุด 4 ออนเซ็นส่วนตัว ระดับพรีเมียม เดินทางสะดวกใกล้รถไฟฟ้า แถมอยู่ใจกลางกรุงเทพ ใครมีแพลนชวนคนรักไปแช่น้ำร้อนพร้อมทำสปา ฮีลกายฮีลใจไปด้วยกันในบทความนี้ได้เลย",
                th: "ปักหมุด 4 ออนเซ็นส่วนตัว ระดับพรีเมียม เดินทางสะดวกใกล้รถไฟฟ้า แถมอยู่ใจกลางกรุงเทพ ใครมีแพลนชวนคนรักไปแช่น้ำร้อนพร้อมทำสปา ฮีลกายฮีลใจไปด้วยกันในบทความนี้ได้เลย"
            }
        },
        title: "ปักหมุด 4 ออนเซ็นส่วนตัว ระดับพรีเมียม ใกล้รถไฟฟ้า ใจกลางกรุงเทพ",
        description: "ปักหมุด 4 ออนเซ็นส่วนตัว ระดับพรีเมียม เดินทางสะดวกใกล้รถไฟฟ้า แถมอยู่ใจกลางกรุงเทพ ใครมีแพลนชวนคนรักไปแช่น้ำร้อนพร้อมทำสปา ฮีลกายฮีลใจไปด้วยกันในบทความนี้ได้เลย",
        topic: "Quality Keyword",
        cate: "S Lifestyle",
        date: "14 Feb 2025",
        url: {
            en: "/en/stories/sblog/premium-private-onsen",
            th: "/th/stories/sblog/premium-private-onsen"
        },
        lifestyle: {
            s: "/assets/image/content/content13/3.png",
            l: "/assets/image/content/content13/3.png"
        },
        thumb: "/assets/image/content/content13/ออนเซ็นส่วนตัว_thumbnail.jpg",
        recomended: {
            showId: [1, 2, 3],
            m: "/assets/image/content/content13/ออนเซ็นส่วนตัว_recommend.jpg",
            s: "/assets/image/content/content13/ออนเซ็นส่วนตัว_recommend_m.jpg",
        },
        banner: {
            s: "/assets/image/content/content13/ออนเซ็นส่วนตัว_m.jpg",
            l: "/assets/image/content/content13/ออนเซ็นส่วนตัว.jpg"
        },
        gallery: [
            {
                l: "/assets/image/content/content13/1.png",
                thumb: "/assets/image/content/content13/1.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/2.png",
                thumb: "/assets/image/content/content13/2.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/4.png",
                thumb: "/assets/image/content/content13/4.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/5.png",
                thumb: "/assets/image/content/content13/5.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/6.png",
                thumb: "/assets/image/content/content13/6.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/7.png",
                thumb: "/assets/image/content/content13/7.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/7.png",
                thumb: "/assets/image/content/content13/7.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/8.png",
                thumb: "/assets/image/content/content13/8.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/9.png",
                thumb: "/assets/image/content/content13/9.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/10.png",
                thumb: "/assets/image/content/content13/10.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/11.png",
                thumb: "/assets/image/content/content13/11.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/12.png",
                thumb: "/assets/image/content/content13/12.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/13.png",
                thumb: "/assets/image/content/content13/13.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/14.png",
                thumb: "/assets/image/content/content13/14.png",
                alt: ""
            },
            {
                l: "/assets/image/content/content13/15.png",
                thumb: "/assets/image/content/content13/15.png",
                alt: ""
            },
        ],
    },
    {
        template: '/page/story/detail/content/content8/template.html',
        meta: {
            title: {
                en: "เช็คลิสต์สำคัญ ‘อยากต่อเติมบ้าน’ ต้องรู้อะไรบ้าง",
                th: "เช็คลิสต์สำคัญ ‘อยากต่อเติมบ้าน’ ต้องรู้อะไรบ้าง"
            },
            description: {
                en: "เช็คลิสต์สำคัญ ‘อยากต่อเติมบ้าน’ ต้องรู้อะไรบ้าง | แต่ละครอบครัวมีไลฟ์สไตล์และความต้องการที่แตกต่างกัน เมื่อมีความต้องการใช้งานที่เพิ่มขึ้น การต่อเติมบ้านหรือขยายออกไปบริเวณข้างบ้านก็เป็นอีกไอเดียที่นิยมทำกัน",
                th: "เช็คลิสต์สำคัญ ‘อยากต่อเติมบ้าน’ ต้องรู้อะไรบ้าง | แต่ละครอบครัวมีไลฟ์สไตล์และความต้องการที่แตกต่างกัน เมื่อมีความต้องการใช้งานที่เพิ่มขึ้น การต่อเติมบ้านหรือขยายออกไปบริเวณข้างบ้านก็เป็นอีกไอเดียที่นิยมทำกัน"
            }
        },
        title: "เช็คลิสต์สำคัญ ‘อยากต่อเติมบ้าน’ ต้องรู้อะไรบ้าง",
        description: "เช็คลิสต์สำคัญ ‘อยากต่อเติมบ้าน’ ต้องรู้อะไรบ้าง | แต่ละครอบครัวมีไลฟ์สไตล์และความต้องการที่แตกต่างกัน เมื่อมีความต้องการใช้งานที่เพิ่มขึ้น การต่อเติมบ้านหรือขยายออกไปบริเวณข้างบ้านก็เป็นอีกไอเดียที่นิยมทำกัน",
        topic: "ต่อเติมบ้าน, ต่อเติมข้างบ้าน",
        cate: "S Home & Construction",
        date: "09 Dec 2024",
        url: {
            en: "/en/stories/sblog/house-addition",
            th: "/th/stories/sblog/house-addition"
        },
        lifestyle: {
            s: "/assets/image-new/thumb/story/thumb_โครงการบ้านเดี่ยว_ฌอน_(SHAWN)_-_ปัญญาอินทรา_home.webp",
            l: "/assets/image-new/thumb/story/โครงการบ้านเดี่ยว_ฌอน_(SHAWN)_-_ปัญญาอินทรา_home.webp"
        },
        thumb: "/assets/image/content/content8/images/H1/ต่อเติมบ้าน_thumbnail.jpg",
        recomended: {
            showId: [2, 3, 4],
            m: "/assets/image/content/content8/images/H1/ต่อเติมบ้าน_recommend.webp",
            s: "/assets/image/content/content8/images/H1/ต่อเติมบ้าน_recommend_m.webp",
        },
        banner: {
            s: "/assets/image/content/content8/images/H1/ต่อเติมบ้าน_m.webp",
            l: "/assets/image/content/content8/images/H1/ต่อเติมบ้าน.webp"
        },
        gallery: [
            {
                l: "/assets/image/content/content8/images/โครงการบ้านเดี่ยว_ฌอน_(SHAWN)_-_ปัญญาอินทรา.webp",
                thumb: "/assets/image/content/content8/images/gallery/โครงการบ้านเดี่ยว_ฌอน_(SHAWN)_-_ปัญญาอินทรา_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content8/images/ต่อเติมบ้าน_ต่อเติมข้างบ้าน.webp",
                thumb: "/assets/image/content/content8/images/gallery/ต่อเติมบ้าน_ต่อเติมข้างบ้าน_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content8/images/ต่อเติมบ้าน.webp",
                thumb: "/assets/image/content/content8/images/gallery/ต่อเติมบ้าน_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content8/images/การออกแบบบ้านคุณภาพสูง_จาก_สิงห์_เอสเตท.webp",
                thumb: "/assets/image/content/content8/images/gallery/การออกแบบบ้านคุณภาพสูง_จาก_สิงห์_เอสเตท_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content8/images/การออกแบบบ้านเพื่อความสะดวกสบาย_จาก_สิงห์_เอสเตท1.webp",
                thumb: "/assets/image/content/content8/images/gallery/การออกแบบบ้านเพื่อความสะดวกสบาย_จาก_สิงห์_เอสเตท1_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content8/images/บ้านพร้อมนวัตกรรมเพื่อสุขภาพ_S-Air.webp",
                thumb: "/assets/image/content/content8/images/gallery/บ้านพร้อมนวัตกรรมเพื่อสุขภาพ_S-Air_gallery_thumbnail.webp",
                alt: ""
            },
        ],
    },
    {
        template: '/page/story/detail/content/content9/template.html',
        meta: {
            title: {
                en: "S-Air นวัตกรรมอากาศบริสุทธิ์ ยกระดับคุณภาพชีวิตสำหรับผู้พักอาศัยในบ้านของ สิงห์ เอสเตท",
                th: "S-Air นวัตกรรมอากาศบริสุทธิ์ ยกระดับคุณภาพชีวิตสำหรับผู้พักอาศัยในบ้านของ สิงห์ เอสเตท"
            },
            description: {
                en: "S-Air นวัตกรรมอากาศบริสุทธิ์ | ปัจจุบันปัญหาคุณภาพอากาศโดยเฉพาะอากาศที่มีมลพิษฝุ่น PM2.5 ปะปนอยู่ กลายเป็นปัญหาที่ใครหลายคนกังวล ฉะนั้นการมีระบบระบายอากาศที่ดีอย่าง S-Air จึงเป็นสิ่งจำเป็นอย่างยิ่งเพื่อสุขภาพและคุณภาพชีวิตของผู้อยู่อาศัย",
                th: "S-Air นวัตกรรมอากาศบริสุทธิ์ | ปัจจุบันปัญหาคุณภาพอากาศโดยเฉพาะอากาศที่มีมลพิษฝุ่น PM2.5 ปะปนอยู่ กลายเป็นปัญหาที่ใครหลายคนกังวล ฉะนั้นการมีระบบระบายอากาศที่ดีอย่าง S-Air จึงเป็นสิ่งจำเป็นอย่างยิ่งเพื่อสุขภาพและคุณภาพชีวิตของผู้อยู่อาศัย"
            }
        },
        title: "S-Air นวัตกรรมอากาศบริสุทธิ์ ยกระดับคุณภาพชีวิตสำหรับผู้พักอาศัยในบ้านของ สิงห์ เอสเตท",
        description: "S-Air นวัตกรรมอากาศบริสุทธิ์ | ปัจจุบันปัญหาคุณภาพอากาศโดยเฉพาะอากาศที่มีมลพิษฝุ่น PM2.5 ปะปนอยู่ กลายเป็นปัญหาที่ใครหลายคนกังวล ฉะนั้นการมีระบบระบายอากาศที่ดีอย่าง S-Air จึงเป็นสิ่งจำเป็นอย่างยิ่งเพื่อสุขภาพและคุณภาพชีวิตของผู้อยู่อาศัย",
        topic: "s air , อากาศดี , อากาศบริสุทธิ์ , คุณภาพชีวิต",
        cate: "S Lifestyle",
        date: "09 Dec 2024",
        url: {
            en: "/en/stories/sblog/s-air",
            th: "/th/stories/sblog/s-air"
        },
        lifestyle: {
            s: "/assets/image-new/thumb/story/thumb_โครงการบ้านหรู_ฌอน_(SHAWN)_-_ปัญญาอินทรา.webp",
            l: "/assets/image-new/thumb/story/โครงการบ้านหรู_ฌอน_(SHAWN)_-_ปัญญาอินทรา_home.webp"
        },
        thumb: "/assets/image/content/content9/images/H1/s_air_thumbnail.jpg",
        recomended: {
            showId: [3, 4, 5],
            m: "/assets/image/content/content9/images/H1/s_air_recommend.webp",
            s: "/assets/image/content/content9/images/H1/s_air_recommend_m.webp",
        },
        banner: {
            s: "/assets/image/content/content9/images/H1/s_air_m.webp",
            l: "/assets/image/content/content9/images/H1/s_air.webp"
        },
        gallery: [
            {
                l: "/assets/image/content/content9/images/โครงการบ้านหรู_ฌอน_(SHAWN)_-_ปัญญาอินทรา.webp",
                thumb: "/assets/image/content/content9/images/gallery/โครงการบ้านหรู_ฌอน_(SHAWN)_-_ปัญญาอินทรา_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content9/images/มลพิษภายในบ้าน.webp",
                thumb: "/assets/image/content/content9/images/gallery/มลพิษภายในบ้าน_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content9/images/เอส_แอร์_(S-Air)_จาก_สิงห์_เอสเตท.webp",
                thumb: "/assets/image/content/content9/images/gallery/เอส_แอร์_(S-Air)_จาก_สิงห์_เอสเตท_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content9/images/Interior_โครงการบ้านเดี่ยว_ฌอน_(SHAWN)_-_ปัญญาอินทรา.webp",
                thumb: "/assets/image/content/content9/images/gallery/Interior_โครงการบ้านเดี่ยว_ฌอน_(SHAWN)_-_ปัญญาอินทรา_gallery_thumbnail.webp",
                alt: ""
            },
        ],
    },
    {
        template: '/page/story/detail/content/content10/template.html',
        meta: {
            title: {
                en: "13 อุปกรณ์ทันสมัย Smart Home ที่ช่วยเปลี่ยนบ้านของคุณน่าอยู่ขึ้น",
                th: "13 อุปกรณ์ทันสมัย Smart Home ที่ช่วยเปลี่ยนบ้านของคุณน่าอยู่ขึ้น"
            },
            description: {
                en: "13 อุปกรณ์ทันสมัย สมาร์ทโฮม (Smart Home) หรือ บ้านอัจฉริยะ เริ่มเป็นที่คุ้นหูและแพร่หลายมากขึ้น ด้วยเทคโนโลยี IoT ที่ทำให้การควบคุมระบบภายในบ้านเป็นเรื่องง่าย โดยผู้ใช้สามารถสั่งการผ่านแอปพลิเคชันบนสมาร์ทโฟนหรืออุปกรณ์สั่งการด้วยเสียงตลอดเวลา",
                th: "13 อุปกรณ์ทันสมัย สมาร์ทโฮม (Smart Home) หรือ บ้านอัจฉริยะ เริ่มเป็นที่คุ้นหูและแพร่หลายมากขึ้น ด้วยเทคโนโลยี IoT ที่ทำให้การควบคุมระบบภายในบ้านเป็นเรื่องง่าย โดยผู้ใช้สามารถสั่งการผ่านแอปพลิเคชันบนสมาร์ทโฟนหรืออุปกรณ์สั่งการด้วยเสียงตลอดเวลา"
            }
        },
        title: "13 อุปกรณ์ทันสมัย Smart Home ที่ช่วยเปลี่ยนบ้านของคุณน่าอยู่ขึ้น",
        description: "13 อุปกรณ์ทันสมัย สมาร์ทโฮม (Smart Home) หรือ บ้านอัจฉริยะ เริ่มเป็นที่คุ้นหูและแพร่หลายมากขึ้น ด้วยเทคโนโลยี IoT ที่ทำให้การควบคุมระบบภายในบ้านเป็นเรื่องง่าย โดยผู้ใช้สามารถสั่งการผ่านแอปพลิเคชันบนสมาร์ทโฟนหรืออุปกรณ์สั่งการด้วยเสียงตลอดเวลา",
        topic: "smart home คือ อะไร, smart home มี อะไร บ้าง , บ้านทันสมัย",
        cate: "S Lifestyle",
        date: "09 Dec 2024",
        url: {
            en: "/en/stories/sblog/top-13-smart-home-items",
            th: "/th/stories/sblog/top-13-smart-home-items"
        },
        lifestyle: {
            s: "/assets/image-new/thumb/story/thumb_smart_home_มี_อะไร_บ้าง.webp",
            l: "/assets/image-new/thumb/story/smart_home_มี_อะไร_บ้าง_home.webp"
        },
        thumb: "/assets/image/content/content10/images/H1/smart_home_thumbnail.jpg",
        recomended: {
            showId: [4, 5, 6],
            m: "/assets/image/content/content10/images/H1/smart_home_recommend.webp",
            s: "/assets/image/content/content10/images/H1/smart_home_recommend_m.webp",
        },
        banner: {
            s: "/assets/image/content/content10/images/H1/smart_home_m.webp",
            l: "/assets/image/content/content10/images/H1/smart_home.webp"
        },
        gallery: [
            {
                l: "/assets/image/content/content10/images/smart_home_มี_อะไร_บ้าง.webp",
                thumb: "/assets/image/content/content10/images/gallery/smart_home_มี_อะไร_บ้าง_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content10/images/smart_home_คือ_อะไร.webp",
                thumb: "/assets/image/content/content10/images/gallery/smart_home_คือ_อะไร_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content10/images/สมาร์ทสปีคเกอร์_(Smart_Speaker).webp",
                thumb: "/assets/image/content/content10/images/gallery/สมาร์ทสปีคเกอร์_(Smart_Speaker)_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content10/images/หลอดไฟอัจฉริยะ_(Smart_Light_Bulb).webp",
                thumb: "/assets/image/content/content10/images/gallery/หลอดไฟอัจฉริยะ_(Smart_Light_Bulb)_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content10/images/ประตูอัจฉริยะ_(Smart_Door_Lock).webp",
                thumb: "/assets/image/content/content10/images/gallery/ประตูอัจฉริยะ_(Smart_Door_Lock)_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content10/images/หุ่นยนต์ดูดฝุ่นอัจฉริยะ_(Robot_Vacuum).webp",
                thumb: "/assets/image/content/content10/images/gallery/หุ่นยนต์ดูดฝุ่นอัจฉริยะ_(Robot_Vacuum)_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content10/images/เซ็นเซอร์ตรวจจับควันและก๊าซ_(Smart_Smoke_&_Gas_Detector).webp",
                thumb: "/assets/image/content/content10/images/gallery/เซ็นเซอร์ตรวจจับควันและก๊าซ_(Smart_Smoke_&_Gas_Detector)_gallery_thumbnail.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content10/images/เทอร์โมสตัทอัจฉริยะ_(Smart_Thermostat).webp",
                thumb: "/assets/image/content/content10/images/gallery/เทอร์โมสตัทอัจฉริยะ_(Smart_Thermostat)_gallery_thumbnail.webp",
                alt: ""
            }
        ],
    },
    {
        template: '/page/story/detail/content/content11/template.html',
        meta: {
            title: {
                en: "S’RIN ราชพฤกษ์ - สาย 1 บ้านเดี่ยวบนทำเลศักยภาพ ในพื้นที่ที่คุณออกแบบได้",
                th: "S’RIN ราชพฤกษ์ - สาย 1 บ้านเดี่ยวบนทำเลศักยภาพ ในพื้นที่ที่คุณออกแบบได้"
            },
            description: {
                en: "S'RIN ราชพฤกษ์-สาย 1 โครงการบ้านเดี่ยวระดับลักซ์ชัวรี สไตล์ Modern Tropical ที่ผสานความงามของสถาปัตยกรรมเข้ากับธรรมชาติ บนแนวคิด Crafted to Last พร้อมฟังก์ชันครบครัน ตอบโจทย์คนทุกรุ่นในครอบครัว",
                th: "S'RIN ราชพฤกษ์-สาย 1 โครงการบ้านเดี่ยวระดับลักซ์ชัวรี สไตล์ Modern Tropical ที่ผสานความงามของสถาปัตยกรรมเข้ากับธรรมชาติ บนแนวคิด Crafted to Last พร้อมฟังก์ชันครบครัน ตอบโจทย์คนทุกรุ่นในครอบครัว"
            }
        },
        title: "สริน ราชพฤกษ์ - สาย 1 บ้านเดี่ยวที่คุณออกแบบได้ สู่ความสุขของทุกคนในครอบครัว",
        description: "S'RIN ราชพฤกษ์-สาย 1 โครงการบ้านเดี่ยวระดับลักซ์ชัวรี สไตล์ Modern Tropical ที่ผสานความงามของสถาปัตยกรรมเข้ากับธรรมชาติ บนแนวคิด Crafted to Last พร้อมฟังก์ชันครบครัน ตอบโจทย์คนทุกรุ่นในครอบครัว",
        topic: "S'RIN ราชพฤกษ์-สาย 1, S’RIN Ratchapruek, บ้าน เดี่ยว ราชพฤกษ์",
        cate: "S Home & Construction",
        date: "16 Dec 2024",
        url: {
            en: "/en/stories/sblog/review-srin-ratchaphruek-sai1",
            th: "/th/stories/sblog/review-srin-ratchaphruek-sai1"
        },
        lifestyle: {
            s: "/assets/image-new/thumb/story/thumb_S'RIN_Ratchaphruek-Sai_1.webp",
            l: "/assets/image-new/thumb/story/S'RIN_Ratchaphruek-Sai_1_home.webp"
        },
        thumb: "/assets/image/content/content11/images/H1/S'RIN_Ratchaphruek-Sai_1_thumbnail.webp",
        recomended: {
            showId: [5, 6, 7],
            m: "/assets/image/content/content11/images/H1/S'RIN_Ratchaphruek-Sai_1_recommend.webp",
            s: "/assets/image/content/content11/images/H1/S'RIN_Ratchaphruek-Sai_1_recommend_m.webp",
        },
        banner: {
            s: "/assets/image/content/content11/images/H1/srin_m.webp",
            l: "/assets/image/content/content11/images/H1/srin.webp"
        },
        gallery: [
            {
                l: "/assets/image/content/content11/images/โครงการ_S'RIN_Ratchaphruek-Sai_1.webp",
                thumb: "/assets/image/content/content11/images/gallery/โครงการ_S'RIN_Ratchaphruek-Sai_1.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/แนวคิดการออกแบบที่อยู่อาศัย.webp",
                thumb: "/assets/image/content/content11/images/gallery/แนวคิดการออกแบบที่อยู่อาศัย.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ที่ตั้ง.webp",
                thumb: "/assets/image/content/content11/images/gallery/ที่ตั้ง.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/พื้นที่ส่วนกลาง.webp",
                thumb: "/assets/image/content/content11/images/gallery/พื้นที่ส่วนกลาง.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/พื้นที่สีเขียวในโครงการ.webp",
                thumb: "/assets/image/content/content11/images/gallery/พื้นที่สีเขียวในโครงการ.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/บรรยากาศภายในโครงการ.webp",
                thumb: "/assets/image/content/content11/images/gallery/บรรยากาศภายในโครงการ.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/Main_Gate.webp",
                thumb: "/assets/image/content/content11/images/gallery/Main_Gate.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/Clubhouse.webp",
                thumb: "/assets/image/content/content11/images/gallery/Clubhouse.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/สระว่าย.webp",
                thumb: "/assets/image/content/content11/images/gallery/สระว่าย.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ฟิตเนส.webp",
                thumb: "/assets/image/content/content11/images/gallery/ฟิตเนส.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/แบบบ้าน.webp",
                thumb: "/assets/image/content/content11/images/gallery/แบบบ้าน.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ดีไซน์ภายนอกตัวบ้าน.webp",
                thumb: "/assets/image/content/content11/images/gallery/ดีไซน์ภายนอกตัวบ้าน.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ด้านหน้าทางเข้าบ้าน.webp",
                thumb: "/assets/image/content/content11/images/gallery/ด้านหน้าทางเข้าบ้าน.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/พื้นที่เก็บรองเท้า.webp",
                thumb: "/assets/image/content/content11/images/gallery/พื้นที่เก็บรองเท้า.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ห้องรับแขก.webp",
                thumb: "/assets/image/content/content11/images/gallery/ห้องรับแขก.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/พื้นที่ส่วนกลาง_Common_Area_1.webp",
                thumb: "/assets/image/content/content11/images/gallery/พื้นที่ส่วนกลาง_Common_Area_1.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/พื้นที่ส่วนกลาง_Common_Area_2.webp",
                thumb: "/assets/image/content/content11/images/gallery/พื้นที่ส่วนกลาง_Common_Area_2.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/พื้นที่ส่วนกลาง_Common_Area_3.webp",
                thumb: "/assets/image/content/content11/images/gallery/พื้นที่ส่วนกลาง_Common_Area_3.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ห้องนอน.webp",
                thumb: "/assets/image/content/content11/images/gallery/ห้องนอน.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ห้องรับประทานอาหาร.webp",
                thumb: "/assets/image/content/content11/images/gallery/ห้องรับประทานอาหาร.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ห้องครัว.webp",
                thumb: "/assets/image/content/content11/images/gallery/ห้องครัว.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/พื้นที่ชั้น_2.webp",
                thumb: "/assets/image/content/content11/images/gallery/พื้นที่ชั้น_2.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/บันไดและโถงพักผ่อนชั้นบน.webp",
                thumb: "/assets/image/content/content11/images/gallery/บันไดและโถงพักผ่อนชั้นบน.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/Family_Area.webp",
                thumb: "/assets/image/content/content11/images/gallery/Family_Area.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ห้องนอนหลัก.webp",
                thumb: "/assets/image/content/content11/images/gallery/ห้องนอนหลัก.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ห้องน้ำหลัก.webp",
                thumb: "/assets/image/content/content11/images/gallery/ห้องน้ำหลัก.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/Master_Walk-in_Closet.webp",
                thumb: "/assets/image/content/content11/images/gallery/Master_Walk-in_Closet.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ห้องนอนรอง_2.webp",
                thumb: "/assets/image/content/content11/images/gallery/ห้องนอนรอง_2.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ห้องนอนรอง_3.webp",
                thumb: "/assets/image/content/content11/images/gallery/ห้องนอนรอง_3.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content11/images/ห้องนอนรอง_4.webp",
                thumb: "/assets/image/content/content11/images/gallery/ห้องนอนรอง_4.webp",
                alt: ""
            },
        ],
    },
    {
        template: '/page/story/detail/content/content12/template.html',
        meta: {
            title: {
                en: "SHAWN ปัญญาอินทรา - บ้านเดี่ยวที่ตอบโจทย์การอยู่อาศัยของคนทุกรุ่น",
                th: "SHAWN ปัญญาอินทรา - บ้านเดี่ยวที่ตอบโจทย์การอยู่อาศัยของคนทุกรุ่น"
            },
            description: {
                en: "SHAWN Panya Indra (ฌอน ปัญญาอินทรา) บ้านเดี่ยวระดับลักซ์ชัวรี บนดีไซน์ Modern Tropical ที่สะท้อนตัวตนผ่านฟังก์ชันที่ครบครันสำหรับครอบครัว Multi-Generation บนทำเลศักยภาพรามอินทรา",
                th: "SHAWN Panya Indra (ฌอน ปัญญาอินทรา) บ้านเดี่ยวระดับลักซ์ชัวรี บนดีไซน์ Modern Tropical ที่สะท้อนตัวตนผ่านฟังก์ชันที่ครบครันสำหรับครอบครัว Multi-Generation บนทำเลศักยภาพรามอินทรา"
            }
        },
        title: "SHAWN ปัญญาอินทรา เชื่อมต่อทุกความสุข ด้วยบ้านหลังใหญ่ที่ใช่ในแบบของคุณ",
        description: "SHAWN Panya Indra (ฌอน ปัญญาอินทรา) บ้านเดี่ยวระดับลักซ์ชัวรี บนดีไซน์ Modern Tropical ที่สะท้อนตัวตนผ่านฟังก์ชันที่ครบครันสำหรับครอบครัว Multi-Generation บนทำเลศักยภาพรามอินทรา",
        topic: "shawn panya indra, shawn ปัญญาอินทรา, ฌอน ปัญญาอินทรา, บ้าน รามอินทรา",
        cate: "S Home & Construction",
        date: "16 Dec 2024",
        url: {
            en: "/en/stories/sblog/review-shawnpanyaindra",
            th: "/th/stories/sblog/review-shawnpanyaindra"
        },
        lifestyle: {
            s: "/assets/image-new/thumb/story/thumb_Panya.webp",
            l: "/assets/image-new/thumb/story/Panya_home.webp"
        },
        thumb: "/assets/image/content/content12/images/H1/Panya_thumbnail.webp",
        recomended: {
            showId: [6, 7, 8],
            m: "/assets/image/content/content12/images/H1/Panya_recommend.webp",
            s: "/assets/image/content/content12/images/H1/Panya_recommend_m.webp",
        },
        banner: {
            s: "/assets/image/content/content12/images/H1/Panya1_m.webp",
            l: "/assets/image/content/content12/images/H1/Panya1.webp"
        },
        gallery: [
            {
                l: "/assets/image/content/content12/images/โครงการ_SHAWN_Panya_Indra.webp",
                thumb: "/assets/image/content/content12/images/gallery/โครงการ_SHAWN_Panya_Indra.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/บ้านเดี่ยว.webp",
                thumb: "/assets/image/content/content12/images/gallery/บ้านเดี่ยว.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ที่ตั้งโครงการ.webp",
                thumb: "/assets/image/content/content12/images/gallery/ที่ตั้งโครงการ.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/พื้นที่ส่วนกลาง.webp",
                thumb: "/assets/image/content/content12/images/gallery/พื้นที่ส่วนกลาง.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/สนามเด็กเล่น.webp",
                thumb: "/assets/image/content/content12/images/gallery/สนามเด็กเล่น.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ประตูทางเข้าโครงการ.webp",
                thumb: "/assets/image/content/content12/images/gallery/ประตูทางเข้าโครงการ.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/Clubhouse.webp",
                thumb: "/assets/image/content/content12/images/gallery/Clubhouse.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/สระว่ายน้ำ.webp",
                thumb: "/assets/image/content/content12/images/gallery/สระว่ายน้ำ.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ฟิตเนส.webp",
                thumb: "/assets/image/content/content12/images/gallery/ฟิตเนส.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/แบบบ้าน.webp",
                thumb: "/assets/image/content/content12/images/gallery/แบบบ้าน.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ดีไซน์ภายนอกตัวบ้าน.webp",
                thumb: "/assets/image/content/content12/images/gallery/ดีไซน์ภายนอกตัวบ้าน.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องนั่งเล่น.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องนั่งเล่น.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องอเนกประสงค์ชั้นล่าง.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องอเนกประสงค์ชั้นล่าง.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องอเนกประสงค์ชั้นล่าง_2.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องอเนกประสงค์ชั้นล่าง_2.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องอเนกประสงค์ชั้นล่าง_3.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องอเนกประสงค์ชั้นล่าง_3.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องอเนกประสงค์ชั้นล่าง_4.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องอเนกประสงค์ชั้นล่าง_4.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/Living_Space.webp",
                thumb: "/assets/image/content/content12/images/gallery/Living_Space.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องรับประทานอาหาร.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องรับประทานอาหาร.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องรับประทานอาหาร_2.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องรับประทานอาหาร_2.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/พื้นที่ชั้น_2.webp",
                thumb: "/assets/image/content/content12/images/gallery/พื้นที่ชั้น_2.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/พื้นที่ชั้น_2_2.webp",
                thumb: "/assets/image/content/content12/images/gallery/พื้นที่ชั้น_2_2.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/Master_Bedroom.webp",
                thumb: "/assets/image/content/content12/images/gallery/Master_Bedroom.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/Master_Bedroom_2.webp",
                thumb: "/assets/image/content/content12/images/gallery/Master_Bedroom_2.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/Master_Bedroom_3.webp",
                thumb: "/assets/image/content/content12/images/gallery/Master_Bedroom_3.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/Walk-in_Closet.webp",
                thumb: "/assets/image/content/content12/images/gallery/Walk-in_Closet.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/Master_Bathroom.webp",
                thumb: "/assets/image/content/content12/images/gallery/Master_Bathroom.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องนอนรอง_1.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องนอนรอง_1.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องนอนรอง_1_2.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องนอนรอง_1_2.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องนอนรอง_2.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องนอนรอง_2.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องนอนรอง_2_2.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องนอนรอง_2_2.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องนอนรอง_3.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องนอนรอง_2.webp",
                alt: ""
            },
            {
                l: "/assets/image/content/content12/images/ห้องนอนรอง_3_2.webp",
                thumb: "/assets/image/content/content12/images/gallery/ห้องนอนรอง_3_2.webp",
                alt: ""
            },
        ],
    },
    {
        template: '/page/story/detail/content/content1/template.html',
        meta: {
            title: {
                en: "ฮวงจุ้ยบ้าน เคล็ดลับนำความสุข ความเจริญรุ่งเรืองให้แก่ผู้อยู่อาศัย",
                th: "ฮวงจุ้ยบ้าน เคล็ดลับนำความสุข ความเจริญรุ่งเรืองให้แก่ผู้อยู่อาศัย"
            },
            description: {
                en: "เรียนรู้หลักการฮวงจุ้ยบ้านเพื่อสร้างพลังงานที่ดี ส่งเสริมความสุข สุขภาพ และความมั่งคั่ง พร้อมเคล็ดลับการจัดห้องต่างๆ และวิธีแก้ไขฮวงจุ้ยที่ไม่ดีในบ้าน",
                th: "เรียนรู้หลักการฮวงจุ้ยบ้านเพื่อสร้างพลังงานที่ดี ส่งเสริมความสุข สุขภาพ และความมั่งคั่ง พร้อมเคล็ดลับการจัดห้องต่างๆ และวิธีแก้ไขฮวงจุ้ยที่ไม่ดีในบ้าน"
            }
        },
        title: "ฮวงจุ้ยบ้าน เคล็ดลับนำความสุข ความเจริญรุ่งเรืองให้แก่ผู้อยู่อาศัย",
        description: "เรียนรู้หลักการฮวงจุ้ยบ้านเพื่อสร้างพลังงานที่ดี ส่งเสริมความสุข สุขภาพ และความมั่งคั่ง พร้อมเคล็ดลับการจัดห้องต่างๆ และวิธีแก้ไขฮวงจุ้ยที่ไม่ดีในบ้าน",
        topic: "ฮวงจุ้ยบ้าน",
        cate: "S Lifestyle ",
        date: "09 Sep 2024",
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
            showId: [7, 8, 9],
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
        meta: {
            title: {
                en: "ฮวงจุ้ยห้องนอน เคล็ดลับจัดห้องนอนให้ถูกหลัก ช่วยเสริมพลังชีวิต",
                th: "ฮวงจุ้ยห้องนอน เคล็ดลับจัดห้องนอนให้ถูกหลัก ช่วยเสริมพลังชีวิต"
            },
            description: {
                en: "เรียนรู้หลักฮวงจุ้ยห้องนอนที่ถูกต้อง พร้อมเคล็ดลับการจัดวางเตียง กระจก และของตกแต่ง เพื่อสร้างพื้นที่พักผ่อนที่สมบูรณ์แบบ ส่งเสริมการนอนหลับที่มีคุณภาพและชีวิตที่สมดุล",
                th: "เรียนรู้หลักฮวงจุ้ยห้องนอนที่ถูกต้อง พร้อมเคล็ดลับการจัดวางเตียง กระจก และของตกแต่ง เพื่อสร้างพื้นที่พักผ่อนที่สมบูรณ์แบบ ส่งเสริมการนอนหลับที่มีคุณภาพและชีวิตที่สมดุล"
            }
        },
        title: "ฮวงจุ้ยห้องนอน เคล็ดลับจัดห้องนอนให้ถูกหลัก ช่วยเสริมพลังชีวิต",
        description: "เรียนรู้หลักฮวงจุ้ยห้องนอนที่ถูกต้อง พร้อมเคล็ดลับการจัดวางเตียง กระจก และของตกแต่ง เพื่อสร้างพื้นที่พักผ่อนที่สมบูรณ์แบบ ส่งเสริมการนอนหลับที่มีคุณภาพและชีวิตที่สมดุล",
        topic: "ฮวงจุ้ยห้องนอน",
        cate: "S Lifestyle",
        date: "09 Sep 2024",
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
            showId: [8, 9, 10],
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
        meta: {
            title: {
                en: "พาชมโครงการบ้านหรู คฤหาสน์ Luxury บนทำเลทอง ปี 2024",
                th: "พาชมโครงการบ้านหรู คฤหาสน์ Luxury บนทำเลทอง ปี 2024"
            },
            description: {
                en: "การเป็นเจ้าของบ้านหรูระดับ Luxury ไปจนถึง Ultra Luxury ถือเป็นสัญลักษณ์แห่งความสำเร็จ ความมั่งคั่ง สะท้อนให้เห็นถึงไลฟ์สไตล์ที่ดูหรูหรา รสนิยม และความสำเร็จของเจ้าของบ้าน",
                th: "การเป็นเจ้าของบ้านหรูระดับ Luxury ไปจนถึง Ultra Luxury ถือเป็นสัญลักษณ์แห่งความสำเร็จ ความมั่งคั่ง สะท้อนให้เห็นถึงไลฟ์สไตล์ที่ดูหรูหรา รสนิยม และความสำเร็จของเจ้าของบ้าน"
            }
        },
        title: "พาชมโครงการบ้านหรู คฤหาสน์ Luxury บนทำเลทอง ปี 2024",
        description: "การเป็นเจ้าของบ้านหรูระดับ Luxury ไปจนถึง Ultra Luxury ถือเป็นสัญลักษณ์แห่งความสำเร็จ ความมั่งคั่ง สะท้อนให้เห็นถึงไลฟ์สไตล์ที่ดูหรูหรา รสนิยม และความสำเร็จของเจ้าของบ้าน",
        topic: "บ้านหรู",
        cate: "S Living",
        date: "09 Sep 2024",
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
            showId: [9, 10, 11],
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
        meta: {
            title: {
                en: "ทางลาดสำหรับผู้สูงอายุและคนพิการ ตามหลัก Universal Design",
                th: "ทางลาดสำหรับผู้สูงอายุและคนพิการ ตามหลัก Universal Design"
            },
            description: {
                en: "การออกแบบทางลาดสำหรับคนพิการทุพพลภาพและผู้สูงอายุตามหลัก Universal Design เพื่อความปลอดภัยและความสะดวกสบายในการใช้งาน",
                th: "การออกแบบทางลาดสำหรับคนพิการทุพพลภาพและผู้สูงอายุตามหลัก Universal Design เพื่อความปลอดภัยและความสะดวกสบายในการใช้งาน"
            }
        },
        title: "ทางลาดตามหลักสถาปัตยกรรม <br/> สู่การเข้าถึงที่เท่าเทียม พร้อมรองรับผู้สูงอายุ",
        description: "การออกแบบทางลาดสำหรับคนพิการทุพพลภาพและผู้สูงอายุตามหลัก Universal Design เพื่อความปลอดภัยและความสะดวกสบายในการใช้งาน",
        topic: "ทางลาดผู้สูงอายุ",
        cate: "S Home & Construction",
        date: "09 Sep 2024",
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
            showId: [10, 11, 12],
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
        meta: {
            title: {
                en: "Universal Design คืออะไร เทคนิคการออกแบบที่ไม่ว่าใคร ก็ใช้งานร่วมกันได้",
                th: "Universal Design คืออะไร เทคนิคการออกแบบที่ไม่ว่าใคร ก็ใช้งานร่วมกันได้"
            },
            description: {
                en: "Universal Design เป็นหลักการออกแบบผลิตภัณฑ์ สภาพแวดล้อม และบริการต่างๆ ให้สามารถใช้งานได้อย่างเท่าเทียมที่ทุกคนสามารถใช้ร่วมกันได้",
                th: "Universal Design เป็นหลักการออกแบบผลิตภัณฑ์ สภาพแวดล้อม และบริการต่างๆ ให้สามารถใช้งานได้อย่างเท่าเทียมที่ทุกคนสามารถใช้ร่วมกันได้"
            }
        },
        title: "Universal Design คืออะไร เทคนิคการออกแบบที่ไม่ว่าใคร <br/> ก็ใช้งานร่วมกันได้",
        description: "Universal Design เป็นหลักการออกแบบผลิตภัณฑ์ สภาพแวดล้อม และบริการต่างๆ ให้สามารถใช้งานได้อย่างเท่าเทียมที่ทุกคนสามารถใช้ร่วมกันได้",
        topic: "universal design คือ",
        cate: "S Home & Construction",
        date: "09 Sep 2024",
        url: {
            en: "/en/stories/sblog/universal-design",
            th: "/th/stories/sblog/universal-design"
        },
        lifestyle: {
            s: "/assets/image-new/thumb/story/universal_home.jpg",
            l: ""
        },
        thumb: "/assets/image/content/content5/images/H1/universal_design_คือ_thumbnail.webp",
        recomended: {
            showId: [11, 12, 0],
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
        meta: {
            title: {
                en: "รวมต้นไม้ฟอกอากาศปลูกง่าย ช่วยลดสารพิษในบ้าน และห้องต่าง ๆ",
                th: "รวมต้นไม้ฟอกอากาศปลูกง่าย ช่วยลดสารพิษในบ้าน และห้องต่าง ๆ"
            },
            description: {
                en: "ต้นไม้ฟอกอากาศ มีประโยชน์หลายอย่าง ไม่ว่าจะช่วยทำให้บ้านของเราสดชื่น ช่วยดักจับฝุ่นในอากาศ และยังลดความเครียดได้อีกด้วย",
                th: "ต้นไม้ฟอกอากาศ มีประโยชน์หลายอย่าง ไม่ว่าจะช่วยทำให้บ้านของเราสดชื่น ช่วยดักจับฝุ่นในอากาศ และยังลดความเครียดได้อีกด้วย"
            }
        },
        title: "รวมต้นไม้ฟอกอากาศปลูกง่าย ช่วยลดสารพิษในบ้าน และห้องต่าง ๆ",
        description: "ต้นไม้ฟอกอากาศ มีประโยชน์หลายอย่าง ไม่ว่าจะช่วยทำให้บ้านของเราสดชื่น ช่วยดักจับฝุ่นในอากาศ และยังลดความเครียดได้อีกด้วย",
        topic: "ต้นไม้ฟอกอากาศ",
        cate: "S Lifestyle",
        date: "09 Sep 2024",
        url: {
            en: "/en/stories/sblog/indoor-air-purifying-plants",
            th: "/th/stories/sblog/indoor-air-purifying-plants"
        },
        lifestyle: {
            s: "/assets/image-new/thumb/story/universal_home.jpg",
            l: ""
        },
        thumb: "/assets/image/content/content6/images/H1/ต้นไม้ฟอกอากาศ_thumbnail.webp",
        recomended: {
            showId: [12, 0, 1],
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
        meta: {
            title: {
                en: "11 ต้นไม้มงคลเสริมโชคลาภ ปลูกแล้วเฮงเรียกทรัพย์ตลอดปี",
                th: "11 ต้นไม้มงคลเสริมโชคลาภ ปลูกแล้วเฮงเรียกทรัพย์ตลอดปี"
            },
            description: {
                en: "หลายคนนิยมปลูกต้นไม้มงคลในบ้าน และคอนโด เพราะนอกจากจะช่วยประดับตกแต่งภายบ้านแล้ว ยังสามารถช่วยเสริมสิริมงคล ดึงดูดโชคลาภ เงินทอง ให้ไหลมาเทมาแก่ผู้อาศัยอีกด้วย",
                th: "หลายคนนิยมปลูกต้นไม้มงคลในบ้าน และคอนโด เพราะนอกจากจะช่วยประดับตกแต่งภายบ้านแล้ว ยังสามารถช่วยเสริมสิริมงคล ดึงดูดโชคลาภ เงินทอง ให้ไหลมาเทมาแก่ผู้อาศัยอีกด้วย"
            }
        },
        title: "11 ต้นไม้มงคลเสริมโชคลาภ ปลูกแล้วเฮงเรียกทรัพย์ตลอดปี",
        description: "หลายคนนิยมปลูกต้นไม้มงคลในบ้าน และคอนโด เพราะนอกจากจะช่วยประดับตกแต่งภายบ้านแล้ว ยังสามารถช่วยเสริมสิริมงคล ดึงดูดโชคลาภ เงินทอง ให้ไหลมาเทมาแก่ผู้อาศัยอีกด้วย",
        topic: "ต้นไม้มงคล",
        cate: "S Lifestyle",
        date: "09 Sep 2024",
        url: {
            en: "/en/stories/sblog/11-auspicious-tree-boost-rich-in-wealth",
            th: "/th/stories/sblog/11-auspicious-tree-boost-rich-in-wealth"
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
