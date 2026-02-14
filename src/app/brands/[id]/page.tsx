import getBrand from "@/api/getBrand";
import React from "react";
import  Image  from 'next/image';

export default async function BrandPage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;

  const res = await getBrand(id);
  
  
  const brand = res?.data; 

  if (!brand) {
    return <p className="text-center mt-10">Brand not found.</p>;
  }

  return (
    <div className="p-4 text-center my-20">
      <h1 className="text-2xl font-bold mb-4">{brand.name}</h1>
      <Image
       src={brand.image}
       alt={brand.name}
       width={100}   
       height={100}  
       className="w-20 h-20 mx-auto mb-2 object-contain"
     />
    </div>
  );
}
