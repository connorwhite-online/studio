import React from 'react';

interface ArrowRightIconProps {
  size?: number;
  className?: string;
}

export default function ArrowRight({ size = 16, className = '' }: ArrowRightIconProps) {
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
      <path d="M9.33335 4L13.3334 7.99999L9.33335 12M12.6667 7.99999H2.66669" />
    </svg>
  );
} 