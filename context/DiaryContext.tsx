import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type FoodEntry = {
  alimentoId: string;
  nome: string;
  quantidade: number;
  refeicao: string;
  horario: string;
  nutrientes: {
    calorias: number;
    proteinas: number;
    carboidratos: number;
    gorduras: number;
    calcio: number;
    ferro: number;
    sodio: number;
        potassio?: number;
    magnesio?: number;
    fibras?: number;
    vitaminaC?: number;
  };
};
 
export type PesoEntry = {
  peso: number;
  data: string; // ISO
};

type DiaryContextType = {
  entries: FoodEntry[];
  addEntry: (entry: FoodEntry) => void;
  refeicoes: { nome: string; horario: string }[];
  addRefeicao: (nome: string, horario: string) => void;
  peso: PesoEntry[];
  addPeso: (peso: number) => void;
};

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

const ENTRIES_KEY = "@entries";
const REFEICOES_KEY = "@refeicoes";
const PESO_KEY = "@peso";

export const DiaryProvider = ({ children }: { children: React.ReactNode }) => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [refeicoes, setRefeicoes] = useState<{ nome: string; horario: string }[]>([
    { nome: "Café da manhã", horario: "08:00" },
    { nome: "Almoço", horario: "12:00" },
    { nome: "Jantar", horario: "19:00" },
  ]);
  const [peso, setPeso] = useState<PesoEntry[]>([]);

  useEffect(() => {
    (async () => {
      const e = await AsyncStorage.getItem(ENTRIES_KEY);
      if (e) setEntries(JSON.parse(e));
      const r = await AsyncStorage.getItem(REFEICOES_KEY);
      if (r) setRefeicoes(JSON.parse(r));
      const p = await AsyncStorage.getItem(PESO_KEY);
      if (p) setPeso(JSON.parse(p));
    })();
  }, []);

  useEffect(() => { AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries)); }, [entries]);
  useEffect(() => { AsyncStorage.setItem(REFEICOES_KEY, JSON.stringify(refeicoes)); }, [refeicoes]);
  useEffect(() => { AsyncStorage.setItem(PESO_KEY, JSON.stringify(peso)); }, [peso]);

  function addEntry(entry: FoodEntry) {
    setEntries(prev => [...prev, entry]);
  }
  function addRefeicao(nome: string, horario: string) {
    setRefeicoes(prev => [...prev, { nome, horario }]);
  }
  function addPeso(newPeso: number) {
    setPeso(prev => [...prev, { peso: newPeso, data: new Date().toISOString() }]);
  }

  return (
    <DiaryContext.Provider value={{ entries, addEntry, refeicoes, addRefeicao, peso, addPeso }}>
      {children}
    </DiaryContext.Provider>
  );
};

export function useDiary() {
  const context = useContext(DiaryContext);
  if (!context) throw new Error('useDiary must be used within DiaryProvider');
  return context;
}