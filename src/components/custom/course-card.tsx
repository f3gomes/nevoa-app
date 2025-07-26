"use client";

import Image from "next/image";
import { Star, Clock, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/types/types";
import { deleteCourse } from "@/lib/api";
import { toast } from "sonner";

interface Props {
  course: Course & { id?: string };
  panel?: boolean;
  fetchCourses: () => Promise<void>;
}

export const CourseCard = ({ course, panel = false, fetchCourses }: Props) => {
  const handleRemoveCouse = async () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este curso?"
    );

    if (!confirmed) return;

    try {
      await deleteCourse(course.id);
      toast.success("Curso excluído com sucesso!");
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="w-[24.5rem] h-[485.69px] bg-slate-900 text-white border border-neutral-800 hover:scale-[1.03] transition-transform duration-300 shadow-md overflow-hidden relative">
      <CardHeader className="p-0 relative" style={{ height: "200px" }}>
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          className="object-cover"
        />

        {panel && (
          <>
            {course.status && (
              <Badge
                className={`absolute top-2 right-2 ${
                  course.status === "ATIVO"
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {course.status}
              </Badge>
            )}
          </>
        )}
      </CardHeader>

      <CardContent className="p-4">
        <CardTitle className="text-base font-semibold leading-snug line-clamp-2">
          {course.title}
        </CardTitle>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
          {course.description}
        </p>

        <div className="flex flex-col gap-1 mt-3 text-sm text-gray-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-yellow-400" />
              4.5
            </span>
          </div>

          {course.duration && (
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{course.duration} horas</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-4 pb-4 pt-0">
        {!panel ? (
          <Button
            variant="outline"
            className="text-sm text-purple-700 border-purple-700 hover:bg-purple-50"
          >
            Comprar
          </Button>
        ) : (
          <Button
            variant="outline"
            className="text-sm bg-red-700 border-red-700 hover:bg-red-500 z-50 absolute"
            onClick={(e) => {
              e.stopPropagation();
              handleRemoveCouse();
            }}
          >
            <Trash2 />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
