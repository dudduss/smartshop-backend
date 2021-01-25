import {
  NutritonixFoodItemDetail,
  Nutrient,
} from './external/nutritionix/types';

import {
  NUTRIENT_WEIGHTS,
  NUTRIENT_SENTIMENTS,
  ITEM_HEALTH_SCALE,
} from './constants';

export async function calculateHealthScore(
  itemDetail: NutritonixFoodItemDetail,
  otherItemsDetail: NutritonixFoodItemDetail[]
): Promise<number> {
  const allNutrients = Object.keys(Nutrient) as Nutrient[];

  const allNutrientWeightedScores = allNutrients.map((nutrient) => {
    const [nutrientMin, nutrientMax] = calculateNutrientBounds(
      otherItemsDetail,
      nutrient
    );

    return calculateNutrientScore(
      itemDetail,
      nutrient,
      nutrientMin,
      nutrientMax
    );
  });

  return allNutrientWeightedScores.reduce((a, b) => a + b, 0);
}

function calculateNutrientBounds(
  otherItemsDetail: NutritonixFoodItemDetail[],
  nutrient: Nutrient
): number[] {
  const nutrientValues = otherItemsDetail.map(
    (otherItemDetail) => otherItemDetail[nutrient]
  );
  const minimum = Math.min.apply(Math, nutrientValues);
  const maximum = Math.max.apply(Math, nutrientValues);
  return [minimum, maximum];
}

function calculateNutrientScore(
  itemDetail: NutritonixFoodItemDetail,
  nutrient: Nutrient,
  minimum: number,
  maximum: number
): number {
  const weight = NUTRIENT_WEIGHTS[nutrient];
  const sentiment = NUTRIENT_SENTIMENTS[nutrient];
  const itemNutrientValue = itemDetail[nutrient];
  var unweightedScore = 0;

  if (itemNutrientValue <= minimum) {
    unweightedScore = sentiment === 'positive' ? 0 : ITEM_HEALTH_SCALE;
  } else if (itemNutrientValue >= maximum) {
    unweightedScore = sentiment === 'positive' ? ITEM_HEALTH_SCALE : 0;
  } else {
    const rangeSize = maximum - minimum;
    const difference = itemNutrientValue - minimum;
    const ratioScore = (difference / rangeSize) * ITEM_HEALTH_SCALE;
    unweightedScore =
      sentiment === 'positive' ? ratioScore : ITEM_HEALTH_SCALE - ratioScore;
  }

  return unweightedScore * weight;
}

export async function calculateNutrientComparisons(
  itemDetail: NutritonixFoodItemDetail,
  otherItemsDetail: NutritonixFoodItemDetail[]
): Promise<any> {
  const belowAverageNutrients: string[] = [];
  const atAverageNutrients: string[] = [];
  const aboveAverageNutrients: string[] = [];

  console.log('otherItmesDetail pre: ', otherItemsDetail);
  console.log('itemDetail: ', itemDetail);

  const allNutrients = Object.keys(Nutrient) as Nutrient[];

  allNutrients.forEach((nutrient) => {
    const averageNutrientValue = calculateNutrientAverages(
      otherItemsDetail,
      nutrient
    );
    const itemNutrientValue = itemDetail[nutrient];
    if (itemNutrientValue > averageNutrientValue) {
      aboveAverageNutrients.push(nutrient);
    } else if (itemNutrientValue < averageNutrientValue) {
      belowAverageNutrients.push(nutrient);
    } else {
      atAverageNutrients.push(nutrient);
    }
  });

  return {
    belowAverage: belowAverageNutrients,
    atAverage: atAverageNutrients,
    aboveAverage: aboveAverageNutrients,
  };
}

function calculateNutrientAverages(
  otherItemsDetail: NutritonixFoodItemDetail[],
  nutrient: Nutrient
): number {
  const nutrientValues = otherItemsDetail.map(
    (otherItemDetail) => otherItemDetail[nutrient]
  );
  const averageValue =
    nutrientValues.reduce((a, b) => a + b, 0) / nutrientValues.length;

  return averageValue;
}

export function normalizeItemsDetail(
  itemDetail: NutritonixFoodItemDetail,
  otherItemsDetail: NutritonixFoodItemDetail[]
) {
  // Normalize each otherItemDetail's nutrients to the itemDetail's by using serving_weight_grams
  const otherItemsDetailNormalized = otherItemsDetail.map((otherItemDetail) => {
    const servingMultiple =
      itemDetail.serving_weight_grams / otherItemDetail.serving_weight_grams;

    return {
      ...otherItemDetail,
      nf_calories: (otherItemDetail.nf_calories *= servingMultiple),
      nf_protein: (otherItemDetail.nf_protein *= servingMultiple),
      nf_total_fat: (otherItemDetail.nf_total_fat *= servingMultiple),
      nf_total_carbohydrate: (otherItemDetail.nf_total_carbohydrate *= servingMultiple),
      nf_sugars: (otherItemDetail.nf_sugars *= servingMultiple),
      nf_dietary_fiber: (otherItemDetail.nf_dietary_fiber *= servingMultiple),
      nf_saturated_fat: (otherItemDetail.nf_saturated_fat *= servingMultiple),
      nf_sodium: (otherItemDetail.nf_sodium *= servingMultiple),
      nf_cholesterol: (otherItemDetail.nf_cholesterol *= servingMultiple),
      serving_weight_grams:
        otherItemDetail.serving_weight_grams * servingMultiple,
    } as NutritonixFoodItemDetail;
  });

  return otherItemsDetailNormalized;
}
