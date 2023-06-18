import * as React from "react";

interface ArrowUpProps {
  color: string;
  style: React.CSSProperties;
}

const ArrowUp = (props: ArrowUpProps) => {
  return (
    <svg
      width="55"
      height="77"
      viewBox="0 0 55 77"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.29291 28.023L28.023 1.29291M26.7071 1.29291L53.4373 28.023M27.4 2.00001V77"
        stroke={props.color}
        strokeWidth="2.8"
      />
    </svg>
  );
};

export default ArrowUp;
