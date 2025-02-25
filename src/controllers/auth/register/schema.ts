import Joi from "joi"
const registerSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  skills: Joi.array().items(Joi.string()).required(),
  bio: Joi.string().required(),
  location: Joi.object({
    city: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
})
export default registerSchema
