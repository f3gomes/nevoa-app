"use client";

import { CourseCard } from "@/components/custom/course-card";
import Navbar from "@/components/custom/navbar";
import { listCourses } from "@/lib/api";
import { Course } from "@/types/types";
import { useEffect, useState } from "react";

export default function PanelPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const fetchCourses = async () => {
    const list = await listCourses();
    setCourses(list);
  };

  useEffect(() => {
    try {
      fetchCourses();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div>
      <main className="min-h-screen antialiased bg-grid-white/[0.2]">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <section className="min-h-screen text-black bg-yellow-100">
          <div className="max-w-7xl mx-auto py-16 px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black drop-shadow flex justify-center items-center gap-2">
                <span>Painel do Administrador</span>
              </h1>
              <p className="text-gray/80 mt-3 max-w-2xl mx-auto text-base md:text-lg">
                Aprenda com os melhores com nossa seleção criteriosa de cursos
                de música ministrados por profissionais.
              </p>
            </div>

            {isLoading ? (
              <p className="text-center text-slate-800 text-lg mt-12">
                Carregando...
              </p>
            ) : (
              <>
                {courses.length === 0 ? (
                  <p className="text-center text-slate-800 text-lg mt-12">
                    Nenhum curso encontrado
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {filteredCourses.map((course: Course) => (
                      <CourseCard key={course.id} course={course} panel />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
