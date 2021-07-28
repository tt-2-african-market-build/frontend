import React from "react";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";

const LabelDisplay = styled.div`
  ${"" /* color:whitesmoke; */}
  font-family: "Arial Black";
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  padding: 10px 0px;
  text-align: center;
  padding: 10rem;
  float: left;
`;
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

let schema = yup.object().shape({
  username: yup
    .string()
    .required("Please Enter Name")
    .min(6, "User Name must be at least 6 characters"),
  email: yup.string().required("Please Enter an email Address").email(),
  password: yup
    .string()
    .required("Please Enter a password")
    .min(8, "Enter at least 8 Characters"),
  //passwordConfirmation: yup.string().required("Please Enter a password").min(8, "Enter at least 8 Characters").oneOf([yup.ref('password')], 'Passwords must match'),
  isOwner: yup.bool().oneOf([true, false]),
});

export default function SignUp() {
  const [users, setUsers] = useState([]);
  const { push } = useHistory();
  const initialFormValues = {
    username: "",
    email: "",
    password: "",
    isOwner: false,
  };
  const [form, setForm] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    isOwner: false,
  });
  const setFormErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };
  const onChange = (e) => {
    const { name, type, value, checked } = e.target;

    const realValue = type === "checkbox" ? checked : value;

    setFormErrors(name, realValue);
    setForm({ ...form, [name]: realValue });
  };

  const submit = (e) => {
    e.preventDefault();

    // const newUser =
    //     {
    //     username: form.username.trim(),
    //     email: form.email.trim(),
    //     password: form.password.trim(),
    //     isOwner:form.isOwner,
    // };
    // console.log('New User Breakpoint')
    axios
      .post("https://sauti-market-bw.herokuapp.com/api/auth/register", form)
      .then((res) => {
        // setForm(initialFormValues);
        // console.log('newUser', newUser);
        console.log(res);
        // setUsers([...users, res.data]);
        // console.log(res.data.message);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user_id", JSON.Number(res.data.id));
        form.isOwner === true ? push("/owner") : push("/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    schema.isValid(form).then((valid) => setDisabled(!valid));
  }, [form]);

  useEffect(() => {});
  return (
    <React.Fragment>
      <div
        className={
          "form-container bg-black w-screen text-center flex flex-col justify-center align-center leading-5"
        }
      >
        {" "}
        <h1
          className={"text-white mt-20 mx-auto text-5xl"}
          style={{ textShadow: "0 0 1rem black" }}
        >
          Create a Market Place Account
        </h1>
        .
        <form onSubmit={submit}>
          <LabelDisplay>
            <label>
              User:
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={onChange}
              />
            </label>
            <div style={{ color: "black" }}>
              <div>{errors.user}</div>
            </div>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={onChange}
              />
            </label>
            <div style={{ color: "black" }}>
              <div>{errors.email}</div>
            </div>
            <label>
              Password:
              <input
                type="text"
                name="password"
                value={form.password}
                onChange={onChange}
              />
            </label>
            <div style={{ color: "black" }}>
              <div>{errors.password}</div>
            </div>

            <label>
              Owner Account
              <input
                type="checkbox"
                name="isOwner"
                value={form.isOwner}
                onChange={onChange}
              />
            </label>
            <div className="submitButton">
              <ButtonDisplay onSubmit={submit} disabled={disabled}>
                Submit
              </ButtonDisplay>
            </div>
          </LabelDisplay>
        </form>
      </div>
      <div
        className={
          "bg-white h-96 w-screen flex flex-col justify-center text-center align-center"
        }
      ></div>
    </React.Fragment>
  );
}
