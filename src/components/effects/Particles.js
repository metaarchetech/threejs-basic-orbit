import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles() {
  // 生成更多的粒子
  const particles = useMemo(() => {
    const temp = [];
    const velocities = [];
    for (let i = 0; i < 500; i++) {  // 增加到 500 個粒子
      const x = (Math.random() - 0.5) * 15;  // 擴大分布範圍
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 15;
      temp.push(x, y, z);
      
      velocities.push(
        (Math.random() - 0.5) * 0.01,  // 降低速度
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      );
    }
    return { positions: new Float32Array(temp), velocities };
  }, []);

  // 調整粒子材質
  const particleMaterial = useMemo(() => 
    new THREE.PointsMaterial({
      size: 0.05,  // 縮小粒子大小
      transparent: true,
      opacity: 0.4,  // 降低透明度
      color: '#ffffff',
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    }), []
  );

  const points = useRef();
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta * 0.5;  // 降低整體動畫速度
    
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(time.current + i) * 0.001;  // 減小移動幅度
        positions[i + 1] += Math.cos(time.current + i) * 0.001;
        positions[i + 2] += Math.sin(time.current + i * 0.5) * 0.001;
        
        // 擴大邊界檢查範圍
        if (Math.abs(positions[i]) > 7.5) positions[i] *= -0.9;
        if (Math.abs(positions[i + 1]) > 7.5) positions[i + 1] *= -0.9;
        if (Math.abs(positions[i + 2]) > 7.5) positions[i + 2] *= -0.9;
      }
      
      points.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive object={particleMaterial} attach="material" />
    </points>
  );
}

export default Particles; 