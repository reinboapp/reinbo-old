/** mutation type */
export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";

/** constant for pubsub / eventemitter in message */
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

/** constant for pubsub / eventemitter in conversation */
export const CREATE_CONVERSATION = "CREATE_CONVERSATION";
export const UPDATE_CONVERSATION = "UPDATE_CONVERSATION";
export const DELETE_CONVERSATION = "DELETE_CONVERSATION";

/**
 * 3 different type of size of conversation:
 * GROUP: can have more than 2
 * TWO: 1 on 1
 * ONE: just 1 people
 */
export const GROUP = "GROUP";
export const TWO = "TWO";
export const ONE = "ONE";
/**
 * PUBLIC: open to public, story showed in stream
 * PRIVATE: not open to public, not showed in stream
 * SECRET: not save in database
 */
export const PUBLIC = "PUBLIC";
export const PRIVATE = "PRIVATE";
export const SECRET = "SECRET";

/**jwt key redis
 * for storing refreshToken
 */
export const REDIS_PREFIX_REFRESH_TOKEN = "refresh";
