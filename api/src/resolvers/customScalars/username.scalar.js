import scalarResolvers from "./_scalarResolvers";

export default scalarResolvers({
  name: "Username",
  validator: value => {
    const USERNAME_REGEX = /^[a-z0-9_-]{3,15}$/;
    return USERNAME_REGEX.test(value);
  },
  description: "Username, a-z0-9_- min 3 max 15"
});
