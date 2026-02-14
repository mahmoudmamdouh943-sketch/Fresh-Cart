"use client";
import getLoggedUserCart from "@/CartActions/getUserCart.action";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type CartProduct = {
  count: number;
  
};


interface CartContextType {
  numberOfCartItem: number;
  setnumberOfCartItem: Dispatch<SetStateAction<number>>;
}


export const CartContext = createContext<CartContextType | undefined>(
  undefined
);


interface CartContextProviderProps {
  children: ReactNode;
}

export default function CartContextProvider({children,}: CartContextProviderProps) {
  const [numberOfCartItem, setnumberOfCartItem] = useState<number>(0);

  async function GetUseCart() {
    try {
      const res = await getLoggedUserCart();

      if (res.status === "success") {
        let sum = 0;
        res.data.products.forEach((product: CartProduct) => {
          sum += product.count;
        });

        setnumberOfCartItem(sum);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    GetUseCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItem, setnumberOfCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
