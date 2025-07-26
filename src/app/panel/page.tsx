"use client";

import { CourseCard } from "@/components/custom/course-card";
import EditCourseForm from "@/components/custom/course-edit-form";
import CourseForm from "@/components/custom/course-form";
import Navbar from "@/components/custom/navbar";
import { listCourses } from "@/lib/api";
import { Course } from "@/types/types";
import { useEffect, useState } from "react";

export default function PanelPage() {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter((course) => {
    return course.title.toLowerCase().includes(searchTerm.toLowerCase());
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
            </div>

            <CourseForm fetchCourses={fetchCourses} />

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
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedCourse(course);
                          setOpen(true);
                        }}
                      >
                        <CourseCard
                          course={course}
                          fetchCourses={async () => await fetchCourses()}
                          panel
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {selectedCourse && (
            <EditCourseForm
              open={open}
              setOpen={setOpen}
              course={selectedCourse}
              fetchCourses={async () => {
                await fetchCourses();
                setSelectedCourse(null);
              }}
            />
          )}
        </section>
      </main>
    </div>
  );
}
