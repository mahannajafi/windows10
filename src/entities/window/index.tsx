import { motion } from "framer-motion";
import { useEffect, useRef, useState, MouseEvent as ReactMouseEvent } from "react";

/**
 * <Window /> — draggable / resizable shell
 * ------------------------------------------------
 * Props
 *  ▸ title              – window caption text
 *  ▸ children           – JSX inside the content area
 *  ▸ initialPosition    – { x, y } in px (defaults 80/80)
 *  ▸ width / height     – starting size in px (defaults 480×320)
 *
 * Road‑map (not yet implemented)
 *  – Zustand slice to persist geometry + z‑index
 *  – snap‑to‑edge + maximise / restore
 *  – keyboard shortcuts (⌘+W to close, etc.)
 */

export interface WindowProps {
  title: string;
  children?: React.ReactNode;
  initialPosition?: { x: number; y: number };
  width?: number;
  height?: number;
}

const DEFAULT_W = 480;
const DEFAULT_H = 320;

let zCounter = 10; // Bring‑to‑front helper

export default function Window({
  title,
  children,
  initialPosition = { x: 80, y: 80 },
  width = DEFAULT_W,
  height = DEFAULT_H,
}: WindowProps) {
  const [pos, setPos] = useState(initialPosition);
  const [size, setSize] = useState({ w: width, h: height });
  const [z, setZ] = useState(1);
  const dragRef = useRef<HTMLDivElement>(null);
  const resizing = useRef(false);

  // Bring window to front on mousedown
  function handleFocus() {
    zCounter += 1;
    setZ(zCounter);
  }

  // ─── Drag logic ────────────────────────────────────────────────
  function onMouseDown(e: ReactMouseEvent) {
    // only header moves
    if ((e.target as HTMLElement).dataset.drag !== "true") return;
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const { x, y } = pos;

    function onMove(moveEv: MouseEvent) {
      setPos({
        x: x + moveEv.clientX - startX,
        y: y + moveEv.clientY - startY,
      });
    }

    function onUp() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  // ─── Resize (bottom‑right handle) ─────────────────────────────
  function onResizeHandleDown(e: ReactMouseEvent) {
    e.preventDefault();
    resizing.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const { w, h } = size;

    function onMove(moveEv: MouseEvent) {
      setSize({
        w: Math.max(280, w + moveEv.clientX - startX),
        h: Math.max(160, h + moveEv.clientY - startY),
      });
    }

    function onUp() {
      resizing.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  // block pointer‑events while resizing to avoid iframe / text selection weirdness
  useEffect(() => {
    document.body.style.cursor = resizing.current ? "nwse-resize" : "default";
  }, [size]);

  return (
    <motion.div
      ref={dragRef}
      className="absolute bg-white/80 backdrop-blur-lg rounded-xl shadow-lg select-none overflow-hidden"
      style={{
        width: size.w,
        height: size.h,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        zIndex: z,
      }}
      onMouseDown={handleFocus}
    >
      {/* header */}
      <header
        data-drag="true"
        onMouseDown={onMouseDown}
        className="h-8 flex items-center px-3 text-sm font-medium bg-white/30 backdrop-blur-lg border-b border-white/40 cursor-grab"
      >
        {title}
      </header>

      {/* content */}
      <section className="w-full h-[calc(100%-2rem)] p-4 overflow-auto">{children}</section>

      {/* resize handle */}
      <div
        onMouseDown={onResizeHandleDown}
        className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize"
      />
    </motion.div>
  );
}
