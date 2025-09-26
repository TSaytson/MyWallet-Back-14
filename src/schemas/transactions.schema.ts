import joiBase from 'joi';
import joiDate from '@joi/date';
const joi = joiBase.extend(joiDate)

export const transactionSchema = joi.object({
    value: joi.number().positive().precision(1).required(),
    description: joi.string().min(2).required(),
    date: joi.date().format(['YYYY-MM-DD', 'DD/MM/YYYY']).default(new Date().toLocaleString()),
    type: joi.string().valid('entry', 'withdraw').required()
})