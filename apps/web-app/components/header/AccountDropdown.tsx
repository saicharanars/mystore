import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  Button,
} from '@ecommerce/ui-kit/ui';
import { useContext } from 'react';
import AuthContext from '../../store/context/auth';
import { useRouter } from 'next/navigation';
import { User2Icon } from 'lucide-react';

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
        <DropdownMenuContent className="w-32 md:w-48 mr-5 md:mr-10 space-y-10 p-5">
          <DropdownMenuLabel className="text-xs md:text-xl">
            My Account
          </DropdownMenuLabel>
          <Button onClick={logouthandler} variant="outline">
            Logout
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AcccountDropdown;
