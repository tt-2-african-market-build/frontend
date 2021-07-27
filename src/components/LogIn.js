
import React from "react";
import {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";
import styled from "styled-components";

let schema = yup.object().shape({
    username: yup.string().required("Please Enter Name").min(6, "User Name must be at least 6 characters"),
    password: yup.string().required("Please Enter a password").min(8, "Enter at least 8 Characters for Password")
})
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
    cursor: default;`

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
    //set form to be empty to begin
    const initialFormValues =
        {
            username: "",
            password: "",

        }
        // pass empty values to state of form
    const [form, setForm] = useState(initialFormValues);
    // have submit button be disabled until username and password requirements are satisfied
    const [disabled, setDisabled] = useState(true);
    //set up form for error tracking
    const [errors, setErrors] = useState((initialFormValues));

    //set errors by validating with yup schema
    const setFormErrors = (name, value) => {
        //console.log(name)
        yup
            .reach(schema, name)
            .validate(value)
            .then(() => setErrors({...errors, [name]: ""}))
            .catch((err) => setErrors({...errors, [name]: err.errors[0]}))
    }
    //
    const onChange = (e) =>
    {
        const { name, type, value, checked } = e.target;

        const realValue = type === "checkbox" ? checked : value;

        setFormErrors(name, realValue);
        setForm({...form, [name]: realValue });
        console.log(`${name} of type ${type} has changed to ${realValue}`)
    };

    const submit = (e) => {
        e.preventDefault();
        console.log(e);
        const currentUser = {
            username: form.username.trim(),
            password: form.password.trim(),
        };
        console.log('Current User', currentUser);
        console.log('Breakpoint');
        axios
            .post("https://sauti-market-bw.herokuapp.com/api/auth/login", currentUser)
            .then((res) => {
                setForm(initialFormValues)




            })
            .catch((error) => {
                console.log(error);
            } );
    };


    //check is schema is valid and allow user to submit
    useEffect(() => {
        schema.isValid(form).then((valid) => setDisabled(!valid));
        console.log(`form has changed`)
    }, [form]);
    return (
        <React.Fragment>

      <div className={"signup-container bg-black  w-screen flex flex-col justify-center align-center "}>
      <h1 className={"text-white mx-auto -mt-10 text-5xl"}>Log In To Your Account Below</h1>
          <StyledDisplay>
              <form onSubmit={submit}>
                  <label>
                      User:
                      <input type = "text" name = "username" value = {form.username} onChange={onChange}/>
                  </label>

                  <label>
                      Password:
                      <input type = "text" name = "password" value = {form.password} onChange={onChange}/>
                  </label>
                <br/>
              <ButtonDisplay disabled={disabled}>Submit</ButtonDisplay>
              <div style={{ color: "whitesmoke" }}>
                  <div>{errors.username}</div>
                  <br/>
                  <div style={{ color: "whitesmoke" }}>
                      <div>{errors.password}</div>
                  </div>
              </div>
              </form>
          </StyledDisplay>
      </div>

      <div className={"bg-white h-96 w-screen flex flex-col text-center justify-center align-center"}>
        <h3 className={"text-gray-800 mx-auto -mt-20 text-4xl"}>This is the Chef Spot!!</h3>
      </div>
      </React.Fragment>
    );
  }
  