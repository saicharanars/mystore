import { createFileRoute } from '@tanstack/react-router';
import { Sidenav } from '../../components/dashboard/Sidenav';

export const Route = createFileRoute('/dashboard/_layout')({
  component: () => <Sidenav />,
});
