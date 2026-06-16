// layouts/MainLayout.tsx
// SRP: única responsabilidad → estructura visual de la app (sidebar + contenido).

import { Outlet, NavLink, useLocation } from "react-router-dom";

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
        isActive
          ? "bg-primary-50 text-primary-600 font-medium"
          : "text-neutral-600 hover:bg-neutral-50"
      }`
    }
  >
    <i className={`ti ${icon} text-base`} />
    {label}
  </NavLink>
);

const pageTitles: Record<string, string> = {
  "/empleados": "Empleados",
};

export const MainLayout = () => {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 bg-white border-r border-neutral-100 flex flex-col py-5">
        {/* Logo */}
        <div className="px-5 mb-6 flex items-center gap-2">
          <i className="ti ti-paw text-xl text-primary-600" />
          <span className="text-sm font-medium text-neutral-800">
            VetClinic
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 flex flex-col gap-1">
          <NavItem to="/empleados" icon="ti-users" label="Empleados" />
          <NavItem to="/turnos" icon="ti-calendar" label="Turnos" />
          <NavItem to="/reportes" icon="ti-file-description" label="Reportes" />
        </nav>

        {/* Usuario */}
        <div className="px-4 pt-4 border-t border-neutral-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-xs font-medium text-primary-600 flex-shrink-0">
            DH
          </div>
          <div>
            <p className="text-xs font-medium text-neutral-800">Diego H.</p>
            <p className="text-xs text-neutral-400">Admin</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-13 bg-white border-b border-neutral-100 px-6 flex items-center">
          <h1 className="text-sm font-medium text-neutral-800">{title}</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
