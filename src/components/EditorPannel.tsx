"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { fontOptions } from "@/app/constants/presets";
import { Toggle } from "@/components/ui/toggle";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";

interface EditorProps {
  text: string;
  setText: (val: string) => void;
  font: string;
  setFont: (val: string) => void;
  fontpx: number;
  setFontpx: (val: number) => void;
  textColor: string;
  setTextColor: (val: string) => void;
  alignment: "left" | "center" | "right" | "top";
  setAlignment: (val: "left" | "center" | "right" | "top") => void;
  isBold: boolean;
  setIsBold: (val: boolean) => void;
  isItalic: boolean;
  setIsItalic: (val: boolean) => void;
  isUnderline: boolean;
  setIsUnderline: (val: boolean) => void;
  onDownload: () => void;
  onReset: () => void;
}

export const EditorPanel: React.FC<EditorProps> = ({
  text,
  setText,
  font,
  setFont,
  fontpx,
  setFontpx,
  textColor,
  setTextColor,
  alignment,
  setAlignment,
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  isUnderline,
  setIsUnderline,
  onDownload,
  onReset,
}) => {
  return (
    <div className="w-full max-w-lg border border-gray-200 shadow-md rounded-2xl">
      <div className="p-6 space-y-6">
        {/* Text Input */}
        <div className="flex flex-col space-y-2">
          <Label>Text</Label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text in thumbnail"
          />
        </div>

        {/* Font Family */}
        <div className="flex flex-col space-y-2">
          <Label>Font</Label>
          <Select value={font} onValueChange={setFont}>
            <SelectTrigger>
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto">
              {fontOptions.map((f) => (
                <SelectItem key={f} value={f} style={{ fontFamily: f }}>
                  {f}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Font Size */}
        <div className="flex flex-col space-y-2">
          <Label>Font Size</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[fontpx]}
              onValueChange={(v) => setFontpx(v[0])}
              max={900}
              step={1}
            />
            <span className="w-12 text-right">{fontpx}px</span>
          </div>
        </div>

        {/* Text Color */}
        <div className="flex flex-col space-y-2">
          <Label>Text Color</Label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="w-12 h-10 border rounded"
          />
        </div>

        {/* Alignment */}
        <div className="flex flex-col space-y-2">
          <Label>Text Alignment</Label>
          <div className="flex gap-2">
            <Toggle
              pressed={alignment === "top"}
              onPressedChange={(val) => setAlignment("top")}
            >
              Top
            </Toggle>
            <Toggle
              pressed={alignment === "left"}
              onPressedChange={() => setAlignment("left")}
            >
              <AlignLeft className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={alignment === "center"}
              onPressedChange={() => setAlignment("center")}
            >
              <AlignCenter className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={alignment === "right"}
              onPressedChange={() => setAlignment("right")}
            >
              <AlignRight className="w-4 h-4" />
            </Toggle>
          </div>
        </div>

        {/* Text Styles */}
        <div className="flex flex-col space-y-2">
          <Label>Styles</Label>
          <div className="flex gap-2">
            <Toggle pressed={isBold} onPressedChange={(val) => setIsBold(val)}>
              <Bold className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={isItalic}
              onPressedChange={(val) => setIsItalic(val)}
            >
              <Italic className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={isUnderline}
              onPressedChange={(val) => setIsUnderline(val)}
            >
              <Underline className="w-4 h-4" />
            </Toggle>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button onClick={onDownload}>Download</Button>
          <Button variant="secondary" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
