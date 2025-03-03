import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioStore } from '../audio/AudioStore';

function InteractiveCube({ position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { playMinorChord, initAudio, isAudioInitialized } = useAudioStore();

  // 簡單的動畫
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  const handleClick = async () => {
    if (!isAudioInitialized) {
      await initAudio();
    }
    playMinorChord();
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={hovered ? '#ff9f9f' : '#44cc88'}
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  );
}

export default InteractiveCube; 