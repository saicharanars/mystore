import {
  Alert,
  AlertDescription,
  CardDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@ecommerce/ui-kit/ui';
import { Link, useNavigate } from '@tanstack/react-router';
import React, { useContext, useEffect } from 'react';
import AuthContext from '../store/context/Authcontext';
import { useSignInMutation } from '../store/user/api';
import { useForm } from 'react-hook-form';
import { signinDto, signinuser } from '@ecommerce/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';

const Loginform = () => {
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(authctx.isLoggedIn);
    console.log(import.meta.env.BACKEND_URL);
    if (authctx.isLoggedIn) {
      navigate({ to: '/dashboard' });
    }
  }, [authctx.isLoggedIn, navigate]);

  const [
    signin,
    { data: signinresult, isLoading: isSigningIn, error: signinError },
  ] = useSignInMutation();

  useEffect(() => {
    if (signinresult) {
      authctx.login(signinresult.data.access_token);
    }
  }, [signinresult, authctx]);

  const loginform = useForm<signinuser>({
    resolver: zodResolver(signinDto),
  });

  const handleSignin = async (values: signinuser) => {
    try {
      await signin({ user: values }).unwrap();
    } catch (error) {
      console.log('Signin error:', error);
    }
  };

  return (
    <div>
      <Card className="mx-auto max-w-md my-2 shadow-xl ">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Mystore</CardTitle>
          <CardDescription>
            Create your account to start selling
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
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
          {signinresult && <p className="text-green-500">Signin successful!</p>}
          {signinError && (
            <Alert variant="destructive" className="max-w-sm m-4 mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {`An error occurred: ${
                  (signinError as { message?: string }).message ||
                  'Please try again later.'
                }`}
              </AlertDescription>
            </Alert>
          )}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/">
              <p>signup</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loginform;
