import React from 'react'
import Link from 'next/link';
import {

  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { productType } from '@/types/product.type';
import AddBtn from './../AddBtn/AddBtn';
import WishlistButton from '../wishlistButton/WishlistButton';

export default function SingleProduct({ product }: { product: productType }) {
  return (
    <>
      <div key={product._id} className="w-1/2 md:w-1/2 lg:w-1/5 p-2">
        <div className="p-2">
          <Card className='relative p-2 border-0 transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,180,0.3)]'>

            <Link href={`/products/${product._id}`}>
              <CardHeader>
                <CardTitle>
                  <Image
                    src={product.imageCover}
                    width={200}
                    height={200}
                    alt={product.title}
                    className="rounded-md"
                  />
                </CardTitle>

                <CardDescription className="text-emerald-500">
                  {product.category?.name}
                </CardDescription>
              </CardHeader>

              <CardContent className="font-bold">
                <p className="line-clamp-2">{product.title}</p>
              </CardContent>

              <CardFooter>
                <div className="flex justify-between w-full">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fas fa-star text-yellow-500 ml-1"></i>
                  </span>
                </div>
              </CardFooter>
            </Link>


            <div className="flex  justify-center items-center mt-3 gap-2 ">
              <AddBtn id={product._id} />
              <WishlistButton productId={product._id} />

            </div>
          </Card>
        </div>
      </div>

    </>
  )
}
