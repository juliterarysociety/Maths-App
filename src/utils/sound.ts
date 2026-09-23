// Lightweight Web Audio API sound synthesizer for gamified feedback without external assets.
// Uses a shared singleton AudioContext to prevent browser audio channel exhaustion.

let sharedAudioCtx: AudioContext | null = null;

export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;

  if (!sharedAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      sharedAudioCtx = new AudioContextClass();
    }
  }

  // Resume suspended context if user interacted (handles browser autoplay policy)
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {
      // Autoplay policy prevented playback; will resume on next user gesture
    });
  }

  return sharedAudioCtx;
};

export type SoundType = 'success' | 'error' | 'click' | 'complete';

export const playSound = (type: SoundType) => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'success') {
      // Cheerful ascending arpeggio (C5 -> E5 -> G5)
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        const startTime = now + idx * 0.08;
        const stopTime = now + idx * 0.08 + 0.22;
        osc.start(startTime);
        osc.stop(stopTime);

        osc.onended = () => {
          osc.disconnect();
          gain.disconnect();
        };
      });
    } else if (type === 'error') {
      // Gentle double buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.23);

      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    } else if (type === 'click') {
      // Subtle tactile click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);

      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
    } else if (type === 'complete') {
      // Grand celebration chord fanfare
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.12, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        const startTime = now + idx * 0.09;
        const stopTime = now + idx * 0.09 + 0.55;
        osc.start(startTime);
        osc.stop(stopTime);

        osc.onended = () => {
          osc.disconnect();
          gain.disconnect();
        };
      });
    }
  } catch (e) {
    // Ignore audio context autoplay policy warnings
  }
};

// Convenience helpers
export const playSuccessSound = () => playSound('success');
export const playErrorSound = () => playSound('error');
export const playClickSound = () => playSound('click');
export const playLevelUpSound = () => playSound('complete');
