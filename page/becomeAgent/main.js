
// Create and mount the Vue app
createApp({
    components: {
        HeaderComponent,
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
                    "en": "BECOME A PARTNER AGENTS <br class=\"is-mobile\" /> WITH SINGHA ESTATE PCL.",
                    "th": "สมัครเป็นตัวแทนขายกับบริษัท สิงห์ เอสเตท จำกัด (มหาชน)"
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
                    "th": "โอกาสดีรอคุณอยู่ เพียงสมัครเป็นตัวแทนขายกับบริษัท <br /> สิงห์ เอสเตท จำกัด (มหาชน)"
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
                        "th": "ผลตอบแทนมีอัตราสูงที่คุณพอใจและระบบการจ่ายที่รวดเร็วภายใน 30 วันหลังจากออกใขแจ้งหนี้<br/><br/><br/>"
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
            font: getLanguageFromPath() == 'en' ? "font-['Cinzel']" : "!font-['IBMPlexSansThai']",
            "banner_section": {
                "title": getLanguageFromPath() == 'en' ? dataset.banner_section.header_text['en'] : dataset.banner_section.header_text['th'],
                "detail": getLanguageFromPath() == 'en' ? dataset.banner_section.subheader_text['en'] : dataset.banner_section.subheader_text['th'],
                "button_text": getLanguageFromPath() == 'en' ? dataset.banner_section.button_text['en'] : dataset.banner_section.button_text['th']
            },
            "opportunity_section": {
                "title": getLanguageFromPath() == 'en' ? dataset.opportunity_section.header_text['en'] : dataset.opportunity_section.header_text['th'],
                "card_list": [
                    {
                        l: '/assets/image/becomeAgent/1.png',
                        title: getLanguageFromPath() == 'en' ? dataset.opportunity_section['card_beyond'].header_text['en'] : dataset.opportunity_section['card_beyond'].header_text['th'],
                        detail: getLanguageFromPath() == 'en' ? dataset.opportunity_section['card_beyond'].subheader_text['en'] : dataset.opportunity_section['card_beyond'].subheader_text['th']
                    },
                    {
                        l: '/assets/image/becomeAgent/2.png',
                        title: getLanguageFromPath() == 'en' ? dataset.opportunity_section['card_topclass'].header_text['en'] : dataset.opportunity_section['card_topclass'].header_text['th'],
                        detail: getLanguageFromPath() == 'en' ? dataset.opportunity_section['card_topclass'].subheader_text['en'] : dataset.opportunity_section['card_topclass'].subheader_text['th']
                    },
                    {
                        l: '/assets/image/becomeAgent/3.png',
                        title: getLanguageFromPath() == 'en' ? dataset.opportunity_section['card_location'].header_text['en'] : dataset.opportunity_section['card_location'].header_text['th'],
                        detail: getLanguageFromPath() == 'en' ? dataset.opportunity_section['card_location'].subheader_text['en'] : dataset.opportunity_section['card_location'].subheader_text['th']
                    },
                    {
                        l: '/assets/image/becomeAgent/4.png',
                        title: getLanguageFromPath() == 'en' ? dataset.opportunity_section['card_admirable'].header_text['en'] : dataset.opportunity_section['card_admirable'].header_text['th'],
                        detail: getLanguageFromPath() == 'en' ? dataset.opportunity_section['card_admirable'].subheader_text['en'] : dataset.opportunity_section['card_admirable'].subheader_text['th']
                    },
                    {
                        l: '/assets/image/becomeAgent/5.png',
                        title: getLanguageFromPath() == 'en' ? dataset.opportunity_section['card_customer'].header_text['en'] : dataset.opportunity_section['card_customer'].header_text['th'],
                        detail: getLanguageFromPath() == 'en' ? dataset.opportunity_section['card_customer'].subheader_text['en'] : dataset.opportunity_section['card_customer'].subheader_text['th']
                    }
                ]
            },
            "success_section": {
                "title": getLanguageFromPath() == 'en' ? dataset.success_section.header_text['en'] : dataset.success_section.header_text['th'],
                "card_list": [
                    {
                        l: "/assets/image/becomeAgent/Image 362.png",
                        title: getLanguageFromPath() == 'en' ? dataset.success_section['block_support'].header_text['en'] : dataset.success_section['block_support'].header_text['th'],
                        detail: getLanguageFromPath() == 'en' ? dataset.success_section['block_support'].subheader_text['en'] : dataset.success_section['block_support'].subheader_text['th']
                    },
                    {
                        l: "/assets/image/becomeAgent/Image 363.png",
                        title: getLanguageFromPath() == 'en' ? dataset.success_section['block_tool'].header_text['en'] : dataset.success_section['block_tool'].header_text['th'],
                        detail: getLanguageFromPath() == 'en' ? dataset.success_section['block_tool'].subheader_text['en'] : dataset.success_section['block_tool'].subheader_text['th']
                    },
                    {
                        l: "/assets/image/becomeAgent/Image 362.png",
                        title: getLanguageFromPath() == 'en' ? dataset.success_section['block_sale'].header_text['en'] : dataset.success_section['block_sale'].header_text['th'],
                        detail: getLanguageFromPath() == 'en' ? dataset.success_section['block_sale'].subheader_text['en'] : dataset.success_section['block_sale'].subheader_text['th']
                    },
                    {
                        l: "/assets/image/becomeAgent/Image 364.png",
                        title: getLanguageFromPath() == 'en' ? dataset.success_section['block_commission'].header_text['en'] : dataset.success_section['block_commission'].header_text['th'],
                        detail: getLanguageFromPath() == 'en' ? dataset.success_section['block_commission'].subheader_text['en'] : dataset.success_section['block_commission'].subheader_text['th']
                    }
                ]
            },
            "form_section": {
                "header_text": getLanguageFromPath() == 'en' ? dataset.form_section.header_text['en'] : dataset.form_section.header_text['th'],
                "section_text1": getLanguageFromPath() == 'en' ? dataset.form_section.section_text1['en'] : dataset.form_section.section_text1['th'],
                "section_text2": getLanguageFromPath() == 'en' ? dataset.form_section.section_text2['en'] : dataset.form_section.section_text2['th']
            },
            "portfolio_section": {
                "header_text": getLanguageFromPath() == 'en' ? dataset.portfolio_section.header_text['en'] : dataset.portfolio_section.header_text['th']
            }

        };
    },
}).mount('#app');
