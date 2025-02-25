import React from 'react';
import styles from '../styles/MaterialSelector.module.css';

function MaterialSelector({ currentMaterial, onMaterialChange }) {
  // 定義材質和顏色的組合列表
  const materials = [
    { id: 'standard_brass', name: '金' },
    { id: 'phong_copper', name: '銅' },
    { id: 'standard_steel', name: '銀' }
  ];

  return (
    <div className={styles.container}>
      {materials.map((mat) => (
        <button
          key={mat.id}
          onClick={() => onMaterialChange(mat.id)}
          className={currentMaterial === mat.id ? styles.buttonActive : styles.button}
        >
          {mat.name}
        </button>
      ))}
    </div>
  );
}

export default MaterialSelector; 