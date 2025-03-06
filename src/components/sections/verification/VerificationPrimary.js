'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {useSearchParams} from "next/navigation";
import React, {useEffect} from "react";
import {toast} from "sonner";
import Spinner from '@/components/ui/Spinner'
import useVerifyUserMutation from "@/hooks/useVerifyUserMutation";

const formSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function VerificationPrimary() {
  const code = useSearchParams()?.get("code");

  // useEffect(() => {
  //   if (code) {
  //     console.log(code); // Access your query parameters here
  //   }
  // }, [code]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending } = useVerifyUserMutation()

  function onSubmit(values) {
    const data = { code, password: values.password }
    mutate({ code, password: values.password }, {
      onSuccess: (response) => {
        toast.success('Password created successfully!');
        router.push('/login')
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || error?.message || 'Failed to create password!');
      }
    })
  }

  return (
    <div className="ltn__login-area mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="account-login-inner section-bg-1">
              <div className="tw-flex tw-items-center tw-justify-center tw-p-2 tw-mt-56">
                <div className="tw-w-full tw-max-w-md tw-py-5">
                  <CardHeader className="tw-space-y-4">
                    <div className="tw-flex tw-justify-center">
                      <div className="tw-bg-primary/10 tw-p-3 tw-rounded-full tw-animate-bounce">
                        <KeyRound className="tw-w-6 tw-h-6 tw-text-primary" />
                      </div>
                    </div>
                    <CardTitle className="tw-text-2xl tw-font-bold tw-text-center">
                      Create Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="tw-space-y-6">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Enter your password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="tw-text-red-500" />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Confirm your password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="tw-text-red-500" />
                            </FormItem>
                          )}
                        />
                        <button type="submit" className="theme-btn-1 btn reverse-color btn-block tw-w-full" disabled={isPending}>
                          {isPending ? (
                            <div className="tw-flex tw-justify-center tw-items-center">
                              <Spinner/>
                              Please Wait...
                            </div>
                          ) : (
                            "Create Password"
                          )}
                        </button>
                      </form>
                    </Form>
                  </CardContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}