import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onLogout }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* MENÚ LATERAL IZQUIERDO */}
      <aside style={{ 
        width: '240px', 
        backgroundColor: '#0f172a', 
        color: '#f8fafc', 
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Logo / Título del Sistema */}
          <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '32px', paddingLeft: '8px', color: '#38bdf8' }}>
            🚀 Sistema Base
          </div>
          
          {/* Opciones del Menú */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="#inicio" style={{ padding: '10px 12px', color: '#fff', textDecoration: 'none', borderRadius: '6px', backgroundColor: '#1e293b', fontWeight: 500 }}>
              🏠 Inicio
            </a>
            <a href="#perfil" style={{ padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: '6px' }}>
              👤 Mi Perfil
            </a>
            <a href="#ajustes" style={{ padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: '6px' }}>
              ⚙️ Ajustes
            </a>
          </nav>
        </div>

        {/* Botón de Salida al fondo del menú */}
        <button 
          onClick={onLogout}
          style={{
            padding: '10px',
            backgroundColor: '#dc2626',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Cerrar Sesión
        </button>
      </aside>

      {/* CONTENIDO DERECHO */}
      <main style={{ flex: 1, padding: '40px' }}>
        {children}
      </main>

    </div>
  );
};