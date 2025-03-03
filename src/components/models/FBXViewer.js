import React, { Suspense, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

function FBXViewer({ meshRef, material, style }) {
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
        return '#FFD700';  // 默認金色
    }
  };

  const fbx = useLoader(FBXLoader, '/models/Final-Export-01.fbx');

  useEffect(() => {
    if (fbx) {
      // 計算模型的邊界盒
      const box = new THREE.Box3().setFromObject(fbx);
      const center = box.getCenter(new THREE.Vector3());
      
      // 將模型移到中心點
      fbx.position.sub(center);

      fbx.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material = new THREE.MeshStandardMaterial({
            color: getColor(),
            metalness: 0.9,
            roughness: 0.1,
            transparent: true,
            opacity: style?.opacity || 1
          });
        }
      });
    }
  }, [fbx, material, style]);

  return (
    <mesh ref={meshRef}>
      <Suspense fallback={null}>
        <primitive 
          object={fbx} 
          scale={[0.001, 0.001, 0.001]}  // 縮小 10 倍
          position={[0, 0.5, 0]}  // 稍微抬高一點
        />
      </Suspense>
    </mesh>
  );
}

export default FBXViewer; 