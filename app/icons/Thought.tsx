import React from 'react';

interface ThoughtIconProps {
  size?: number;
  className?: string;
}

export default function Thought({ size = 24, className = '' }: ThoughtIconProps) {
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
        <circle cx="5" cy="19" r="2"/>
        <path d="M15.8805 5.15879C16.2357 5.05542 16.6114 5 17 5C19.2091 5 21 6.79086 21 9C21 10.6222 20.0343 12.0189 18.6465 12.6465C18.0189 14.0343 16.6222 15 15 15C14.1496 15 13.3611 14.7346 12.713 14.2821C12.2322 15.2976 11.1981 16 10 16C8.34315 16 7 14.6569 7 13C7 12.826 7.01482 12.6554 7.04326 12.4895C5.82384 11.8043 5 10.4984 5 9C5 6.79086 6.79086 5 9 5C9.38862 5 9.76429 5.05542 10.1195 5.15878C10.4832 3.9114 11.6352 3 13 3C14.3648 3 15.5168 3.9114 15.8805 5.15879Z" />
    </svg>
  );
} 