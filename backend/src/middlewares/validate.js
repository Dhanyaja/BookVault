import { ZodError } from "zod";

/**
 * Validation middleware using Zod.
 * Usage: router.post("/route", validate(schema), controller)
 * schema = { body?: z.object(), query?: z.object(), params?: z.object() }
 */
export const validate = (schema) => (req, res, next) => {
  try {
    if (schema.body) {
      req.validatedBody = schema.body.parse(req.body);
    }
    if (schema.query) {
      req.validatedQuery = schema.query.parse(req.query);
    }
    if (schema.params) {
      req.validatedParams = schema.params.parse(req.params);
    }
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(422).json({
        message: "Validation failed",
        errors: err.flatten(),
      });
    }
    next(err);
  }
};
