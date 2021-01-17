export interface InstantSearchResponse {
  common: [];
  branded: NutritonixFoodItem[];
}

export type NutritonixFoodItem = {
  food_name: string;
  serving_unit: string;
  nix_brand_id: string;
  photo: {
    thumb: 'string';
  };
  brand_name: string;
  nix_item_id: string;
};
