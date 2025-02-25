import React from 'react';
import styles from '../styles/ShapeSelector.module.css';

function ShapeSelector({ currentShape, onShapeChange }) {
  // 定義形狀列表 - 暫時只使用兩個基本形狀
  const shapes = [
    { id: 'box', name: '立方體' },
    { id: 'revolving', name: '球體' },
    { id: 'fbx', name: 'FBX' }
  ];

  // 處理向左切換
  const handlePrev = () => {
    const currentIndex = shapes.findIndex(s => s.id === currentShape);
    const prevIndex = currentIndex <= 0 ? shapes.length - 1 : currentIndex - 1;
    onShapeChange(shapes[prevIndex].id);
  };

  // 處理向右切換
  const handleNext = () => {
    const currentIndex = shapes.findIndex(s => s.id === currentShape);
    const nextIndex = currentIndex >= shapes.length - 1 ? 0 : currentIndex + 1;
    onShapeChange(shapes[nextIndex].id);
  };

  return (
    <div className={styles.container}>
      <button onClick={handlePrev} className={styles.arrowButton}>
        ←
      </button>
      
      <div className={styles.display}>
        {shapes.find(s => s.id === currentShape)?.name}
      </div>
      
      <button onClick={handleNext} className={styles.arrowButton}>
        →
      </button>
    </div>
  );
}

export default ShapeSelector; 