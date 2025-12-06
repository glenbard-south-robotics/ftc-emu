import { useEffect, useState } from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import type * as Wasm from "@pkg/ftc_emu_core";

interface TopMenubarProps {
  wasm: typeof Wasm;
}

export function TopMenubar({ wasm }: TopMenubarProps) {
  const [axesVisible, setAxesVisible] = useState<boolean>(false);
  const [gridVisible, setGridVisible] = useState<boolean>(false);

  useEffect(() => {
    setAxesVisible(wasm.get_axes_visible());
    setGridVisible(wasm.get_grid_visible());
  }, [wasm]);

  const toggleAxes = () => {
    const newVal = !axesVisible;
    setAxesVisible(newVal);
    wasm.set_axes_visible(newVal);
  };

  const toggleGrid = () => {
    const newVal = !gridVisible;
    setGridVisible(newVal);
    wasm.set_grid_visible(newVal);
  };

  return (
    <Menubar className="rounded-none border-r-0 border-t-0 border-l-0">
      <MenubarMenu>
        <MenubarTrigger>Scene</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            checked={axesVisible}
            onCheckedChange={toggleAxes}
          >
            Axes
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={gridVisible}
            onCheckedChange={toggleGrid}
          >
            Grid
          </MenubarCheckboxItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
