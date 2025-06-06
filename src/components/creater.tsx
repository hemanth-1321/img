"use client";
import React, { useEffect, useRef, useState } from "react";
import { Drop } from "./drop";
import Style from "./style";
import { removeBackground } from "@imgly/background-removal";
import { Button } from "./ui/button";
import { MoveLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";

const presets = {
  style1: {
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(255,255,255,1)",
    opacity: 1,
  },
  style2: {
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(0,0,0,1)",
    opacity: 1,
  },
  style3: {
    fontSize: 100,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.8)",
    opacity: 0.8,
  },
};
const fontOptions = ["Arial", "Inter", "Domine"];

export const Creator: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState("style2");
  const [loading, setLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [text, setText] = useState("hemanth");
  const [font, setFont] = useState("Arial");

  const [processedImageSrc, setProcessedImageSrc] = useState<string | null>(
    null
  );
  const [canvasReady, setCanvasReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setSelectedImage = async (file?: File) => {
    if (!file) return;

    setLoading(true);
    console.log("🔄 Image upload started");

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
      let preset = presets.style1;
      switch (selectedStyle) {
        case "style2":
          preset = presets.style2;
          break;
        case "style3":
          preset = presets.style3;
          break;
      }
      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let fontSize = 100;
      let selectFont = font;
      ctx.font = `${preset.fontWeight} ${fontSize}px ${selectFont}`;
      const textWidth = ctx.measureText(text).width;
      const targetwidth = canvas.width * 0.9;
      fontSize *= targetwidth / textWidth;
      ctx.font = `${preset.fontWeight} ${fontSize}px ${selectFont}`;
      ctx.fillStyle = preset.color;
      ctx.globalAlpha = preset.opacity;
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      ctx.translate(x, y);
      ctx.fillText(text, 0, 0);
      ctx.restore();

      const fgImg = new Image();
      fgImg.onload = () => {
        ctx.drawImage(fgImg, 0, 0, canvas.width, canvas.height);
      };
      fgImg.src = processedImageSrc;
    };
    img.onerror = (err) =>
      console.error("🛑 Error loading image onto canvas:", err);
    img.src = imageSrc;
  };
  const handleDownload = async () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = `image.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
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
            <>
              <div className="flex w-full max-w-2xl flex-col items-center gap-5">
                <div className="flex flex-col items-center justify-center gap-2 mb-20">
                  <Button
                    onClick={() => {
                      setProcessedImageSrc(null);
                      setCanvasReady(false);
                      setImageSrc(null);
                    }}
                    className="flex items-center gap-2 self-start cursor-pointer"
                  >
                    <MoveLeft className="h-4 w-4" />
                    <p className="leading-7">Go back</p>
                  </Button>
                  <div className="flex flex-col gap-4">
                    <canvas
                      ref={canvasRef}
                      className="max-h-lg h-auto w-full max-w-lg rounded"
                    />
                    <Button onClick={handleDownload}>download</Button>
                  </div>
                  <Card className="w-full max-w-lg border border-gray-200 shadow-md rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        Edit
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="text" className="text-sm text-gray-700">
                          Text
                        </Label>
                        <Input
                          id="text"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Text in thumbnail"
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="font" className="text-sm text-gray-700">
                          Font
                        </Label>
                        <div className="text-black">
                          <Select value={font} onValueChange={setFont}>
                            <SelectTrigger
                              id="font"
                              className="w-full border border-gray-300 px-3 py-2 text-sm rounded-md focus:ring-2 focus:ring-blue-500"
                            >
                              <SelectValue placeholder="Select a font" />
                            </SelectTrigger>

                            <SelectContent
                              className="z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg"
                              position="popper"
                            >
                              {fontOptions.map((fontName) => (
                                <SelectItem
                                  key={fontName}
                                  value={fontName}
                                  className="px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100"
                                  style={{ fontFamily: fontName }}
                                >
                                  {fontName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex flex-wrap justify-between gap-2 pt-4">
                      <Button onClick={handleDownload}>Download</Button>
                      <Button onClick={drawCompositeImage}>Update</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Hi there
          </h1>
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Want to create a thumbnail?
          </h2>
          <p className="text-muted-foreground mt-4 leading-7">
            Select one of our templates
          </p>
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
