import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSpares, getOneSpare, createSpare, updateSpare, deleteSpare } from "@/lib/requests/spares";
import { SearchFilters } from "@/types/truck";

export function useSpares (filters: SearchFilters | undefined) {
    return useQuery({
      queryKey: ["spares"],
      queryFn: () => getSpares(filters)
    })
}

export function useDetailSpare(id: string) {
  return useQuery({
    queryKey: ['spare', id],
    queryFn: () => getOneSpare(id),
  })
};

export function useCreateSpare() {
  return useMutation({
    mutationKey: ["spare"],
    mutationFn: createSpare,
  });
};

export function useUpdateSpare() {
  return useMutation({
    mutationKey: ["spare"],
    mutationFn: updateSpare,
  });
};

export function useDeleteSpare() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['spares'],
    mutationFn: deleteSpare,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["spares"]})
    }
  })
}