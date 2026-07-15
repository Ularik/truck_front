
"use client";
import { Controller, useForm } from "react-hook-form";
import { Check, ChevronsUpDown, Loader2, X, Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiImageInput from "@/components/dashboard/MultiImageInput/MultiImageInput";
import { inputClass } from "@/constants/constants";
import { SparesMutation } from "@/types/truck";
import { useCreateSpare, useUpdateSpare } from "@/hooks/spares";
import { useCategories } from "@/hooks/categories";
import { useTrucks } from "@/hooks/trucks";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


interface Props {
  editFunc?: (data: SparesMutation) => void;
  initialValues?: SparesMutation;
}

export default function ProductForm({ editFunc, initialValues }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<SparesMutation>({
    defaultValues: initialValues || {
      title: '',
      description: '',
      price: 0,
      truck: [],
      category_id: null,
      images: [],
      count: 0,
      is_popular: false
    }
  });

  const { data: trucks, isPaused: isTruckLoading } = useTrucks();
  const { data: categories, isPending: isCatsLoading } = useCategories();

  const router = useRouter();
  const {
    mutate,
    isPending: isLoading,
    error,
  } = initialValues ? useUpdateSpare() : useCreateSpare();

  const onSubmit = (data: SparesMutation) => {
    console.log('submit');
    mutate(data, {
      onSuccess: () => {
        router.push('/products')
      }
    });
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
        autoComplete="off"
      >
        <h2 className="text-xl font-semibold text-[#1E2B6D]">
          {initialValues ? "Редактирование продукта" : "Создание продукта"}
        </h2>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Название продукта
          </label>
          <Input
            {...register("title", { required: "Введите название" })}
            className={`${inputClass} ${errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.title && (
            <p className="text-xs font-semibold text-red-500 pt-0.5">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Категория</label>
          <Controller
            control={control}
            name="category_id"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={String(field.value)}
                disabled={isLoading}
              >
                <SelectTrigger
                  className={`${inputClass} ${errors.category_id ? "border-red-500 focus:ring-red-500" : ""}`}
                >
                  <SelectValue
                    placeholder={
                      isCatsLoading ? (
                        <span className="flex items-center gap-2 text-gray-400">
                          <Loader2 className="w-4 h-4 animate-spin text-[#1E2B6D]" />{" "}
                          Загрузка категорий...
                        </span>
                      ) : (
                        "Выберите категорию"
                      )
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category_id && (
            <p className="text-xs font-semibold text-red-500 pt-0.5">
              {errors.category_id.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Описание</label>
          <Textarea
            {...register("description")}
            className={`${inputClass} min-h-[100px] resize-none ${errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.description && (
            <p className="text-xs font-semibold text-red-500 pt-0.5">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Какие машины используют
          </label>
          <Controller
            control={control}
            name="truck"
            render={({ field }) => {
              // Гарантируем, что значение всегда является массивом
              const selectedValues = Array.isArray(field.value)
                ? field.value
                : [];

              const handleSelect = (truckId: number) => {
                const updatedValues = selectedValues.includes(truckId)
                  ? selectedValues.filter((id) => id !== truckId) // Удаляем, если уже выбран
                  : [...selectedValues, truckId]; // Добавляем, если не выбран

                field.onChange(updatedValues);
              };

              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      disabled={isLoading || isTruckLoading}
                      className={cn(
                        "w-full justify-between h-auto min-h-10 text-left font-normal",
                        inputClass,
                        errors.truck && "border-red-500 focus:ring-red-500",
                      )}
                    >
                      {isTruckLoading ? (
                        <span className="flex items-center gap-2 text-gray-400">
                          <Loader2 className="w-4 h-4 animate-spin text-[#1E2B6D]" />
                          Загрузка транспорта...
                        </span>
                      ) : selectedValues.length > 0 ? (
                        // Отображаем выбранные элементы в виде тегов (Badges)
                        <div className="flex flex-wrap gap-1 max-w-[90%]">
                          {selectedValues.map((id) => {
                            const currentTruck = trucks?.find(
                              (t) => String(t.id) === String(id),
                            );
                            return (
                              <Badge
                                key={id}
                                variant="secondary"
                                className="mr-1 gap-1"
                              >
                                {currentTruck?.title || id}
                                <span
                                  role="button"
                                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") handleSelect(id);
                                  }}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  onClick={() => handleSelect(id)}
                                >
                                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </span>
                              </Badge>
                            );
                          })}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">
                          Выберите транспорт
                        </span>
                      )}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Поиск транспорта..." />
                      <CommandList>
                        <CommandEmpty>Транспорт не найден.</CommandEmpty>
                        <CommandGroup>
                          {trucks?.map((truck) => {
                            const isSelected = selectedValues.includes(
                              truck.id,
                            );

                            return (
                              <CommandItem
                                key={truck.id}
                                value={truck.title}
                                onSelect={() => handleSelect(truck.id)}
                              >
                                <div
                                  className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                    isSelected
                                      ? "bg-primary text-primary-foreground"
                                      : "opacity-50 [&_svg]:invisible",
                                  )}
                                >
                                  <Check className={cn("h-4 w-4")} />
                                </div>
                                <span>{truck.title}</span>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              );
            }}
          />
          {errors.truck && (
            <p className="text-xs font-semibold text-red-500 pt-0.5">
              {errors.truck.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 leading-none">
            Цена
          </label>
          <Input
            {...register("price", { required: "Введите цену" })}
            className={`${inputClass} ${errors.price ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.price && (
            <p className="text-xs font-semibold text-red-500 pt-0.5">
              {errors.price.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 leading-none">
            Количество
          </label>
          <Input
            {...register("count", { required: "Введите количество" })}
            className={`${inputClass} ${errors.count ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            disabled={isLoading}
          />
          {errors.count && (
            <p className="text-xs font-semibold text-red-500 pt-0.5">
              {errors.count.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Фотографии (до 5 штук)
          </label>

          {initialValues ? (
            <Controller
              control={control}
              name="images"
              render={({ field }) => (
                <MultiImageInput
                  name="images"
                  label="Выберите изображения"
                  onChange={field.onChange}
                  value={field.value}
                  showPreviews={true}
                  allowReorder={true}
                />
              )}
            />
          ) : (
            <Controller
              control={control}
              name="images"
              render={({ field }) => (
                <MultiImageInput
                  name="images"
                  label="Выберите изображения"
                  onChange={field.onChange}
                  value={field.value}
                  showPreviews={true}
                />
              )}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center rounded-2xl bg-[#1E2B6D] px-4 py-3 font-semibold text-white transition hover:bg-[#162356] disabled:opacity-50 h-12"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Сохранение...
            </span>
          ) : initialValues ? (
            "Сохранить изменения"
          ) : (
            "Создать продукт"
          )}
        </button>
      </form>
    </>
  );
}
