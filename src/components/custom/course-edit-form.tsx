"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { Pencil } from "lucide-react";

import { updateCourse } from "@/lib/api";
import { DialogTitle } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CourseFormData, courseSchema } from "@/schemas/course.schema";
import { Switch } from "../ui/switch";

interface EditCourseFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  course: CourseFormData & { id: string };
  fetchCourses: () => Promise<void>;
}

export default function EditCourseForm({
  open,
  setOpen,
  course,
  fetchCourses,
}: EditCourseFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register: formRegister,
    control: formControl,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: course,
  });

  useEffect(() => {
    if (open) {
      reset(course);
    }
  }, [open, course, reset]);

  const onSubmit = async (data: CourseFormData) => {
    setLoading(true);
    try {
      await updateCourse(course.id, data);
      toast.success("Curso atualizado com sucesso!");
      fetchCourses();
      setOpen(false);

      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Erro ao atualizar o curso."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-sm">
          <Pencil size={16} /> Editar
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#1a1a1a] text-white sm:max-w-[425px] border border-neutral-700 rounded-xl shadow-md">
        <CardHeader>
          <DialogTitle>
            <CardTitle>Editar Curso</CardTitle>
          </DialogTitle>
          <CardDescription className="text-neutral-400">
            Atualize as informações do curso abaixo
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Título</Label>
                <Input id="title" type="text" {...formRegister("title")} />
                {errors.title && (
                  <span className="text-red-500 text-sm">
                    {errors.title.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  id="description"
                  type="text"
                  {...formRegister("description")}
                />
                {errors.description && (
                  <span className="text-red-500 text-sm">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="imageUrl">URL da Imagem</Label>
                <Input
                  id="imageUrl"
                  type="text"
                  {...formRegister("imageUrl")}
                />
                {errors.imageUrl && (
                  <span className="text-red-500 text-sm">
                    {errors.imageUrl.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Duração (Minutos)</Label>
                <Input
                  id="duration"
                  type="number"
                  {...formRegister("duration", {
                    setValueAs: (v) => (v === "" ? undefined : Number(v)),
                  })}
                />
                {errors.duration && (
                  <span className="text-red-500 text-sm">
                    {errors.duration.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  control={formControl}
                  name="status"
                  render={({ field }) => (
                    <div className="flex items-center gap-3">
                      <Switch
                        id="status"
                        checked={field.value === "ATIVO"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "ATIVO" : "INATIVO")
                        }
                      />
                      <span className="text-sm text-muted-foreground">
                        {field.value === "ATIVO" ? "ATIVO" : "INATIVO"}
                      </span>
                    </div>
                  )}
                />
                {errors.status && (
                  <span className="text-red-500 text-sm">
                    {errors.status.message}
                  </span>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 mt-4">
            <Button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700"
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar alterações"}
            </Button>
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
