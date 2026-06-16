// SRP: única responsabilidad → estructura visual con sidebar y logout.

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

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

export const MainLayout = () => {
  const empleado = useAuthStore((s) => s.empleado);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const iniciales = empleado
    ? `${empleado.nombre[0]}${empleado.apellido[0]}`.toUpperCase()
    : "U";

  return (
    <div className="flex h-screen overflow-hidden bg-neutral-50">
      {/* Sidebar */}
      <aside className="w-52 flex-shrink-0 bg-white border-r border-neutral-100 flex flex-col py-5">
        <div className="px-5 mb-6 flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-800">
            <b>JIUMAN</b>
          </span>
        </div>

        <nav className="flex-1 px-3 flex flex-col gap-1">
          <NavItem to="/empleados" icon="ti-users" label="Empleados" />
          <NavItem to="/turnos" icon="ti-calendar" label="Turnos" />
          <NavItem to="/roles" icon="ti-users" label="Roles" />
          <NavItem to="/reportes" icon="ti-file-description" label="Reportes" />
        </nav>

        {/* Usuario + logout */}
        <div className="px-4 pt-4 border-t border-neutral-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-xs font-medium text-primary-600 flex-shrink-0">
            {iniciales}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-neutral-800 truncate">
              {empleado ? `${empleado.nombre} ${empleado.apellido}` : "Usuario"}
            </p>
            <p className="text-xs text-neutral-400">{empleado?.rol ?? ""}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Cerrar sesión"
            className="text-neutral-400 hover:text-danger-600 transition-colors flex-shrink-0"
          >
            <i className="ti ti-logout text-base" />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
