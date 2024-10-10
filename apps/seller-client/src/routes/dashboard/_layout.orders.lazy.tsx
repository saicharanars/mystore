import { createLazyFileRoute } from '@tanstack/react-router';
import OrdersPage from '../../components/dashboard/orders/OrdersPage';

export const Route = createLazyFileRoute('/dashboard/_layout/orders')({
  component: () => <OrdersPage />,
});
