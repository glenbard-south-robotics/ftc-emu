import { useEffect, useState } from "react";
import init, * as wasm from "@pkg/ftc_emu_core";

export function useWasm() {
  const [instance, setInstance] = useState<typeof wasm | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await init();
      if (!cancelled) setInstance(wasm);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return instance;
}
