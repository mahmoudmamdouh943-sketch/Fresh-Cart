"use client";
import React, { useContext, useState, useEffect } from "react";
import { WishlistContext } from "@/context/WishlistContext";
import getMyToken from "@/utilites/getMyToken";

interface WishlistButtonProps {
  productId: string;
}

export default function WishlistButton({ productId }: WishlistButtonProps) {
  const wishlistContext = useContext(WishlistContext);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!wishlistContext) throw new Error("WishlistContext is not provided");

  const { wishlistProducts, refreshWishlist } = wishlistContext;

  useEffect(() => {
    setIsInWishlist(wishlistProducts.some(p => p._id === productId));
  }, [wishlistProducts, productId]);

  async function handleToggleWishlist() {
    setLoading(true);

    const token = await getMyToken(); 
    if (!token) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    try {
      const method = isInWishlist ? "DELETE" : "POST";
      const url = isInWishlist
        ? `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`
        : "https://ecommerce.routemisr.com/api/v1/wishlist";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: isInWishlist ? null : JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (res.ok) {
        await refreshWishlist(); 
      } else {
        console.error(data.message || "Failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleToggleWishlist} disabled={loading} className="text-3xl cursor-pointer">
      {isInWishlist ? <span className="text-red-600 text-4xl hover:text-red-800">♥</span> : <span className="text-gray-400 text-4xl">♡</span>}
    </button>
  );
}
