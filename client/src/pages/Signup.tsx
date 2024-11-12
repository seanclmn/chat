import { useState } from "react";
import { Button } from "../components/shared/Buttons/GenericButton";
import { Input } from "../components/shared/Inputs/GenericInput";
import { graphql } from "relay-runtime";
import { useMutation } from "react-relay";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router";
import { SignupMutation, SignupMutation$data } from "@generated/SignupMutation.graphql";

const mutation = graphql`
  mutation SignupMutation($username: String!, $password: String!){
    signup(createUserInput: {username: $username, password: $password}){
      user{
        username
      }
      accessToken
    }
  }
`

export const Signup = () => {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [cookies, setCookie,] = useCookies(['accessToken']);
  const [commitMutation,] = useMutation<SignupMutation>(mutation);

  if (cookies['accessToken']) return <Navigate to='/' />
  return (
    <form
      className="flex flex-col items-center max-w-60 my-auto mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        commitMutation({
          variables: {
            username: creds.username, password: creds.password
          },
          onCompleted: (data: SignupMutation$data) => {
            setCookie('accessToken', data.signup.accessToken)
          },
          onError: (e) => {
            console.log(e)
          }
        })
      }}
    >
      <Input
        styles="mb-2 text-sm py-[5px]"
        title="Username"
        onChange={(e) => setCreds({ ...creds, username: e.currentTarget.value })}
      />
      <Input
        styles="mb-2 text-sm py-[5px]"
        title="Password"
        onChange={(e) =>
          setCreds({ ...creds, password: e.currentTarget.value })
        }
      />
      <Button title="Sign up" type="submit" styles="text-sm py-[5px]" />
    </form>
  );
};
