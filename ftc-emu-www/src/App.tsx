import { useEffect } from "react";
import init, { greet } from "../pkg/ftc_emu_core";
import "./App.css";

function App() {
  useEffect(() => {
    async function loadWasm() {
      await init();
      greet("ftc-emu-www");
    }
    loadWasm();
  }, []);

  return <></>;
}

export default App;
