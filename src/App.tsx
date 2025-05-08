// src/App.tsx
import { Suspense } from "react";
import Window from "./entities/window";
import TaskBar from "./entities/TaskBar";
import background from "./assets/imgs/defaultBackGround.webp";

const demoWindows = [
  { id: 1, title: "File Explorer", x: 60, y: 60 },
  { id: 2, title: "Notepad", x: 320, y: 120 },
];

export default function App() {
  return (
    <main
      className="fixed inset-0 overflow-hidden select-none" // fills viewport, no scroll
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {demoWindows.map(({ id, title, x, y }) => (
        <Suspense key={id} fallback={null}>
          <Window title={title} initialPosition={{ x, y }}>
            <p className="text-sm whitespace-pre">
              {title === "File Explorer"
                ? "📁 Documents\n📁 Pictures\n📄 resume.pdf"
                : "Hello Windows-clone!"}
            </p>
          </Window>
        </Suspense>
      ))}

      <TaskBar />
    </main>
  );
}
