"use client";
import React, { useEffect, useState } from "react";
import { getAllOrders } from "@/api/getAllOrders";
import { motion } from 'framer-motion';

interface User {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface Order {
  _id: string;
  user?: User;
  totalOrderPrice?: number;
  paymentMethodType?: string;
  createdAt?: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data: Order[] = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return  (
    <div className="flex min-h-[60vh] items-center justify-center">
      <motion.div
        className="w-10 h-10 bg-emerald-800 rounded-full"
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      />
    </div>
  );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders.length === 0 ? (
        <p className="text-center my-10">No orders found.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Total Price</th>
              <th className="p-2 text-left">Payment Method</th>
              <th className="p-2 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-2">
                  {order.user?.name || "-"} <br />
                  {order.user?.email || "-"} <br />
                  {order.user?.phone || "-"}
                </td>
                <td className="p-2">{order.totalOrderPrice ?? 0} EGP</td>
                <td className="p-2">{order.paymentMethodType || "-"}</td>
                <td className="p-2">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
