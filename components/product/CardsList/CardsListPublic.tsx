"use client";

import { ProductCardPublic } from "../ProductCard/ProductCardPublic";
import { useSpares } from "@/hooks/spares";
import { SearchFilters } from "@/types/truck";
import { PaginationCustom } from "@/components/pagination/PaginationCustom";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


interface Props {
  filters: SearchFilters;
}

export default function CardsListPublic({ filters }: Props) {
  const searchParams = useSearchParams();
  const { data: response, isPending } = useSpares(filters);

  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };


  return (
    <section className="relative px-4 py-8 md:px-8">
      {isPending && (
        <div className="absolute bg-muted flex items-center justify-center w-full h-full">
          <Spinner className="size-8" />
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6">
        {response?.result && response.result.length > 0 ? (
          response.result.map((product) => (
            <ProductCardPublic key={product.id} product={product} />
          ))
        ) : (
          <p className="text-lg text-gray-500 col-span-full text-center py-10">
            Товаров пока нет
          </p>
        )}
      </div>

      {response && (
        <div className="my-5">
          <PaginationCustom
            page={filters.page}
            limit={10}
            totalPage={Number(
              response.count / 10 + (response.count % 10 !== 0 ? 1 : 0),
            )}
            onChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}
