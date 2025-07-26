"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { CircleUser } from "lucide-react";
import Cookies from "js-cookie";

import { login, register } from "@/lib/api";
import { DialogTitle } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormData, authSchema } from "@/schemas/user.schema";

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
import UserMenu from "./user-menu";
import { useRouter } from "next/navigation";

export default function SignForm() {
  const [typeLogin, setTypeLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const router = useRouter();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) setUserName(storedUser);
  }, []);

  const handleLogout = () => {
    setUserName(null);
    Cookies.remove("nevoa-app");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    toast.success("Você foi deslogado");

    router.push("/");
  };

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);
    try {
      const response = typeLogin ? await login(data) : await register(data);

      Cookies.set("nevoa-app", "logged");
      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "userName",
        response.user?.userName || data.userName
      );

      toast.success(typeLogin ? "Login realizado!" : "Cadastro realizado!");
      reset();
      setUserName(response.user?.userName || data.userName);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Erro ao processar sua requisição."
      );
    } finally {
      setLoading(false);
    }
  };

  if (userName) {
    return <UserMenu userName={userName} handleLogout={handleLogout} />;
  }

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="userName">Usuário</Label>
                <Input id="userName" {...formRegister("userName")} />
                {errors.userName && (
                  <span className="text-red-500 text-sm">
                    {errors.userName.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>

                  <button
                    type="button"
                    className="text-sm underline hover:text-pink-500"
                    onClick={() => setTypeLogin(!typeLogin)}
                  >
                    {typeLogin ? "Não possui conta?" : "Já tem uma conta?"}
                  </button>
                </div>

                <Input
                  id="password"
                  type="password"
                  {...formRegister("password")}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
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
              {loading
                ? typeLogin
                  ? "Entrando..."
                  : "Cadastrando..."
                : typeLogin
                ? "Entrar"
                : "Cadastrar"}
            </Button>
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
