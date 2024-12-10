import Joi from 'joi';

const idSchema = Joi.object({
  id: Joi.number().positive().integer().required()
});

export { idSchema };
