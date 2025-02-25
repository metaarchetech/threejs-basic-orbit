import React from 'react';

function MaterialSelector({ currentMaterial, onMaterialChange }) {
  // 定義材質和顏色的組合列表
  const materials = [
    { id: 'standard_brass', name: '金色', color: '#FFD700' },     // 更亮的金色
    { id: 'phong_copper', name: '銅色', color: '#FF7F50' },       // 更鮮豔的銅色
    { id: 'standard_steel', name: '銀色', color: '#C0C0C0' }      // 更亮的銀色
  ];

  // 處理向左切換
  const handlePrev = () => {
    const currentIndex = materials.findIndex(m => m.id === currentMaterial);
    const prevIndex = currentIndex <= 0 ? materials.length - 1 : currentIndex - 1;
    onMaterialChange(materials[prevIndex].id);
  };

  // 處理向右切換
  const handleNext = () => {
    const currentIndex = materials.findIndex(m => m.id === currentMaterial);
    const nextIndex = currentIndex >= materials.length - 1 ? 0 : currentIndex + 1;
    onMaterialChange(materials[nextIndex].id);
  };

  const currentMaterialData = materials.find(m => m.id === currentMaterial);

  return (
    <div style={{
      position: 'absolute',
      bottom: '80px',  // 位置在形狀選擇器上方
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',
      gap: '15px',
      alignItems: 'center'
    }}>
      <button
        onClick={handlePrev}
        style={{
          width: '40px',
          height: '40px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        ←
      </button>

      <div style={{
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '4px',
        minWidth: '100px',
        textAlign: 'center'
      }}>
        {currentMaterialData?.name}
      </div>

      <button
        onClick={handleNext}
        style={{
          width: '40px',
          height: '40px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        →
      </button>
    </div>
  );
}

export default MaterialSelector; 