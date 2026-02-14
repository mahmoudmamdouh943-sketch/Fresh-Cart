"use server";

import getMyToken from "@/utilites/getMyToken";


export default async function ClearCart() {
    
        const  token = await getMyToken();
    
         if(!token){
            throw new Error('please login to clear product');
        }
    
       const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart` , {
            method : 'DELETE',
            headers : {
                token
            },
  
    
        });
    
        const payload = await res.json();
        return payload;
    
}