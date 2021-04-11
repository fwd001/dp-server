const Joi = require('joi');
const addschema = Joi.object({
    username: Joi.string().alphanum().min(3).max(20).required(),
    roomId: Joi.number().min(0).max(999999).required()
})
module.exports = {
    addschema
}