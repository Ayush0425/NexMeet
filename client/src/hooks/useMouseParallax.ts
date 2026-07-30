import { useEffect, useRef, useState } from "react";

interface Offset {
  x: number;
  y: number;
}

export function useMouseParallax(strength = 20) {
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });

  const target = useRef<Offset>({ x: 0, y: 0 });
  const current = useRef<Offset>({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth - 0.5) * strength,
        y: (e.clientY / window.innerHeight - 0.5) * strength,
      };
    };

    const animate = () => {
      // Smooth interpolation
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;

      setOffset({
        x: current.current.x,
        y: current.current.y,
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [strength]);

  return offset;
}