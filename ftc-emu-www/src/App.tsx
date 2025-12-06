import { TopMenubar } from "./components/menubars/top-menubar";
import GameScene from "./components/game-scene";
import "./App.css";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./components/ui/empty";
import { Spinner } from "./components/ui/spinner";
import { useWasm } from "./hooks/use-wasm";

function App() {
  const wasm = useWasm();

  if (!wasm) {
    return <LoadingState />;
  }

  return (
    <div className="App w-full h-full m-0 p-0 flex flex-col">
      <TopMenubar wasm={wasm} />
      <GameScene wasm={wasm} />
    </div>
  );
}

function LoadingState() {
  return (
    <Empty className="w-full flex grow">
      <EmptyHeader>
        <EmptyTitle>Loading...</EmptyTitle>
        <EmptyMedia>
          <Spinner />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyContent></EmptyContent>
    </Empty>
  );
}

export default App;
