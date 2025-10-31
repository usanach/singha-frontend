
const { createApp, defineComponent, ref, onMounted, onUnmounted, nextTick, watch, computed,onBeforeUnmount  } = Vue;
const axios = window.axios; // Assuming axios is available globally, or you can import axios in a module-based setup
const RECAPTCHA_KEY = "6LevUS0nAAAAAInOUaytl6bgNgWFE4FQt2yofWyZ"

const HeaderComponent = defineComponent({
    name: 'HeaderComponent',

    template: `
    <header class="w-full fixed top-0 left-0 z-[9999]" :class="singhaFonts" >
      <!-- Modal Overlay -->
      <div v-if="isSubModalOpen||isMainModalOpen" class="fixed h-screen inset-0 bg-black bg-opacity-50" @click="closeAllModal"></div>
      <div class="bg [background-image:radial-gradient(circle,_rgba(255,255,255,1)_0%,_rgba(255,255,255,1)_100%)] py-2 relative z-50 flex transition-all">
        <div class="absolute inset-0  flex items-center justify-center">
            <div class="text-center">
                <p class="uppercase text-[#1a2f4d]  text-[15px]">Residential</p>
            </div>
        </div>
        <div class="flex container mx-auto justify-between relative my-auto">
          <div>
            <a :href="'/' + language" target="_blank">
              <img aria-hidden="true" class="w-[125px] md:block hidden" src="/assets/image/page-smyth-home/header/logo.webp" />
              <img aria-hidden="true" class="w-[15px] md:hidden" src="/assets/image/residential/logo-mobile-header.svg" />
            </a>
          </div>
          <div class="my-auto flex gap-3  relative ml-auto">
            <div>
                <button type="button" class="lg:flex hidden h-full" @click="toggleSubModal">
                    <div class="my-auto">
                        <p class="uppercase text-[#1a2f4d] leading-tight text-[15px]" :class="singhaFonts">
                        {{ headerData?.swipeSub?.title[language] }}
                        </p>
                    </div>
                    <div class="my-auto ml-2">
                        <svg
                        :class="[isSubModalOpen ? 'rotate-180' : '']"
                        class="transition-all duration-3000 w-[20px]"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.57757 6.91009C3.90301 6.58466 4.43065 6.58466 4.75609 6.91009L10.0002 12.1542L15.2442 6.91009C15.5697 6.58466 16.0973 6.58466 16.4228 6.91009C16.7482 7.23553 16.7482 7.76317 16.4228 8.0886L10.5894 13.9219C10.264 14.2474 9.73634 14.2474 9.41091 13.9219L3.57757 8.0886C3.25214 7.76317 3.25214 7.23553 3.57757 6.91009Z"
                            fill="#1a2f4d"
                        />
                        </svg>
                    </div>
                </button>
            </div>
            <div>
                <span class="text-[#1a2f4d] xl:block hidden opacity-[50%]">|</span>
            </div>
            <div class="relative px-2" ref="langRef">
                <button type="button" class="lg:flex hidden h-full" @click="toggleLanguage">
                    <div class="my-auto flex gap-2">
                        <svg class="w-[20px] my-auto" width="20" height="20" viewBox="0 0 20 20" fill="#1a2f4d" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_3558_4163)">
                                <path d="M10.165 0.00213162C10.1384 0.00118423 10.1119 0 10.0851 0C10.0759 0 10.0667 0.000473707 10.0574 0.000710538C10.0383 0.000473707 10.0193 0 10.0001 0C4.4861 0 0 4.48587 0 9.99988C0 15.5139 4.4861 20 10.0001 20C10.0193 20 10.0383 19.9995 10.0574 19.9993C10.0667 19.9995 10.0759 20 10.0851 20C10.1119 20 10.1384 19.9988 10.165 19.9979C15.6032 19.9095 20 15.4589 20 9.99988C20 4.54105 15.6032 0.0904752 10.165 0.00213162ZM17.3279 6.36358H14.3415C14.1501 5.21133 13.8666 4.14931 13.5007 3.23413C13.3889 2.95466 13.27 2.69247 13.1452 2.44709C14.9647 3.20761 16.4528 4.60713 17.3279 6.36358ZM18.182 9.99988C18.182 10.6247 18.1112 11.2331 17.978 11.8181H14.5606C14.6068 11.2244 14.6307 10.6164 14.6307 9.99988C14.6307 9.38361 14.6068 8.77562 14.5606 8.18185H17.978C18.1112 8.76686 18.182 9.37532 18.182 9.99988ZM10.1171 18.1803C10.1003 18.1805 10.0837 18.1808 10.0671 18.181C9.52903 18.163 8.86041 17.3468 8.35806 16.0906C8.07006 15.3708 7.84032 14.5284 7.67382 13.6243H12.4967C12.3302 14.5284 12.1005 15.3708 11.8125 16.0906C11.3141 17.3364 10.6526 18.1493 10.1171 18.1803ZM7.43389 11.8181C7.38415 11.2279 7.35786 10.6197 7.35786 9.99988C7.35786 9.38029 7.38415 8.77207 7.43389 8.18185H12.7366C12.7864 8.77207 12.8124 9.38029 12.8124 9.99988C12.8124 10.6197 12.7864 11.2279 12.7366 11.8181H7.43389ZM1.81827 9.99988C1.81827 9.37532 1.88885 8.75454 2.02219 8.16977H5.61018C5.56399 8.76355 5.53983 9.38361 5.53983 9.99988C5.53983 10.6164 5.56399 11.2244 5.61018 11.8181H2.02219C1.88885 11.2331 1.81827 10.6247 1.81827 9.99988ZM10.0671 1.81898C10.0837 1.81922 10.1003 1.81945 10.1171 1.81969C10.6526 1.85072 11.3141 2.66357 11.8125 3.90938C12.1005 4.62916 12.3302 5.45954 12.4967 6.36358H7.67382C7.84032 5.45954 8.07006 4.62916 8.35806 3.90938C8.86041 2.65315 9.52903 1.83698 10.0671 1.81898ZM7.06962 2.36112C6.92846 2.63089 6.79488 2.92173 6.66982 3.23413C6.3039 4.14931 6.02063 5.21133 5.82902 6.36358H2.67234C3.58159 4.53868 5.15259 3.09913 7.06962 2.36112ZM2.6721 13.6364H5.82902C6.02039 14.7887 6.3039 15.8507 6.66982 16.7659C6.79488 17.0783 6.92846 17.3691 7.06962 17.6389C5.15259 16.9009 3.58159 15.4616 2.6721 13.6364ZM13.1452 17.5529C13.27 17.3075 13.3889 17.0453 13.5007 16.7659C13.8666 15.8507 14.1499 14.7766 14.3415 13.6243H17.3279C16.4528 15.3808 14.9647 16.7924 13.1452 17.5529Z" fill="#1a2f4d"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_3558_4163">
                                    <rect width="20" height="20" fill="#1a2f4d"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                        <p class="uppercase text-[#1a2f4d] text-[15px] my-auto">{{language}}</p>
                        <svg class="my-auto transition-all duration-500 w-[20px]" width="20" height="20" viewBox="0 0 20 20" fill="#1a2f4d" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.57757 6.91009C3.90301 6.58466 4.43065 6.58466 4.75609 6.91009L10.0002 12.1542L15.2442 6.91009C15.5697 6.58466 16.0973 6.58466 16.4228 6.91009C16.7482 7.23553 16.7482 7.76317 16.4228 8.0886L10.5894 13.9219C10.264 14.2474 9.73634 14.2474 9.41091 13.9219L3.57757 8.0886C3.25214 7.76317 3.25214 7.23553 3.57757 6.91009Z" fill="#1a2f4d"></path>
                        </svg>
                    </div>
                </button>
                <div v-show="isSelectLanguage" class="absolute top-100 mt-2 left-0 w-full h-fit gap-2 bg-[#1A2F4D] p-2 z-[60] text-center space-y-2">
                    <div class="uppercase text-white text-center hover:bg-[#162842] text-[15px] pt-1 leading-none flex">
                        <a :href="'/th'+path" class="mx-auto">th</a>
                    </div>
                    <div class="uppercase text-white text-center hover:bg-[#162842] text-[15px] pt-1 leading-none flex">
                        <a :href="'/en'+path" class="mx-auto">en</a>
                    </div>
                </div>
            </div>
            <div class="flex">
                <button type="button" class="my-auto" @click="toggleMainModal">
                    <div class="relative" :class=[!isMainModalOpen?'scale-x-150':'']>
                        <transition
                            enter-active-class="transition-all duration-200 ease-out"
                            enter-from-class="opacity-0"
                            enter-to-class="opacity-100"
                            leave-active-class="transition-all duration-200 ease-in"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                        >
                            <svg  class=" w-[20px]" width="20" height="20" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" v-if="!isMainModalOpen"
                                    d="M2.5 4.99935C2.5 4.53911 2.8731 4.16602 3.33333 4.16602H16.6667C17.1269 4.16602 17.5 4.53911 17.5 4.99935C17.5 5.45959 17.1269 5.83268 16.6667 5.83268H3.33333C2.8731 5.83268 2.5 5.45959 2.5 4.99935ZM2.5 9.99935C2.5 9.53911 2.8731 9.16602 3.33333 9.16602H16.6667C17.1269 9.16602 17.5 9.53911 17.5 9.99935C17.5 10.4596 17.1269 10.8327 16.6667 10.8327H3.33333C2.8731 10.8327 2.5 10.4596 2.5 9.99935ZM2.5 14.9993C2.5 14.5391 2.8731 14.166 3.33333 14.166H16.6667C17.1269 14.166 17.5 14.5391 17.5 14.9993C17.5 15.4596 17.1269 15.8327 16.6667 15.8327H3.33333C2.8731 15.8327 2.5 15.4596 2.5 14.9993Z"
                                    fill="#1a2f4d"></path>
                                <path v-if="isMainModalOpen" fill-rule="evenodd" clip-rule="evenodd"
                                    d="M4.41107 4.41009C4.73651 4.08466 5.26414 4.08466 5.58958 4.41009L10.0003 8.82084L14.4111 4.41009C14.7365 4.08466 15.2641 4.08466 15.5896 4.41009C15.915 4.73553 15.915 5.26317 15.5896 5.5886L11.1788 9.99935L15.5896 14.4101C15.915 14.7355 15.915 15.2632 15.5896 15.5886C15.2641 15.914 14.7365 15.914 14.4111 15.5886L10.0003 11.1779L5.58958 15.5886C5.26414 15.914 4.73651 15.914 4.41107 15.5886C4.08563 15.2632 4.08563 14.7355 4.41107 14.4101L8.82181 9.99935L4.41107 5.5886C4.08563 5.26317 4.08563 4.73553 4.41107 4.41009Z"
                                    fill="#1a2f4d"></path>
                            </svg>
                        </transition>
                    </div>
                </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal submenu Content -->
      <transition
        enter-active-class="transition-all duration-1000 ease-out"
        enter-from-class="scale-y-0 origin-top"
        enter-to-class="scale-y-100 origin-top"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="scale-y-100 origin-top"
        leave-to-class="scale-y-0 origin-top"
      >
        <div v-show="isSubModalOpen" class="lg:block hidden absolute left-0 w-full">
          <div
            class="relative bg-[#1A2F4D] overflow-hidden pb-10 pt-5 h-[310px]" 
          >
            <transition
                enter-active-class="transition-all delay-1000 duration-1000 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div class="container space-y-2" v-show="isSubModalOpen && headerData">
                <p class="px-4 my-auto text-[15px] text-white font-normal border border-[5px] border-r-0 border-t-0 border-b-0 border-[#948668] uppercase">
                    {{ headerData?.swipeSub?.title[language] }}
                </p>

                <div class="swiper swiper-sub !overflow-visible"
                    :data-swipe="headerData?.swipeSub?.title[language]">
                    <div class="swiper-wrapper">
                        <div
                            v-for="(slide, i) in headerData?.swipeSub?.slides"
                            :key="i"
                            class="swiper-slide"
                            :data-name="slide?.title[language]"
                        >
                            <a
                            :href="slide?.url[language]"
                            :target="slide?.url.target"
                            class="cursor-pointer"
                            :data-property_brand="slide?.title[language]"
                            :data-project_label="slide?.label"
                            :data-property_type="slide?.type[language]"
                            :data-property_location="slide?.location[language]"
                            :data-property_price="slide?.price"
                            @click.prevent="selectCard(slide)"
                            >
                            <div class="flex flex-col text-white gap-2">
                                <div class="w-full overflow-hidden h-[188px]">
                                    <img aria-hidden="true"
                                        :src="slide?.thumb"
                                        :alt="slide?.title[language]"
                                        class="w-full hover:scale-125 transition-all duration-[2000ms] h-full object-cover object-center"
                                    />
                                </div>
                                <div>
                                <small class="leading-tight text-[14px] font-thin uppercase" v-html="slide?.type[language]"></small>
                                <p class="text-[16px] leading-tight" v-html="slide?.title[language]+' ' +slide?.location[language]"></p>
                                </div>
                            </div>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- TODO: initialize your Swiper instance here -->
                </div>
            </transition>
          </div>
        </div>
      </transition>
      <!-- Modal main modal Content -->
      <transition
        enter-active-class="transition-all duration-1000 ease-out"
        enter-from-class="scale-y-0 origin-top"
        enter-to-class="scale-y-100 origin-top"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="scale-y-100 origin-top"
        leave-to-class="scale-y-0 origin-top"
      >
        <div v-show="isMainModalOpen" class="absolute inset-0 top-0 bg-[#1A2F4D] overflow-hidden pb-10 pt-20 lg:h-[380px] h-screen" >
            <transition
                enter-active-class="transition-all delay-1000 duration-1000 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div class="container lg:space-y-0 space-y-2 flex gap-10 relative w-full" v-show="isMainModalOpen">
                    <div class="lg:min-w-[270px] lg:w-auto w-full flex flex-col">
                        <button
                            v-for="(item, idx) in headerData?.data"
                            :key="idx"
                            type="button"
                            class="hover:lg:bg-[#2d4f7f] py-3 lg:pr-10 lg:border-transparent group border border-white/30 border-1 border-t-0 border-r-0 border-l-0 last:border-b-0"
                            :class="{'lg:!bg-[#2d4f7f]': hoveredIdx == idx}"
                            @mouseenter="hoveredIdx = idx"
                            @click="hoveredIdx = idx"
                        >   
                            <div class="flex justify-between ">
                                <a :href="item.url[language]"
                                    :class="{'w-full': item.items ==undefined}"
                                    @click.prevent="selectMenu(item)">
                                    <p class="text-left px-4 my-auto text-[16px] text-white uppercase font-normal  border-transparent group-hover:border-[#948668] border border-[5px]  border-r-0 border-t-0 border-b-0"
                                        :class="{'!border-[#948668]': hoveredIdx == idx},singhaFonts">
                                            {{ item.title[language] }}
                                    </p>
                                </a>
                                <span v-if="item.items" class="lg:hidden h-full my-auto">
                                    <svg width="16" :class="{'rotate-180':hoveredIdx != idx}" class="transition-all duration-1000 my-auto " height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.29289 0.792893C7.68342 0.402369 8.31658 0.402369 8.70711 0.792893L15.7071 7.79289C16.0976 8.18342 16.0976 8.81658 15.7071 9.20711C15.3166 9.59763 14.6834 9.59763 14.2929 9.20711L8 2.91421L1.70711 9.20711C1.31658 9.59763 0.683417 9.59763 0.292893 9.20711C-0.0976311 8.81658 -0.0976311 8.18342 0.292893 7.79289L7.29289 0.792893Z" fill="#948668"></path>
                                    </svg>
                                </span>
                            </div>

                            <!-- main mobile  content -->
                            
                            <transition
                                enter-active-class="transition-all delay-2000 duration-1000 ease-out"
                                enter-from-class="opacity-0"
                                enter-to-class="opacity-100"
                                leave-active-class="transition-all duration-200 ease-in"
                                leave-from-class="opacity-100"
                                leave-to-class="opacity-0"
                            >
                                <div 
                                    class="w-full overflow-hidden lg:hidden block my-5" 
                                    v-show="hoveredIdx === idx && item.items"
                                >
                                    <div 
                                        class="swiper !overflow-visible" 
                                        :class="'swiper-mobile-'+idx"
                                        :data-swipe="item.title[language]"
                                    >
                                        <div class="swiper-wrapper">
                                            <div 
                                                v-for="(slide, i) in item.items" 
                                                :key="i" 
                                                class="swiper-slide w-[300px]"
                                            >
                                                <div
                                                    :class="{ 'pointer-events-none opacity-50': !mobileReady[idx] }"
                                                    class="flex flex-col text-white gap-2"
                                                >
                                                    <div class="w-full overflow-hidden h-[188px]">
                                                        <a 
                                                            :href="mobileReady[idx] ? slide.url[language] : undefined"
                                                            @click.prevent="mobileReady[idx] && selectCard(slide)"
                                                        >
                                                            <img aria-hidden="true"
                                                                :src="slide.thumb"
                                                                :alt="slide.title[language]"
                                                                class="w-full hover:scale-125 transition-all duration-[2000ms] h-full object-cover object-center"
                                                            />
                                                        </a>
                                                    </div>
                                                    <div class="text-left":class="singhaFonts" >
                                                        <a 
                                                            :href="mobileReady[idx] ? slide.url[language] : undefined"
                                                            @click.prevent="mobileReady[idx] && selectCard(slide)"
                                                        >
                                                            <small class="leading-tight text-[14px] font-thin uppercase " v-html="slide?.type[language]"></small>
                                                            <p class="text-[16px] leading-tight" v-html="item?.title[language]=='Property collection'? slide?.title[language]+' ' +slide?.location[language] : slide?.title[language]"></p>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </button>
                    </div>

                    <!-- main content -->
                    <div class="w-full overflow-hidden xl:mr-[-15rem] mr-[-5rem] lg:block hidden">
                        <div class="swiper swiper-main !overflow-visible pr-[5rem]" :data-swipe="currentMenu?.title[language]">
                            <div class="swiper-wrapper">
                            <div
                                v-for="(slide, i) in currentSlides"
                                :key="i"
                                class="swiper-slide"
                                :data-name="slide?.title[language]"
                            >
                                <a
                                :href="slide?.url[language]"
                                :target="slide?.url.target"
                                class="cursor-pointer"
                                :data-property_brand="slide?.title[language]"
                                :data-project_label="slide?.label"
                                :data-property_type="slide?.type[language]"
                                :data-property_location="slide?.location[language]"
                                :data-property_price="slide?.price"
                                @click.prevent="selectCard(slide)"
                                >
                                <div class="flex flex-col text-white gap-2">
                                    <div class="w-full overflow-hidden h-[188px]">
                                        <img aria-hidden="true"
                                            :src="slide?.thumb"
                                            :alt="slide?.title[language]"
                                            class="w-full hover:scale-125 transition-all duration-[2000ms] h-full object-cover object-center"
                                        />
                                    </div>
                                    <div>
                                        <small class="leading-tight text-[14px] font-thin uppercase " v-html="slide?.type[language]"></small>
                                        <p class="text-[16px] leading-tight" v-html="currentMenu?.title[language]=='Property collection'? slide?.title[language]+' ' +slide?.location[language] : slide?.title[language]"></p>
                                    </div>
                                </div>
                                </a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            
            <div class="container mt-5 bg-[#1A2F4D] absolute bottom-0 left-0 py-3 border-1 border-l-0 border-r-0 border-b-0 lg:hidden">
                <div class="flex gap-10 relative flex-col">
                    <div class="flex mt-auto justify-between">
                        <div>
                            <img aria-hidden="true" class="w-[100px] md:hidden block"
                                src="/assets/image/residential/logo-desktop-header.svg">
                        </div>
                        <div class="flex mt-auto mb-1 gap-2">
                            <div>
                                <a :href="'/en'+path" class="text-white uppercase text-[15px]">
                                    en
                                </a>
                            </div>
                            <div class="text-white">
                                <b>|</b>
                            </div>
                            <div>
                                <a :href="'/th'+path" class="text-white uppercase">
                                    th
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </transition>
    </header>
  `,
    setup() {
        const language = ref('th');
        const isSubModalOpen = ref(false);
        const isMainModalOpen = ref(false);
        const headerData = ref(null);
        const isSelectLanguage = ref(false);
        const langRef = ref(null);
        const hoveredIdx = ref(0);
        const singhaFonts = ref("font-['SinghaEstate']");
        const mobileReady = ref([]);
        let swiperSub, swiperMain;

        const getLanguageFromPath = () => {
            const path = window.location.pathname;
            const match = path.match(/\/(th|en)(\/|$)/);
            return match ? match[1] : 'th';
        };

        const toggleMainModal = () => {
            isMainModalOpen.value = !isMainModalOpen.value;
            isSubModalOpen.value = false;
            isSelectLanguage.value = false;
            if (isMainModalOpen.value) hoveredIdx.value = 0;
        };
        const closeAllModal = () => {
            isMainModalOpen.value = false;
            isSubModalOpen.value = false;
            isSelectLanguage.value = false;
            if (isMainModalOpen.value) hoveredIdx.value = 0;
        }
        const toggleSubModal = () => {
            isSubModalOpen.value = !isSubModalOpen.value;
            isSelectLanguage.value = false;
            isMainModalOpen.value = false;
        };

        const toggleLanguage = () => {
            isSelectLanguage.value = !isSelectLanguage.value;
            isSubModalOpen.value = false;
            isMainModalOpen.value = false;
        };
        const init = () => {
            AOS.init();

            swiperSub = new Swiper(".swiper-sub", {
                slidesPerView: 4.5,
                spaceBetween: 40,
                freeMode: true
            });
            swiperMain = new Swiper(".swiper-main", {
                freeMode: true,
                // default for <1024px
                slidesPerView: 1,
                spaceBetween: 10,
                // breakpoints
                breakpoints: {
                    // when window width is >= 1024px
                    1440: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView:2.5,
                        spaceBetween: 40,
                    },
                    769: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    }
                }
            });

            headerData.value.data.forEach((_, idx) => {
                new Swiper(`.swiper-mobile-${idx}`, {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    breakpoints: {
                        769: { slidesPerView: 2, spaceBetween: 40 },
                        1025: { slidesPerView: 4, spaceBetween: 40 },
                    }
                });
                mobileReady.value[idx] = true;
            });
            // initialize swiper here if needed
            // animate header background‐color opacity from 0 → .8 as you scroll
            ScrollTrigger.create({
                trigger: document.body,
                start: "70px top",    // when pageYOffset ≥ 70px
                end: "top top",       // you could also set an end point if you like
                scrub: true,          // smooth scrubbing
                onUpdate: self => {
                    const hdr = document.querySelector("header .bg");
                    // map progress (0→1) to opacity 0→0.8
                    const alpha = self.progress * 0.8;
                    if (self.progress > 0.5) {
                        hdr.style.height = '70px'
                        hdr.classList.add("backdrop-blur-3xl");
                        hdr.style.backgroundImage = 'radial-gradient(circle,rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.8) 100%)'.trim();
                    } else {
                        hdr.style.height = '65px'
                        hdr.style.backgroundImage = 'radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)'.trim();
                        hdr.classList.remove("backdrop-blur-3xl");
                    }
                }
            });
        };

        // ฟังก์ชั่นเช็กคลิกนอก langRef
        const handleClickOutside = (e) => {
            if (
                isSelectLanguage.value &&
                langRef.value &&
                !langRef.value.contains(e.target)
            ) {
                isSelectLanguage.value = false;
            }
        };

        // your existing preventDefault
        const preventDefault = (e) => {
            e.preventDefault();
        };

        const path = computed(() => {
            const p = window.location.pathname;
            // remove leading /th or /en
            return p.replace(/^\/(th|en)/, '') || '/';
        });

        // whenever isSubModalOpen changes, add or remove the wheel‐blocker
        watch(isSubModalOpen, (open) => {
            if (open) {
                document.body.addEventListener('wheel', preventDefault, { passive: false });
            } else {
                document.body.removeEventListener('wheel', preventDefault);
            }
        });

        watch(hoveredIdx, async () => {
            // รอให้ DOM+Vue render ใหม่ก่อน
            await nextTick();
            if (swiperMain) {
                swiperMain.update();    // รีเฟรช slide ใหม่
                swiperMain.slideTo(0);  // เลื่อนไป slide แรก (ถ้าต้องการ)
            }
        });

        watch(isMainModalOpen, (open) => {
            if (open) {
                document.body.addEventListener('wheel', preventDefault, { passive: false });
            } else {
                document.body.removeEventListener('wheel', preventDefault);
            }
        });
        onMounted(async () => {
            language.value = getLanguageFromPath();
            
            const res = await axios.get('/component/header/data/header.json');
            const resSub = await axios.get('/page/the-esse/component/header/sub-header.json');
            headerData.value = {
                data: res.data,
                swipeSub: {
                    title: {
                        th: resSub.data[0].title[language.value],
                        en: resSub.data[0].title[language.value]
                    },
                    slides: [
                        ...resSub.data[0].items
                    ]
                }
            };
            document.body.removeEventListener('wheel', preventDefault);
            document.addEventListener('click', handleClickOutside);

            mobileReady.value = headerData.value.data.map(() => false);
            await nextTick();
            init();
        });
        onUnmounted(() => {
            document.removeEventListener('click', handleClickOutside);
        });

        const selectMenu = (data) => {
            var tracking = {
                event: "click_sub_header",
                landing_page,
                section: "header",
                event_action: "click",
                sub_header: data.title[language.value]
            }
            dataLayer.push(tracking);
            // finally open your link
            window.open(
                data.url[language.value],
                data.url.target || "_blank"
            );
        }
        const selectCard = (slide) => {
            // base tracking
            const tracking = {
                event: "select_property",
                landing_page,        // <-- make sure landing_page is in scope!
                section: "header",
                event_action: "click",
            };

            // grab the localized values directly from slide
            const brand = slide.title[language.value];
            const label = slide.label;
            const type = slide.type[language.value];
            const location = slide.location[language.value];
            const price = slide.price;

            if (brand) tracking.property_brand = brand;
            if (label) tracking.project_label = label.toLowerCase().replace(/ /g, "_");
            if (type) tracking.property_type = type;
            if (location) tracking.property_location = location;
            if (price) tracking.property_price = price;

            // console.log("📊 tracking:", tracking);
            dataLayer.push(tracking);

            // finally open your link
            window.open(
                slide.url[language.value],
                slide.url.target || "_blank"
            );
        };

        const currentMenu = computed(() => {
            return headerData.value?.data?.[hoveredIdx.value] || null;
        });

        // Computed: slides ของเมนูปัจจุบัน
        const currentSlides = computed(() => {
            return currentMenu.value?.items || [];
        });
        return {
            language,
            isSubModalOpen,
            headerData,
            toggleSubModal,
            selectCard,
            toggleLanguage,
            isSelectLanguage,
            langRef,
            path,
            singhaFonts,
            isMainModalOpen,
            toggleMainModal,
            hoveredIdx,
            currentMenu,
            currentSlides,
            closeAllModal,
            selectMenu,
            mobileReady
        };
    }
});

function setDataLayer(data) {
    dataLayer.push(data);
}
