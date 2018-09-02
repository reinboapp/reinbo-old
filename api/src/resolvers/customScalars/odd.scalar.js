import scalarResolvers from "./_scalarResolvers";

export default scalarResolvers({
  name: "Odd",
  validator: value => {
    return value % 2 === 1;
  },
  description: "Odd number",
  type: "INT"
});
