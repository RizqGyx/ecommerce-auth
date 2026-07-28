import { generateQrCodeDataUri } from "@/lib/codeImage";

/** Real, scannable QR code encoding `value` — generated server-side. */
const QRCodeVisual = async ({ value }: { value: string }) => {
  const dataUri = await generateQrCodeDataUri(value);

  return (
    <div className="p-4 bg-white rounded-xl inline-block">
      {/* eslint-disable-next-line @next/next/no-img-element -- data: URI, next/image gains nothing here */}
      <img src={dataUri} alt={`QR code member: ${value}`} width={168} height={168} />
    </div>
  );
};

export default QRCodeVisual;
