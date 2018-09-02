import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

const scalarResolvers = ({
  name,
  validator,
  type = "STRING",
  description = "",
  serialize
}) => {
  function func(value) {
    return validator(value) ? value : null;
  }
  return {
    [name]: new GraphQLScalarType({
      name,
      description,
      parseValue: func,
      serialize: serialize ? serialize : func,
      parseLiteral(ast) {
        if (ast.kind === Kind[type]) {
          return func(ast.value);
        }
        return null;
      }
    })
  };
};

export default scalarResolvers;
