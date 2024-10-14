import { createFileRoute } from '@tanstack/react-router';
import Dashboard from '../../components/layouts/Dashboard';

export const Route = createFileRoute('/dashboard/_layout')({
  component: () => <Dashboard />,
});
