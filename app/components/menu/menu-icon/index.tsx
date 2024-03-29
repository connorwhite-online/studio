import React from 'react';

const MenuIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg
    ref={ref}
    width="22"
    height="22"
    viewBox="0 0 26 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
        d="M24.1429 14.8571H18.8571C16.648 14.8571 14.8571 16.648 14.8571 18.8571V24.1429C14.8571 25.1643 14.0214 26 13 26C11.9786 26 11.1429 25.1643 11.1429 24.1429V18.8571C11.1429 16.648 9.352 14.8571 7.14286 14.8571H1.85714C0.835714 14.8571 0 14.0214 0 13C0 11.9786 0.835714 11.1429 1.85714 11.1429H7.14286C9.352 11.1429 11.1429 9.352 11.1429 7.14286V1.85714C11.1429 0.835714 11.9786 0 13 0C14.0214 0 14.8571 0.835714 14.8571 1.85714V7.14286C14.8571 9.352 16.648 11.1429 18.8571 11.1429H24.1429C25.1643 11.1429 26 11.9786 26 13C26 14.0214 25.1643 14.8571 24.1429 14.8571Z"
        fill="white"
    />
  </svg>
));


MenuIcon.displayName = 'MenuIcon';

export default MenuIcon;

