import isURL from "validator/lib/isURL";
import scalarResolvers from "./_scalarResolvers";

export default scalarResolvers({
  name: "URL",
  validator: value => {
    return isURL(value);
  },
  description: "URL"
});
