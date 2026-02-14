"use client";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { registerSchema , registerSchemaType } from '@/schema/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver : zodResolver(registerSchema)
  });

  async function handleRegister(values : registerSchemaType){
    setLoading(true);
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
  
      if (response.data.message === 'success') {
        toast.success('You registered successfully');
        router.push('/login');
      }
    } catch (err : unknown) {
      if (err instanceof AxiosError){
        toast.error(err?.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-1/2 mx-auto'>
      <h1 className='font-bold text-center text-2xl my-2'>Register now</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className="my-6">

    
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='my-2'>Name :</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        
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

       
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='my-2'>Repassword :</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
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
                <FormLabel className='my-2'>Phone :</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
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
              "Register"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
