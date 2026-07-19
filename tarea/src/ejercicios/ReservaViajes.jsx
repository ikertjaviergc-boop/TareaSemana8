import React, { useState } from 'react';

// --- COMPONENTE PRINCIPAL (CONTROL DE FLUJO POR ESTADO INTERNAL) ---
export default function ReservaViajes() {
  const [reserva, setReserva] = useState({
    destino: '',
    pasajero: '',
    metodoPago: 'Debito'
  });

  // Reemplazamos las rutas de URL por un estado numérico de pasos
  const [paso, setPaso] = useState(1);

  // Funciones de control de flujo equivalentes a navigate
  const irAPaso = (numeroPaso) => {
    setPaso(numeroPaso);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '8px', border: '1px solid #333', color: '#fff', maxWidth: '500px', margin: '0 auto' }}>
      <h3>✈️ Sistema de Reserva de Viajes</h3>
      
      {/* Indicador de progreso visual e informativo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', background: '#222', padding: '10px', borderRadius: '4px', marginBottom: '20px', fontSize: '12px', color: '#aaa' }}>
        <span style={{ color: reserva.destino ? '#2ed573' : '#aaa', fontWeight: paso === 1 ? 'bold' : 'normal' }}>1. Destino</span>
        <span style={{ color: reserva.pasajero ? '#2ed573' : '#aaa', fontWeight: paso === 2 ? 'bold' : 'normal' }}>2. Pasajero</span>
        <span style={{ color: reserva.destino && reserva.pasajero ? '#2ed573' : '#aaa', fontWeight: paso === 3 ? 'bold' : 'normal' }}>3. Pago</span>
      </div>

      {/* Renderizado condicional del paso activo en lugar de <Outlet /> */}
      {paso === 1 && (
        <PasoDestino reserva={reserva} setReserva={setReserva} irAPaso={irAPaso} />
      )}
      {paso === 2 && (
        <PasoPasajero reserva={reserva} setReserva={setReserva} irAPaso={irAPaso} />
      )}
      {paso === 3 && (
        <PasoPago reserva={reserva} setReserva={setReserva} irAPaso={irAPaso} />
      )}
      {paso === 4 && (
        <PasoConfirmacion reserva={reserva} setReserva={setReserva} irAPaso={irAPaso} />
      )}
    </div>
  );
}

// --- PASO 1: SELECCIÓN DE DESTINO ---
function PasoDestino({ reserva, setReserva, irAPaso }) {
  const [destinoTmp, setDestinoTmp] = useState(reserva.destino);

  const siguiente = (e) => {
    e.preventDefault();
    if (!destinoTmp.trim()) return;
    setReserva(prev => ({ ...prev, destino: destinoTmp }));
    irAPaso(2); // Avanza al paso 2
  };

  return (
    <form onSubmit={siguiente} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label>Selecciona tu destino:</label>
      <input 
        type="text" 
        value={destinoTmp} 
        onChange={e => setDestinoTmp(e.target.value)} 
        placeholder="Ej: Punta Arenas" 
        style={{ padding: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px' }} 
      />
      <button type="submit" style={{ padding: '8px', background: '#3742fa', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        Siguiente Paso →
      </button>
    </form>
  );
}

// --- PASO 2: DATOS DEL PASAJERO ---
function PasoPasajero({ reserva, setReserva, irAPaso }) {
  const [pasajeroTmp, setPasajeroTmp] = useState(reserva.pasajero);

  const siguiente = (e) => {
    e.preventDefault();
    if (!pasajeroTmp.trim()) return;
    setReserva(prev => ({ ...prev, pasajero: pasajeroTmp }));
    irAPaso(3); // Avanza al paso 3
  };

  return (
    <form onSubmit={siguiente} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label>Nombre completo del pasajero:</label>
      <input 
        type="text" 
        value={pasajeroTmp} 
        onChange={e => setPasajeroTmp(e.target.value)} 
        placeholder="Ej: Juan Pérez" 
        style={{ padding: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px' }} 
      />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="button" onClick={() => irAPaso(1)} style={{ flex: 1, padding: '8px', background: '#555', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Volver
        </button>
        <button type="submit" style={{ flex: 1, padding: '8px', background: '#3742fa', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Siguiente Paso →
        </button>
      </div>
    </form>
  );
}

// --- PASO 3: SELECCIÓN DE MÉTODO DE PAGO ---
function PasoPago({ reserva, setReserva, irAPaso }) {
  const finalizar = (e) => {
    e.preventDefault();
    irAPaso(4); // Muestra la confirmación
  };

  return (
    <form onSubmit={finalizar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label>Selecciona método de pago:</label>
      <select 
        value={reserva.metodoPago} 
        onChange={e => setReserva(prev => ({ ...prev, metodoPago: e.target.value }))}
        style={{ padding: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px' }}
      >
        <option value="Debito">Tarjeta de Crédito / Débito</option>
        <option value="Transferencia">Transferencia Bancaria</option>
      </select>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="button" onClick={() => irAPaso(2)} style={{ flex: 1, padding: '8px', background: '#555', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Volver
        </button>
        <button type="submit" style={{ flex: 1, padding: '8px', background: '#2ed573', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Confirmar y Pagar 💳
        </button>
      </div>
    </form>
  );
}

// --- PÁGINA FINAL: CONFIRMACIÓN EXITOSA ---
function PasoConfirmacion({ reserva, setReserva, irAPaso }) {
  const reiniciar = () => {
    setReserva({ destino: '', pasajero: '', metodoPago: 'Debito' });
    irAPaso(1); // Regresa al inicio limpio
  };

  return (
    <div style={{ background: '#222', padding: '15px', borderRadius: '4px', textAlign: 'center' }}>
      <p style={{ color: '#2ed573', fontWeight: 'bold', fontSize: '18px' }}>¡Reserva Confirmada exitosamente!</p>
      
      <div style={{ background: '#1e1e1e', padding: '15px', borderRadius: '4px', margin: '15px 0', textAlign: 'left', fontSize: '14px', border: '1px solid #333' }}>
        <p><strong>Destino:</strong> {reserva.destino}</p>
        <p><strong>Pasajero:</strong> {reserva.pasajero}</p>
        <p><strong>Vía de pago:</strong> {reserva.metodoPago}</p>
      </div>

      <button onClick={reiniciar} style={{ padding: '8px 15px', background: '#ff4757', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        Realizar otra reserva
      </button>
    </div>
  );
}