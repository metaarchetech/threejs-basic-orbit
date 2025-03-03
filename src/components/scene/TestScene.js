import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioStore } from '../audio/AudioStore';
import InteractiveCube from '../interaction/InteractiveCube';
import LoopCube from '../interaction/LoopCube';
import { KickSphere } from '../audio/KickSphere';

function TestScene() {
  return (
    <group>
      <InteractiveCube position={[0, 0.5, 0]} />
      <LoopCube position={[-2, 0.5, 0]} />
      <KickSphere />
    </group>
  );
}

export default TestScene; 