import isEmail from "validator/lib/isEmail";
import scalarResolvers from "./_scalarResolvers";

export default scalarResolvers({
  name: "Email",
  validator: value => {
    return isEmail(value);
  },
  description: "Email"
});
