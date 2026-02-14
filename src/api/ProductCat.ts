"use server"
export default async function getProductCat(catId :string) {

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/?category[in]=${catId}`)
  const payload = await response.json();
  

  return payload;
}
