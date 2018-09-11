/** mutation type */
export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";

/** query type */
export const GETONE = "GETONE";
export const SEARCH = "SEARCH";

/** constant for pubsub / eventemitter in message */
export const CREATE_MESSAGE = "CREATE_MESSAGE";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";

/** constant for pubsub / eventemitter in conversation */
export const CREATE_CONVERSATION = "CREATE_CONVERSATION";
export const UPDATE_CONVERSATION = "UPDATE_CONVERSATION";
export const DELETE_CONVERSATION = "DELETE_CONVERSATION";

/**jwt key redis
 * for storing refreshToken
 */
export const REDIS_PREFIX_REFRESH_TOKEN = "refresh";
