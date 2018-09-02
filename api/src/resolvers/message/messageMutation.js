import { CREATE, UPDATE, DELETE } from "../constants";
import messageCreate from "./mutation/messageCreate";

export default async (_, args, ctx) => {
  switch (args.type) {
    case CREATE:
      return await messageCreate(_, args, ctx);
    case UPDATE:
    case DELETE:
      return {};
  }
  const returnData = {};
  return returnData;
};
