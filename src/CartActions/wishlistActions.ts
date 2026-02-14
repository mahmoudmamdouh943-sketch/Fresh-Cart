"use server";

import getMyToken from "@/utilites/getMyToken";

export async function deleteFromWishlist(productId: string) {
  const token = await getMyToken();
  if (!token) throw new Error("No token found");

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to delete product");
  }

  return true;
}
