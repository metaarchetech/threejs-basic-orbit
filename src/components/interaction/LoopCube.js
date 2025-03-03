import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioStore } from '../audio/AudioStore';

function LoopCube({ position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { toggleLoop, isLoopPlaying, initAudio, isAudioInitialized } = useAudioStore();

  // 動畫 - 當音樂播放時會有脈動效果
  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isLoopPlaying) {
        meshRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
        meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
        meshRef.current.scale.z = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
      } else {
        meshRef.current.scale.set(1, 1, 1);
      }
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  const handleClick = async () => {
    if (!isAudioInitialized) {
      await initAudio();
    }
    toggleLoop();
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial 
        color={isLoopPlaying ? '#ff3366' : (hovered ? '#ff9f9f' : '#44cc88')}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default LoopCube; 