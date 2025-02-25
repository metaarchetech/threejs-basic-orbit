import React from 'react';

// UI 組件：提供形狀和材質切換的控制介面
function UI({ 
  onPrevMaterial, 
  onNextMaterial, 
  currentMaterial,
  onPrevShape,
  onNextShape,
  currentShape
}) {
  // 按鈕基本樣式
  const buttonStyle = {
    padding: '10px 20px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)'
  };

  // 資訊顯示區塊樣式
  const infoStyle = {
    padding: '10px 20px',
    background: 'rgba(0,0,0,0.3)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* 形狀控制區 */}
      <button onClick={onPrevShape} style={buttonStyle}>
        ← 上一個形狀
      </button>

      <div style={infoStyle}>
        當前形狀: {currentShape}
      </div>

      <button onClick={onNextShape} style={buttonStyle}>
        下一個形狀 →
      </button>

      {/* 分隔線 */}
      <div style={{
        width: '2px',
        height: '30px',
        background: 'rgba(255,255,255,0.2)',
        margin: '0 10px'
      }} />

      {/* 材質控制區 */}
      <button onClick={onPrevMaterial} style={buttonStyle}>
        ← 上一個材質
      </button>
      
      <div style={infoStyle}>
        當前材質: {currentMaterial}
      </div>

      <button onClick={onNextMaterial} style={buttonStyle}>
        下一個材質 →
      </button>
    </div>
  );
}

export default UI; 