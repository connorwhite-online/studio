import React from 'react';

interface ArrowUpIconProps {
  size?: number;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

export default function ArrowUp({ size = 24, className = '', style }: ArrowUpIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M16.25 11L12.7071 7.45711C12.3166 7.06658 11.6834 7.06658 11.2929 7.45711L7.75 11M12 21V7.75M19 3H5" />
    </svg>
  );
}
