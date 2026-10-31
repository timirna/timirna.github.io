// Friendly labels for inputs we've confirmed exist in the shipped .riv files.
// The players only use these when the named input is actually found at runtime.
export const ariaHints = {
  numberLabels: { Expression: ["Neutral", "Happy", "Thinking", "Curious", "Encouraging", "Gentle Correction", "Listening"] },
};

// The cat's gaze rig has 5 rows (Look_Y every 0.5); the middle row has 9 poses
// (Look_X every 0.25), the other rows 3 (left, centre, right).
export const catHints = {
  numberRanges: { Look_X: [-1, 1, 0.25] as [number, number, number], Look_Y: [-1, 1, 0.5] as [number, number, number] },
  follow: { x: "Look_X", y: "Look_Y", xStep: 0.25, yStep: 0.5, xStepOffAxis: 1 },
};

export const riveHintsFor = (stateMachine?: string) =>
  stateMachine === "Aria" ? ariaHints : stateMachine === "Cat_SM" ? catHints : undefined;
