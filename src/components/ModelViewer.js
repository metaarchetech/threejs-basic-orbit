import React from 'react';
import { useGLTF } from '@react-three/drei';

function ModelViewer({ meshRef, material, style }) {
  // 使用 useGLTF 載入模型
  const { scene } = useGLTF('/models/your_model.glb');  // 可以是 .glb 或 .gltf

  // 獲取顏色
  const getColor = () => {
    switch(material) {
      case 'standard_brass':
        return '#FFD700';  // 金色
      case 'phong_copper':
        return '#FF7F50';  // 銅色
      case 'standard_steel':
        return '#C0C0C0';  // 銀色
      default:
        return '#FFD700';
    }
  };

  // 處理材質
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.color.set(getColor());
      child.material.metalness = 0.9;
      child.material.roughness = 0.1;
      child.material.transparent = true;
      child.material.opacity = style?.opacity || 1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <primitive object={scene} scale={[0.01, 0.01, 0.01]} />
    </mesh>
  );
}

export default ModelViewer; 