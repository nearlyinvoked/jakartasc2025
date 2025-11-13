import { useEffect, useRef } from "react";
import QRCode from "qrcode";

interface QRCodeWithLogoProps {
  url: string;
  logoUrl: string;
  size?: number;
}

export default function QRCodeWithLogo({
  url = "https://jakartasc2025.info/en",
  logoUrl = "/eventsc.svg",
  size = 300,
}: QRCodeWithLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = size;
      canvas.height = size;

      try {
        // Generate QR code using qrcode library
        await QRCode.toCanvas(canvas, url, {
          errorCorrectionLevel: "M",
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
          width: size,
        });

        // Load and draw logo in the center
        const logo = new Image();
        logo.onload = () => {
          const logoSize = size * 0.15; // Logo takes 15% of QR code size
          const logoX = (size - logoSize) / 2;
          const logoY = (size - logoSize) / 2;

          // Create white background for logo with border
          const padding = 8;
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(
            logoX - padding,
            logoY - padding,
            logoSize + padding * 2,
            logoSize + padding * 2
          );

          // Add border around logo
          ctx.strokeStyle = "#E5E7EB";
          ctx.lineWidth = 2;
          ctx.strokeRect(
            logoX - padding,
            logoY - padding,
            logoSize + padding * 2,
            logoSize + padding * 2
          );

          // Draw logo
          ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

          // Update download link
          if (downloadLinkRef.current) {
            downloadLinkRef.current.href = canvas.toDataURL("image/png");
          }
        };
        logo.crossOrigin = "anonymous";
        logo.src = logoUrl;
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    generateQRCode();
  }, [url, logoUrl, size]);

  const downloadQRCode = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = "qr-code-with-logo.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <h2 className="text-2xl font-bold text-center">QR Code Generator</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <canvas
          ref={canvasRef}
          className="border border-gray-200 rounded"
          width={size}
          height={size}
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">
          URL: <span className="font-mono text-blue-600">{url}</span>
        </p>
        <button
          onClick={downloadQRCode}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download QR Code
        </button>
      </div>
      <a ref={downloadLinkRef} style={{ display: "none" }} />
    </div>
  );
}
