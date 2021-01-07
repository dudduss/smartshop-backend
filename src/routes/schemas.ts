import * as Joi from 'joi';

export const postUsersBody = Joi.object({
  email: Joi.string().required(),
  passwordHash: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  profilePictureUrl: Joi.string(),
});

export const getUsersQuery = Joi.object({ id: Joi.number().required() });
