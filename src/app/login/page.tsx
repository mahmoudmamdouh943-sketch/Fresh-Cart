"use client";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema, loginSchemaType } from '@/schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver : zodResolver(loginSchema)
  });

  async function handleLogin(values: loginSchemaType){

  setLoading(true); 

  try {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: '/',
    });

    if (response?.ok) {
      toast.success("You logged in successfully");
      window.location.href = "/";
    } else {
      toast.error(response?.error || "Invalid email or password");
    }
  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false); 
  }
}

 

  return (
    <div className='w-1/2 mx-auto'>
      <h1 className='font-bold text-center text-2xl my-2'>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="my-6">

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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='my-2'>Password :</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-2 rounded-md flex items-center justify-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </Form>
       <p
        className=" text-center mt-1 text-blue-600 hover:underline cursor-pointer"
        onClick={() => router.push("/forgetpassword")}
      >
        Forgot Password?
      </p>
    </div>
  );
}
