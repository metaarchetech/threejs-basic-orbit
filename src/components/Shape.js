import React, { forwardRef } from 'react';

const Shape = forwardRef((props, ref) => {
  return (
    <mesh {...props} ref={ref}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color="#5c76ff"
        metalness={0.9}
        roughness={0.1}
      />
    </mesh>
  );
});

export default Shape; 