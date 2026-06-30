import { useEffect, useRef, useState } from 'react';

const REACH = 175;

export function ScrollBolt() {
  const layerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [targets, setTargets] = useState<{ el: HTMLElement; x: number; y: number }[]>([]);
  const samplesRef = useRef<[number, number][]>([]);
  const totalRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const layer = layerRef.current;
    const coreP = coreRef.current;
    const glowP = glowRef.current;
    const tip = tipRef.current;
    const svg = layer?.querySelector('svg');
    if (!layer || !coreP || !glowP || !tip || !svg) return;

    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

    function measure() {
      const selector = '.bento-card,.why-item,.how-step,.ai-mockup,.team-card,.case-card,.btn-large';
      const els = document.querySelectorAll(selector);
      const result: { el: HTMLElement; x: number; y: number }[] = [];
      els.forEach(el => {
        const r = (el as HTMLElement).getBoundingClientRect();
        const x = r.left + window.scrollX + r.width / 2;
        const y = r.top + window.scrollY + r.height / 2;
        if (x > 0) result.push({ el: el as HTMLElement, x, y });
      });
      result.sort((a, b) => a.y - b.y);
      return result;
    }

    function build() {
      seed = 7;
      const t = measure();
      setTargets(t);

      const docH = document.documentElement.scrollHeight;
      const W = document.documentElement.clientWidth;
      layer!.style.height = docH + 'px';
      svg!.setAttribute('viewBox', `0 0 ${W} ${docH}`);

      const hero = document.querySelector('.hero-section, [class*="hero"]');
      const startY = hero ? hero.offsetTop + hero.offsetHeight * 0.85 : 0;

      const rows: { y: number; items: typeof t }[] = [];
      t.forEach(item => {
        if (item.y < startY) return;
        const last = rows[rows.length - 1];
        if (last && Math.abs(last.y - item.y) < 140) {
          last.items.push(item);
        } else {
          rows.push({ y: item.y, items: [item] });
        }
      });

      const pts: [number, number][] = [[W * 0.5, startY]];
      rows.forEach((row, i) => {
        const item = row.items[i % row.items.length];
        const prev = pts[pts.length - 1];
        const segs = 3;
        for (let s = 1; s < segs; s++) {
          const ty = prev[1] + (item.y - prev[1]) * s / segs;
          let tx = prev[0] + (item.x - prev[0]) * s / segs + (rnd() - 0.5) * 130;
          tx = Math.max(24, Math.min(W - 24, tx));
          pts.push([tx, ty]);
        }
        pts.push([item.x, item.y]);
      });
      pts.push([W * 0.5, docH - 60]);

      const d = 'M' + pts.map(p => Math.round(p[0]) + ' ' + Math.round(p[1])).join(' L ');
      coreP!.setAttribute('d', d);
      glowP!.setAttribute('d', d);
      const total = coreP!.getTotalLength();
      totalRef.current = total;
      coreP!.style.strokeDasharray = String(total);
      glowP!.style.strokeDasharray = String(total);

      const samples: [number, number][] = [];
      const N = 700;
      for (let i = 0; i <= N; i++) {
        const L = total * i / N;
        samples.push([L, coreP!.getPointAtLength(L).y]);
      }
      samplesRef.current = samples;
      update();
    }

    function lenForY(y: number) {
      const samples = samplesRef.current;
      let lo = 0, hi = samples.length - 1;
      while (lo < hi) {
        const m = (lo + hi) >> 1;
        samples[m][1] < y ? lo = m + 1 : hi = m;
      }
      return samples[lo][0];
    }

    function update() {
      tickingRef.current = false;
      const total = totalRef.current;
      if (!total) return;
      const hero = document.querySelector('.hero-section, [class*="hero"]');
      const startY = hero ? hero.offsetTop + hero.offsetHeight * 0.85 : 0;
      const targetY = window.scrollY + window.innerHeight * 0.55;
      let L: number;
      if (targetY <= startY) {
        L = 0.001;
        tipRef.current!.style.opacity = '0';
      } else {
        L = Math.min(lenForY(targetY), total);
        tipRef.current!.style.opacity = '1';
      }
      coreRef.current!.style.strokeDashoffset = String(total - L);
      glowRef.current!.style.strokeDashoffset = String(total - L);

      const p = coreRef.current!.getPointAtLength(L);
      tipRef.current!.style.transform = `translate(${p.x}px, ${p.y}px)`;

      const currentTargets = measure();
      for (const t of currentTargets) {
        const near = Math.hypot(t.x - p.x, t.y - p.y) < REACH;
        if (near) {
          if (!t.el.classList.contains('energized')) {
            t.el.classList.add('energized', 'zap-flash');
            setTimeout(() => t.el.classList.remove('zap-flash'), 850);
          }
          t.el.classList.add('surge');
        } else {
          t.el.classList.remove('surge');
        }
      }
    }

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 220);
    };
    window.addEventListener('resize', onResize);

    const tabsEl = document.querySelector('.ai-tabs');
    if (tabsEl) tabsEl.addEventListener('click', () => setTimeout(build, 80));

    if (document.readyState === 'complete') {
      build();
    } else {
      window.addEventListener('load', build);
    }
    setTimeout(build, 1600);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <div
        ref={layerRef}
        id="bolt-layer"
        className="absolute top-0 left-0 w-full z-[1] pointer-events-none overflow-visible"
        aria-hidden="true"
      >
        <svg preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full overflow-visible">
          <path
            ref={glowRef}
            id="bolt-glow"
            style={{
              stroke: 'rgba(200, 240, 50, 0.22)',
              strokeWidth: 10,
              fill: 'none',
              strokeLinejoin: 'round',
              filter: 'blur(7px)',
            }}
          />
          <path
            ref={coreRef}
            id="bolt-core"
            style={{
              stroke: '#e6ff7d',
              strokeWidth: 1.8,
              fill: 'none',
              strokeLinejoin: 'round',
              filter: 'drop-shadow(0 0 7px rgba(200, 240, 50, 0.9))',
            }}
          />
        </svg>
      </div>
      <div
        ref={tipRef}
        id="bolt-tip"
        className="absolute top-0 left-0 z-[50] pointer-events-none w-[170px] h-[170px] rounded-full opacity-0"
        style={{
          margin: '-85px 0 0 -85px',
          background: 'radial-gradient(circle, rgba(230, 255, 125, 0.4) 0%, rgba(200, 240, 50, 0.14) 38%, transparent 68%)',
          mixBlendMode: 'screen',
          transition: 'opacity 0.45s',
          animation: 'tipFlicker 1.7s ease-in-out infinite',
        }}
        aria-hidden="true"
      />
    </>
  );
}
