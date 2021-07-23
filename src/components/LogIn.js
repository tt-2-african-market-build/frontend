
import React from "react";
import {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";

let schema = yup.object().shape({
    username: yup.string().required("Please Enter Name").min(6, "User Name must be at least 6 characters"),
    password: yup.string().required("Please Enter a password").min(8, "Enter at least 8 Characters"),


})

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
  color: antiquewhite;
`
export default function LogIn() {
    const initialFormValues =
        {
            username: "",
            password: "",

        }
    const [form, setForm] = useState(initialFormValues);
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState((initialFormValues));

    const setFormErrors = (name, value) => {
        //console.log(name)
        yup
            .reach(schema, name)
            .validate(value)
            .then(() => setErrors({...errors, [name]: ""}))
            .catch((err) => setErrors({...errors, [name]: err.errors[0]}))
    }
    const onChange = (e) =>
    {
        const { name, type, value, checked } = e.target;

        const realValue = type === "checkbox" ? checked : value;

        setFormErrors(name, realValue);
        setForm({...form, [name]: realValue });
        //console.log(`${name} of type ${type} has changed to ${realValue}`)
    };

    const submit = (e) => {
        e.preventDefault();

        const newUser = {
            username: form.username.trim(),
            password: form.password.trim(),
            isOwner: form.isOwner,
        };
        console.log('newUser', newUser);
        axios
            .post("https://saudi-market-app.herokuapp.com/api/auth/login", newUser)
            .then((res) => {
                setForm(initialFormValues);

            })
            .catch((error) => {
                console.log(error);
            } );
    };

    useEffect(() => {
        schema.isValid(form).then((valid) => setDisabled(!valid));
    }, [form]);
    return (
        <React.Fragment>

      <div className={"signup-container bg-black  w-screen flex flex-col justify-center align-center "}>
      <h1 className={"text-white mx-auto -mt-10 text-5xl"}>Log In To Your Account Below</h1>
          <StyledDisplay>
              <form>
                  <label>
                      User:
                      <input type = "text" name = "username" value = {form.user}/>
                  </label>
                  <label>
                      Password:
                      <input type = "text" name = "password" value = {form.password}/>
                  </label>
              </form>
          </StyledDisplay>
      </div>

      <div className={"bg-white h-96 w-screen flex flex-col text-center justify-center align-center"}>
        <h3 className={"text-gray-800 mx-auto -mt-20 text-4xl"}>This is the Chef Spot!!</h3>
      </div>
      </React.Fragment>
    );
  }
  