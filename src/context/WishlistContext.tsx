"use client";
import React, { createContext, useEffect, useState, ReactNode, useCallback } from "react";
import getMyToken from "@/utilites/getMyToken";
import { WishlistProduct } from "@/types/wishlist.type";   

interface WishlistContextType {
  wishlistCount: number;
  wishlistProducts: WishlistProduct[];
  refreshWishlist: () => Promise<void>;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

const baseUrl = "https://ecommerce.routemisr.com/api/v1";

export default function WishlistProvider({ children }: WishlistProviderProps) {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>([]);

  const fetchWishlist = useCallback(async () => {
    try {
      const token = await getMyToken();
      if (!token) return;

      const res = await fetch(`${baseUrl}/wishlist`, {
        method: "GET",
        headers: {
          token,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch wishlist");

      const data = await res.json();

      setWishlistProducts(data.data || []);
      setWishlistCount(data.data?.length || 0);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount,
        wishlistProducts,
        refreshWishlist: fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
