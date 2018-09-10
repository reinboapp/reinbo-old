import RateLimiter from "async-ratelimiter";
import ms from "ms";

import { resolversKeys } from "../resolvers/";
// console.log(resolversKeys);

/**
 * graphql api rate limiter,
 * if not auth per user ip, else per userId
 * @param {int} max: maximum request
 * @param {int} duration: duration, in miliseconds
 */
const createLimiter = ({ name, max, duration }) => {
  return async (resolve, _, args, { request, redisClient, authUser }, info) => {
    let limitId = authUser.id;
    if (!limitId) {
      limitId = request.ip;
      if (limitId === "::1") {
        limitId = "localhost";
      }
    }
    const rateLimiter = new RateLimiter({
      id: `${limitId}`,
      db: redisClient,
      max,
      duration: ms(duration),
      namespace: name
    });
    try {
      const { remaining } = await rateLimiter.get();
      if (remaining > 0) {
        return resolve();
      } else {
        return new Error(`Too many request ${max}/${duration}`);
      }
    } catch (e) {
      return new Error(e);
    }
  };
};

const AUTH_RATE = {
  name: "AR",
  max: 7,
  duration: "1h"
};
const TOKEN_RATE = {
  name: "TR",
  max: 7,
  duration: "5m"
};
const NORMAL_RATE = {
  name: "NR",
  max: 2000,
  duration: "1h"
};

const withNormalRate = (key = "Mutation") => {
  const rate = {};
  resolversKeys[key].forEach(item => {
    rate[item] = createLimiter(NORMAL_RATE);
  });
  return rate;
};

export default {
  Mutation: {
    ...withNormalRate("Mutation"),

    userLogin: createLimiter(AUTH_RATE),
    userRegister: createLimiter(AUTH_RATE),

    userRefreshToken: createLimiter(TOKEN_RATE)
  },
  Query: {
    ...withNormalRate("Query")
  },
  Subscription: {
    ...withNormalRate("Subscription")
  }
};
