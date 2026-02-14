"use client";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import React from 'react';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { resetPasswordApi } from '@/api/resetPassword';

type ResetPasswordFormType = {
  email: string;
  newPassword: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();

  const form = useForm<ResetPasswordFormType>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  async function handleReset(values: ResetPasswordFormType) {
    try {
      await resetPasswordApi(values.email, values.newPassword);
      toast.success("Password reset successfully!");
      router.push("/login");
    } catch (err: unknown) {
  const message =
    err instanceof Error ? err.message : "Something went wrong";
  toast.error(message);
}

  }

  return (
    <div className='w-1/2 mx-auto my-24'>
      <h1 className='font-bold text-center text-2xl my-2'>Reset Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleReset)} className="my-6">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='my-2'>Email :</FormLabel>
                <FormControl>
                  <Input type="email" {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='my-2'>New Password :</FormLabel>
                <FormControl>
                  <Input type="password" {...field} required autoComplete="new-password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4 cursor-pointer w-full py-2 rounded-md">
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
}
