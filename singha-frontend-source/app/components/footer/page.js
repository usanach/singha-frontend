import React from "react"

export default async function Footer() {
    return (
        <div className="bg-[#E9E2DC] py-20 text-[#1A2F4D]" style={{ fontFamily: 'Gotham' }}>
            <div className="container">
                <div className="flex flex-wrap">
                    <div className="md:w-1/2 w-full">
                        <div className="flex flex-col gap-3">
                            <img src="./residential/logo-footer.svg" className="w-[220px] md:mx-0 mx-auto" />
                            <p className="uppercase mt-5 md:text-left text-center"><b>singha estate pcl.</b></p>
                            <p className="md:text-left text-center">123 Suntowers Building B, 22nd Floor, Vibhavadi-Rangsit Road, Chom Phon, Chatuchak, Bangkok 10900</p>
                        </div>
                    </div>

                    <hr className="border border-[#D1BFAF] my-10 w-full md:hidden" />
                    <div className="md:w-1/2 w-full flex">
                        <div className="ml-auto md:mr-0 mr-auto mt-auto flex flex-col">
                            <div>
                                <h2 className="uppercase text-[35px] text-right">
                                    <b>call 1221</b>
                                </h2>
                            </div>
                            <div className="flex gap-3 ml-auto md:mr-0 mr-auto">
                                <div><img src="./line.svg" /></div>
                                <div><img src="./facebook.svg" /></div>
                                <div><img src="./ig.svg" /></div>
                                <div><img src="./youtube.svg" /></div>
                            </div>
                            <div className="md:flex lg:gap-4 mt-3 lg:flex-row flex-col hidden">
                                <div>
                                    <a href="">
                                        <span className="lg:hidden text-[#D1BFAF]">|</span> Contact Us
                                    </a>
                                </div>
                                <div className="text-[#D1BFAF] lg:block hidden">|</div>
                                <div>
                                    <a href="">
                                        <span className="lg:hidden text-[#D1BFAF]">|</span> Venue Rentals
                                    </a>
                                </div>
                                <div className="text-[#D1BFAF] lg:block hidden">|</div>
                                <div>
                                    <a href="">
                                        <span className="lg:hidden text-[#D1BFAF]">|</span> Feedback & Enquiries
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="border border-[#D1BFAF] my-10" />
                <div className="flex justify-between flex-wrap gap-3">
                    <div className="md:flex gap-3 md:ml-0 ml-auto mr-auto hidden">
                        <div>
                            <a href="">
                                Report Vulnerability
                            </a>
                        </div>
                        <div className="text-[#D1BFAF]">|</div>
                        <div>
                            <a href="">
                                Privacy Statement
                            </a>
                        </div>
                        <div className="text-[#D1BFAF]">|</div>
                        <div>
                            <a href="">
                                Terms of Use
                            </a>
                        </div>
                        <div className="text-[#D1BFAF]">|</div>
                        <div>
                            <a href="">
                                Legal
                            </a>
                        </div>
                    </div>
                    <div className="md:text-right text-center ml-auto md:mr-0 mr-auto">
                        Copyright © 2023, Singha Estate Public Company Limited.
                    </div>
                </div>
            </div>
        </div>
    )
}
