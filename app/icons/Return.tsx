import React from 'react';

interface ReturnIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Return({ size = 24, className = '', style }: ReturnIconProps) {
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
      <path d="M20 19V11C20 9.89543 19.1046 9 18 9H5M8 13L4 9L8 5" />
    </svg>
  );
} 