"use server"
import getMyToken from "@/utilites/getMyToken";


export default async function RemoveCartItem(id : string) {

    const  token = await getMyToken();

     if(!token){
        throw new Error('please login to add product');
    }

   const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
        method : 'DELETE',
        headers : {
            token,
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({productId : id}),

    });

    const payload = await res.json();
    return payload

}
