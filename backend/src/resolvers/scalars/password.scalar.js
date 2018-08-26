import scalarResolvers from "./_scalarResolvers";

export default scalarResolvers({
  name: "Password",
  validator: value => {
    return value.length >= 6;
  },
  description: "Password, min 6"
});
