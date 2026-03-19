import { useState, useRef, type MouseEvent } from 'react';

interface UseMouseGlowOptions {
  tilt?: boolean;
}

export function useMouseGlow<T extends HTMLElement>(options: UseMouseGlowOptions = { tilt: false }) {
  const ref = useRef<T>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: MouseEvent<T>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    
    if (options.tilt) {
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`
      );
    }
    
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (options.tilt) {
      setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)");
    }
    setIsHovered(false);
  };

  return {
    ref,
    isHovered,
    mousePos,
    transform,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    }
  };
}