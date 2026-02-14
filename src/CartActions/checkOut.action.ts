"use server";
import getMyToken from "@/utilites/getMyToken";

type ShippingAddressType = {
  details: string;
  phone: string;
  city: string;
};


export async function checkOutLine(
  cartId: string,
  url?: string,
  shippingAddress?: ShippingAddressType
) {
  const token = await getMyToken();
  if (!token) throw new Error("Please login first");

  const baseUrl = url || process.env.NEXTAUTH_URL || "http://localhost:3000";

  const res = await fetch(
    `${process.env.API}/orders/checkout-session/${cartId}?url=${baseUrl}`,
    {
      method: "POST",
      headers: {
        token, 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingAddress }),
    }
  );

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.message || "Checkout failed");
  }

  return payload;
}

export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddressType
) {
  const token = await getMyToken();
  if (!token) throw new Error("Please login first");

  const res = await fetch(`${process.env.API}/orders/${cartId}`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shippingAddress }),
  });

  const payload = await res.json();

  if (!res.ok) {
    throw new Error(payload.message || "Cash order failed");
  }

  return payload;
}
