import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const USER_LOGIN_MUTATION = gql`
  mutation userLogin($input: LoginInput!) {
    userLogin(input: $input) {
      username
      success
      token
    }
  }
`;

const Login = () => {
  let inputUsername;
  let inputPassword;
  return (
    <Mutation mutation={USER_LOGIN_MUTATION}>
      {(userLogin, { loading, error, data }) => {
        console.log({ loading, data });
        return (
          <div>
            <form
              onSubmit={e => {
                e.preventDefault();
                userLogin({
                  variables: {
                    input: {
                      username: inputUsername.value,
                      password: inputPassword.value
                    }
                  }
                });
                inputUsername.value = "";
                inputPassword.value = "";
              }}
            >
              <input
                ref={node => {
                  inputUsername = node;
                }}
              />
              <input
                type="password"
                ref={node => {
                  inputPassword = node;
                }}
              />
              <button type="submit">{loading ? "Loading..." : "Login"}</button>
            </form>
          </div>
        );
      }}
    </Mutation>
  );
};

export default Login;
