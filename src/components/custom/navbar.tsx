"use client";

import Link from "next/link";
import SignForm from "./sign-form";
import { useState } from "react";
import { Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [searchText, setSearchText] = useState("");

  return (
    <header className="w-full bg-neutral-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight text-pink-500">
            Nevoa
          </span>
        </div>

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-8">
              {["Home", "Cursos", "Painel"].map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                      className="text-sm font-medium transition-colors duration-200 hover:text-pink-400"
                    >
                      {item}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-48">
            <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>

            <input
              type="text"
              id="course-search"
              placeholder="Buscar cursos..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-neutral-800 text-white border border-neutral-700 placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:outline-none transition"
            />
          </div>

          <SignForm />
        </div>
      </div>
    </header>
  );
}
