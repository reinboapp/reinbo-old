export default {
  Query: {
    welcome: (_, { yourNickname }, ctx) => {
      return `Welcome, ${yourNickname || "here"}!`;
    },
    checkOdd: (_, { number }) => {
      if (!number) {
        return new Error("not odd number");
      }
      return true;
    },
    checkUsername: (_, { username }) => {
      if (!username) {
        return new Error("username not valid");
      }
      const success = true;
      return {
        success,
        username
      };
    }
  }
};
