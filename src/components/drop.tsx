import React from "react";

type DropProps = {
  setSelectedImage: (file?: File) => void;
};

export const Drop: React.FC<DropProps> = ({ setSelectedImage }) => {
  return (
    <div className="relative w-full mt-10">
      <input
        onChange={(e) => setSelectedImage(e.target.files?.[0])}
        type="file"
        id="file-upload"
        accept="image/*"
        className="hidden"
      />
      <label
        htmlFor="file-upload"
        className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-2xl border border-[#cfc0c0] bg-white py-10 px-10 text-center text-gray-700 font-medium"
      >
        Upload Image
      </label>

      {/* Dashed overlay */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-dashed border-[#cfc0c0]" />
    </div>
  );
};
