"use client";
import Image from "next/image";
import { useState } from "react";

const Style = ({
  image,
  selectStyle,
  isSelected,
}: {
  image: string;
  selectStyle: () => void;
  isSelected: boolean;
}) => {
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <div
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onClick={selectStyle}
      className="relative w-fit cursor-pointer transition-all hover:scale-105"
    >
      <Image
        src={image}
        alt="image"
        width={300}
        height={200}
        className="min-w-52 rounded-lg"
      />
      {(mouseOver || isSelected) && (
        <>
          <div className="absolute w-4 h-4 -right-6 -top-4 border-t border-black -rotate-45"></div>
          <div className="absolute w-4 h-4 -right-3 -top-6 border-t border-black rotate-[-75deg]"></div>
          <div className="absolute w-4 h-4 -right-7 -top-0 border-t border-black rotate-[-20deg]"></div>
          <div className="absolute w-4 h-4 -left-4 -bottom-6 border-t border-black -rotate-45"></div>
          <div className="absolute w-4 h-4 -left-4 -bottom-6 border-t border-black -rotate-45"></div>
          <div className="absolute w-4 h-4 -left-6 -bottom-3 border-t border-black rotate-[-20deg]"></div>
          <div className="absolute w-4 h-4 -left-0 -bottom-7 border-t border-black rotate-[-75deg]"></div>
        </>
      )}
    </div>
  );
};
export default Style;
