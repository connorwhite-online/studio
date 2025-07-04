import React from 'react';

interface FistBumpIconProps {
  size?: number;
  className?: string;
}

export default function FistBump({ size = 24, className = '' }: FistBumpIconProps) {
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
      <path d="M12.0017 6V4M8.14886 7.40371L6.86328 5.87162M15.864 7.40367L17.1496 5.87158M2 19.0001H7.35165C8.86462 19.0001 10.1408 17.8735 10.3285 16.3722L10.5785 14.3722C10.8023 12.5817 9.40615 11.0001 7.60165 11.0001H7.5L6.79566 10.5305C6.2889 10.1927 5.66315 10.0843 5.07229 10.232C4.39889 10.4004 3.8473 10.8819 3.58951 11.5263L3 13.0001H2M22.0005 19.0001H16.6489C15.1359 19.0001 13.8597 17.8735 13.672 16.3722L13.422 14.3722C13.1982 12.5817 14.5944 11.0001 16.3989 11.0001H16.5005L17.2049 10.5305C17.7116 10.1927 18.3374 10.0843 18.9282 10.232C19.6016 10.4004 20.1532 10.8819 20.411 11.5263L21.0005 13.0001H22.0005" />
    </svg>
  );
}