
  // src/types/Faq.ts
export interface Faq {
    pertanyaan: string;
    jawaban: string;
    keywords?: string[]; // ← ini ditambahkan
  }
  
  export interface FaqWithId extends Faq {
    id: string;
  }