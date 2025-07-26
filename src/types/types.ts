export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: number;
  status: "ATIVO" | "INATIVO";
}
