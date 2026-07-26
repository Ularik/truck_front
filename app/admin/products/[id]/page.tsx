"use client";

import ProductForm from "@/components/product/ProductCreateForm";
import { useDetailSpare } from "@/hooks/spares";
import { useParams } from "next/navigation";
import { useUpdateSpare } from "@/hooks/spares";
import { SparesMutation } from "@/types/truck";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function EditProduct() {
    const params = useParams();
    const id = params.id as string
    const { data: product, isPending, isError } = useDetailSpare(id);

    const { mutate, isPending: isLoading, error } = useUpdateSpare();

    const router = useRouter();

    const onSubmit = (data: SparesMutation) => {
      mutate(data, {
        onSuccess: () => {
          router.push("/admin/products");
          toast.success("Обновили деталь", { position: "top-center" });
        }
      })
    }

      if (isPending) {
        return (
          <div className="p-8 text-center text-[#031633] font-medium">
            Загрузка данных...
          </div>
        );
      }

      if (isError || !product) {
        return (
          <div className="p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold text-red-600">Продукт не найден</h2>
            <p className="text-gray-500">
              Возможно, он был удален или ссылка неверна.
            </p>
          </div>
        );
      }

  return (
    <>
      <ProductForm
        saveFunc={onSubmit}
        isLoading={isLoading}
        error={error}
        initialValues={{
          id: product?.id,
          title: product?.title,
          description: product.description,
          price: product.price,
          truck: product.truck,
          category_id: product.category_id,
          images: product.images,
          count: product.count,
          is_popular: product.is_popular,
        }}
      />
    </>
  );
}
