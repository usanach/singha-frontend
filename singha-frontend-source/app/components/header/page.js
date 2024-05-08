import Link from "next/link"
import React from "react"
import HeaderSlide from "./slide/page"

export default async function Header({ backgroundImage }) {
    return (
        <nav className="overflow-x-hidden">
            <div className="bg-bottom bg-cover bg-no-repeat relative" style={{ backgroundImage: "url('" + backgroundImage + "')" }}>
                <div className="container">
                    <div className="flex pt-3 pb-5 relative justify-between">
                        <div>
                            <img className="w-[130px] md:block hidden" src="/residential/logo-desktop-header.svg" />
                            <img className="w-[25px] md:hidden" src="/residential/logo-mobile-header.svg" />
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full flex">
                            <div className="m-auto">
                                <h1 className="uppercase text-white mb-2" style={{ fontFamily: 'The Seasons' }}>
                                    <span className="text-[20px]">R</span>esidential
                                </h1>
                            </div>
                        </div>
                        <div className="flex my-auto gap-3" style={{ fontFamily: 'Gotham' }}>
                            <div className="xl:flex hidden">
                                <div>
                                    <p className="uppercase text-white">PROPERTY COLLECTIONS</p>
                                </div>
                                <div className="my-auto ml-2">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.57757 6.91009C3.90301 6.58466 4.43065 6.58466 4.75609 6.91009L10.0002 12.1542L15.2442 6.91009C15.5697 6.58466 16.0973 6.58466 16.4228 6.91009C16.7482 7.23553 16.7482 7.76317 16.4228 8.0886L10.5894 13.9219C10.264 14.2474 9.73634 14.2474 9.41091 13.9219L3.57757 8.0886C3.25214 7.76317 3.25214 7.23553 3.57757 6.91009Z" fill="white" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-white xl:block hidden">|</span>
                            <div className=" xl:flex gap-2  hidden">
                                <div className="my-auto">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3558_4163)">
                                            <path d="M10.165 0.00213162C10.1384 0.00118423 10.1119 0 10.0851 0C10.0759 0 10.0667 0.000473707 10.0574 0.000710538C10.0383 0.000473707 10.0193 0 10.0001 0C4.4861 0 0 4.48587 0 9.99988C0 15.5139 4.4861 20 10.0001 20C10.0193 20 10.0383 19.9995 10.0574 19.9993C10.0667 19.9995 10.0759 20 10.0851 20C10.1119 20 10.1384 19.9988 10.165 19.9979C15.6032 19.9095 20 15.4589 20 9.99988C20 4.54105 15.6032 0.0904752 10.165 0.00213162ZM17.3279 6.36358H14.3415C14.1501 5.21133 13.8666 4.14931 13.5007 3.23413C13.3889 2.95466 13.27 2.69247 13.1452 2.44709C14.9647 3.20761 16.4528 4.60713 17.3279 6.36358ZM18.182 9.99988C18.182 10.6247 18.1112 11.2331 17.978 11.8181H14.5606C14.6068 11.2244 14.6307 10.6164 14.6307 9.99988C14.6307 9.38361 14.6068 8.77562 14.5606 8.18185H17.978C18.1112 8.76686 18.182 9.37532 18.182 9.99988ZM10.1171 18.1803C10.1003 18.1805 10.0837 18.1808 10.0671 18.181C9.52903 18.163 8.86041 17.3468 8.35806 16.0906C8.07006 15.3708 7.84032 14.5284 7.67382 13.6243H12.4967C12.3302 14.5284 12.1005 15.3708 11.8125 16.0906C11.3141 17.3364 10.6526 18.1493 10.1171 18.1803ZM7.43389 11.8181C7.38415 11.2279 7.35786 10.6197 7.35786 9.99988C7.35786 9.38029 7.38415 8.77207 7.43389 8.18185H12.7366C12.7864 8.77207 12.8124 9.38029 12.8124 9.99988C12.8124 10.6197 12.7864 11.2279 12.7366 11.8181H7.43389ZM1.81827 9.99988C1.81827 9.37532 1.88885 8.75454 2.02219 8.16977H5.61018C5.56399 8.76355 5.53983 9.38361 5.53983 9.99988C5.53983 10.6164 5.56399 11.2244 5.61018 11.8181H2.02219C1.88885 11.2331 1.81827 10.6247 1.81827 9.99988ZM10.0671 1.81898C10.0837 1.81922 10.1003 1.81945 10.1171 1.81969C10.6526 1.85072 11.3141 2.66357 11.8125 3.90938C12.1005 4.62916 12.3302 5.45954 12.4967 6.36358H7.67382C7.84032 5.45954 8.07006 4.62916 8.35806 3.90938C8.86041 2.65315 9.52903 1.83698 10.0671 1.81898ZM7.06962 2.36112C6.92846 2.63089 6.79488 2.92173 6.66982 3.23413C6.3039 4.14931 6.02063 5.21133 5.82902 6.36358H2.67234C3.58159 4.53868 5.15259 3.09913 7.06962 2.36112ZM2.6721 13.6364H5.82902C6.02039 14.7887 6.3039 15.8507 6.66982 16.7659C6.79488 17.0783 6.92846 17.3691 7.06962 17.6389C5.15259 16.9009 3.58159 15.4616 2.6721 13.6364ZM13.1452 17.5529C13.27 17.3075 13.3889 17.0453 13.5007 16.7659C13.8666 15.8507 14.1499 14.7766 14.3415 13.6243H17.3279C16.4528 15.3808 14.9647 16.7924 13.1452 17.5529Z" fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3558_4163">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="my-auto">
                                    <p className="uppercase text-white">eng</p>
                                </div>
                                <div className="my-auto">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.57757 6.91009C3.90301 6.58466 4.43065 6.58466 4.75609 6.91009L10.0002 12.1542L15.2442 6.91009C15.5697 6.58466 16.0973 6.58466 16.4228 6.91009C16.7482 7.23553 16.7482 7.76317 16.4228 8.0886L10.5894 13.9219C10.264 14.2474 9.73634 14.2474 9.41091 13.9219L3.57757 8.0886C3.25214 7.76317 3.25214 7.23553 3.57757 6.91009Z" fill="white" />
                                    </svg>
                                </div>
                            </div>
                            <div className="my-auto">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 4.99935C2.5 4.53911 2.8731 4.16602 3.33333 4.16602H16.6667C17.1269 4.16602 17.5 4.53911 17.5 4.99935C17.5 5.45959 17.1269 5.83268 16.6667 5.83268H3.33333C2.8731 5.83268 2.5 5.45959 2.5 4.99935ZM2.5 9.99935C2.5 9.53911 2.8731 9.16602 3.33333 9.16602H16.6667C17.1269 9.16602 17.5 9.53911 17.5 9.99935C17.5 10.4596 17.1269 10.8327 16.6667 10.8327H3.33333C2.8731 10.8327 2.5 10.4596 2.5 9.99935ZM2.5 14.9993C2.5 14.5391 2.8731 14.166 3.33333 14.166H16.6667C17.1269 14.166 17.5 14.5391 17.5 14.9993C17.5 15.4596 17.1269 15.8327 16.6667 15.8327H3.33333C2.8731 15.8327 2.5 15.4596 2.5 14.9993Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#1A2F4D] w-full py-10 relative">
                <div className="container mx-auto">
                    <div className="flex gap-10">
                        <div className="min-w-[270px]">
                            <div className="block">
                                <ul className="flex flex-col">
                                    <li className="flex gap-4 text-white p-5 relative">
                                        <hr className="w-[5px.0] h-[25px] bg-[#948668] border-0 my-auto absolute top-1/2 -translate-y-1/2 left-0" />
                                        <p className="my-auto text-[20px]">Property collection</p>
                                    </li>
                                    <li>
                                        <Link href={"/"} className="flex gap-4 text-white p-5 hover:bg-[#2D4F7F]">
                                            <p className="my-auto text-[20px]">Stories</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/"} className="flex gap-4 text-white p-5 hover:bg-[#2D4F7F]">
                                            <p className="my-auto text-[20px]">Our services</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={"/"} className="flex gap-4 text-white p-5 hover:bg-[#2D4F7F]">
                                            <p className="my-auto text-[20px]">About S residences</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="w-full">
                            <HeaderSlide></HeaderSlide>
                        </div>
                    </div>
                </div>
            </div>
        </nav>)
}
