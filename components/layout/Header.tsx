"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: "Каталог", href: "/" },
    { label: "Контакты", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mb-7">
      <div className="container flex min-h-16 items-center justify-between px-[10px] md:px-[20px] mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">NurStart</span>
        </Link>

        {/* Десктопная навигация */}
        <nav className="hidden md:flex items-center space-x-6 text-lg font-medium">
          <Link
            href="/"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Каталог
          </Link>
          <div className="transition-colors hover:text-foreground/80 text-foreground/60 flex gap-5 items-center py-3">
            <span>Контакты:</span>
            <p>
              <a
                href={`https://wa.me/996550257798?text=${encodeURIComponent(
                  `Здравствуйте! Меня интересует товар`,
                )}`}
              >
                +996550257798
              </a>
              <br />
              <a href="tel:+996550176420">+996550176420</a>
            </p>
          </div>
        </nav>

        {/* Кнопка действия (Десктоп) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* <Button variant="ghost" className="text-lg" size="lg">
            Войти
          </Button> */}
        </div>

        {/* Кнопка мобильного меню */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Мобильное меню */}
      {isOpen && (
        <div className="md:hidden border-b bg-background animate-in fade-in-50 slide-in-from-top-5 duration-200">
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2 border-muted" />
            <div className="flex flex-col space-y-2">
              {/* <Button className="w-full justify-center">Войти</Button> */}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
