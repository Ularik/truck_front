"use client";

import { useEffect, useState } from "react";
import { Check, ShoppingCart, Truck, Layers, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDetailSpare } from "@/hooks/spares";
import { imageUrl } from "@/constants/config";
import ImageNotFound from "@/media/imageNotFound.jpeg";

interface Props {
  id: string;
}

export default function ProductDetailPage({ id }: Props) {
    const { data: product, isPending, isError, refetch } = useDetailSpare(id);

    
    const [activeImage, setActiveImage] = useState(
        ImageNotFound.src,
    );

    useEffect(() => {
      if (!isPending && product && product.images.length > 0) {
        setActiveImage(imageUrl + product.images[0]);
      }
    }, [product]);

    if (isPending) {
        return (
            <>Загрузка...</>
        )
    }
    if (isError) {
        return (
            <>
            Ошибка, товар не найден...
            </>
        )
    }

  const isAvailable = product.count > 0 && false;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
        {/* ГАЛЕРЕЯ (Интерактивная часть) */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-50 flex items-center justify-center border">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-contain p-4"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl border-2 ${activeImage === img ? "border-[#1E2B6D]" : "border-transparent"}`}
                >
                  <img
                    src={imageUrl + img}
                    alt=""
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ИНФОРМАЦИЯ (SEO-важная часть, прилетит уже наполненной) */}
        <div className="bg-gray-50 p-3 md:p-6 rounded-2xl mb-6">
          <p className="text-xl md:text-3xl font-extrabold text-gray-900 mb-4">
            {product.title}
          </p>
          <p className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
            {product.price.toLocaleString("ru-RU")} сом
          </p>

          {/* Основная кнопка добавления в корзину */}
          <Button
            disabled={!isAvailable}
            className="w-full h-12 bg-[#1E2B6D] hover:bg-[#162356] transition rounded-xl font-semibold mb-3"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {isAvailable ? "Добавить в корзину" : "Пока недоступно"}
          </Button>

          {/* Блок быстрых кнопок связи */}
          <div className="grid grid-cols-2 gap-3">
            {/* Кнопка WhatsApp */}
            <a
              href={`https://wa.me/996550257798?text=${encodeURIComponent(
                `Здравствуйте! Меня интересует товар: ${product.title} (Код: ${product.id || "—"}). Есть ли в наличии?`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-11 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-medium text-sm transition shadow-sm"
            >
              <span>WhatsApp</span>
            </a>

            {/* Кнопка телефона для звонка */}
            <a
              href="tel:+996550257798"
              className="flex items-center justify-center gap-2 h-11 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 font-medium text-sm transition shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Позвонить</span>
            </a>
          </div>

          <div className="mt-3 md:mt-5 font-semibold text-lg">
            {product.description}
          </div>
        </div>
      </div>
    </div>
  );
}
