import { createLazyFileRoute } from '@tanstack/react-router';
import Register from '../components/account/Register';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return <Register />;
}
