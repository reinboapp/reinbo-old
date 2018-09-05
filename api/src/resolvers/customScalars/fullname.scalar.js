import scalarResolvers from "./_scalarResolvers";

export default scalarResolvers({
  name: "Fullname",
  validator: value => {
    return value.trim().length > 4;
  },
  description: "Fullname, min 4 characters"
});
