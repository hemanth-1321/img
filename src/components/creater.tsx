"use client";
import React, { useRef, useState, useEffect } from "react";
import { Drop } from "./drop";
import Style from "./style";
import { EditorPanel } from "@/components/EditorPannel";
import { drawCompositeImage } from "@/components/CanvasRender";
import { getPreSignedUrl } from "@/app/actions/aws";
import { MoveLeft } from "lucide-react";
import { toast } from "sonner";
import { removeBackground } from "@imgly/background-removal";
import axios from "axios";
import { Button } from "./ui/button";

export const Creator = () => {
  const [selectedStyle, setSelectedStyle] = useState("style2");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [textColor, setTextColor] = useState("#000000");
  const [alignment, setAlignment] = useState<
    "left" | "center" | "right" | "top"
  >("center");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(
    null
  );
  const [canvasReady, setCanvasReady] = useState(false);
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("POV");
  const [font, setFont] = useState("Arial");
  const [fontpx, setFontpx] = useState(100);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setSelectedImage = async (file?: File) => {
    if (!file) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const src = e.target?.result as string;
      setImageSrc(src);
      const blob = await removeBackground(src);
      setProcessedImageSrc(URL.createObjectURL(blob));
      setCanvasReady(true);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (canvasReady && processedImageSrc && canvasRef.current && imageSrc) {
      drawCompositeImage({
        canvas: canvasRef.current,
        processedImageSrc,
        imageSrc,
        text,
        font,
        fontpx,
        textColor,
        alignment,
        isBold,
        isItalic,
        isUnderline,
      });
    }
  }, [
    canvasReady,
    processedImageSrc,
    imageSrc,
    text,
    font,
    fontpx,
    selectedStyle,
    textColor,
    alignment,
    isBold,
    isItalic,
    isUnderline,
  ]);

  const handleDownload = async () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = "image.png";
    link.href = canvasRef.current.toDataURL();
    link.click();

    canvasRef.current.toBlob(async (blob) => {
      if (blob) {
        try {
          const uploadurl = await getPreSignedUrl();
          await axios.put(uploadurl, blob, {
            headers: { "Content-Type": "image/png" },
          });
          toast.success("Image uploaded successfully");
        } catch {
          toast.error("Upload failed ❌");
        }
      }
    });
  };

  const handleReset = () => {
    setText("Pov");
    setFont("Arial");
    setFontpx(100);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {imageSrc ? (
        loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-6 text-center">
            <div className="relative">
              <div className="h-14 w-14 rounded-full border-4 border-dashed border-teal-600 animate-spin border-t-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-teal-600 animate-pulse">
                ⚙️
              </div>
            </div>

            <blockquote className="mt-4 text-lg italic text-gray-600 max-w-md px-4">
              Hold tight, Picasso! 🎨
              <br />
              We're removing the background magic 🪄
              <br />
              Large images might take a few more moments...
            </blockquote>
          </div>
        ) : (
          <div className="min-h-screen w-full flex items-center justify-center px-4 py-12 bg-gray-50">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-7xl">
              <div className="flex flex-col gap-4 items-center">
                <Button
                  onClick={() => setImageSrc(null)}
                  className="text-sm px-3 py-1 h-auto"
                  variant="outline"
                >
                  <MoveLeft className="mr-2 w-4 h-4" /> Go Back
                </Button>

                <canvas
                  ref={canvasRef}
                  className="max-w-lg w-full h-auto rounded-lg border border-gray-300 shadow-md"
                />
              </div>

              <EditorPanel
                text={text}
                setText={setText}
                font={font}
                setFont={setFont}
                fontpx={fontpx}
                setFontpx={setFontpx}
                textColor={textColor}
                setTextColor={setTextColor}
                alignment={alignment}
                setAlignment={setAlignment}
                isBold={isBold}
                setIsBold={setIsBold}
                isItalic={isItalic}
                setIsItalic={setIsItalic}
                isUnderline={isUnderline}
                setIsUnderline={setIsUnderline}
                onDownload={handleDownload}
                onReset={handleReset}
              />
            </div>
          </div>
        )
      ) : (
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Create a Thumbnail</h1>
          <div className="flex flex-wrap justify-center gap-4">
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
    </div>
  );
};
