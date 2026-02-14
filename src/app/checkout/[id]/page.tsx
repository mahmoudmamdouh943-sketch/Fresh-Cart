"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { adressSchema, adressSchemaType } from "@/schema/adress.schema";
import { checkOutLine, createCashOrder } from "@/CartActions/checkOut.action";
import ClearCart from "@/CartActions/clearCartItem.action";
import { CartContext } from "@/context/CartContext";

export default function Checkout() {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const { setnumberOfCartItem } = useContext(CartContext)!;

  const form = useForm<adressSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(adressSchema),
  });

  async function handleCheckout(values: adressSchemaType) {
    const res = await checkOutLine(id, "", values);

    if (res.status === "success") {
      // الدفع أونلاين، إعادة التوجيه لصفحة الدفع
      window.location.href = res?.session?.url;
    } else {
      toast.error("Checkout failed");
    }
  }

  async function handleCashOrder(values: adressSchemaType) {
    const res = await createCashOrder(id, values);

    if (res.status === "success") {
      await ClearCart();           
      setnumberOfCartItem(0);      
      toast.success("Cash order created successfully!");
      router.push("/orders");
    } else {
      toast.error("Cash order failed");
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-8 border">
        <h1 className="font-bold text-center text-3xl mb-6 text-emerald-600">
          Checkout
        </h1>

        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Address Details</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Street, Apt, etc."
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      {...field}
                      placeholder="01012345678"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">City</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="City name"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                className="w-1/2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer"
                onClick={form.handleSubmit(handleCheckout)}
              >
                Pay Online
              </Button>

              <Button
                type="button"
                className="w-1/2 py-3 rounded-xl bg-gray-700 hover:bg-gray-800 text-white font-semibold cursor-pointer"
                onClick={form.handleSubmit(handleCashOrder)}
              >
                Pay Cash
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
