import joi from 'joi';

export const signUpSchema = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().required().valid(joi.ref('password'))
});

export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password:joi.string().required()
})