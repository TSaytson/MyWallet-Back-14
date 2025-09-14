import joi from 'joi';
export const transactionSchema = joi.object({
    value: joi.number().positive().precision(1).required(),
    description: joi.string().min(2).required(),
    date: joi.date(),
    type: joi.string().valid('entry', 'withdraw').required()
})