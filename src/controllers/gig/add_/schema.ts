import Joi from "joi"
const addGigSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  rating: Joi.number().required(),
  status: Joi.string().valid("active", "banned").required(),
})
export default addGigSchema
