import { CREATE, UPDATE, DELETE } from "../constants";
import messageCreate from "./mutation/messageCreate";

/**
 * message mutation: CREATE: mutation/messageCreate
 */
const messageMutation = async (_, args, ctx) => {
  switch (args.type) {
    case CREATE:
      return await messageCreate(_, args, ctx);
    case UPDATE:
    case DELETE:
      return {};
  }
  return {};
};

export default messageMutation;
