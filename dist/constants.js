"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ITEM_HEALTH_SCALE = exports.NUTRIENT_SENTIMENTS = exports.NUTRIENT_WEIGHTS = exports.NUM_COMPARABLE_ITEMS_MINIMUM = exports.NUM_COMPARABLE_ITEMS_MAXIMUM = void 0;
exports.NUM_COMPARABLE_ITEMS_MAXIMUM = 4; // should be 10 in production
exports.NUM_COMPARABLE_ITEMS_MINIMUM = 2; // should be 3 in production
exports.NUTRIENT_WEIGHTS = {
    nf_calories: 0.05,
    nf_total_fat: 0.2,
    nf_total_carbohydrate: 0.2,
    nf_protein: 0.2,
    nf_cholesterol: 0.1,
    nf_sugars: 0.1,
    nf_dietary_fiber: 0.05,
    nf_saturated_fat: 0.05,
    nf_sodium: 0.05,
};
exports.NUTRIENT_SENTIMENTS = {
    nf_calories: 'negative',
    nf_total_fat: 'negative',
    nf_total_carbohydrate: 'negative',
    nf_protein: 'positive',
    nf_cholesterol: 'negative',
    nf_sugars: 'negative',
    nf_dietary_fiber: 'positive',
    nf_saturated_fat: 'negative',
    nf_sodium: 'negative',
};
exports.ITEM_HEALTH_SCALE = 5;
