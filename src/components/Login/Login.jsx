import {
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.config";

const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const emailRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError("At least add two upperCase latter");
      return;
    } else if (!/(?=.*[!@#$&*])/.test(password)) {
      setError("At least add one special character");
      return;
    } else if (password.length < 6) {
      setError("At least add 6 charecters");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        setSuccess("Login successful");
        setError("");
        sendVerificationEmail(result.user);
        console.log(loggedUser);
      })
      .catch((error) => {
        setError(error.message);
        setSuccess("");
      });

    const sendVerificationEmail = (user) => {
      sendEmailVerification(user);
      alert("please varify your email");
      console.log(user);
    };
  };

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      alert("Please input your email");
      return;
    }
    console.log(email);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please chack your email");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });     
  };

  return (
    <div>
      <h2 className="my-3">Please Login !!!</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-3" controlId="email">
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            ref={emailRef}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            required
          />
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit">
          Login
        </Button>
        <p className="mt-3">
          <small>
            forget your password?please
            <button onClick={handleResetPassword} className=" btn btn-link">
              Reset password
            </button>
          </small>
        </p>
        <p className="my-3 text-danger">{error}</p>
        <p className="text-success">{success}</p>
        <p className="my-5">
          <small>
            New to this website? Please <Link to="/register">Register</Link>
          </small>
        </p>
      </Form>
    </div>
  );
};

export default Login;
