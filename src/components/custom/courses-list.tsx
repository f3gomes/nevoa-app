"use client";

import { useState, useEffect } from "react";
import { Course } from "@/types/types";
import { SquarePlay } from "lucide-react";

import { CourseCard } from "@/components/custom/course-card";
import { listCourses } from "@/lib/api";

interface Props {
  searchTerm: string;
}

export default function CoursesList({ searchTerm }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listCourses()
      .then((list) => setCourses(list))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredCourses = courses.filter((course) => {
    return (
      course.status === "ATIVO" &&
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <section className="min-h-screen text-black bg-yellow-100">
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black drop-shadow flex justify-center items-center gap-2">
            <SquarePlay size={38} />
            <span>Conheça nossos cursos</span>
          </h1>
          <p className="text-gray/80 mt-3 max-w-2xl mx-auto text-base md:text-lg">
            Aprenda com os melhores com nossa seleção criteriosa de cursos de
            música ministrados por profissionais.
          </p>
        </div>

        {isLoading ? (
          <p className="text-center text-slate-800 text-lg mt-12">
            Carregando...
          </p>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center text-slate-800 text-lg mt-12">
            Nenhum curso encontrado
          </p>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center">
            {filteredCourses.map((course) => (
              <div key={course.id}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
