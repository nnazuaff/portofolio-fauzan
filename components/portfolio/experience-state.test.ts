import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { shouldPlayVideo } from "./experience-state";

const ready = {
  entered: true,
  requested: true,
  reducedMotion: false,
  saveData: false,
  manualPlayback: false,
  visible: true,
  heroVisible: true,
  failed: false,
};

describe("entry splash", () => {
  it("starts open without persisting entry across refreshes", () => {
    const source = readFileSync(new URL("./experience.tsx", import.meta.url), "utf8");
    expect(source).toContain("[gateOpen, setGateOpen] = useState(true)");
    expect(source).not.toContain("sessionStorage");
    expect(source).toContain('window.history.scrollRestoration = "manual"');
    expect(source).toContain('window.scrollTo({ top: 0, left: 0, behavior: "instant" })');
    expect(source).toContain('window.removeEventListener("scroll", resetScroll)');
  });
});

describe("background playback", () => {
  it("starts only after entry and pauses outside the visible hero", () => {
    expect(shouldPlayVideo(ready)).toBe(true);
    for (const change of [
      { entered: false }, { requested: false }, { visible: false },
      { heroVisible: false }, { failed: true },
    ]) expect(shouldPlayVideo({ ...ready, ...change })).toBe(false);
  });

  it("honors reduced motion and data saving unless playback was explicit", () => {
    expect(shouldPlayVideo({ ...ready, reducedMotion: true })).toBe(false);
    expect(shouldPlayVideo({ ...ready, saveData: true })).toBe(false);
    expect(shouldPlayVideo({ ...ready, reducedMotion: true, manualPlayback: true })).toBe(true);
    expect(shouldPlayVideo({ ...ready, saveData: true, manualPlayback: true })).toBe(true);
    expect(shouldPlayVideo({ ...ready, requested: false, manualPlayback: true })).toBe(false);
  });
});
