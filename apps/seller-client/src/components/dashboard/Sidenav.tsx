import { PersonIcon } from '@radix-ui/react-icons';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';

import { Home, Power, Settings2, ShoppingCart, Users } from 'lucide-react';
import { useContext } from 'react';
import AuthContext from '../store/context/Authcontext';

export const description =
  'A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.';

export function Sidenav() {
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();
  const handlelogout = () => {
    authctx.logout();
    navigate({ to: '/login' });
  };
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-scroll">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2 mt-2">
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm lg:text-lg font-medium lg:px-5">
              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/dashboard/orders"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
              </Link>

              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Customers
              </Link>
              <Link
                to="/dashboard/account"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <PersonIcon className="h-4 w-4" />
                account
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Settings2 className="h-4 w-4" />
                settings
              </Link>
              <button>
                <span
                  onClick={handlelogout}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Power className="h-4 w-4" />
                  logout
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
