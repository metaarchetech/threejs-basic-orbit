import React from 'react';
import { useGLTF } from '@react-three/drei';

function CustomModel({ meshRef, material }) {
  const { nodes } = useGLTF('/path/to/your/model.glb');

  const getColor = () => {
    switch(material) {
      case 'standard_brass':
        return '#FFD700';
      case 'phong_copper':
        return '#FF7F50';
      case 'standard_steel':
        return '#C0C0C0';
      default:
        return '#FFD700';
    }
  };

  return (
    <mesh 
      ref={meshRef}
      geometry={nodes.YourModelName.geometry}
      scale={[0.1, 0.1, 0.1]}
    >
      <meshStandardMaterial 
        color={getColor()}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
}

export default CustomModel; 