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
    <header className="w-full bg-[#0f0f0f] text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo */}
          <span className="text-xl font-bold">Nevoa</span>
        </div>

        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              {["Home", "Cursos", "Painel"].map((item) => (
                <NavigationMenuItem key={item}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "")}`}
                      className="hover:text-pink-500 transition"
                    >
                      {item}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center max-w-xs w-full">
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>

              <input
                type="text"
                id="course-search"
                placeholder="Buscar..."
                value={searchText}
                onChange={(e) => setSearchText?.(e.target.value)}
                className="bg-white text-black text-sm rounded-lg border border-neutral-300 focus:ring-pink-500 focus:border-pink-500 block w-full ps-10 p-2"
              />
            </div>
          </div>

          <SignForm />
        </div>
      </div>
    </header>
  );
}
