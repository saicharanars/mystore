'use client';
import React, { useContext, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@ecommerce/ui-kit/ui/lib/ui/card';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@ecommerce/ui-kit/ui';
import { Provider } from 'react-redux';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ecommerce/ui-kit/ui/lib/ui/tabs';
import {
  createuser,
  createuserDto,
  signinDto,
  signinuser,
} from '@ecommerce/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignInMutation, useSignUpMutation } from '../../store/user/api';
import store from '../../store/user/store';
import Image from 'next/image';
import { LoaderCircle } from 'lucide-react';
import AuthContext from '../../store/context/auth';
import { redirect } from 'next/navigation';

const LoginForm = () => {
  const authctx = useContext(AuthContext);
  useEffect(() => {
    console.log(authctx.isLoggedIn);
    if (authctx.isLoggedIn) {
      redirect('/');
    }
  }, [authctx.isLoggedIn]);
  const [
    signup,
    { data: signupresult, isLoading: isSigningUp, error: signupError },
  ] = useSignUpMutation();
  const [
    signin,
    { data: signinresult, isLoading: isSigningIn, error: signinError },
  ] = useSignInMutation();
  const signupform = useForm<createuser>({
    resolver: zodResolver(createuserDto),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'customer',
    },
  });
  const loginform = useForm<signinuser>({
    resolver: zodResolver(signinDto),
  });

  if (signupError) {
    console.log(signupError);
  }
  if (signinresult) {
    authctx.login(signinresult.data.access_token);
  }
  if (signinError) {
    console.log(signinError);
  }
  const handleSignup = async (values: createuser) => {
    try {
      await signup({ user: values });
    } catch (error) {
      console.log('Signup error:', error);
    }
  };

  const handleSignin = async (values: signinuser) => {
    try {
      await signin({ user: values });
    } catch (error) {
      console.log('Signin error:', error);
    }
  };

  return (
    <Card className="w-full mx-auto mt-2 max-w-sm my-5">
      <Image
        loading="lazy"
        alt="Mystore"
        title="Mystore"
        width={125}
        height={32}
        src="https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/636c8d9521cd491a8c9a4723/mystore-logo-blue-200x80.png"
        className="h-auto mx-auto p-2 w-auto my-2"
        ms-data-valign="middle"
      />
      <Tabs defaultValue="signup">
        <TabsList className="grid w-full max-w-sm relative w-auto grid-cols-2 p-1 mt-2 mx-2 bg-blue-50">
          <TabsTrigger value="signup" className="text-blue-500">
            Signup
          </TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        <TabsContent value="signup">
          <CardHeader>
            <CardTitle className="text-2xl">Signup</CardTitle>
            <CardDescription>Enter your email below to signup</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...signupform}>
              <form
                onSubmit={signupform.handleSubmit(handleSignup)}
                className="space-y-3"
              >
                <FormField
                  control={signupform.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupform.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupform.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full rounded-sm mt-4"
                  type="submit"
                  disabled={isSigningUp}
                >
                  {isSigningUp ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Signing Up...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </form>
            </Form>
            {signupresult && (
              <p className="text-green-500">Signup successful!</p>
            )}
            {signupError && (
              <p className="text-red-500">
                Signup failed.{' '}
                {(signupError as string) || 'Please try again later.'}
              </p>
            )}
          </CardContent>
        </TabsContent>
        <TabsContent value="login">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Form {...loginform}>
              <form
                onSubmit={loginform.handleSubmit(handleSignin)}
                className="space-y-3"
              >
                <FormField
                  control={loginform.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginform.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="w-full rounded-sm mt-4" type="submit">
                  {isSigningIn ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </Form>
            {signinresult && (
              <p className="text-green-500">Signin successful!</p>
            )}
            {signinError && (
              <p className="text-red-500">
                Signin failed.{' '}
                {(signinError as string) || 'Please try again later.'}
              </p>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

const Login: React.FC = () => {
  return (
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
};

export default Login;
