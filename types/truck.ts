export interface TruckType {
  id: number;
  title: string;
  image: string | null
}

export interface Spares {
  id: number;
  title: string;
  description: string | null;
  category_id: number | null;
  truck: number[] | null;
  price: number;
  images: (File | string)[];
  count: number;
  is_popular: boolean;
}


export interface SparesMutation {
  id?: number;
  title: string;
  description: string | null;
  category_id: number | undefined | null;
  truck: number[];
  price: number;
  images: (File | string)[];
  count: number;
  is_popular: boolean;
}

export interface SparesDetail {
  id?: number;
  title: string;
  description: string | null;
  category_id: number | undefined | null;
  truck: number[];
  price: number;
  images: string[];
  count: number;
  is_popular: boolean;
}


export interface SparesApiResponse {
  count: number;
  result: Spares[];
}

export interface SearchFilters {
  search?: string;
  category?: number | null;
  is_popular?: boolean | null;
  limit?: number;
  page: number
}