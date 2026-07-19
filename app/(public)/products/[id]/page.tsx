import ProductDetailPage from "@/components/product/ProductDetail/ProductDetail";
import { notFound } from "next/navigation";
import { getOneSpare } from "@/lib/requests/spares";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getOneSpare(id);

    const title = `${product.title} — купить по цене ${product.price} руб.`;
    const description =
      product.description ||
      `Купить ${product.title} в интернет-магазине запчастей с доставкой.`;

    // Берем первое изображение товара для превью в соцсетях (если есть)
    const mainImage = product.images?.[0] || "/default-product-share.jpg";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article", // или 'website'
        images: [{ url: mainImage }],
      },
    };
  } catch (error) {
    const status = axios.isAxiosError(error)
      ? error.response?.status
      : undefined;

    // Если товара точно нет, не нужно придумывать метаданные
    if (status === 404 || status === 400) {
      return { title: "Страница не найдена" };
    }

    // Фоллбэк на случай 500-й ошибки сервера
    return {
      title: "Купить автозапчасти в интернет-магазине",
      description:
        "Широкий ассортимент качественных запчастей для автомобилей по доступным ценам.",
    };
  }
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const qc = new QueryClient();
  let productData = null;

  try {
    productData = await getOneSpare(id);
    qc.setQueryData(["spare", id], productData);
  } catch (error) {
    const status = axios.isAxiosError(error)
      ? error.response?.status
      : undefined;
    if (status === 404 || status === 400) {
      notFound();
    }
    throw error; // Позволит отработать error.tsx для 500 ошибок
  }

  // 2. Генерируем JSON-LD микроразметку для поисковых роботов
  const jsonLd = productData
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productData.title,
        image: productData.images?.[0] || "",
        description: productData.description || `Купить ${productData.title}`,
        offers: {
          "@type": "Offer",
          price: productData.price,
          priceCurrency: "RUB",
          availability: productData.count
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      }
    : null;

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      {/* Встраиваем микроразметку прямо в HTML для парсинга роботами */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailPage id={id} />
    </HydrationBoundary>
  );
}
