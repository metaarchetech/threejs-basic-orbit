import { create } from 'zustand';
import * as Tone from 'tone';
import {
  kickSynth,
  noiseKick,
  synth,
  loopSynth,
  minorChord,
  arpNotes,
  kickPattern,
  dubLfo,
  lfo,
  masterVolume,
  reverb,
  delay,
  dubFilter,
  filter,
  hihatSynth,
  hihatPattern
} from './AudioSetup';

// 創建琶音循環器
const arpLoop = new Tone.Loop((time) => {
  loopSynth.triggerAttackRelease(arpNotes[currentNoteIndex], "8n", time);
  currentNoteIndex = (currentNoteIndex + 1) % arpNotes.length;
}, "4n");

// 創建大鼓循環
const kickLoop = new Tone.Loop((time) => {
  kickSynth.triggerAttackRelease("C1", "32n", time);
  noiseKick.triggerAttackRelease("32n", time, 0.8);
}, "4n");

// 創建 Hi-hat 循環
const hihatLoop = new Tone.Sequence(
  (time, velocity) => {
    hihatSynth.triggerAttackRelease("32n", time, velocity);
  },
  [null, 0.8, null, 0.8],
  "4n"
);

// 用於追踪音符位置
let currentNoteIndex = 0;

// 用於追踪主時鐘狀態
let isTransportRunning = false;

export const useAudioStore = create((set, get) => ({
  isAudioInitialized: false,
  isLoopPlaying: false,
  isKickPlaying: false,
  isHihatPlaying: false,
  
  initAudio: async () => {
    await Tone.start();
    lfo.start();
    dubLfo.start();
    set({ isAudioInitialized: true });
  },

  playMinorChord: () => {
    if (Tone.context.state !== "running") {
      console.warn("Audio context is not running");
      return;
    }
    synth.triggerAttackRelease(minorChord, "2n");
  },

  toggleKick: async () => {
    const state = get();
    if (!state.isAudioInitialized) {
      await state.initAudio();
    }

    if (state.isKickPlaying) {
      kickLoop.stop();
      if (!state.isLoopPlaying) {
        Tone.Transport.stop();
        isTransportRunning = false;
      }
    } else {
      if (!isTransportRunning) {
        Tone.Transport.start();
        isTransportRunning = true;
      }
      kickLoop.start(0);
    }
    
    set({ isKickPlaying: !state.isKickPlaying });
  },

  toggleHihat: async () => {
    const state = get();
    if (!state.isAudioInitialized) {
      await state.initAudio();
    }

    if (state.isHihatPlaying) {
      hihatLoop.stop();
      if (!state.isKickPlaying && !state.isLoopPlaying) {
        Tone.Transport.stop();
        isTransportRunning = false;
      }
    } else {
      if (!isTransportRunning) {
        Tone.Transport.start();
        isTransportRunning = true;
      }
      hihatLoop.start(0);
    }
    
    set({ isHihatPlaying: !state.isHihatPlaying });
  },

  toggleLoop: async () => {
    const state = get();
    if (!state.isAudioInitialized) {
      await state.initAudio();
    }

    if (state.isLoopPlaying) {
      arpLoop.stop();
      currentNoteIndex = 0;
      if (!state.isKickPlaying) {
        Tone.Transport.stop();
        isTransportRunning = false;
      }
    } else {
      if (!isTransportRunning) {
        Tone.Transport.start();
        isTransportRunning = true;
      }
      arpLoop.start(0);
    }
    
    set({ isLoopPlaying: !state.isLoopPlaying });
  }
}));

export function initAudio() {
  // ... existing code ...
  
  // 啟動所有循環
  kickLoop.start(0);
  arpLoop.start(0);
  hihatLoop.start(0);
  dubLfo.start();
  lfo.start();
  
  Tone.Transport.start();
} 