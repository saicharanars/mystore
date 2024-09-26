import { createLazyFileRoute } from '@tanstack/react-router';
import Loginform from '../components/account/Loginform';

export const Route = createLazyFileRoute('/login')({
  component: loginform,
});
function loginform() {
  return <Loginform />;
}
