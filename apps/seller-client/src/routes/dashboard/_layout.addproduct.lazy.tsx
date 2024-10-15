import { createLazyFileRoute } from '@tanstack/react-router';
import CreateProductForm from '../../components/products/CreateProductForm';

export const Route = createLazyFileRoute('/dashboard/_layout/addproduct')({
  component: () => <CreateProductForm />,
});
