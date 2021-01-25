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

export interface SearchItemResponse {
  foods: NutritonixFoodItemDetail[];
}

export type NutritonixFoodItemDetail = {
  food_name: string;
  brand_name: string;
  serving_qty: number;
  serving_unit: string;
  serving_weight_grams: number;
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  nf_potassium?: number;
  nix_brand_id: string;
  photo: {
    thumb: 'string';
  };
  nix_item_id: string;
  nf_ingredient_statement: string;
  claims: string[];
};
