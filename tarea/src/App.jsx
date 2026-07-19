import React, { useState } from 'react';

// Importaciones con nombres estándar
import Pomodoro from './ejercicios/Pomodoro';
import FeedNoticias from './ejercicios/FeedNoticias';
import TiendaOnline from './ejercicios/TiendaOnline';
import DashboardUsuario from './ejercicios/DashboardUsuario';
import Chat from './ejercicios/Chat';
import Clima from './ejercicios/Clima';
import ReservaViajes from './ejercicios/ReservaViajes';

// Fallback por si BlogPersonal tiene problemas de nombre
import BlogPersonal from './ejercicios/BlogPersonal';

export default function App() {
  const [ejercicioActivo, setEjercicioActivo] = useState('Menu');

  const listaEjercicios = [
    { id: 'Pomodoro', nombre: '⏱️ Pomodoro' },
    { id: 'FeedNoticias', nombre: '📰 Feed de Noticias' },
    { id: 'BlogPersonal', nombre: '✍️ Blog Personal' },
    { id: 'TiendaOnline', nombre: '🛒 Tienda Online' },
    { id: 'DashboardUsuario', nombre: '📊 Dashboard Usuario' },
    { id: 'Chat', nombre: '💬 Chat' },
    { id: 'Clima', nombre: '☀️ App Clima' },
    { id: 'ReservaViajes', nombre: '✈️ Reserva Viajes' },
  ];

  const renderContenido = () => {
    switch (ejercicioActivo) {
      case 'Pomodoro': return <Pomodoro />;
      case 'FeedNoticias': return <FeedNoticias />;
      case 'BlogPersonal': return <BlogPersonal />;
      case 'TiendaOnline': return <TiendaOnline />;
      case 'DashboardUsuario': return <DashboardUsuario />;
      case 'Chat': return <Chat />;
      case 'Clima': return <Clima />;
      case 'ReservaViajes': return <ReservaViajes />;
      default:
        return (
          <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Panel Control de Ejercicios</h2>
            <p style={{ color: '#aaa' }}>Selecciona uno de los módulos de arriba para probar sus estados en tiempo real.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121212', fontFamily: 'sans-serif', color: '#fff' }}>
      {/* Navbar Superior */}
      <nav style={{ backgroundColor: '#1e1e1e', padding: '15px', borderBottom: '1px solid #333', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          onClick={() => setEjercicioActivo('Menu')}
          style={{ padding: '8px 16px', backgroundColor: ejercicioActivo === 'Menu' ? '#ff4757' : '#2f3542', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          🏠 Inicio
        </button>
        {listaEjercicios.map((ej) => (
          <button
            key={ej.id}
            onClick={() => setEjercicioActivo(ej.id)}
            style={{ padding: '8px 16px', backgroundColor: ejercicioActivo === ej.id ? '#3742fa' : '#2f3542', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {ej.nombre}
          </button>
        ))}
      </nav>

      {/* Contenedor Principal */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {renderContenido()}
      </main>
    </div>
  );
}