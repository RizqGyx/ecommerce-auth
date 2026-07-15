/** Generates a deterministic barcode-like bar pattern from a string value. */
const BarcodeVisual = ({ value, label }: { value: string; label?: string }) => {
  const bars: number[] = [];
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    bars.push(((code % 4) + 1) * 2);
    bars.push(((code * 3) % 3) + 1);
  }
  const displayBars = bars.slice(0, 60);

  return (
    <div className="bg-white rounded-xl px-4 py-2 overflow-hidden">
      <div className="flex items-center justify-center gap-0 py-2">
        {displayBars.map((width, i) => (
          <div
            key={i}
            style={{ width }}
            className={`h-14 ${i % 2 === 0 ? "bg-gray-900" : "bg-transparent"}`}
          />
        ))}
      </div>
      {label && (
        <div className="text-center text-[9px] text-gray-700 font-mono mt-1">{label}</div>
      )}
    </div>
  );
};

export default BarcodeVisual;
