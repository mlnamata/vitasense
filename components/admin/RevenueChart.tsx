"use client";

import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";

type Day = { date: string; revenueCzk: number; orders: number };

const H = 220;
const PAD = { top: 12, right: 8, bottom: 26, left: 52 };
const MAX_BAR = 14;
const RADIUS = 4;

/** Clean tick step: 1, 2 or 5 × 10^n, about four gridlines. */
function niceStep(max: number) {
  const raw = max / 4;
  const power = 10 ** Math.floor(Math.log10(raw || 1));
  const factor = [1, 2, 5, 10].find((f) => f * power >= raw) ?? 10;
  return factor * power;
}

/** Column with a 4px rounded top and a square base on the baseline. */
function columnPath(x: number, y: number, width: number, height: number) {
  if (height <= 0) return "";
  const r = Math.min(RADIUS, height, width / 2);
  const bottom = y + height;
  return `M${x},${bottom}V${y + r}Q${x},${y} ${x + r},${y}H${x + width - r}Q${x + width},${y} ${x + width},${y + r}V${bottom}Z`;
}

const shortDate = (iso: string) =>
  new Intl.DateTimeFormat("cs-CZ", { day: "numeric", month: "numeric", timeZone: "UTC" }).format(new Date(iso));

export default function RevenueChart({ days }: { days: Day[] }) {
  const [active, setActive] = useState<number | null>(null);
  // Draw at the real pixel width so axis text stays 11px on every screen.
  const frame = useRef<HTMLElement>(null);
  const [W, setW] = useState(720);

  useEffect(() => {
    const element = frame.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      // Ignore the zero-width pass before layout; keep room for 30 slots.
      const width = Math.round(entry.contentRect.width);
      if (width > 0) setW(Math.max(width, 280));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const step = niceStep(Math.max(...days.map((day) => day.revenueCzk), 1));
  const top = Math.ceil(Math.max(...days.map((day) => day.revenueCzk), 1) / step) * step;
  const ticks = Array.from({ length: Math.round(top / step) + 1 }, (_, index) => index * step);
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const slot = plotW / days.length;
  const BAR = Math.max(4, Math.min(MAX_BAR, slot - 2));
  const y = (value: number) => PAD.top + plotH - (value / top) * plotH;

  const current = active === null ? null : days[active];

  return (
    <figure ref={frame} className="relative">
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        className="block max-w-full touch-pan-y outline-none"
        role="img"
        aria-label="Denní tržby za posledních 30 dní. Šipkami vlevo a vpravo projdete jednotlivé dny."
        tabIndex={0}
        onFocus={() => setActive((value) => value ?? days.length - 1)}
        onBlur={() => setActive(null)}
        onPointerLeave={() => setActive(null)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") setActive((value) => Math.max(0, (value ?? days.length) - 1));
          if (event.key === "ArrowRight") setActive((value) => Math.min(days.length - 1, (value ?? -1) + 1));
        }}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke={tick === 0 ? "var(--color-slate-300)" : "var(--color-slate-200)"}
              strokeWidth={1}
              strokeDasharray={tick === 0 ? undefined : "2 4"}
            />
            <text
              x={PAD.left - 10}
              y={y(tick)}
              dy="0.32em"
              textAnchor="end"
              className="fill-slate-500 text-[11px] tabular-nums"
            >
              {tick.toLocaleString("cs-CZ")}
            </text>
          </g>
        ))}

        {days.map((day, index) => {
          const x = PAD.left + index * slot + (slot - BAR) / 2;
          const barTop = y(day.revenueCzk);
          const isActive = active === index;
          return (
            <g key={day.date}>
              <path
                d={columnPath(x, barTop, BAR, PAD.top + plotH - barTop)}
                fill={isActive ? "var(--color-sage-700)" : "var(--color-sage-500)"}
              />
              {/* Hit target: the whole slot, not just the painted bar. */}
              <rect
                x={PAD.left + index * slot}
                y={PAD.top}
                width={slot}
                height={plotH}
                fill="transparent"
                onPointerEnter={() => setActive(index)}
                onPointerDown={() => setActive(index)}
              />
              {index % 7 === 0 && (
                <text
                  x={x + BAR / 2}
                  y={H - 6}
                  textAnchor="middle"
                  className="fill-slate-500 text-[11px]"
                >
                  {shortDate(day.date)}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {current && active !== null && (
        <div
          role="status"
          className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-xl bg-white px-3 py-2 text-left shadow-lift ring-1 ring-slate-900/[0.08]"
          style={{
            left: `${Math.min(88, Math.max(12, ((PAD.left + (active + 0.5) * slot) / W) * 100))}%`,
          }}
        >
          <p className="text-sm font-bold tabular-nums text-slate-900">{formatPrice(current.revenueCzk)}</p>
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <span aria-hidden="true" className="h-0.5 w-3 rounded-full bg-sage-500" />
            {shortDate(current.date)} · {current.orders} obj.
          </p>
        </div>
      )}

      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-semibold text-slate-600 hover:text-slate-900">
          Zobrazit jako tabulku
        </summary>
        <div className="mt-3 max-h-64 overflow-y-auto">
          <table className="w-full text-left">
            <thead className="text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th scope="col" className="py-1.5 font-semibold">Den</th>
                <th scope="col" className="py-1.5 text-right font-semibold">Objednávky</th>
                <th scope="col" className="py-1.5 text-right font-semibold">Tržby</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/[0.06]">
              {days.map((day) => (
                <tr key={day.date}>
                  <td className="py-1.5 text-slate-700">{shortDate(day.date)}</td>
                  <td className="py-1.5 text-right tabular-nums text-slate-700">{day.orders}</td>
                  <td className="py-1.5 text-right tabular-nums text-slate-900">{formatPrice(day.revenueCzk)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
