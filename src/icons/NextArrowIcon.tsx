import React from "react";

const NextArrowIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
    >
      <defs>
        <linearGradient
          id="c0bdcdarfa"
          x2="1.02"
          y2="1.01"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#5a63d8" />
          <stop offset="1" stopColor="#cd90e1" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="24" fill="url(#c0bdcdarfa)" />
      <path
        fill="#fff"
        d="M12.176 21.375l-2.32-7.91-8-2.344C.773 10.793 0 10.43 0 9.4c0-.821.715-1.407 1.652-1.758L20.777.317A3.76 3.76 0 0 1 22.1 0a1.123 1.123 0 0 1 1.207 1.219A3.73 3.73 0 0 1 23 2.543l-7.273 19.019c-.41 1.066-1 1.758-1.816 1.758-1.032 0-1.411-.832-1.735-1.945z"
        transform="rotate(45 3.242 32.255)"
      />
    </svg>
  );
};

export default NextArrowIcon;
