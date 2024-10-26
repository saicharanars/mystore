import Registerform from './Registerform';
import { Separator } from '@ecommerce/ui-kit/ui';
import { CircleCheck } from 'lucide-react';
import AuthContext from '../store/context/Authcontext';
import { useNavigate } from '@tanstack/react-router';
import { useContext, useEffect } from 'react';
import { useToast } from '@ecommerce/ui-kit/ui/lib/ui/use-toast';

const Register = () => {
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  useEffect(() => {
    console.log(authctx.isLoggedIn);
    if (authctx.isLoggedIn) {
      // navigate({ to: '/login' });
      console.log('fkj');
    }
    toast({
      title: 'Scheduled: Catch up',
      variant: 'destructive',
      description: 'Friday, February 10, 2023 at 5:57 PM',
    });
  }, [authctx.isLoggedIn, navigate, toast]);
  return (
    <div className="container mx-auto px-4 py-3 sm:py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
        <div className="md:order-last">
          <Registerform />
        </div>
        <div className="md:col-span-2 mt-8 px-2">
          <div className="px-2">
            <p className=" font-semibold text-lg md:text-xl ">
              Take your business to new customers on the ONDC network
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-row   justify-start mb-4 p-4">
              <img
                alt="people"
                className="h-14 w-14 p-1 my-auto"
                src="https://seller.mystore.in/s/62ea2c599d1398fa16dbae0a/originals/62de5159a0067aeaaddf6fa5/resellericon.svg"
              />
              <div>
                <h1 className="line-clamp-1 text-lg text-foreground md:text-lg font-medium">
                  More Buyers
                </h1>
                <p className="line-clamp-1 text-xs text-secondary-foreground md:text-md font-normal">
                  Access millions of buyers across India
                </p>
              </div>
            </div>
            <div className="flex flex-row   justify-start mb-4 p-4">
              <img
                alt="people"
                className="h-14 w-14 p-1 my-auto"
                src="https://seller.mystore.in/s/62ea2c599d1398fa16dbae0a/originals/62de5173a0067aeaaddf6fcf/pincode_icon.svg"
              />
              <div>
                <h1 className="line-clamp-1 text-lg text-foreground md:text-lg font-medium">
                  Zero Cost
                </h1>
                <p className="line-clamp-1 text-xs text-secondary-foreground md:text-md font-normal">
                  No upfront cost to get started
                </p>
              </div>
            </div>
            <div className="flex flex-row   justify-start mb-4 p-4">
              <img
                alt="people"
                className="h-14 w-14 p-1 my-auto"
                src="https://seller.mystore.in/s/62ea2c599d1398fa16dbae0a/originals/62de5188a0067aeaaddf6ff8/customer_icon.svg"
              />
              <div>
                <h1 className="line-clamp-1 text-lg text-foreground md:text-lg font-medium">
                  ... Easy To Use
                </h1>
                <p className="line-clamp-1 text-xs text-secondary-foreground md:text-md font-normal">
                  Start selling in no time
                </p>
              </div>
            </div>
            <div className="flex flex-row   justify-start mb-4 p-4">
              <img
                alt="people"
                className="h-14 w-14 p-1 my-auto"
                src="https://seller.mystore.in/s/62ea2c599d1398fa16dbae0a/originals/62de5199a0067aeaaddf7026/category_icon.svg"
              />
              <div>
                <h1 className="line-clamp-1 text-lg text-foreground md:text-lg font-medium">
                  Grow Your Business
                </h1>
                <p className="line-clamp-1 text-xs text-secondary-foreground md:text-md font-normal">
                  Promote your business with your own webpage
                </p>
              </div>
            </div>
          </div>
          <Separator />
          <h1 className=" px-2 font-medium text-secondary-foreground text-lg md:text-xl mt-4 ">
            What you need to sell on Mystore
          </h1>
          <div className="flex items-center p-4 mt-4 ">
            <p className="font-medium  px-2 text-md md:text-lg text-secondary-foreground flex items-center">
              <CircleCheck className="h-8 w-6 mr-4 text-primary" />
              <span>GSTIN</span>
            </p>
          </div>
          <div className="flex items-center p-4 mt-4">
            <p className="font-medium px-2 text-md md:text-lg text-secondary-foreground flex items-center">
              <CircleCheck className="h-8 w-6 mr-4 text-primary" />
              <span>Bank Account</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
