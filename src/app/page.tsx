"use client";

import { useState } from "react";
import Navbar from "@/components/custom/navbar";
import CoursesList from "@/components/custom/courses-list";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <main className="min-h-screen antialiased bg-grid-white/[0.2]">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CoursesList searchTerm={searchTerm} />
      </main>
    </div>
  );
}
