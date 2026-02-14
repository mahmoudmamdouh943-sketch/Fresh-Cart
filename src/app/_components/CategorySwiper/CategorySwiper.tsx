"use client";
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import  Image  from 'next/image';
import { CategoryType } from '@/types/category.type';

export default function CategorySwiper({data} : {data : CategoryType[]}) {
  return (
    <>
    <div className='w-[80%]  mx-auto'>
        <h1 className='text-slate-500 my-2 '> shop popular categories </h1>

 <Swiper
      spaceBetween={0}
      slidesPerView={7}
      modules={[Autoplay]}
      autoplay={{delay: 2000}}>
        {data.map((category ) =>  <SwiperSlide key={category._id}>   <Image  src={category.image} width={200} height={200} alt={category.name}   loading="eager" className="object-cover w-full h-[150px]" />
        <p className='text-center font-bold'>{category.name}</p>
        </SwiperSlide> )}
     
   
    </Swiper>

    </div>
    
      

    </>
  )
}
