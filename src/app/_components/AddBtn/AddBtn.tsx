"use client";
import AddToCart from "@/CartActions/addToCart.action";
import { Button } from '@/components/ui/button';
import { CartContext } from "@/context/CartContext";
import { deleteFromWishlist } from "@/CartActions/wishlistActions";
import { WishlistContext } from "@/context/WishlistContext";
import React, { useContext } from 'react';
import toast from 'react-hot-toast';

export default function AddBtn({id} : {id :string}) {

  const cartContext = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);

  if (!cartContext) throw new Error('Cart context not found');
  if (!wishlistContext) throw new Error('Wishlist context not found');

  const { numberOfCartItem, setnumberOfCartItem } = cartContext;
  const { refreshWishlist } = wishlistContext;

  async function handleAddToCartAndRemoveFromWishlist(id: string) {
    try {
      // 1️⃣ إضافة للكارت
      const res = await AddToCart(id);
      if (res.status === 'success') {
        toast.success('Product added to cart successfully');
        setnumberOfCartItem(numberOfCartItem + 1);

        // 2️⃣ إزالة من الويشليست
        await deleteFromWishlist(id);
        await refreshWishlist();
      } else {
        toast.error('Could not add product. Please log in first.');
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Can't add this product successfully. Please log in first.";
      toast.error(message);
    }
  }

  return (
    <Button
      onClick={() => handleAddToCartAndRemoveFromWishlist(id)}
      className="w-[70%] mx-auto cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
    >
      Add to Cart
    </Button>
  );
}
