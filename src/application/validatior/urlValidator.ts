import { RequestHandler } from "express";
import Joi from "joi";
import SanitizeHtml from "sanitize-html";
import { ValidationException } from "../../shared/Errors";

const customJoi = Joi.extend((joi) => {
  return {
    type: "string",
    base: joi.string(),
    rules: {
      htmlStrip: {
        validate(value) {
          return SanitizeHtml(value, {
            allowedTags: [],
            allowedAttributes: {},
          });
        },
      },
    },
  };
});

export const urlValidator: RequestHandler = (req, _res, next) => {
  const slugSchema = customJoi.object({
    longUrl: customJoi.string().uri().required().trim(),
    shortUrl: customJoi.string().max(6).trim(),
  });
  const { error } = slugSchema.validate(req.body);
  if (error) {
    throw new ValidationException(error.message);
  } else {
    next();
  }
};

export const statsValidator: RequestHandler = (req, _res, next) => {
  const slugSchema = customJoi.object({
    daysAgo: customJoi.number().positive(),
  });

  const { error } = slugSchema.validate(req.query);
  if (error) {
    throw new ValidationException(error.message);
  } else {
    next();
  }
};
