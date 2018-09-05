import { CREATE, UPDATE, DELETE } from "../constants";
import conversationCreate from "./mutation/conversationCreate";

export default async (_, args, ctx) => {
  switch (args.type) {
    case CREATE:
      return await conversationCreate(_, args, ctx);
    case UPDATE:
    case DELETE:
      return {};
  }
};
