import isMongoId from "validator/lib/isMongoId";
import scalarResolvers from "./_scalarResolvers";

export default scalarResolvers({
  name: "MongoID",
  validator: value => {
    return isMongoId(value);
  },
  description: "jsonwebtoken valid token"
});
