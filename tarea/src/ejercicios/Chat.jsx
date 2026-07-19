import React, { useState, useEffect } from 'react';

export default function Chat() {
  const [mensajes, setMensajes] = useState([{ id: 1, texto: '¡Hola! Bienvenidos al chat.', usuario: 'Bot' }]);
  const [texto, setTexto] = useState('');

  // useEffect usado para simular la conexión y recibir mensajes automáticos
  useEffect(() => {
    // 1. Simular conexión al montar
    console.log("Conectando al servicio de chat...");

    const respuestasSimuladas = [
      { texto: '¿Cómo estás?', usuario: 'Luis' },
      { texto: '¿Vieron el clima de hoy?', usuario: 'Ana' },
      { texto: '¡Excelente iniciativa!', usuario: 'Luis' },
      { texto: 'Genial, interactuando en tiempo real.', usuario: 'Ana' }
    ];

    let indice = 0;

    // 2. Escuchar nuevos mensajes cada pocos segundos (setInterval)
    const intervalo = setInterval(() => {
      if (indice < respuestasSimuladas.length) {
        setMensajes(prev => [
          ...prev,
          { id: Date.now() + indice, ...respuestasSimuladas[indice] }
        ]);
        indice++;
      }
    }, 4000); // Recibe un mensaje simulado cada 4 segundos

    // 3. Limpiar la conexión al desmontar el componente
    return () => {
      console.log("Desconectando del servicio de chat...");
      clearInterval(intervalo);
    };
  }, []); // Arreglo de dependencias vacío para ejecutarse solo al montar/desmontar

  const enviar = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;
    setMensajes([...mensajes, { id: Date.now(), texto: texto, usuario: 'Tú' }]);
    setTexto('');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '8px', border: '1px solid #333' }}>
      <h3>💬 Sala de Chat</h3>
      <div style={{ height: '200px', overflowY: 'auto', background: '#222', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
        {mensajes.map(m => (
          <div key={m.id} style={{ margin: '5px 0', color: m.usuario === 'Tú' ? '#2ed573' : (m.usuario === 'Bot' ? '#3742fa' : '#ffa502') }}>
            <strong>{m.usuario}:</strong> <span style={{ color: '#fff' }}>{m.texto}</span>
          </div>
        ))}
      </div>
      <form onSubmit={enviar} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={texto} 
          onChange={e => setTexto(e.target.value)} 
          placeholder="Escribe un mensaje..." 
          style={{ flex: 1, padding: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px' }} 
        />
        <button type="submit" style={{ padding: '8px 15px', background: '#2ed573', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Enviar</button>
      </form>
    </div>
  );
}