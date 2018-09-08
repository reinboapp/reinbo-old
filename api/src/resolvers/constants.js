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
 * GROUP (more than 2), PRIVATE (1 on 1), SECRET (just 1 people)
 * GROUP can have PUBLIC or PRIVATE privacy
 * PRIVATE only have PRIVATE privacy
 * SECRET only have SECRET privacy (for sending secret message)
 */
export const GROUP = "GROUP";
export const PUBLIC = "PUBLIC";
export const PRIVATE = "PRIVATE";
export const SECRET = "SECRET";

/**jwt key redis
 * for storing refreshToken
 */
export const REDIS_PREFIX_REFRESH_TOKEN = "rT";
