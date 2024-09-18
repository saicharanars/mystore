import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@ecommerce/ui-kit/ui';
import { useContext } from 'react';
import AuthContext from '../../store/context/auth';
import { useRouter } from 'next/navigation';
import { LogOut, TruckIcon, User, User2Icon } from 'lucide-react';
import Link from 'next/link';

const AcccountDropdown = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const logouthandler = () => {
    logout();
    router.push('/auth');
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <User2Icon className="my-auto " />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-36 md:w-40 mr-5 md:mr-10 space-y-10 p-1 md:p-5">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <Link href="/account" passHref>
                <span className="cursor-pointer">Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TruckIcon className="mr-2 h-4 w-4" />
              <Link href="/orders" passHref>
                <span className="cursor-pointer">Orders</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>
                <button onClick={logouthandler}>Logout</button>
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AcccountDropdown;
