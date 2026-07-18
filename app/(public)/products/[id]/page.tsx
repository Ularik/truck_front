import ProductDetailPage from "@/components/product/ProductDetail/ProductDetail";
import { notFound } from "next/navigation";
import { getOneSpare } from "@/lib/requests/spares";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";


interface Props {
  params: Promise<{ id: string }>;
}


export async function generateMetadata({ params }: Props) {
      const { id } = await params;

      try {
          const product = await getOneSpare(id);
          return {
            title: `${product.title} — купить по цене ${product.price} руб.`,
            description:
              product.description ||
              `Купить ${product.title} в интернет-магазине запчастей.`,
          };
      } catch {
        return {
          title: `Кондиционер, печь(автономка) — купить по цене сом.`,
          description:
            `Купить запчасть в интернет-магазине запчастей.`,
        };
      }
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const qc = new QueryClient();

  try {
      const product = await getOneSpare(id);
        qc.setQueryData(["spare", id], product)
  } catch(error) {
    const status = axios.isAxiosError(error)
      ? error.response?.status
      : undefined;

    if (status === 404 || status === 400) {
      notFound();
    }
  }

  // Передаем серверные данные внутрь клиентского визуального компонента
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <ProductDetailPage id={id} />
    </HydrationBoundary>
  );
}
