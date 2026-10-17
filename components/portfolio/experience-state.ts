type PlaybackState = {
  entered: boolean;
  requested: boolean;
  reducedMotion: boolean;
  saveData: boolean;
  manualPlayback: boolean;
  visible: boolean;
  heroVisible: boolean;
  failed: boolean;
};

export function shouldPlayVideo(state: PlaybackState) {
  return state.entered && state.requested && state.visible &&
    state.heroVisible && !state.failed &&
    (state.manualPlayback || (!state.reducedMotion && !state.saveData));
}
