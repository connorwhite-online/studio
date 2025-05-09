interface IconProps {
  className?: string;
  size?: number;
}

export default function Home({ className = '', size = 24 }: IconProps) {
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
      <path d="M20 18V9.90754C20 9.33081 19.751 8.78216 19.317 8.40238L13.317 3.15238C12.563 2.49259 11.437 2.49259 10.683 3.15238L4.68299 8.40238C4.24896 8.78216 4 9.33081 4 9.90754V18C4 19.1046 4.89543 20 6 20H9C9.55228 20 10 19.5523 10 19V16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16V19C14 19.5523 14.4477 20 15 20H18C19.1046 20 20 19.1046 20 18Z" strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}
