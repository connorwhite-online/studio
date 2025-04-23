interface IconProps {
    className?: string;
    size?: number;
  }
  
  export default function Image({ className = '', size = 24 }: IconProps) {
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
        <path d="M4 14.2105L6.84488 12.0821C7.66137 11.5378 8.75215 11.6663 9.41987 12.3853C10.9123 13.9926 12.6426 15.4538 15 15.4538C17.1727 15.4538 18.6125 14.6485 20 13.261M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20ZM17 9C17 10.1046 16.1046 11 15 11C13.8954 11 13 10.1046 13 9C13 7.89543 13.8954 7 15 7C16.1046 7 17 7.89543 17 9Z" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
  );
}