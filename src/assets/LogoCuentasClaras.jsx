import React from 'react';

const LogoCuentasClaras = ({ width = 45, height = 45, className = "" }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Fondo sutil (transparencia) que da el toque moderno */}
      <rect x="10" y="20" width="80" height="60" rx="16" fill="#0d6efd" fillOpacity="0.1"/>
      
      {/* Primera 'C' (Cuentas) */}
      <path 
        d="M 48 35 C 35 35 25 42 25 50 C 25 58 35 65 48 65" 
        stroke="#0d6efd" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Segunda 'C' (Claras) entrelazada */}
      <path 
        d="M 75 35 C 62 35 52 42 52 50 C 52 58 62 65 75 65" 
        stroke="#0dcaf0" /* Tono cyan/celeste para contraste */
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Punto de conexión (representa el control financiero) */}
      <circle cx="50" cy="50" r="5" fill="#0d6efd"/>
    </svg>
  );
};

export default LogoCuentasClaras;