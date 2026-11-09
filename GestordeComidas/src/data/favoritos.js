// Datos de la página de Favoritos. Para cambiar un plato, edita aquí (no en el JSX).
export const IMG = {
  salmon: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvo1Blb_qb_4an2d9WRAgr99arukFN6JqTp_BI0v2OeeV4Kwhck2ZXThifQwU4Yvt8FXh3sBvLNNXKqpzyG8J9GKjAs61ht2yABrPP5JBRFTV3Tnnc_TZnhRJ8_1E7rKAH_WOA6QYvwVGodV1naBhXUaj1Y_7pGcNqCHrrDlDqGy9wWOm1jRlc_Zl3ScO_jDm547078JjcWAbX6-p7MLiSEi5aybM48_0z_VHpBwQYgXlMn3dzuSmgcQ",
  bowl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyYws5Fys_aE-adxhuDD_sz2h4X7rc2d2oRcpMt-1GDeznVLVkSKHaGCU4tUFmdYK8baZ3VqwT1eDJviw2TG5fANsSLQaOXmJxrUzcJgcczs1s-DUwAiN_R4-HfsKfLCLt_2ub2PRKySlcc119FVUtahmxSrhyJle2zNjD6XDT5t79I1VKq0O0RdUMhiy5vir4M_l_yLEU5vZXCkQn99eK_vOWZx0uRC9DR6apWHpmCt7qKIucqkNdIw",
  crema: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6TlMYSCeaVSEChGmFW2g9mpZGctMswEiDdyk_Lwhcj3P5aHNDg5IryKObhpr1Osvzcuih-18-lj0raQJha7IiVwcGrDXdBiAZarFzUZe93ymvsc2h4MD8K_f2ASt-aa35C03DKUOOq8i7cvSTSPlk7tr30dqYZ-YtRxi8qSVoKz9_CP_7BrOA8vDuY5WM8NadcBC6n7HqHU4T7K3XhdYBtpv9GPAPJR6yWbzKV4oIXQ8JAltCS9sI8Q",
};

// img: null = sin foto (se muestra un ícono). Para los tacos pon aquí tu foto, ej: "/tacos.jpg"
export const PLATOS = [
  { id: 'salmon', titulo: 'Salmón Glaseado al Limón con Espárragos', img: IMG.salmon, min: 18, precio: 6.2, match: '98% Match', kcal: 520, dieta: 'Sin Gluten & Anti-inflamatorio', veces: 4, rating: 5.0, sensacion: 'Digestión perfecta', caliente: true },
  { id: 'bowl', titulo: 'Bowl Mediterráneo de Quinoa y Aguacate', img: IMG.bowl, min: 15, precio: 3.85, match: '95% Match', kcal: 480, dieta: 'Cero Trazas Gluten', veces: 6, rating: 4.9, sensacion: 'Energía limpia', caliente: false },
  { id: 'tacos', titulo: 'Tacos Saludables de Pollo y Yogur Griego', img: null, min: 20, precio: 4.5, match: '92% Match', kcal: 510, dieta: 'Maíz 100% Sin Gluten', veces: 3, rating: 4.8, sensacion: 'Saciedad alta', caliente: true },
  { id: 'crema', titulo: 'Crema Suave de Calabaza & Semillas Tostadas', img: IMG.crema, min: 12, precio: 2.4, match: '99% Match Económico', kcal: 310, dieta: 'Sin Lactosa & Confort', veces: 5, rating: 5.0, sensacion: 'Calma digestiva', caliente: true },
];

export const TABS = [
  { id: 'todos', label: 'Todos', n: 28 },
  { id: 'favoritos', label: 'Favoritos', n: 12, icono: 'bi-heart-fill' },
  { id: 'recientes', label: 'Cocinados Recientemente', n: 16 },
  { id: 'express', label: 'Platos Express < 15 min', n: 6, icono: 'bi-lightning-charge' },
];

// Reglas de los chips de filtro
export const FILTROS = [
  { id: 'eco', label: 'Económicos (< $6)', icono: 'bi-piggy-bank', cumple: (p) => p.precio < 6 },
  { id: 'fast', label: 'Rápidos (< 20 min)', icono: 'bi-stopwatch', cumple: (p) => p.min < 20 },
  { id: 'hot', label: 'Antojo Caliente', icono: 'bi-fire', cumple: (p) => p.caliente },
];

export const HISTORIAL = [
  {
    id: 'hoy', color: '#a92a4d', icono: 'bi-brightness-high', cuando: 'Hoy • Almuerzo (13:45)',
    tag: 'Resuelto en 30s', tagClase: 'fv-tag-green',
    titulo: 'Bowl Mediterráneo de Quinoa',
    texto: 'Resuelto con el Asistente Inteligente usando ingredientes ya existentes en tu despensa.',
    items: [{ icono: 'bi-piggy-bank', texto: 'Ahorraste $10.65 vs delivery' }, { icono: 'bi-emoji-smile', texto: 'Digestión Ligera reportada' }],
    extra: 'Costo real: $3.85',
  },
  {
    id: 'ayer', color: '#984533', icono: 'bi-moon-stars', cuando: 'Ayer • Cena (20:30)',
    tag: 'Zero Waste Trigger', tagClase: 'fv-tag-coral',
    titulo: 'Tortilla de Espinacas y Queso de Cabra Curado',
    texto: 'Aprovechó ingredientes próximos a caducar (calabacín y huevos frescos de granja).',
    items: [{ icono: 'bi-stopwatch', texto: 'Listo en 10 min' }, { icono: 'bi-receipt', texto: 'Costo ración: $2.15' }, { texto: 'Evitó desperdicio alimentario' }],
  },
  {
    id: 'miercoles', color: '#38654a', cuandoColor: '#38654a', icono: 'bi-calendar3', cuando: 'Miércoles • Almuerzo (14:10)',
    tag: "Sugerencia 'Sorpréndeme'", tagClase: 'fv-tag-coral',
    titulo: 'Salmón Glaseado al Limón',
    texto: 'Elegido mediante ruleta algorítmica cuando no sabías qué cocinar tras reunión agotadora.',
    items: [{ icono: 'bi-shield-check', texto: '100% Sin Gluten verificado' }, { icono: 'bi-receipt', texto: '$6.20 por porción' }],
  },
];
