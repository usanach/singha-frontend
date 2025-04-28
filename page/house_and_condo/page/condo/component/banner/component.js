const BannerComponent = defineComponent({
    name: 'BannerComponent',
    props: {
        dataset: {
            type: Array,
            default: () => []
        }
    },
    template: `
      <section class="banner onview" :class="[fontCss()]" data-section="property_introduction" data-aos="fade-in" data-aos-duration="1000" data-aos-easing="linear">
        <div class="relative overflow-hidden lg:h-screen h-[800px] pt-16">
          <div class="swiper mySwiper h-full">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(slide, index) in slides" :key="index">
                <!-- Desktop Slide -->
                <div class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center lg:block hidden"
                  :style="{ backgroundImage: 'url(' + slide.image.l + ')' }">
                  <div class="absolute top-0 left-0 flex w-full h-full hover:bg-[#00000030] transition-all">
                    <div class="m-auto mt-48 pt-5 flex justify-center flex-col gap-5" :class="slide.theme.text.css">
                      <div class="m-auto">
                        <img :src="slide.image.logo" alt="" data-aos="fade-up" data-aos-duration="100" data-aos-easing="linear">
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Mobile Slide -->
                <div class="h-full w-full overflow-hidden bg-cover bg-no-repeat bg-center lg:hidden block"
                  :style="{ backgroundImage: 'url(' + slide.image.s + ')' }">
                  <div class="absolute top-0 left-0 flex w-full h-full bg-[#00000030]">
                    <div class="m-auto mt-28 pt-5 flex justify-center flex-col" :class="slide.theme.text.css">
                      <div class="m-auto">
                        <img :src="slide.image.logo" alt="" class="w-[150px]">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Pagination and Navigation -->
            <div class="absolute bottom-0 w-full z-10 my-5">
              <div class="container">
                <div class="flex lg:justify-center justify-center gap-5">
                  <div class="flex gap-5">
                    <div class="lg:w-[300px] w-[150px] relative h-[2px] my-auto overflow-hidden">
                      <div class="hero-progress-bar h-full"></div>
                    </div>
                    <div class="flex text-white leading-0 md:text-[14px] text-[11px]">
                      <div class="page-number leading-tight my-auto whitespace-nowrap"></div>
                    </div>
                  </div>
                  <div class="flex gap-5">
                    <span class="prev w-[30px]">
                      <img src="/assets/image/residential/Button-Icon.png" alt="prev icon" class="rotate-180">
                    </span>
                    <span class="next w-[30px]">
                      <img src="/assets/image/residential/Button-Icon.png" alt="next icon">
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    setup(props) {
        const language = ref('th'); // Default language

        // Extract language from the URL
        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        // Default slide data in case no dataset is provided via props
        const defaultSlides = [{
            title: {
                en: "รวมแบรนด์โครงการคอนโดมิเนียม<br/>จาก Singha Estate",
                th: "รวมแบรนด์โครงการคอนโดมิเนียม<br/>จาก Singha Estate"
            },
            theme: {
                text: {
                    css: ""
                }
            },
            font: {
                en: "font-['Gotham']",
                th: "font-['IBM_Plex_Sans_Thai']"
            },
            description: {
                en: "สัมผัสประสบการณ์การอยู่อาศัยแบบพรีเมียม <br/>บนทำเลแห่งศักยภาพใจกลางเมือง",
                th: "สัมผัสประสบการณ์การอยู่อาศัยแบบพรีเมียม <br/>บนทำเลแห่งศักยภาพใจกลางเมือง",
            },
            image: {
                l: "/assets/image/page-condo/banner/condo.png",
                s:  "/assets/image/page-condo/banner/condo-m.png",
                logo: ""
            },
        },];

        // Use the provided dataset if available; otherwise, fallback to defaultSlides.
        const slides = ref(props.dataset && props.dataset.length ? props.dataset : defaultSlides);

        const init = () => {
            AOS.init();
            const heroBannerSwiper = new Swiper(".banner .mySwiper", {
                autoplay: {
                    delay: 10000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: ".banner .mySwiper .hero-progress-bar",
                    type: "progressbar"
                },
                navigation: {
                    nextEl: ".mySwiper .next",
                    prevEl: ".mySwiper .prev"
                }
            });
            const heroBannerPagingSwiper = new Swiper(".banner .mySwiper", {
                pagination: {
                    el: ".banner .mySwiper .page-number",
                    type: "fraction"
                }
            });
            heroBannerSwiper.controller.control = heroBannerPagingSwiper;
        };

        onMounted(() => {
            language.value = getLanguageFromPath();
            nextTick(() => {
                init(); // Initialize AOS and Swiper after the DOM is updated
            });
        });

        const fontCss = () => {
            return getLanguageFromPath() == 'en' ? "font-['Gotham']" : ''
        }
        return {
            language,
            slides,
            fontCss
        };
    }
});
