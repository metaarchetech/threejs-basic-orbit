import React from 'react';
import { useAudioStore } from './AudioStore';
import styles from '../../styles/AudioControls.module.css';

export const AudioControls = () => {
  const { 
    isLoopPlaying, 
    isKickPlaying,
    isHihatPlaying,
    toggleLoop, 
    toggleKick,
    toggleHihat,
    playMinorChord 
  } = useAudioStore();

  return (
    <div className={styles.audioControls}>
      <button 
        className={`${styles.controlButton} ${isKickPlaying ? styles.active : ''}`}
        onClick={toggleKick}
      >
        Kick
      </button>
      <button 
        className={`${styles.controlButton} ${isHihatPlaying ? styles.active : ''}`}
        onClick={toggleHihat}
      >
        Hi-hat
      </button>
      <button 
        className={`${styles.controlButton} ${isLoopPlaying ? styles.active : ''}`}
        onClick={toggleLoop}
      >
        Arpeggio
      </button>
      <button 
        className={styles.controlButton}
        onClick={playMinorChord}
      >
        Chord
      </button>
    </div>
  );
}; 