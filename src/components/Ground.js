import React from 'react';
import { MeshReflectorMaterial } from '@react-three/drei';

function Ground() {
  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
      receiveShadow
    >
      <planeGeometry args={[50, 50]} />
      <MeshReflectorMaterial
        blur={[100, 100]}       // 降低模糊度
        resolution={1024}       // 適中的解析度
        mixBlur={0.2}          // 更低的模糊混合
        mixStrength={1.2}      // 稍微降低反射強度以配合亮色
        roughness={0.4}        // 增加粗糙度使亮色更自然
        depthScale={1.5}       // 保持深度效果
        minDepthThreshold={0.2}
        maxDepthThreshold={2}
        color="#606060"        // 大幅調亮顏色
        metalness={0.7}        // 降低金屬感以配合亮色
        mirror={0.75}          // 調整鏡面效果
        reflectorOffset={0.2}
      />
    </mesh>
  );
}

export default Ground; 