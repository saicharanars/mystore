import { createLazyFileRoute } from '@tanstack/react-router';
import Login from '../components/account/Register';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return <Login />;
}
