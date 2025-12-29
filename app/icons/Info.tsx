interface IconProps {
    className?: string;
    size?: number;
    style?: React.CSSProperties;
  }
  
  export default function Info({ className = '', size = 24, style }: IconProps) {
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
        <path d="M11 11H12V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.25 8C11.25 8.41421 11.5858 8.75 12 8.75C12.4142 8.75 12.75 8.41421 12.75 8C12.75 7.58579 12.4142 7.25 12 7.25C11.5858 7.25 11.25 7.58579 11.25 8Z" fill="currentColor" strokeWidth="0.5"/>
      </svg>
    );
  }