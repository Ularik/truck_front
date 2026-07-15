"use client";

import { ProductCard } from "@/components/product/ProductCard/ProductCard";
import { useSpares } from "@/hooks/spares";
import { SearchFilters } from "@/types/truck";
import { PaginationCustom } from "@/components/pagination/PaginationCustom";
import { useEffect, useState } from "react";
import { useDeleteSpare } from "@/hooks/spares";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface Props {
  filters?: SearchFilters;
}

export default function CardsList({ filters }: Props) {
  const [page, setPage] = useState(1);

  const pagingFilters = {...filters, page};
  const { data: response, refetch } = useSpares(pagingFilters);

  useEffect(() => {
    setPage(1)
    refetch();
  }, [filters]);

  const { mutate: deleteSpare, isPending } = useDeleteSpare();

  const deleteProd = (id: number) => {
    deleteSpare(id, {
      onError: (error) => {
        toast.error(error.message, { position: 'top-center'});
      }
    });
  }

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
            <ProductCard
              key={product.id}
              product={product}
              delFunc={deleteProd}
            />
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
            page={page}
            limit={10}
            totalPage={Number(
              response.count / 10 + (response.count % 10 !== 0 ? 1 : 0),
            )}
            onChange={(page: number) => {
              setPage(page);
            }}
          />
        </div>
      )}
    </section>
  );
}
