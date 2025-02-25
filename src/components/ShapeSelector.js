import React from 'react';

function ShapeSelector({ currentShape, onShapeChange }) {
  // 定義形狀列表 - 暫時只使用兩個基本形狀
  const shapes = [
    { id: 'box', name: '立方體' },
    { id: 'revolving', name: '球體' }
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
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      display: 'flex',
      gap: '15px',
      alignItems: 'center'
    }}>
      {/* 左箭頭按鈕 */}
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

      {/* 中間顯示文字 */}
      <div style={{
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '4px',
        minWidth: '100px',
        textAlign: 'center'
      }}>
        {shapes.find(s => s.id === currentShape)?.name}
      </div>

      {/* 右箭頭按鈕 */}
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

export default ShapeSelector; 