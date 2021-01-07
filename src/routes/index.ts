import { Router } from 'express';
import * as Joi from 'joi';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator,
} from 'express-joi-validation';

import { getUsers, getUserById, createUser } from '../controllers/index';

const router = Router();
const validator = createValidator();

const postUsersBody = Joi.object({
  email: Joi.string().required(),
  passwordHash: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  profilePictureUrl: Joi.string(),
});

//Users Routes
router.post('/users', validator.body(postUsersBody), createUser);
// router.get('/users', getUsers);
// router.get('/users/:id', getUserById);
// router.delete('/users/:id', getUsers);

export default router;
