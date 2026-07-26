"use client";
import { useCreateSpare } from "@/hooks/spares";
import ProductForm from "@/components/product/ProductCreateForm";
import { useRouter } from "next/navigation";
import { SparesMutation } from "@/types/truck";
import { toast } from "sonner";


export default function AddProduct() {
    const router = useRouter();
    const {
      mutate,
      isPending: isLoading,
      error,
    } = useCreateSpare();

    const onSubmit = (data: SparesMutation) => {
      mutate(data, {
        onSuccess: () => {
          router.push("/admin/products");
          toast.success('Добавили новую деталь', { position: 'top-center' });
        },
      });
    }

  return (
    <>
      <ProductForm saveFunc={onSubmit} isLoading={isLoading} error={error}/>
    </>
  );
}
