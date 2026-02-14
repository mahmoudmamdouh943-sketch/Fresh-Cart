"use client";
import { Swiper, SwiperSlide } from 'swiper/react';

// import React from 'react'
import 'swiper/css';

import img1 from "../../../../public/images/slider-image-1.jpeg"
import img2 from "../../../../public/images/slider-image-2.jpeg"
import img3 from "../../../../public/images/slider-image-3.jpeg"

import img4 from "../../../../public/images/grocery-banner-2.jpeg"
import img5 from "../../../../public/images/grocery-banner.png"
import Image from 'next/image'
import { Autoplay } from 'swiper/modules';



export default function Minslider() {
    return (
        <>
            <div className="container w-full lg:w-[80%] mx-auto my-6 grid grid-cols-1 lg:grid-cols-4 pt-10">

                {/* Swiper */}
                <div className="col-span-1 lg:col-span-3">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        slidesPerView={1}
                        spaceBetween={0}
                    >
                        <SwiperSlide>
                            <Image className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover" src={img1} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover" src={img2} alt="" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image className="w-full h-[250px] sm:h-[350px] lg:h-[500px] object-cover" src={img3} alt="" />
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* Side Images */}
                <div className="grid grid-cols-2 lg:grid-cols-1 ">
                    <Image className="w-full h-[200px] lg:h-[250px] object-cover object-right" src={img4} alt="" />
                    <Image className="w-full h-[200px] lg:h-[250px] object-cover" src={img1} alt="" />
                </div>

            </div>
        </>
    )
}
