import React, { useState } from 'react';

// --- COMPONENTE PRINCIPAL DEL BLOG ---
export default function BlogPersonal() {
  const [posts, setPosts] = useState([
    { id: 1, titulo: 'Mi primer post', contenido: 'Hola mundo, este es mi blog de React.' }
  ]);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevoContenido, setNuevoContenido] = useState('');
  
  // Estados para controlar qué vista y qué artículo específico se muestra
  const [vistaActiva, setVistaActiva] = useState('inicio');
  const [articuloSeleccionadoId, setArticuloSeleccionadoId] = useState(null);

  const agregarPost = (e) => {
    e.preventDefault();
    if (!nuevoTitulo || !nuevoContenido) return;
    setPosts([...posts, { id: Date.now(), titulo: nuevoTitulo, contenido: nuevoContenido }]);
    setNuevoTitulo('');
    setNuevoContenido('');
  };

  // Función para ir al detalle de un artículo específico
  const verDetalle = (id) => {
    setArticuloSeleccionadoId(id);
    setVistaActiva('detalle');
  };

  // Estilos de navegación comunes en forma de botón limpio
  const navLinkStyle = (vista) => ({
    color: vistaActiva === vista ? '#2ed573' : '#3742fa',
    background: 'none',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0 5px'
  });

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '8px', border: '1px solid #333', color: '#fff' }}>
      <h3>✍️ Blog Personal</h3>
      
      {/* Barra de Navegación SPA controlada por estados */}
      <nav style={{ display: 'flex', gap: '15px', marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
        <button onClick={() => setVistaActiva('inicio')} style={navLinkStyle('inicio')}>Inicio</button>
        <button onClick={() => setVistaActiva('articulos')} style={navLinkStyle('articulos')}>Artículos</button>
        <button onClick={() => setVistaActiva('acerca')} style={navLinkStyle('acerca')}>Acerca de</button>
        <button onClick={() => setVistaActiva('contacto')} style={navLinkStyle('contacto')}>Contacto</button>
      </nav>

      {/* Renderizado Condicional de las Vistas */}
      {vistaActiva === 'inicio' && <Inicio />}
      
      {vistaActiva === 'articulos' && (
        <Articulos 
          posts={posts} 
          nuevoTitulo={nuevoTitulo} 
          nuevoContenido={nuevoContenido} 
          setNuevoTitulo={setNuevoTitulo} 
          setNuevoContenido={setNuevoContenido} 
          agregarPost={agregarPost} 
          verDetalle={verDetalle}
        />
      )}
      
      {vistaActiva === 'detalle' && (
        <DetalleArticulo 
          posts={posts} 
          id={articuloSeleccionadoId} 
          volver={() => setVistaActiva('articulos')} 
        />
      )}
      
      {vistaActiva === 'acerca' && <Acerca />}
      {vistaActiva === 'contacto' && <Contacto />}
    </div>
  );
}

// --- SUB-COMPONENTES DE VISTAS ---

function Inicio() {
  return (
    <div>
      <h4>Bienvenidos a mi Blog</h4>
      <p style={{ color: '#aaa', marginTop: '10px' }}>Esta es la página de inicio de la aplicación SPA construida con estados dinámicos.</p>
    </div>
  );
}

function Articulos({ posts, nuevoTitulo, nuevoContenido, setNuevoTitulo, setNuevoContenido, agregarPost, verDetalle }) {
  return (
    <div>
      <form onSubmit={agregarPost} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input type="text" placeholder="Título" value={nuevoTitulo} onChange={e => setNuevoTitulo(e.target.value)} style={{ padding: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px' }} />
        <textarea placeholder="Contenido" value={nuevoContenido} onChange={e => setNuevoContenido(e.target.value)} style={{ padding: '8px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px' }} />
        <button type="submit" style={{ padding: '8px', backgroundColor: '#2ed573', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Publicar</button>
      </form>
      
      <div>
        {posts.map(p => (
          <div key={p.id} style={{ borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '10px' }}>
            <h4>{p.titulo}</h4>
            <button 
              onClick={() => verDetalle(p.id)} 
              style={{ color: '#2ed573', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', padding: '0', marginTop: '5px' }}
            >
              Leer más →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetalleArticulo({ posts, id, volver }) {
  const articulo = posts.find(p => p.id === id);

  if (!articulo) {
    return <p style={{ color: '#ff4757' }}>Artículo no encontrado.</p>;
  }

  return (
    <div style={{ background: '#222', padding: '15px', borderRadius: '4px' }}>
      <h4>{articulo.titulo}</h4>
      <p style={{ color: '#ccc', marginTop: '10px' }}>{articulo.contenido}</p>
      <button 
        onClick={volver} 
        style={{ color: '#3742fa', background: 'none', border: 'none', cursor: 'pointer', display: 'inline-block', marginTop: '15px', padding: '0', fontSize: '14px', fontWeight: 'bold' }}
      >
        ← Volver a artículos
      </button>
    </div>
  );
}

function Acerca() {
  return (
    <div>
      <h4>Sobre mí</h4>
      <p style={{ color: '#aaa', marginTop: '10px' }}>Sección dedicada a la información del autor del blog.</p>
    </div>
  );
}

function Contacto() {
  return (
    <div>
      <h4>Formulario de Contacto</h4>
      <p style={{ color: '#aaa', marginTop: '10px' }}>Contenido de la sección de contacto.</p>
    </div>
  );
}