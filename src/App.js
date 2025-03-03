import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import './App.css';

// Original Scene Components
import Ground from './components/shapes/Ground';
import Lights from './components/effects/Lights';
import ShapeSelector from './components/ui/ShapeSelector';
import MaterialSelector from './components/ui/MaterialSelector';
import Box from './components/shapes/Box';
import Sphere from './components/shapes/Sphere';
import CustomModel from './components/models/CustomModel';
import Particles from './components/effects/Particles';

// Audio Components
import { AudioControls } from './components/audio/AudioControls';
import TestScene from './components/scene/TestScene';

// Navigation Component
const Navigation = () => (
  <nav style={{ position: 'fixed', top: 10, left: 10, zIndex: 1000, padding: '10px', background: 'rgba(0,0,0,0.5)' }}>
    <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>Original Scene</Link>
    <Link to="/audio-test" style={{ color: 'white', textDecoration: 'none' }}>Audio Test</Link>
  </nav>
);

// Original Scene Component with all controls
const OriginalSceneContent = () => {
  const orbitControlsRef = useRef();
  const transformControlsRef = useRef();
  const meshRef = useRef();
  const [currentShape, setCurrentShape] = useState('box');
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentMaterial, setCurrentMaterial] = useState('standard_brass');
  const [fadeOpacity, setFadeOpacity] = useState(1);

  const handleDraggingChanged = (event) => {
    setIsDragging(event.value);
    if (orbitControlsRef.current) {
      orbitControlsRef.current.enabled = !event.value;
    }
  };

  const handleShapeChange = (newShape) => {
    const fade = setInterval(() => {
      setFadeOpacity(prev => {
        if (prev <= 0) {
          clearInterval(fade);
          setCurrentShape(newShape);
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

  const handleMaterialChange = (newMaterial) => {
    const fade = setInterval(() => {
      setFadeOpacity(prev => {
        if (prev <= 0) {
          clearInterval(fade);
          setCurrentMaterial(newMaterial);
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
    <>
      <div className="selector-container">
        <div className="selector-group">
          <ShapeSelector 
            currentShape={currentShape}
            onShapeChange={handleShapeChange}
          />
        </div>
        <div className="selector-group">
          <MaterialSelector 
            currentMaterial={currentMaterial}
            onMaterialChange={handleMaterialChange}
          />
        </div>
      </div>
      <div className="canvas-container">
        <Canvas camera={{ position: [3, 3, 3] }}>
          <color attach="background" args={['#1a1a1a']} />
          <fog attach="fog" args={['#1a1a1a', 10, 20]} />
          <Lights />
          <Ground />
          <Particles />
          <Grid
            position={[0, -0.49, 0]}
            args={[10.5, 10.5]}
            cellSize={0.5}
            cellThickness={0.5}
            cellColor="#444444"
            sectionSize={1}
            sectionThickness={1}
            sectionColor="#666666"
            fadeDistance={30}
            fadeStrength={1}
            followCamera={false}
            infiniteGrid={true}
          />
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
            visible={isVisible}
          >
            {renderShape()}
          </TransformControls>
        </Canvas>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<OriginalSceneContent />} />
          <Route path="/audio-test" element={
            <>
              <div className="canvas-container">
                <Canvas camera={{ position: [3, 3, 3] }}>
                  <color attach="background" args={['#1a1a1a']} />
                  <fog attach="fog" args={['#1a1a1a', 10, 20]} />
                  <Lights />
                  <Ground />
                  <Particles />
                  <Grid
                    position={[0, -0.49, 0]}
                    args={[10.5, 10.5]}
                    cellSize={0.5}
                    cellThickness={0.5}
                    cellColor="#444444"
                    sectionSize={1}
                    sectionThickness={1}
                    sectionColor="#666666"
                    fadeDistance={30}
                    fadeStrength={1}
                    followCamera={false}
                    infiniteGrid={true}
                  />
                  <Environment preset="city" />
                  <TestScene />
                  <OrbitControls 
                    makeDefault
                    autoRotate
                    autoRotateSpeed={1}
                    enableDamping
                    dampingFactor={0.05}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={2}
                    maxDistance={10}
                  />
                </Canvas>
              </div>
              <AudioControls />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
