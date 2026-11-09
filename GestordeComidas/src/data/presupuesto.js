// Datos de la página de Presupuesto.
const redondear = (n) => Math.round(n * 100) / 100;

export const SEMANA = [
  { dia: 'Lun', valor: 11.5 },
  { dia: 'Mar', valor: 8.2 },
  { dia: 'Mié', valor: 14 },
  { dia: 'Jue', valor: 9.5 },
  { dia: 'Vie', valor: 19.3 },
  { dia: 'Sáb', valor: 15 },
];

export const GASTADO = redondear(SEMANA.reduce((suma, d) => suma + d.valor, 0)); // 77.50
export const LIMITE_INICIAL = 120;

export const CATEGORIAS = [
  { nombre: 'Proteínas y Carnes/Pescado de calidad', monto: 29.45, pct: 38, color: '#a92a4d' },
  { nombre: 'Verduras y Productos Frescos de despensa', monto: 20.15, pct: 26, color: '#38654a' },
  { nombre: 'Granos, Quinoa y Carbohidratos sin gluten', monto: 15.5, pct: 20, color: '#f98a73' },
  { nombre: 'Aceites y Especias especiales', monto: 12.4, pct: 16, color: '#8b6b70' },
];
