import React from "react";
import { useState, useEffect } from "react";
import * as yup from "yup";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

let schema = yup.object().shape({
  username: yup
    .string()
    .required("Please Enter Name")
    .min(6, "User Name must be at least 6 characters"),
  password: yup
    .string()
    .required("Please Enter a password")
    .min(8, "Enter at least 8 Characters for Password"),
});
const ButtonDisplay = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  &:disabled {
    color: grey;
    opacity: 0.7;
    cursor: default;
  }
`;

const StyledDisplay = styled.div`
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 35px 15px;
  text-align: center;
  float: right;
`;
const LogIn = () => {
  //set form to be empty to begin
  const { push } = useHistory();
  const initialFormValues = {
    username: "",
    password: "",
    isOwner: false,
  };
  // pass empty values to state of form
  const [form, setForm] = useState(initialFormValues);
  // have submit button be disabled until username and password requirements are satisfied
  const [disabled, setDisabled] = useState(true);
  //set up form for error tracking
  const [errors, setErrors] = useState(initialFormValues);

  //set errors by validating with yup schema
  const setFormErrors = (name, value) => {
    //console.log(name)
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };
  //
  const onChange = (e) => {
    const { name, type, value, checked } = e.target;

    const realValue = type === "checkbox" ? checked : value;

    setFormErrors(name, realValue);
    setForm({ ...form, [name]: realValue });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("values in form", form);
    axiosWithAuth()
      .post("/api/auth/login", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.id);
        console.log(
          "values for token and id set for login",
          res.data.token,
          res.data.id
        );
        let currentUserId = res.data.id;
        res.data.isOwner === true
          ? push("./owner", currentUserId)
          : push("/products");
      })
      .catch((error) => {
        console.log("error while logging in", { error });
      });
  };

  //check is schema is valid and allow user to submit
  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
    console.log(`form has changed`);
  }, [form]);
  return (
    <React.Fragment>
      <div
        className={
          "signup-container bg-black  w-screen flex flex-col justify-center align-center "
        }
      >
        <h1 className={"text-white mx-auto -mt-10 text-5xl"}>
          Log In To Your Account Below
        </h1>
        <StyledDisplay>
          <form onSubmit={submit}>
            <label style={{ color: "white" }}>
              Username:
              <input
                style={{ color: "black" }}
                type="text"
                name="username"
                value={form.username}
                onChange={onChange}
              />
            </label>

            <label style={{ color: "white" }}>
              Password:
              <input
                style={{ color: "black" }}
                type="text"
                name="password"
                value={form.password}
                onChange={onChange}
              />
            </label>
            <br />
            <ButtonDisplay disabled={disabled}>Submit</ButtonDisplay>
            <div style={{ color: "whitesmoke" }}>
              <div>{errors.username}</div>
              <br />
              <div style={{ color: "whitesmoke" }}>
                <div>{errors.password}</div>
              </div>
            </div>
          </form>
        </StyledDisplay>
      </div>
    </React.Fragment>
  );
};


export default LogIn;
