import Joi from 'joi';

export function validate(schema, property = 'body') {
  return (req, res, next) => {
    const data = req[property];
    const { error, value } = schema.validate(data, { abortEarly: false, allowUnknown: false });
    if (error) {
      return res.status(400).json({ erro: error.details.map((d) => d.message) });
    }
    req[property] = value;
    next();
  };
}
