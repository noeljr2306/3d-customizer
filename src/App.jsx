import Canvas from "./canvas";
import { Suspense, useState, useEffect } from "react";
import Customizer from "./pages/Customizer";
import Home from "./pages/Home";

function App() {
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanvasReady(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="app transition-all ease-in">
      <Home />
      {canvasReady && (
        <Suspense fallback={null}>
          <Canvas />
        </Suspense>
      )}
      <Customizer />
    </main>
  );
}

export default App;
