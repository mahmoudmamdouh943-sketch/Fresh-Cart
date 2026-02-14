"use server";

export default async function allBrands() {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands");

    if (!res.ok) {
      throw new Error("Failed to fetch brands");
    }

    const data = await res.json();
    return data;
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.log("Error fetching brands:", err.message);
  } }
}
