"use server";
export default async function getBrand(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
      method: "GET",
    
    });

    if (!res.ok) {
      throw new Error("Failed to fetch brand");
    }

    const data = await res.json();
    return data;
  }catch (err: unknown) {
  if (err instanceof Error) {
    console.log("Error fetching brand:", err.message);
  }
}

}
