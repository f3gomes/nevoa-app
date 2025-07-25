"use client";

import { CircleUser } from "lucide-react";
import { Button } from "../ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function SignForm() {
  const [typeLogin, setTypeLogin] = useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-pink-600 hover:bg-pink-700 text-white">
          <CircleUser />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#1a1a1a] text-white sm:max-w-[425px] border border-neutral-700 rounded-xl shadow-md">
        <CardHeader>
          <DialogTitle>
            <CardTitle>{typeLogin ? "Login" : "Cadastro"}</CardTitle>
          </DialogTitle>
          <CardDescription className="text-neutral-400">
            {typeLogin ? "Entre na sua conta" : "Crie uma nova conta"}
          </CardDescription>
        </CardHeader>

        <form action="#">
          <CardContent>
            <div>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="userName">Usuário</Label>
                  <Input
                    id="userName"
                    name="userName"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Senha</Label>

                    <a
                      href="#"
                      className="text-sm underline hover:text-pink-500"
                      onClick={() => setTypeLogin(!typeLogin)}
                    >
                      {typeLogin ? "Não possui conta?" : "Já tem uma conta?"}
                    </a>
                  </div>

                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2 mt-4">
            <Button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700"
            >
              {typeLogin ? "Entrar" : "Cadastrar"}
            </Button>
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
