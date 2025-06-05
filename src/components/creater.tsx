"use client";
import React, { useEffect, useRef, useState } from "react";
import { Drop } from "./drop";
import Style from "./style";
import { removeBackground } from "@imgly/background-removal";

export const Creator: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState("style2");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [text, setText] = useState("pov");
  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(
    null
  );
  const [canvasReady, setCanvasReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setSelectedImage = async (file?: File) => {
    if (!file) return;

    setLoading(true);
    console.log("🔄 Image upload started");

    // Allow React to show spinner before heavy processing
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const src = e.target?.result as string;
          console.log("📥 FileReader loaded:", src.substring(0, 100)); // log preview

          setImageSrc(src);

          console.log("🪄 Starting background removal...");
          const blob = await removeBackground(src);
          console.log("✅ Background removed");

          const processedUrl = URL.createObjectURL(blob);
          console.log("📦 Processed URL created:", processedUrl);

          setProcessedImageSrc(processedUrl);
          setCanvasReady(true);
        } catch (error) {
          console.error("❌ Error during processing:", error);
        } finally {
          setLoading(false);
          console.log("✅ Done processing image");
        }
      };
      reader.readAsDataURL(file);
    }, 0);
  };

  useEffect(() => {
    if (canvasReady && processedImageSrc) {
      console.log("🖼 Drawing image to canvas...");
      drawCompositeImage();
    }
  }, [canvasReady, processedImageSrc]);

  const drawCompositeImage = () => {
    if (!canvasRef.current || !processedImageSrc || !imageSrc) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      console.log("🖌️ Image drawn on canvas");
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let fontSize = 100;
      let selectFont = "Arial";
      ctx.font = `${"bold"} ${fontSize}px ${selectFont}`;
      const textWidth = ctx.measureText(text).width;
      const targetwidth = canvas.width * 0.9;
      fontSize += targetwidth / textWidth;

      ctx.font = `${"bold"} ${fontSize}px ${selectFont}`;
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.globalAlpha = 1;
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      ctx.translate(x, y);
      ctx.fillText(text, 0, 0);
      ctx.restore();
    };
    img.onerror = (err) =>
      console.error("🛑 Error loading image onto canvas:", err);
    img.src = processedImageSrc;
  };

  return (
    <>
      {imageSrc ? (
        <>
          {loading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-dashed border-gray-800 border-t-transparent"></div>
            </div>
          ) : (
            <canvas
              ref={canvasRef}
              className="max-h-lg h-auto w-full max-w-lg rounded"
            />
          )}
        </>
      ) : (
        <div className="flex flex-col gap-6">
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
      )}
    </>
  );
};
