import { GETONE, SEARCH } from "../constants";
import conversationGetOne from "./query/conversationGetOne";

export default async (_, args, ctx) => {
  switch (args.type) {
    case GETONE:
      return await conversationGetOne(_, args, ctx);
    case SEARCH:
      return {};
  }
};
