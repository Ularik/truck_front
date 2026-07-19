import CardsListPublic from "@/components/product/CardsList/CardsListPublic";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSpares } from "@/lib/requests/spares";
import { Metadata } from "next";
import { SearchInput } from "@/components/searchInput/SearchInput";


interface Props {
  searchParams: Promise<{ search?: string; page?: string }>;
}


export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { search } = await searchParams;

  const baseTitle =
    "Купить автозапчасти для грузовиков, спец техники (Хово, Шахман) — в Бишкеке, Кыргызстан";
  const description =
    "Широкий ассортимент качественных запчастей в Бишкеке, Кыргызстан.";

  return {
    title: search ? `Поиск: «${search}» — купить запчасти` : baseTitle,
    description: search
      ? `Результаты поиска по запросу «${search}» в Бишкеке, Кыргызстан.`
      : "Широкий ассортимент качественных запчастей в Бишкеке, Кыргызстан.",

    openGraph: {
      title: baseTitle,
      description,
      type: "website",
      images: [{ url: "/og-main-preview.jpg" }], // Баннер вашего магазина
    },
  };
}

export default async function Home({ searchParams }: Props) {
  const { search, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const qc = new QueryClient();
  const filters = {
    search: search || undefined,
    page: currentPage,
  };

  try {
    // Предзагружаем популярные товары на сервере.
    // Передаем те же параметры/ключи, что используются внутри CardsListPublic
    await qc.prefetchQuery({
      queryKey: ["spares", filters],
      queryFn: () => getSpares(filters), // Ваша логика запроса списка
    });
  } catch (error) {
    console.error("Ошибка при предзагрузке популярных товаров:", error);
    // Для главной страницы при ошибке лучше не падать в 404,
    // а дать загрузиться интерфейсу, клиент сам попробует перезапросить данные
  }

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Главный заголовок страницы обязательно должен быть H1 для SEO */}
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {search ? `Результаты поиска: «${search}»` : "Популярные товары"}
        </h1>
        <SearchInput />
      </div>

      {/* Клиентский компонент подхватит данные из кэша без лоадеров */}
      <CardsListPublic filters={filters} />
    </HydrationBoundary>
  );
}
