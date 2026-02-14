"use server";
export default async function getcategory(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  
    

    if (!res.ok) {
      throw new Error("Failed to fetch cat");
    }

    const data = await res.json();

    return data ;
 
    

    
    
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.log("Error fetching cat:", err.message);
  }}
}
