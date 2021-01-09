import * as Joi from 'joi';

export const postReviewsBody = Joi.object({
  userId: Joi.number().required(),
  itemId: Joi.number().required(),
  content: Joi.string(),
  rating: Joi.number().required(),
});

export const patchReviewsBody = Joi.object({
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
