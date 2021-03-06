import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  Jumbotron,
  Media,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Loading from "../Loading/Loading";
import logo from "../../image/Dubby_logo.png";
import LoadingUserCreation from "../Loading/LoadingUserCreation";

const SignupPage = () => {
  const { theme } = useContext(ThemeContext);
  const { userLoading, userData } = useContext(UserContext);

  // inputs updated from form
  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();
  // header text that acts as a warning and message display
  const [alertSignin, setAlertSignin] = useState("Sign up!");
  const [dataCreationLoading, setDataCreationLoading] = useState(false);

  // creates user when checks for email and password is valid
  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();
    setAlertSignin("Loading...");
    if (/\S+@\S+\.\S+/.test(inputEmail) && inputPassword !== "") {
      try {
        await auth().createUserWithEmailAndPassword(inputEmail, inputPassword);
        setAlertSignin("Hang on! We're signing you in!");
        setDataCreationLoading(true);
        auth().signInWithEmailAndPassword(inputEmail, inputPassword);
      } catch (e) {
        if (e.code === "auth/weak-password") {
          setAlertSignin("The password is too weak.");
        } else {
          setAlertSignin(e.message);
        }
      }
    }
  };

  // render
  if (userLoading) {
    return <Loading />;
  } else if (userData) {
    return <Redirect to="/" />;
  } else if (dataCreationLoading) {
    return <LoadingUserCreation />;
  } else {
    return (
      <div style={theme.background}>
        <Jumbotron style={theme.launchJumbotron}>
          <Media middle src={logo} style={{ width: "10rem" }} />
          <hr />
          <p>
            <b>Welcome to Dubby!</b>
            <br />
            <b>Find your sport partners. Find your buddies.</b>
          </p>
        </Jumbotron>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>{alertSignin}</CardHeader>
              <CardBody>
                <Form onSubmit={handleSignUpFormSubmit}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="account@example.com"
                      type="email"
                      required="required"
                      onChange={(e) => setInputEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="password"
                      type="password"
                      required="required"
                      onChange={(e) => setInputPassword(e.target.value)}
                    />
                  </FormGroup>
                  <Button block color="primary" type="submit">
                    Sign Up
                  </Button>
                  <Button block color="secondary" tag={Link} to="/launch">
                    Back to login
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};

export default SignupPage;
