import React, { createContext, useContext, useState } from 'react';

export type FoodEntry = {
  alimento: string;
  quantidade: string;
  refeicao: string;
  horario: string;
};

type DiaryContextType = {
  entries: FoodEntry[];
  addEntry: (entry: FoodEntry) => void;
};

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryProvider = ({ children }: { children: React.ReactNode }) => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);

  function addEntry(entry: FoodEntry) {
    setEntries(prev => [...prev, entry]);
  }

  return (
    <DiaryContext.Provider value={{ entries, addEntry }}>
      {children}
    </DiaryContext.Provider>
  );
};

export function useDiary() {
  const context = useContext(DiaryContext);
  if (!context) throw new Error('useDiary must be used within DiaryProvider');
  return context;
}