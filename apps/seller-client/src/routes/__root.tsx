import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { AuthProvider } from '../components/store/context/Authcontext';
import { Provider } from 'react-redux';
import store from '../components/store/user/store';
export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Provider store={store}>
        <Header />
        <hr />
        <Outlet />
        <Footer />
        <TanStackRouterDevtools />
      </Provider>
    </AuthProvider>
  ),
});
