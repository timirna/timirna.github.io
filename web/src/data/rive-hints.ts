// Friendly labels for inputs we've confirmed exist in the shipped .riv files.
// The players only use these when the named input is actually found at runtime.
export const ariaHints = {
  numberLabels: { Expression: ["Neutral", "Happy", "Thinking", "Curious", "Encouraging", "Gentle Correction", "Listening"] },
};

export const catHints = {
  numberRanges: { Look_X: [-1, 1, 0.25] as [number, number, number], Look_Y: [-1, 1, 0.5] as [number, number, number] },
};
