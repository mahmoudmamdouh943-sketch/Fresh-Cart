"use client";
import React, { useContext, useEffect, useState } from "react";
import { WishlistContext } from "@/context/WishlistContext";
import AddBtn from "../_components/AddBtn/AddBtn";
import { deleteFromWishlist } from "../../CartActions/wishlistActions";
import { motion } from "framer-motion";
import Image from "next/image";
import { WishlistProduct } from "@/types/wishlist.type";

export default function WishlistPage() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("WishlistContext is not provided");

  const { wishlistProducts, refreshWishlist } = context;
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<string[]>([]);

  async function handleDelete(productId: string) {
    setDeletingIds((prev) => [...prev, productId]);
    try {
      await deleteFromWishlist(productId);
      await refreshWishlist();
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingIds((prev) => prev.filter((id) => id !== productId));
    }
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      await refreshWishlist();
      setLoading(false);
    }
    load();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col gap-3 min-h-[60vh] items-center justify-center">
        <motion.div
          className="w-10 h-10 bg-emerald-800 rounded-full"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        />
       
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-emerald-600">
        My Wishlist
      </h1>

      {wishlistProducts.length === 0 ? (
        <p className="text-center my-20 text-gray-500 text-lg">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product: WishlistProduct) => (
            <div
              key={product._id}
              className="border rounded-2xl p-4 shadow-lg relative bg-white hover:shadow-xl transition"
            >
              <Image
                width={100}
                height={100}
                src={product.imageCover}
                alt={product.title}
                className="w-full h-48 object-cover mb-4 rounded-xl"
              />
              <h2 className="font-semibold text-lg line-clamp-1">
                {product.title}
              </h2>
              <p className="text-gray-500 text-sm line-clamp-2">
                {product.description ?? "No description available"}
              </p>
              <p className="text-emerald-600 font-bold text-lg mt-2">
                {product.price} EGP
              </p>

              <div className="flex justify-between mt-4">
                <AddBtn id={product._id}  />
                <button
                  disabled={deletingIds.includes(product._id)}
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 ml-2 cursor-pointer bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {deletingIds.includes(product._id)
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
