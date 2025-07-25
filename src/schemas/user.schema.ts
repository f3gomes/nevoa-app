import { z } from "zod";

export const authSchema = z
  .object({
    userName: z.string().min(3, "Usuário inválido"),
    password: z.string().min(6, "Senha inválida"),
  })
  .refine((data) => data.userName !== data.password, {
    message: "Usuário e senha não podem ser iguais",
    path: ["userName"],
  });

export type AuthFormData = z.infer<typeof authSchema>;
