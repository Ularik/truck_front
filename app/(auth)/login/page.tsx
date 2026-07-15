"use client";

import { useRouter } from "next/navigation";

import { inputClass } from "@/constants/constants";
import type { LoginMutation } from "@/types/user";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/lib/store/userStore";
import { useLogin } from "@/hooks/users";

const LoginPage = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginMutation>({
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginMutation) => {

    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setAuth({user_name: data.user_name}, data.refresh, data.access);
        router.push('dashboard');
        reset();
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F8F4] px-4 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#1E2B6D]">
            Truck Spares
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Войдите в панель управления
          </p>
        </div>

        <div className="space-y-4">
          <Input
            {...register("user_name", {
              required: "Введите имя",
              validate: (value) =>
                value.trim() !== "" || "Поле не должно быть пустым",
            })}
            className={inputClass}
            placeholder="имя"
            id="user_name"
            disabled={loginMutation.isPending}
          />
          {errors.user_name && (
            <p className="text-sm text-red-500">{errors.user_name.message}</p>
          )}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Введите пароль",
                validate: (value) =>
                  value.trim() !== "" || "Поле не должно быть пустым"
              })}
              className={`${inputClass} pr-10`}
              placeholder="Пароль"
              id="password"
              disabled={loginMutation.isPending}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {!showPassword ? (
                <EyeOff className="size-5" />
              ) : (
                <Eye className="size-5" />
              )}
            </button>
          </div>

          <button
            className="w-full rounded-2xl bg-[#1E2B6D] px-4 py-3 font-semibold text-white transition hover:bg-[#176C99] disabled:opacity-50"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Вход..." : "Войти"}
          </button>

          {loginMutation.isError && (
            <p className="text-center text-sm text-red-500">
              Неверное имя или пароль
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
