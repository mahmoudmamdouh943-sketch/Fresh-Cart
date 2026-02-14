
import React from 'react'
import  Image  from 'next/image';
import { productType } from '@/types/product.type';
import AddBtn from '../AddBtn/AddBtn';


export default function Details({data} : {data :productType} ) {

  return (
    <>
    <div className="container w-full lg:w-[80%] mx-auto p-4 flex items-center">


    <div className='w-1/4'>
<div className="p-4">
    <Image src={data.imageCover} width={100} height={100} alt="pic" className='w-full' />
</div>
    
    </div>
      <div className='w-3/4'>
      <h1 className='text-2xl font-bold my-4'>{data.title}</h1>
      <p>{data.description}</p>
      <p className='text-emerald-600 my-2'>{data.category.name}</p>
        <div className=' flex justify-between w-full my-4'>
<span>{data.price} EGP</span>

<span>{data.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
  </div>
  <AddBtn id={data.id}/>
      </div>

</div>

    
    </>
  )
}
