const ProjectsHighlightComponent = defineComponent({
    name: 'ProjectsHighlightComponent',
    template: `
      <section class="onview" id="project_signature" data-section="project_signature">
        <div class="relative">
          <div class="w-full lg:h-full bg-[url('/assets/image/page-shawn-wongwaen/description/bg.webp')] bg-cover bg-top pt-10 pb-20">
            <div class="container mx-auto lg:px-5 px-0 space-y-10 py-10">
              <div>
                <h2 class="text-[#3D2120] text-[35px] font-bold text-center" data-aos="fade-up" :class="[fontCss()]"
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
                  <div class="px-5 md:px-0 text-[#54457B] space-y-3" :class="['order-2', index % 2 !== 0 ? 'lg:order-1 lg:text-right' : 'lg:order-2']">
                    <div>
                      <p class="text-[70px] leading-none font-light project-number font-['Tenor_Sans'] font-normal">
                        {{ (index + 1).toString().padStart(2, '0') }}
                      </p>
                    </div>
                    <div>
                      <h2 class="text-[35px] font-light project-title leading-none font-normal font-['Gotham']" v-html="project.title[language]"></h2>
                    </div>
                    <div>
                      <p class="project-description font-normal text-[#2C2C2C] text-[16px]" v-html="project.description[language]"></p>
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
                image: "/assets/image/page-shawn-wongwaen/description/wongwaen-1.webp",
                title: {
                    en: "PROVISION FOR <br/>FUTURE EXPANSION",
                    th: "PROVISION FOR <br/>FUTURE EXPANSION"
                },
                description: {
                    en: "Your house adapts to your family's needs, providing flexible space for every stage of life.​",
                    th: "บ้านที่เติบโตพร้อมกับสมาชิกในครอบครัว ปรับขยายพื้นที่ได้ตามไลฟ์สไตล์ทุกช่วงชีวิต​"
                }
            },
            {
                image: "/assets/image/page-shawn-wongwaen/description/wongwaen-2.webp",
                title: {
                    en: "SPACE FOR <br/>MULTI-GENERATION",
                    th: "SPACE FOR <br/>MULTI-GENERATION"
                },
                description: {
                    en: "Well-planned private and shared spaces designed for harmonious living and the happiness of all generations.",
                    th: "การออกแบบพื้นที่ทุกมุมในบ้าน จัดสรรพื้นที่ส่วนตัวและส่วนกลางอย่างลงตัว เพื่อความสุขของทุกวัย ไม่ว่าจะเป็นเด็กเล็กหรือผู้สูงอายุ​​"
                }
            },
            {
                image: "/assets/image/page-shawn-wongwaen/description/wongwaen-3.webp",
                title: {
                    en: "MAXIMIZE<br/>GREEN SPACE",
                    th: "MAXIMIZE<br/>GREEN SPACE"
                },
                description: {
                    en: "Our signature L-Shaped Residence (Residence I) features a spacious backyard that gracefully envelops the house, offering a serene atmosphere and refreshing green space from every angle.​",
                    th: "เราเพิ่มพื้นที่สีเขียวให้คุณสัมผัสความสดชื่นได้จากทุกมุมภายในบ้าน ภายใต้การออกแบบพิเศษที่โดดเด่นด้วย L-Shaped residence (Residence I) มาพร้อมกับสนามหลังบ้าน (Backyard) ขนาดใหญ่โอบล้อมตัวบ้าน​​"
                }
            },
            {
                image: "/assets/image/page-shawn-wongwaen/description/wongwaen-4.webp",
                title: {
                    en: "FENGSHUI",
                    th: "FENGSHUI"
                },
                description: {
                    en: "Designed with the auspicious Feng Shui principles to enhance tranquility, well-being and lasting prosperity while ensuring investment growth.​​",
                    th: "ใช้หลักฮวงจุ้ยมงคลประสานเข้ากับการออกแบบ เพิ่มความสงบสบาย และความเป็นสิริมงคลให้แก่ผู้อยู่อาศัย เสริมสร้างพลังบวกให้กับชีวิตและการลงทุนที่งอกเงยตามกาลเวลา"
                }
            }
        ]);

        // Extract language from URL (defaults to 'th')
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'en';
        };

        const init = () => {
            AOS.init();
        };

        const fontCss = () => {
            return getLanguageFromPath() == 'en' ? "font-['Gotham']" : " font-['IBM_Plex_Sans_Thai']"
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
