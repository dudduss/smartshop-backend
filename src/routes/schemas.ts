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

// MarkedItems Schemas
export const postMarkedItemsBody = Joi.object({
  userId: Joi.number().required(),
  itemId: Joi.number().required(),
});

export const getMarkedItemsByUserIdQuery = Joi.object({
  userId: Joi.number().required(),
});

export const deleteMarkedItemQuery = Joi.object({
  id: Joi.number().required(),
});

// Reviews Schemas
export const postReviewsBody = Joi.object({
  userId: Joi.number().required(),
  itemId: Joi.number().required(),
  content: Joi.string(),
  rating: Joi.number().required(),
});

export const putReviewsBody = Joi.object({
  id: Joi.number().required(),
  content: Joi.string(),
  rating: Joi.number().required(),
});

export const getReviewsByUserIdQuery = Joi.object({
  userId: Joi.number().required(),
});

export const getReviewsByItemIdQuery = Joi.object({
  itemId: Joi.string().required(),
});

export const deleteReviewsQuery = Joi.object({
  id: Joi.string().required(),
});
