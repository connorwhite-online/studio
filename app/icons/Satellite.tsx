import React from 'react';

interface SatelliteIconProps {
  size?: number;
  className?: string;
}

export default function Satellite({ size = 24, className = '' }: SatelliteIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4.50326 7.017C2.17399 10.5132 2.55158 15.2795 5.63604 18.364C8.72049 21.4484 13.4868 21.826 16.983 19.4967C17.468 19.1736 17.4925 18.4925 17.0804 18.0804L5.91959 6.91959C5.50747 6.50747 4.82641 6.53196 4.50326 7.017Z" />
      <path d="M21 12C21 7.02944 16.9706 3 12 3" />
      <path d="M18 12C18 8.68629 15.3137 6 12 6" />
      <path d="M12 12L13 11" />
      
    </svg>
  );
}