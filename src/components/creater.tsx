"use client";
import React, { useState } from "react";
import { Drop } from "./drop";
import Style from "./style";

export const creator = () => {};
export const Creator: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState("style2");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const setSelectedImage = async (file?: File) => {
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const src = e.target?.result as string;
        setImageSrc(src);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {imageSrc ? (
        <>
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-dashed border-gray-800">
                {" "}
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col gap-6 ">
            <div className="flex mt-10 flex-col items-center justify-between gap-10 md:flex-row">
              <Style
                image="/test.jpg"
                selectStyle={() => setSelectedStyle("style1")}
                isSelected={selectedStyle === "style1"}
              />
              <Style
                image="/test.jpg"
                selectStyle={() => setSelectedStyle("style2")}
                isSelected={selectedStyle === "style2"}
              />
              <Style
                image="/test.jpg"
                selectStyle={() => setSelectedStyle("style3")}
                isSelected={selectedStyle === "style3"}
              />
            </div>
            <Drop setSelectedImage={setSelectedImage} />
          </div>
        </>
      )}
    </>
  );
};
