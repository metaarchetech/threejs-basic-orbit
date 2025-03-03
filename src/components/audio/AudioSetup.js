import * as Tone from 'tone';

// 主音量控制
export const masterVolume = new Tone.Volume(-12).toDestination();

// 創建音頻效果
export const reverb = new Tone.Reverb({
  decay: 4,
  wet: 0.5
}).connect(masterVolume);

export const delay = new Tone.FeedbackDelay({
  delayTime: "8n",
  feedback: 0.4,
  wet: 0.35
}).connect(reverb);

// 大鼓合成器
export const kickSynth = new Tone.MembraneSynth({
  pitchDecay: 0.1,
  octaves: 6,
  oscillator: {
    type: "sine"
  },
  envelope: {
    attack: 0.001,
    decay: 0.4,
    sustain: 0.01,
    release: 0.8
  }
}).connect(masterVolume);

// 噪音合成器
export const noiseKick = new Tone.NoiseSynth({
  noise: {
    type: "brown",
    playbackRate: 0.1
  },
  envelope: {
    attack: 0.001,
    decay: 0.2,
    sustain: 0.01,
    release: 0.2
  },
  volume: -12
}).connect(masterVolume);

// Dub Techno 風格的 Lowpass Filter
export const dubFilter = new Tone.Filter({
  type: "lowpass",
  frequency: 800,
  Q: 1.2
}).connect(delay);

// Dub Filter 的 LFO
export const dubLfo = new Tone.LFO({
  type: "sine",
  frequency: 0.2,
  min: 200,
  max: 1500
}).connect(dubFilter.frequency);

// 創建帶通濾波器 (for arp)
export const filter = new Tone.Filter({
  type: "bandpass",
  frequency: 800,
  Q: 1.5
}).connect(delay);

// 創建 LFO (for arp)
export const lfo = new Tone.LFO({
  type: "sine",
  frequency: 0.5,
  min: 400,
  max: 2000
}).connect(filter.frequency);

// 創建和弦合成器
export const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: {
    type: "square"
  },
  envelope: {
    attack: 0.05,
    decay: 0.3,
    sustain: 0.5,
    release: 2
  },
  volume: -6
}).connect(dubFilter);

// 創建循環音樂合成器
export const loopSynth = new Tone.Synth({
  oscillator: {
    type: "triangle"
  },
  envelope: {
    attack: 0.02,
    decay: 0.1,
    sustain: 0.2,
    release: 1
  },
  volume: -8
}).connect(filter);

// 定義和弦和音符序列
export const minorChord = ['C4', 'Eb4', 'G4'];
export const arpNotes = ['C4', 'Eb4', 'G4', 'Bb4'];

// 創建大鼓序列
export const kickPattern = [
  { time: "0:0", velocity: 1 },
  { time: "0:1", velocity: 1 },
  { time: "0:2", velocity: 1 },
  { time: "0:3", velocity: 1 }
];

// 創建 Hi-hat 合成器
export const hihatSynth = new Tone.NoiseSynth({
  noise: {
    type: "white",
    playbackRate: 3,
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0,
    release: 0.1,
  },
  volume: -15
}).connect(masterVolume);

// 創建 Hi-hat 序列（反拍）
export const hihatPattern = [
  { time: "0:1", velocity: 0.8 },
  { time: "0:3", velocity: 0.8 }
];

// 設置 BPM
Tone.Transport.bpm.value = 140; 