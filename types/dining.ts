export interface DishItem {
  id: string;
  name: string;
  price: number;
  isVeg: boolean;
  description: string;
  image: string;
}

export interface CuisineCategory {
  id: string;
  /** Display name, e.g. "Punjabi", "Gujarati", "South Indian" */
  name: string;
  description: string;
  items: DishItem[];
}

