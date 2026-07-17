"use client";

import { ProductCard } from "@/components/product/ProductCard/ProductCard";
import { useSpares } from "@/hooks/spares";
import { SearchFilters } from "@/types/truck";
import { PaginationCustom } from "@/components/pagination/PaginationCustom";
import { useEffect, useState } from "react";
import { useDeleteSpare } from "@/hooks/spares";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


interface Props {
  filters?: SearchFilters;
}

export default function CardsList({ filters }: Props) {
  const [page, setPage] = useState(1);

  const pagingFilters = {...filters, page};
  const { data: response, refetch } = useSpares(pagingFilters);

  useEffect(() => {
    refetch();
  }, [page])

  useEffect(() => {
    setPage(1)
    refetch();
  }, [filters]);


  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<number | Boolean>(false);
  const { mutate: deleteSpare, isPending } = useDeleteSpare();

  const deleteProd = () => {
    if (typeof isDeleteDialogOpen === 'number')
    deleteSpare(isDeleteDialogOpen, {
      onError: (error) => {
        toast.error(error.message, { position: 'top-center'});
      }
    });
    setIsDeleteDialogOpen(false);
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
              delFunc={(id: number) => setIsDeleteDialogOpen(id)}
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
      <Dialog
        open={Boolean(isDeleteDialogOpen)}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <DialogContent>
          <DialogHeader className="pr-8">
            <DialogTitle>
              Вы уверены, что хотите удалить этот продукт?
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only">
            Диалоговое окно удаление товара
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button
              variant="destructive"
              onClick={deleteProd}
              disabled={isPending}
            >
              {isPending ? "Удаление..." : "Удалить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
