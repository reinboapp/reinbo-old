import EventEmitter from "events";

class ChatEmitter extends EventEmitter {}
export const chatEmitter = new ChatEmitter();

class NotifEmitter extends EventEmitter {}
export const notifEmitter = new NotifEmitter();
