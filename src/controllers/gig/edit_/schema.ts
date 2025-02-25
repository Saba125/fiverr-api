import Joi from "joi"
const editGigSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  price: Joi.number().optional(),
  category: Joi.string().optional(),
  rating: Joi.number().optional(),
  status: Joi.string().valid("active", "banned").required(),
})
export default editGigSchema
