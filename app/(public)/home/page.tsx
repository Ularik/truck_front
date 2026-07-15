import CardsList from "@/components/product/CardsList/CardsList";

export default function Home() {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Популярные товары
        </h2>
        <p className="text-muted-foreground mt-1">
          Лучшие предложения этой недели.
        </p>
      </div>
      <CardsList />
    </>
  );
}
