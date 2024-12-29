interface IconProps {
    className?: string;
    size?: number;
  }
  
  export default function Close({ className = '', size = 24 }: IconProps) {
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
        <path d="M5 5L19 19M19 5L5 19" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }