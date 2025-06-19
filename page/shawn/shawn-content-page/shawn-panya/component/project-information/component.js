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
            en: "Project area:",
            th: "ขนาดโครงการ:"
          },
          detail: {
            en: "Approximately 35 rai",
            th: "ประมาณ 35 ไร่"
          }
        },
        {
          name: {
            en: "Project type:",
            th: "ประเภทโครงการ:"
          },
          detail: {
            en: "2-Storey detached house",
            th: "บ้านเดี่ยว 2 ชั้น"
          }
        },
        {
          name: {
            en: "Number of unit:",
            th: "จำนวนยูนิต:"
          },
          detail: {
            en: "72 Units",
            th: "72 ยูนิต"
          }
        },
        {
          name: {
            en: "Usable area:",
            th: "พื้นที่ใช้สอย:"
          },
          detail: {
            en: "335-474 sq.m.",
            th: "335-474 ตร.ม."
          }
        },
        {
          name: {
            en: "Land Area:",
            th: "ขนาดที่ดิน:"
          },
          detail: {
            en: "Starts 101 sq.wah",
            th: "เริ่มต้น 101 ตร.ว."
          }
        }
      ]
    },
    {
      title: {
        en: "House Types and Sizes",
        th: "ประเภทและขนาดบ้าน"
      },
      item: [
        {
          name: {
            en: "THE RESIDENCE I",
            th: "THE RESIDENCE I"
          },
          detail: {
            en: "474 sq.m.",
            th: "474 ตร.ม."
          }
        },
        {
          name: {
            en: "THE RESIDENCE II",
            th: "THE RESIDENCE II"
          },
          detail: {
            en: "392 sq.m.",
            th: "392 ตร.ม."
          }
        },
        {
          name: {
            en: "THE RESIDENCE III",
            th: "THE RESIDENCE III"
          },
          detail: {
            en: "335 sq.m.",
            th: "335 ตร.ม."
          }
        }
      ]
    }
  ]
};

const project_floorplan = {
  tab: "floorPlan",
  detail: [
    {
      title: {
        en: "Floor Plan",
        th: "ฟลอร์แพลน"
      },
      item: [
        {
          tab: "residenceI",
          name: {
            en: "THE RESIDENCE I",
            th: "THE RESIDENCE I"
          },
          images: [
            "/assets\/image\/page-shawn-panya\/description\/floor-plan\/panya-floorplan/residence-01.jpg",
            "/assets\/image\/page-shawn-panya\/description\/floor-plan\/panya-floorplan/residence-01-plan-01.jpg",
            "/assets\/image\/page-shawn-panya\/description\/floor-plan\/panya-floorplan/residence-01-plan-02.jpg",
          ],
          details: [
            {
              en: "Usable area 474 sq.m.",
              th: "พื้นที่ใช้สอย 474 ตร.ม."
            }
          ],
          sub_details: [
            {
              icon: "/assets\/icon\/floor-plan\/bedroom.png",
              text: {
                en: "5 Bedrooms",
                th: "5 ห้องนอน"
              }
            },
            {
              icon: "/assets\/icon\/floor-plan\/bathroom.png",
              text: {
                en: "6 Bathrooms",
                th: "6 ห้องน้ำ"
              }
            },
            {
              icon: "/assets\/icon\/floor-plan\/parking_spaces.png",
              text: {
                en: "4-car parking",
                th: "ที่จอดรถ 4 คัน"
              }
            },
            {
              icon: "/assets\/icon\/floor-plan\/multi-purpose_area.png",
              text: {
                en: "1 Multipurpose area",
                th: "1 พื้นที่อเนกประสงค์"
              }
            },
            {
              icon: "/assets\/icon\/floor-plan\/kitchen.png",
              text: {
                en: "1 Kitchen",
                th: "1 ห้องครัว"
              }
            },
            {
              icon: "/assets/icon/floor-plan/rest_room.png",
              text: {
                en: "2 Living rooms",
                th: "2 ห้องพักผ่อน"
              }
            },
            {
              icon: "/assets/icon/floor-plan/living_area.png",
              text: {
                en: "1 Parlor room",
                th: "1 ห้องรับแขก"
              }
            },
            {
              icon: "/assets/icon/floor-plan/dinning_area.png",
              text: {
                en: "1 Dining area",
                th: "1 ส่วนรับประทานอาหาร"
              }
            },
            {
              icon: "/assets/icon/floor-plan/maid_room.png",
              text: {
                en: "1 Maid’s room",
                th: "1 ห้องแม่บ้าน"
              }
            }
          ]
        },
        {
          tab: "residenceII",
          name: {
            en: "THE RESIDENCE II",
            th: "THE RESIDENCE II"
          },
          images: [
            "/assets\/image\/page-shawn-panya\/description\/floor-plan\/panya-floorplan/residence-02.jpg",
            "/assets\/image\/page-shawn-panya\/description\/floor-plan\/panya-floorplan/residence-02-plan-01.jpg",
            "/assets\/image\/page-shawn-panya\/description\/floor-plan\/panya-floorplan/residence-02-plan-02.jpg",
          ],
          details: [
            {
              en: "Usable area 388 sq.m.",
              th: "พื้นที่ใช้สอย 388 ตร.ม."
            }
          ],
          sub_details: [
            {
              icon: "/assets/icon/floor-plan/bedroom.png",
              text: {
                en: "4 Bedrooms",
                th: "4 ห้องนอน"
              }
            },
            {
              icon: "/assets/icon/floor-plan/bathroom.png",
              text: {
                en: "5 Bathrooms",
                th: "5 ห้องน้ำ"
              }
            },
            {
              icon: "/assets/icon/floor-plan/parking_spaces.png",
              text: {
                en: "4-car parking",
                th: "ที่จอดรถ 4 คัน"
              }
            },
            {
              icon: "/assets\/icon\/floor-plan\/multi-purpose_area.png",
              text: {
                en: "1 Multipurpose area",
                th: "1 พื้นที่อเนกประสงค์"
              }
            },
            {
              icon: "/assets/icon/floor-plan/kitchen.png",
              text: {
                en: "1 Kitchen",
                th: "1 ห้องครัว"
              }
            },
            {
              icon: "/assets/icon/floor-plan/rest_room.png",
              text: {
                en: "2 Living rooms",
                th: "2 ห้องพักผ่อน"
              }
            },
            {
              icon: "/assets/icon/floor-plan/living_area.png",
              text: {
                en: "1 Parlor room",
                th: "1 ห้องรับแขก"
              }
            },
            {
              icon: "/assets/icon/floor-plan/dinning_area.png",
              text: {
                en: "1 Dining area",
                th: "1 ส่วนรับประทานอาหาร"
              }
            },
            {
              icon: "/assets/icon/floor-plan/maid_room.png",
              text: {
                en: "1 Maid’s room",
                th: "1 ห้องแม่บ้าน"
              }
            }
          ]
        },
        {
          tab: "residenceIII",
          name: {
            en: "THE RESIDENCE III",
            th: "THE RESIDENCE III"
          },
          images: [
            "/assets\/image\/page-shawn-panya\/description\/floor-plan\/panya-floorplan/residence-03.jpg",
            "/assets\/image\/page-shawn-panya\/description\/floor-plan\/panya-floorplan/residence-03-plan-01.jpg",
            "/assets\/image\/page-shawn-panya\/description\/floor-plan\/panya-floorplan/residence-03-plan-02.jpg",
          ],
          details: [
            {
              en: "Usable area 335 sq.m.",
              th: "พื้นที่ใช้สอย 335 ตร.ม."
            }
          ],
          sub_details: [
            {
              icon: "/assets/icon/floor-plan/bedroom.png",
              text: {
                en: "4 Bedrooms",
                th: "4 ห้องนอน"
              }
            },
            {
              icon: "/assets/icon/floor-plan/bathroom.png",
              text: {
                en: "5 Bathrooms",
                th: "5 ห้องน้ำ"
              }
            },
            {
              icon: "/assets/icon/floor-plan/parking_spaces.png",
              text: {
                en: "3-car parking",
                th: "ที่จอดรถ 3 คัน"
              }
            },
            {
              icon: "/assets/icon/floor-plan/multi-purpose_area.png",
              text: {
                en: "1 Multipurpose area",
                th: "1 พื้นที่อเนกประสงค์"
              }
            },
            {
              icon: "/assets/icon/floor-plan/kitchen.png",
              text: {
                en: "1 Kitchen",
                th: "1 ห้องครัว"
              }
            },
            {
              icon: "/assets/icon/floor-plan/rest_room.png",
              text: {
                en: "2 Living rooms",
                th: "2 ห้องพักผ่อน"
              }
            },
            {
              icon: "/assets/icon/floor-plan/living_area.png",
              text: {
                en: "1 Parlor room",
                th: "1 ห้องรับแขก"
              }
            },
            {
              icon: "/assets/icon/floor-plan/dinning_area.png",
              text: {
                en: "1 Dining area",
                th: "1 ส่วนรับประทานอาหาร"
              }
            },
            {
              icon: "/assets/icon/floor-plan/maid_room.png",
              text: {
                en: "1 Maid’s room",
                th: "1 ห้องแม่บ้าน"
              }
            }
          ]
        }
      ]
    }
  ]
};
const amenities_details = {
  tab: "Amenities",
  detail: [
    {
      title: {
        en: "Amenities",
        th: "สิ่งอำนวยความสะดวก"
      },
      image: "/assets/image/page-shawn-panya/description/_VPX6258-Enhanced-NR.jpg",
      item: [
        {
          item_title: "Clubhouse",
          items: [
            {
              name: {
                en: "Clubhouse / Leisure lounge",
                th: "คลับเฮาส์"
              }
            },
            {
              name: {
                en: "Business Lounge",
                th: "ห้องรับรองธุรกิจ หรือ ห้องประชุม"
              }
            },
            {
              name: {
                en: "S Gym",
                th: "S ยิม หรือ ฟิตเนส"
              }
            },
            {
              name: {
                en: "Swimming pool & Kid’s pool",
                th: "สระว่ายน้ำและสระเด็ก"
              }
            },
            {
              name: {
                en: "Game room",
                th: "ห้องสันทนาการ"
              }
            },
          ]
        },
        {
          item_title: "Outdoor Facilities",
          items: [
            {
              name: {
                en: "Community parks (Leisure parks)",
                th: "สวนสาธารณะและสวนหย่อม"
              }
            },
            {
              name: {
                en: "Children’s playground",
                th: "สนามเด็กเล่น"
              }
            },
            {
              name: {
                en: "Pet zone / Pet potty",
                th: "โซนสัตว์เลี้ยง หรือ โซนขับถ่ายสำหรับสัตว์เลี้ยง"
              }
            },
          ]
        }
      ]
    }
  ]
};

const services_details = {
  tab: "Services",
  detail: [
    {
      title: {
        en: "Services",
        th: "บริการ"
      },
      image: "/assets/image/page-shawn-panya/description/Maingate.jpg",
      item: [
        {
          item_title: "",
          items: [
            {
              name: {
                en: "Concierge service",
                th: "บริการผู้ช่วยส่วนตัว"
              }
            },
            {
              name: {
                en: "24 hrs. security",
                th: "ระบบรักษาความปลอดภัย 24 ชม."
              }
            },
            {
              name: {
                en: "Maintenance and repair service",
                th: "บริการซ่อมบำรุง"
              }
            },
            {
              name: {
                en: "Garbage management",
                th: "บริการจัดการขยะ"
              }
            }
          ]
        }
      ]
    }
  ]
};

const ProjectInformationComponent = defineComponent({
  name: 'ProjectInformationComponent',
  template: `<section class="onview" :class="[fontCss()]" v-html="template" id="project_detail" data-section="project_detail"></section>`,

  setup() {
    const template = ref('');
    const language = ref('th'); // Default language

    // Function to extract language from the URL
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : 'th'; // Default to 'th' if not found
    };

    const showFirst = () => {
      let line = document.querySelectorAll('.line');
      line.forEach((li, index) => {
        if (index !== 0) {
          li.remove();
        }
      });
      console.log(line)
    }


    const fontCss = () => {
      return getLanguageFromPath() == 'en' ? "" : ''
    }
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
              en: "Floor Plan",
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
        const templateResponse = await axios.get('/page\/shawn\/shawn-content-page\/shawn-panya\/component\/project-information\/template.html');
        let templateContent = templateResponse.data;
        // Replace placeholders with actual data
        templateContent = templateContent
          .replace(/{{brochure}}/g, lang == 'th' ? 'ดาวน์โหลดโบรชัวร์' : 'Download Brochure')
          .replace(/{{mobileDefaultDropdown}}/g, lists[0].name[lang])
          .replace(/{{title}}/g, title[lang])
          .replace(/{{#list}}([\s\S]*?){{\/list}}/, (match, div) => {
            return lists.map((data, i) => {
              return div
                .replace(/{{list.active}}/g, i == 0 ? 'font-bold' : "font-thin")
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
                            .replace(/{{project_floorplan.details.tabs.sub_details.type.css}}/g, sub.type == "text" ? "" : "min-w-[48px]")
                            .replace(/{{project_floorplan.details.tabs.sub_details.icon.css}}/g, sub.css ? sub.css : "lg:w-1/2 w-full")
                        }).join("")
                      })
                      .replace(/{{#project_floorplan.details.tabs.sub_detailsM.item}}([\s\S]*?){{\/project_floorplan.details.tabs.sub_detailsM.item}}/, (match, sub_detailsDiv) => {
                        return item.sub_details.map((sub, i) => {
                          return sub_detailsDiv
                            .replace(/{{project_floorplan.details.tabs.sub_detailsM.icon}}/g, sub.icon)
                            .replace(/{{project_floorplan.details.tabs.sub_detailsM.icon.hidden}}/g, sub.icon ? "" : "hidden")
                            .replace(/{{project_floorplan.details.tabs.sub_detailsM.text}}/g, sub.text[lang])
                            .replace(/{{project_floorplan.details.tabs.sub_detailsM.type.css}}/g, sub.type == "text" ? "" : "w-[35px]")
                            .replace(/{{project_floorplan.details.tabs.sub_detailsM.icon.css}}/g, sub.css ? sub.css : "lg:w-1/2 w-full gap-5")
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
                .replace(/{{amenities_details.details.image}}/g, data.image)
                .replace(/{{amenities_details.details.title}}/g, data.title[lang])
                .replace(/{{#amenities_details.details.item}}([\s\S]*?){{\/amenities_details.details.item}}/, (match, itemDiv) => {
                  return data.item.map((item) => {
                    return itemDiv
                      .replace(/{{amenities_details.details.item.item_title}}/g, item.item_title)
                      .replace(/{{#amenities_details.details.item.items}}([\s\S]*?){{\/amenities_details.details.item.items}}/, (match, itemListDiv) => {
                        return item.items.map((listItem, i) => {
                          return itemListDiv
                            .replace(/{{amenities_details.details.item.items.name}}/g, (i + 1) + ". " + listItem.name[lang]);
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
                .replace(/{{services_details.details.image}}/g, data.image)
                .replace(/{{services_details.details.title}}/g, data.title[lang])
                .replace(/{{#services_details.details.item}}([\s\S]*?){{\/services_details.details.item}}/, (match, itemDiv) => {
                  return data.item.map((item) => {
                    return itemDiv
                      .replace(/{{services_details.details.item.item_title}}/g, item.item_title)
                      .replace(/{{#services_details.details.item.items}}([\s\S]*?){{\/services_details.details.item.items}}/, (match, itemListDiv) => {
                        return item.items.map((listItem, i) => {
                          return itemListDiv.replace(/{{services_details.details.item.items.name}}/g, (i + 1) + ". " + listItem.name[lang]);
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

      showFirst();

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
              spaceBetween: 10,
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

    return { template, language, showFirst, fontCss };
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
    const line = item.querySelector('.line');
    if (line) line.remove();
    const header = item.querySelector('h3');
    if (header) {
      header.classList.remove('font-bold');
      header.classList.add('font-thin');
    }
  });

  // Add 'active' class and apply 'font-normal' to the clicked element
  element.classList.add('active');
  const activeHeader = element.querySelector('h3');
  if (activeHeader) {
    activeHeader.classList.remove('font-thin');
    activeHeader.classList.add('font-bold');
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