import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls, Environment, Grid } from '@react-three/drei';
import * as THREE from 'three';  // 添加 THREE 導入
import Ground from './components/Ground';  // 引入 Ground 組件
import Lights from './components/Lights';  // 引入 Lights 組件
import ShapeSelector from './components/ShapeSelector';
import MaterialSelector from './components/MaterialSelector';
import Box from './components/Box';
import Sphere from './components/Sphere';
import CustomModel from './components/CustomModel';
import Particles from './components/Particles';

function App() {
  const orbitControlsRef = useRef();
  const transformControlsRef = useRef();  // 添加 TransformControls 的 ref
  const meshRef = useRef();
  const [currentShape, setCurrentShape] = useState('box');  // 添加形狀狀態
  const [isDragging, setIsDragging] = useState(false);  // 添加拖曳狀態
  const [isVisible, setIsVisible] = useState(true);  // 添加可見性狀態
  const [currentMaterial, setCurrentMaterial] = useState('standard_brass');  // 改為與 MaterialSelector 中定義的一致
  const [fadeOpacity, setFadeOpacity] = useState(1);

  // 創建漸層貼圖
  const gradientMap = new THREE.TextureLoader().load(
    'https://threejs.org/examples/textures/gradientMaps/threeTone.jpg'
  );
  gradientMap.minFilter = THREE.NearestFilter;
  gradientMap.magFilter = THREE.NearestFilter;

  // 處理拖曳狀態變化
  const handleDraggingChanged = (event) => {
    setIsDragging(event.value);
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = !event.value;
    }
  };

  const handleShapeChange = (newShape) => {
    // 開始淡出
    const fade = setInterval(() => {
      setFadeOpacity(prev => {
        if (prev <= 0) {
          clearInterval(fade);
          setCurrentShape(newShape);
          // 開始淡入
          const fadeIn = setInterval(() => {
            setFadeOpacity(prev => {
              if (prev >= 1) {
                clearInterval(fadeIn);
                return 1;
              }
              return prev + 0.1;
            });
          }, 20);  // 加快淡入速度 (從 50ms 改為 20ms)
          return 0;
        }
        return prev - 0.1;
      });
    }, 20);  // 加快淡出速度 (從 50ms 改為 20ms)
  };

  const handleMaterialChange = (newMaterial) => {
    // 開始淡出
    const fade = setInterval(() => {
      setFadeOpacity(prev => {
        if (prev <= 0) {
          clearInterval(fade);
          setCurrentMaterial(newMaterial);
          // 開始淡入
          const fadeIn = setInterval(() => {
            setFadeOpacity(prev => {
              if (prev >= 1) {
                clearInterval(fadeIn);
                return 1;
              }
              return prev + 0.1;
            });
          }, 20);
          return 0;
        }
        return prev - 0.1;
      });
    }, 20);
  };

  const renderShape = () => {
    const style = {
      opacity: fadeOpacity
    };

    switch(currentShape) {
      case 'box':
        return <Box meshRef={meshRef} material={currentMaterial} style={style} />;
      case 'revolving':
        return <Sphere meshRef={meshRef} material={currentMaterial} style={style} />;
      case 'custom':
        return <CustomModel meshRef={meshRef} material={currentMaterial} style={style} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a' }}>
      <ShapeSelector 
        currentShape={currentShape}
        onShapeChange={handleShapeChange}
      />
      <MaterialSelector 
        currentMaterial={currentMaterial}
        onMaterialChange={handleMaterialChange}
      />

      <Canvas camera={{ position: [3, 3, 3] }}>
        <color attach="background" args={['#1a1a1a']} />
        <fog attach="fog" args={['#1a1a1a', 10, 20]} />
        <Lights />
        <Ground />
        
        <Grid
          position={[0, -0.49, 0]}  // 比 Ground (-0.5) 略高一點點
          args={[10.5, 10.5]}       // 網格大小
          cellSize={0.5}            // 每個格子大小（0.5米）
          cellThickness={0.5}       // 線條粗細
          cellColor="#444444"       // 主要線條顏色
          sectionSize={1}           // 主要分隔大小（1米）
          sectionThickness={1}      // 主要分隔線粗細
          sectionColor="#666666"    // 主要分隔線顏色
          fadeDistance={30}         // 淡出距離
          fadeStrength={1}          // 淡出強度
          followCamera={false}      // 不跟隨相機
          infiniteGrid={true}       // 無限網格
        />
        
        <Particles />
        <Environment preset="city" />
        
        <OrbitControls 
          ref={orbitControlsRef}
          makeDefault
          enabled={!isDragging}
          autoRotate
          autoRotateSpeed={1}
          enableDamping
          dampingFactor={0.05}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={10}
        />

        <TransformControls
          ref={transformControlsRef}
          mode="translate"
          showX={true}
          showY={true}
          showZ={true}
          size={1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          dragging={isDragging}
          visible={isVisible}  // 控制整個 TransformControls 的可見性
        >
          {renderShape()}
        </TransformControls>
      </Canvas>
    </div>
  );
}

export default App;
