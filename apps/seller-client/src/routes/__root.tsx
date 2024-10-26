import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { AuthProvider } from '../components/store/context/Authcontext';
import { Provider } from 'react-redux';
import store from '../components/store/store';
import { Toaster } from '@ecommerce/ui-kit/ui';

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Provider store={store}>
        <Header />
        <hr />
        <Outlet />
        <Footer />
        <Toaster />
      </Provider>
    </AuthProvider>
  ),
});