import envValues from "../../config/envConfig";
import rateLimit from "express-rate-limit";

/**
 * Limit the number of calls pero IP address in a given timeframe.
 */
const numberOfCallsLimiter = rateLimit({
  windowMs: envValues.RateLimitTime,
  max: envValues.RateLimitNumberOfCalls, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

export default numberOfCallsLimiter;
