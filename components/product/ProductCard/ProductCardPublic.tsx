"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import type { Spares } from "@/types/truck";
import { imageUrl } from "@/constants/config";
import ImageNotFount from "@/media/imageNotFound.jpeg";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Spares;
}

export function ProductCardPublic({
  product,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const image = product.images[0]
    ? imageUrl + product.images[0]
    : ImageNotFount.src;
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/products/${product.id}`)}
      className="group overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-lg"
    >
      {/* Блок с изображением */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={product.title}
          loading="lazy" // Включает ленивую загрузку (как у Next.js)
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100 max-md:opacity-100">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80"
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite
                  ? "fill-destructive text-destructive"
                  : "text-muted-foreground"
              }`}
            />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
          {product.category_id}
        </p>
        <h3 className="font-semibold text-base line-clamp-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 min-h-[40px]">
          {product.description}
        </p>
      </CardContent>

      {/* Футер карточки с ценой и кнопкой */}
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
        </div>

        <Button size="sm" className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Посмотреть
        </Button>
      </CardFooter>
    </Card>
  );
}
