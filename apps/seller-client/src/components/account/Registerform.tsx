import {
  Button,
  Card,
  CardContent,
  CardDescription,
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
import { Link, redirect } from '@tanstack/react-router';
import { useContext, useEffect } from 'react';
import { useSignUpMutation } from '../store/user/api';
import { useForm } from 'react-hook-form';
import { createuser, createuserDto } from '@ecommerce/types';
import { LoaderCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthContext from '../store/context/Authcontext';

const Registerform = () => {
  const authctx = useContext(AuthContext);
  useEffect(() => {
    console.log(authctx.isLoggedIn);
    if (authctx.isLoggedIn) {
      redirect({ to: '/about' });
    }
  }, [authctx.isLoggedIn]);
  const [
    signup,
    { data: signupresult, isLoading: isSigningUp, error: signupError },
  ] = useSignUpMutation();
  const signupform = useForm<createuser>({
    resolver: zodResolver(createuserDto),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'seller',
    },
  });
  const handleSignup = async (values: createuser) => {
    try {
      await signup({ user: values });
    } catch (error) {
      console.log('Signup error:', error);
    }
  };
  return (
    <div>
      <Card className="mx-auto shadow-xl ">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Mystore</CardTitle>
          <CardDescription>
            Create your account to start selling
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Business name"
                        {...field}
                      />
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
          {signupresult && <p className="text-green-500">Signup successful!</p>}
          {signupError && (
            <p className="text-red-500">
              Signup failed.{' '}
              {JSON.stringify(signupError) || 'Please try again later.'}
            </p>
          )}
          <div className="mt-4 text-center text-sm">
            Already had an account?
            <Link to="/login">
              <p>login</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registerform;
