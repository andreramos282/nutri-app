// Lista expandida de alimentos comuns em dietas, com macros e micros por 100g

export type Nutrientes = {
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  calcio: number; // mg
  ferro: number;  // mg
  sodio: number;  // mg
  potassio?: number; // mg
  magnesio?: number; // mg
  fibras?: number; // g
  vitaminaC?: number; // mg
};

export type Food = {
  id: string;
  nome: string;
  nutrientes: Nutrientes;
};

export const FOODS: Food[] = [
  // Carboidratos
  {
    id: 'arroz',
    nome: 'Arroz branco cozido',
    nutrientes: { calorias: 130, proteinas: 2.5, carboidratos: 28, gorduras: 0.2, calcio: 5, ferro: 0.2, sodio: 1, potassio: 26, fibras: 0.3 },
  },
  {
    id: 'arroz-integral',
    nome: 'Arroz integral cozido',
    nutrientes: { calorias: 124, proteinas: 2.6, carboidratos: 25.8, gorduras: 1.0, calcio: 10, ferro: 0.4, sodio: 1, potassio: 43, fibras: 1.6 },
  },
  {
    id: 'batata-doce',
    nome: 'Batata doce cozida',
    nutrientes: { calorias: 76, proteinas: 0.6, carboidratos: 18.4, gorduras: 0.0, calcio: 17, ferro: 0.5, sodio: 2, potassio: 230, fibras: 2.2, vitaminaC: 12.8 },
  },
  {
    id: 'mandioca',
    nome: 'Mandioca cozida',
    nutrientes: { calorias: 125, proteinas: 0.6, carboidratos: 30, gorduras: 0.3, calcio: 33, ferro: 0.3, sodio: 2, potassio: 165, fibras: 1.6 },
  },
  {
    id: 'pao-frances',
    nome: 'Pão francês',
    nutrientes: { calorias: 270, proteinas: 8.0, carboidratos: 57, gorduras: 1.4, calcio: 22, ferro: 2.3, sodio: 568, potassio: 120, fibras: 2.3 },
  },
  {
    id: 'aveia',
    nome: 'Aveia em flocos',
    nutrientes: { calorias: 367, proteinas: 13.9, carboidratos: 66.6, gorduras: 6.9, calcio: 54, ferro: 4.7, sodio: 2, potassio: 355, fibras: 9.1 },
  },
  {
    id: 'macarrao',
    nome: 'Macarrão cozido',
    nutrientes: { calorias: 131, proteinas: 5, carboidratos: 25, gorduras: 1.1, calcio: 7, ferro: 0.4, sodio: 1, potassio: 44, fibras: 1.8 },
  },

  // Proteínas animais
  {
    id: 'frango',
    nome: 'Frango grelhado',
    nutrientes: { calorias: 165, proteinas: 31, carboidratos: 0, gorduras: 3.6, calcio: 15, ferro: 1.0, sodio: 70, potassio: 256 },
  },
  {
    id: 'carne-bovina',
    nome: 'Carne bovina grelhada',
    nutrientes: { calorias: 250, proteinas: 26, carboidratos: 0, gorduras: 17, calcio: 18, ferro: 2.6, sodio: 57, potassio: 330 },
  },
  {
    id: 'peixe',
    nome: 'Peixe assado',
    nutrientes: { calorias: 105, proteinas: 22, carboidratos: 0, gorduras: 1.5, calcio: 16, ferro: 0.5, sodio: 50, potassio: 380 },
  },
  {
    id: 'ovo',
    nome: 'Ovo de galinha cozido',
    nutrientes: { calorias: 155, proteinas: 13, carboidratos: 1.1, gorduras: 11, calcio: 50, ferro: 1.2, sodio: 124, potassio: 126 },
  },

  // Leguminosas
  {
    id: 'feijao',
    nome: 'Feijão carioca cozido',
    nutrientes: { calorias: 76, proteinas: 4.8, carboidratos: 13.6, gorduras: 0.5, calcio: 24, ferro: 1.3, sodio: 1, potassio: 168, fibras: 6.4 },
  },
  {
    id: 'lentilha',
    nome: 'Lentilha cozida',
    nutrientes: { calorias: 93, proteinas: 7.6, carboidratos: 16.9, gorduras: 0.4, calcio: 19, ferro: 1.5, sodio: 2, potassio: 369, fibras: 3.2 },
  },

  // Laticínios
  {
    id: 'leite',
    nome: 'Leite integral',
    nutrientes: { calorias: 61, proteinas: 3.2, carboidratos: 4.7, gorduras: 3.3, calcio: 113, ferro: 0.0, sodio: 50, potassio: 150 },
  },
  {
    id: 'iogurte',
    nome: 'Iogurte natural integral',
    nutrientes: { calorias: 61, proteinas: 3.5, carboidratos: 4.7, gorduras: 3.3, calcio: 120, ferro: 0.1, sodio: 50, potassio: 155 },
  },
  {
    id: 'queijo',
    nome: 'Queijo prato',
    nutrientes: { calorias: 352, proteinas: 23.2, carboidratos: 2.3, gorduras: 28.6, calcio: 850, ferro: 0.2, sodio: 919, potassio: 76 },
  },

  // Frutas
  {
    id: 'banana',
    nome: 'Banana prata',
    nutrientes: { calorias: 89, proteinas: 1.1, carboidratos: 22.8, gorduras: 0.3, calcio: 6, ferro: 0.3, sodio: 1, potassio: 358, fibras: 2.6, vitaminaC: 8.7 },
  },
  {
    id: 'maca',
    nome: 'Maçã',
    nutrientes: { calorias: 52, proteinas: 0.3, carboidratos: 14, gorduras: 0.2, calcio: 6, ferro: 0.1, sodio: 1, potassio: 107, fibras: 2.4, vitaminaC: 4.6 },
  },
  {
    id: 'laranja',
    nome: 'Laranja',
    nutrientes: { calorias: 47, proteinas: 0.9, carboidratos: 12, gorduras: 0.1, calcio: 40, ferro: 0.1, sodio: 0, potassio: 181, fibras: 2.4, vitaminaC: 53.2 },
  },

  // Oleaginosas
  {
    id: 'amendoim',
    nome: 'Amendoim torrado',
    nutrientes: { calorias: 595, proteinas: 27.2, carboidratos: 21.6, gorduras: 49.4, calcio: 58, ferro: 1.7, sodio: 2, potassio: 649, fibras: 8.0 },
  },
  {
    id: 'castanha-para',
    nome: 'Castanha do Pará',
    nutrientes: { calorias: 656, proteinas: 14.3, carboidratos: 12.3, gorduras: 66.4, calcio: 160, ferro: 2.4, sodio: 1, potassio: 659, fibras: 7.9 },
  },
];