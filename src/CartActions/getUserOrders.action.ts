"use server";

import { UserOrder } from "@/types/userOrder";
import getMyToken from "@/utilites/getMyToken";
import { jwtDecode } from 'jwt-decode';


type TokenPayload = {
  id: string;
};

export default async function getUserOrders(): Promise<UserOrder[]> {
  const token = await getMyToken();
  if (!token) throw new Error("Please login first");

  const decoded = jwtDecode<TokenPayload>(token);
  const userId = decoded.id;

  const res = await fetch(`${process.env.API}/orders/user/${userId}`, {
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user orders");
  }

  const data: UserOrder[] = await res.json();
  return data;
}
