import { z } from "zod";

export const NestJSErrorSchema = z.object({
  statusCode: z.number(),                       // e.g. 400, 401, 500
  message: z.union([z.string(), z.array(z.string())]), // single string or array of strings
  error: z.string(),                            // e.g. "Bad Request", "Internal Server Error"
});
