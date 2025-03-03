import React, { useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

function FBXModel({ url, position, scale }) {
  const fbx = useLoader(FBXLoader, url);

  return (
    <primitive 
      object={fbx} 
      position={position} 
      scale={scale}
    />
  );
}

export default FBXModel; 