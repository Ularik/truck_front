"use client";

import CardsList from "@/components/product/CardsList/CardsList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Products() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const router = useRouter();
  return (
    <section className="bg-white p-5 rounded-xl">
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="mb-5 text-2xl font-bold">Товары</h1>

        <Button
          onClick={() => router.push("products/create")}
          className="flex gap-1 bg-[#1E2B6D] text-white hover:bg-[#263890]"
        >
          <Plus />
          Добавить запчасть
        </Button>
      </div>
      <div className="relative w-full md:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по названию..."
          className="pl-9 bg-white border-gray-300 focus-visible:ring-1 focus-visible:ring-offset-0 transition-colors focus-visible:border-primary h-8"
        />
      </div>

      <CardsList
        filters={{
          search: debouncedSearch,
          page: 1
        }}
      />
    </section>
  );
}
