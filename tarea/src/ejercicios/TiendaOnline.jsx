import React, { useState } from 'react';

// --- COMPONENTE PRINCIPAL (TIENDA ONLINE CONTROLADA POR ESTADO) ---
export default function TiendaOnline() {
  const [carrito, setCarrito] = useState([]);
  
  // Reemplazamos el sistema de URLs por el control de la vista activa
  const [vistaActiva, setVistaActiva] = useState('inicio');
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(null);

  const productos = [
    { id: 1, nombre: 'Mouse Gamer', precio: 25, desc: 'Mouse óptico de alta precisión con luces RGB.' },
    { id: 2, nombre: 'Teclado Mecánico', precio: 45, desc: 'Teclado con switches red y distribución en español.' },
    { id: 3, nombre: 'Auriculares', precio: 30, desc: 'Auriculares con sonido envolvente y micrófono integrado.' }
  ];

  const agregarAlCarrito = (p) => setCarrito([...carrito, p]);
  const vaciarCarrito = () => setCarrito([]);

  // Funciones de navegación equivalentes a navigate y Link
  const irAVista = (vista) => {
    setVistaActiva(vista);
  };

  const verDetalle = (id) => {
    setProductoSeleccionadoId(id);
    setVistaActiva('detalle');
  };

  // Estilos de navegación comunes en formato botón plano
  const navLinkStyle = (vista) => ({
    color: vistaActiva === vista ? '#2ed573' : '#3742fa',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0'
  });

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '8px', border: '1px solid #333', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '10px', marginBottom: '20px' }}>
        <h3>🛒 Tienda Online</h3>
        
        {/* Barra de Navegación SPA controlada por botones */}
        <nav style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => irAVista('inicio')} style={navLinkStyle('inicio')}>Inicio</button>
          <button onClick={() => irAVista('productos')} style={navLinkStyle('productos')}>Productos</button>
          <button onClick={() => irAVista('carrito')} style={navLinkStyle('carrito')}>Carrito ({carrito.length})</button>
        </nav>
      </div>

      {/* Renderizado Condicional de las Vistas */}
      {vistaActiva === 'inicio' && (
        <InicioTienda irAVista={irAVista} />
      )}
      
      {vistaActiva === 'productos' && (
        <ListadoProductos productos={productos} agregarAlCarrito={agregarAlCarrito} verDetalle={verDetalle} />
      )}
      
      {vistaActiva === 'detalle' && (
        <DetalleProducto 
          productos={productos} 
          id={productoSeleccionadoId} 
          agregarAlCarrito={agregarAlCarrito} 
          irAVista={irAVista} 
        />
      )}
      
      {vistaActiva === 'carrito' && (
        <VistaCarrito carrito={carrito} vaciarCarrito={vaciarCarrito} irAVista={irAVista} />
      )}
      
      {vistaActiva === 'checkout' && (
        <Checkout carrito={carrito} vaciarCarrito={vaciarCarrito} irAVista={irAVista} />
      )}
    </div>
  );
}

// --- SUB-COMPONENTES DE VISTAS ---

function InicioTienda({ irAVista }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h4>Bienvenidos a la Tienda de Componentes</h4>
      <p style={{ color: '#aaa', marginTop: '10px' }}>Encuentra los mejores periféricos directo en nuestra SPA.</p>
      <button 
        onClick={() => irAVista('productos')} 
        style={{ display: 'inline-block', marginTop: '15px', padding: '8px 15px', background: '#3742fa', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Ver catálogo
      </button>
    </div>
  );
}

function ListadoProductos({ productos, agregarAlCarrito, verDetalle }) {
  return (
    <div>
      <h4>📦 Productos Disponibles</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
        {productos.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#222', padding: '10px', borderRadius: '4px' }}>
            <span>{p.nombre} - ${p.precio}</span>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => verDetalle(p.id)} 
                style={{ color: '#2ed573', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '0' }}
              >
                Detalles
              </button>
              <button onClick={() => agregarAlCarrito(p)} style={{ background: '#3742fa', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Añadir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetalleProducto({ productos, id, agregarAlCarrito, irAVista }) {
  const producto = productos.find(p => p.id === id);

  if (!producto) {
    return <p style={{ color: '#ff4757' }}>Producto no encontrado.</p>;
  }

  const manejarCompra = () => {
    agregarAlCarrito(producto);
    irAVista('carrito'); // Transición al carrito
  };

  return (
    <div style={{ background: '#222', padding: '15px', borderRadius: '4px' }}>
      <h4>{producto.nombre}</h4>
      <p style={{ color: '#ffa502', fontSize: '20px', margin: '10px 0' }}>Precio: ${producto.precio}</p>
      <p style={{ color: '#aaa', marginBottom: '15px' }}>{producto.desc}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={manejarCompra} style={{ background: '#2ed573', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Añadir e ir al Carrito
        </button>
        <button 
          onClick={() => irAVista('productos')} 
          style={{ color: '#3742fa', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}
        >
          ← Volver
        </button>
      </div>
    </div>
  );
}

function VistaCarrito({ carrito, vaciarCarrito, irAVista }) {
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div style={{ background: '#222', padding: '15px', borderRadius: '4px' }}>
      <h4>🛍️ Tu Carrito de Compras</h4>
      {carrito.length === 0 ? (
        <p style={{ color: '#aaa', fontStyle: 'italic', marginTop: '10px' }}>El carrito está vacío.</p>
      ) : (
        <div style={{ marginTop: '15px' }}>
          {carrito.map((item, index) => (
            <div key={index} style={{ color: '#ccc', margin: '5px 0', borderBottom: '1px solid #333', paddingBottom: '5px' }}>
              {item.nombre} - ${item.precio}
            </div>
          ))}
          <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '15px 0' }}>Total: ${total}</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => irAVista('checkout')} style={{ flex: 1, background: '#2ed573', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Proceder al Checkout</button>
            <button onClick={vaciarCarrito} style={{ background: '#ff4757', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>Vaciar</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Checkout({ carrito, vaciarCarrito, irAVista }) {
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const finalizarCompra = () => {
    alert('¡Compra procesada con éxito! Gracias por elegirnos.');
    vaciarCarrito();
    irAVista('inicio');
  };

  return (
    <div style={{ textAlign: 'center', padding: '15px' }}>
      <h4>🏁 Resumen de Compra (Checkout)</h4>
      <p style={{ marginTop: '10px' }}>Artículos a pagar: {carrito.length}</p>
      <p style={{ fontSize: '20px', color: '#ffa502', margin: '10px 0' }}>Total Final: ${total}</p>
      {carrito.length > 0 ? (
        <button onClick={finalizarCompra} style={{ background: '#2ed573', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', marginTop: '15px', fontWeight: 'bold' }}>Pagar Ahora</button>
      ) : (
        <p style={{ color: '#ff4757', marginTop: '10px' }}>No hay artículos pendientes para procesar.</p>
      )}
    </div>
  );
}