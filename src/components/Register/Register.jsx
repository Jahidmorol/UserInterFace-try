import React from "react";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = (event) => {
    setError('')
    setSuccess('')
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;

    if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
      setError('At least write two uppercase letters.')
      return;
    }
    else if (!/(?=.*[0-9].*[0-9])/.test(password)){
      setError('At least write two digits')
      return;
    }
    else if (password.length < 6) {
      setError('At least write 8 character')
      return;
    }
    // console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        updateUserData(result.user, name)
        console.log(loggedUser);
        setSuccess("User has created successfully");
        setError("");
        event.target.reset();
      })
      .catch((error) => {
        setError(error.message);
        setSuccess("");
        console.error(error.message);
      });
      
  };

  const updateUserData = (user, name) => {
    updateProfile(user, {
      displayName: name
    })
    .then(()=> {
      console.log('User updeting SuccessFull');
    })
    .catch(error => {
      console.error(error.message);
    })
    // console.log(user, name);
  }

  return (
    <div>
      <h2>Please Register Now</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="mt-3 form-control w-50"
          // onChange={handleEmailChange}
          type="text"
          name="name"
          id="text"
          placeholder="Enter Your Name"
          required
        />
        <br />
        <input
          className="form-control w-50"
          // onChange={handleEmailChange}
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          required
        />
        <br />
        <input
          className="form-control w-50"
          // onBlur={handlePasswordBlur}
          type="password"
          name="password"
          id="password"
          placeholder="Enter your Password"
          required
        />
        <br />
        <input
          className="btn btn-primary"
          type="submit"
          name="submit"
          id="submit"
          value="Register"
        />
        {/* <p className={error? 'text-danger my-2' : 'text-success my-2'}>{error? error : success}</p> */}
        <p className="my-2 text-danger">{error}</p>
        <p className="mb-2 text-success">{success}</p>
        <p className="my-5"><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
      </form>
    </div>
  );
};

export default Register;
