
// Create and mount the Vue app
createApp({
    components: {
        HeaderComponent,
        FooterComponent,
    },

    data() {
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th'; // Default to 'th' if not found
        };
        const dataset = {
            "banner_section": {
                "header_text": {
                    "en": "BECOME A PARTNER AGENTS <br/> WITH SINGHA ESTATE PCL.",
                    "th": "สมัครเป็นตัวแทนขายกับ<br/>บริษัท สิงห์ เอสเตท จำกัด (มหาชน)"
                },
                "subheader_text": {
                    "en": "We are committed to providing extensive business opportunities <br /> to our select agent partners and substantial support along the way.",
                    "th": "เราเปิดรับสมัครตัวแทนขายที่ผ่านการคัดเลือก <br/> และพร้อมสนับสนุนการขายอย่างเต็มที่"
                },
                "button_text": {
                    "en": "Register now",
                    "th": "ลงทะเบียน"
                }
            },
            "opportunity_section": {
                "header_text": {
                    "en": "A GREAT OPPARTUNITY AWAITS TOU TO PARTNER <br /> WITH SINGHA ESTATE PUBLIC COMPANY LIMITED",
                    "th": "โอกาสดีรอคุณอยู่  <span class='text-nowrap'>เพียงสมัครเป็นตัวแทนขายกับ</span> <span class='text-nowrap'>บริษัท สิงห์ เอสเตท จำกัด</span> (มหาชน)"
                },
                "card_beyond": {
                    "header_text": {
                        "en": "Beyond Satisfaction Services",
                        "th": "บริการที่เหนือความคาดหมาย"
                    },
                    "subheader_text": {
                        "en": "We deliver exceptional service with attension to every detail.",
                        "th": "เราส่งมอบบริการที่ดีและใส่ใจทุกรายละเอียด"
                    }
                },
                "card_topclass": {
                    "header_text": {
                        "en": "Top Class Finishes",
                        "th": "งานตกแต่งวัสดุพรีเมียม"
                    },
                    "subheader_text": {
                        "en": "We select only the finest quality materials.",
                        "th": "เราเจาะจงและเลือกใช้วัสดุคุณภาพสูงเท่านั้น"
                    }
                },
                "card_location": {
                    "header_text": {
                        "en": "Great Locations",
                        "th": "ทำเลที่ตั้งศักยภาพ"
                    },
                    "subheader_text": {
                        "en": "We purse only the most sought-after locations with enduring value.",
                        "th": "เราแสวงหาเฉพาะทำเลโครงการที่โดดเด่นและมีมูลค่าเพิ่มสูงขึ้นทุกปี"
                    }
                },
                "card_admirable": {
                    "header_text": {
                        "en": "Trusted Reputation",
                        "th": "ชื่อเสียงอันน่าเชื่อถือ"
                    },
                    "subheader_text": {
                        "en": "We coonsistently strive to create projects of the highest caliber.",
                        "th": "เรามุ่งมั่นสร้างสรรค์โครงการคุณภาพเสมอ"
                    }
                },
                "card_customer": {
                    "header_text": {
                        "en": "Client Satisfaction",
                        "th": "ความพึงพอใจสูงสุดของลูกค้า"
                    },
                    "subheader_text": {
                        "en": "We offer prompt and personalized service that exceeds expectations.",
                        "th": "เราพร้อมให้บริการที่มากกว่าด้วยความรวดเร็ว"
                    }
                }
            },
            "success_section": {
                "header_text": {
                    "en": "ENSURE YOUR SUCCESS BY APPLYING TO OUR AGENT PARTNERSHIP PROGRAM",
                    "th": "รับประกันความสำเร็จของคุณเพียงสมัครร่วมโครงการกับเรา"
                },
                "block_support": {
                    "header_text": {
                        "en": "Dedicated Agent Support Team",
                        "th": "ทีมสนับสนุนตัวแทนเฉพาะกิจ"
                    },
                    "subheader_text": {
                        "en": "Multilingual support team available to assist you and address all client inquiries.",
                        "th": "ทีมงานที่สื่อสารได้หลายภาษา ทั้งอังกฤษ ไทย และจีน พร้อมให้บริการช่วยเหลือและตอบคำถามลูกค้า <br/><br/><br/>"
                    }
                },
                "block_tool": {
                    "header_text": {
                        "en": "Agent Tool Kit",
                        "th": "เครื่องมือส่งเสริมการขาย"
                    },
                    "subheader_text": {
                        "en": "Stramlined project presentation with perfessional online marketing materials including e-brochures, project information, photos, & location maps.",
                        "th": "เครื่องมือจำเป็นที่ช่วยนำเสนอโครงการของเราให้โดดเด่นด้วยสื่อการตลาดออนไลน์ที่ออกแบบสวยงามและมีประสิทธิภาพ เช่น E-brochure ข้อมูลโครงการ รูปภาพ และแผนที่ เป็นต้น"
                    }
                },
                "block_sale": {
                    "header_text": {
                        "en": "Fabulous Sales",
                        "th": "งานขายที่โดดเด่น"
                    },
                    "subheader_text": {
                        "en": "Delivering spaces designed to exceed your client's desires.",
                        "th": "เราออกแบบแกลเลอรีแต่ละโครงการให้น่าประทับใจ พร้อมเพิ่มตัวเลือกที่หลากหลาย เพื่อให้ครอบคลุมและตอบโจทย์ทุกความต้องการของลูกค้า<br/><br/>"
                    }
                },
                "block_commission": {
                    "header_text": {
                        "en": "High Commissions",
                        "th": "ค่าคอมมิชชั่น"
                    },
                    "subheader_text": {
                        "en": "Prompt commission payments within 30 days of invoice date.",
                        "th": "ผลตอบแทนมีอัตราสูงที่คุณพอใจและระบบการจ่ายที่รวดเร็วภายใน 30 วันหลังจากออกใบแจ้งหนี้<br/><br/><br/>"
                    }
                }
            },
            "form_section": {
                "header_text": {
                    "en": "TO BECOME <br /> OUR AGENT PARTNER",
                    "th": "สมัครเป็นตัวแทนขายโครงการ"
                },
                "section_text1": {
                    "en": "Join our team as an agent for Singha Estate Public Company Limited, a leading property developer in Thailand.",
                    "th": "ขอเชิญท่านเป็นตัวแทนขายของบริษัท สิงห์ เอสเตท จำกัด (มหาชน) บริษัทพัฒนาอสังหาริมทรัพย์ชั้นนำของประเทศไทย"
                },
                "section_text2": {
                    "en": "Benefit from exclusive access to prime properties and exceptional support. Elevate your business today by completing the form below. Our agent support team will contact you shortly.",
                    "th": "เรายังมีโครงการคุณภาพอีกมากในทำเลศักยภาพที่หาได้ยาก ตรงกำความต้องการของลูกค้าคนสำคัญ หากต้องการข้อมูลเพิ่มเติมเกี่ยวกับโปรแกรมตัวแทนของเรา โปรดกรอกแบบฟอร์มด้านล่าง ทีมสนับสนุนตัวแทนของเราจะติดต่อกลับไปในไม่ช้า"
                },
                "input_text": {
                    "firstName": {
                        "en": "First Name *",
                        "th": "ชื่อ *"
                    },
                    "lastName": {
                        "en": "Last Name *",
                        "th": "นามสกุล *​"
                    },
                    "company": {
                        "en": "Company *",
                        "th": "บริษัท *"
                    },
                    "mobile": {
                        "en": "Mobile *",
                        "th": "เบอร์โทรศัพท์ *"
                    },
                    "email": {
                        "en": "Email *",
                        "th": "อีเมล *​"
                    },
                    "contactTime": {
                        "en": "Contact Time *",
                        "th": "เวลาที่ติดต่อได้​ *"
                    },
                    "detail": {
                        "en": "Detail",
                        "th": "เพิ่มเติม"
                    },
                    "terms": {
                        "en": "I agree to receive more information about products, services, and marketing news of Singha Estate Group of Companies and our business partner, and acknowledge the terms and purposes of data usage in the <a class='notice-bold' href='https://www.singhaestate.co.th/en/privacy-notice' target='_blank'>Privacy Notice.​</a>",
                        "th": "ท่านตกลงรับข้อมูลเกี่ยวกับผลิตภัณฑ์, บริการ และข่าวสารกิจกรรมของกลุ่มธุรกิจบริษัทในเครือสิงห์ เอสเตท และพันธมิตรของบริษัทฯ และรับทราบข้อกำหนด และวัตถุประสงค์การใช้ข้อมูลที่ระบุไว้ใน <a class='notice-bold' href='https://www.singhaestate.co.th/th/privacy-notice' target='_blank'>นโยบายความเป็นส่วนตัว</a>​"
                    },
                    "placeholder":{
                        "en":"Acceptable for corporate agents only",
                        "th":" รับสมัครตัวแทนอสังหาริมทรัพย์เฉพาะนิติบุคคล​"
                    }
                }
            },
            "portfolio_section": {
                "header_text": {
                    "en": "OUR PORTFOLIO OF LUXURY DEVERLOPMENTS",
                    "th": "ผลงานโครงการที่เราภาคภูมิใจ"
                }
            }
        }

        return {
            lang: getLanguageFromPath(),
            font: getLanguageFromPath() == 'en' ? "font-['SinghaEstate']" : "!font-['SinghaEstate']",
            "banner_section": {
                "title": dataset.banner_section.header_text[getLanguageFromPath()],
                "detail": dataset.banner_section.subheader_text[getLanguageFromPath()],
                "button_text": dataset.banner_section.button_text[getLanguageFromPath()]
            },
            "opportunity_section": {
                "title": dataset.opportunity_section.header_text[getLanguageFromPath()],
                "card_list": [
                    {
                        l: '/assets/image/becomeAgent/1.png',
                        title: dataset.opportunity_section['card_beyond'].header_text[getLanguageFromPath()],
                        detail: dataset.opportunity_section['card_beyond'].subheader_text[getLanguageFromPath()]
                    },
                    {
                        l: '/assets/image/becomeAgent/2.png',
                        title: dataset.opportunity_section['card_topclass'].header_text[getLanguageFromPath()],
                        detail: dataset.opportunity_section['card_topclass'].subheader_text[getLanguageFromPath()]
                    },
                    {
                        l: '/assets/image/becomeAgent/new/Great-location.png',
                        title: dataset.opportunity_section['card_location'].header_text[getLanguageFromPath()],
                        detail: dataset.opportunity_section['card_location'].subheader_text[getLanguageFromPath()]
                    },
                    {
                        l: '/assets/image/becomeAgent/new/Admirable-reputation.png',
                        title: dataset.opportunity_section['card_admirable'].header_text[getLanguageFromPath()],
                        detail: dataset.opportunity_section['card_admirable'].subheader_text[getLanguageFromPath()]
                    },
                    {
                        l: '/assets/image/becomeAgent/new/High-customer.png',
                        title: dataset.opportunity_section['card_customer'].header_text[getLanguageFromPath()],
                        detail: dataset.opportunity_section['card_customer'].subheader_text[getLanguageFromPath()]
                    }
                ]
            },
            "success_section": {
                "title": dataset.success_section.header_text[getLanguageFromPath()],
                "card_list": [
                    {
                        l: "/assets/image-new/icons/hand.svg",
                        title: dataset.success_section['block_support'].header_text[getLanguageFromPath()],
                        detail: dataset.success_section['block_support'].subheader_text[getLanguageFromPath()]
                    },
                    {
                        l: "/assets/image-new/icons/Tool.svg",
                        title: dataset.success_section['block_tool'].header_text[getLanguageFromPath()],
                        detail: dataset.success_section['block_tool'].subheader_text[getLanguageFromPath()]
                    },
                    {
                        l: "/assets/image-new/icons/Building.svg",
                        title: dataset.success_section['block_sale'].header_text[getLanguageFromPath()],
                        detail: dataset.success_section['block_sale'].subheader_text[getLanguageFromPath()]
                    },
                    {
                        l: "/assets/image-new/icons/Money.svg",
                        title: dataset.success_section['block_commission'].header_text[getLanguageFromPath()],
                        detail: dataset.success_section['block_commission'].subheader_text[getLanguageFromPath()]
                    }
                ]
            },
            "form_section": {
                "header_text": dataset.form_section.header_text[getLanguageFromPath()],
                "section_text1": dataset.form_section.section_text1[getLanguageFromPath()],
                "section_text2": dataset.form_section.section_text2[getLanguageFromPath()],
                "input_text": {
                    "firstName": dataset.form_section.input_text.firstName[getLanguageFromPath()],
                    "lastName": dataset.form_section.input_text.lastName[getLanguageFromPath()],
                    "company": dataset.form_section.input_text.company[getLanguageFromPath()],
                    "mobile": dataset.form_section.input_text.mobile[getLanguageFromPath()],
                    "email": dataset.form_section.input_text.email[getLanguageFromPath()],
                    "contactTime": dataset.form_section.input_text.contactTime[getLanguageFromPath()],
                    "detail": dataset.form_section.input_text.detail[getLanguageFromPath()],
                    "terms": dataset.form_section.input_text.terms[getLanguageFromPath()],
                    "submit": {
                        "text": {
                            "en": "submit",
                            "th": "ลงทะเบียน"
                        }
                    },
                    "placeholder":{
                        "en":"Acceptable for corporate agents only",
                        "th":" รับสมัครตัวแทนอสังหาริมทรัพย์เฉพาะนิติบุคคล​"
                    }
                }
            },
            "portfolio_section": {
                "header_text": dataset.portfolio_section.header_text[getLanguageFromPath()]
            }

        };
    },
    mounted() {
        // runs after the component is mounted AND the DOM is updated
        nextTick(() => {
            document.querySelector('.become-agent-main').classList.remove('opacity-0')
        })
    },
}).mount('#app');
