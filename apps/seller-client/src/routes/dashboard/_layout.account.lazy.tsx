import { createLazyFileRoute } from '@tanstack/react-router';
import Profile from '../../components/account/Profile';

export const Route = createLazyFileRoute('/dashboard/_layout/account')({
  component: () => <Profile />,
});
