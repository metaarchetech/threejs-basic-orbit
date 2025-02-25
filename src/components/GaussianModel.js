import React from 'react';
import { GaussianSplats } from '@react-three/gaussian-splats';

function GaussianModel() {
  return (
    <GaussianSplats 
      src="/path/to/your/model.gs"  // 或 .ply 檔案
      position={[0, 0, 0]}
      scale={1}
      rotation={[0, 0, 0]}
    />
  );
}

export default GaussianModel; 