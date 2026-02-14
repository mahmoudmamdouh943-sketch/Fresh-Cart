"use client";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import React from 'react';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { verifyCodeApi } from '@/api/verifyCode';

type VerifyCodeFormType = {
  resetCode: string;
};

export default function VerifyCodePage() {
  const router = useRouter();

  const form = useForm<VerifyCodeFormType>({
    defaultValues: {
      resetCode: "",
    },
  });

  async function handleVerify(values: VerifyCodeFormType) {
    try {
      await verifyCodeApi(values.resetCode);
      toast.success("Code verified successfully!");
      router.push("/resetpassword");
    } catch (err: unknown) {
  const message =
    err instanceof Error ? err.message : "Something went wrong";
  toast.error(message);
}

  }

  return (
    <div className='w-1/2 mx-auto my-24'>
      <h1 className='font-bold text-center text-2xl my-2'>Verify Reset Code</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleVerify)} className="my-6">
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='my-2'>Reset Code :</FormLabel>
                <FormControl>
                  <Input type="text" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="mt-4 cursor-pointer w-full py-2 rounded-md"
          >
            Verify Code
          </Button>
        </form>
      </Form>
    </div>
  );
}
