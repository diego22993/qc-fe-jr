import React from 'react';

interface WelcomeContentProps {
  username: string;
}

export const WelcomeContent: React.FC<WelcomeContentProps> = ({ username }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', color: '#1e293b', margin: '0 0 10px 0' }}>
        ¡Hola, {username}!
      </h1>
      <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>
        Te has autenticado correctamente. Selecciona una opción del menú lateral para comenzar a trabajar.
      </p>
    </div>
  );
};