import '../styles.css';

import Header from '../components/Header';
import { Login } from '../components/auth/Login';

export function App() {
  return (
    <div>
      <Header />
      <Login />
    </div>
  );
}

export default App;
