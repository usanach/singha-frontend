const ProjectsHighlightComponent = defineComponent({
    name: 'ProjectsHighlightComponent',
    template: `
      <section class="onview" id="ProjectsHighlightComponent" data-section="project_signature">
        <div class="relative">
          <div class="w-full lg:h-full bg-[url('/assets/image/page-shawn-panya/description/bg.png')] bg-cover bg-top pt-10 pb-20">
            <div class="container mx-auto lg:px-5 px-0 space-y-10 py-10">
              <div>
                <h2 class="text-[#3D2120] text-[40px] font-bold text-center" data-aos="fade-up" :class="[fontCss()]"
                    data-aos-duration="500" data-aos-easing="linear">
                  {{ title[language] }}
                </h2>
              </div>
              <div class="mx-auto space-y-10">
                <div v-for="(project, index) in projects" :key="index" class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                  <!-- Image container -->
                  <div :class="['order-1', 'lg:col-span-2', index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1']">
                    <img class="object-cover project-image" :src="project.image" />
                  </div>
                  <!-- Details container -->
                  <div class="px-5 md:px-0 text-[#54457B] space-y-2" :class="['order-2', index % 2 !== 0 ? 'lg:order-1 lg:text-right' : 'lg:order-2']">
                    <div>
                      <p class="text-[80px] leading-none font-light project-number font-['Tenor_Sans'] font-normal">
                        {{ (index + 1).toString().padStart(2, '0') }}
                      </p>
                    </div>
                    <div>
                      <h2 class="text-[30px] font-light project-title font-['Gotham'] leading-none font-normal" v-html="project.title[language]"></h2>
                    </div>
                    <div>
                      <p class="project-description font-normal text-[#2C2C2C]" v-html="project.description[language]"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    setup() {
        const language = ref('th'); // Default language
        const title = ref({
            en: "PROJECT SIGNATURES",
            th: "จุดเด่นของโครงการ"
        });
        const projects = ref([
            {
                image: "/assets/image/page-shawn-panya/description/panya-1.png",
                title: {
                    en: "PROVISION FOR <br/>FUTURE EXPANSION",
                    th: "PROVISION FOR <br/>FUTURE EXPANSION"
                },
                description: {
                    en: "A home that grows with your family, featuring expandable spaces to suit every stage of life and needs. ​",
                    th: "บ้านที่เติบโตพร้อมกับสมาชิกในครอบครัว <br/>ปรับขยายพื้นที่ได้ตามไลฟ์สไตล์ทุกช่วงชีวิต​"
                }
            },
            {
                image: "/assets/image/page-shawn-panya/description/panya-2.png",
                title: {
                    en: "SPACE FOR <br/>MULTI-GENERATION",
                    th: "SPACE FOR <br/>MULTI-GENERATION"
                },
                description: {
                    en: "Designed for a perfect balance of family time with private retreats and communal spaces for everyone. Every corner of the house ensures happiness for all generations.",
                    th: "การออกแบบพื้นที่ทุกมุมในบ้าน <br/>จัดสรรพื้นที่ส่วนตัวและส่วนกลางอย่างลงตัว <br/>เพื่อความสุขของทุกวัย ไม่ว่าจะเป็นเด็กเล็กหรือผู้สูงอายุ​"
                }
            },
            {
                image: "/assets/image/page-shawn-panya/description/panya-3.png",
                title: {
                    en: "MAXIMIZE<br/>GREEN SPACE",
                    th: "MAXIMIZE<br/>GREEN SPACE"
                },
                description: {
                    en: "Enhanced natural connectivity offers freshness to your everyday life through expansive green spaces starting from 101 sq.wah.​​",
                    th: "เพิ่มความใกล้ชิดธรรมชาติ ให้คุณสัมผัสความสดชื่นด้วยพื้นที่สีเขียวที่กว้างขวางบนที่ดินเริ่มต้น 101 ตร.ว.​"
                }
            },
            {
                image: "/assets/image/page-shawn-panya/description/panya-4.png",
                title: {
                    en: "FENGSHUI",
                    th: "FENGSHUI"
                },
                description: {
                    en: "Designed with the auspicious Feng Shui principles to bring tranquility and prosperity.​",
                    th: "ใช้หลักฮวงจุ้ยมงคลประสานเข้ากับการออกแบบ <br/>เพิ่มความสงบสบาย และความเป็นสิริมงคลให้แก่ผู้อยู่อาศัย"
                }
            }
        ]);

        // Extract language from URL (defaults to 'th')
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        const init = () => {
            AOS.init();
        };

        const fontCss = () => {
            return getLanguageFromPath() == 'en' ? "font-['Gotham']" : ''
        }
        onMounted(() => {
            language.value = getLanguageFromPath();
            nextTick(() => {
                init();

                // Register ScrollTrigger (assumes gsap is loaded globally)
                gsap.registerPlugin(ScrollTrigger);

                // Animate each project image with scrolling (scrub makes it tied to scroll progress)
                gsap.utils.toArray('.project-image').forEach(elem => {
                    gsap.from(elem, {
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 90%",
                            end: "50% 60%",
                            scrub: true,
                            // markers: true,
                        },
                        opacity: 0,
                        y: 50,
                        ease: "none"
                    });
                });

                // Animate each project number
                gsap.utils.toArray('.project-number').forEach(elem => {
                    gsap.from(elem, {
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 90%",
                            end: "50% 60%",
                            scrub: true,
                            // markers: true,
                        },
                        opacity: 0,
                        x: -50,
                        ease: "none"
                    });
                });

                // Animate each project title
                gsap.utils.toArray('.project-title').forEach(elem => {
                    gsap.from(elem, {
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 90%",
                            end: "50% 60%",
                            scrub: true,
                            // markers: true,
                        },
                        opacity: 0,
                        y: 50,
                        ease: "none"
                    });
                });

                // Animate each project description
                gsap.utils.toArray('.project-description').forEach(elem => {
                    gsap.from(elem, {
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 90%",
                            end: "50% 60%",
                            scrub: true,
                            // markers: true,
                        },
                        opacity: 0,
                        y: 50,
                        ease: "none"
                    });
                });
            });
        });

        return { language, title, projects,fontCss };
    }
});
