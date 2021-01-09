import * as Joi from 'joi';

// Users Schemas
export const postUsersBody = Joi.object({
  email: Joi.string().required(),
  passwordHash: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  profilePictureUrl: Joi.string(),
});

export const getUsersQuery = Joi.object({ id: Joi.number().required() });

// Items Schemas
export const postItemsBody = Joi.object({
  numReviews: Joi.number(),
  rating: Joi.number(),
  foodName: Joi.string().required(),
  nix_item_id: Joi.string().required(),
  brandName: Joi.string(),
  nix_brand_id: Joi.string(),
});

export const putItemsBody = Joi.object({
  id: Joi.number().required(),
  numReviews: Joi.number().required(),
  rating: Joi.number().required(),
});

export const getItemByIdQuery = Joi.object({ id: Joi.number().required() });

export const getItemByNixIdQuery = Joi.object({
  nix_item_id: Joi.string().required(),
});
