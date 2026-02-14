"use client";
import React, { useContext, useEffect, useState } from 'react'
import  Image  from 'next/image';
import getLoggedUserCart from '@/CartActions/getUserCart.action';
import toast from 'react-hot-toast';
import RemoveCartItem from '@/CartActions/removeCartitem.action';
import updateCartQuantity from '@/CartActions/updateCartQuantity.action';
import ClearCart from '@/CartActions/clearCartItem.action';
import { CartContext } from '@/context/CartContext';
import Link from 'next/link';
import { CartProductType } from './../../types/cart.type';

export default function Cart() {

const [products , setproducts] = useState([]);
const [isLoading , setisLoading] = useState(true);
const [removeDesable , setremoveDesable] = useState(false);
const [updateDesable , setupdateDesable] = useState(false);
const [updateloading , setupdateloading] = useState(false);
const [currentId , setcurrentId] = useState('');
 const {numberOfCartItem, setnumberOfCartItem} = useContext(CartContext)!;
 const [total , settotal] = useState(0);
 const [cartId , setcartId] = useState('')


  
  

 async function getusercart() {
         
         try{
          const res = await getLoggedUserCart() ;   

             if (res.status === 'success'){   
              
             settotal(res.data.totalCartPrice);
            
             
             setcartId(res.cartId)
            setproducts(res.data.products);
           
            setisLoading(false)
        }

         }
         catch (err: unknown) {
  if (err instanceof Error) {
    toast.error(`Failed to add product: ${err.message}`);
  } else {
    toast.error("Can't add this product successfully");
  }
  setisLoading(false);
}

         
         
       
       
  
  }

  async function deleteProduct(id :string) {
    setremoveDesable(true);
      setupdateDesable(true);
    const res = await RemoveCartItem(id);
    if(res.status === 'success'){
      setproducts(res.data.products)
      toast.success('product deleted successfully');
      let sum =0
      res.data.products.forEach((product : CartProductType)=> {
        sum+= product.count
      })
      getusercart();
      setnumberOfCartItem(sum);
      setremoveDesable(false);
        setupdateDesable(false);

    }
    else{
            toast.error(' cant delete this product ');
            setremoveDesable(false)


    }
    
  }
  
async function updateProduct(id:string , count:string , sign : string){
  setcurrentId(id);
  setupdateloading(true);
  setupdateDesable(true);
  setremoveDesable(true);
const res= await  updateCartQuantity(id , count);
if (res.status === 'success'){
  setproducts(res.data.products)
  toast.success('product update successfully')
  if(sign === '+'){
    setnumberOfCartItem(numberOfCartItem +1)
  }
  else if(sign === '-'){
    setnumberOfCartItem(numberOfCartItem -1)
  }
getusercart();
  setupdateloading(false);
  setupdateDesable(false);
   setremoveDesable(false);
}
else{
  toast.error('cant update successfully')
  setupdateloading(false)
  setupdateDesable(false)
   setremoveDesable(false);
}
}

async function clear(){
  const res = await ClearCart()
  if(res.message === 'success'){
    getusercart()
    setnumberOfCartItem(0);
  }
}


  useEffect(() => {
    
  getusercart()
    
    }, [])


    if(isLoading){
     return  <div className='my-28 text-4xl text-center text-emerald-600'>
    <i className="fa-solid fa-spinner fa-spin"></i>
</div>
    }

    else{

    }
  

  return (
    <>



   {products.length > 0 ? (
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 w-[80%] mx-auto">
    
   
    <div className="flex justify-end gap-2 mb-4">
      <button
        onClick={() => clear()}
        className="bg-red-500 hover:bg-red-700 text-white cursor-pointer px-4 py-2 rounded-3xl transition-colors"
      >
        Clear All
      </button>

      <Link href={`/checkout/${cartId}`}>
        <button className="bg-black hover:bg-gray-800 text-white cursor-pointer px-4 py-2 rounded-3xl transition-colors">
          Payment
        </button>
      </Link>
    </div>

    
    <h1 className="text-center text-2xl font-bold text-emerald-700 my-4">
      Total Cart Price : {total} EGP
    </h1>

    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs uppercase bg-gray-50 text-gray-700">
        <tr>
          <th scope="col" className="px-16 py-3">
            <span className="sr-only">Image</span>
          </th>
          <th scope="col" className="px-6 py-3">Product</th>
          <th scope="col" className="px-6 py-3">Qty</th>
          <th scope="col" className="px-6 py-3">Price</th>
          <th scope="col" className="px-6 py-3">Action</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product : CartProductType) => (
          <tr
            key={product._id}
            className="bg-white border-b hover:bg-gray-50"
          >
          
            <td className="p-4">
              <Image
                src={product.product.imageCover}
                className="w-16 md:w-32 object-cover rounded-md"
                height={500}
                width={500}
                alt={product.product.title}
              />
            </td>

          
            <td className="px-6 py-4 font-semibold text-gray-900">
              {product.product.title}
            </td>

           
            <td className="px-6 py-4">
              <div className="flex items-center">
           
                <button
                  disabled={updateDesable}
                  onClick={() =>
                    updateProduct(product.product.id, `${product.count - 1 }`, "-")
                  }
                  className="disabled:bg-slate-300 inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border rounded-full hover:bg-gray-100 transition"
                  type="button"
                >
                  <svg className="w-3 h-3" viewBox="0 0 18 2" fill="none">
                    <path d="M1 1h16" stroke="currentColor" strokeWidth={2} />
                  </svg>
                </button>

              
                <div className="mx-3">
                  {product.product.id === currentId && updateloading ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <span>{product.count}</span>
                  )}
                </div>

             
                <button
                  disabled={updateDesable}
                  onClick={() =>
                    updateProduct(product.product.id,  `${product.count + 1}`, "+")
                  }
                  className="disabled:bg-slate-300 inline-flex items-center justify-center h-6 w-6 p-1 text-sm font-medium text-gray-500 bg-white border rounded-full hover:bg-gray-100 transition"
                  type="button"
                >
                  <svg className="w-3 h-3" viewBox="0 0 18 18" fill="none">
                    <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth={2} />
                  </svg>
                </button>
              </div>
            </td>

           
            <td className="px-6 py-4 font-semibold text-gray-900">
              {product.price * product.count} EGP
            </td>

           
            <td className="px-6 py-4">
              <button
                disabled={removeDesable}
                onClick={() => deleteProduct(product.product.id)}
                className="text-red-600 hover:underline disabled:bg-slate-800 cursor-pointer disabled:text-white disabled:cursor-not-allowed px-2 py-1 rounded-md"
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  <h1 className="text-center font-bold my-12 text-3xl text-red-600">
    No products added yet !
  </h1>
)}

    
    </>
  )
  
}
