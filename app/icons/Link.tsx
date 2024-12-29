interface IconProps {
    className?: string;
    size?: number;
  }
  
  export default function Link({ className = '', size = 24 }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.99988 19L9.82831 19.1716C8.26622 20.7337 5.73355 20.7337 4.17146 19.1716L3.82831 18.8284C2.26622 17.2663 2.26621 14.7337 3.82831 13.1716L7.17146 9.82843C8.73356 8.26634 11.2662 8.26634 12.8283 9.82843L13.1715 10.1716C13.8251 10.8252 14.2052 11.6487 14.3118 12.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.68799 12.5C9.79463 13.3513 10.1748 14.1748 10.8284 14.8284L11.1715 15.1716C12.7336 16.7337 15.2663 16.7337 16.8284 15.1716L20.1715 11.8284C21.7336 10.2663 21.7336 7.73368 20.1715 6.17158L19.8284 5.82843C18.2663 4.26634 15.7336 4.26634 14.1715 5.82843L14 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>      
    </svg>
    );
  }