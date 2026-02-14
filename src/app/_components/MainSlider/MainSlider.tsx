"use client";
import React from 'react'
import  Image  from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import image1 from '../../../../public/ecomer.webp';

import image2 from '../../../../public/ecom2.jpg';

import image3 from '../../../../public/ecom3.webp';
import { Autoplay } from 'swiper/modules';



export default function MainSlider() {
  return (
    <div className=' w-full lg:w-[80%] mx-auto p-4 flex' >

        <div className='w-3/4'>

         <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay={{delay: 2000}}
     
    >
      <SwiperSlide>
  <div className="relative w-full h-[400px]">
    <Image   src={image1}   alt="pic1"   fill   className="object-cover" />
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="relative w-full h-[400px]">
    <Image    src={image2}      alt="pic2"      fill    className="object-cover" />
  </div>
</SwiperSlide>

<SwiperSlide>
  <div className="relative w-full h-[400px]">
    <Image src={image3}   alt="pic3"   fill  className="object-cover"/>
  </div>
</SwiperSlide>

    </Swiper>

        </div>
        <div className='w-1/4'>
         < Image src={image2} width={100} height={100} className='w-full object-cover h-[200px] ' alt='pic'/>
        < Image src={image3} width={100} height={100} className='w-full object-cover h-[200px] ' alt='pic'/>

        </div>
    </div>
  )
}
