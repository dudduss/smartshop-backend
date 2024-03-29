import * as Joi from 'joi';

export const postItemsBody = Joi.object({
  numReviews: Joi.number(),
  rating: Joi.number(),
  foodName: Joi.string().required(),
  nix_item_id: Joi.string().required(),
  brandName: Joi.string(),
  nix_brand_id: Joi.string(),
  imageUrl: Joi.string(),
});

export const patchItemsBody = Joi.object({
  id: Joi.number().required(),
  numReviews: Joi.number().required(),
  rating: Joi.number().required(),
});

export const getItemByIdQuery = Joi.object({ id: Joi.number().required() });

export const getItemByNixIdQuery = Joi.object({
  nix_item_id: Joi.string().required(),
});

export const getItemsBySearchStringQuery = Joi.object({
  searchString: Joi.string(),
});

export const getItemByUpcQuery = Joi.object({
  upc: Joi.string(),
});

export const getItemDetailByNixIdQuery = Joi.object({
  nix_item_id: Joi.string(),
});

export const getItemHealthByNixIdQuery = Joi.object({
  nix_item_id: Joi.string(),
});
