import React from 'react';

interface ArrowLeftIconProps {
  size?: number;
  className?: string;
  color?: string;
}

export default function ArrowLeft({ size = 16, className = '' }: ArrowLeftIconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6.66666 4L2.66666 7.99999L6.66666 12M3.33332 7.99999H13.3333" />
    </svg>
  );
} 