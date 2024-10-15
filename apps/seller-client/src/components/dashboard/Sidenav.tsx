import { Link, useNavigate, useRouterState } from '@tanstack/react-router';

import {
  Home,
  Package,
  PlusCircle,
  Power,
  Shirt,
  ShoppingCart,
} from 'lucide-react';
import { useContext, useState } from 'react';
import AuthContext from '../store/context/Authcontext';
import { PersonIcon } from '@radix-ui/react-icons';

export const description =
  'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.';

export function Sidenav() {
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();
  const router = useRouterState();

  const [activeItem, setActiveItem] = useState<string>(
    router.location.pathname
  );
  const handlelogout = () => {
    authctx.logout();
    navigate({ to: '/login' });
    setActiveItem('/');
  };
  const handleItemClick = (to: string) => {
    setActiveItem(to);
  };
  return (
    <div className="flex h-full max-h-screen flex-col gap-2 mt-2">
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm lg:text-lg font-medium lg:px-5">
          <Link
            to="/dashboard"
            onClick={() => handleItemClick('/dashboard')}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-secondary-foreground hover:bg-secondary ${
              activeItem === '/dashboard'
                ? 'text-secondary-foreground bg-secondary hover:text-secondary-foreground'
                : ''
            }`}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            to="/dashboard/orders"
            onClick={() => handleItemClick('/dashboard/orders')}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-secondary-foreground hover:bg-secondary ${
              activeItem === '/dashboard/orders'
                ? 'text-secondary-foreground bg-secondary hover:text-secondary-foreground'
                : ''
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            Orders
          </Link>
          <Link
            to="/dashboard/addproduct"
            onClick={() => handleItemClick('/dashboard/addproduct')}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-secondary-foreground hover:bg-secondary ${
              activeItem === '/dashboard/addproduct'
                ? 'text-secondary-foreground bg-secondary hover:text-secondary-foreground'
                : ''
            }`}
          >
            <PlusCircle className="h-4 w-4" />
            Add Product
          </Link>
          <Link
            to="/dashboard/products"
            onClick={() => handleItemClick('/dashboard/products')}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-secondary-foreground hover:bg-secondary ${
              activeItem === '/dashboard/products'
                ? 'text-secondary-foreground bg-secondary hover:text-secondary-foreground'
                : ''
            }`}
          >
            <Shirt className="h-4 w-4" />
            Products
          </Link>

          <Link
            to="/dashboard/shipments"
            onClick={() => handleItemClick('/dashboard/shipments')}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-secondary-foreground hover:bg-secondary  ${
              activeItem === '/dashboard/shipments'
                ? 'text-secondary-foreground bg-secondary hover:text-secondary-foreground'
                : ''
            }`}
          >
            <Package className="h-4 w-4" />
            Shipments
          </Link>
          <Link
            to="/dashboard/account"
            onClick={() => handleItemClick('/dashboard/account')}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-secondary-foreground hover:bg-secondary ${
              activeItem === '/dashboard/account'
                ? 'text-secondary-foreground bg-secondary hover:text-secondary-foreground'
                : ''
            }`}
          >
            <PersonIcon className="h-4 w-4" />
            account
          </Link>

          <button>
            <span
              onClick={handlelogout}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all "
            >
              <Power className="h-4 w-4" />
              logout
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
}
