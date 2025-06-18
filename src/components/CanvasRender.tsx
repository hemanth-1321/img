import { domine, inter } from "@/app/fonts";
import { presets } from "@/app/constants/presets";

export function drawCompositeImage({
  canvas,
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
}: {
  canvas: HTMLCanvasElement;
  processedImageSrc: string;
  imageSrc: string;
  text: string;
  font: string;
  fontpx: number;
  textColor: string;
  alignment: "left" | "center" | "right" | "top";
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
}) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.save();

    // Horizontal text alignment
    ctx.textAlign =
      alignment === "left"
        ? "left"
        : alignment === "right"
        ? "right"
        : "center";

    // Vertical alignment: always middle unless 'top'
    ctx.textBaseline = "middle";

    // Font family
    const family =
      font === "inter"
        ? inter.style.fontFamily
        : font === "domine"
        ? domine.style.fontFamily
        : font;

    // Font style
    let style = "";
    if (isItalic) style += "italic ";
    if (isBold) style += "bold ";

    ctx.font = `${style}${fontpx}px ${family}`;
    ctx.fillStyle = textColor;
    ctx.globalAlpha = 1; // Use full opacity unless you want to re-add from preset

    // Positioning X
    let x = canvas.width / 2;
    if (alignment === "left") x = 50;
    if (alignment === "right") x = canvas.width - 50;

    // Positioning Y
    let y = alignment === "top" ? fontpx * 1.5 : canvas.height / 2;

    // Translate and draw
    ctx.translate(x, y);
    ctx.fillText(text, 0, 0);

    // Underline
    if (isUnderline) {
      const textMetrics = ctx.measureText(text);
      const underlineY = 10;
      ctx.beginPath();
      ctx.moveTo(-textMetrics.width / 2, underlineY);
      ctx.lineTo(textMetrics.width / 2, underlineY);
      ctx.strokeStyle = textColor;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.restore();

    // Foreground overlay image
    const fgImg = new Image();
    fgImg.onload = () =>
      ctx.drawImage(fgImg, 0, 0, canvas.width, canvas.height);
    fgImg.src = processedImageSrc;
  };

  img.src = imageSrc;
}
