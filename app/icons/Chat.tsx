import React from 'react';

interface ChatIconProps {
  size?: number;
  className?: string;
}

export default function Chat({ size = 24, className = '' }: ChatIconProps) {
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
      <path d="M21.5 12C21.5 7 17.8056 4 12 4C6.19444 4 2.5 7 2.5 12C2.5 13.2943 3.39422 15.4896 3.53656 15.8309C3.54957 15.862 3.56246 15.8905 3.57409 15.9222C3.67156 16.188 4.06312 17.5822 2.5 19.6439C4.61111 20.6439 6.8531 19 6.8531 19C8.40425 19.8154 10.2499 20 12 20C17.8056 20 21.5 17 21.5 12Z" />
    </svg>
  );
}