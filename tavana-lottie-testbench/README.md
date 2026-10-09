# Tavana Lottie Test Bench

A single-page harness for measuring the Tavana CBT motion graphic on real devices,
without changing anything on the live site.

**Live page:** https://timirna.github.io/tavana-lottie-testbench/

## What it does

- Plays any of the four current animation files (English/Farsi × full/short)
- Shows live frames per second, rolling average, worst frame, and a stutter count
- Runs a measured 20-second test and logs results in a table
- Toggles between the SVG and Canvas renderers for comparison
- Reports the device's screen size, pixel ratio and core count

## Reading the results

| Average FPS | Meaning |
| --- | --- |
| 50+ | Smooth |
| 30–50 | Visibly uneven |
| under 30 | The reported stutter |

"Stutters" counts frames that took longer than 1/30 s. Let a test run the full
twenty seconds — the full-length versions get substantially heavier partway
through, so judging the opening understates the problem.

## Measured weight of each file

| File | Size | Paths | Bezier points | Peak concurrent | Median concurrent |
| --- | ---: | ---: | ---: | ---: | ---: |
| English full | 1031 KB | 951 | 13,020 | 8,317 | 1,016 |
| English short | 667 KB | 609 | 8,371 | 8,317 | 28 |
| Farsi full | 1150 KB | 1,065 | 15,928 | 12,059 | 11,995 |
| Farsi short | 835 KB | 752 | 12,113 | 12,059 | 11,995 |

Peak concurrent bezier points is the figure that predicts mobile frame rate:
the number of curve points the player redraws on the single busiest frame.

The English versions spike late — three outlined-text layers (2,649 / 2,747 /
2,857 points) all become visible around frame 615 and stay to the end, which is
99% of the peak. The Farsi versions sit near peak for their whole runtime.

## Files

```
index.html              the test bench (self-contained, no build step)
animations/*.json       the four Lottie files, as currently published
```

Lottie is loaded from cdnjs at a pinned version; everything else is inline.

## Local use

Any static server will do — `file://` will not, because the page fetches the
JSON files.

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Note

The animation files in this repository are the property of Tavana Health Group
and are included here only for performance testing.
