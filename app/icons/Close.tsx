interface IconProps {
    className?: string;
    size?: number;
    style?: React.CSSProperties;
  }
  
  export default function Close({ className = '', size = 24, style }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        className={className}
        style={style}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 5L19 19M19 5L5 19" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }