import React from 'react'

import getProducts from '@/api/products.api'
import SingleProduct from '../_components/SingleProduct/SingleProduct'
import { productType } from '@/types/product.type'

export default async function Products() {

  const data = await getProducts()
  return (
    <>
    <div className='container w-[80%] mx-auto my-12'>

  <div className="flex flex-wrap">
 {data.map((currentproduct : productType) => (

      <SingleProduct product={currentproduct} key={currentproduct.id}/>
    ))}
    </div>

    </div>
  
   
    
    </>
  )
}
