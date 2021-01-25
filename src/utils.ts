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
  // Normalize each otherItemDetail's nutrients to the itemDetail's by using serving_weight_grams
  otherItemsDetail.forEach((otherItemDetail) => {
    const servingMultiple =
      itemDetail.serving_weight_grams / otherItemDetail.serving_weight_grams;
    otherItemDetail.nf_calories *= servingMultiple;

    // Macros
    otherItemDetail.nf_protein *= servingMultiple;
    otherItemDetail.nf_total_carbohydrate *= servingMultiple;
    otherItemDetail.nf_total_fat *= servingMultiple;

    // Micros
    otherItemDetail.nf_sugars *= servingMultiple;
    otherItemDetail.nf_dietary_fiber *= servingMultiple;
    otherItemDetail.nf_saturated_fat *= servingMultiple;
    otherItemDetail.nf_sodium *= servingMultiple;
    otherItemDetail.nf_cholesterol *= servingMultiple;
  });

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
