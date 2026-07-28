import { toBuffer } from "bwip-js/node";

/** Real, scannable QR code for the given value — server-rendered, returned as a data: URI. */
export async function generateQrCodeDataUri(value: string): Promise<string> {
  const buffer = await toBuffer({
    bcid: "qrcode",
    text: value,
    scale: 6,
    includetext: false,
    backgroundcolor: "ffffff",
  });
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

/** Real, scannable Code128 barcode for the given value — server-rendered, returned as a data: URI. */
export async function generateBarcodeDataUri(value: string): Promise<string> {
  const buffer = await toBuffer({
    bcid: "code128",
    text: value,
    scale: 3,
    height: 12,
    includetext: false,
    backgroundcolor: "ffffff",
  });
  return `data:image/png;base64,${buffer.toString("base64")}`;
}
