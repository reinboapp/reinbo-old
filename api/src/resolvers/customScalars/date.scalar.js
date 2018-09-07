import scalarResolvers from "./_scalarResolvers";

export default scalarResolvers({
  name: "Date",
  validator: value => {
    return new Date(value);
  },
  serialize: value => {
    return value.getTime();
  },
  description: "Date custom scalar type"
});
