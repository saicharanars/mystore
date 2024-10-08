import { createLazyFileRoute } from '@tanstack/react-router';
import ProductsPage from '../../components/dashboard/ProductsPage';

export const Route = createLazyFileRoute('/dashboard/_layout/products')({
  component: () => <ProductsPage />,
});
