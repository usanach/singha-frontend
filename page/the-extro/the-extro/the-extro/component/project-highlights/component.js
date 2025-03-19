const ProjectsHighlightComponent = defineComponent({
    name: 'ProjectsHighlightComponent',
    template: `
      <section class="onview" id="ProjectsHighlightComponent" data-section="project_signature">
        <div class="relative">
          <div class="w-full lg:h-full bg-[url('/assets/image/page-the-extro/the-extro/project-signature/bg.png')] bg-cover bg-top pt-10 pb-20">
            <div class="container mx-auto lg:px-5 px-0 space-y-10">
              <div>
                <h2 class="text-[#013B5E] text-[50px] lg:text-[70px] text-center" data-aos="fade-up"
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
                      <p class="text-[80px] italic leading-none font-light project-number opacity-75">
                        {{ (index + 1).toString().padStart(2, '0') }}
                      </p>
                    </div>
                    <div>
                      <h2 class="text-[40px] font-light project-title">
                        {{ project.title[language] }}
                      </h2>
                    </div>
                    <div>
                      <p class="project-description">
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
      });
      const projects = ref([
        {
          image: '/assets/image/page-the-extro/the-extro/project-signature/_DSC7457.png',
          title: { en: "Extra Space", th: "Extra Space" },
          description: {
            en: "A comfortable living space with a wide designed room and floor-to-ceiling curtain wall glass, letting you fully enjoy the view.",
            th: "ให้การอยู่อาศัยสบายยิ่งกว่ากับรูปแบบห้องดีไซน์หน้ากว้างพิเศษ และกระจกแบบ Curtain Wall ที่สูงจากพื้นจรดฝ้า ให้คุณสัมผัสวิวได้อย่างเต็มที่"
          }
        },
        {
          image: '/assets/image/page-the-extro/the-extro/project-signature/DJI_0042-Enhanced-NR.png',
          title: { en: "Extra Time", th: "Extra Time" },
          description: {
            en: "Experience modern living with open spaces and contemporary design elements that enhance your lifestyle.",
            th: "ให้ชีวิตมีเวลามากกว่า กับการเดินทางที่สะดวกทุกรูปแบบ ไม่ว่าจะขับรถยนต์ส่วนตัว หรือเลือกโดยสารรถไฟฟ้า BTS / MRT / ARL แถมเซฟเวลาได้อีกเยอะ "
          }
        },
        {
          image: '/assets/image/page-the-extro/the-extro/project-signature/PANO0001-Enhanced-NR Panorama Retouch (1).png',
          title: { en: "Extra Nature", th: "Extra Nature" },
          description: {
            en: "Experience modern living with open spaces and contemporary design elements that enhance your lifestyle.",
            th: "พบกับ Facilities และพื้นที่ส่วนกลางจัดเต็ม ไม่ว่าจะแบบ Relax หรือ Active Lifestyle อาทิ Tripple Floor Fitness, Sky Swimming Pool & Hydro Spa, Garden Court, Co-Social Club & Co-Working Space นอกจากนี้ ยังพร้อม"
          }
        },
        {
          image: '/assets/image/page-the-extro/the-extro/project-signature/_DSC-1.png',
          title: { en: "Extra Lifestyle", th: "Extra Lifestyle" },
          description: {
            en: "Experience modern living with open spaces and contemporary design elements that enhance your lifestyle.",
            th: "พบกับ Facilities และพื้นที่ส่วนกลางจัดเต็ม ไม่ว่าจะแบบ Relax หรือ Active Lifestyle อาทิ Tripple Floor Fitness, Sky Swimming Pool & Hydro Spa, Garden Court, Co-Social Club & Co-Working Space นอกจากนี้ ยังพร้อม"
          }
        },
        {
          image: '/assets/image/page-the-extro/the-extro/project-signature/_01A1215.png',
          title: { en: "Extra Value", th: "Extra Value" },
          description: {
            en: "Experience modern living with open spaces and contemporary design elements that enhance your lifestyle.",
            th: "พบกับ Facilities และพื้นที่ส่วนกลางจัดเต็ม ไม่ว่าจะแบบ Relax หรือ Active Lifestyle อาทิ Tripple Floor Fitness, Sky Swimming Pool & Hydro Spa, Garden Court, Co-Social Club & Co-Working Space นอกจากนี้ ยังพร้อม"
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
  
      return { language, title, projects };
    }
  });
  