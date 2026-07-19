import React, { useState } from 'react';

export default function DashboardUsuario() {
  // --- ESTADOS ORIGINALES ---
  const [perfil, setPerfil] = useState({ nombre: 'Usuario Base', email: 'correo@ejemplo.com' });
  const [editando, setEditando] = useState(false);
  const [nombreTmp, setNombreTmp] = useState(perfil.nombre);

  // --- NUEVO ESTADO PARA CONTROLAR LA VISTA ACTIVA ---
  const [vistaActiva, setVistaActiva] = useState('resumen');

  const guardar = () => {
    setPerfil({ ...perfil, nombre: nombreTmp });
    setEditando(false);
  };

  // --- ESTILOS REUTILIZABLES ---
  const linkStyle = (vista) => ({
    color: vistaActiva === vista ? '#2ed573' : '#3742fa',
    textDecoration: 'none',
    fontWeight: 'bold',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    padding: '0',
    cursor: 'pointer',
    fontSize: '16px'
  });

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '8px', border: '1px solid #333', color: '#fff', display: 'flex', gap: '20px' }}>
      
      {/* 1. MENÚ LATERAL DE NAVEGACIÓN */}
      <nav style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '12px', borderRight: '1px solid #333', paddingRight: '15px' }}>
        <h3>📊 Panel</h3>
        <button onClick={() => setVistaActiva('resumen')} style={linkStyle('resumen')}>🏠 Resumen</button>
        <button onClick={() => setVistaActiva('estadisticas')} style={linkStyle('estadisticas')}>📈 Estadísticas</button>
        <button onClick={() => setVistaActiva('reportes')} style={linkStyle('reportes')}>📋 Reportes</button>
        <button onClick={() => setVistaActiva('configuracion')} style={linkStyle('configuracion')}>⚙️ Configuración</button>
      </nav>

      {/* 2. ESPACIO RESERVADO DINÁMICO (RENDERIZADO DE PESTAÑAS) */}
      <div style={{ flex: 1, background: '#222', padding: '15px', borderRadius: '4px' }}>
        
        {vistaActiva === 'resumen' && (
          <div>
            <h4>🏠 Resumen General</h4>
            <p style={{ marginTop: '10px', color: '#aaa' }}>Bienvenido de vuelta al panel de control.</p>
            <div style={{ background: '#1e1e1e', padding: '10px', borderRadius: '4px', marginTop: '10px' }}>
              <p><strong>Operario activo:</strong> {perfil.nombre}</p>
              <p><strong>Contacto:</strong> {perfil.email}</p>
            </div>
          </div>
        )}

        {vistaActiva === 'estadisticas' && (
          <div>
            <h4>📈 Estadísticas de Uso</h4>
            <p style={{ color: '#aaa', marginTop: '10px' }}>Métricas analíticas de rendimiento del sistema en tiempo real.</p>
          </div>
        )}

        {vistaActiva === 'reportes' && (
          <div>
            <h4>📋 Reportes Generados</h4>
            <p style={{ color: '#aaa', marginTop: '10px' }}>Historial de actividades y descargas de auditoría disponibles.</p>
          </div>
        )}

        {vistaActiva === 'configuracion' && (
          <div>
            <h4>⚙️ Configuración del Perfil</h4>
            <div style={{ marginTop: '15px' }}>
              {editando ? (
                <div>
                  <input 
                    type="text" 
                    value={nombreTmp} 
                    onChange={e => setNombreTmp(e.target.value)} 
                    style={{ padding: '8px', background: '#333', color: '#fff', border: '1px solid #555', marginBottom: '10px', borderRadius: '4px', width: '100%', boxSizing: 'border-box' }} 
                  />
                  <br />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={guardar} style={{ background: '#2ed573', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Guardar</button>
                    <button onClick={() => setEditando(false)} style={{ background: '#555', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p><strong>Nombre:</strong> {perfil.nombre}</p>
                  <p style={{ marginBottom: '15px' }}><strong>Email:</strong> {perfil.email}</p>
                  <button onClick={() => setEditando(true)} style={{ background: '#ffa502', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Editar Nombre</button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}