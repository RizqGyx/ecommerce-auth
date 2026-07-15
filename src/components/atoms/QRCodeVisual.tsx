/**
 * Generates a deterministic QR-like grid pattern from a string value.
 * Pure CSS/SVG — no external library required.
 */
const QRCodeVisual = ({ value }: { value: string }) => {
  const size = 21;

  const grid: boolean[][] = Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => {
      // Finder pattern corners
      if (
        (row < 8 && col < 8) ||
        (row < 8 && col >= size - 8) ||
        (row >= size - 8 && col < 8)
      ) {
        const outerBorder =
          row === 0 || row === 6 || col === 0 || col === 6 ||
          row === size - 8 || row === size - 2 || col === size - 8 || col === size - 2;
        const innerFill =
          (row >= 2 && row <= 4 && col >= 2 && col <= 4) ||
          (row >= 2 && row <= 4 && col >= size - 6 && col <= size - 4) ||
          (row >= size - 6 && row <= size - 4 && col >= 2 && col <= 4);
        return outerBorder || innerFill;
      }
      // Deterministic data modules
      const seed =
        (row * size + col + value.charCodeAt((row * col) % value.length)) *
          6364136223846793005 +
        1442695040888963407;
      return ((seed >> 33) ^ seed) % 2 === 0;
    })
  );

  return (
    <div className="p-4 bg-white rounded-xl inline-block">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 8px)`,
        }}
      >
        {grid.flat().map((filled, i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              backgroundColor: filled ? "#0a0a0a" : "#ffffff",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default QRCodeVisual;
