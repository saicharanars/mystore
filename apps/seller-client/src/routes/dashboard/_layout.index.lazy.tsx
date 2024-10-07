import { createLazyFileRoute } from '@tanstack/react-router';
import DashboardPage from '../../components/dashboard/DashboardPage';

export const Route = createLazyFileRoute('/dashboard/_layout/')({
  component: Index,
});

function Index() {
  return <DashboardPage />;
}
