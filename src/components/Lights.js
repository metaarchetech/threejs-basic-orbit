import React from 'react';

function Lights() {
  return (
    <>
      {/* 環境光 - 提高基礎亮度 */}
      <ambientLight intensity={0.7} color="#ffffff" />

      {/* 主光源 - 柔和的白光 */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />

      {/* 補光源 - 柔和的冷色調 */}
      <directionalLight 
        position={[-8, 6, 4]}
        intensity={0.4}
        color="#e1f5fe"  // 淡藍色
      />

      {/* 背光源 - 柔和的暖色調 */}
      <directionalLight
        position={[-2, 10, -10]}
        intensity={0.3}
        color="#fff8e1"  // 淡黃色
      />

      {/* 頂光 - 增加整體亮度 */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#1a1a1a"
        intensity={0.6}
      />
    </>
  );
}

export default Lights; 