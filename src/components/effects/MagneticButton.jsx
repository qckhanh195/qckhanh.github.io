import { useRef, useState } from 'react';

export default function MagneticButton({ children, className = '', onClick }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    setTransform({ x: dx, y: dy });
  };

  const handleLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: transform.x === 0 ? 'transform 0.5s ease' : 'transform 0.1s ease',
        display: 'inline-block',
      }}
      onClick={onClick}
      className={className}
    >
      {children}
    </div>
  );
}
