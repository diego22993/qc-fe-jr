// pages/EmpleadoDetallePage.tsx
// SRP: única responsabilidad → mostrar el detalle de un empleado por ID.

import { useParams, useNavigate } from 'react-router-dom';
import { useEmpleadoPorId } from '../features/empleados/hooks/useEmpleados';

interface CampoProps {
  label: string;
  valor: string | number;
}

const Campo = ({ label, valor }: CampoProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-neutral-400">{label}</span>
    <span className="text-sm text-neutral-800">{valor}</span>
  </div>
);

const RolBadge = ({ rol }: { rol: string }) => {
  const colores: Record<string, string> = {
    Veterinario:    'bg-primary-50 text-primary-600',
    Recepcionista:  'bg-warning-50 text-warning-600',
    Administrativo: 'bg-neutral-100 text-neutral-600',
    Auxiliar:       'bg-success-50 text-success-600',
  };
  return (
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${colores[rol] ?? 'bg-neutral-100 text-neutral-600'}`}>
      {rol}
    </span>
  );
};

const formatFecha = (fecha: string) =>
  new Date(fecha).toLocaleDateString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });

export const EmpleadoDetallePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { empleado, isLoading, isError } = useEmpleadoPorId(id!);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-neutral-400 text-sm">
        Cargando empleado...
      </div>
    );
  }

  if (isError || !empleado) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <p className="text-danger-600 text-sm">No se encontró el empleado.</p>
        <button
          onClick={() => navigate('/empleados')}
          className="text-sm text-primary-600 hover:underline"
        >
          Volver a empleados
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/empleados')}
          className="text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <i className="ti ti-arrow-left text-base" />
        </button>
        <div>
          <h2 className="text-sm font-medium text-neutral-800">
            {empleado.nombre} {empleado.apellido}
          </h2>
          <p className="text-xs text-neutral-400">ID: {empleado.id}</p>
        </div>
        <div className="ml-auto">
          <RolBadge rol={empleado.rol} />
        </div>
      </div>

      {/* Datos personales */}
      <section className="bg-white border border-neutral-100 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-medium text-neutral-800">Datos personales</h3>
        </div>
        <div className="p-5 grid grid-cols-2 gap-5">
          <Campo label="Nombre"   valor={empleado.nombre} />
          <Campo label="Apellido" valor={empleado.apellido} />
          <Campo label="Email"    valor={empleado.email} />
          <Campo label="Teléfono" valor={empleado.telefono} />
        </div>
      </section>

      {/* Datos laborales */}
      <section className="bg-white border border-neutral-100 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-medium text-neutral-800">Datos laborales</h3>
        </div>
        <div className="p-5 grid grid-cols-2 gap-5">
          <Campo label="Horario"        valor={empleado.horario} />
          <Campo label="Fecha de ingreso" valor={formatFecha(empleado.fechaIngreso)} />
          <Campo label="Sueldo"         valor={`$${empleado.sueldo.toLocaleString('es-AR')}`} />
          <Campo label="Estado"         valor={empleado.active ? 'Activo' : 'Inactivo'} />
        </div>
      </section>

      {/* Credenciales */}
      <section className="bg-white border border-neutral-100 rounded-lg overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h3 className="text-sm font-medium text-neutral-800">Credenciales</h3>
        </div>
        <div className="p-5 grid grid-cols-2 gap-5">
          <Campo label="Usuario"     valor={empleado.usuario} />
          <Campo label="Contraseña"  valor="••••••••" />
        </div>
      </section>

    </div>
  );
};