import RateLimiter from "async-ratelimiter";
import ms from "ms";

/**
 * graphql api rate limiter
 * @param {int} max: maximum request
 * @param {int} duration: duration, in miliseconds
 */
const GraphRateLimiter = ({ max, duration }) => {
  return async (resolve, _, args, { request, redisClient, authUser }, info) => {
    console.log(info);
    let limitId = authUser.id;
    if (!limitId) {
      limitId = request.ip;
    }
    const authRateLimiter = new RateLimiter({
      id: limitId,
      db: redisClient,
      max,
      duration
    });
    try {
      const { remaining } = await authRateLimiter.get();
      if (remaining > 0) {
        return resolve();
      } else {
        return new Error("Auth: Too many request");
      }
    } catch (e) {
      return new Error(e);
    }
  };
};

const AUTH_RATE = {
  max: 7,
  duration: "1h"
};
const NORMAL_RATE = {};

export default {
  Mutation: {
    userLogin: GraphRateLimiter(AUTH_RATE),
    userRegister: GraphRateLimiter(AUTH_RATE)
    // messageMutation: rateLimiter
  },
  Query: {},
  Subscription: {}
};
