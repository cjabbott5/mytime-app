import { useRef, useEffect, useState } from 'react';

export default function ResizableGif({ gif }) {
  const gifRef = useRef(null);
  const [size, setSize] = useState({ width: 150, height: 150 });
  const [isResizing, setIsResizing] = useState(false);
  const startPosition = useRef({ x: 0, y: 0, width: 150, height: 150 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;

      const dx = e.clientX - startPosition.current.x;
      const dy = e.clientY - startPosition.current.y;

      setSize({
        width: Math.max(startPosition.current.width + dx, 80),
        height: Math.max(startPosition.current.height + dy, 80),
      });
    };

    const stopResizing = () => setIsResizing(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResizing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing]);

  const startResize = (e) => {
    e.preventDefault();
    startPosition.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    };
    setIsResizing(true);
  };

  return (
    <div
      ref={gifRef}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        background: '#fff',
      }}
    >
      <img
        src={gif}
        alt="Golden Retriever"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '12px',
          pointerEvents: 'none',
        }}
        draggable={false}
      />
      <div
        onMouseDown={startResize}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '20px',
          height: '20px',
          backgroundColor: '#ffffffcc',
          border: '2px solid #ccc',
          cursor: 'nwse-resize',
          zIndex: 10,
        }}
      />
    </div>
  );
}
