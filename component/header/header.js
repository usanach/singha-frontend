const { createApp, defineComponent, ref, onMounted, onUnmounted, nextTick, watch, computed,reactive,onBeforeUnmount  } = Vue;

const axios = window.axios;
const RECAPTCHA_KEY = "6LevUS0nAAAAAInOUaytl6bgNgWFE4FQt2yofWyZ";

const HeaderComponent = defineComponent({
  name: "HeaderComponent",
  template: `
    <header class="w-full fixed top-0 left-0 z-[9999]" :class="singhaFonts">
      <!-- Modal Overlay -->
      <div
        v-if="isSubModalOpen || isMainModalOpen"
        class="fixed h-screen inset-0 bg-black bg-opacity-50"
        @click="closeAllModal"
      ></div>

      <div  class="bg  py-2 relative z-50 flex transition-all" :class="[projectId?'bg-white':'[background-image:radial-gradient(circle,_rgba(46,80,128,1)_0%,_rgba(26,47,78,1)_100%)] [background-image:radial-gradient(circle,_rgba(46,80,128,1)_0%,_rgba(26,47,78,1)_100%)]'] ">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <p class="uppercase text-[15px]" :class="[projectId?'text-[#1a2f4d]':'text-white']">Residential</p>
          </div>
        </div>

        <div class="flex container mx-auto justify-between relative my-auto">
          <div v-if="projectId">
            <a :href="'/' + language" target="_blank">
              <img aria-hidden="true" class="w-[125px] md:block hidden" src="/assets/image/page-smyth-home/header/logo.webp" />
              <img aria-hidden="true" class="w-[15px] md:hidden" src="/assets/image/residential/logo-mobile-header.svg" />
            </a>
          </div>
          <div v-else>
            <a :href="'/' + language" target="_blank">
              <img aria-hidden="true" class="w-[125px] md:block hidden" src="/assets/image/residential/logo singha estate.svg" />
              <img aria-hidden="true" class="w-[15px] md:hidden" src="/assets/image/residential/logo-mobile-header.svg" />
            </a>
          </div>

          <div class="my-auto flex gap-3 relative ml-auto">
            <div>
              <button type="button" class="lg:flex hidden h-full" @click="toggleSubModal">
                <div class="my-auto">
                  <p class="uppercase leading-tight text-[15px]" :class="[projectId?'text-[#1a2f4d]':'text-white',singhaFonts]">
                    {{ headerData?.swipeSub?.title[language] }}
                  </p>
                </div>
                <div class="my-auto ml-2">
                  <svg v-if="projectId"
                    :class="[isSubModalOpen ? 'rotate-180' : '']"
                    class="transition-all duration-3000 w-[20px]"
                    width="20" height="20" viewBox="0 0 20 20" fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd" clip-rule="evenodd"
                      d="M3.57757 6.91009C3.90301 6.58466 4.43065 6.58466 4.75609 6.91009L10.0002 12.1542L15.2442 6.91009C15.5697 6.58466 16.0973 6.58466 16.4228 6.91009C16.7482 7.23553 16.7482 7.76317 16.4228 8.0886L10.5894 13.9219C10.264 14.2474 9.73634 14.2474 9.41091 13.9219L3.57757 8.0886C3.25214 7.76317 3.25214 7.23553 3.57757 6.91009Z"
                      fill="#1a2f4d"
                    />
                  </svg>
                  <svg v-else
                    :class="[isSubModalOpen ? 'rotate-180' : '']"
                    class="transition-all duration-3000 w-[20px]"
                    width="20" height="20" viewBox="0 0 20 20" fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd" clip-rule="evenodd"
                      d="M3.57757 6.91009C3.90301 6.58466 4.43065 6.58466 4.75609 6.91009L10.0002 12.1542L15.2442 6.91009C15.5697 6.58466 16.0973 6.58466 16.4228 6.91009C16.7482 7.23553 16.7482 7.76317 16.4228 8.0886L10.5894 13.9219C10.264 14.2474 9.73634 14.2474 9.41091 13.9219L3.57757 8.0886C3.25214 7.76317 3.25214 7.23553 3.57757 6.91009Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </button>
            </div>

            <div>
              <span class="xl:block hidden opacity-[50%]" :class="[projectId?'text-[#1a2f4d]':'text-white',singhaFonts]">|</span>
            </div>

            <div class="relative px-2" ref="langRef">
              <button type="button" class="lg:flex hidden h-full" @click="toggleLanguage">
                <div class="my-auto flex gap-2">
                
                  <svg v-if="projectId" class="w-[20px] my-auto" width="20" height="20" viewBox="0 0 20 20" fill="#1a2f4d" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_3558_4163)">
                          <path d="M10.165 0.00213162C10.1384 0.00118423 10.1119 0 10.0851 0C10.0759 0 10.0667 0.000473707 10.0574 0.000710538C10.0383 0.000473707 10.0193 0 10.0001 0C4.4861 0 0 4.48587 0 9.99988C0 15.5139 4.4861 20 10.0001 20C10.0193 20 10.0383 19.9995 10.0574 19.9993C10.0667 19.9995 10.0759 20 10.0851 20C10.1119 20 10.1384 19.9988 10.165 19.9979C15.6032 19.9095 20 15.4589 20 9.99988C20 4.54105 15.6032 0.0904752 10.165 0.00213162ZM17.3279 6.36358H14.3415C14.1501 5.21133 13.8666 4.14931 13.5007 3.23413C13.3889 2.95466 13.27 2.69247 13.1452 2.44709C14.9647 3.20761 16.4528 4.60713 17.3279 6.36358ZM18.182 9.99988C18.182 10.6247 18.1112 11.2331 17.978 11.8181H14.5606C14.6068 11.2244 14.6307 10.6164 14.6307 9.99988C14.6307 9.38361 14.6068 8.77562 14.5606 8.18185H17.978C18.1112 8.76686 18.182 9.37532 18.182 9.99988ZM10.1171 18.1803C10.1003 18.1805 10.0837 18.1808 10.0671 18.181C9.52903 18.163 8.86041 17.3468 8.35806 16.0906C8.07006 15.3708 7.84032 14.5284 7.67382 13.6243H12.4967C12.3302 14.5284 12.1005 15.3708 11.8125 16.0906C11.3141 17.3364 10.6526 18.1493 10.1171 18.1803ZM7.43389 11.8181C7.38415 11.2279 7.35786 10.6197 7.35786 9.99988C7.35786 9.38029 7.38415 8.77207 7.43389 8.18185H12.7366C12.7864 8.77207 12.8124 9.38029 12.8124 9.99988C12.8124 10.6197 12.7864 11.2279 12.7366 11.8181H7.43389ZM1.81827 9.99988C1.81827 9.37532 1.88885 8.75454 2.02219 8.16977H5.61018C5.56399 8.76355 5.53983 9.38361 5.53983 9.99988C5.53983 10.6164 5.56399 11.2244 5.61018 11.8181H2.02219C1.88885 11.2331 1.81827 10.6247 1.81827 9.99988ZM10.0671 1.81898C10.0837 1.81922 10.1003 1.81945 10.1171 1.81969C10.6526 1.85072 11.3141 2.66357 11.8125 3.90938C12.1005 4.62916 12.3302 5.45954 12.4967 6.36358H7.67382C7.84032 5.45954 8.07006 4.62916 8.35806 3.90938C8.86041 2.65315 9.52903 1.83698 10.0671 1.81898ZM7.06962 2.36112C6.92846 2.63089 6.79488 2.92173 6.66982 3.23413C6.3039 4.14931 6.02063 5.21133 5.82902 6.36358H2.67234C3.58159 4.53868 5.15259 3.09913 7.06962 2.36112ZM2.6721 13.6364H5.82902C6.02039 14.7887 6.3039 15.8507 6.66982 16.7659C6.79488 17.0783 6.92846 17.3691 7.06962 17.6389C5.15259 16.9009 3.58159 15.4616 2.6721 13.6364ZM13.1452 17.5529C13.27 17.3075 13.3889 17.0453 13.5007 16.7659C13.8666 15.8507 14.1499 14.7766 14.3415 13.6243H17.3279C16.4528 15.3808 14.9647 16.7924 13.1452 17.5529Z" fill="#1a2f4d"></path>
                      </g>
                      <defs>
                          <clipPath id="clip0_3558_4163">
                              <rect width="20" height="20" fill="#1a2f4d"></rect>
                          </clipPath>
                      </defs>
                  </svg>
                  <svg v-else class="w-[20px] my-auto" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_3558_4163)">
                      <path d="M10.165 0.00213162C10.1384 0.00118423 10.1119 0 10.0851 0C10.0759 0 10.0667 0.000473707 10.0574 0.000710538C10.0383 0.000473707 10.0193 0 10.0001 0C4.4861 0 0 4.48587 0 9.99988C0 15.5139 4.4861 20 10.0001 20C10.0193 20 10.0383 19.9995 10.0574 19.9993C10.0667 19.9995 10.0759 20 10.0851 20C10.1119 20 10.1384 19.9988 10.165 19.9979C15.6032 19.9095 20 15.4589 20 9.99988C20 4.54105 15.6032 0.0904752 10.165 0.00213162ZM17.3279 6.36358H14.3415C14.1501 5.21133 13.8666 4.14931 13.5007 3.23413C13.3889 2.95466 13.27 2.69247 13.1452 2.44709C14.9647 3.20761 16.4528 4.60713 17.3279 6.36358ZM18.182 9.99988C18.182 10.6247 18.1112 11.2331 17.978 11.8181H14.5606C14.6068 11.2244 14.6307 10.6164 14.6307 9.99988C14.6307 9.38361 14.6068 8.77562 14.5606 8.18185H17.978C18.1112 8.76686 18.182 9.37532 18.182 9.99988ZM10.1171 18.1803C10.1003 18.1805 10.0837 18.1808 10.0671 18.181C9.52903 18.163 8.86041 17.3468 8.35806 16.0906C8.07006 15.3708 7.84032 14.5284 7.67382 13.6243H12.4967C12.3302 14.5284 12.1005 15.3708 11.8125 16.0906C11.3141 17.3364 10.6526 18.1493 10.1171 18.1803ZM7.43389 11.8181C7.38415 11.2279 7.35786 10.6197 7.35786 9.99988C7.35786 9.38029 7.38415 8.77207 7.43389 8.18185H12.7366C12.7864 8.77207 12.8124 9.38029 12.8124 9.99988C12.8124 10.6197 12.7864 11.2279 12.7366 11.8181H7.43389ZM1.81827 9.99988C1.81827 9.37532 1.88885 8.75454 2.02219 8.16977H5.61018C5.56399 8.76355 5.53983 9.38361 5.53983 9.99988C5.53983 10.6164 5.56399 11.2244 5.61018 11.8181H2.02219C1.88885 11.2331 1.81827 10.6247 1.81827 9.99988ZM10.0671 1.81898C10.0837 1.81922 10.1003 1.81945 10.1171 1.81969C10.6526 1.85072 11.3141 2.66357 11.8125 3.90938C12.1005 4.62916 12.3302 5.45954 12.4967 6.36358H7.67382C7.84032 5.45954 8.07006 4.62916 8.35806 3.90938C8.86041 2.65315 9.52903 1.83698 10.0671 1.81898ZM7.06962 2.36112C6.92846 2.63089 6.79488 2.92173 6.66982 3.23413C6.3039 4.14931 6.02063 5.21133 5.82902 6.36358H2.67234C3.58159 4.53868 5.15259 3.09913 7.06962 2.36112ZM2.6721 13.6364H5.82902C6.02039 14.7887 6.3039 15.8507 6.66982 16.7659C6.79488 17.0783 6.92846 17.3691 7.06962 17.6389C5.15259 16.9009 3.58159 15.4616 2.6721 13.6364ZM13.1452 17.5529C13.27 17.3075 13.3889 17.0453 13.5007 16.7659C13.8666 15.8507 14.1499 14.7766 14.3415 13.6243H17.3279C16.4528 15.3808 14.9647 16.7924 13.1452 17.5529Z" fill="white"></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_3558_4163">
                        <rect width="20" height="20" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>

                  <p class="uppercase text-[15px] my-auto" :class="[projectId?'text-[#1a2f4d]':'text-white',singhaFonts]">{{ language }}</p>

                  <svg v-if="projectId" class="my-auto transition-all duration-500 w-[20px]" width="20" height="20" viewBox="0 0 20 20" fill="#1a2f4d" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.57757 6.91009C3.90301 6.58466 4.43065 6.58466 4.75609 6.91009L10.0002 12.1542L15.2442 6.91009C15.5697 6.58466 16.0973 6.58466 16.4228 6.91009C16.7482 7.23553 16.7482 7.76317 16.4228 8.0886L10.5894 13.9219C10.264 14.2474 9.73634 14.2474 9.41091 13.9219L3.57757 8.0886C3.25214 7.76317 3.25214 7.23553 3.57757 6.91009Z" fill="#1a2f4d"></path>
                  </svg>
                  <svg v-else class="my-auto transition-all duration-500 w-[20px]" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.57757 6.91009C3.90301 6.58466 4.43065 6.58466 4.75609 6.91009L10.0002 12.1542L15.2442 6.91009C15.5697 6.58466 16.0973 6.58466 16.4228 6.91009C16.7482 7.23553 16.7482 7.76317 16.4228 8.0886L10.5894 13.9219C10.264 14.2474 9.73634 14.2474 9.41091 13.9219L3.57757 8.0886C3.25214 7.76317 3.25214 7.23553 3.57757 6.91009Z" fill="white"></path>
                  </svg>
                </div>
              </button>

              <div v-show="isSelectLanguage" class="absolute top-100 mt-2 left-0 w-full h-fit gap-2 bg-[#1A2F4D] p-2 z-[60] text-center space-y-2">
                <div class="uppercase text-white text-center hover:bg-[#162842] text-[15px] pt-1 leading-none flex">
                  <a :href="'/th' + path" class="mx-auto">th</a>
                </div>
                <div class="uppercase text-white text-center hover:bg-[#162842] text-[15px] pt-1 leading-none flex">
                  <a :href="'/en' + path" class="mx-auto">en</a>
                </div>
              </div>
            </div>

            <div class="flex">
              <button type="button" class="my-auto" @click="toggleMainModal">
                <div class="relative" :class="!isMainModalOpen ? 'scale-x-150' : ''">
                  <transition
                    enter-active-class="transition-all duration-200 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <svg v-if="projectId" class="w-[20px]" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path v-if="!isMainModalOpen" fill-rule="evenodd" clip-rule="evenodd"
                        d="M2.5 4.99935C2.5 4.53911 2.8731 4.16602 3.33333 4.16602H16.6667C17.1269 4.16602 17.5 4.53911 17.5 4.99935C17.5 5.45959 17.1269 5.83268 16.6667 5.83268H3.33333C2.8731 5.83268 2.5 5.45959 2.5 4.99935ZM2.5 9.99935C2.5 9.53911 2.8731 9.16602 3.33333 9.16602H16.6667C17.1269 9.16602 17.5 9.53911 17.5 9.99935C17.5 10.4596 17.1269 10.8327 16.6667 10.8327H3.33333C2.8731 10.8327 2.5 10.4596 2.5 9.99935ZM2.5 14.9993C2.5 14.5391 2.8731 14.166 3.33333 14.166H16.6667C17.1269 14.166 17.5 14.5391 17.5 14.9993C17.5 15.4596 17.1269 15.8327 16.6667 15.8327H3.33333C2.8731 15.8327 2.5 15.4596 2.5 14.9993Z"
                        fill="#1a2f4d"></path>

                      <path v-else fill-rule="evenodd" clip-rule="evenodd"
                        d="M4.41107 4.41009C4.73651 4.08466 5.26414 4.08466 5.58958 4.41009L10.0003 8.82084L14.4111 4.41009C14.7365 4.08466 15.2641 4.08466 15.5896 4.41009C15.915 4.73553 15.915 5.26317 15.5896 5.5886L11.1788 9.99935L15.5896 14.4101C15.915 14.7355 15.915 15.2632 15.5896 15.5886C15.2641 15.914 14.7365 15.914 14.4111 15.5886L10.0003 11.1779L5.58958 15.5886C5.26414 15.914 4.73651 15.914 4.41107 15.5886C4.08563 15.2632 4.08563 14.7355 4.41107 14.4101L8.82181 9.99935L4.41107 5.5886C4.08563 5.26317 4.08563 4.73553 4.41107 4.41009Z"
                        fill="#1a2f4d"></path>
                    </svg>
                    <svg v-else class="w-[20px]" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path v-if="!isMainModalOpen" fill-rule="evenodd" clip-rule="evenodd"
                        d="M2.5 4.99935C2.5 4.53911 2.8731 4.16602 3.33333 4.16602H16.6667C17.1269 4.16602 17.5 4.53911 17.5 4.99935C17.5 5.45959 17.1269 5.83268 16.6667 5.83268H3.33333C2.8731 5.83268 2.5 5.45959 2.5 4.99935ZM2.5 9.99935C2.5 9.53911 2.8731 9.16602 3.33333 9.16602H16.6667C17.1269 9.16602 17.5 9.53911 17.5 9.99935C17.5 10.4596 17.1269 10.8327 16.6667 10.8327H3.33333C2.8731 10.8327 2.5 10.4596 2.5 9.99935ZM2.5 14.9993C2.5 14.5391 2.8731 14.166 3.33333 14.166H16.6667C17.1269 14.166 17.5 14.5391 17.5 14.9993C17.5 15.4596 17.1269 15.8327 16.6667 15.8327H3.33333C2.8731 15.8327 2.5 15.4596 2.5 14.9993Z"
                        fill="white"></path>

                      <path v-else fill-rule="evenodd" clip-rule="evenodd"
                        d="M4.41107 4.41009C4.73651 4.08466 5.26414 4.08466 5.58958 4.41009L10.0003 8.82084L14.4111 4.41009C14.7365 4.08466 15.2641 4.08466 15.5896 4.41009C15.915 4.73553 15.915 5.26317 15.5896 5.5886L11.1788 9.99935L15.5896 14.4101C15.915 14.7355 15.915 15.2632 15.5896 15.5886C15.2641 15.914 14.7365 15.914 14.4111 15.5886L10.0003 11.1779L5.58958 15.5886C5.26414 15.914 4.73651 15.914 4.41107 15.5886C4.08563 15.2632 4.08563 14.7355 4.41107 14.4101L8.82181 9.99935L4.41107 5.5886C4.08563 5.26317 4.08563 4.73553 4.41107 4.41009Z"
                        fill="white"></path>
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
          <div class="relative bg-[#1A2F4D] overflow-hidden pb-10 pt-5 h-[310px]">
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

                <div class="swiper swiper-sub !overflow-visible" :data-swipe="headerData?.swipeSub?.title[language]">
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
        <div v-show="isMainModalOpen" class="absolute inset-0 top-0 bg-[#1A2F4D] overflow-hidden pb-10 pt-20 lg:h-[380px] h-screen">
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
                  :class="{ 'lg:!bg-[#2d4f7f]': hoveredIdx == idx }"
                  @mouseenter="hoveredIdx = idx"
                  @click="hoveredIdx = idx"
                >
                  <div class="flex justify-between">
                    <a
                      :href="item.url[language]"
                      :class="{ 'w-full': item.items == undefined }"
                      @click.prevent="selectMenu(item)"
                    >
                      <p
                        class="text-left px-4 my-auto text-[16px] text-white uppercase font-normal border-transparent group-hover:border-[#948668] border border-[5px] border-r-0 border-t-0 border-b-0"
                        :class="[hoveredIdx == idx ? '!border-[#948668]' : '', singhaFonts]"
                      >
                        {{ item.title[language] }}
                      </p>
                    </a>

                    <span v-if="item.items" class="lg:hidden h-full my-auto">
                      <svg width="16" height="10"
                        :class="[hoveredIdx != idx ? 'rotate-180' : '', 'transition-all duration-1000 my-auto']"
                        viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg"
                      >
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M7.29289 0.792893C7.68342 0.402369 8.31658 0.402369 8.70711 0.792893L15.7071 7.79289C16.0976 8.18342 16.0976 8.81658 15.7071 9.20711C15.3166 9.59763 14.6834 9.59763 14.2929 9.20711L8 2.91421L1.70711 9.20711C1.31658 9.59763 0.683417 9.59763 0.292893 9.20711C-0.0976311 8.81658 -0.0976311 8.18342 0.292893 7.79289L7.29289 0.792893Z"
                          fill="#948668"
                        />
                      </svg>
                    </span>
                  </div>

                  <!-- main mobile content -->
                  <transition
                    enter-active-class="transition-all delay-2000 duration-1000 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition-all duration-200 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                  >
                    <div class="w-full overflow-hidden lg:hidden block my-5" v-show="hoveredIdx === idx && item.items">
                      <div class="swiper !overflow-visible" :class="'swiper-mobile-'+idx" :data-swipe="item.title[language]">
                        <div class="swiper-wrapper">
                          <div v-for="(slide, i) in item.items" :key="i" class="swiper-slide w-[300px]">
                            <div :class="{ 'pointer-events-none opacity-50': !mobileReady[idx] }" class="flex flex-col text-white gap-2">
                              <div class="w-full overflow-hidden h-[188px]">
                                <a :href="mobileReady[idx] ? slide.url[language] : undefined" @click.prevent="mobileReady[idx] && selectCard(slide)">
                                  <img aria-hidden="true"
                                    :src="slide.thumb"
                                    :alt="slide.title[language]"
                                    class="w-full hover:scale-125 transition-all duration-[2000ms] h-full object-cover object-center"
                                  />
                                </a>
                              </div>

                              <div class="text-left" :class="singhaFonts">
                                <a :href="mobileReady[idx] ? slide.url[language] : undefined" @click.prevent="mobileReady[idx] && selectCard(slide)">
                                  <small class="leading-tight text-[14px] font-thin uppercase" v-html="slide?.type[language]"></small>
                                  <p class="text-[16px] leading-tight"
                                     v-html="item?.title['en']=='Property collection'
                                      ? slide?.title[language]+' ' +slide?.location[language]
                                      : slide?.title[language]"
                                  ></p>
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

              <!-- main desktop content -->
              <div class="w-full overflow-hidden xl:mr-[-15rem] mr-[-5rem] lg:block hidden">
                <div class="swiper swiper-main !overflow-visible pr-[5rem]" :data-swipe="currentMenu?.title[language]">
                  <div class="swiper-wrapper">
                    <div v-for="(slide, i) in currentSlides" :key="i" class="swiper-slide" :data-name="slide?.title[language]">
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
                            <p class="text-[16px] leading-tight"
                               v-html="currentMenu?.title['en']=='Property collection'
                                ? slide?.title[language]+' ' +slide?.location[language]
                                : slide?.title[language]"
                            ></p>
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
                  <img aria-hidden="true" class="w-[100px] md:hidden block" src="/assets/image/residential/logo-desktop-header.svg">
                </div>
                <div class="flex mt-auto mb-1 gap-2">
                  <div>
                    <a :href="'/en'+path" class="text-white uppercase text-[15px]">en</a>
                  </div>
                  <div class="text-white"><b>|</b></div>
                  <div>
                    <a :href="'/th'+path" class="text-white uppercase">th</a>
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
    const language = ref("th");
    const isSubModalOpen = ref(false);
    const isMainModalOpen = ref(false);
    const headerData = ref(null);
    const isSelectLanguage = ref(false);
    const langRef = ref(null);
    const hoveredIdx = ref(0);
    const singhaFonts = ref("font-['SinghaEstate']");
    const mobileReady = ref([]);
    const projectId=ref(null);
    let swiperSub, swiperMain;

    if (typeof projectIDs !== 'undefined' && projectIDs !== null) {
      projectId.value = projectIDs;
    }
    const getLanguageFromPath = () => {
      const path = window.location.pathname;
      const match = path.match(/\/(th|en)(\/|$)/);
      return match ? match[1] : "th";
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
    };

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

    const handleClickOutside = (e) => {
      if (isSelectLanguage.value && langRef.value && !langRef.value.contains(e.target)) {
        isSelectLanguage.value = false;
      }
    };

    const preventDefault = (e) => e.preventDefault();

    const path = computed(() => {
      const p = window.location.pathname;
      return p.replace(/^\/(th|en)/, "") || "/";
    });

    watch(isSubModalOpen, (open) => {
      if (open) document.body.addEventListener("wheel", preventDefault, { passive: false });
      else document.body.removeEventListener("wheel", preventDefault);
    });

    watch(isMainModalOpen, (open) => {
      if (open) document.body.addEventListener("wheel", preventDefault, { passive: false });
      else document.body.removeEventListener("wheel", preventDefault);
    });

    watch(hoveredIdx, async () => {
      await nextTick();
      if (swiperMain) {
        swiperMain.update();
        swiperMain.slideTo(0);
      }
    });
watch(
  () => headerData.value?.swipeSub?.slides,
  async (slides) => {
    if (!slides || !slides.length) return;
    await initSubSwiper();
  },
  { deep: true }
);

    // =========================
    // helpers / mappers
    // =========================
    const labelMap = (labelRaw) => {
      const v = (labelRaw || "").toString().toLowerCase().trim();
      if (v === "new_project" || v === "new project") return "New Project";
      if (v === "ready_to_move" || v === "ready to move") return "Ready To Move";
      if (v === "sold_out" || v === "sold out") return "Sold Out";
      if (v === "normal") return "";
      return labelRaw || "";
    };

    const l2TypeMap = {
      9: { en: "Condominium", th: "คอนโดมิเนียม" },
      15: { en: "PRIVATE ESTATE", th: "ไพรเวท เอสเตท" },
      14: { en: "PRIVATE ESTATE", th: "ไพรเวท เอสเตท" },
      13: { en: "DETACHED HOUSE", th: "บ้านเดี่ยว" },
      12: { en: "DETACHED HOUSE", th: "บ้านเดี่ยว" },
      11: { en: "DETACHED HOUSE", th: "บ้านเดี่ยว" },
      10: { en: "DETACHED HOUSE", th: "บ้านเดี่ยว" },
      7: { en: "HOME OFFICE", th: "โฮม ออฟฟิศ" },
      8: { en: "Living Extra", th: "Living Extra" },
    };

    const buildBrandIndex = (brands = []) => {
      const mapById = new Map();
      brands.forEach((b) => mapById.set(String(b.id), b));
      return mapById;
    };

    const toAbsStorage = (filenameOrPath, folder = "") => {
      if (!filenameOrPath) return "";
      const { storageUrl = "" } = window.APP_CONFIG || {};
      if (/^https?:\/\//i.test(filenameOrPath)) return filenameOrPath;
      if (filenameOrPath.startsWith("/")) return filenameOrPath;

      const base = storageUrl.endsWith("/") ? storageUrl : storageUrl + "/";
      const f = folder ? (folder.endsWith("/") ? folder : folder + "/") : "";
      return `${base}${f}${filenameOrPath}`;
    };

    const toLocationThumb = (name) => toAbsStorage(name, "uploads/filter_component_item");
    const toPromotionThumb = (name) => toAbsStorage(name, "uploads/promotion_item_data");
    const toArticleThumb = (name) => toAbsStorage(name, "uploads/article");

    // ✅ date filter (YYYY-MM-DD) : show only active promotions
    const todayYMD = () => new Date().toISOString().slice(0, 10);
    const isActiveByDate = (row, today = todayYMD()) => {
      const s = (row?.date_start || "").toString().slice(0, 10);
      const e = (row?.date_end || "").toString().slice(0, 10);

      // ไม่มีวัน = ให้ผ่าน (ถ้าคุณอยาก "ไม่มีวัน = ไม่แสดง" บอกได้ เดี๋ยวปรับ)
      if (!s || !e) return true;

      // compare string works for YYYY-MM-DD
      return s <= today && today <= e;
    };

    const mapLocationToSlide = (locItem, brandIndex) => {
      const brandId = String(locItem.filter_component_item_l2_id || "");
      const brand = brandIndex.get(brandId);
      const type = l2TypeMap[Number(brandId)] || { en: "Property", th: "โครงการ" };

      return {
        label: labelMap(locItem.label),
        type,
        title: {
          th: brand?.title?.th || brand?.name?.th || locItem.title?.th || " ",
          en: brand?.title?.en || brand?.name?.en || locItem.title?.en || " ",
        },
        location: locItem.location || { th: "", en: "" },
        url: locItem.url || { th: "#", en: "#", target: "_blank" },
        price: locItem.price?.[language.value] || locItem.price?.en || locItem.price?.th || "",
        thumb: toLocationThumb(locItem.thumb),
        logo: toLocationThumb(locItem.logo),
      };
    };

    const pickPromotionSubData = (promoResData) => {
      return promoResData?.["sub-data"] ?? promoResData?.sub_data ?? promoResData?.subData ?? [];
    };

    // ✅ Promotion slide mapper (ใช้ card_title เป็น type / data_title เป็น title ตามที่คุณต้องการ)
    const mapPromotionToSlide = (promoItem) => {
      const typeText = {
        th: promoItem?.card_title_th || "",
        en: promoItem?.card_title_en || "",
      };

      const titleText = promoItem?.data_title || { th: "", en: "" };

      const urlObj = {
        th: promoItem?.data_url_th || promoItem?.data_url_th || "#",
        en: promoItem?.data_url_en || promoItem?.data_url_en || "#",
        target: "_blank",
      };

      const img =
        promoItem?.header_image||
        // promoItem?.image_3 ||
        // promoItem?.image_1 ||
        // promoItem?.image_0 ||
        // promoItem?.image_2 ||
        "";

      return {
        type: typeText,
        title: titleText,
        location: promoItem?.location || { th: "", en: "" },
        price: promoItem?.price || promoItem?.price_text || "",
        url: urlObj,
        thumb: img,
        // thumb: toPromotionThumb(img),
        label: promoItem?.label || "",
        // เผื่ออยากใช้ที่อื่นต่อ
        date_start: promoItem?.date_start || "",
        date_end: promoItem?.date_end || "",
      };
    };

    const mapArticleToSlide = (a) => {
      const thumb = toArticleThumb(a?.lifestyle_image);
      return {
        type: { th: a?.tag || "", en: a?.tag || "" },
        title: a?.title || { th: "", en: "" },
        location: { th: "", en: "" },
        url: { th: a?.url_th, en: a?.url_en, target: "_blank" },
        thumb,
      };
    };
// =========================
// Contact Us (API)
// =========================
const stripTags = (html = "") => String(html || "").replace(/<[^>]+>/g, "").trim();

const pickTitleDetailFromHtml = (html = "") => {
  const titleMatch = html.match(/<h2[^>]*>(.*?)<\/h2>/i);
  const pMatch = html.match(/<p[^>]*>(.*?)<\/p>/i);
  return {
    title: stripTags(titleMatch?.[1] || ""),
    detail: stripTags(pMatch?.[1] || ""),
  };
};

const toContactUsThumb = (name) => toAbsStorage(name, "uploads/contact_us");

// map API record -> slides 3 ใบ
const mapContactApiToSlides = (record) => {
  if (!record) return [];

  const lang = language.value;

  const contactTD = pickTitleDetailFromHtml(record.contact?.[lang] || "");
  const salesTD   = pickTitleDetailFromHtml(record.sales?.[lang] || "");
  const landTD    = pickTitleDetailFromHtml(record.land?.[lang] || "");

  return [
    {
      type: { th: contactTD.title || "ติดต่อเรา", en: contactTD.title || "CONTACT US" },
      title:{ th: contactTD.detail || "สนใจรายละเอียดโครงการที่พักอาศัย", en: contactTD.detail || "Interested in our residential projects" },
      thumb: toContactUsThumb(record.contact_image),
      location: { en: "", th: "" },
      url: { th: record.contact_link?.th || "/th/contact-us/head-office",
             en: record.contact_link?.en || "/en/contact-us/head-office",
             target: "_blank" },
    },
    {
      type: { th: salesTD.title || "สมัครเป็นตัวแทนขาย​", en: salesTD.title || "BECOME AGENT" },
      title:{ th: salesTD.detail || "ข้อมูลโครงการและเงื่อนไขผลตอบแทน", en: salesTD.detail || "Project information and partnership terms" },
      thumb: toContactUsThumb(record.sales_image),
      location: { en: "", th: "" },
      url: { th: record.sales_link?.th || "/th/contact-us/partner-agent",
             en: record.sales_link?.en || "/en/contact-us/partner-agent",
             target: "_blank" },
    },
    {
      type: { th: landTD.title || "เสนอขายที่ดิน/อาคาร​", en: landTD.title || "Property Offer" },
      title:{ th: landTD.detail || "ประเภทที่ดิน/อาคารที่ต้องการขาย", en: landTD.detail || "Types of land / buildings for sale" },
      thumb: toContactUsThumb(record.land_image),
      location: { en: "", th: "" },
      url: { th: record.land_link?.th || "https://property.singhaestate.co.th/th/property-offer#overview",
             en: record.land_link?.en || "https://property.singhaestate.co.th/en/property-offer#overview",
             target: "_blank" },
    },
  ];
};
const buildRelatedProjectSlides = async (projectId) => {
  if (!projectId) return [];

  try {
    const relatedRes = await getProjectRelated(projectId);
    const related = relatedRes?.data?.data?.[0];
    if (!related?.location_title_th) return [];

    let locationIds = [];
    try {
      locationIds = JSON.parse(related.location_title_th).map(Number);
    } catch {
      return [];
    }

    if (!locationIds.length) return [];

    const [locRes, brandRes] = await Promise.all([
      getGlobalProjectLocation(),
      getGlobalBrandCollection(),
    ]);

    const locations = locRes?.data?.data || [];
    const brands = brandRes?.data?.data || [];

    const brandIndex = buildBrandIndex(brands);

    return locations
      .filter((l) => locationIds.includes(Number(l.id)))
      .map((l) => mapLocationToSlide(l, brandIndex));

  } catch (e) {
    console.error("load related project failed", e);
    return [];
  }
};

const buildAboutSlides = () => {
  return [
    {
      type: { th: "เกี่ยวกับเรา", en: "About Us" },
      title: { en: "S RESIDENCES", th: "เกี่ยวกับ เอส เรสซิเดนเซส" },
      location: { th: "", en: "" },
      thumb: "/assets/image/Screen-Shot-2567-02-27-at.png",
      url: {
        th: "/th/about-s-residences",
        en: "/en/about-s-residences",
        target: "_blank",
      },
    },
    {
      type: { th: "หน้ารวมโครงการ", en: "Collection" },
      title: { en: "Property collection", th: "หน้ารวมโครงการ" },
      location: { th: "", en: "" },
      thumb: "/assets/image/thumb_1763199115_0.webp",
      url: {
        th: "/th/collection",
        en: "/en/collection",
        target: "_blank",
      },
    },
    {
      type: { th: "คอนโดมิเนียม", en: "Condominium" },
      title: { th: "โครงการ คอนโดมิเนียม", en: "Condominium Projects" },
      location: { th: "", en: "" },
      thumb: "/assets\/image\/LuxuryCondo_recommend_m.webp",
      url: {
        th: "/th/condominium",
        en: "/en/condominium",
        target: "_blank",
      },
    },
    {
      type: { th: "บ้าน", en: "House" },
      title: { th: "โครงการ บ้าน", en: "House Projects" },
      location: { th: "", en: "" },
      thumb: "/assets\/image\/santiburi.webp",
      url: {
        th: "/th/house",
        en: "/en/house",
        target: "_blank",
      },
    }
  ];
};

    const buildHeaderMenus = async () => {
      const [locRes, brandRes, promoRes, artRes, contactRes] = await Promise.all([
        getGlobalProjectLocation(),
        getGlobalBrandCollection(),
        getPromotion(),
        getArticle(),
        getContactUsContact(),
      ]);

      const locations = locRes?.data?.data || locRes?.data || [];
      const brands = brandRes?.data?.data || brandRes?.data || [];
      const articles = artRes?.data?.data || artRes?.data || [];

      const promoSubDataRaw = pickPromotionSubData(promoRes?.data);
      const promotionsRaw = Array.isArray(promoSubDataRaw) ? promoSubDataRaw : [];
      
      // ✅ Contact Us slides from API
      const contactRecord = contactRes?.data?.data?.[0] || null;
      const contactSlides = mapContactApiToSlides(contactRecord);


      // ✅ filter by start/end date (หมดเวลาแล้ว = ไม่เข้าเมนู)
      const promotions = promotionsRaw.filter((p) => isActiveByDate(p));
      

      const brandIndex = buildBrandIndex(brands);

      const propertySlides = locations.map((x) => mapLocationToSlide(x, brandIndex));
      const promoSlides = promotions.map(mapPromotionToSlide);
      const storySlides = articles.map(mapArticleToSlide);

      return [
        {
          type: "section",
          title: { en: "Property collection", th: "รวมโครงการ" },
          url: { en: "/en/collection", th: "/th/collection", target: "_blank" },
          items: propertySlides,
        },
        {
          type: "page",
          title: { en: "PROMOTION", th: "โปรโมชั่น" },
          url: { en: "/en/campaigns", th: "/th/campaigns", target: "_blank" },
          items: promoSlides,
        },
        {
          type: "section",
          title: { en: "Stories", th: "เรื่องราว" },
          url: { en: "/en/stories", th: "/th/stories", target: "_blank" },
          items: storySlides,
        },
        {
          type: "section",
          title: { en: "S RESIDENCES", th: "เกี่ยวกับ เอส เรสซิเดนเซส" },
          url: { en: "/en/about-s-residences", th: "/th/about-s-residences", target: "_self" },
          items: buildAboutSlides(),
        },
        {
          type: "page",
          title: { en: "CONTACT US", th: "ติดต่อเรา" },
          url: { en: "/en/contact-us", th: "/th/contact-us", target: "_blank" },
          items: contactSlides.length ? contactSlides : [
            // fallback กัน API ว่าง
            {
              type: { en: "CONTACT US", th: "ติดต่อเรา" },
              title: { en: "Interested in our residential projects", th: "สนใจรายละเอียดโครงการที่พักอาศัย" },
              thumb: "/assets/image/ContactUs/1.webp",
              location: { en: "", th: "" },
              url: { en: "/en/contact-us/head-office", th: "/th/contact-us/head-office", target: "_blank" },
            },
            {
              type: { en: "BECOME AGENT", th: "สมัครเป็นตัวแทนขาย​" },
              title: { en: "Project information and partnership terms ", th: "ข้อมูลโครงการและเงื่อนไขผลตอบแทน" },
              thumb: "/assets/image/ContactUs/2.webp",
              location: { en: "", th: "" },
              url: { en: "/en/contact-us/partner-agent", th: "/th/contact-us/partner-agent", target: "_blank" },
            },
            {
              type: { en: "Property Offer​", th: "เสนอขายที่ดิน/อาคาร​" },
              title: { en: "Types of land / buildings for sale", th: "ประเภทที่ดิน/อาคารที่ต้องการขาย​" },
              thumb: "/assets/image/ContactUs/3.webp",
              location: { en: "", th: "" },
              url: {
                en: "https://property.singhaestate.co.th/en/property-offer",
                th: "https://property.singhaestate.co.th/th/property-offer",
                target: "_blank",
              },
            },
          ],
        },

      ];
    };
    const initSubSwiper = async () => {
      await nextTick();

      if (swiperSub) {
        swiperSub.destroy(true, true);
        swiperSub = null;
      }

      const el = document.querySelector(".swiper-sub");
      if (!el) return;

      swiperSub = new Swiper(el, {
        slidesPerView: 4.5,
        spaceBetween: 40,
        freeMode: true,
        observer: true,
        observeParents: true,
      });

      swiperSub.update();
    };

    const init = () => {
      if (window.AOS) AOS.init();
      if (!window.Swiper) return;

      swiperSub = new Swiper(".swiper-sub", {
        slidesPerView: 4.5,
        spaceBetween: 40,
        freeMode: true,
      });

      swiperMain = new Swiper(".swiper-main", {
        freeMode: true,
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          1440: { slidesPerView: 4, spaceBetween: 40 },
          1024: { slidesPerView: 2.5, spaceBetween: 40 },
          769: { slidesPerView: 2, spaceBetween: 40 },
        },
      });

      (headerData.value?.data || []).forEach((_, idx) => {
        new Swiper(`.swiper-mobile-${idx}`, {
          slidesPerView: 1,
          spaceBetween: 10,
          breakpoints: {
            769: { slidesPerView: 2, spaceBetween: 40 },
            1025: { slidesPerView: 4, spaceBetween: 40 },
          },
        });
        mobileReady.value[idx] = true;
      });

      if (window.ScrollTrigger) {
        ScrollTrigger.create({
          trigger: document.body,
          start: "70px top",
          end: "top top",
          scrub: true,
          onUpdate: (self) => {
            const hdr = document.querySelector("header .bg");
            if (!hdr) return;

            if (self.progress > 0.5) {
              hdr.style.height = "70px";
              hdr.classList.add("backdrop-blur-3xl");
            } else {
              hdr.style.height = "65px";
              hdr.classList.remove("backdrop-blur-3xl");
            }
          },
        });
      }
    };

    onMounted(async () => {
      language.value = getLanguageFromPath();

      const menus = await buildHeaderMenus();

      const propertyMenu =
        menus.find((m) => (m?.title?.en || "").toLowerCase() === "property collection") || menus[0];

      // 👉 ถ้ามี projectId → ใช้ related project
      let swipeSlides = propertyMenu?.items || [];
      let swipeTitle  = propertyMenu?.title || { th: "Property collection", en: "Property collection" };

      if (projectId.value) {
        const relatedSlides = await buildRelatedProjectSlides(projectId.value);
        if (relatedSlides.length) {
          swipeSlides = relatedSlides;
          swipeTitle = {
            th: "โครงการที่เกี่ยวข้อง",
            en: "Related Projects",
          };
        }
      }

      headerData.value = {
        data: menus,
        swipeSub: {
          title: swipeTitle,
          slides: swipeSlides,
        },
      };


      document.body.removeEventListener("wheel", preventDefault);
      document.addEventListener("click", handleClickOutside);

      mobileReady.value = (headerData.value?.data || []).map(() => false);
      await nextTick();
      init();
await initSubSwiper();  
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    const selectMenu = (data) => {
      const tracking = {
        event: "click_sub_header",
        landing_page,
        section: "header",
        event_action: "click",
        sub_header: data.title[language.value],
      };
      dataLayer.push(tracking);
      window.open(data.url[language.value], data.url.target || "_blank");
    };

    const selectCard = (slide) => {
      const tracking = {
        event: "select_property",
        landing_page,
        section: "header",
        event_action: "click",
      };

      const brand = slide.title?.[language.value];
      const label = slide.label;
      const type = slide.type?.[language.value];
      const location = slide.location?.[language.value];
      const price = slide.price;

      if (brand) tracking.property_brand = brand;
      if (label) tracking.project_label = label.toLowerCase().replace(/ /g, "_");
      if (type) tracking.property_type = type;
      if (location) tracking.property_location = location;
      if (price) tracking.property_price = price;

      dataLayer.push(tracking);
      window.open(slide.url?.[language.value], slide.url?.target || "_blank");
    };

    const currentMenu = computed(() => headerData.value?.data?.[hoveredIdx.value] || null);
    const currentSlides = computed(() => currentMenu.value?.items || []);

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
      mobileReady,
      projectId
    };
  },
});

function setDataLayer(data) {
  dataLayer.push(data);
}
