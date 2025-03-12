// Define the Header component


const project_details = {
    tab: "projectDetails",
    detail: [
        {
            title: {
                en: "Project Details",
                th: "รายละเอียดโครงการ"
            },
            item: [
                {
                    name: {
                        en: "land :",
                        th: "ที่ดิน :"
                    },
                    detail: {
                        en: "23-3-40 rai​",
                        th: "23-3-40 ไร่​"
                    }
                },
                {
                    name: {
                        en: "Residential Type :",
                        th: "ประเภทโครงการ :"
                    },
                    detail: {
                        en: "detached house​",
                        th: "บ้านเดี่ยว​​"
                    }
                },
                {
                    name: {
                        en: "Plot size :",
                        th: "จำนวนพล็อต :"
                    },
                    detail: {
                        en: "28 plots",
                        th: "28 พล็อต"
                    }
                },
            ]
        },
        {
            title: {
                en: "House Types and Sizes​",
                th: "ประเภทและขนาดบ้าน หรือ ประเภทบ้านและพื้นที่ใช้สอย​"
            },
            item: [
                {
                    name: {
                        en: "RESIDENCE I",
                        th: "RESIDENCE I"
                    },
                    detail: {
                        en: "820 sq.m.​ / start 219 sq.m.",
                        th: "820 ตร.ม. / เริ่มต้น 219 ตร.ว"
                    }
                },
                {
                    name: {
                        en: "RESIDENCE II",
                        th: "RESIDENCE II"
                    },
                    detail: {
                        en: "682 sq.m.​ / start 152 sq.m.",
                        th: "682 ตร.ม. / เริ่มต้น 152 ตร.ว."
                    }
                },
                {
                    name: {
                        en: "RESIDENCE III",
                        th: "RESIDENCE III"
                    },
                    detail: {
                        en: "551 sq.m.​ / start 125 sq.m.",
                        th: "551 ตร.ม. / เริ่มต้น 125 ตร.ว"
                    }
                },
            ]
        }
    ]
}

const project_floorplan = {
    tab: "floorPlan",
    detail: [
        {
            title: {
                en: "Floor Plan",
                th: "แบบแปลน"
            },
            item: [
                {
                    tab: "residenceI",
                    name: {
                        en: "RESIDENCE I",
                        th: "RESIDENCE I"
                    },
                    images: [
                        "/assets/image/page-srin-rachapuek/banner/rachapuek.png",
                        "/assets/image/page-srin-rachapuek/description/floor-plan/Intersection_1.png",
                        "/assets/image/page-srin-rachapuek/description/floor-plan/Intersection_2.png"
                    ],
                    details: [
                        {
                            en: "Usable are : 820 sq.m.",
                            th: "พื้นที่ใช้สอย : 820 ตร.ม."
                        },
                    ],
                    sub_details: [
                        {
                            icon: "/assets/icon/floor-plan/Bedroom.svg",
                            text: {
                                en: "5 Bedrooms",
                                th: "5 ห้องนอน"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/bathroom.svg",
                            text: {
                                en: "6 Bathrooms​",
                                th: "6 ห้องน้ำ​"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/carpark.svg",
                            text: {
                                en: "4 Parking Spaces ",
                                th: "4 ที่จอดรถ​"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/livingroom.svg",
                            text: {
                                en: "1 Living Area",
                                th: "1 ห้องรับแขก"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/kitchen.svg",
                            text: {
                                en: "Food preparation section",
                                th: "ส่วนเตรียมอาหาร​"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/Multipurposeroom.svg",
                            text: {
                                en: "Multi-Purpose Area",
                                th: "พื้นที่อเนกประสงค์​"
                            }
                        },
                    ]
                },
                {
                    tab: "residenceII",
                    name: {
                        en: "RESIDENCE II",
                        th: "RESIDENCE II"
                    },
                    images: [
                        "/assets/image/page-srin-rachapuek/banner/rachapuek.png",
                        "/assets/image/page-srin-rachapuek/description/floor-plan/Intersection_1.png",
                        "/assets/image/page-srin-rachapuek/description/floor-plan/Intersection_2.png"
                    ],
                    details: [
                        {
                            en: "Usable are : 628 sq.m.",
                            th: "พื้นที่ใช้สอย : 628 ตร.ม."
                        },
                    ],
                    sub_details: [
                        {
                            icon: "/assets/icon/floor-plan/Bedroom.svg",
                            text: {
                                en: "5 Bedrooms",
                                th: "5 ห้องนอน"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/bathroom.svg",
                            text: {
                                en: "6 Bathrooms​",
                                th: "6 ห้องน้ำ​"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/carpark.svg",
                            text: {
                                en: "4 Parking Spaces ",
                                th: "4 ที่จอดรถ​"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/livingroom.svg",
                            text: {
                                en: "1 Living Area",
                                th: "1 ห้องรับแขก"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/kitchen.svg",
                            text: {
                                en: "Food preparation section",
                                th: "ส่วนเตรียมอาหาร​"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/Multipurposeroom.svg",
                            text: {
                                en: "Multi-Purpose Area",
                                th: "พื้นที่อเนกประสงค์​"
                            }
                        },
                    ]
                },
                {
                    tab: "residenceIII",
                    name: {
                        en: "RESIDENCE III",
                        th: "RESIDENCE III"
                    },
                    images: [
                        "/assets/image/page-srin-rachapuek/banner/rachapuek.png",
                        "/assets/image/page-srin-rachapuek/description/floor-plan/Intersection_1.png",
                        "/assets/image/page-srin-rachapuek/description/floor-plan/Intersection_2.png"
                    ],
                    details: [
                        {
                            en: "Usable are : 551 sq.m.",
                            th: "พื้นที่ใช้สอย : 551 ตร.ม."
                        },
                    ],
                    sub_details: [
                        {
                            icon: "/assets/icon/floor-plan/Bedroom.svg",
                            text: {
                                en: "5 Bedrooms",
                                th: "5 ห้องนอน"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/bathroom.svg",
                            text: {
                                en: "6 Bathrooms​",
                                th: "6 ห้องน้ำ​"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/carpark.svg",
                            text: {
                                en: "4 Parking Spaces ",
                                th: "4 ที่จอดรถ​"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/livingroom.svg",
                            text: {
                                en: "1 Living Area",
                                th: "1 ห้องรับแขก"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/kitchen.svg",
                            text: {
                                en: "Food preparation section",
                                th: "ส่วนเตรียมอาหาร​"
                            }
                        },
                        {
                            icon: "/assets\/icon\/floor-plan\/Multipurposeroom.svg",
                            text: {
                                en: "Multi-Purpose Area",
                                th: "พื้นที่อเนกประสงค์​"
                            }
                        },
                    ]
                },
            ]
        },
    ]
}

const amenities_details = {
    tab: "Amenities",
    detail: [
        {
            title: {
                en: "Amenities",
                th: "สิ่งอำนวยความสะดวก"
            },
            item: 
            [
                {
                    item_title : "Clubhouse",
                    items: [
                        {
                            name: {
                                en: "1. Residence Lounge",
                                th: "1. Residence Lounge"
                            },
                        },
                        {
                            name: {
                                en: "2. Concierge Services",
                                th: "2. Concierge Services"
                            },
                        },
                        {
                            name: {
                                en: "3. Business Center",
                                th: "3. Business Center"
                            },
                        },
                        {
                            name: {
                                en: "4. Chef Table & Dining Space",
                                th: "4. Chef Table & Dining Space"
                            },
                        },
                        {
                            name: {
                                en: "5. Sunken Court with BBQ Terrac",
                                th: "5. Sunken Court with BBQ Terrac"
                            },
                        },
                        {
                            name: {
                                en: "6. Gym",
                                th: "6. Gym"
                            },
                        },
                        {
                            name: {
                                en: "7. Swimming Pool & Jacuzzi",
                                th: "7. Swimming Pool & Jacuzzi​"
                            },
                        },
                        {
                            name: {
                                en: "8. Sundeck",
                                th: "8. Sundeck"
                            },
                        },
                        {
                            name: {
                                en: "9. Sauna",
                                th: "9. Sauna​"
                            },
                        },
                    ]
                },
                {
                    item_title : "Outdoor Facilities",
                    items: [
                        {
                            name: {
                                en: "1. Children’s Playground",
                                th: "1. Children’s Playground"
                            },
                        },
                        {
                            name: {
                                en: "2. Residence Park",
                                th: "2. Residence Park"
                            },
                        },
                        {
                            name: {
                                en: "3. 1-KM Jogging Track",
                                th: "3. 1-KM Jogging Track"
                            },
                        },
                    ]
                },
            ],
        },
    ]
}
const services_details = {
    tab: "Services",
    detail: [
        {
            title: {
                en: "Services",
                th: "บริการ"
            },
            item: [
                {
                    item_title : "Clubhouse",
                    items: [
                        {
                            name: {
                                en: "1. Concierge service​",
                                th: "1. บริการผู้ช่วยส่วนตัว​"
                            },
                        },
                        {
                            name: {
                                en: "2. 24 hrs. security​",
                                th: "2. ระบบรักษาความปลอดภัย 24 ชม.​"
                            },
                        },
                        {
                            name: {
                                en: "3. Maintenance and repair service​",
                                th: "3. บริการซ่อมบำรุง"
                            },
                        },
                        {
                            name: {
                                en: "4. Garbage management​",
                                th: "4. บริการจัดการขยะ"
                            },
                        },
                    ]
                }
            ]
        }
    ]
}

const ProjectInformationComponent = defineComponent({
    name: 'ProjectInformationComponent',
    template: `<section class="onview" v-html="template" id="ProjectInformationComponent" data-section="project_detail"></section>`,

    setup() {
        const template = ref('');
        const language = ref('th'); // Default language

        // Function to extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };

        const loadTemplate = async (lang) => {
            try {
                const lists = [
                    {
                        tab: "projectDetails",
                        name: {
                            en: "Project Details",
                            th: "รายละเอียดโครงการ"
                        }
                    },
                    {
                        tab: "floorPlan",
                        name: {
                            en: "FloorPlan",
                            th: "ฟลอร์แพลน"
                        }
                    },
                    {
                        tab: "Amenities",
                        name: {
                            en: "Amenities",
                            th: "สิ่งอำนวยความสะดวก"
                        }
                    },
                    {
                        tab: "Services",
                        name: {
                            en: "Services",
                            th: "บริการ"
                        }
                    }
                ]
                const title = {
                    en: "Project Information",
                    th: "ข้อมูลโครงการ"
                }
                const templateResponse = await axios.get('/page/srin/srin-content-page/rachapuek/component/project-information/template.html');
                let templateContent = templateResponse.data;
                // Replace placeholders with actual data
                templateContent = templateContent
                    .replace(/{{mobileDefaultDropdown}}/g, lists[0].name[lang])
                    .replace(/{{title}}/g, title[lang])
                    .replace(/{{#list}}([\s\S]*?){{\/list}}/, (match, div) => {
                        return lists.map((data, i) => {
                            return div
                                .replace(/{{list.active}}/g, i == 0 ? 'font-normal' : "")
                                .replace(/{{list.name}}/g, data.name[lang])
                                .replace(/{{list.tab}}/g, data.tab)
                        }).join("")
                    })
                    .replace(/{{#listM}}([\s\S]*?){{\/listM}}/, (match, div) => {
                        return lists.map((data, i) => {
                            return div
                                .replace(/{{listM.active}}/g, i == 0 ? 'font-normal' : "")
                                .replace(/{{listM.name}}/g, data.name[lang])
                                .replace(/{{listM.tab}}/g, data.tab)
                        }).join("")
                    })
                    .replace(/{{project_details.id}}/g, project_details.tab)
                    .replace(/{{#project_details.details}}([\s\S]*?){{\/project_details.details}}/, (match, div) => {
                        return project_details.detail.map((data, i) => {
                            return div
                                .replace(/{{project_details.details.title}}/g, data.title[lang])
                                .replace(/{{#project_details.details.item}}([\s\S]*?){{\/project_details.details.item}}/, (match, itemDiv) => {
                                    return data.item.map((item, i) => {
                                        return itemDiv
                                            .replace(/{{project_details.details.item.name}}/g, item.name ? item.name[lang] : "")
                                            .replace(/{{project_details.details.item.detail}}/g, item.detail ? item.detail[lang] : "")
                                    }).join("")
                                })
                        }).join("")
                    })
                    .replace(/{{project_floorplan.id}}/g, project_floorplan.tab)
                    .replace(/{{#project_floorplan.details}}([\s\S]*?){{\/project_floorplan.details}}/, (match, div) => {
                        return project_floorplan.detail.map((data, i) => {
                            return div
                                .replace(/{{project_floorplan.details.title}}/g, data.title[lang])
                                .replace(/{{#project_floorplan.details.tabs}}([\s\S]*?){{\/project_floorplan.details.tabs}}/, (match, tabs) => {
                                    return data.item.map((item, i) => {
                                        return tabs
                                            .replace(/{{project_floorplan.details.tabs.name}}/g, item.name ? item.name[lang] : "")
                                            .replace(/{{project_floorplan.details.tabs.id}}/g, item.tab ? item.tab : "")
                                            .replace(/{{project_floorplan.details.tabs.id.active}}/g, i == 0 ? "underline font-bold" : "")
                                    }).join("")
                                })
                                .replace(/{{#project_floorplan.details.tabs.item}}([\s\S]*?){{\/project_floorplan.details.tabs.item}}/, (match, tabs) => {
                                    return data.item.map((item, i) => {
                                        return tabs
                                            .replace(/{{project_floorplan.details.tabs.item.name}}/g, item.name ? item.name[lang] : "")
                                            .replace(/{{project_floorplan.details.tabs.item.id}}/g, item.tab)
                                            .replace(/{{project_floorplan.details.tabs.item.id.active}}/g, i == 0 ? "" : "hidden")
                                            .replace(/{{#project_floorplan.details.tabs.details.item}}([\s\S]*?){{\/project_floorplan.details.tabs.details.item}}/, (match, detailDiv) => {
                                                return item.details.map((detail, i) => {
                                                    return detailDiv
                                                        .replace(/{{project_floorplan.details.tabs.details.item.text}}/g, detail[lang])
                                                }).join("")
                                            })
                                            .replace(/{{#project_floorplan.details.tabs.detailsM.item}}([\s\S]*?){{\/project_floorplan.details.tabs.detailsM.item}}/, (match, detailDiv) => {
                                                return item.details.map((detail, i) => {
                                                    return detailDiv
                                                        .replace(/{{project_floorplan.details.tabs.detailsM.item.text}}/g, detail[lang])
                                                }).join("")
                                            })
                                            .replace(/{{#project_floorplan.details.tabs.sub_details.item}}([\s\S]*?){{\/project_floorplan.details.tabs.sub_details.item}}/, (match, sub_detailsDiv) => {
                                                return item.sub_details.map((sub, i) => {
                                                    return sub_detailsDiv
                                                        .replace(/{{project_floorplan.details.tabs.sub_details.icon}}/g, sub.icon)
                                                        .replace(/{{project_floorplan.details.tabs.sub_details.icon.hidden}}/g, sub.icon ? "" : "hidden")
                                                        .replace(/{{project_floorplan.details.tabs.sub_details.text}}/g, sub.text[lang])
                                                        .replace(/{{project_floorplan.details.tabs.sub_details.type.css}}/g, sub.type == "text" ? "" : "min-w-[48px] min-h-[48px] mr-2 lg:-mr-4")
                                                        .replace(/{{project_floorplan.details.tabs.sub_details.icon.css}}/g, sub.css ? sub.css : "lg:w-1/2 w-full my-2 lg:my-0")
                                                }).join("")
                                            })
                                            .replace(/{{#project_floorplan.details.tabs.sub_detailsM.item}}([\s\S]*?){{\/project_floorplan.details.tabs.sub_detailsM.item}}/, (match, sub_detailsDiv) => {
                                                return item.sub_details.map((sub, i) => {
                                                    return sub_detailsDiv
                                                        .replace(/{{project_floorplan.details.tabs.sub_detailsM.icon}}/g, sub.icon)
                                                        .replace(/{{project_floorplan.details.tabs.sub_detailsM.icon.hidden}}/g, sub.icon ? "" : "hidden")
                                                        .replace(/{{project_floorplan.details.tabs.sub_detailsM.text}}/g, sub.text[lang])
                                                        .replace(/{{project_floorplan.details.tabs.sub_detailsM.type.css}}/g, sub.type == "text" ? "" : "min-w-[48px] min-h-[48px] mr-2 lg:-mr-4")
                                                        .replace(/{{project_floorplan.details.tabs.sub_detailsM.icon.css}}/g, sub.css ? sub.css : "lg:w-1/2 w-full my-2 lg:my-0")
                                                }).join("")
                                            })
                                            .replace(/{{#project_floorplan.details.tabs.images.item}}([\s\S]*?){{\/project_floorplan.details.tabs.images.item}}/, (match, img) => {
                                                return item.images.map((image, i) => {
                                                    return img
                                                        .replace(/{{project_floorplan.details.tabs.images.item.url}}/g, image)
                                                        .replace(/{{project_floorplan.details.tabs.images.item.num}}/g, i)
                                                }).join("")
                                            })
                                            .replace(/{{#project_floorplan.details.tabs.thumbs.item}}([\s\S]*?){{\/project_floorplan.details.tabs.thumbs.item}}/, (match, img) => {
                                                return item.images.map((image, i) => {
                                                    return img
                                                        .replace(/{{project_floorplan.details.tabs.images.item.url}}/g, image)
                                                        .replace(/{{project_floorplan.details.tabs.images.item.num}}/g, i)
                                                }).join("")
                                            })
                                    }).join("")
                                })
                        }).join("")
                    })
                    .replace(/{{#project_floorplan.modal}}([\s\S]*?){{\/project_floorplan.modal}}/, (match, div) => {
                        return project_floorplan.detail.map((data, i) => {
                            return div
                                .replace(/{{#project_floorplan.modal.item}}([\s\S]*?){{\/project_floorplan.modal.item}}/, (match, tabs) => {
                                    return data.item.map((item, i) => {
                                        return tabs
                                            .replace(/{{project_floorplan.modal.item.id}}/g, item.tab)
                                            .replace(/{{project_floorplan.modal.item.active}}/g, i == 0 ? "" : "hidden")
                                            .replace(/{{#project_floorplan.modal.images.item}}([\s\S]*?){{\/project_floorplan.modal.images.item}}/, (match, img) => {
                                                return item.images.map((image, i) => {
                                                    return img
                                                        .replace(/{{project_floorplan.modal.images.item.url}}/g, image)
                                                        .replace(/{{project_floorplan.modal.images.item.num}}/g, i)
                                                }).join("")
                                            })

                                    }).join("")
                                })
                        }).join("")
                    })
                    .replace(/{{amenities_details.id}}/g, amenities_details.tab)
                    .replace(/{{#amenities_details.details}}([\s\S]*?){{\/amenities_details.details}}/, (match, div) => {
                        return amenities_details.detail.map((data) => {
                            return div
                                .replace(/{{amenities_details.details.title}}/g, data.title[lang])
                                .replace(/{{#amenities_details.details.item}}([\s\S]*?){{\/amenities_details.details.item}}/, (match, itemDiv) => {
                                    return data.item.map((item) => {
                                        return itemDiv
                                            .replace(/{{amenities_details.details.item.item_title}}/g, item.item_title)
                                            .replace(/{{#amenities_details.details.item.items}}([\s\S]*?){{\/amenities_details.details.item.items}}/, (match, itemListDiv) => {
                                                return item.items.map((listItem) => {
                                                    return itemListDiv.replace(/{{amenities_details.details.item.items.name}}/g, listItem.name[lang]);
                                                }).join(""); 
                                            });
                                    }).join(""); 
                                });
                        }).join("");
                    })
                    .replace(/{{services_details.id}}/g, services_details.tab)
                    .replace(/{{#services_details.details}}([\s\S]*?){{\/services_details.details}}/, (match, div) => {
                        return services_details.detail.map((data) => {
                            return div
                                .replace(/{{services_details.details.title}}/g, data.title[lang])
                                .replace(/{{#services_details.details.item}}([\s\S]*?){{\/services_details.details.item}}/, (match, itemDiv) => {
                                    return data.item.map((item) => {
                                        return itemDiv
                                            .replace(/{{services_details.details.item.item_title}}/g, item.item_title)
                                            .replace(/{{#services_details.details.item.items}}([\s\S]*?){{\/services_details.details.item.items}}/, (match, itemListDiv) => {
                                                return item.items.map((listItem) => {
                                                    return itemListDiv.replace(/{{services_details.details.item.items.name}}/g, listItem.name[lang]);
                                                }).join("");
                                            });
                                    }).join("");
                                });
                        }).join("");
                    })
                template.value = templateContent;
            } catch (error) {
                console.error('Failed to load template:', error);
            }
        };
        const init = () => {
            AOS.init();
        }
        onMounted(async () => {
            language.value = getLanguageFromPath();
            await loadTemplate(language.value);

            nextTick(() => {
                init();

                const planList = new Swiper(".floor-plan-list", {
                    spaceBetween: 10,
                    slidesPerView: 3,
                    freeMode: true,
                    // Responsive Breakpoints
                    breakpoints: {
                        0: { // Screens 0px and larger (mobile)
                            slidesPerView: 2.2,
                            spaceBetween: 10,
                        },
                        768: { // Screens 768px and larger (tablets)
                            slidesPerView: 2.2,
                            spaceBetween: 15,
                        },
                        1024: { // Screens 1024px and larger (desktops)
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    },
                });
                let thumbsSwiper = []
                let mainSwiper = []
                let bigimageSwiper = []
                project_floorplan.detail.map((data) => {
                    data.item.map((item, i) => {
                        thumbsSwiper[i] = new Swiper(`#${item.tab} .thumbs-container`, {
                            spaceBetween: 10,
                            slidesPerView: 3,
                            freeMode: true,
                            watchSlidesProgress: true,
                            breakpoints: {
                                0: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 15,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                            },
                        });
                        mainSwiper[i] = new Swiper(`#${item.tab} .main-container`, {
                            spaceBetween: 10,
                            navigation: {
                                nextEl: `#info #${item.tab} .next`,
                                prevEl: `#info #${item.tab} .prev`,
                            },
                            thumbs: {
                                swiper: thumbsSwiper[i],
                            },
                        });
                        bigimageSwiper[i] = new Swiper(`#${item.tab}-modal .floorplan-image-swiper`, {
                            slidesPerView: 1,
                            spaceBetween: 10,
                            loop: true,
                            navigation: {
                                nextEl: `#${item.tab}-modal .floorplan-image-next`,
                                prevEl: `#${item.tab}-modal .floorplan-image-prev`,
                            },
                        });
                    })
                })
            });
        });

        return { template, language };
    }
});
function toggleFloorPlantList(id, el) {
    const listItems = document.querySelectorAll('.floor-plan-list .swiper-slide button');
    const sectionItems = document.querySelectorAll('.plan-item');
    listItems.forEach((item) => {
        item.classList.remove('underline');
        item.classList.remove('font-bold');
    });
    el.classList.add('underline');
    el.classList.add('font-bold');

    sectionItems.forEach((item, i) => {
        item.classList.add('hidden');
    });
    document.querySelector(`#${id}`).classList.remove('hidden');
}
function toggleDiv(sectionId, element) {
    // Find all `li` elements within the same parent container
    const listItems = element.parentNode.querySelectorAll('li');

    // Remove 'active' class and reset 'font-light' for all items
    listItems.forEach((item) => {
        item.classList.remove('active');
        const header = item.querySelector('h3');
        if (header) {
            header.classList.remove('font-normal');
            header.classList.add('font-light');
        }
    });

    // Add 'active' class and apply 'font-normal' to the clicked element
    element.classList.add('active');
    const activeHeader = element.querySelector('h3');
    if (activeHeader) {
        activeHeader.classList.remove('font-light');
        activeHeader.classList.add('font-normal');
    }

    // Toggle visibility of sections (using Tailwind's 'hidden' and 'block' utilities)
    const sections = document.querySelectorAll('.section'); // Adjust selector as needed
    sections.forEach((section) => {
        if (section.id === sectionId) {
            section.classList.remove('hidden');
            section.classList.add('block');
        } else {
            section.classList.remove('block');
            section.classList.add('hidden');
        }
    });
    const expBtnText = document.querySelector('#expand-button p')
    expBtnText.innerHTML = element.textContent

    const expDiv = document.querySelector('.expand-div');
    if (expDiv) {
        expDiv.classList.add('hidden')
    }
}
function toggleExpand() {
    const div = document.querySelector('.expand-div');
    div.classList.remove('hidden');
}
function openBigImage(id) {
    // Show modal
    document.querySelector('.show-image-modal').classList.remove('hidden');

    // Hide all modal-div elements
    const modalDivs = document.querySelectorAll('.show-image-modal .modal-div');
    modalDivs.forEach((item) => {
        item.classList.add('hidden');
    });

    // Show the target modal
    document.getElementById(`${id}-modal`).classList.remove('hidden');

    // Get active slide index
    const activeSlide = document.querySelector(`#${id} .swiper-slide-active`);
    const activeIndex = parseInt(activeSlide?.dataset['item'], 10);

    // Initialize or retrieve Swiper instance
    let swiperInstance;

    swiperInstance = new Swiper(`#${id}-modal .floorplan-image-swiper`, {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: `#${id}-modal .floorplan-image-next`,
            prevEl: `#${id}-modal .floorplan-image-prev`,
        },
    });

    // Navigate to the active slide
    if (!isNaN(activeIndex)) {
        setTimeout(() => {
            swiperInstance.slideTo(activeIndex);
        }, 100); // Delay to ensure Swiper is initialized before sliding
    } else {
        console.error('Active slide index could not be determined.');
    }
}

function closeMaximizeModal() {
    document.querySelector('.show-image-modal').classList.add('hidden');

}