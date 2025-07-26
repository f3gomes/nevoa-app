import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().min(2, {}),
  description: z.string().min(5, {}),
  imageUrl: z.string(),
  duration: z.number(),
  status: z.enum(["ATIVO", "INATIVO"])
});

export type CourseFormData = z.infer<typeof courseSchema>;
