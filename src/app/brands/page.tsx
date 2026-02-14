import allBrands from "@/api/allBrands";
import Link from "next/link";
import React from "react";
import  Image  from 'next/image';


export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


export default async function Brands() {
  const { data } = await allBrands(); 

  

  return (
    
    <div className="p-4">
      
      <h1 className="text-2xl font-bold mb-4">Brands</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.length > 0 ? (
          data.map((brand : Brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`} 
              className="border p-2 text-center cursor-pointer block hover:shadow-md rounded"
            >
            <Image
  src={brand.image}
  alt={brand.name}
  width={100}   
  height={100}  
  className="w-20 h-20 mx-auto mb-2 object-contain"
/>
              <p>{brand.name}</p>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center">No brands found.</p>
        )}
      </div>
    </div>
  );
}
