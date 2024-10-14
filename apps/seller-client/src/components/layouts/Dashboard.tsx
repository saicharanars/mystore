import { Outlet } from '@tanstack/react-router';
import { Sidenav } from '../dashboard/Sidenav';

export default function Dashboard() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr]  ">
      <div className="hidden border-r bg-muted/40 md:block">
        <Sidenav />
      </div>
      <div className="flex flex-col">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
