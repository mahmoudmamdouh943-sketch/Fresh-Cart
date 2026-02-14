"use client";
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { CategoryType } from '@/types/category.type';

export default function CategorySwiper({ data }: { data: CategoryType[] }) {
  return (
    <>
      <div className='container w-[80%] mx-auto text-center'>
        <h1 className='text-slate-500 my-2 font-bold'> shop popular categories </h1>

        <Swiper
          spaceBetween={0}
          slidesPerView={7}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            320: {
              slidesPerView: 3,

            },
            // when window width is >= 480px
            480: {
              slidesPerView: 3,

            },
            // when window width is >= 640px
            640: {
              slidesPerView: 7,

            }
          }}>
          {data.map((category) => <SwiperSlide key={category._id}>   <Image src={category.image} width={200} height={200} alt={category.name} loading="eager" className="object-cover w-full h-[150px]" />
            <p className='font-bolder bg-emerald-600 text-white line-clamp-1'>{category.name}</p>
          </SwiperSlide>)}


        </Swiper>

      </div>



    </>
  )
}
