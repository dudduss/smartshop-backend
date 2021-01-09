import * as Joi from 'joi';

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
