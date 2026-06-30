import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Bolt {
  points: { x: number; y: number }[];
  life: number;
  maxLife: number;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const nodes: Node[] = Array.from({ length: 75 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.75,
      vy: (Math.random() - 0.5) * 0.75,
      r: Math.random() * 2.5 + 0.8,
    }));

    const bolts: Bolt[] = [];

    function createBolt(x1: number, y1: number, x2: number, y2: number): Bolt {
      const points: Bolt['points'] = [{ x: x1, y: y1 }];
      let x = x1, y = y1;
      const steps = 8;
      for (let i = 0; i < steps; i++) {
        x += (x2 - x1) / steps + (Math.random() - 0.5) * 60;
        y += (y2 - y1) / steps + (Math.random() - 0.5) * 48;
        points.push({ x, y });
      }
      points.push({ x: x2, y: y2 });
      return { points, life: 650, maxLife: 650 };
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.35;
            ctx.strokeStyle = `rgba(180, 225, 80, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        ctx.fillStyle = 'rgba(230, 250, 120, 0.9)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      for (let i = bolts.length - 1; i >= 0; i--) {
        const bolt = bolts[i];
        bolt.life -= 16;
        if (bolt.life <= 0) { bolts.splice(i, 1); continue; }

        const alpha = bolt.life / bolt.maxLife;
        ctx.save();
        ctx.strokeStyle = `rgba(200, 240, 80, ${alpha * 0.9})`;
        ctx.lineWidth = 3.8;
        ctx.shadowBlur = 28;
        ctx.shadowColor = '#c8f032';
        ctx.beginPath();
        ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
        for (let k = 1; k < bolt.points.length; k++) {
          ctx.lineTo(bolt.points[k].x, bolt.points[k].y);
        }
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 255, 220, ${alpha * 0.95})`;
        ctx.lineWidth = 1.4;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.moveTo(bolt.points[0].x, bolt.points[0].y);
        for (let k = 1; k < bolt.points.length; k++) {
          ctx.lineTo(bolt.points[k].x, bolt.points[k].y);
        }
        ctx.stroke();
        ctx.restore();
      }

      if (Math.random() < 0.14) {
        const i = Math.floor(Math.random() * nodes.length);
        const j = Math.floor(Math.random() * nodes.length);
        if (i !== j) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < 195 && dist > 25) {
            bolts.push(createBolt(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y));
          }
        }
      }

      if (Math.random() < 0.04) {
        const i = Math.floor(Math.random() * nodes.length);
        const j = Math.floor(Math.random() * nodes.length);
        if (i !== j) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (dist < 195 && dist > 25) {
            bolts.push(createBolt(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y));
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-screen h-screen fixed top-0 left-0 -z-10"
    />
  );
}
