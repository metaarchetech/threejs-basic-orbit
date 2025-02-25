import React from 'react';
import { MeshStandardMaterial } from 'three';
import { useFrame } from '@react-three/fiber';

function Box({ meshRef, material, style }) {
  // 從 MaterialSelector 中獲取顏色
  const getColor = () => {
    switch(material) {
      case 'standard_brass':
        return '#FFD700';  // 金色
      case 'phong_copper':
        return '#FF7F50';  // 銅色
      case 'standard_steel':
        return '#C0C0C0';  // 銀色
      default:
        return '#FFD700';  // 默認金色
    }
  };

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={getColor()}
        metalness={0.9}
        roughness={0.1}
        transparent={true}
        opacity={style?.opacity || 1}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

export default Box; 