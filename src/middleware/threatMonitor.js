const redis = require("../config/redis");
const logger = require("../utils/logger");

module.exports = async (req, res, next) => {
  const key = `ip:${req.ip}`;
  const count = await redis.incr(key);

  if (count === 1) await redis.expire(key, 60);

  if (count > 50) {
    logger.warn(`Suspicious activity from ${req.ip}`);
  }
  next();
};
