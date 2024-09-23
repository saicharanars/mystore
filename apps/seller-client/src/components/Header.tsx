import { Button } from '@ecommerce/ui-kit/ui';
import logo from '../assets/seller.svg';

const Header = () => {
  return (
    <div className="h-18 md:h-24 grid grid-cols-2 md:grid-cols-4 px-2 md:px-4 shadow-md">
      <div className="relative p-2 my-auto right-0    flex flex-row justify-between items-start gap-4">
        <div className="flex flex-row items-center justify-center gap-2 my-auto">
          <img
            src={logo}
            alt={`mystore logo`}
            title={'storeName'}
            loading="lazy"
            className="h-10 w-auto text-primary "
          />
          <h1 className="text-2xl capitalize  text-primary  font-bold">
            MYSTORE
          </h1>
        </div>
        <div className="flex flex-row gap-2">
          <Button
            variant={'outline'}
            className="  rounded-full hidden md:block border-r-2 border-primary text-primary   my-auto  "
          >
            Register as Seller
          </Button>
          <Button className="  rounded-full    my-auto ">Seller Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
