import React, { createContext, useContext, useEffect, useState } from "react";

export type GridSettings = {
  columnWidth: number;
  gap: number;
  scrollRatio: number;
};

type GridSettingsBlueprint = {
  [device: string]: GridSettings;
};

const gridSetting: GridSettingsBlueprint = {
  pc: {
    columnWidth: 200,
    gap: 15,
    scrollRatio: 2,
  },
  mobile: {
    columnWidth: 120,
    gap: 15,
    scrollRatio: 1,
  },
};

const GridContext = createContext<GridSettings | null>(null);

export function useGridSettings() {
  const settings = useContext(GridContext);
  if (!settings) throw new Error("cannot get grid settings");
  return settings;
}

type GridSettingsProviderProps = {
  children: React.ReactNode;
};

export function GridSettingsProvider({ children }: GridSettingsProviderProps) {
  const [currentSetting, setCurrentSetting] = useState<GridSettings>(
    gridSetting.pc
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setCurrentSetting(gridSetting.mobile);
      } else {
        setCurrentSetting(gridSetting.pc);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <GridContext.Provider value={currentSetting}>
      {children}
    </GridContext.Provider>
  );
}
