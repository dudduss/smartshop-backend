"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeItemsDetail = exports.calculateNutrientComparisons = exports.calculateHealthScore = void 0;
const types_1 = require("./external/nutritionix/types");
const constants_1 = require("./constants");
function calculateHealthScore(itemDetail, otherItemsDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const allNutrients = Object.keys(types_1.Nutrient);
        const allNutrientWeightedScores = allNutrients.map((nutrient) => {
            const [nutrientMin, nutrientMax] = calculateNutrientBounds(otherItemsDetail, nutrient);
            return calculateNutrientScore(itemDetail, nutrient, nutrientMin, nutrientMax);
        });
        return allNutrientWeightedScores.reduce((a, b) => a + b, 0);
    });
}
exports.calculateHealthScore = calculateHealthScore;
function calculateNutrientBounds(otherItemsDetail, nutrient) {
    const nutrientValues = otherItemsDetail.map((otherItemDetail) => otherItemDetail[nutrient]);
    const minimum = Math.min.apply(Math, nutrientValues);
    const maximum = Math.max.apply(Math, nutrientValues);
    return [minimum, maximum];
}
function calculateNutrientScore(itemDetail, nutrient, minimum, maximum) {
    const weight = constants_1.NUTRIENT_WEIGHTS[nutrient];
    const sentiment = constants_1.NUTRIENT_SENTIMENTS[nutrient];
    const itemNutrientValue = itemDetail[nutrient];
    var unweightedScore = 0;
    if (itemNutrientValue <= minimum) {
        unweightedScore = sentiment === 'positive' ? 0 : constants_1.ITEM_HEALTH_SCALE;
    }
    else if (itemNutrientValue >= maximum) {
        unweightedScore = sentiment === 'positive' ? constants_1.ITEM_HEALTH_SCALE : 0;
    }
    else {
        const rangeSize = maximum - minimum;
        const difference = itemNutrientValue - minimum;
        const ratioScore = (difference / rangeSize) * constants_1.ITEM_HEALTH_SCALE;
        unweightedScore =
            sentiment === 'positive' ? ratioScore : constants_1.ITEM_HEALTH_SCALE - ratioScore;
    }
    return unweightedScore * weight;
}
function calculateNutrientComparisons(itemDetail, otherItemsDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const belowAverageNutrients = [];
        const atAverageNutrients = [];
        const aboveAverageNutrients = [];
        console.log('otherItmesDetail pre: ', otherItemsDetail);
        console.log('itemDetail: ', itemDetail);
        const allNutrients = Object.keys(types_1.Nutrient);
        allNutrients.forEach((nutrient) => {
            const averageNutrientValue = calculateNutrientAverages(otherItemsDetail, nutrient);
            const itemNutrientValue = itemDetail[nutrient];
            if (itemNutrientValue > averageNutrientValue) {
                aboveAverageNutrients.push(nutrient);
            }
            else if (itemNutrientValue < averageNutrientValue) {
                belowAverageNutrients.push(nutrient);
            }
            else {
                atAverageNutrients.push(nutrient);
            }
        });
        return {
            belowAverage: belowAverageNutrients,
            atAverage: atAverageNutrients,
            aboveAverage: aboveAverageNutrients,
        };
    });
}
exports.calculateNutrientComparisons = calculateNutrientComparisons;
function calculateNutrientAverages(otherItemsDetail, nutrient) {
    const nutrientValues = otherItemsDetail.map((otherItemDetail) => otherItemDetail[nutrient]);
    const averageValue = nutrientValues.reduce((a, b) => a + b, 0) / nutrientValues.length;
    return averageValue;
}
function normalizeItemsDetail(itemDetail, otherItemsDetail) {
    // Normalize each otherItemDetail's nutrients to the itemDetail's by using serving_weight_grams
    const otherItemsDetailNormalized = otherItemsDetail.map((otherItemDetail) => {
        const servingMultiple = itemDetail.serving_weight_grams / otherItemDetail.serving_weight_grams;
        return Object.assign(Object.assign({}, otherItemDetail), { nf_calories: (otherItemDetail.nf_calories *= servingMultiple), nf_protein: (otherItemDetail.nf_protein *= servingMultiple), nf_total_fat: (otherItemDetail.nf_total_fat *= servingMultiple), nf_total_carbohydrate: (otherItemDetail.nf_total_carbohydrate *= servingMultiple), nf_sugars: (otherItemDetail.nf_sugars *= servingMultiple), nf_dietary_fiber: (otherItemDetail.nf_dietary_fiber *= servingMultiple), nf_saturated_fat: (otherItemDetail.nf_saturated_fat *= servingMultiple), nf_sodium: (otherItemDetail.nf_sodium *= servingMultiple), nf_cholesterol: (otherItemDetail.nf_cholesterol *= servingMultiple), serving_weight_grams: otherItemDetail.serving_weight_grams * servingMultiple });
    });
    return otherItemsDetailNormalized;
}
exports.normalizeItemsDetail = normalizeItemsDetail;
