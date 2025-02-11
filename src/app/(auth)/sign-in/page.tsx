'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to True Feedback
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit">Sign In</Button>
            <Button className='w-full flex items-center justify-center' onClick={() => signIn('google')}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.15 0 5.9 1.15 8.1 3.05l6-6C34.9 3.5 29.8 1.5 24 1.5 14.8 1.5 7.1 7.55 4.1 15.45l7.45 5.8C13.4 15.4 18.2 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24c0-1.6-.15-3.15-.45-4.65H24v9.3h12.75c-.55 2.85-2.15 5.25-4.55 6.85l7.45 5.8C43.9 37.45 46.5 31.15 46.5 24z"/>
                <path fill="#FBBC05" d="M7.55 28.55c-1.15-2.85-1.15-5.95 0-8.8L.1 13.95C-2.25 18.45-2.25 29.55.1 34.05l7.45-5.5z"/>
                <path fill="#34A853" d="M24 46.5c5.8 0 10.9-1.95 14.55-5.3l-7.45-5.8c-2.15 1.45-4.85 2.3-7.1 2.3-5.8 0-10.75-3.95-12.55-9.3l-7.45 5.8C7.1 42.45 14.8 46.5 24 46.5z"/>
              </svg>
              Sign in with Google
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
