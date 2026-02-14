
import { Order } from '@/types/order';

export async function getAllOrders(): Promise<Order[]> {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/orders/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
     
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  const data = await res.json();
  return data.data as Order[];
}
