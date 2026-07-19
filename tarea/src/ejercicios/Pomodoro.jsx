import React, { useState, useEffect } from 'react';

export default function Pomodoro() {
  const [segundosLibres, setSegundosLibres] = useState(25 * 60);
  const [activo, setActivo] = useState(false);
  
  // RETO EXTRA: Inicializar el estado leyendo desde localStorage
  const [sesionesCompletadas, setSesionesCompletadas] = useState(() => {
    const guardadas = localStorage.getItem('sesionesPomodoro');
    return guardadas ? parseInt(guardadas, 10) : 0;
  });

  // useEffect usado para contar el tiempo cada segundo de forma activa
  useEffect(() => {
    let intervalo = null;

    if (activo && segundosLibres > 0) {
      intervalo = setInterval(() => {
        setSegundosLibres((prev) => prev - 1);
      }, 1000);
    } else if (segundosLibres === 0) {
      alert('¡Tiempo completado! Tómate un descanso.');
      
      // RETO EXTRA: Actualizar el estado y persistir en localStorage
      setSesionesCompletadas((prev) => {
        const nuevaSesion = prev + 1;
        localStorage.setItem('sesionesPomodoro', nuevaSesion);
        return nuevaSesion;
      });

      setActivo(false);
      setSegundosLibres(25 * 60);
    }

    return () => clearInterval(intervalo);
  }, [activo, segundosLibres]);

  const formatearTiempo = () => {
    const minutes = Math.floor(segundosLibres / 60);
    const segundos = segundosLibres % 60;
    return `${minutes.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '8px', border: '1px solid #333', color: '#fff' }}>
      <h3>🍅 Temporizador Pomodoro</h3>
      
      <div style={{ background: '#222', padding: '20px', borderRadius: '4px', textAlign: 'center', marginBottom: '15px' }}>
        <p style={{ fontSize: '48px', margin: '10px 0', fontFamily: 'monospace', color: '#ffa502' }}>
          {formatearTiempo()}
        </p>
        <p style={{ color: '#aaa', fontSize: '14px' }}>Sesiones completadas: {sesionesCompletadas}</p>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setActivo(!activo)} 
          style={{ 
            flex: 1,
            padding: '10px', 
            background: activo ? '#ffa502' : '#2ed573', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {activo ? 'Pausar' : 'Iniciar'}
        </button>

        <button 
          onClick={() => { setActivo(false); setSegundosLibres(25 * 60); }} 
          style={{ 
            padding: '10px', 
            background: '#ff4757', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}