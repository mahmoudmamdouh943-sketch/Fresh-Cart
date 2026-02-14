import React from 'react'
import SelectedProducts from '@/api/SelectedProducts';
import Details from './../../_components/Details/Details';
import getProductCat from '@/api/ProductCat';
import { productType } from '@/types/product.type';
import SingleProduct from '@/app/_components/SingleProduct/SingleProduct';

export default async function ProductDetails({params}: {params : Promise<{id : string}>}) {
     const {id} = await params;
    

     const data = await SelectedProducts(id);

     if(!data) return <h1>No products here</h1>
     const relatedProducts = await getProductCat(data.category._id);
    
  return (

    <>
<Details data={data}/>

 <div className='container w-[80%] mx-auto my-12'>

  <div className="flex flex-wrap">
 {relatedProducts.data.map((currentproduct : productType) => (

      <SingleProduct product={currentproduct} key={currentproduct.id}/>
    ))}
    </div>

    </div>

    </>
  )
}
