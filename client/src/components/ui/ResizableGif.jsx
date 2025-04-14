import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

export default function ResizableGif({ gif }) {
  const [dimensions, setDimensions] = useState({ width: 150, height: 150 });

  return (
    <Rnd
      // Let Rnd handle dragging and resizing
      default={{ x: 0, y: 0, width: 150, height: 150 }}
      // or use size and onDragStop if you prefer controlling in state
      bounds="window"
      lockAspectRatio
      onResizeStop={(e, direction, ref) => {
        setDimensions({
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
        });
      }}
    >
      <img
        src={gif}
        alt="Golden Retriever"
        style={{
          width: dimensions.width,
          height: dimensions.height,
          objectFit: 'contain',
        }}
      />
    </Rnd>
  );
}
