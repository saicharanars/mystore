import { createLazyFileRoute } from '@tanstack/react-router';
import ShipmentsPage from '../../components/dashboard/shipments/ShipmentsPage';

export const Route = createLazyFileRoute('/dashboard/_layout/shipments')({
  component: () => <ShipmentsPage />,
});
