import React from 'react';

function SimpleModel({ meshRef, material, style }) {
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={material === 'standard_brass' ? '#FFD700' : '#C0C0C0'}
        metalness={0.9}
        roughness={0.1}
        transparent={true}
        opacity={style?.opacity || 1}
      />
    </mesh>
  );
}

export default SimpleModel; 