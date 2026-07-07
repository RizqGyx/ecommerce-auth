export function featuresToText(features: unknown) {
  if (!Array.isArray(features)) return "";
  return features
    .map((f) => `${f.included ? "+" : "-"} ${f.text}`)
    .join("\n");
}
