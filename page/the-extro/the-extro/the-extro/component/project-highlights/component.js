const ProjectsHighlightComponent = defineComponent({
  name: 'ProjectsHighlightComponent',
  template: `
      <section class="onview font-['IBM_Plex_Sans_Thai']" id="project_signature" data-section="project_signature">
        <div class="relative">
          <div class="w-full lg:h-full bg-[url('/assets/image/page-the-extro/the-extro/project-signature/bg.webp')] bg-cover bg-top pt-10 pb-20">
            <div class="container mx-auto lg:px-5 px-0 space-y-10 py-10">
              <div>
                <h2 class="text-[#3D2120] text-[35px] text-center font-bold" data-aos="fade-up" :class="[fontCss()]"
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
                  <div class="px-5 md:px-0 text-[#244C5A]" :class="['order-2', index % 2 !== 0 ? 'lg:order-1 lg:text-right' : 'lg:order-2']">
                    <div>
                      <p class="text-[70px] italic leading-none font-light project-number opacity-75">
                        {{ (index + 1).toString().padStart(2, '0') }}
                      </p>
                    </div>
                    <div>
                      <h2 class="text-[35px] project-title  font-['Gotham'] font-normal">
                        {{ project.title[language] }}
                      </h2>
                    </div>
                    <div>
                      <p class="project-description font-normal mt-3">
                        {{ project.description[language] }}
                      </p>
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
    });const projects = ref([
      {
        image: '/assets/image/page-the-extro/the-extro/project-signature/_DSC7457.webp',
        title: { en: "Extra Space", th: "Extra Space" },
        description: {
          en: "Extra-wide room designs with floor-to-ceiling windows, maximizing natural light and panoramic views. Enjoy a sense of openness, space, and tranquility.",
          th: "ห้องดีไซน์หน้ากว้างพิเศษ และผนังกระจกที่สูงจากพื้นจรดเพดาน ให้คุณรับแสงธรรมชาติและได้วิวมุมสูงอย่างเต็มที่ เพิ่มความรู้สึกโปร่ง โล่งสบาย และผ่อนคลาย"
        }
      },
      {
        image: '/assets/image/page-the-extro/the-extro/project-signature/DJI_0042-Enhanced-NR.webp',
        title: { en: "Extra Time", th: "Extra Time" },
        description: {
          en: "Convenient, rapid connections to all major routes—by car, BTS, Airport Rail Link and expressway. Enjoy the ease of city living near everything you need; attractions, dining, and more.",
          th: "การเดินทางที่สะดวกรวดเร็วเชื่อมต่อทุกเส้นทาง รถยนต์ส่วนตัว รถไฟฟ้า ทางด่วน อยู่ในแหล่งท่องเที่ยว ร้านอาหารยอดนิยม สำนักงาน สถาบันการศึกษา และโรงพยาบาลชั้นนำ"
        }
      },
      {
        image: '/assets/image/page-the-extro/the-extro/project-signature/PANO0001-Enhanced-NR Panorama Retouch (1).webp',
        title: { en: "Extra Nature", th: "Extra Nature" },
        description: {
          en: "Reside next to a public park, making a true retreat for daily rejuvenation.",
          th: "คอนโดติดสวนสาธารณะในพื้นที่กว่า 20 ไร่ ทำให้ทุกวันคือการพักผ่อนอย่างแท้จริง"
        }
      },
      {
        image: '/assets/image/page-the-extro/the-extro/project-signature/_DSC-1.webp',
        title: { en: "Extra Lifestyle", th: "Extra Lifestyle" },
        description: {
          en: "Facilities catering to all lifestyle needs from fitness and relaxation to social engagement, including fitness, swimming, hydro spa, gardens, co-social club and co-working space. Enhanced by state-of-the-art Home Automation and S-Life Smart Application.",
          th: "ตอบโจทย์ไลฟ์สไตล์ทุกรูปแบบ ทั้งการออกกำลังกายและการพักผ่อน อาทิ ฟิตเนส สระว่ายน้ำ ไฮโดรสปา สวนหย่อม Co-social club และ Co-working space พร้อมด้วยนวัตกรรมเทคโนโลยีที่ครบครันจาก Home Automation และ S-Life Smart Application"
        }
      },
      {
        image: '/assets/image/page-the-extro/the-extro/project-signature/_01A1215.webp',
        title: { en: "Extra Value", th: "Extra Value" },
        description: {
          en: "Invest with confidence in a prime location, exceptional project features, and long-term value appreciation.",
          th: "มั่นใจได้ในทำเลที่ตั้งคุณภาพ จุดเด่นของโครงการและผลตอบแทนที่เพิ่มมูลค่าตามกาลเวลา"
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

    const fontCss = () => {
      return getLanguageFromPath() == "en" ? "" : ""
    }
    return { language, title, projects,fontCss };
  }
});
