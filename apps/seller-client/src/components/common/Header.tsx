import { useContext } from 'react';
import {
  Avatar,
  Button,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@ecommerce/ui-kit/ui';
import logo from '../../assets/seller.svg';
import AuthContext from '../store/context/Authcontext';
import { Link, useNavigate } from '@tanstack/react-router';
import { Power } from 'lucide-react';

const AuthComponent = () => {
  return (
    <>
      <Link to="/">
        <Button
          variant="outline"
          className="hidden sm:inline-flex items-center rounded-full border-primary text-primary"
        >
          Register as Seller
        </Button>
      </Link>
      <Link to="/login">
        <Button className="rounded-full">Seller Login</Button>
      </Link>
    </>
  );
};

const UserIcon = () => {
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();
  const handlelogout = () => {
    authctx.logout();
    navigate({ to: '/login' });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4 mr-6">
        <DropdownMenuItem>
          <button>
            <span
              onClick={handlelogout}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Power className="h-4 w-4" />
              logout
            </span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Header = () => {
  const authctx = useContext(AuthContext);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto  py-3 md:py-4 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="MyStore logo" className="h-8 w-auto sm:h-10" />
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              My Store
            </h1>
          </div>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            {authctx.isLoggedIn ? <UserIcon /> : <AuthComponent />}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
