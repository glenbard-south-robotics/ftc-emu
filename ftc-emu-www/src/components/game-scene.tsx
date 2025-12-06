import { OrbitControls } from "three/examples/jsm/Addons.js";
import type * as Wasm from "@pkg/ftc_emu_core";

import { useEffect, useRef } from "react";

import {
  AxesHelper,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

interface GameSceneProps {
  wasm: typeof Wasm;
  background?: number;
}

export function GameScene({ wasm, background = 0x171717 }: GameSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(background);
    container.appendChild(renderer.domElement);

    const scene = new Scene();

    const camera = new PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(5, 4, 8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 1;
    controls.maxDistance = 200;

    const axes = new AxesHelper(1);
    axes.setColors(0xff0000, 0x00ff00, 0x0000ff);
    axes.renderOrder = 9999;
    scene.add(axes);

    const grid = new GridHelper(20, 20, 0x2d2d2d, 0x212121);
    scene.add(grid);

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(handleResize);
      ro.observe(container);
    } else {
      window.addEventListener("resize", handleResize);
    }

    const animate = () => {
      controls.update();

      axes.visible = wasm.get_axes_visible();
      grid.visible = wasm.get_grid_visible();

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      controls.dispose();
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", handleResize);

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode)
        renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, [background]);

  return <div ref={containerRef} className="w-full h-full" />;
}

export default GameScene;
