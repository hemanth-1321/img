"use client";
import React from "react";
import { Drop } from "./drop";

export const creator = () => {};
export const Creator: React.FC = () => {
  const setSelectedImage = async (file?: File) => {};
  return (
    <div>
      <Drop setSelectedImage={setSelectedImage} />
    </div>
  );
};
