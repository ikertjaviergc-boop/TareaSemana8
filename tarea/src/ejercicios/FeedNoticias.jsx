import React, { useState, useEffect } from 'react';

export default function FeedNoticias() {
  const [categoria, setCategoria] = useState('Todos');
  const [noticias, setNoticias] = useState([]); // Iniciamos vacío para simular la carga asíncrona

  // Base de datos simulada de la API externa
  const apiNoticiasFicticia = [
    { id: 1, titulo: 'Lanzamiento de nueva tecnología espacial', cat: 'Tecnología' },
    { id: 2, titulo: 'Resultados del partido de la selección ayer', cat: 'Deportes' },
    { id: 3, titulo: 'Gran estreno en los cines locales', cat: 'Entretenimiento' },
    { id: 4, titulo: 'Nueva actualización de software disponible', cat: 'Tecnología' },
    { id: 5, titulo: 'Clasificatorias para las olimpiadas en marcha', cat: 'Deportes' }
  ];

  // useEffect usado para traer noticias al montar y refrescar automáticamente cada cierto tiempo
  useEffect(() => {
    // 1. Traer noticias iniciales al montar el componente
    const cargarNoticiasIniciales = () => {
      // Tomamos las primeras 3 noticias simulando la petición inicial de la API
      setNoticias(apiNoticiasFicticia.slice(0, 3));
      console.log('Noticias cargadas inicialmente desde la API.');
    };

    cargarNoticiasIniciales();

    // 2. Refrescar cada X tiempo (ej. cada 10 segundos para pruebas visibles en lugar de minutos)
    const intervalo = setInterval(() => {
      setNoticias(() => {
        console.log('Refrescando feed de noticias automáticamente...');
        // Simulamos la llegada de contenido nuevo agregando el resto de las noticias de la API
        return apiNoticiasFicticia;
      });
    }, 10000); // 10000ms = 10 segundos

    // 3. Limpiar el intervalo al desmontar el componente
    return () => {
      console.log('Limpiando intervalo del feed de noticias...');
      clearInterval(intervalo);
    };
  }, []); // Arreglo de dependencias vacío para configurarse únicamente al montar

  const filtradas = categoria === 'Todos' ? noticias : noticias.filter(n => n.cat === categoria);

  return (
    <div style={{ padding: '20px', backgroundColor: '#1e1e1e', borderRadius: '8px', border: '1px solid #333', color: '#fff' }}>
      <h3>📰 Feed de Noticias</h3>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        {['Todos', 'Tecnología', 'Deportes', 'Entretenimiento'].map(cat => (
          <button 
            key={cat} 
            onClick={() => setCategoria(cat)} 
            style={{ 
              padding: '5px 10px', 
              cursor: 'pointer', 
              backgroundColor: categoria === cat ? '#3742fa' : '#2f3542', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px' 
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {noticias.length === 0 ? (
        <p style={{ color: '#aaa', fontStyle: 'italic' }}>Cargando últimas noticias...</p>
      ) : (
        <ul style={{ paddingLeft: '20px' }}>
          {filtradas.map(n => (
            <li key={n.id} style={{ margin: '10px 0', color: '#ccc' }}>
              <strong style={{ color: '#ffa502' }}>[{n.cat}]</strong> {n.titulo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}