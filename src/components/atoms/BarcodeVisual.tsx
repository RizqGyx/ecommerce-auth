import { generateBarcodeDataUri } from "@/lib/codeImage";

/** Real, scannable Code128 barcode encoding `value` — generated server-side. */
const BarcodeVisual = async ({ value, label }: { value: string; label?: string }) => {
  const dataUri = await generateBarcodeDataUri(value);

  return (
    <div className="bg-white rounded-xl px-4 py-3 overflow-hidden">
      <div className="flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element -- data: URI, next/image gains nothing here */}
        <img src={dataUri} alt={`Barcode member: ${value}`} className="max-w-full h-14" />
      </div>
      {label && (
        <div className="text-center text-[9px] text-gray-700 font-mono mt-1">{label}</div>
      )}
    </div>
  );
};

export default BarcodeVisual;
