import Joi from "joi"
const addOrderSchema = Joi.object({
//   price: Joi.number().required(),
  status: Joi.string().valid("pending", "completed"),
  gigId: Joi.number().required(),
})
export default addOrderSchema
