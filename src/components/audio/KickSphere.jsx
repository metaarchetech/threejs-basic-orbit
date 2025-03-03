import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAudioStore } from './AudioStore';

export function KickSphere() {
  const meshRef = useRef();
  const { isKickPlaying, toggleKick } = useAudioStore();
  const pulseRef = useRef(1);

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (isKickPlaying) {
        // 產生脈衝效果
        pulseRef.current = Math.max(1, pulseRef.current * 0.95);
        meshRef.current.scale.setScalar(pulseRef.current);

        // 當有大鼓聲時，每2拍增加一次脈衝
        if (state.clock.elapsedTime % (120/140) < 0.1) {  // 根據BPM 140計算
          pulseRef.current = 1.5;
        }
      } else {
        // 恢復原始大小
        meshRef.current.scale.setScalar(1);
      }

      // 緩慢旋轉
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[2, 0.5, 0]}
      onClick={() => toggleKick()}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={isKickPlaying ? "#ff0000" : "#0066ff"}
        emissive={isKickPlaying ? "#ffff00" : "#000000"}
        emissiveIntensity={isKickPlaying ? 0.5 : 0}
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  );
} 