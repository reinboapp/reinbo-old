import isJWT from "validator/lib/isJWT";
import scalarResolvers from "./_scalarResolvers";

export default scalarResolvers({
  name: "JWT",
  validator: value => {
    return isJWT(value);
  },
  description: "jsonwebtoken valid token"
});
