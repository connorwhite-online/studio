interface IconProps {
    className?: string;
    size?: number;
  }
  
  export default function Moon({ className = '', size = 24 }: IconProps) {
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
        <path d="M20.9677 12.7674C19.84 13.5447 18.4732 13.9998 17 13.9998C13.134 13.9998 10 10.8657 10 6.99975C10 5.52667 10.455 4.15987 11.2322 3.03223C6.62302 3.42277 3.00391 7.28768 3.00391 11.9979C3.00391 16.9674 7.03251 20.996 12.002 20.996C16.7123 20.996 20.5773 17.3767 20.9677 12.7674Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }