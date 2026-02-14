"use client";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { registerSchemaType } from '@/schema/register.schema';
import { useForm } from 'react-hook-form'
import React from 'react'
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { forgetPasswordApi } from '@/api/forgetPassword';



export default function ForgetPassword() {
  const router = useRouter();

  const form = useForm<registerSchemaType>({
    defaultValues: {
      email: "",
    },
  });

  async function handlePassword(values: registerSchemaType) {
    try {
      await forgetPasswordApi(values.email);
      toast.success("Reset email sent successfully!");
      router.push("/verifycode");
    }
      catch (err: unknown) {
  if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error("Something went wrong");
  }
}

  }

  return (
    <div className='w-1/2 mx-auto my-24'>
      <h1 className='font-bold text-center text-2xl my-2'>Forget Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handlePassword)} className="my-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='my-2'>Email :</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 cursor-pointer w-full py-2 rounded-md">
            Send Reset Email
          </Button>
        </form>
      </Form>
    </div>
  )
}
