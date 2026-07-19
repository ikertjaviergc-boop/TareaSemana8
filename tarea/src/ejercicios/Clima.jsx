import React, { useState, useEffect } from 'react';

export default function Clima() {
  const [ciudad, setCiudad] = useState('Santiago');
  // Nuevos estados requeridos por el enunciado
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const datosClimaAPI = {
    Santiago: { temp: '18°C', estado: 'Despejado' },
    Coyhaique: { temp: '-2°C', estado: 'Escarcha y Nieve' },
    Concepción: { temp: '12°C', estado: 'Lluvia Débil' }
  };

  // useEffect usado para obtener datos al cargar y cuando cambia la ciudad
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulamos una petición a una API (ej. OpenWeather) con setTimeout
    const timer = setTimeout(() => {
      try {
        const resultado = datosClimaAPI[ciudad];
        if (!resultado) {
          throw new Error('No se encontraron datos para esta ciudad.');
        }
        setClima(resultado);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 800); // 800ms de retraso para notar el estado de loading

    // Limpieza del efecto si el usuario cambia de ciudad antes de terminar la carga
    return () => clearTimeout(timer);
  }, [ciudad]); // Dependencia: se ejecuta cada vez que cambia 'ciudad'

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '8px', border: '1px solid #333', color: '#fff' }}>
      <h3>☀️ Estado del Clima</h3>
      
      <select 
        value={ciudad} 
        onChange={e => setCiudad(e.target.value)} 
        style={{ padding: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px', marginBottom: '15px' }}
      >
        <option value="Santiago">Santiago</option>
        <option value="Coyhaique">Coyhaique</option>
        <option value="Concepción">Concepción</option>
        <option value="Valparaíso">Valparaíso (Forzar Error)</option>
      </select>

      <div style={{ background: '#222', padding: '15px', borderRadius: '4px', minHeight: '120px' }}>
        <h4>{ciudad}</h4>
        
        {/* Manejar estado de Loading */}
        {loading && <p style={{ color: '#aaa', fontStyle: 'italic' }}>Obteniendo clima actual...</p>}

        {/* Manejar errores */}
        {error && <p style={{ color: '#ff4757' }}>❌ Error: {error}</p>}

        {/* Mostrar datos cuando ya no cargue y no haya error */}
        {!loading && !error && clima && (
          <>
            <p style={{ fontSize: '24px', margin: '5px 0', color: '#ffa502' }}>{clima.temp}</p>
            <p style={{ color: '#aaa' }}>Condición: {clima.estado}</p>
          </>
        )}
      </div>
    </div>
  );
}