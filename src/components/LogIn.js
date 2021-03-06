import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
} from "reactstrap";

const root = document.querySelector("#root");

const LogIn = ({ setUser, setSignUp, signUp }) => {
  const submitForm = (e) => {
    e.preventDefault();
    let newUser = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(newUser);

    axios.post("/users/login", newUser).then((result) => {
      localStorage.setItem("user", JSON.stringify(result.data));
      setUser(result.data);
    });
  };

  return (
    <Container className="signIn">
      <h2>Sign In</h2>
      <Form onSubmit={submitForm} className="form">
        <Col>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="myemail@email.com"
            />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="********"
            />
          </FormGroup>
        </Col>
        <Button style={{ marginRight: "8%" }}>Log In</Button>
        <Button
          onClick={(e) => {
            setSignUp(!signUp);
          }}
        >
          Create an Account
        </Button>

        <Button
          onClick={(e) => {
            setUser({ id: "guest", name: "guest" });
          }}
          style={{ marginLeft: "8%" }}
        >
          Continue as Guest
        </Button>
        <FormText color="muted">
          * DO NOT USE REAL CREDENTIALS. THIS IS A PERSONAL PRACTICE PROJECT,
          LOG IN AS GUEST OR USE THE DUMMY ACCOUNT -> (abc@gmail.com / 123)
        </FormText>
      </Form>
    </Container>
  );
};

export default LogIn;
