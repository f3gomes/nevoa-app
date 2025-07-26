import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";
import Link from "next/link";

interface UserMenuProps {
  userName: string;
  handleLogout: () => void;
}

export default function UserMenu({ userName, handleLogout }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-pink-600 hover:bg-pink-700 text-white">
          <CircleUser className="mr-1" />
          {userName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-neutral-900 text-white border border-neutral-700 ml-24">
        <DropdownMenuItem disabled>
          Logado como <strong>{userName}</strong>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer text-white">
          <Link
            href={`/panel`}
            className="text-sm font-medium transition-colors duration-200 hover:text-pink-400"
          >
            Painel
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-500"
        >
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
